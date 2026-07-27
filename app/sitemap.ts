import type { MetadataRoute } from "next";

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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `https://fradim.com.br${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projetos/") ? 0.75 : 0.8,
  }));
}
