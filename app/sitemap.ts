import type { MetadataRoute } from "next";
import { ideas } from "@/lib/ideas";
import { legacyMemoryEntries } from "@/lib/legacyMemory";

export const dynamic = "force-static";

const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === "staging";

const routes = [
  "",
  "/universo",
  "/sobre",
  "/spock",
  "/inteligencia-artificial",
  "/trajetoria",
  "/projetos",
  "/projetos/intelig-cloud",
  "/projetos/amo-franca",
  "/projetos/gestor-360",
  "/lab",
  "/ideias",
  "/imprensa",
  "/memoria",
  "/restauracao-fotografica",
  "/contato",
  ...legacyMemoryEntries.map((entry) => `/${entry.slug}`),
  ...ideas.map((idea) => `/ideias/${idea.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (isStaging) return [];

  const now = new Date();
  return routes.map((route) => ({
    url: `https://fradim.com.br${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/ideias" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/universo"
          ? 0.9
          : route === "/restauracao-fotografica"
            ? 0.85
            : legacyMemoryEntries.some((entry) => route === `/${entry.slug}`)
              ? 0.72
              : route.startsWith("/projetos/") || route.startsWith("/ideias/")
                ? 0.75
                : 0.8,
  }));
}
