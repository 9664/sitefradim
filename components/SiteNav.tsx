import Link from "next/link";

type SiteNavMode = "home" | "inner" | "universe";

const primaryLinks = [
  ["Marcelo", "/sobre"],
  ["Spock", "/spock"],
  ["Arquivo", "/arquivo"],
  ["Work", "/projetos"],
  ["Ideias", "/ideias"],
  ["Lab", "/lab"],
  ["Contato", "/contato"],
] as const;

type SiteNavProps = {
  mode?: SiteNavMode;
  backHref?: string;
  backLabel?: string;
};

export function SiteNav({ mode = "inner", backHref, backLabel }: SiteNavProps) {
  const inner = mode !== "home";
  const resolvedBackHref = backHref ?? (mode === "universe" ? "/" : "/universo");
  const resolvedBackLabel = backLabel ?? (mode === "universe" ? "Home" : "Universo");

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
        <Link className="back-home" href={resolvedBackHref} prefetch={false}>
          ← {resolvedBackLabel}
        </Link>
      )}
    </nav>
  );
}
