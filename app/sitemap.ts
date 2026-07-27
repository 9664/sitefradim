import type { MetadataRoute } from "next";

const routes = [
  "",
  "/sobre",
  "/spock",
  "/inteligencia-artificial",
  "/trajetoria",
  "/projetos",
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
    priority: route === "" ? 1 : 0.8,
  }));
}
