import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const EXPECTED_SHA256 = "797a87bbc0e7d8668d20939b01ee6fac49a02c331aae9eaede51b34b4627af82";
const EXPECTED_WIDTH = 420;
const EXPECTED_HEIGHT = 435;
const EXPECTED_CACHE_KEY = "v=797a87bbc0e7d866";

const out = path.join(process.cwd(), "out");
const portraitPath = path.join(out, "hero", "marcelo-fradim-hero-2026.webp");
const homePath = path.join(out, "index.html");
const contactPath = path.join(out, "contato", "index.html");

const portrait = await readFile(portraitPath);
const portraitStats = await stat(portraitPath);
const riff = portrait.subarray(0, 4).toString("ascii");
const webp = portrait.subarray(8, 12).toString("ascii");
const chunk = portrait.subarray(12, 16).toString("ascii");
const digest = createHash("sha256").update(portrait).digest("hex");

const readUInt24LE = (buffer, offset) =>
  buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);

const width = chunk === "VP8X" ? readUInt24LE(portrait, 24) + 1 : 0;
const height = chunk === "VP8X" ? readUInt24LE(portrait, 27) + 1 : 0;

if (
  riff !== "RIFF" ||
  webp !== "WEBP" ||
  chunk !== "VP8X" ||
  width !== EXPECTED_WIDTH ||
  height !== EXPECTED_HEIGHT ||
  portraitStats.size < 12_000 ||
  digest !== EXPECTED_SHA256
) {
  throw new Error(
    `Invalid published Hero portrait: ${portraitStats.size} bytes, ${width}x${height}, ${riff}/${webp}/${chunk}, sha256=${digest}`,
  );
}

const home = await readFile(homePath, "utf8");
if (!home.includes("marcelo-fradim-hero-2026.webp")) {
  throw new Error("Home does not reference the approved 2026 Hero portrait.");
}
if (!home.includes(EXPECTED_CACHE_KEY)) {
  throw new Error("Home does not reference the current Hero portrait cache key.");
}
for (const obsolete of ["marcelo-fradim-hero-final.webp", "marcelo-fradim-hero-portrait.svg"]) {
  if (home.includes(obsolete)) {
    throw new Error(`Home still references an obsolete Hero portrait: ${obsolete}`);
  }
}

for (const required of [
  "UNIVERSO FRADIM / ATLAS VIVO",
  "Cada ideia é um território.",
  "id=\"memoria-viva\"",
  "MEMÓRIA VIVA / A COR RETORNA",
  "A cidade chega pelos trilhos.",
  "Uma pequena fachada, uma história enorme.",
  "estacao-mogiana-1925.jpg",
  "magazine-luiza-1957.jpg",
  "A cidade deixa de ser cenário e vira pertencimento.",
]) {
  if (!home.includes(required)) {
    throw new Error(`Home is missing a required immersive experience marker: ${required}`);
  }
}

const contact = await readFile(contactPath, "utf8");
for (const required of ["fradim@gmail.com", "+55 16 98180-4590", "CONTATO / PROJETOS + CONVERSAS REAIS"]) {
  if (!contact.includes(required)) {
    throw new Error(`Contact page is missing required public information: ${required}`);
  }
}

console.log(
  `Static site validated: approved Hero portrait ${width}x${height}, ${portraitStats.size} bytes, sha256=${digest}; Atlas Vivo, Memory Revival and contact route present.`,
);
