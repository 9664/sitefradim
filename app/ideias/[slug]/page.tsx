import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { getIdea, ideas } from "@/lib/ideas";
import styles from "./ArticlePage.module.css";

export function generateStaticParams() {
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) return {};
  return {
    title: idea.title,
    description: idea.standfirst,
    alternates: { canonical: `/ideias/${idea.slug}` },
    openGraph: {
      type: "article",
      title: idea.title,
      description: idea.standfirst,
      url: `https://fradim.com.br/ideias/${idea.slug}`,
    },
  };
}

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) notFound();

  const related = ideas.filter((item) => item.slug !== idea.slug).slice(0, 2);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: idea.title,
    description: idea.standfirst,
    url: `https://fradim.com.br/ideias/${idea.slug}`,
    author: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
    publisher: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
    articleSection: idea.category,
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteNav backHref="/ideias" backLabel="Ideias" />

      <header className={styles.hero}>
        <div className={styles.meta}><span>{idea.category}</span><span>{idea.readingTime} de leitura</span><span>Por Marcelo Fradim</span></div>
        <h1>{idea.title}</h1>
        <p className={styles.standfirst}>{idea.standfirst}</p>
        <div className={styles.thesis}>{idea.thesis}</div>
      </header>

      <article className={styles.article}>
        {idea.sections.map((section) => (
          <section className={styles.section} key={section.heading}>
            <h2>{section.heading}</h2>
            <div className={styles.sectionText}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>
        ))}
        <footer className={styles.signature}><span>MARCELO FRADIM / IDEIAS</span><strong>Inteligência Artificial · Inovação · Negócios</strong></footer>
      </article>

      <section className={styles.more} aria-labelledby="more-title">
        <p className="eyebrow">CONTINUE PENSANDO</p>
        <h2 id="more-title">Outras ideias.</h2>
        <div className={styles.links}>{related.map((item) => <Link href={`/ideias/${item.slug}`} prefetch={false} key={item.slug}><small>{item.category}</small><h3>{item.title}</h3></Link>)}</div>
      </section>
    </main>
  );
}
