import type { Metadata } from "next";
import Link from "next/link";
import { ContextLab } from "@/components/ContextLab";
import styles from "./LabPage.module.css";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Laboratório público de Marcelo Fradim e Spock: context engineering, interfaces, agentes, automação, visualizações e experimentos construídos com inteligência artificial.",
  alternates: { canonical: "/lab" },
};

const experiments = [
  ["LIVE / 01", "Context Builder", "Experimento local para visualizar como objetivo, contexto, restrições, fontes e critérios de sucesso alteram a qualidade de uma instrução.", "#context-builder", "Experimentar"],
  ["LIVE / 02", "Universo Fradim", "Knowledge graph tridimensional que transforma projetos, disciplinas e a relação Marcelo × Spock em uma rede navegável.", "/#universo-fradim", "Abrir experiência"],
  ["LIVE / 03", "Trajectory Journey", "Narrativa controlada por scroll que representa a evolução de imagem e marketing até sistemas e inteligência artificial.", "/#trajetoria-em-movimento", "Percorrer"],
  ["SYSTEM / 04", "Gestor 360", "Projeto real de integração entre marketing, trade, campanhas, tarefas, BI e processos operacionais.", "/projetos/gestor-360", "Ver projeto"],
  ["SYSTEM / 05", "Intelig.Cloud", "Agentes, automações e produtos digitais usados para transformar IA em capacidade operacional.", "/projetos/intelig-cloud", "Ver projeto"],
  ["NEXT / 06", "Experimentos futuros", "Novas interfaces, visualizações e protótipos entram aqui apenas quando houver algo real para testar — nunca como promessa vazia.", "/ideias", "Acompanhar ideias"],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Lab — Marcelo Fradim × Spock",
  url: "https://fradim.com.br/lab",
  description: "Laboratório público de experimentos em inteligência artificial, interfaces, context engineering e produtos digitais.",
  author: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
};

export default function LabPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="top-nav inner-nav" aria-label="Navegação principal">
        <Link className="brand" href="/">MF<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">← Universo</Link>
      </nav>

      <section className={styles.hero} aria-labelledby="lab-title">
        <p className="eyebrow">LAB / BUILD TO UNDERSTAND</p>
        <h1 id="lab-title">Não quero apenas explicar tecnologia.<span>Quero deixar você tocar nela.</span></h1>
        <p>O Lab é a parte experimental do Fradim.com.br. Aqui entram protótipos, interfaces, sistemas e pequenas demonstrações que podem ser usadas de verdade no navegador.</p>
      </section>

      <section id="context-builder" className={styles.experiment} aria-labelledby="context-title">
        <header className={styles.header}>
          <div><p className="eyebrow">EXPERIMENTO 01 / CONTEXT ENGINEERING</p><h2 id="context-title">Uma pergunta não existe sozinha.</h2></div>
          <p>Ative e remova camadas para perceber como a mesma intenção ganha precisão quando contexto e critério entram na arquitetura da instrução.</p>
        </header>
        <ContextLab />
      </section>

      <section className={styles.catalog} aria-labelledby="catalog-title">
        <p className="eyebrow">EXPERIMENTOS + SISTEMAS</p>
        <h2 id="catalog-title">O laboratório está espalhado pelo site.</h2>
        <div className={styles.grid}>
          {experiments.map(([status, title, text, href, action]) => (
            <Link href={href} key={title}>
              <small>{status}</small>
              <div><h3>{title}</h3><p>{text}</p></div>
              <span>{action} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.ethos} aria-labelledby="ethos-title">
        <p className="eyebrow">REGRA DO LAB</p>
        <h2 id="ethos-title">Protótipo não precisa ser perfeito.<span> Precisa produzir aprendizado.</span></h2>
        <p>Experimentos podem falhar. O compromisso é deixar claro o que é demonstração, o que é sistema em uso e o que ainda é hipótese — e registrar o que aprendemos em cada etapa.</p>
        <Link href="/ideias">Ver pensamento em processo →</Link>
      </section>
    </main>
  );
}
