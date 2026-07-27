import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === "staging";

export default function robots(): MetadataRoute.Robots {
  if (isStaging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://fradim.com.br/sitemap.xml",
    host: "https://fradim.com.br",
  };
}
