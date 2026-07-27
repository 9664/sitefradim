import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LegacyIdeaPage } from "@/components/LegacyIdeaPage";
import { SiteNav } from "@/components/SiteNav";
import { getLegacyIdeaEntry, legacyIdeaEntries } from "@/lib/legacyIdeas";
import { getLegacyMemoryEntry, legacyMemoryEntries } from "@/lib/legacyMemory";
import legacyStyles from "./LegacyMemoryPage.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
  return [
    ...Object.keys(pages).map((slug) => ({ slug })),
    ...legacyMemoryEntries.map((entry) => ({ slug: entry.slug })),
    ...legacyIdeaEntries.map((entry) => ({ slug: entry.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (page) {
    return {
      title: page.eyebrow === "MARCELO" ? "Sobre" : page.eyebrow,
      description: page.intro,
      alternates: { canonical: `/${slug}` },
    };
  }

  const legacyMemoryEntry = getLegacyMemoryEntry(slug);
  if (legacyMemoryEntry) {
    return {
      title: `${legacyMemoryEntry.title} — Arquivo de Memória`,
      description: legacyMemoryEntry.summary,
      alternates: { canonical: `/${legacyMemoryEntry.slug}` },
      openGraph: {
        type: "article",
        title: legacyMemoryEntry.title,
        description: legacyMemoryEntry.summary,
        url: `https://fradim.com.br/${legacyMemoryEntry.slug}`,
        ...(legacyMemoryEntry.image
          ? { images: [{ url: `https://fradim.com.br${legacyMemoryEntry.image.src}`, alt: legacyMemoryEntry.image.alt }] }
          : {}),
      },
    };
  }

  const legacyIdeaEntry = getLegacyIdeaEntry(slug);
  if (legacyIdeaEntry) {
    return {
      title: `${legacyIdeaEntry.title} — Arquivo Autoral`,
      description: legacyIdeaEntry.summary,
      alternates: { canonical: `/${legacyIdeaEntry.slug}` },
      openGraph: {
        type: "article",
        title: legacyIdeaEntry.title,
        description: legacyIdeaEntry.summary,
        url: `https://fradim.com.br/${legacyIdeaEntry.slug}`,
      },
    };
  }

  return {};
}

export default async function TerritoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const legacyMemoryEntry = getLegacyMemoryEntry(slug);

  if (legacyMemoryEntry) {
    const citations = [
      legacyMemoryEntry.sourceHref,
      ...(legacyMemoryEntry.researchSource ? [legacyMemoryEntry.researchSource.href] : []),
    ];

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: legacyMemoryEntry.title,
      description: legacyMemoryEntry.summary,
      url: `https://fradim.com.br/${legacyMemoryEntry.slug}`,
      temporalCoverage: legacyMemoryEntry.year,
      spatialCoverage: legacyMemoryEntry.location,
      ...(legacyMemoryEntry.image ? { image: `https://fradim.com.br${legacyMemoryEntry.image.src}` } : {}),
      about: [
        { "@type": "Thing", name: "Memória histórica" },
        { "@type": "Thing", name: "Restauração fotográfica" },
      ],
      author: {
        "@type": "Person",
        name: "Marcelo Fradim",
        url: "https://fradim.com.br/sobre",
      },
      citation: citations,
    };

    return (
      <main className={legacyStyles.page}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <SiteNav backHref="/memoria" backLabel="Memória" />

        <header className={legacyStyles.hero}>
          <div className={legacyStyles.meta}>
            <span>ARQUIVO DE MEMÓRIA</span>
            <span>{legacyMemoryEntry.year}</span>
            <span>{legacyMemoryEntry.location}</span>
          </div>
          <h1>{legacyMemoryEntry.title}</h1>
          <p>{legacyMemoryEntry.summary}</p>

          {legacyMemoryEntry.image ? (
            <figure className={legacyStyles.mediaFigure}>
              <div className={legacyStyles.mediaFrame}>
                <img
                  src={`${basePath}${legacyMemoryEntry.image.src}`}
                  alt={legacyMemoryEntry.image.alt}
                  decoding="async"
                />
              </div>
              <figcaption className={legacyStyles.mediaCaption}>
                <span>ARQUIVO REINTEGRADO</span>
                <strong>{legacyMemoryEntry.image.caption}</strong>
                <p>{legacyMemoryEntry.image.provenance}</p>
              </figcaption>
            </figure>
          ) : (
            <div className={legacyStyles.mediaPlaceholder} role="note" aria-label="Estado da imagem histórica">
              <span>ASSET NÃO PUBLICADO</span>
              <strong>{legacyMemoryEntry.mediaNote}</strong>
            </div>
          )}
        </header>

        <section className={legacyStyles.context} aria-labelledby="legacy-context-title">
          <div>
            <p className="eyebrow">CONTEXTO DOCUMENTADO</p>
            <h2 id="legacy-context-title">O que sabemos sobre este registro.</h2>
          </div>
          <div className={legacyStyles.text}>
            {legacyMemoryEntry.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className={legacyStyles.intervention} aria-labelledby="legacy-intervention-title">
          <div>
            <p className="eyebrow">INTERVENÇÃO VISUAL</p>
            <h2 id="legacy-intervention-title">Documento original e interpretação não são a mesma coisa.</h2>
          </div>
          <p>{legacyMemoryEntry.intervention}</p>
        </section>

        <section className={legacyStyles.source} aria-labelledby="legacy-source-title">
          <p className="eyebrow">FONTES E PISTAS DE PESQUISA</p>
          <h2 id="legacy-source-title">A página nova precisa conseguir mostrar de onde vem a informação.</h2>
          <p>
            As referências abaixo sustentam o contexto e, quando indicado, pistas usadas durante a curadoria. {legacyMemoryEntry.image
              ? "A reintegração do arquivo visual não transforma essas referências em atribuição automática da fotografia histórica original."
              : "O asset visual permanece fora da publicação enquanto sua situação de proveniência, data ou uso não estiver resolvida."}
          </p>
          <div className={legacyStyles.sourceLinks}>
            <a href={legacyMemoryEntry.sourceHref} target="_blank" rel="noreferrer">{legacyMemoryEntry.sourceLabel} ↗</a>
            {legacyMemoryEntry.researchSource ? (
              <a href={legacyMemoryEntry.researchSource.href} target="_blank" rel="noreferrer">
                {legacyMemoryEntry.researchSource.label} ↗
              </a>
            ) : null}
          </div>
        </section>

        <section className={legacyStyles.next} aria-labelledby="legacy-next-title">
          <p className="eyebrow">ARQUIVO EM CONSTRUÇÃO</p>
          <h2 id="legacy-next-title">
            {legacyMemoryEntry.image ? "A imagem voltou. Agora o arquivo ganha relações." : "Preservar a URL também significa saber quando não republicar uma imagem."}
          </h2>
          <p>{legacyMemoryEntry.mediaNote}</p>
          <div className={legacyStyles.links}>
            <Link href="/memoria" prefetch={false}>Explorar Memória</Link>
            <Link href="/restauracao-fotografica" prefetch={false}>Restauração fotográfica</Link>
          </div>
        </section>
      </main>
    );
  }

  const legacyIdeaEntry = getLegacyIdeaEntry(slug);
  if (legacyIdeaEntry) {
    return <LegacyIdeaPage entry={legacyIdeaEntry} />;
  }

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
