import fs from "node:fs";
import path from "node:path";

const manifest = JSON.parse(
  fs.readFileSync(path.resolve("config/legacy-routes.json"), "utf8"),
);

const resolved = manifest.resolved ?? [];
const redirects = resolved.filter((entry) => entry.action === "redirect");
const removals = resolved.filter((entry) => entry.action === "remove");

fs.mkdirSync(path.resolve("public"), { recursive: true });
fs.mkdirSync(path.resolve("worker"), { recursive: true });

const redirectLines = [
  "# GENERATED FILE — source: config/legacy-routes.json",
  "# Do not edit manually. Run: npm run generate:cloudflare",
  ...redirects.map((entry) => `${entry.source} ${entry.target} ${entry.status}`),
  "",
];

fs.writeFileSync(path.resolve("public/_redirects"), redirectLines.join("\n"));

const removalPayload = removals.map(({ source, status, reason }) => ({
  source,
  status,
  reason,
}));

const removalModule = [
  "// GENERATED FILE — source: config/legacy-routes.json",
  "// Do not edit manually. Run: npm run generate:cloudflare",
  `export const legacyRemovals = ${JSON.stringify(removalPayload, null, 2)};`,
  "",
].join("\n");

fs.writeFileSync(
  path.resolve("worker/generated-legacy-removals.mjs"),
  removalModule,
);

console.log(
  `Cloudflare routing generated: ${redirects.length} redirects, ${removals.length} removals.`,
);
