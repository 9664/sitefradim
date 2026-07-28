import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const EXPECTED_SHA256 = "3a2edd3656704eb598533c8d69b9b8bc8d6c654f9a7746e948c8a24942f19de5";
const EXPECTED_WIDTH = 768;
const EXPECTED_HEIGHT = 512;

const sourcePath = path.join(process.cwd(), "public", "hero", "marcelo-fradim-hero-final.webp.b64");
const outputPath = path.join(process.cwd(), "public", "hero", "marcelo-fradim-hero-final.webp");

const encoded = (await readFile(sourcePath, "utf8")).trim();

if (!encoded.startsWith("UklG")) {
  throw new Error("Hero portrait Base64 does not begin with a valid WebP signature.");
}

const image = Buffer.from(encoded, "base64");
const riff = image.subarray(0, 4).toString("ascii");
const webp = image.subarray(8, 12).toString("ascii");
const chunk = image.subarray(12, 16).toString("ascii");
const digest = createHash("sha256").update(image).digest("hex");

const readUInt24LE = (buffer, offset) =>
  buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);

const width = chunk === "VP8X" ? readUInt24LE(image, 24) + 1 : 0;
const height = chunk === "VP8X" ? readUInt24LE(image, 27) + 1 : 0;

if (
  riff !== "RIFF" ||
  webp !== "WEBP" ||
  chunk !== "VP8X" ||
  width !== EXPECTED_WIDTH ||
  height !== EXPECTED_HEIGHT ||
  image.length < 9_000 ||
  digest !== EXPECTED_SHA256
) {
  throw new Error(
    `Hero portrait validation failed: ${image.length} bytes, ${width}x${height}, ${riff}/${webp}/${chunk}, sha256=${digest}`,
  );
}

await writeFile(outputPath, image);
console.log(`Hero portrait materialized: ${width}x${height}, ${image.length} bytes, sha256=${digest}`);
