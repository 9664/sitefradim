import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import styles from "./CampaignArchivePage.module.css";

export const metadata: Metadata = {
  title: "Campanhas — Arquivo Visual",
  description:
    "Arquivo em curadoria de campanhas, peças editoriais e trabalhos visuais preservados da trajetória anterior do Fradim.com.br.",
  alternates: { canonical: "/campanhas" },
};

const states = [
  {
    index: "01",
    title: "A URL permanece",
    text: "A antiga galeria fazia parte da trajetória pública do site. Por isso, o endereço continua existindo em vez de ser redirecionado para uma página genérica.",
  },
  {
    index: "02",
    title: "A galeria não é copiada",
    text: "Os arquivos do WordPress antigo não entram automaticamente aqui. Cada imagem precisa passar por revisão de origem, autoria, contexto e relevância antes de voltar ao acervo.",
  },
  {
    index: "03",
    title: "O arquivo será seletivo",
    text: "Preservar não significa republicar tudo. A nova versão prioriza trabalhos que ajudam a explicar projetos, fases profissionais, linguagem visual e evolução de repertório.",
  },
] as const;

const criteria = [
  ["PROVENIÊNCIA", "Saber de onde veio o arquivo e se existe informação suficiente para contextualizá-lo."],
  ["AUTORIA E USO", "Separar trabalho autoral, material de cliente e conteúdo de terceiros antes de qualquer republicação."],
  ["VALOR DE ARQUIVO", "Manter o que ajuda a compreender uma fase, um projeto ou uma mudança de linguagem — não apenas preencher uma galeria."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Campanhas — Arquivo Visual de Marcelo Fradim",
  url: "https://fradim.com.br/campanhas",
  description:
    "Arquivo em curadoria de campanhas, peças editoriais e trabalhos visuais de fases anteriores da trajetória de Marcelo Fradim.",
  author: {
    "@type": "Person",
    name: "Marcelo Fradim",
    url: "https://fradim.com.br/sobre",
  },
  about: [
    { "@type": "Thing", name: "Design" },
    { "@type": "Thing", name: "Marketing" },
    { "@type": "Thing", name: "Comunicação visual" },
  ],
};

export default function CampaignArchivePage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav backHref="/projetos" backLabel="Projetos" />

      <section className={styles.hero} aria-labelledby="campaigns-title">
        <p className="eyebrow">ARQUIVO VISUAL / CAMPANHAS</p>
        <h1 id="campaigns-title">Nem todo trabalho precisa voltar como imagem.<span> Mas a trajetória não precisa desaparecer.</span></h1>
        <p>
          O Fradim.com.br anterior reunia uma galeria extensa de campanhas, peças editoriais e trabalhos visuais de diferentes épocas. Esta página preserva essa entrada, mas não replica o WordPress antigo: o arquivo será reconstruído com curadoria.
        </p>
        <div className={styles.archiveState} role="note">
          <span>ESTADO ATUAL</span>
          <strong>URL preservada · assets antigos ainda não migrados</strong>
        </div>
      </section>

      <section className={styles.states} aria-labelledby="campaign-state-title">
        <header>
          <p className="eyebrow">O QUE FOI PRESERVADO</p>
          <h2 id="campaign-state-title">Arquivo não é sinônimo de cópia.</h2>
        </header>
        <div className={styles.stateGrid}>
          {states.map((state) => (
            <article key={state.index}>
              <span>{state.index}</span>
              <h3>{state.title}</h3>
              <p>{state.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.criteria} aria-labelledby="campaign-criteria-title">
        <div>
          <p className="eyebrow">CRITÉRIO DE CURADORIA</p>
          <h2 id="campaign-criteria-title">O que voltar precisa voltar com contexto.</h2>
        </div>
        <div className={styles.criteriaList}>
          {criteria.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="campaign-closing-title">
        <p className="eyebrow">PASSADO × PORTFÓLIO</p>
        <h2 id="campaign-closing-title">O arquivo explica de onde veio o repertório.<span> Os projetos mostram para onde ele foi.</span></h2>
        <p>
          Enquanto a galeria histórica é revisada, os projetos atuais mostram como design, marketing, tecnologia, memória e inteligência artificial passaram a se conectar em sistemas maiores.
        </p>
        <div className={styles.links}>
          <Link href="/projetos" prefetch={false}>Ver projetos atuais</Link>
          <Link href="/memoria" prefetch={false}>Explorar Memória</Link>
          <Link href="/sobre" prefetch={false}>Ver trajetória</Link>
        </div>
      </section>
    </main>
  );
}
