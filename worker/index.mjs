import { legacyRemovals } from "./generated-legacy-removals.mjs";

const removalMap = new Map(legacyRemovals.map((rule) => [rule.source, rule]));

function normalizePathname(pathname) {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = normalizePathname(url.pathname);
    const rule = removalMap.get(pathname);

    if (rule) {
      return new Response("Conteúdo removido.", {
        status: rule.status,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=300",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
