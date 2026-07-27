"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const UniverseScene = dynamic(
  () => import("./UniverseScene").then((module) => module.UniverseScene),
  { ssr: false, loading: () => <div className="scene-fallback" aria-hidden="true" /> },
);

export function ImmersiveHero() {
  const [render3D, setRender3D] = useState(false);

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 850px)");

    if (!compact.matches) {
      const frame = window.requestAnimationFrame(() => setRender3D(true));
      return () => window.cancelAnimationFrame(frame);
    }

    let timer = 0;
    const activate = () => {
      setRender3D(true);
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("scroll", activate);
      window.removeEventListener("keydown", activate);
    };

    window.addEventListener("pointerdown", activate, { passive: true });
    window.addEventListener("scroll", activate, { passive: true });
    window.addEventListener("keydown", activate);
    timer = window.setTimeout(activate, 12000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("scroll", activate);
      window.removeEventListener("keydown", activate);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true">
        {render3D ? <UniverseScene /> : <div className="scene-fallback" />}
      </div>

      <nav className="top-nav" aria-label="Navegação principal">
        <Link className="brand" href="/" prefetch={false} aria-label="MF. Marcelo Fradim — início">
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
