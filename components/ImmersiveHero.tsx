"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import portraitStyles from "./ImmersiveHeroPortrait.module.css";
import { SiteNav } from "./SiteNav";

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

    const activate = () => {
      setRender3D(true);
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("scroll", activate);
      window.removeEventListener("keydown", activate);
    };

    window.addEventListener("pointerdown", activate, { passive: true });
    window.addEventListener("scroll", activate, { passive: true });
    window.addEventListener("keydown", activate);

    return () => {
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

      <div className={portraitStyles.portrait} aria-hidden="true">
        <div className={portraitStyles.aura} />
        <Image
          src="/hero/marcelo-fradim-hero-portrait.svg"
          alt=""
          fill
          priority
          sizes="(max-width: 850px) 0px, (max-width: 1280px) 30vw, 420px"
          className={portraitStyles.image}
        />
      </div>

      <SiteNav mode="home" />

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
