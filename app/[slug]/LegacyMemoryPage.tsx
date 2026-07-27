import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import type { LegacyMemoryEntry } from "@/lib/legacyMemory";
import styles from "./LegacyMemoryPage.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LegacyMemoryPage({ entry }: { entry: LegacyMemoryEntry }) {
  const citations = [
    ...(entry.sourceHref ? [entry.sourceHref] : []),
    ...(entry.researchSource ? [entry.researchSource.href] : []),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    url: `https://fradim.com.br/${entry.slug}`,
    temporalCoverage: entry.year,
    spatialCoverage: entry.location,
    ...(entry.image ? { image: `https://fradim.com.br${entry.image.src}` } : {}),
    about: [
      { "@type": "Thing", name: "Memória histórica" },
      { "@type": "Thing", name: "Restauração fotográfica" },
    ],
    author: {
      "@type": "Person",
      name: "Marcelo Fradim",
      url: "https://fradim.com.br/sobre",
    },
    ...(citations.length ? { citation: citations } : {}),
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav backHref="/memoria" backLabel="Memória" />

      <header className={styles.hero}>
        <div className={styles.meta}>
          <span>ARQUIVO DE MEMÓRIA</span>
          <span>{entry.year}</span>
          <span>{entry.location}</span>
        </div>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>

        {entry.image ? (
          <figure className={styles.mediaFigure}>
            <div className={styles.mediaFrame}>
              <img src={`${basePath}${entry.image.src}`} alt={entry.image.alt} decoding="async" />
            </div>
            <figcaption className={styles.mediaCaption}>
              <span>ARQUIVO REINTEGRADO</span>
              <strong>{entry.image.caption}</strong>
              <p>{entry.image.provenance}</p>
            </figcaption>
          </figure>
        ) : (
          <div className={styles.mediaPlaceholder} role="note" aria-label="Estado da imagem histórica">
            <span>ASSET NÃO PUBLICADO</span>
            <strong>{entry.mediaNote}</strong>
          </div>
        )}
      </header>

      <section className={styles.context} aria-labelledby="legacy-context-title">
        <div>
          <p className="eyebrow">CONTEXTO DOCUMENTADO</p>
          <h2 id="legacy-context-title">O que sabemos sobre este registro.</h2>
        </div>
        <div className={styles.text}>
          {entry.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className={styles.intervention} aria-labelledby="legacy-intervention-title">
        <div>
          <p className="eyebrow">INTERVENÇÃO VISUAL</p>
          <h2 id="legacy-intervention-title">Documento original e interpretação não são a mesma coisa.</h2>
        </div>
        <p>{entry.intervention}</p>
      </section>

      <section className={styles.source} aria-labelledby="legacy-source-title">
        <p className="eyebrow">FONTES E PISTAS DE PESQUISA</p>
        <h2 id="legacy-source-title">A página nova precisa conseguir mostrar de onde vem a informação.</h2>
        <p>
          {entry.sourceNote ?? (
            <>As referências abaixo sustentam o contexto e, quando indicado, pistas usadas durante a curadoria. {entry.image
              ? "A reintegração do arquivo visual não transforma essas referências em atribuição automática da fotografia histórica original."
              : "O asset visual permanece fora da publicação enquanto sua situação de proveniência, data ou uso não estiver resolvida."}</>
          )}
        </p>
        {entry.sourceHref || entry.researchSource ? (
          <div className={styles.sourceLinks}>
            {entry.sourceHref && entry.sourceLabel ? (
              <a href={entry.sourceHref} target="_blank" rel="noreferrer">{entry.sourceLabel} ↗</a>
            ) : null}
            {entry.researchSource ? (
              <a href={entry.researchSource.href} target="_blank" rel="noreferrer">{entry.researchSource.label} ↗</a>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className={styles.next} aria-labelledby="legacy-next-title">
        <p className="eyebrow">ARQUIVO EM CONSTRUÇÃO</p>
        <h2 id="legacy-next-title">
          {entry.image ? "A imagem voltou. Agora o arquivo ganha relações." : "Preservar a URL também significa saber quando não republicar uma imagem."}
        </h2>
        <p>{entry.mediaNote}</p>
        <div className={styles.links}>
          <Link href="/memoria" prefetch={false}>Explorar Memória</Link>
          <Link href="/restauracao-fotografica" prefetch={false}>Restauração fotográfica</Link>
        </div>
      </section>
    </main>
  );
}
