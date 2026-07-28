import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const expectedBase64Hash = "deddc0c312a0ac32b97b8afc70334b7e6b951839a3c6e9d2d70fb05118b69850";
const expectedImageHash = "9a9f8d58497d372021360ce6ece2d103abe6f0d2528c0da652b5c92c876b6a2a";
const sourcePath = path.join(
  process.cwd(),
  "assets",
  "hero",
  "marcelo-fradim-hero-v4.part-01.b64",
);
const outputPath = path.join(
  process.cwd(),
  "public",
  "hero",
  "marcelo-fradim-hero-final.webp",
);

const encoded = (await readFile(sourcePath, "utf8")).trim();
const encodedHash = createHash("sha256").update(encoded).digest("hex");

if (encoded.length !== 15768 || encodedHash !== expectedBase64Hash) {
  throw new Error(
    `Hero portrait Base64 failed validation: length=${encoded.length}, sha256=${encodedHash}`,
  );
}

const image = Buffer.from(encoded, "base64");
const imageHash = createHash("sha256").update(image).digest("hex");
const riff = image.subarray(0, 4).toString("ascii");
const webp = image.subarray(8, 12).toString("ascii");
const chunk = image.subarray(12, 16).toString("ascii");
const readUInt24LE = (buffer, offset) =>
  buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
const width = readUInt24LE(image, 24) + 1;
const height = readUInt24LE(image, 27) + 1;

if (
  riff !== "RIFF" ||
  webp !== "WEBP" ||
  chunk !== "VP8X" ||
  width !== 256 ||
  height !== 384 ||
  image.length !== 11826 ||
  imageHash !== expectedImageHash
) {
  throw new Error(
    `Hero portrait image failed validation: ${image.length} bytes, ${width}x${height}, ${riff}/${webp}/${chunk}, sha256=${imageHash}`,
  );
}

await writeFile(outputPath, image);
console.log(
  `Hero portrait materialized: ${width}x${height}, ${image.length} bytes, sha256=${imageHash}`,
);
