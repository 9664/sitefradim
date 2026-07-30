import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gestor360Case } from "@/components/Gestor360Case";
import { SiteNav } from "@/components/SiteNav";

const projects = {
  "intelig-cloud": {
    name: "Intelig.Cloud",
    category: "INTELIGÊNCIA ARTIFICIAL",
    statement: "Transformar inteligência artificial em capacidade operacional.",
    intro: "Uma iniciativa voltada à construção de agentes, automações, sistemas e produtos digitais que levam IA para dentro de processos reais de negócio.",
    connects: ["Agentes de IA", "Automação", "SaaS", "Context Engineering", "Produtos digitais"],
  },
  "amo-franca": {
    name: "Amo Franca",
    category: "CULTURA + COMUNIDADE",
    statement: "Tecnologia também pode preservar aquilo que uma cidade não pode esquecer.",
    intro: "Projeto de memória, comunicação e construção de comunidade que conecta história, iconografia, pesquisa, cultura local e experimentação digital.",
    connects: ["Memória", "Fotografia", "Comunidade", "Cultura", "IA generativa"],
  },
  "gestor-360": {
    name: "Gestor 360",
    category: "SISTEMAS + OPERAÇÃO",
    statement: "Quando marketing, trade e operação deixam de trabalhar como ilhas.",
    intro: "Estudo de caso de um sistema de orquestração para varejo alimentar que conecta calendário, campanhas, tarefas, compras, trade, BI, cartazeamento, evidências e inteligência operacional.",
    connects: ["Varejo", "Marketing", "Trade", "BI", "Processos", "IA"],
  },
} as const;

type ProjectSlug = keyof typeof projects;

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug as ProjectSlug];
  if (!project) return {};
  return {
    title: project.name,
    description: project.intro,
    alternates: { canonical: `/projetos/${slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — Marcelo Fradim`,
      description: project.intro,
      url: `https://fradim.com.br/projetos/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug as ProjectSlug];
  if (!project) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.intro,
    url: `https://fradim.com.br/projetos/${slug}`,
    creator: {
      "@type": "Person",
      name: "Marcelo Fradim",
      url: "https://fradim.com.br",
    },
    keywords: project.connects.join(", "),
  };

  if (slug === "gestor-360") {
    return <Gestor360Case schema={schema} />;
  }

  return (
    <main className="inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav backHref="/projetos" backLabel="Projetos" />

      <section className="inner-hero">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.name}</h1>
        <p>{project.statement}</p>
        <p>{project.intro}</p>

        <div className="construction-note">
          <span>CONEXÕES</span>
          <strong>{project.connects.join(" · ")}</strong>
        </div>

        <Link className="text-link" href="/projetos" prefetch={false}>Ver todos os projetos →</Link>
      </section>
    </main>
  );
}
