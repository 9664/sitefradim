"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import portraitStyles from "./ImmersiveHeroPortrait.module.css";
import { SiteNav } from "./SiteNav";

const UniverseScene = dynamic(
  () => import("./UniverseScene").then((module) => module.UniverseScene),
  { ssr: false, loading: () => <div className="scene-fallback" aria-hidden="true" /> },
);

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const portraitSrc = `${publicBasePath}/hero/marcelo-fradim-hero-transparent.webp`;

export function ImmersiveHero() {
  const [render3D, setRender3D] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const applyPosition = (x: number, y: number) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        hero.style.setProperty("--portrait-shift-x", `${x * -13}px`);
        hero.style.setProperty("--portrait-shift-y", `${y * -8}px`);
        hero.style.setProperty("--orbit-shift-x", `${x * 8}px`);
        hero.style.setProperty("--orbit-shift-y", `${y * 5}px`);
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
      applyPosition(x, y);
    };

    const reset = () => applyPosition(0, 0);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true">
        {render3D ? <UniverseScene /> : <div className="scene-fallback" />}
      </div>

      <div className={portraitStyles.portrait} aria-hidden="true">
        <div className={portraitStyles.aura} />
        <Image
          src={portraitSrc}
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 850px) 0px, (max-width: 1280px) 44vw, 760px"
          className={portraitStyles.image}
        />
      </div>

      <div className={portraitStyles.orbitForeground} aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
          <path
            className={`${portraitStyles.orbitLine} ${portraitStyles.orbitLinePrimary}`}
            d="M 1680 156 C 1438 72 1206 94 1021 216 C 836 338 753 566 438 706"
          />
          <path
            className={`${portraitStyles.orbitLine} ${portraitStyles.orbitLineSecondary}`}
            d="M 1570 932 C 1414 724 1241 582 1028 568 C 809 554 648 674 427 824"
          />
          <path
            className={`${portraitStyles.orbitLine} ${portraitStyles.orbitLineTertiary}`}
            d="M 1330 954 C 1082 704 820 642 482 714"
          />
          <circle className={`${portraitStyles.orbitPulse} ${portraitStyles.pulseOne}`} cx="1021" cy="216" r="4.2" />
          <circle className={`${portraitStyles.orbitPulse} ${portraitStyles.pulseTwo}`} cx="1168" cy="584" r="4.8" />
          <circle className={`${portraitStyles.orbitPulse} ${portraitStyles.pulseThree}`} cx="786" cy="708" r="3.6" />
        </svg>
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
