import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const sourcePath = path.join(process.cwd(), "public", "hero", "marcelo-fradim-hero-final.webp.b64");
const outputPath = path.join(process.cwd(), "public", "hero", "marcelo-fradim-hero-final.webp");

const encoded = (await readFile(sourcePath, "utf8")).trim();

if (!encoded.startsWith("UklG")) {
  throw new Error("Hero portrait Base64 does not begin with a valid WebP signature.");
}

const image = Buffer.from(encoded, "base64");
const riff = image.subarray(0, 4).toString("ascii");
const webp = image.subarray(8, 12).toString("ascii");

if (riff !== "RIFF" || webp !== "WEBP" || image.length < 1024) {
  throw new Error("Hero portrait payload is not a valid WebP file.");
}

await writeFile(outputPath, image);
console.log(`Hero portrait materialized: ${image.length} bytes`);
