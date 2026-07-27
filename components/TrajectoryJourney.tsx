"use client";

import { Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import type { Group, Mesh } from "three";
import styles from "./TrajectoryJourney.module.css";

const stages = [
  {
    kicker: "01 / ORIGEM",
    title: "Imagem e design",
    short: "Criatividade como linguagem.",
    body: "Antes dos agentes e dos modelos de linguagem, vieram imagem, composição, fotografia, design e a necessidade de transformar ideias em algo visível.",
    href: "/trajetoria",
  },
  {
    kicker: "02 / MERCADO",
    title: "Marketing e negócios",
    short: "Criatividade encontra resultado.",
    body: "Indústria, varejo, comunicação, marcas e comportamento acrescentaram uma nova regra: uma boa ideia também precisa funcionar no mundo real.",
    href: "/trajetoria",
  },
  {
    kicker: "03 / COMUNIDADE",
    title: "Amo Franca",
    short: "Tecnologia cria pertencimento.",
    body: "Memória, cultura, pesquisa iconográfica e comunicação digital mostraram que tecnologia também pode conectar pessoas a um lugar e à própria história.",
    href: "/projetos/amo-franca",
  },
  {
    kicker: "04 / SISTEMAS",
    title: "Produtos digitais",
    short: "Ideias tornam-se infraestrutura.",
    body: "Automação, software, processos e sistemas transformaram a tecnologia de ferramenta criativa em camada operacional para empresas e projetos.",
    href: "/projetos",
  },
  {
    kicker: "05 / AGORA",
    title: "Marcelo × Spock",
    short: "Humano e IA aprendem a construir juntos.",
    body: "A inteligência artificial conecta repertório, estratégia, código e experimentação. Spock não substitui o pensamento humano: amplia o espaço onde ele pode operar.",
    href: "/spock",
  },
] as const;

const spacing = 8.5;

function Artifact({ index, progress }: { index: number; progress: MutableRefObject<number> }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return;
    const stageProgress = progress.current * (stages.length - 1);
    const distance = Math.abs(stageProgress - index);
    const focus = Math.max(0, 1 - distance);

    group.current.rotation.y += delta * (0.08 + index * 0.012);
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22 + index) * 0.12;
    const scale = 0.82 + focus * 0.42;
    group.current.scale.setScalar(scale);
    mesh.current.rotation.z += delta * (0.045 + focus * 0.09);
  });

  const x = index % 2 === 0 ? -1.25 : 1.25;
  const y = index === 2 ? 0.45 : index % 2 === 0 ? 0.25 : -0.25;
  const z = -index * spacing;

  const geometry = (() => {
    switch (index) {
      case 0:
        return <octahedronGeometry args={[1.2, 1]} />;
      case 1:
        return <boxGeometry args={[1.85, 1.85, 1.85]} />;
      case 2:
        return <dodecahedronGeometry args={[1.25, 0]} />;
      case 3:
        return <torusKnotGeometry args={[0.95, 0.24, 140, 20]} />;
      default:
        return <icosahedronGeometry args={[1.3, 2]} />;
    }
  })();

  return (
    <group ref={group} position={[x, y, z]}>
      <mesh ref={mesh}>
        {geometry}
        <meshPhysicalMaterial
          color={index === stages.length - 1 ? "#ecf5ff" : "#9fb2c4"}
          emissive={index === stages.length - 1 ? "#a8c7e4" : "#58728b"}
          emissiveIntensity={index === stages.length - 1 ? 0.7 : 0.28}
          metalness={0.68}
          roughness={0.24}
          transparent
          opacity={0.78}
        />
      </mesh>

      <mesh scale={1.65}>
        <sphereGeometry args={[1.05, 24, 24]} />
        <meshBasicMaterial color="#9fb9d1" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function JourneyWorld({ progress }: { progress: MutableRefObject<number> }) {
  const rig = useRef<Group>(null);

  useFrame((state) => {
    const p = progress.current;
    const targetZ = 5.8 - p * spacing * (stages.length - 1);
    const targetX = Math.sin(p * Math.PI * 2.2) * 0.55;
    const targetY = Math.cos(p * Math.PI * 1.4) * 0.18;

    state.camera.position.z += (targetZ - state.camera.position.z) * 0.055;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, targetZ - 5.8);

    if (rig.current) {
      rig.current.rotation.z = Math.sin(p * Math.PI * 2) * 0.035;
    }
  });

  const path = stages.map((_, index) => [index % 2 === 0 ? -1.25 : 1.25, index === 2 ? 0.45 : index % 2 === 0 ? 0.25 : -0.25, -index * spacing] as [number, number, number]);

  return (
    <group ref={rig}>
      <Line points={path} color="#8da5bb" transparent opacity={0.24} lineWidth={0.65} />
      {stages.map((_, index) => (
        <Artifact key={index} index={index} progress={progress} />
      ))}
      <Sparkles count={140} scale={[11, 7, spacing * stages.length]} size={0.8} speed={0.06} opacity={0.2} />
    </group>
  );
}

export function TrajectoryJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const raw = -rect.top / scrollable;
      const clamped = Math.min(1, Math.max(0, raw));
      progress.current = clamped;

      const nextIndex = Math.min(stages.length - 1, Math.max(0, Math.round(clamped * (stages.length - 1))));
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const scrollable = section.offsetHeight - window.innerHeight;
    const ratio = index / (stages.length - 1);
    window.scrollTo({ top: top + scrollable * ratio, behavior: "smooth" });
  };

  const active = stages[activeIndex];

  return (
    <section ref={sectionRef} className={styles.journey} aria-labelledby="journey-title">
      <div className={styles.sticky}>
        <div className={styles.canvas} aria-hidden="true">
          <Canvas dpr={[1, 1.45]} camera={{ position: [0, 0, 5.8], fov: 44 }} gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}>
            <fog attach="fog" args={["#07090c", 8, 24]} />
            <ambientLight intensity={0.42} />
            <directionalLight position={[4, 6, 5]} intensity={2.8} />
            <pointLight position={[-4, -2, 4]} intensity={12} distance={13} />
            <JourneyWorld progress={progress} />
          </Canvas>
        </div>

        <header className={styles.heading}>
          <p className="eyebrow">TRAJETÓRIA / EM MOVIMENTO</p>
          <h2 id="journey-title">Da matéria ao pixel. Do mercado à inteligência.</h2>
        </header>

        <div className={styles.counter} aria-hidden="true">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <i />
          <span>{String(stages.length).padStart(2, "0")}</span>
        </div>

        <aside className={styles.story} aria-live="polite">
          <p>{active.kicker}</p>
          <h3>{active.title}</h3>
          <strong>{active.short}</strong>
          <div>{active.body}</div>
          <Link href={active.href}>Explorar esta etapa →</Link>
        </aside>

        <nav className={styles.steps} aria-label="Etapas da trajetória">
          {stages.map((stage, index) => (
            <button
              key={stage.title}
              type="button"
              className={index === activeIndex ? styles.activeStep : undefined}
              onClick={() => jumpTo(index)}
              aria-current={index === activeIndex ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
              <strong>{stage.title}</strong>
            </button>
          ))}
        </nav>

        <p className={styles.scrollHint} aria-hidden="true">SCROLL ↓</p>
      </div>
    </section>
  );
}
