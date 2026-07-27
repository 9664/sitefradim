import type { MetadataRoute } from "next";
import { ideas } from "@/lib/ideas";

export const dynamic = "force-static";

const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === "staging";

const routes = [
  "",
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
  "/contato",
  ...ideas.map((idea) => `/ideias/${idea.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (isStaging) return [];

  const now = new Date();
  return routes.map((route) => ({
    url: `https://fradim.com.br${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/ideias" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projetos/") || route.startsWith("/ideias/") ? 0.75 : 0.8,
  }));
}
