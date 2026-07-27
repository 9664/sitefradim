import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";

const pages = {
  sobre: {
    eyebrow: "MARCELO",
    title: "Criatividade, estratégia, tecnologia e uma trajetória em movimento.",
    intro: "A história não começa na inteligência artificial. Ela passa por design, marketing, indústria, varejo, comunidades, tecnologia e chega à IA como evolução natural de décadas construindo coisas.",
  },
  spock: {
    eyebrow: "SPOCK",
    title: "Uma inteligência artificial não deveria apenas responder.",
    intro: "Spock é o nome dado por Marcelo Fradim à inteligência artificial que participa de seus processos de criação, estratégia, pesquisa e desenvolvimento. Não como substituta do pensamento humano, mas como amplificadora.",
  },
  lab: {
    eyebrow: "LAB",
    title: "Construir, testar, quebrar, entender, reconstruir.",
    intro: "Um laboratório público para agentes de IA, automações, vibe coding, protótipos, visualizações, pesquisas e experiências que transformam teoria em algo que pode ser usado.",
  },
  projetos: {
    eyebrow: "WORK",
    title: "Ideias só ganham valor quando encontram o mundo real.",
    intro: "Intelig.Cloud, Amo Franca, Gestor 360 e outros projetos conectam inteligência artificial, marketing, operação, cultura, memória e transformação de negócios.",
  },
  ideias: {
    eyebrow: "IDEIAS",
    title: "Pensamento em processo, não frases prontas sobre o futuro.",
    intro: "Ensaios, artigos, pesquisas, provocações e diálogos Marcelo + Spock sobre inteligência artificial, inovação, negócios, marketing, tecnologia e cultura.",
  },
  memoria: {
    eyebrow: "MEMÓRIA",
    title: "Tecnologia também pode ser uma forma de lembrar.",
    intro: "Fotografia histórica, preservação digital, pesquisa iconográfica, Franca e novas maneiras de usar inteligência artificial para interpretar e reconstruir visualmente o passado.",
  },
  imprensa: {
    eyebrow: "IMPRENSA",
    title: "Autoridade precisa de evidência independente.",
    intro: "Entrevistas, reportagens, participações, eventos, publicações e referências externas que documentam uma trajetória construída muito além deste site.",
  },
  "inteligencia-artificial": {
    eyebrow: "INTELIGÊNCIA ARTIFICIAL",
    title: "IA aplicada começa pelo problema, não pela ferramenta.",
    intro: "Agentes, automação, engenharia de prompts, context engineering, desenvolvimento assistido por IA e redesenho de processos com foco em aplicação real.",
  },
  trajetoria: {
    eyebrow: "TRAJETÓRIA",
    title: "Da matéria ao pixel. Do marketing aos sistemas inteligentes.",
    intro: "Uma linha do tempo para entender como criatividade, comunicação, negócios, tecnologia, cultura e inteligência artificial se conectaram ao longo da carreira de Marcelo Fradim.",
  },
  contato: {
    eyebrow: "CONTATO",
    title: "Projetos interessantes começam com boas perguntas.",
    intro: "Espaço para consultoria, palestras, entrevistas, colaborações, projetos de inovação e conversas profissionais.",
  },
} as const;

type Slug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) return {};
  return {
    title: page.eyebrow === "MARCELO" ? "Sobre" : page.eyebrow,
    description: page.intro,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function TerritoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) notFound();

  return (
    <main className="inner-page">
      <SiteNav />

      <section className="inner-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        <div className="construction-note">
          <span>FRADIM.COM.BR 2.0</span>
          <strong>Este território está sendo construído.</strong>
        </div>
      </section>
    </main>
  );
}
