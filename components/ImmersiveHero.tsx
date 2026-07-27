"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const UniverseScene = dynamic(
  () => import("./UniverseScene").then((module) => module.UniverseScene),
  { ssr: false, loading: () => <div className="scene-fallback" aria-hidden="true" /> },
);

export function ImmersiveHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true">
        <UniverseScene />
      </div>

      <nav className="top-nav" aria-label="Navegação principal">
        <Link className="brand" href="/" prefetch={false} aria-label="Marcelo Fradim — início">
          MF<span className="brand-dot">.</span>
        </Link>
        <div className="nav-links">
          <Link href="/sobre" prefetch={false}>Marcelo</Link>
          <Link href="/spock" prefetch={false}>Spock</Link>
          <Link href="/lab" prefetch={false}>Lab</Link>
          <Link href="/projetos" prefetch={false}>Work</Link>
          <Link href="/ideias" prefetch={false}>Ideias</Link>
        </div>
      </nav>

      <div className="hero-copy">
        <p className="eyebrow">MARCELO FRADIM × SPOCK</p>
        <h1 id="hero-title">
          Human creativity.
          <span>Artificial intelligence.</span>
        </h1>
        <p className="hero-intro">
          Um laboratório digital sobre IA, inovação, negócios, tecnologia,
          cultura e tudo o que acontece quando um humano e uma inteligência
          artificial aprendem a construir juntos.
        </p>
        <div className="hero-actions">
          <Link className="primary-action" href="/universo" prefetch={false}>Explorar o universo</Link>
          <Link className="secondary-action" href="/spock" prefetch={false}>Quem é Spock?</Link>
        </div>
      </div>

      <div className="hero-axis" aria-hidden="true">
        <span>M</span><i /><span>S</span>
      </div>

      <p className="scroll-cue" aria-hidden="true">SCROLL TO EXPLORE ↓</p>
    </section>
  );
}
