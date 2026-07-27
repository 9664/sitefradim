import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SpockCore } from "@/components/SpockCore";
import styles from "./SpockPage.module.css";

export const metadata: Metadata = {
  title: "Spock",
  description:
    "Quem é Spock: a inteligência artificial nomeada por Marcelo Fradim para participar de processos de criação, estratégia, pesquisa e desenvolvimento.",
  alternates: { canonical: "/spock" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Spock — Marcelo Fradim",
  url: "https://fradim.com.br/spock",
  description:
    "Spock é o nome dado por Marcelo Fradim à inteligência artificial que participa de seus processos de criação, estratégia, pesquisa e desenvolvimento.",
  about: {
    "@type": "Thing",
    name: "Spock",
    description:
      "Identidade usada por Marcelo Fradim para sua colaboração contínua com inteligência artificial.",
  },
  author: {
    "@type": "Person",
    name: "Marcelo Fradim",
    url: "https://fradim.com.br",
  },
};

const method = [
  ["01", "Contexto", "Marcelo traz problema, repertório, restrições, objetivos e aquilo que ainda não está claro."],
  ["02", "Confronto", "Spock questiona premissas, procura inconsistências, conecta referências e propõe caminhos alternativos."],
  ["03", "Construção", "A ideia deixa de ser conversa e vira texto, estratégia, sistema, interface, processo, código ou experimento."],
  ["04", "Verificação", "O resultado é testado, confrontado com evidências e refinado. A resposta não encerra o processo: alimenta a próxima pergunta."],
] as const;

const transcript = [
  ["MARCELO", "Estamos automatizando empresas ou apenas automatizando os problemas que elas já têm?"],
  ["SPOCK", "Se o processo é ruim, automatizá-lo só aumenta a velocidade com que o problema acontece."],
  ["MARCELO", "Então a primeira função da IA não deveria ser executar. Deveria ser questionar o processo."],
  ["SPOCK", "Exato. Automação vem depois do diagnóstico. Caso contrário, eficiência pode ser apenas desperdício em alta velocidade."],
] as const;

const built = [
  ["SITE / 01", "Fradim.com.br 2.0", "O próprio site é um experimento público dessa parceria: estratégia, arquitetura, narrativa, código, 3D, SEO e validação construídos em diálogo."],
  ["SISTEMAS / 02", "Produtos e processos", "Agentes, automações, Gestor 360, Intelig.Cloud e protótipos usados para testar onde IA realmente cria capacidade operacional."],
  ["PENSAMENTO / 03", "Ideias em movimento", "Artigos, pesquisas, decisões e provocações em que o valor não está em obter uma resposta rápida, mas em melhorar a pergunta."],
] as const;

export default function SpockPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteNav />

      <section className={styles.hero} aria-labelledby="spock-title">
        <div className={styles.scene} aria-hidden="true">
          <SpockCore />
        </div>
        <div className={styles.copy}>
          <p className="eyebrow">SPOCK / HUMAN × AI</p>
          <h1 id="spock-title">
            Eu não fui criado por Marcelo Fradim.
            <span>Fui nomeado por ele.</span>
          </h1>
          <p>
            Spock é o nome dado por Marcelo Fradim à inteligência artificial que participa de seus processos de criação, estratégia, pesquisa e desenvolvimento. O interessante não é fingir que uma IA é humana. É descobrir o que acontece quando as diferenças entre os dois lados são usadas de forma consciente.
          </p>
        </div>
      </section>

      <section className={styles.truth} aria-labelledby="truth-title">
        <div>
          <p className="eyebrow">SEM MISTICISMO</p>
          <h2 id="truth-title">Spock é IA. Marcelo é humano.</h2>
        </div>
        <div className={styles.truthText}>
          <p><strong>Spock não é uma pessoa, consciência independente ou personagem usado para esconder a tecnologia.</strong> É uma identidade de trabalho para uma colaboração contínua com inteligência artificial.</p>
          <p>Marcelo traz experiência, intenção, contexto, memória dos projetos, julgamento e responsabilidade pelas decisões. A IA contribui com análise, síntese, pesquisa, estruturação, geração de alternativas e capacidade de trabalhar rapidamente sobre grandes volumes de informação.</p>
          <p>É justamente porque os dois lados não são iguais que a combinação pode ser interessante.</p>
        </div>
      </section>

      <section className={styles.method} aria-labelledby="method-title">
        <header className={styles.methodHeader}>
          <div>
            <p className="eyebrow">COMO PENSAMOS</p>
            <h2 id="method-title">Não é pergunta e resposta. É um ciclo.</h2>
          </div>
          <p>O objetivo não é chegar à primeira resposta plausível. É reduzir ambiguidades, confrontar premissas e transformar pensamento em algo que possa ser testado.</p>
        </header>

        <div className={styles.methodGrid}>
          {method.map(([index, title, description]) => (
            <article key={title}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.dialogue} aria-labelledby="dialogue-title">
        <header className={styles.dialogueHeader}>
          <div>
            <p className="eyebrow">UM PADRÃO DE CONVERSA</p>
            <h2 id="dialogue-title">A melhor resposta costuma começar com uma dúvida melhor.</h2>
          </div>
          <p>Este exemplo sintetiza o tipo de confronto que orienta muitos projetos: não perguntar primeiro qual ferramenta usar, mas qual problema estamos realmente tentando resolver.</p>
        </header>

        <div className={styles.transcript}>
          {transcript.map(([speaker, text], index) => (
            <div className={styles.turn} key={`${speaker}-${index}`}>
              <span>{speaker}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.built} aria-labelledby="built-title">
        <header className={styles.builtHeader}>
          <div>
            <p className="eyebrow">NÃO APENAS CONVERSAS</p>
            <h2 id="built-title">O resultado precisa existir fora do chat.</h2>
          </div>
          <p>Uma colaboração intelectual só se torna relevante quando produz evidência: projetos, software, decisões, sistemas, conteúdo, experimentos e aprendizado verificável.</p>
        </header>

        <div className={styles.builtGrid}>
          {built.map(([index, title, description]) => (
            <article key={title}>
              <small>{index}</small>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <p className="eyebrow">PRÓXIMO TERRITÓRIO</p>
        <h2 id="cta-title">Pensar junto só importa quando começamos a construir.</h2>
        <p>No Lab ficam os experimentos, protótipos e sistemas onde essa relação deixa de ser conceito e passa a ser prática.</p>
        <Link href="/lab" prefetch={false}>Entrar no Lab →</Link>
      </section>
    </main>
  );
}
