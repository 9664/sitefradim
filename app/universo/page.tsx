import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
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
      <SiteNav mode="universe" />

      <UniverseExplorer variant="fullscreen" />

      <div className={styles.legend} aria-hidden="true">
        <span>Drag / orbit</span>
        <span>Click / select</span>
        <span>Enter / territory</span>
      </div>
    </main>
  );
}
