import Link from "next/link";

type SiteNavMode = "home" | "inner" | "universe";

const primaryLinks = [
  ["Marcelo", "/sobre"],
  ["Spock", "/spock"],
  ["Lab", "/lab"],
  ["Work", "/projetos"],
  ["Ideias", "/ideias"],
] as const;

export function SiteNav({ mode = "inner" }: { mode?: SiteNavMode }) {
  const inner = mode !== "home";

  return (
    <nav className={`top-nav${inner ? " inner-nav" : ""}`} aria-label="Navegação principal">
      <Link className="brand" href="/" prefetch={false} aria-label="MF. Marcelo Fradim — início">
        MF<span className="brand-dot">.</span>
      </Link>

      {mode === "home" ? (
        <div className="nav-links">
          {primaryLinks.map(([label, href]) => (
            <Link href={href} prefetch={false} key={href}>{label}</Link>
          ))}
        </div>
      ) : (
        <Link className="back-home" href={mode === "universe" ? "/" : "/universo"} prefetch={false}>
          {mode === "universe" ? "← Home" : "← Universo"}
        </Link>
      )}
    </nav>
  );
}
