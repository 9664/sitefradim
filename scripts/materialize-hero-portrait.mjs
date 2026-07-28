import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const expectedHash = "3a2edd3656704eb598533c8d69b9b8bc8d6c654f9a7746e948c8a24942f19de5";
const sourcePath = path.join(process.cwd(), "public", "hero", "marcelo-fradim-hero-final.webp.b64");
const outputPath = path.join(process.cwd(), "public", "hero", "marcelo-fradim-hero-final.webp");
const encoded = (await readFile(sourcePath, "utf8")).trim();
const decoded = Buffer.from(encoded, "base64");
const declaredLength = decoded.readUInt32LE(4) + 8;
const image = decoded.subarray(0, declaredLength);
const riff = image.subarray(0, 4).toString("ascii");
const webp = image.subarray(8, 12).toString("ascii");
const chunk = image.subarray(12, 16).toString("ascii");
const readUInt24LE = (buffer, offset) =>
  buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
const width = readUInt24LE(image, 24) + 1;
const height = readUInt24LE(image, 27) + 1;
const digest = createHash("sha256").update(image).digest("hex");

if (
  riff !== "RIFF" ||
  webp !== "WEBP" ||
  chunk !== "VP8X" ||
  width !== 768 ||
  height !== 512 ||
  image.length !== 10280 ||
  digest !== expectedHash
) {
  throw new Error(
    `Hero portrait validation failed: ${image.length} bytes, ${width}x${height}, ${riff}/${webp}/${chunk}, sha256=${digest}`,
  );
}

await writeFile(outputPath, image);
console.log(`Hero portrait materialized: ${width}x${height}, ${image.length} bytes, sha256=${digest}`);
