import type { Metadata } from "next";
import Link from "next/link";
import { ideas } from "@/lib/ideas";
import styles from "./IdeasPage.module.css";

export const metadata: Metadata = {
  title: "Ideias",
  description:
    "Ensaios e pensamento autoral de Marcelo Fradim sobre inteligência artificial, context engineering, automação, processos, marketing e inovação.",
  alternates: { canonical: "/ideias" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Ideias — Marcelo Fradim",
  url: "https://fradim.com.br/ideias",
  author: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: ideas.map((idea, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: idea.title,
      url: `https://fradim.com.br/ideias/${idea.slug}`,
    })),
  },
};

export default function IdeasPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="top-nav inner-nav" aria-label="Navegação principal">
        <Link className="brand" href="/">MF<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">← Universo</Link>
      </nav>

      <section className={styles.hero} aria-labelledby="ideas-title">
        <p className="eyebrow">IDEIAS / THINK IN PUBLIC</p>
        <h1 id="ideas-title">Pensamento em processo.<span>Não frases prontas sobre o futuro.</span></h1>
        <p>Este espaço reúne teses, ensaios e perguntas que surgem enquanto construímos sistemas reais. Escrever é uma forma de tornar o raciocínio examinável — inclusive quando ele precisar mudar.</p>
      </section>

      <section className={styles.ideas} aria-label="Ensaios publicados">
        <div className={styles.list}>
          {ideas.map((idea, index) => (
            <Link className={styles.card} href={`/ideias/${idea.slug}`} key={idea.slug}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <span className={styles.category}>{idea.category}</span>
                <h2>{idea.title}</h2>
                <p>{idea.standfirst}</p>
              </div>
              <div className={styles.meta}><span>{idea.readingTime}</span><span>Ler ensaio →</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.manifesto} aria-labelledby="writing-title">
        <p className="eyebrow">REGRA EDITORIAL</p>
        <h2 id="writing-title">Uma ideia não precisa parecer definitiva.<span> Precisa ser clara o bastante para ser confrontada.</span></h2>
        <p>O objetivo aqui não é prever o futuro com confiança artificial. É registrar hipóteses, explicar raciocínios e voltar a eles quando a prática trouxer evidências melhores.</p>
        <Link href="/lab">Ver onde as ideias viram experimentos →</Link>
      </section>
    </main>
  );
}
