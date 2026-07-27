"use client";

import { Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./UniverseExplorer.module.css";

type NodeId = "marcelo" | "spock" | "ia" | "intelig" | "gestor" | "amo" | "marketing" | "memoria" | "vibe" | "lab" | "ideias";
type UniverseVariant = "section" | "fullscreen";

type UniverseNode = {
  id: NodeId;
  label: string;
  kicker: string;
  description: string;
  href: string;
  position: [number, number, number];
  size: number;
  tone: "human" | "ai" | "bridge";
};

const nodes: UniverseNode[] = [
  { id: "marcelo", label: "Marcelo", kicker: "HUMANO", description: "Contexto, experiência, intuição, repertório e visão construídos ao longo de décadas.", href: "/sobre", position: [-2.7, 0.35, 0], size: 0.7, tone: "human" },
  { id: "spock", label: "Spock", kicker: "INTELIGÊNCIA", description: "Análise, estrutura, pesquisa e amplificação: uma IA usada como parceira de pensamento e construção.", href: "/spock", position: [2.7, -0.25, 0], size: 0.66, tone: "ai" },
  { id: "ia", label: "IA", kicker: "FRONTEIRA", description: "Agentes, automação, context engineering e redesenho de processos a partir da inteligência artificial.", href: "/inteligencia-artificial", position: [0.3, 2.45, -0.55], size: 0.42, tone: "bridge" },
  { id: "intelig", label: "Intelig.Cloud", kicker: "PROJETO", description: "Soluções, agentes digitais, automações e produtos que transformam IA em capacidade operacional.", href: "/projetos/intelig-cloud", position: [2.45, 1.75, -1.25], size: 0.36, tone: "ai" },
  { id: "gestor", label: "Gestor 360", kicker: "SISTEMA", description: "Marketing, trade, campanhas, tarefas, BI e processos reunidos em uma visão operacional integrada.", href: "/projetos/gestor-360", position: [3.65, 0.65, 0.65], size: 0.3, tone: "ai" },
  { id: "amo", label: "Amo Franca", kicker: "COMUNIDADE", description: "Cultura, comunicação, memória coletiva e construção de comunidade conectadas por tecnologia.", href: "/projetos/amo-franca", position: [-3.6, 1.8, -0.65], size: 0.38, tone: "human" },
  { id: "marketing", label: "Marketing", kicker: "EXPERIÊNCIA", description: "Estratégia, varejo, comunicação, branding e comportamento como base para compreender problemas reais.", href: "/trajetoria", position: [-3.9, -1.2, 0.85], size: 0.34, tone: "human" },
  { id: "memoria", label: "Memória", kicker: "CULTURA", description: "Pesquisa iconográfica, fotografia histórica, preservação digital e reconstrução visual do passado.", href: "/memoria", position: [-1.65, -2.45, -0.8], size: 0.32, tone: "human" },
  { id: "vibe", label: "Vibe Coding", kicker: "CONSTRUÇÃO", description: "Desenvolvimento assistido por IA como nova forma de transformar intenção em software funcional.", href: "/lab", position: [1.75, -2.25, 0.65], size: 0.31, tone: "ai" },
  { id: "lab", label: "Lab", kicker: "EXPERIMENTAÇÃO", description: "Protótipos, agentes, interfaces, pesquisas e experiências públicas em evolução contínua.", href: "/lab", position: [4.15, -1.35, -1.05], size: 0.29, tone: "ai" },
  { id: "ideias", label: "Ideias", kicker: "PENSAMENTO", description: "Artigos, ensaios e diálogos onde hipóteses são confrontadas antes de virarem respostas prontas.", href: "/ideias", position: [-0.15, 3.65, 0.85], size: 0.28, tone: "bridge" },
];

const edges: [NodeId, NodeId][] = [
  ["marcelo", "spock"], ["marcelo", "marketing"], ["marcelo", "amo"], ["marcelo", "memoria"], ["marcelo", "ia"],
  ["spock", "ia"], ["spock", "intelig"], ["spock", "gestor"], ["spock", "vibe"], ["spock", "lab"],
  ["ia", "intelig"], ["ia", "vibe"], ["ia", "ideias"], ["intelig", "gestor"], ["intelig", "lab"],
  ["marketing", "gestor"], ["marketing", "amo"], ["amo", "memoria"], ["memoria", "ia"], ["vibe", "lab"],
  ["ideias", "marcelo"], ["ideias", "spock"],
];

function NodeOrb({ node, selected, onSelect, compact }: { node: UniverseNode; selected: boolean; onSelect: (id: NodeId) => void; compact: boolean }) {
  const emissive = node.tone === "human" ? "#9fb2c5" : node.tone === "ai" ? "#dce9f7" : "#b8c8d8";

  return (
    <group position={node.position}>
      <mesh scale={selected ? 1.15 : 1} onClick={() => onSelect(node.id)}>
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshPhysicalMaterial
          color={selected ? "#f6fbff" : "#aebdcb"}
          emissive={emissive}
          emissiveIntensity={selected ? 1.35 : 0.42}
          roughness={0.22}
          metalness={0.5}
          transmission={0.08}
          transparent
          opacity={selected ? 0.94 : 0.72}
        />
      </mesh>
      <Html center distanceFactor={compact ? 11.8 : 9.5} zIndexRange={[30, 0]}>
        <button className={`${styles.label} ${selected ? styles.selected : ""}`} type="button" onClick={() => onSelect(node.id)} aria-pressed={selected}>
          <small>{node.kicker}</small>
          <strong>{node.label}</strong>
        </button>
      </Html>
    </group>
  );
}

function Graph({ selected, onSelect, compact, fullscreen }: { selected: NodeId; onSelect: (id: NodeId) => void; compact: boolean; fullscreen: boolean }) {
  const displayNodes = useMemo<UniverseNode[]>(() => {
    const xScale = compact ? (fullscreen ? 0.55 : 0.72) : fullscreen ? 0.88 : 1;
    const yScale = compact ? (fullscreen ? 0.58 : 0.86) : fullscreen ? 0.68 : 1;
    const zScale = compact ? 0.88 : 1;
    const offsetX = fullscreen && !compact ? 1.05 : 0;
    const offsetY = fullscreen ? (compact ? -0.25 : -0.45) : 0;

    if (!compact && !fullscreen) return nodes;

    return nodes.map((node) => ({
      ...node,
      position: [
        node.position[0] * xScale + offsetX,
        node.position[1] * yScale + offsetY,
        node.position[2] * zScale,
      ] as [number, number, number],
      size: compact ? Math.max(node.size * (fullscreen ? 0.84 : 0.92), 0.26) : node.size,
    }));
  }, [compact, fullscreen]);

  const index = useMemo(() => new Map(displayNodes.map((node) => [node.id, node])), [displayNodes]);

  return (
    <>
      {edges.map(([from, to]) => {
        const a = index.get(from);
        const b = index.get(to);
        if (!a || !b) return null;
        const active = from === selected || to === selected;
        return <Line key={`${from}-${to}`} points={[a.position, b.position]} color={active ? "#dbe8f5" : "#677889"} lineWidth={active ? 1.15 : 0.55} transparent opacity={active ? 0.58 : 0.18} />;
      })}
      {displayNodes.map((node) => <NodeOrb key={node.id} node={node} selected={node.id === selected} onSelect={onSelect} compact={compact} />)}
    </>
  );
}

export function UniverseExplorer({ variant = "section" }: { variant?: UniverseVariant }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<NodeId>("marcelo");
  const [compact, setCompact] = useState(false);
  const fullscreen = variant === "fullscreen";
  const [render3D, setRender3D] = useState(fullscreen);
  const active = nodes.find((node) => node.id === selected) ?? nodes[0];

  useEffect(() => {
    const media = window.matchMedia("(max-width: 850px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (fullscreen) {
      setRender3D(true);
      return;
    }

    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setRender3D(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setRender3D(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [fullscreen]);

  const cameraZ = compact ? (fullscreen ? 13.9 : 11.8) : fullscreen ? 11.5 : 10.4;
  const cameraFov = compact ? (fullscreen ? 50 : 52) : 48;
  const target: [number, number, number] = fullscreen
    ? compact
      ? [0, 0.42, 0]
      : [0.25, 0.55, 0]
    : [0, 0, 0];

  return (
    <section ref={sectionRef} id="universo-fradim" className={styles.explorer} data-variant={variant} aria-labelledby="universe-title">
      <header className={styles.heading}>
        <div>
          <p className="eyebrow">UNIVERSO FRADIM / V0.1</p>
          <h2 id="universe-title">Não leia apenas a trajetória. Navegue pelas conexões.</h2>
        </div>
        <p className={styles.instruction}>{compact ? "Toque em um nó · arraste para orbitar" : "Arraste para orbitar · role para aproximar · toque para explorar"}</p>
      </header>

      <div className={styles.stage}>
        <div className={styles.canvas} role="group" aria-label="Mapa tridimensional interativo da trajetória de Marcelo Fradim e Spock">
          {render3D ? (
            <Canvas
              key={`${variant}-${compact ? "compact" : "desktop"}`}
              frameloop="demand"
              dpr={compact ? [1, 1.15] : [1, 1.35]}
              camera={{ position: [0, compact ? 0.45 : 0.2, cameraZ], fov: cameraFov }}
              gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
            >
              <ambientLight intensity={0.4} />
              <directionalLight position={[2, 6, 6]} intensity={2.6} />
              <pointLight position={[-5, -2, 4]} intensity={14} distance={12} />
              <pointLight position={[5, 2, -2]} intensity={10} distance={10} />
              <Graph selected={selected} onSelect={setSelected} compact={compact} fullscreen={fullscreen} />
              <Sparkles count={compact ? (fullscreen ? 48 : 60) : 82} scale={compact ? [8, 7, 5] : [12, 9, 6]} size={0.9} speed={0} opacity={0.22} />
              <OrbitControls
                makeDefault
                target={target}
                enablePan={false}
                enableDamping
                dampingFactor={0.055}
                rotateSpeed={compact ? 0.35 : 0.45}
                zoomSpeed={0.55}
                minDistance={compact ? (fullscreen ? 11.2 : 9.5) : fullscreen ? 9 : 7.6}
                maxDistance={compact ? 16 : fullscreen ? 14 : 12.5}
                minPolarAngle={Math.PI * 0.26}
                maxPolarAngle={Math.PI * 0.74}
              />
            </Canvas>
          ) : null}
        </div>

        <aside className={styles.panel} aria-live="polite">
          <span className={styles.panelKicker}>{active.kicker}</span>
          <h3>{active.label}</h3>
          <p>{active.description}</p>
          <Link href={active.href} prefetch={false}>Entrar neste território →</Link>
          <div className={styles.coordinate} aria-hidden="true">{active.position.map((value) => value.toFixed(2)).join(" / ")}</div>
        </aside>

        <div className={styles.signature} aria-hidden="true"><span>M</span><i>×</i><span>S</span></div>
      </div>
    </section>
  );
}
