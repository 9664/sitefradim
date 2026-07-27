"use client";

import { Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Mesh } from "three";

type NodeId =
  | "marcelo"
  | "spock"
  | "ia"
  | "intelig"
  | "gestor"
  | "amo"
  | "marketing"
  | "memoria"
  | "vibe"
  | "lab"
  | "ideias";

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
  {
    id: "marcelo",
    label: "Marcelo",
    kicker: "HUMANO",
    description: "Contexto, experiência, intuição, repertório e visão construídos ao longo de décadas.",
    href: "/sobre",
    position: [-2.7, 0.35, 0],
    size: 0.7,
    tone: "human",
  },
  {
    id: "spock",
    label: "Spock",
    kicker: "INTELIGÊNCIA",
    description: "Análise, estrutura, pesquisa e amplificação: uma IA usada como parceira de pensamento e construção.",
    href: "/spock",
    position: [2.7, -0.25, 0],
    size: 0.66,
    tone: "ai",
  },
  {
    id: "ia",
    label: "IA",
    kicker: "FRONTEIRA",
    description: "Agentes, automação, context engineering e redesenho de processos a partir da inteligência artificial.",
    href: "/inteligencia-artificial",
    position: [0.3, 2.45, -0.55],
    size: 0.42,
    tone: "bridge",
  },
  {
    id: "intelig",
    label: "Intelig.Cloud",
    kicker: "PROJETO",
    description: "Soluções, agentes digitais, automações e produtos que transformam IA em capacidade operacional.",
    href: "/projetos",
    position: [2.45, 1.75, -1.25],
    size: 0.36,
    tone: "ai",
  },
  {
    id: "gestor",
    label: "Gestor 360",
    kicker: "SISTEMA",
    description: "Marketing, trade, campanhas, tarefas, BI e processos reunidos em uma visão operacional integrada.",
    href: "/projetos",
    position: [3.65, 0.65, 0.65],
    size: 0.3,
    tone: "ai",
  },
  {
    id: "amo",
    label: "Amo Franca",
    kicker: "COMUNIDADE",
    description: "Cultura, comunicação, memória coletiva e construção de comunidade conectadas por tecnologia.",
    href: "/memoria",
    position: [-3.6, 1.8, -0.65],
    size: 0.38,
    tone: "human",
  },
  {
    id: "marketing",
    label: "Marketing",
    kicker: "EXPERIÊNCIA",
    description: "Estratégia, varejo, comunicação, branding e comportamento como base para compreender problemas reais.",
    href: "/trajetoria",
    position: [-3.9, -1.2, 0.85],
    size: 0.34,
    tone: "human",
  },
  {
    id: "memoria",
    label: "Memória",
    kicker: "CULTURA",
    description: "Pesquisa iconográfica, fotografia histórica, preservação digital e reconstrução visual do passado.",
    href: "/memoria",
    position: [-1.65, -2.45, -0.8],
    size: 0.32,
    tone: "human",
  },
  {
    id: "vibe",
    label: "Vibe Coding",
    kicker: "CONSTRUÇÃO",
    description: "Desenvolvimento assistido por IA como nova forma de transformar intenção em software funcional.",
    href: "/lab",
    position: [1.75, -2.25, 0.65],
    size: 0.31,
    tone: "ai",
  },
  {
    id: "lab",
    label: "Lab",
    kicker: "EXPERIMENTAÇÃO",
    description: "Protótipos, agentes, interfaces, pesquisas e experiências públicas em evolução contínua.",
    href: "/lab",
    position: [4.15, -1.35, -1.05],
    size: 0.29,
    tone: "ai",
  },
  {
    id: "ideias",
    label: "Ideias",
    kicker: "PENSAMENTO",
    description: "Artigos, ensaios e diálogos onde hipóteses são confrontadas antes de virarem respostas prontas.",
    href: "/ideias",
    position: [-0.15, 3.65, 0.85],
    size: 0.28,
    tone: "bridge",
  },
];

const edges: [NodeId, NodeId][] = [
  ["marcelo", "spock"],
  ["marcelo", "marketing"],
  ["marcelo", "amo"],
  ["marcelo", "memoria"],
  ["marcelo", "ia"],
  ["spock", "ia"],
  ["spock", "intelig"],
  ["spock", "gestor"],
  ["spock", "vibe"],
  ["spock", "lab"],
  ["ia", "intelig"],
  ["ia", "vibe"],
  ["ia", "ideias"],
  ["intelig", "gestor"],
  ["intelig", "lab"],
  ["marketing", "gestor"],
  ["marketing", "amo"],
  ["amo", "memoria"],
  ["memoria", "ia"],
  ["vibe", "lab"],
  ["ideias", "marcelo"],
  ["ideias", "spock"],
];

function NodeOrb({
  node,
  selected,
  onSelect,
}: {
  node: UniverseNode;
  selected: boolean;
  onSelect: (id: NodeId) => void;
}) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.25 + node.position[0]) * 0.035;
    mesh.current.scale.setScalar(selected ? pulse * 1.15 : pulse);
  });

  const emissive = node.tone === "human" ? "#9fb2c5" : node.tone === "ai" ? "#dce9f7" : "#b8c8d8";

  return (
    <group position={node.position}>
      <mesh ref={mesh} onClick={() => onSelect(node.id)}>
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

      <Html center distanceFactor={9.5} zIndexRange={[30, 0]}>
        <button
          className={`universe-label ${selected ? "is-selected" : ""}`}
          type="button"
          onClick={() => onSelect(node.id)}
          aria-pressed={selected}
        >
          <small>{node.kicker}</small>
          <strong>{node.label}</strong>
        </button>
      </Html>
    </group>
  );
}

function Graph({ selected, onSelect }: { selected: NodeId; onSelect: (id: NodeId) => void }) {
  const index = useMemo(() => new Map(nodes.map((node) => [node.id, node])), []);

  return (
    <>
      {edges.map(([from, to]) => {
        const a = index.get(from);
        const b = index.get(to);
        if (!a || !b) return null;
        const active = from === selected || to === selected;
        return (
          <Line
            key={`${from}-${to}`}
            points={[a.position, b.position]}
            color={active ? "#dbe8f5" : "#677889"}
            lineWidth={active ? 1.15 : 0.55}
            transparent
            opacity={active ? 0.58 : 0.18}
          />
        );
      })}

      {nodes.map((node) => (
        <NodeOrb key={node.id} node={node} selected={node.id === selected} onSelect={onSelect} />
      ))}
    </>
  );
}

export function UniverseExplorer() {
  const [selected, setSelected] = useState<NodeId>("marcelo");
  const active = nodes.find((node) => node.id === selected) ?? nodes[0];

  return (
    <section className="universe-explorer" aria-labelledby="universe-title">
      <header className="universe-heading">
        <div>
          <p className="eyebrow">UNIVERSO FRADIM / V0.1</p>
          <h2 id="universe-title">Não leia apenas a trajetória. Navegue pelas conexões.</h2>
        </div>
        <p className="universe-instruction">Arraste para orbitar · role para aproximar · toque para explorar</p>
      </header>

      <div className="universe-stage">
        <div className="universe-canvas" aria-label="Mapa tridimensional interativo da trajetória de Marcelo Fradim e Spock">
          <Canvas
            dpr={[1, 1.55]}
            camera={{ position: [0, 0.2, 10.4], fov: 48 }}
            gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[2, 6, 6]} intensity={2.6} />
            <pointLight position={[-5, -2, 4]} intensity={14} distance={12} />
            <pointLight position={[5, 2, -2]} intensity={10} distance={10} />
            <Graph selected={selected} onSelect={setSelected} />
            <Sparkles count={110} scale={[12, 9, 6]} size={0.9} speed={0.08} opacity={0.22} />
            <OrbitControls
              makeDefault
              enablePan={false}
              enableDamping
              dampingFactor={0.055}
              rotateSpeed={0.45}
              zoomSpeed={0.55}
              minDistance={7.6}
              maxDistance={12.5}
              minPolarAngle={Math.PI * 0.26}
              maxPolarAngle={Math.PI * 0.74}
            />
          </Canvas>
        </div>

        <aside className="universe-panel" aria-live="polite">
          <span className="universe-panel-kicker">{active.kicker}</span>
          <h3>{active.label}</h3>
          <p>{active.description}</p>
          <Link href={active.href}>Entrar neste território →</Link>
          <div className="universe-coordinate" aria-hidden="true">
            {active.position.map((value) => value.toFixed(2)).join(" / ")}
          </div>
        </aside>

        <div className="universe-signature" aria-hidden="true">
          <span>M</span><i>×</i><span>S</span>
        </div>
      </div>
    </section>
  );
}
