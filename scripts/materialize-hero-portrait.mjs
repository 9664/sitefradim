import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const expectedParts = [
  { length: 11000, hash: "37cbbe8a250531e6088bbc6d43def97a7a8593bc7b1b6f64b347cb29220fa4c4" },
  { length: 11000, hash: "c43a0a744ad965313bfe81adb8d8533a4e1d6fd674df59b97f3a5dbecd452880" },
  { length: 11000, hash: "8866269d2d3cba1f1beeb3a50d6d0891caab98de1e213cff62cd0bb05e7e6eb2" },
  { length: 11000, hash: "f019f7830721441c8cd6ed19d743ce7d4d42ff7988f60eccc489a84d5ebd4a0b" },
  { length: 11000, hash: "9dcb5035eecc85cd6b30f72f63996af6cec53ac021786f1306c72e76982eb4aa" },
  { length: 9208, hash: "19a83311c7a459f56c81bce31a43fc40b1d8abcdb16b54c614e191977c675bb7" },
];
const expectedBase64Hash = "59271df7a0dda52d04ba8ffff2eec926d0540a1c1275b2277794f2b97ea09bea";
const expectedImageHash = "af90c0da779ad50c5163fc7fd002cb4509daac4a1edaa27db2c9ae6eeb63a751";
const outputPath = path.join(
  process.cwd(),
  "public",
  "hero",
  "marcelo-fradim-hero-2026.webp",
);

const parts = await Promise.all(
  expectedParts.map(async ({ length, hash }, index) => {
    const partPath = path.join(
      process.cwd(),
      "assets",
      "hero",
      `marcelo-fradim-2026.part-${String(index + 1).padStart(2, "0")}.b64`,
    );
    const value = (await readFile(partPath, "utf8")).trim();
    const digest = createHash("sha256").update(value).digest("hex");

    if (value.length !== length || digest !== hash) {
      throw new Error(
        `Hero portrait part ${index + 1} failed validation: length=${value.length}, sha256=${digest}`,
      );
    }

    return value;
  }),
);

const encoded = parts.join("");
const encodedHash = createHash("sha256").update(encoded).digest("hex");

if (encoded.length !== 64208 || encodedHash !== expectedBase64Hash) {
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
  width !== 741 ||
  height !== 768 ||
  image.length !== 48156 ||
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
