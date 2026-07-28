import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const out = path.join(process.cwd(), "out");
const portraitPath = path.join(out, "hero", "marcelo-fradim-hero-final.webp");
const homePath = path.join(out, "index.html");
const contactPath = path.join(out, "contato", "index.html");

const portrait = await readFile(portraitPath);
const portraitStats = await stat(portraitPath);
const riff = portrait.subarray(0, 4).toString("ascii");
const webp = portrait.subarray(8, 12).toString("ascii");

if (riff !== "RIFF" || webp !== "WEBP" || portraitStats.size < 100_000) {
  throw new Error(`Invalid published Hero portrait: ${portraitStats.size} bytes, ${riff}/${webp}`);
}

const home = await readFile(homePath, "utf8");
if (!home.includes("marcelo-fradim-hero-final.webp")) {
  throw new Error("Home does not reference the final Hero portrait.");
}
if (home.includes("marcelo-fradim-hero-portrait.svg")) {
  throw new Error("Home still references the obsolete framed SVG portrait.");
}

const contact = await readFile(contactPath, "utf8");
for (const required of ["fradim@gmail.com", "+55 16 98180-4590", "CONTATO / PROJETOS + CONVERSAS REAIS"]) {
  if (!contact.includes(required)) {
    throw new Error(`Contact page is missing required public information: ${required}`);
  }
}

console.log(`Static site validated: Hero portrait ${portraitStats.size} bytes; contact route present.`);
