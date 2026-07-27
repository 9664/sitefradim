import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const configPath = process.argv[2] ?? 'config/legacy-media.json';
const inputDir = process.argv[3] ?? 'quarantine';
const outputPath = process.argv[4] ?? path.join(inputDir, 'media-audit.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const auditableItems = config.items.filter((item) => item.audit !== false && typeof item.legacyUrl === 'string' && item.legacyUrl.length > 0);

function jpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error('not a JPEG: missing SOI marker');
  }

  let offset = 2;
  while (offset + 4 <= buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    let marker = buffer[offset + 1];
    while (marker === 0xff) {
      offset += 1;
      marker = buffer[offset + 1];
    }

    offset += 2;
    if (marker === 0xd9 || marker === 0xda) break;
    if (offset + 2 > buffer.length) break;

    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) {
      throw new Error('invalid JPEG segment length');
    }

    const sofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
    if (sofMarkers.has(marker)) {
      if (length < 7) throw new Error('invalid JPEG SOF segment');
      const height = buffer.readUInt16BE(offset + 3);
      const width = buffer.readUInt16BE(offset + 5);
      if (!width || !height) throw new Error('invalid JPEG dimensions');
      return { width, height };
    }

    offset += length;
  }

  throw new Error('JPEG dimensions not found');
}

const results = [];
let failed = false;

for (const item of auditableItems) {
  const filePath = path.join(inputDir, item.filename);
  const result = {
    slug: item.slug,
    filename: item.filename,
    sourcePage: item.sourcePage,
    legacyUrl: item.legacyUrl,
    curationStatus: item.status,
    status: 'failed',
  };

  try {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length === 0) throw new Error('empty file');
    if (buffer.length > config.maxBytes) throw new Error(`file exceeds ${config.maxBytes} bytes`);

    const { width, height } = jpegDimensions(buffer);
    const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
    if (item.expectedSha256 && sha256 !== item.expectedSha256) {
      throw new Error(`SHA-256 mismatch: expected ${item.expectedSha256}, received ${sha256}`);
    }

    result.status = 'validated';
    result.bytes = buffer.length;
    result.width = width;
    result.height = height;
    result.sha256 = sha256;
    result.aspectRatio = Number((width / height).toFixed(4));
  } catch (error) {
    failed = true;
    result.error = error instanceof Error ? error.message : String(error);
  }

  results.push(result);
}

const report = {
  generatedAt: new Date().toISOString(),
  source: configPath,
  totalConfigured: config.items.length,
  skipped: config.items.length - auditableItems.length,
  count: results.length,
  validated: results.filter((item) => item.status === 'validated').length,
  failed: results.filter((item) => item.status === 'failed').length,
  items: results,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(`Legacy media audit: ${report.validated}/${report.count} validated; ${report.skipped} skipped by curation policy`);
for (const item of results) {
  if (item.status === 'validated') {
    console.log(`OK ${item.filename}: ${item.width}x${item.height}, ${item.bytes} bytes, sha256 ${item.sha256}`);
  } else {
    console.error(`FAIL ${item.filename}: ${item.error}`);
  }
}

if (failed) process.exit(1);
