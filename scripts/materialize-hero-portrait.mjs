import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const expectedParts = [
  "d5706e638bbe5b3c34098f75423dd071764bf7a7a8681831100c6f01355be46a",
  "e17307450c1b16032a0e71466c688b5746d441edfef0b0dd12a1ec7186946500",
  "2cec2586fc57302c2ab0569076d18cfe2bf0c8410595a111082caa9d6c5581bb",
  "5e10542ac7a197c8346456d87e8215ede94a1718d61334d8c266290cdd81358c",
];
const expectedBase64Hash = "9773ffbeaebf605db79036d53fcc56df13b28500605be90aeeb5dee00a9cb0e8";
const expectedImageHash = "3a2edd3656704eb598533c8d69b9b8bc8d6c654f9a7746e948c8a24942f19de5";
const outputPath = path.join(process.cwd(), "public", "hero", "marcelo-fradim-hero-final.webp");

const parts = await Promise.all(
  expectedParts.map(async (expectedHash, index) => {
    const partPath = path.join(
      process.cwd(),
      "assets",
      "hero",
      `marcelo-fradim-hero.part-${String(index + 1).padStart(2, "0")}.b64`,
    );
    const value = (await readFile(partPath, "utf8")).trim();
    const digest = createHash("sha256").update(value).digest("hex");
    if (value.length !== 3427 || digest !== expectedHash) {
      throw new Error(`Hero portrait part ${index + 1} failed validation: length=${value.length}, sha256=${digest}`);
    }
    return value;
  }),
);

const encoded = parts.join("");
const encodedHash = createHash("sha256").update(encoded).digest("hex");
if (encoded.length !== 13708 || encodedHash !== expectedBase64Hash) {
  throw new Error(`Hero portrait Base64 failed validation: length=${encoded.length}, sha256=${encodedHash}`);
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
  width !== 768 ||
  height !== 512 ||
  image.length !== 10280 ||
  imageHash !== expectedImageHash
) {
  throw new Error(
    `Hero portrait image failed validation: ${image.length} bytes, ${width}x${height}, ${riff}/${webp}/${chunk}, sha256=${imageHash}`,
  );
}

await writeFile(outputPath, image);
console.log(`Hero portrait materialized: ${width}x${height}, ${image.length} bytes, sha256=${imageHash}`);
