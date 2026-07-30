import assert from "node:assert/strict";
import { createLegacyHandler, normalizePathname } from "../worker/index.mjs";

assert.equal(normalizePathname("/"), "/");
assert.equal(normalizePathname("/arquivo"), "/arquivo/");
assert.equal(normalizePathname("/arquivo/"), "/arquivo/");

let assetCalls = 0;
const env = {
  ASSETS: {
    async fetch() {
      assetCalls += 1;
      return new Response("Não encontrado.", { status: 404 });
    },
  },
};

const handler = createLegacyHandler([
  {
    source: "/conteudo-removido/",
    status: 410,
    reason: "Fixture sintética para validar a resposta de remoção.",
  },
]);

const removed = await handler(
  new Request("https://fradim.example/conteudo-removido?utm_source=test"),
  env,
);

assert.equal(removed.status, 410);
assert.equal(await removed.text(), "Conteúdo removido.");
assert.equal(removed.headers.get("x-robots-tag"), "noindex, nofollow");
assert.equal(removed.headers.get("cache-control"), "public, max-age=300");
assert.equal(assetCalls, 0, "Uma rota 410 não deve consultar ASSETS.");

const missing = await handler(
  new Request("https://fradim.example/rota-sem-regra/"),
  env,
);

assert.equal(missing.status, 404);
assert.equal(assetCalls, 1, "Uma rota sem regra deve ser delegada uma vez ao ASSETS.");

console.log("Cloudflare legacy worker: 410 e fallback de assets validados.");
