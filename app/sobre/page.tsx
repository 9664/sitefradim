import type { Metadata } from "next";
import Link from "next/link";
import { MarceloCore } from "@/components/MarceloCore";
import { SiteNav } from "@/components/SiteNav";
import styles from "./MarceloPage.module.css";

export const metadata: Metadata = {
  title: "Sobre Marcelo Fradim",
  description:
    "A trajetória de Marcelo Fradim na interseção entre criatividade, marketing, negócios, tecnologia, cultura e inteligência artificial.",
  alternates: { canonical: "/sobre" },
};

const phases = [
  {
    index: "01",
    title: "Imagem e design",
    context: "FORMAÇÃO DE REPERTÓRIO · FOTOGRAFIA · RESTAURAÇÃO",
    body: "A trajetória começa pela imagem: composição, fotografia, design, pós-produção e a necessidade de transformar uma ideia abstrata em algo que outra pessoa consiga perceber, entender e sentir. O trabalho de restauração e pesquisa visual alcançou acervos em Franca e Pedregulho, no interior paulista, além de Trairi, no Rio Grande do Norte, Piancó, na Paraíba, e Rio de Janeiro.",
  },
  {
    index: "02",
    title: "Marca e mercado",
    context: "INDÚSTRIA · DEMOCRATA · MARKETING",
    body: "A experiência profissional acrescenta uma disciplina diferente: criatividade precisa conversar com produto, posicionamento, venda, comportamento e resultado. A passagem pela Democrata Calçados se torna uma escola decisiva de marca e mercado.",
  },
  {
    index: "03",
    title: "Operação e negócios",
    context: "DISTRIBUIÇÃO · VAREJO · GESTÃO",
    body: "Distribuição, varejo e projetos empresariais ampliam a visão para processos, equipes, trade, campanhas, indicadores e execução. Ribeirânia e Tiãozinho fazem parte dessa fase em que marketing deixa de ser comunicação isolada e passa a ser sistema operacional de negócio.",
  },
  {
    index: "04",
    title: "Comunidade e memória",
    context: "AMO FRANCA · DESDE 2014 · CULTURA · PESQUISA",
    body: "O Amo Franca conecta tecnologia e comunicação a uma dimensão social: memória coletiva, iconografia, pesquisa histórica, cultura e construção de comunidade. A imagem volta, agora como ferramenta de pertencimento e como infraestrutura para preservar aquilo que uma cidade não pode esquecer.",
  },
  {
    index: "05",
    title: "Produtos e sistemas",
    context: "SOFTWARE · AUTOMAÇÃO · VIBE CODING",
    body: "A tecnologia deixa de ser apenas meio criativo e passa a ser infraestrutura. Sistemas, automações, protótipos e produtos digitais aproximam estratégia e código, transformando processos em interfaces e ferramentas utilizáveis.",
  },
  {
    index: "06",
    title: "Inteligência artificial",
    context: "INTELIG.CLOUD · AGENTES · SPOCK",
    body: "A IA reúne as camadas anteriores. Marketing ajuda a formular o problema. Design ajuda a construir a interface. Negócios definem o resultado. Tecnologia executa. E Spock surge como uma identidade para uma colaboração contínua entre repertório humano e capacidade computacional.",
  },
] as const;

const principles = [
  ["01", "Problema antes da ferramenta", "Tecnologia só cria valor quando melhora uma decisão, um processo, uma experiência ou um resultado concreto."],
  ["02", "Construir para compreender", "Protótipos, sistemas e experimentos são formas de pensar. Muitas respostas aparecem depois que a ideia encontra a realidade."],
  ["03", "Conectar repertórios", "Marketing, design, cultura, varejo e IA não competem entre si. A vantagem está justamente em cruzar disciplinas que normalmente trabalham separadas."],
] as const;

const evidence = [
  ["IA + PRODUTOS", "Intelig.Cloud", "Agentes, automações e produtos digitais", "/projetos/intelig-cloud"],
  ["CULTURA + COMUNIDADE", "Amo Franca", "Memória, comunicação e patrimônio digital", "/projetos/amo-franca"],
  ["SISTEMAS + OPERAÇÃO", "Gestor 360", "Marketing, trade, BI e processos conectados", "/projetos/gestor-360"],
  ["HUMANO + IA", "Spock", "O método de colaboração que atravessa os projetos", "/spock"],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Marcelo Fradim",
  url: "https://fradim.com.br/sobre",
  mainEntity: {
    "@type": "Person",
    name: "Marcelo Fradim",
    url: "https://fradim.com.br",
    email: "mailto:fradim@gmail.com",
    jobTitle: "Especialista em Inteligência Artificial e Inovação",
    description:
      "Profissional com trajetória na interseção entre inteligência artificial, marketing, tecnologia, negócios, design, cultura e desenvolvimento de projetos.",
    homeLocation: {
      "@type": "Place",
      name: "Franca, São Paulo, Brasil",
    },
    knowsAbout: [
      "Inteligência Artificial",
      "Inovação",
      "Marketing",
      "Varejo",
      "Design",
      "Automação",
      "Agentes de IA",
      "Engenharia de Prompts",
      "Context Engineering",
      "Vibe Coding",
      "Transformação Digital",
      "Memória Digital",
      "Restauração Fotográfica",
      "Pesquisa Iconográfica",
      "Cultura Digital",
    ],
    sameAs: [
      "https://www.linkedin.com/in/marcelofradim/",
      "https://www.instagram.com/marcelofradim/",
      "https://www.behance.net/fradim",
      "https://corredorcultural.com.br/agentes/marcelo-fradim/",
    ],
  },
};

export default function MarceloPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteNav />

      <section className={styles.hero} aria-labelledby="marcelo-title">
        <div className={styles.scene} aria-hidden="true"><MarceloCore /></div>
        <div className={styles.copy}>
          <p className="eyebrow">MARCELO FRADIM / IDENTIDADE EM CAMADAS</p>
          <h1 id="marcelo-title">Eu não troquei de trajetória.<span>Fui adicionando camadas.</span></h1>
          <p>Imagem, design, marketing, indústria, varejo, comunidade, software e inteligência artificial podem parecer carreiras diferentes. Para mim, são formas sucessivas de responder à mesma pergunta: como transformar uma ideia em algo que funcione no mundo real?</p>
        </div>
      </section>

      <section className={styles.identity} aria-labelledby="identity-title">
        <div>
          <p className="eyebrow">QUEM É MARCELO FRADIM?</p>
          <h2 id="identity-title">Generalista por trajetória. Especialista em conectar.</h2>
        </div>
        <div className={styles.identityText}>
          <p>Minha carreira não foi construída dentro de uma única disciplina. Ela cresceu no encontro entre <strong>criatividade, comunicação, tecnologia e negócios</strong>.</p>
          <p>Isso significa que, diante de um problema, raramente enxergo apenas a ferramenta. Procuro entender pessoas, operação, experiência, comunicação, dados e resultado antes de decidir o que construir.</p>
          <p>Hoje a inteligência artificial ocupa o centro do meu trabalho porque é a tecnologia que melhor conecta esses repertórios. Mas ela não apaga o que veio antes. <strong>Ela depende disso.</strong></p>
          <div className={styles.formula} aria-label="Áreas que compõem a trajetória">
            <span>CRIATIVIDADE</span><i>×</i><span>MARKETING</span><i>×</i><span>NEGÓCIOS</span><i>×</i><span>TECNOLOGIA</span><i>×</i><span>IA</span>
          </div>
        </div>
      </section>

      <section className={styles.timeline} aria-labelledby="timeline-title">
        <header className={styles.timelineHeader}>
          <div>
            <p className="eyebrow">TRAJETÓRIA</p>
            <h2 id="timeline-title">Uma evolução, não uma coleção de cargos.</h2>
          </div>
          <p>Cada fase acrescentou uma competência que continua presente nas seguintes. O valor está menos nos rótulos e mais nas conexões que eles permitiram construir.</p>
        </header>
        <div className={styles.timelineGrid}>
          {phases.map((phase) => (
            <article className={styles.phase} key={phase.index}>
              <span>{phase.index}</span>
              <h3>{phase.title}</h3>
              <div><strong>{phase.context}</strong><p>{phase.body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <header className={styles.principlesHeader}>
          <div><p className="eyebrow">COMO EU TRABALHO</p><h2 id="principles-title">Três princípios atravessam tudo.</h2></div>
          <p>Ferramentas mudam. Plataformas desaparecem. O método precisa sobreviver à tecnologia do momento.</p>
        </header>
        <div className={styles.principlesGrid}>
          {principles.map(([index, title, text]) => (
            <article key={title}><small>{index}</small><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.evidence} aria-labelledby="evidence-title">
        <header className={styles.evidenceHeader}>
          <div><p className="eyebrow">EVIDÊNCIAS</p><h2 id="evidence-title">A narrativa precisa produzir coisas reais.</h2></div>
          <p>Autoridade não é uma frase na bio. Ela aparece em projetos, sistemas, comunidades, conteúdo, decisões e resultados que podem ser examinados.</p>
        </header>
        <div className={styles.evidenceGrid}>
          {evidence.map(([category, title, description, href]) => (
            <Link href={href} prefetch={false} key={title}><small>{category}</small><h3>{title}</h3><span>{description} →</span></Link>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <p className="eyebrow">AGORA</p>
        <h2 id="closing-title">A próxima fase não é sobre usar inteligência artificial.<span> É sobre descobrir o que podemos redesenhar a partir dela.</span></h2>
        <p>É nesse território que meus projetos atuais se encontram: IA aplicada, agentes, automação, sistemas, marketing, experiência e experimentação contínua.</p>
        <div className={styles.closingLinks}>
          <Link href="/spock" prefetch={false}>Conhecer Spock</Link>
          <Link href="/projetos" prefetch={false}>Explorar projetos</Link>
          <Link href="/inteligencia-artificial" prefetch={false}>IA & inovação</Link>
          <Link href="/contato" prefetch={false}>Entrar em contato</Link>
        </div>
      </section>
    </main>
  );
}
