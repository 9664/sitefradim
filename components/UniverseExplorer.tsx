"use client";

import { Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./UniverseExplorer.module.css";

type NodeId = "marcelo" | "spock" | "ia" | "intelig" | "gestor" | "amo" | "marketing" | "memoria" | "arquivo" | "vibe" | "lab" | "ideias";
type UniverseVariant = "section" | "fullscreen";
type NodeTone = "human" | "ai" | "bridge";

type UniverseNode = {
  id: NodeId;
  label: string;
  kicker: string;
  description: string;
  href: string;
  position: [number, number, number];
  size: number;
  tone: NodeTone;
  code: string;
};

const toneVisuals: Record<NodeTone, { accent: string; glow: string; node: string; emissive: string }> = {
  human: {
    accent: "#e4a26f",
    glow: "rgba(213, 112, 59, 0.28)",
    node: "#d7a17b",
    emissive: "#7d402a",
  },
  ai: {
    accent: "#9dc8f6",
    glow: "rgba(83, 143, 218, 0.3)",
    node: "#a9c9e8",
    emissive: "#325d88",
  },
  bridge: {
    accent: "#d6c4a4",
    glow: "rgba(194, 164, 117, 0.25)",
    node: "#c9c3b8",
    emissive: "#74634e",
  },
};

const nodes: UniverseNode[] = [
  { id: "marcelo", label: "Marcelo", kicker: "HUMANO", description: "Contexto, experiência, intuição, repertório e visão construídos ao longo de décadas.", href: "/sobre", position: [-2.7, 0.35, 0], size: 0.7, tone: "human", code: "H-01" },
  { id: "spock", label: "Spock", kicker: "INTELIGÊNCIA", description: "Análise, estrutura, pesquisa e amplificação: uma IA usada como parceira de pensamento e construção.", href: "/spock", position: [2.7, -0.25, 0], size: 0.66, tone: "ai", code: "A-01" },
  { id: "ia", label: "IA", kicker: "FRONTEIRA", description: "Agentes, automação, context engineering e redesenho de processos a partir da inteligência artificial.", href: "/inteligencia-artificial", position: [0.3, 2.45, -0.55], size: 0.42, tone: "bridge", code: "B-01" },
  { id: "intelig", label: "Intelig.Cloud", kicker: "PROJETO", description: "Soluções, agentes digitais, automações e produtos que transformam IA em capacidade operacional.", href: "/projetos/intelig-cloud", position: [2.45, 1.75, -1.25], size: 0.36, tone: "ai", code: "A-02" },
  { id: "gestor", label: "Gestor 360", kicker: "SISTEMA", description: "Marketing, trade, campanhas, tarefas, BI e processos reunidos em uma visão operacional integrada.", href: "/projetos/gestor-360", position: [3.65, 0.65, 0.65], size: 0.3, tone: "ai", code: "A-03" },
  { id: "amo", label: "Amo Franca", kicker: "COMUNIDADE", description: "Cultura, comunicação, memória coletiva e construção de comunidade conectadas por tecnologia.", href: "/projetos/amo-franca", position: [-3.6, 1.8, -0.65], size: 0.38, tone: "human", code: "H-02" },
  { id: "marketing", label: "Marketing", kicker: "EXPERIÊNCIA", description: "Estratégia, varejo, comunicação, branding e comportamento como base para compreender problemas reais.", href: "/trajetoria", position: [-3.9, -1.2, 0.85], size: 0.34, tone: "human", code: "H-03" },
  { id: "memoria", label: "Memória", kicker: "CULTURA", description: "Pesquisa iconográfica, fotografia histórica, preservação digital e reconstrução visual do passado.", href: "/memoria", position: [-1.65, -2.45, -0.8], size: 0.32, tone: "human", code: "H-04" },
  { id: "arquivo", label: "Arquivo", kicker: "EVIDÊNCIA", description: "Cronologia curada de textos, imagens, campanhas, projetos e experimentos preservados como evidência de trajetória.", href: "/arquivo", position: [-1.3, 1.15, 1.15], size: 0.31, tone: "bridge", code: "B-02" },
  { id: "vibe", label: "Vibe Coding", kicker: "CONSTRUÇÃO", description: "Desenvolvimento assistido por IA como nova forma de transformar intenção em software funcional.", href: "/lab", position: [1.75, -2.25, 0.65], size: 0.31, tone: "ai", code: "A-04" },
  { id: "lab", label: "Lab", kicker: "EXPERIMENTAÇÃO", description: "Protótipos, agentes, interfaces, pesquisas e experiências públicas em evolução contínua.", href: "/lab", position: [4.15, -1.35, -1.05], size: 0.29, tone: "ai", code: "A-05" },
  { id: "ideias", label: "Ideias", kicker: "PENSAMENTO", description: "Artigos, ensaios e diálogos onde hipóteses são confrontadas antes de virarem respostas prontas.", href: "/ideias", position: [-0.15, 3.65, 0.85], size: 0.28, tone: "bridge", code: "B-03" },
];

const edges: [NodeId, NodeId][] = [
  ["marcelo", "spock"], ["marcelo", "marketing"], ["marcelo", "amo"], ["marcelo", "memoria"], ["marcelo", "ia"], ["marcelo", "arquivo"],
  ["spock", "ia"], ["spock", "intelig"], ["spock", "gestor"], ["spock", "vibe"], ["spock", "lab"],
  ["ia", "intelig"], ["ia", "vibe"], ["ia", "ideias"], ["intelig", "gestor"], ["intelig", "lab"],
  ["marketing", "gestor"], ["marketing", "amo"], ["amo", "memoria"], ["amo", "arquivo"], ["memoria", "ia"], ["memoria", "arquivo"], ["vibe", "lab"],
  ["ideias", "marcelo"], ["ideias", "spock"], ["ideias", "arquivo"], ["arquivo", "lab"],
];

const orbitPoints = (radius: number, yScale: number, z: number, offset = 0) =>
  Array.from({ length: 65 }, (_, index) => {
    const angle = (index / 64) * Math.PI * 2 + offset;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * yScale, z + Math.sin(angle * 2) * 0.12] as [number, number, number];
  });

function SystemCore({ compact }: { compact: boolean }) {
  const scale = compact ? 0.78 : 1;

  return (
    <group scale={scale}>
      <mesh>
        <icosahedronGeometry args={[0.7, 3]} />
        <meshPhysicalMaterial color="#eef5fb" emissive="#6f8fae" emissiveIntensity={0.82} roughness={0.18} metalness={0.62} transmission={0.08} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.94, 1]} />
        <meshBasicMaterial color="#b8cde0" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[1.12, 0.18, 0.4]}>
        <torusGeometry args={[1.12, 0.018, 8, 96]} />
        <meshBasicMaterial color="#dce9f5" transparent opacity={0.46} />
      </mesh>
      <mesh rotation={[0.35, 1.08, -0.4]}>
        <torusGeometry args={[1.36, 0.012, 8, 96]} />
        <meshBasicMaterial color="#d18b61" transparent opacity={0.26} />
      </mesh>
      <pointLight color="#afcde9" intensity={8} distance={7} />
      <Html center distanceFactor={compact ? 13 : 10.5} zIndexRange={[35, 0]}>
        <div className={styles.coreLabel} aria-hidden="true"><span>M</span><i>×</i><span>S</span><small>NÚCLEO VIVO</small></div>
      </Html>
    </group>
  );
}

function NodeOrb({ node, selected, onSelect, compact }: { node: UniverseNode; selected: boolean; onSelect: (id: NodeId) => void; compact: boolean }) {
  const visual = toneVisuals[node.tone];

  return (
    <group position={node.position}>
      {selected ? (
        <>
          <mesh rotation={[1.15, 0.28, 0.4]}>
            <torusGeometry args={[node.size * 1.5, 0.018, 8, 64]} />
            <meshBasicMaterial color={visual.accent} transparent opacity={0.68} />
          </mesh>
          <mesh scale={1.65}>
            <sphereGeometry args={[node.size, 24, 24]} />
            <meshBasicMaterial color={visual.accent} wireframe transparent opacity={0.13} />
          </mesh>
          <pointLight color={visual.accent} intensity={4.5} distance={4} />
        </>
      ) : null}
      <mesh
        scale={selected ? 1.15 : 1}
        onClick={() => onSelect(node.id)}
        onPointerEnter={() => onSelect(node.id)}
      >
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshPhysicalMaterial
          color={selected ? "#f8fbfe" : visual.node}
          emissive={visual.emissive}
          emissiveIntensity={selected ? 1.45 : 0.48}
          roughness={0.2}
          metalness={0.52}
          transmission={0.08}
          transparent
          opacity={selected ? 0.97 : 0.76}
        />
      </mesh>
      <Html center distanceFactor={compact ? 11.8 : 9.5} zIndexRange={[30, 0]}>
        <button
          className={`${styles.label} ${styles[node.tone]} ${selected ? styles.selected : ""}`}
          type="button"
          onClick={() => onSelect(node.id)}
          onPointerEnter={() => onSelect(node.id)}
          aria-pressed={selected}
        >
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
      <SystemCore compact={compact} />
      <Line points={orbitPoints(compact ? 3.2 : 4.55, 0.52, -0.6, 0.35)} color="#8fa9c1" lineWidth={0.45} transparent opacity={0.16} />
      <Line points={orbitPoints(compact ? 3.8 : 5.45, 0.72, 0.25, 1.1)} color="#b47a5b" lineWidth={0.42} transparent opacity={0.12} />
      <Line points={orbitPoints(compact ? 2.55 : 3.7, 0.9, 0.8, 2.2)} color="#c9c3b8" lineWidth={0.36} transparent opacity={0.1} />
      {edges.map(([from, to]) => {
        const a = index.get(from);
        const b = index.get(to);
        if (!a || !b) return null;
        const active = from === selected || to === selected;
        const selectedNode = index.get(selected);
        const color = selectedNode ? toneVisuals[selectedNode.tone].accent : "#dbe8f5";
        return <Line key={`${from}-${to}`} points={[a.position, b.position]} color={active ? color : "#677889"} lineWidth={active ? 1.35 : 0.5} transparent opacity={active ? 0.68 : 0.16} />;
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
  const activeIndex = nodes.findIndex((node) => node.id === active.id);
  const visual = toneVisuals[active.tone];

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

  const stageStyle = {
    "--universe-accent": visual.accent,
    "--universe-glow": visual.glow,
  } as CSSProperties;

  return (
    <section ref={sectionRef} id="universo-fradim" className={styles.explorer} data-variant={variant} aria-labelledby="universe-title">
      <header className={styles.heading}>
        <div>
          <p className="eyebrow">UNIVERSO FRADIM / ATLAS VIVO</p>
          <h2 id="universe-title">Cada ideia é um território.<span> Cada conexão, uma passagem.</span></h2>
        </div>
        <div className={styles.headingAside}>
          <p>Um mapa vivo entre experiência humana, inteligência artificial, memória, projetos e pensamento.</p>
          <p className={styles.instruction}>{compact ? "Toque em um nó · arraste para orbitar" : "Arraste para orbitar · role para aproximar · toque para explorar"}</p>
        </div>
      </header>

      <div className={styles.stage} data-tone={active.tone} style={stageStyle}>
        <div className={styles.atmosphere} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.scanline} aria-hidden="true" />
        <div className={styles.canvas} role="group" aria-label="Atlas tridimensional interativo da trajetória de Marcelo Fradim e Spock">
          {render3D ? (
            <Canvas
              key={`${variant}-${compact ? "compact" : "desktop"}`}
              frameloop="demand"
              dpr={compact ? [1, 1.15] : [1, 1.35]}
              camera={{ position: [0, compact ? 0.45 : 0.2, cameraZ], fov: cameraFov }}
              gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
            >
              <ambientLight intensity={0.34} />
              <directionalLight position={[2, 6, 6]} intensity={2.7} />
              <pointLight position={[-5, -2, 4]} color="#d6895d" intensity={13} distance={12} />
              <pointLight position={[5, 2, -2]} color="#8dbbea" intensity={13} distance={11} />
              <Graph selected={selected} onSelect={setSelected} compact={compact} fullscreen={fullscreen} />
              <Sparkles count={compact ? (fullscreen ? 58 : 70) : 104} scale={compact ? [8, 7, 5] : [12, 9, 6]} size={0.95} speed={0} opacity={0.27} />
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
          <div className={styles.panelTopline}><span>{active.code}</span><strong>{String(activeIndex + 1).padStart(2, "0")} / {nodes.length}</strong></div>
          <span className={styles.panelKicker}>{active.kicker}</span>
          <h3>{active.label}</h3>
          <p>{active.description}</p>
          <Link href={active.href} prefetch={false}>Entrar neste território →</Link>
          <div className={styles.coordinate} aria-hidden="true">COORD. {active.position.map((value) => value.toFixed(2)).join(" / ")}</div>
        </aside>

        <div className={styles.legend} aria-hidden="true">
          <span><i className={styles.legendHuman} /> HUMANO</span>
          <span><i className={styles.legendBridge} /> PONTE</span>
          <span><i className={styles.legendAi} /> IA</span>
        </div>

        <div className={styles.signature} aria-hidden="true"><span>M</span><i>×</i><span>S</span></div>
      </div>
    </section>
  );
}
