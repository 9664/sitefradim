import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const ORIGIN = "https://fradim.com.br";
const manifest = JSON.parse(fs.readFileSync("config/legacy-routes.json", "utf8"));
const errors = [];

function routeFile(route) {
  if (route === "/") return path.join(OUT, "index.html");
  const relative = route.replace(/^\/+|\/+$/g, "");
  const candidates = [
    path.join(OUT, relative, "index.html"),
    path.join(OUT, `${relative}.html`),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function normalizedPath(value) {
  const url = new URL(value, ORIGIN);
  if (url.pathname === "/") return "/";
  return url.pathname.replace(/\/+$/, "");
}

function canonicalFrom(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/rel=["'][^"']*canonical/i.test(tag)) continue;
    const match = tag.match(/href=["']([^"']+)["']/i);
    if (match) return match[1];
  }
  return null;
}

function hasNoindex(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.some((tag) => {
    const name = tag.match(/name=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    const content = tag.match(/content=["']([^"']+)["']/i)?.[1]?.toLowerCase() ?? "";
    return (name === "robots" || name === "googlebot") && content.includes("noindex");
  });
}

function sitemapContains(sitemap, route) {
  const expected = normalizedPath(route);
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1]);
  return urls.some((value) => {
    try {
      const url = new URL(value);
      return url.origin === ORIGIN && normalizedPath(url.pathname) === expected;
    } catch {
      return false;
    }
  });
}

if (!fs.existsSync(OUT)) errors.push("out/ não existe");
const sitemapPath = path.join(OUT, "sitemap.xml");
const robotsPath = path.join(OUT, "robots.txt");
if (!fs.existsSync(sitemapPath)) errors.push("sitemap.xml ausente");
if (!fs.existsSync(robotsPath)) errors.push("robots.txt ausente");

const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, "utf8") : "";

if ((manifest.pending ?? []).length) errors.push("manifesto ainda contém rotas pendentes");
if (/disallow:\s*\//i.test(robots)) errors.push("robots.txt de produção bloqueia o site");
if (!/allow:\s*\//i.test(robots)) errors.push("robots.txt de produção não contém Allow: /");
if (!robots.includes(`${ORIGIN}/sitemap.xml`)) errors.push("robots.txt não referencia sitemap de produção");
if (!robots.includes(`Host: ${ORIGIN}`)) errors.push("robots.txt não declara host de produção");
if (sitemap.includes("github.io") || sitemap.includes("/sitefradim")) errors.push("sitemap contém referência ao staging");

for (const entry of manifest.resolved ?? []) {
  if (entry.action === "preserve") {
    const file = routeFile(entry.source);
    if (!file) {
      errors.push(`preserve ${entry.source}: HTML ausente`);
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    const canonical = canonicalFrom(html);
    if (!canonical) {
      errors.push(`preserve ${entry.source}: canonical ausente`);
    } else {
      const url = new URL(canonical, ORIGIN);
      if (url.origin !== ORIGIN || normalizedPath(url.pathname) !== normalizedPath(entry.source)) {
        errors.push(`preserve ${entry.source}: canonical incorreto ${canonical}`);
      }
    }
    if (hasNoindex(html)) errors.push(`preserve ${entry.source}: noindex em produção`);
    if (html.includes("github.io") || html.includes("/sitefradim")) errors.push(`preserve ${entry.source}: referência ao staging`);
    if (!sitemapContains(sitemap, entry.source)) errors.push(`preserve ${entry.source}: ausente do sitemap`);
  }

  if (entry.action === "redirect") {
    if (routeFile(entry.source)) errors.push(`redirect ${entry.source}: origem ainda gera HTML`);
    if (!routeFile(entry.target)) errors.push(`redirect ${entry.source}: destino ${entry.target} não existe`);
    if (sitemapContains(sitemap, entry.source)) errors.push(`redirect ${entry.source}: origem ainda aparece no sitemap`);
    if (!sitemapContains(sitemap, entry.target)) errors.push(`redirect ${entry.source}: destino não aparece no sitemap`);
  }

  if (entry.action === "remove") {
    if (routeFile(entry.source)) errors.push(`remove ${entry.source}: rota ainda gera HTML`);
    if (sitemapContains(sitemap, entry.source)) errors.push(`remove ${entry.source}: rota ainda aparece no sitemap`);
  }
}

fs.mkdirSync("preflight", { recursive: true });
const resolved = manifest.resolved ?? [];
const counts = {
  preserve: resolved.filter((entry) => entry.action === "preserve").length,
  redirect: resolved.filter((entry) => entry.action === "redirect").length,
  remove: resolved.filter((entry) => entry.action === "remove").length,
  pending: (manifest.pending ?? []).length,
};

let report = "# Production SEO Preflight\n\n";
report += `Resultado: **${errors.length ? "FALHOU" : "APROVADO"}**\n\n`;
report += `200 preservados: **${counts.preserve}** · redirects: **${counts.redirect}** · 410: **${counts.remove}** · pendências: **${counts.pending}**\n\n`;
if (errors.length) {
  report += "## Erros\n\n" + errors.map((error) => `- ${error}`).join("\n") + "\n";
} else {
  report += "Robots, sitemap, canonicals e estados 200/redirect/remove estão coerentes com o build de produção.\n";
}
report += "\nEste teste não executa deploy nem altera DNS.\n";
fs.writeFileSync("preflight/seo-report.md", report);
console.log(report);

if (errors.length) process.exit(1);
