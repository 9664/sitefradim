import fs from "node:fs";
import path from "node:path";

const manifest = JSON.parse(
  fs.readFileSync(path.resolve("config/legacy-routes.json"), "utf8"),
);

const outputDir = path.resolve("out");
const errors = [];

if (!fs.existsSync(outputDir)) {
  console.error("Diretório out/ não encontrado. Execute o build antes desta validação.");
  process.exit(1);
}

function stripUrlExtras(route) {
  return route.split("#", 1)[0].split("?", 1)[0];
}

function routeCandidates(route) {
  const clean = stripUrlExtras(route);
  if (clean === "/") return [path.join(outputDir, "index.html")];

  const relative = clean.replace(/^\/+|\/+$/g, "");
  return [
    path.join(outputDir, relative, "index.html"),
    path.join(outputDir, `${relative}.html`),
  ];
}

function routeExists(route) {
  return routeCandidates(route).some((candidate) => fs.existsSync(candidate));
}

for (const entry of manifest.resolved ?? []) {
  if (entry.action === "preserve") {
    if (!routeExists(entry.source)) {
      errors.push(
        `preserve ${entry.source} exige um asset HTML correspondente em out/.`,
      );
    }
    continue;
  }

  if (entry.action === "redirect") {
    if (typeof entry.target === "string" && entry.target.startsWith("/")) {
      if (!routeExists(entry.target)) {
        errors.push(
          `redirect ${entry.source} aponta para ${entry.target}, mas o destino não existe em out/.`,
        );
      }
    }
    continue;
  }

  if (entry.action === "remove" && routeExists(entry.source)) {
    errors.push(
      `remove ${entry.source} conflita com um asset estático em out/. No modo asset-first, o asset responderia antes do Worker.`,
    );
  }
}

if (errors.length) {
  console.error("Saída de produção incompatível com o manifesto legado:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Saída compatível com o manifesto legado: ${(manifest.resolved ?? []).length} decisões verificadas.`,
);
