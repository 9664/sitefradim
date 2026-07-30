import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const assets = [
  {
    slug: "padre-alonso-1926",
    parts: ["assets/memory/padre-alonso-1926-small.b64"],
    output: "public/memoria/arquivo/padre-alonso-1926.webp",
    bytes: 3024,
    width: 360,
    height: 293,
    sha256: "dfc98a0b20cb463417501f42fadeb793365c395ff8f7cffd6cc3accaed7cf024",
  },
  {
    slug: "estacao-em-1930",
    parts: [
      "assets/memory/estacao-mogiana-1930.part-01.b64",
      "assets/memory/estacao-mogiana-1930.part-02.b64",
    ],
    output: "public/memoria/arquivo/estacao-mogiana-1930.webp",
    bytes: 5242,
    width: 360,
    height: 303,
    sha256: "0804339f2b342067ab834f766c27f3868045063e3857bad85f32def4f4519cf9",
  },
  {
    slug: "vista-aerea-de-franca-em-1950",
    parts: [
      "assets/memory/vista-aerea-franca-1950.part-01.b64",
      "assets/memory/vista-aerea-franca-1950.part-02.b64",
      "assets/memory/vista-aerea-franca-1950.part-03.b64",
      "assets/memory/vista-aerea-franca-1950.part-04.b64",
    ],
    output: "public/memoria/arquivo/vista-aerea-franca-1950.webp",
    bytes: 8192,
    width: 360,
    height: 228,
    sha256: "7fa9ccb6d356a41bed91d315b034a8543e6386e427f592e3427b649a40a419b7",
  },
  {
    slug: "rua-do-comercio-em-1908",
    parts: [
      "assets/memory/lote3/rua-01.b64",
      "assets/memory/lote3/rua-02.b64",
      "assets/memory/lote3/rua-03.b64",
    ],
    output: "public/memoria/arquivo/rua-comercio-1908.webp",
    bytes: 19910,
    width: 720,
    height: 227,
    sha256: "2f6c84bd381bb805362e86a11bafaf301c6752fd5d49e4446b3e5e5f3c65a22b",
  },
  {
    slug: "emporio-cruzeiro-do-sul-em-1952",
    parts: [
      "assets/memory/emporio-cruzeiro-sul-1952.part-01.b64",
      "assets/memory/emporio-cruzeiro-sul-1952.part-02.b64",
      "assets/memory/emporio-cruzeiro-sul-1952.part-03.b64",
    ],
    output: "public/memoria/arquivo/emporio-cruzeiro-sul-1952.webp",
    bytes: 43704,
    width: 640,
    height: 447,
    sha256: "8be4fa558159e6849a8ca218042aea9fd0eb40a3ff2fc9f3a44a00fbcdc3fbba",
  },
  {
    slug: "taxis-na-praca-barao-decada-de-1950",
    parts: [
      "assets/memory/taxis-franca-1950.part-01.b64",
      "assets/memory/taxis-franca-1950.part-02.b64",
    ],
    output: "public/memoria/arquivo/taxis-franca-1950.webp",
    bytes: 40510,
    width: 720,
    height: 254,
    sha256: "21e31a8305b7255f1dd3a6425a313b3f47ea8f2e5772bda36508a6d13fe4908e",
  },
];

function readVp8Dimensions(buffer) {
  const chunk = buffer.subarray(12, 16).toString("ascii");
  if (chunk !== "VP8 ") return { chunk, width: 0, height: 0 };
  const frame = 20;
  const width = buffer.readUInt16LE(frame + 6) & 0x3fff;
  const height = buffer.readUInt16LE(frame + 8) & 0x3fff;
  return { chunk, width, height };
}

for (const asset of assets) {
  const encoded = (
    await Promise.all(asset.parts.map((part) => readFile(path.join(process.cwd(), part), "utf8")))
  ).join("").replace(/\s+/g, "");

  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) {
    throw new Error(`${asset.slug}: invalid Base64 payload`);
  }

  const image = Buffer.from(encoded, "base64");
  const digest = createHash("sha256").update(image).digest("hex");
  const riff = image.subarray(0, 4).toString("ascii");
  const webp = image.subarray(8, 12).toString("ascii");
  const { chunk, width, height } = readVp8Dimensions(image);

  if (
    riff !== "RIFF" ||
    webp !== "WEBP" ||
    chunk !== "VP8 " ||
    image.length !== asset.bytes ||
    width !== asset.width ||
    height !== asset.height ||
    digest !== asset.sha256
  ) {
    throw new Error(
      `${asset.slug}: invalid recovered asset ${image.length} bytes, ${width}x${height}, ${riff}/${webp}/${chunk}, sha256=${digest}`,
    );
  }

  const outputPath = path.join(process.cwd(), asset.output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, image);
  console.log(`${asset.slug}: materialized ${width}x${height}, ${image.length} bytes, sha256=${digest}`);
}
