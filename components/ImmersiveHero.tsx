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
        <Link className="brand" href="/" aria-label="Marcelo Fradim — início">
          MF<span className="brand-dot">.</span>
        </Link>
        <div className="nav-links">
          <Link href="/sobre">Marcelo</Link>
          <Link href="/spock">Spock</Link>
          <Link href="/lab">Lab</Link>
          <Link href="/projetos">Work</Link>
          <Link href="/ideias">Ideias</Link>
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
          <Link className="primary-action" href="/universo">Explorar o universo</Link>
          <Link className="secondary-action" href="/spock">Quem é Spock?</Link>
        </div>
      </div>

      <div className="hero-axis" aria-hidden="true">
        <span>M</span><i /><span>S</span>
      </div>

      <p className="scroll-cue" aria-hidden="true">SCROLL TO EXPLORE ↓</p>
    </section>
  );
}
