import fs from 'node:fs';
import crypto from 'node:crypto';

const inventory = JSON.parse(fs.readFileSync('config/legacy-media.json', 'utf8'));
const published = JSON.parse(fs.readFileSync('config/legacy-media-published.json', 'utf8'));
const inventoryBySlug = new Map(inventory.items.map((item) => [item.slug, item]));
const publishedBySlug = new Map(published.items.map((item) => [item.slug, item]));
const errors = [];

function sha256(path) {
  return crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
}

for (const item of inventory.items) {
  const record = publishedBySlug.get(item.slug);

  if (item.status === 'approved-for-promotion') {
    if (!record) {
      errors.push(`${item.slug}: approved item is missing from legacy-media-published.json`);
      continue;
    }
    if (record.sourceSha256 !== item.expectedSha256) {
      errors.push(`${item.slug}: published source hash does not match pinned inventory hash`);
    }
    if (record.path !== item.publishPath) {
      errors.push(`${item.slug}: published path differs from approved publishPath`);
    }
    if (!fs.existsSync(record.path)) {
      errors.push(`${item.slug}: published file does not exist at ${record.path}`);
      continue;
    }
    const actualPublishedHash = sha256(record.path);
    if (actualPublishedHash !== record.publishedSha256) {
      errors.push(`${item.slug}: published file hash differs from provenance manifest`);
    }
  } else {
    if (record) {
      errors.push(`${item.slug}: item with status ${item.status} must not appear in published manifest`);
    }
    if (item.publishPath && fs.existsSync(item.publishPath)) {
      errors.push(`${item.slug}: non-approved item unexpectedly exists in public/`);
    }
  }
}

for (const record of published.items) {
  const item = inventoryBySlug.get(record.slug);
  if (!item) errors.push(`${record.slug}: published record has no inventory entry`);
}

if (errors.length) {
  console.error('Published legacy media validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Published legacy media validation OK: ${published.items.length} approved asset(s), no hold/rejected leakage.`);
