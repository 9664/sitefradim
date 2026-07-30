import fs from "node:fs";
import path from "node:path";

const manifestPath = path.resolve("config/legacy-wxr-recovery-2026-07-29.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];
const EXPECTED_INDEX_HASH = "abc0946a9bc37b5950b895f3d17942feede068c2b924c6a5141b3b29b5663f8c";

const audit = manifest.audit ?? {};
const policy = manifest.policy ?? {};
const acceptedPostIds = manifest.acceptedPostIds ?? [];
const priorityReview = manifest.priorityReview ?? [];
const pages = manifest.pages ?? [];

if (manifest.version !== 1) errors.push(`version inesperada: ${manifest.version}`);
if (!/^[a-f0-9]{64}$/.test(manifest.source?.sha256 ?? "")) errors.push("source.sha256 ausente ou inválido");
if (manifest.source?.committedToRepository !== false) errors.push("o WXR bruto precisa permanecer fora do repositório");
if (policy.rawImport !== false) errors.push("rawImport precisa permanecer false");
if (policy.autoPublish !== false) errors.push("autoPublish precisa permanecer false");
if (policy.restoreOriginalDatesFromMeta !== "_wp_old_date") {
  errors.push("metadado de restauração de data deve ser _wp_old_date");
}

if (acceptedPostIds.length !== audit.publishedPostsAcceptedForEditorialReview) {
  errors.push(
    `quantidade de IDs aceitos diverge: manifest=${acceptedPostIds.length}, audit=${audit.publishedPostsAcceptedForEditorialReview}`,
  );
}
if (new Set(acceptedPostIds).size !== acceptedPostIds.length) errors.push("há IDs de posts duplicados");
if (!acceptedPostIds.every((id) => Number.isInteger(id) && id > 0)) errors.push("há ID de post inválido");
if (manifest.acceptedPostsIndexSha256 !== EXPECTED_INDEX_HASH) {
  errors.push("o hash canônico do inventário detalhado divergiu sem nova auditoria");
}

const collectionTotal = Object.values(manifest.collectionCounts ?? {}).reduce((sum, value) => sum + value, 0);
if (collectionTotal !== acceptedPostIds.length) {
  errors.push(`soma das coleções diverge: ${collectionTotal} != ${acceptedPostIds.length}`);
}

const spamPattern = /(?:casino|cassino|\bbet(?:ting)?\b|slots?|jackpot|parimatch|powbet|spindragons|wintopia|dragonia)/i;
for (const post of priorityReview) {
  if (!acceptedPostIds.includes(post.id)) errors.push(`prioridade fora do inventário: ${post.slug}`);
  if (post.publicationState !== "review-required") errors.push(`prioridade ${post.slug} não está em review-required`);
  if (spamPattern.test(`${post.slug} ${post.title}`)) errors.push(`termo de spam em prioridade: ${post.slug}`);
  if (!Number.isInteger(post.scriptTagsRemoved) || post.scriptTagsRemoved < 1) {
    errors.push(`prioridade ${post.slug} não registra scripts removidos`);
  }
}

if (audit.publishedPostsWithInjectedScripts !== acceptedPostIds.length) {
  errors.push("a auditoria deve registrar injeção em todos os posts aceitos deste snapshot");
}
if (audit.injectedScriptTagsRemovedFromPublishedPosts !== 223) {
  errors.push("contagem de scripts removidos mudou sem nova auditoria");
}
if (audit.trashedPostsQuarantined !== 1601) errors.push("contagem de posts em quarentena mudou sem nova auditoria");
if (audit.attachmentsIndexed !== 828) errors.push("contagem de anexos mudou sem nova auditoria");
if (!audit.maliciousIndicatorDomains?.includes("groundrats.org")) {
  errors.push("indicador malicioso groundrats.org não está documentado");
}

const rejectedGuide = pages.find((page) => page.slug === "guide-3541");
if (!rejectedGuide || rejectedGuide.action !== "reject") {
  errors.push("a página injetada guide-3541 precisa permanecer rejeitada");
}

if (errors.length) {
  console.error("Manifesto de recuperação WXR inválido:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Recuperação WXR válida: ${acceptedPostIds.length} posts em revisão, ${audit.trashedPostsQuarantined} itens em quarentena, ${audit.attachmentsIndexed} anexos inventariados e ${audit.injectedScriptTagsRemovedFromPublishedPosts} scripts removidos.`,
);
