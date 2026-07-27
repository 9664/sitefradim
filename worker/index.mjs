import { legacyRemovals } from "./generated-legacy-removals.mjs";

export function normalizePathname(pathname) {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function createLegacyHandler(removals = legacyRemovals) {
  const removalMap = new Map(removals.map((rule) => [rule.source, rule]));

  return async function handleRequest(request, env) {
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
  };
}

const handleRequest = createLegacyHandler();

export default {
  fetch: handleRequest,
};
