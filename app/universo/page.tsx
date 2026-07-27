import type { Metadata } from "next";
import Link from "next/link";
import { UniverseExplorer } from "@/components/UniverseExplorer";
import styles from "./UniversePage.module.css";

export const metadata: Metadata = {
  title: "Universo Fradim",
  description:
    "Navegação tridimensional pelas conexões entre Marcelo Fradim, Spock, inteligência artificial, projetos, marketing, cultura, memória e experimentação.",
  alternates: { canonical: "/universo" },
};

export default function UniversePage() {
  return (
    <main className={styles.page}>
      <nav className="top-nav inner-nav" aria-label="Navegação principal">
        <Link className="brand" href="/" aria-label="Marcelo Fradim — início">
          MF<span className="brand-dot">.</span>
        </Link>
        <Link className="back-home" href="/">← Home</Link>
      </nav>

      <UniverseExplorer variant="fullscreen" />

      <div className={styles.legend} aria-hidden="true">
        <span>Drag / orbit</span>
        <span>Click / select</span>
        <span>Enter / territory</span>
      </div>
    </main>
  );
}
