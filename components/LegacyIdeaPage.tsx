import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import type { LegacyIdeaEntry } from "@/lib/legacyIdeas";
import styles from "./LegacyIdeaPage.module.css";

export function LegacyIdeaPage({ entry }: { entry: LegacyIdeaEntry }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    url: `https://fradim.com.br/${entry.slug}`,
    author: {
      "@type": "Person",
      name: "Marcelo Fradim",
      url: "https://fradim.com.br/sobre",
    },
    isPartOf: {
      "@type": "CollectionPage",
      name: "Ideias — Marcelo Fradim",
      url: "https://fradim.com.br/ideias",
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav backHref="/ideias" backLabel="Ideias" />

      <header className={styles.hero}>
        <div className={styles.meta}>
          <span>ARQUIVO AUTORAL</span>
          <span>PUBLICAÇÃO LEGADA</span>
        </div>
        <p className={styles.theme}>{entry.theme}</p>
        <h1>{entry.title}</h1>
        <p className={styles.summary}>{entry.summary}</p>
        <div className={styles.archiveNotice} role="note">
          <span>NOTA DE ARQUIVO</span>
          <strong>{entry.archiveNote}</strong>
        </div>
      </header>

      <article className={styles.article}>
        <section aria-labelledby={`${entry.slug}-core`}>
          <p className="eyebrow">O NÚCLEO DO TEXTO</p>
          <h2 id={`${entry.slug}-core`}>A pergunta que valia preservar.</h2>
          <div className={styles.paragraphs}>
            {entry.core.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section aria-labelledby={`${entry.slug}-today`}>
          <p className="eyebrow">LEITURA ATUAL</p>
          <h2 id={`${entry.slug}-today`}>O que permanece depois do tempo.</h2>
          <div className={styles.paragraphs}>
            <p>{entry.currentReading}</p>
          </div>
        </section>
      </article>

      <section className={styles.closing} aria-labelledby={`${entry.slug}-closing`}>
        <p className="eyebrow">ARQUIVO × PRESENTE</p>
        <h2 id={`${entry.slug}-closing`}>Preservar um texto antigo não significa fingir que ele foi escrito hoje.</h2>
        <p>
          Este registro mantém uma camada anterior da trajetória visível, mas separada dos ensaios atuais. Ideias mudam, vocabulários mudam e algumas perguntas ganham respostas diferentes. O arquivo serve justamente para tornar essa evolução observável.
        </p>
        <div className={styles.links}>
          <Link href="/ideias" prefetch={false}>Ver ideias atuais</Link>
          <Link href="/sobre" prefetch={false}>Ver trajetória</Link>
        </div>
      </section>
    </main>
  );
}
