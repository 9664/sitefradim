import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import styles from "./TrajectoryPage.module.css";

export const metadata: Metadata = {
  title: "Trajetória",
  description:
    "A trajetória de Marcelo Fradim conectando imagem, design, marketing, negócios, comunidade, produtos digitais e inteligência artificial.",
  alternates: { canonical: "/trajetoria" },
};

const stages = [
  {
    index: "01",
    eyebrow: "ORIGEM",
    title: "Imagem e design",
    thesis: "Criatividade como linguagem.",
    body: "Fotografia, composição, design e comunicação visual formaram a primeira camada do repertório: transformar uma ideia abstrata em algo que outra pessoa consegue perceber, interpretar e lembrar.",
    href: "/memoria",
    action: "Ver memória e imagem",
  },
  {
    index: "02",
    eyebrow: "MERCADO",
    title: "Marketing e negócios",
    thesis: "Criatividade encontra consequência.",
    body: "Indústria, varejo, marcas e comportamento acrescentaram uma disciplina diferente: uma solução não pode ser apenas interessante. Ela precisa funcionar em contexto, produzir resultado e conviver com restrições reais.",
    href: "/sobre",
    action: "Ver identidade e percurso",
  },
  {
    index: "03",
    eyebrow: "COMUNIDADE",
    title: "Amo Franca",
    thesis: "Tecnologia cria pertencimento.",
    body: "Pesquisa iconográfica, memória coletiva, comunicação digital e construção de comunidade mostraram que tecnologia também pode aproximar pessoas de um lugar, de uma história e umas das outras.",
    href: "/projetos/amo-franca",
    action: "Explorar Amo Franca",
  },
  {
    index: "04",
    eyebrow: "SISTEMAS",
    title: "Produtos digitais",
    thesis: "Ideias tornam-se infraestrutura.",
    body: "Software, automação, processos e produtos digitais deslocaram o foco da peça isolada para sistemas que precisam continuar funcionando depois da primeira entrega.",
    href: "/projetos",
    action: "Ver projetos",
  },
  {
    index: "05",
    eyebrow: "AGORA",
    title: "Marcelo × Spock",
    thesis: "Humano e IA constroem juntos.",
    body: "A inteligência artificial conecta repertório, estratégia, código, pesquisa e experimentação. O objetivo não é terceirizar pensamento, mas ampliar a quantidade e a qualidade das hipóteses que podem ser construídas e verificadas.",
    href: "/spock",
    action: "Entender Marcelo × Spock",
  },
] as const;

const threads = [
  ["VISUALIZAR", "Dar forma a uma ideia antes de tentar explicá-la demais."],
  ["CONTEXTUALIZAR", "Entender mercado, pessoas, história e restrições antes de escolher ferramenta."],
  ["CONSTRUIR", "Transformar comunicação e tecnologia em algo que funciona fora da apresentação."],
  ["APRENDER", "Usar cada projeto como evidência para melhorar o próximo sistema."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Trajetória — Marcelo Fradim",
  url: "https://fradim.com.br/trajetoria",
  mainEntity: {
    "@type": "Person",
    name: "Marcelo Fradim",
    url: "https://fradim.com.br/sobre",
    knowsAbout: [
      "Design",
      "Marketing",
      "Memória social",
      "Produtos digitais",
      "Inteligência Artificial",
    ],
  },
  hasPart: stages.map((stage, index) => ({
    "@type": "CreativeWork",
    position: index + 1,
    name: stage.title,
    description: stage.body,
  })),
};

export default function TrajectoryPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav />

      <section className={styles.hero} aria-labelledby="trajectory-title">
        <p className="eyebrow">TRAJETÓRIA / CAMADAS DE UMA MESMA PRÁTICA</p>
        <h1 id="trajectory-title">Da imagem aos sistemas inteligentes.<span>O meio mudou. A pergunta ficou mais ambiciosa.</span></h1>
        <p>
          Esta não é uma cronologia de cargos. É uma leitura das camadas que foram se acumulando: criar, comunicar, entender mercado, construir comunidade, desenvolver sistemas e trabalhar com inteligência artificial.
        </p>
        <div className={styles.heroNote} role="note">
          <span>COMO LER</span>
          <strong>As etapas mostram evolução de repertório, não uma linha do tempo rígida.</strong>
        </div>
      </section>

      <section className={styles.stages} aria-labelledby="trajectory-stages-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">CINCO CAMADAS</p>
            <h2 id="trajectory-stages-title">Cada fase acrescentou uma regra ao modo de construir.</h2>
          </div>
          <p>O que veio depois não apagou o que veio antes. Imagem, mercado, comunidade e sistemas continuam presentes na maneira como a IA é aplicada hoje.</p>
        </header>

        <div className={styles.stageList}>
          {stages.map((stage) => (
            <article className={styles.stage} key={stage.index}>
              <div className={styles.stageIndex}>
                <span>{stage.index}</span>
                <small>{stage.eyebrow}</small>
              </div>
              <div className={styles.stageCopy}>
                <h3>{stage.title}</h3>
                <strong>{stage.thesis}</strong>
                <p>{stage.body}</p>
              </div>
              <Link href={stage.href} prefetch={false}>{stage.action} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.threads} aria-labelledby="trajectory-threads-title">
        <div>
          <p className="eyebrow">O FIO CONDUTOR</p>
          <h2 id="trajectory-threads-title">Tecnologia só ganhou importância porque os problemas ficaram maiores.</h2>
        </div>
        <div className={styles.threadList}>
          {threads.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.now} aria-labelledby="trajectory-now-title">
        <p className="eyebrow">POSIÇÃO ATUAL</p>
        <h2 id="trajectory-now-title">Hoje, o trabalho acontece na interseção.<span> IA, estratégia, marketing, código e operação.</span></h2>
        <p>
          A especialização atual em inteligência artificial não substitui as fases anteriores; ela as reorganiza. É por isso que os projetos deste site misturam criação, processos, produto, automação, memória e comunicação.
        </p>
        <div className={styles.links}>
          <Link href="/inteligencia-artificial" prefetch={false}>IA aplicada</Link>
          <Link href="/projetos" prefetch={false}>Projetos</Link>
          <Link href="/ideias" prefetch={false}>Ideias</Link>
          <Link href="/contato" prefetch={false}>Contato</Link>
        </div>
      </section>
    </main>
  );
}
