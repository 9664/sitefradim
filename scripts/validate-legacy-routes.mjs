import fs from "node:fs";
import path from "node:path";

const manifestPath = path.resolve("config/legacy-routes.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const errors = [];
const seen = new Set();
const validActions = new Set(["preserve", "redirect", "remove"]);
const validStatusByAction = {
  preserve: new Set([200]),
  redirect: new Set([301, 308]),
  remove: new Set([404, 410]),
};

function validatePath(value, label) {
  if (typeof value !== "string" || !value.startsWith("/") || !value.endsWith("/")) {
    errors.push(`${label} deve começar e terminar com '/': ${JSON.stringify(value)}`);
  }
}

for (const entry of manifest.resolved ?? []) {
  validatePath(entry.source, "source resolvido");

  if (seen.has(entry.source)) errors.push(`rota duplicada: ${entry.source}`);
  seen.add(entry.source);

  if (!validActions.has(entry.action)) {
    errors.push(`action inválida em ${entry.source}: ${entry.action}`);
    continue;
  }

  if (!validStatusByAction[entry.action].has(entry.status)) {
    errors.push(`status ${entry.status} incompatível com action ${entry.action} em ${entry.source}`);
  }

  if (entry.action === "redirect") {
    validatePath(entry.target, `target de ${entry.source}`);
    if (entry.target === entry.source) errors.push(`redirect circular em ${entry.source}`);
  } else if (entry.target !== null) {
    errors.push(`${entry.action} não deve possuir target em ${entry.source}`);
  }

  if (typeof entry.reason !== "string" || entry.reason.trim().length < 12) {
    errors.push(`reason insuficiente em ${entry.source}`);
  }
}

for (const entry of manifest.pending ?? []) {
  validatePath(entry.source, "source pendente");

  if (seen.has(entry.source)) errors.push(`rota duplicada entre resolved/pending: ${entry.source}`);
  seen.add(entry.source);

  if ("status" in entry || "action" in entry || "target" in entry) {
    errors.push(`rota pendente não pode antecipar status/action/target: ${entry.source}`);
  }

  if (typeof entry.reason !== "string" || entry.reason.trim().length < 12) {
    errors.push(`reason insuficiente em ${entry.source}`);
  }
}

if ((manifest.resolved?.length ?? 0) === 0) {
  errors.push("manifesto precisa conter ao menos uma decisão resolvida");
}

if (errors.length) {
  console.error("Manifesto de migração inválido:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Manifesto legado válido: ${manifest.resolved.length} resolvidas, ${manifest.pending?.length ?? 0} pendentes.`,
);
