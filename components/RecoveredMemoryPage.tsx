import Link from "next/link";
import type { RecoveredMemoryEntry } from "@/lib/recoveredMemoryBatch2";
import { SiteNav } from "./SiteNav";
import styles from "@/app/[slug]/LegacyMemoryPage.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function RecoveredMemoryPage({ entry }: { entry: RecoveredMemoryEntry }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    url: `https://fradim.com.br/${entry.slug}`,
    temporalCoverage: entry.year,
    spatialCoverage: entry.location,
    datePublished: entry.originalPublishedAt,
    image: `https://fradim.com.br${entry.image.src}`,
    about: [
      { "@type": "Thing", name: "Memória histórica de Franca" },
      { "@type": "Thing", name: "Restauração fotográfica" },
    ],
    author: {
      "@type": "Person",
      name: "Marcelo Fradim",
      url: "https://fradim.com.br/sobre",
    },
    ...(entry.sourceHref ? { citation: [entry.sourceHref] } : {}),
  };

  return (
    <main className={styles.page} data-recovered-memory={entry.slug}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav backHref="/memoria" backLabel="Memória" />

      <header className={styles.hero}>
        <div className={styles.meta}>
          <span>ARQUIVO TEMPORAL</span>
          <span>{entry.year}</span>
          <span>{entry.location}</span>
          <span>PUBLICADO EM {entry.originalPublishedAt}</span>
        </div>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>

        <figure className={styles.mediaFigure}>
          <div className={styles.mediaFrame}>
            <img
              src={`${basePath}${entry.image.src}`}
              alt={entry.image.alt}
              decoding="async"
              data-recovered-memory-image
            />
          </div>
          <figcaption className={styles.mediaCaption}>
            <span>ARQUIVO REINTEGRADO</span>
            <strong>{entry.image.caption}</strong>
            <p>{entry.image.provenance}</p>
          </figcaption>
        </figure>
      </header>

      <section className={styles.context} aria-labelledby={`${entry.slug}-context`}>
        <div>
          <p className="eyebrow">CONTEXTO RECUPERADO</p>
          <h2 id={`${entry.slug}-context`}>O passado retorna acompanhado de suas evidências.</h2>
        </div>
        <div className={styles.text}>
          {entry.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className={styles.intervention} aria-labelledby={`${entry.slug}-intervention`}>
        <div>
          <p className="eyebrow">INTERVENÇÃO VISUAL</p>
          <h2 id={`${entry.slug}-intervention`}>Restaurar é interpretar sem esconder a origem.</h2>
        </div>
        <p>{entry.intervention}</p>
      </section>

      <section className={styles.source} aria-labelledby={`${entry.slug}-source`}>
        <p className="eyebrow">CADEIA DE PROVENIÊNCIA</p>
        <h2 id={`${entry.slug}-source`}>Texto, data, anexo e arquivo físico voltam a se encontrar.</h2>
        <p>{entry.sourceNote}</p>
        {entry.sourceHref && entry.sourceLabel ? (
          <div className={styles.sourceLinks}>
            <a href={entry.sourceHref} target="_blank" rel="noreferrer">{entry.sourceLabel} ↗</a>
          </div>
        ) : null}
      </section>

      <section className={styles.next} aria-labelledby={`${entry.slug}-next`}>
        <p className="eyebrow">O ARQUIVO CONTINUA</p>
        <h2 id={`${entry.slug}-next`}>A imagem voltou ao tempo.<br />Agora o tempo volta a conversar com ela.</h2>
        <p>{entry.mediaNote}</p>
        <div className={styles.links}>
          <Link href="/memoria" prefetch={false}>Explorar o Arquivo Temporal</Link>
          <Link href="/restauracao-fotografica" prefetch={false}>Restauração fotográfica</Link>
          <Link href="/" prefetch={false}>Voltar ao presente</Link>
        </div>
      </section>
    </main>
  );
}
