import type { Metadata } from "next";
import Link from "next/link";
import styles from "./ProjectsPage.module.css";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos de Marcelo Fradim que conectam inteligência artificial, marketing, sistemas, varejo, cultura, memória e produtos digitais.",
  alternates: { canonical: "/projetos" },
};

const projects = [
  {
    index: "01",
    status: "EM EVOLUÇÃO",
    title: "Intelig.Cloud",
    text: "Uma iniciativa para transformar inteligência artificial em capacidade operacional por meio de agentes, automações, sistemas e produtos digitais.",
    href: "/projetos/intelig-cloud",
    tags: ["IA", "Agentes", "Automação", "SaaS", "Context Engineering"],
  },
  {
    index: "02",
    status: "SISTEMA",
    title: "Gestor 360",
    text: "Uma visão integrada de marketing, trade, campanhas, tarefas, BI e processos para reduzir ilhas operacionais e aumentar clareza de execução.",
    href: "/projetos/gestor-360",
    tags: ["Varejo", "Marketing", "Trade", "BI", "Processos"],
  },
  {
    index: "03",
    status: "DESDE 2014",
    title: "Amo Franca",
    text: "Comunidade, memória, cultura e comunicação digital reunidas em um projeto de longo prazo sobre identidade local e preservação histórica.",
    href: "/projetos/amo-franca",
    tags: ["Comunidade", "Cultura", "Memória", "Fotografia", "Pesquisa"],
  },
  {
    index: "04",
    status: "EXPERIMENTO VIVO",
    title: "Fradim.com.br 2.0",
    text: "Este próprio site: narrativa, 3D, dados estruturados, SEO, acessibilidade e experimentos usados para investigar uma nova forma de identidade digital humano + IA.",
    href: "/lab",
    tags: ["Next.js", "WebGL", "Three.js", "SEO", "Human × AI"],
  },
] as const;

const logic = [
  ["01", "Problema real", "Projetos entram aqui porque respondem a uma necessidade concreta — operacional, cultural, estratégica ou experimental."],
  ["02", "Tecnologia adequada", "IA, software e automação são escolhidos depois da compreensão do problema, não para justificar uma ferramenta da moda."],
  ["03", "Aprendizado acumulado", "Cada projeto precisa gerar repertório reutilizável: método, dados, componentes, decisões e conhecimento que alimentam os próximos."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projetos — Marcelo Fradim",
  url: "https://fradim.com.br/projetos",
  author: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `https://fradim.com.br${project.href}`,
    })),
  },
};

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="top-nav inner-nav" aria-label="Navegação principal">
        <Link className="brand" href="/">MF<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">← Universo</Link>
      </nav>

      <section className={styles.hero} aria-labelledby="projects-title">
        <p className="eyebrow">WORK / SISTEMAS + INICIATIVAS</p>
        <h1 id="projects-title">Ideias só ganham valor<span>quando encontram o mundo real.</span></h1>
        <p>Este não é um portfólio de peças isoladas. São projetos usados para testar como marketing, tecnologia, inteligência artificial, operação, cultura e comunidade podem trabalhar no mesmo sistema.</p>
      </section>

      <section className={styles.projects} aria-labelledby="portfolio-title">
        <header className={styles.header}>
          <div><p className="eyebrow">PROJETOS SELECIONADOS</p><h2 id="portfolio-title">Construir é parte do método.</h2></div>
          <p>Alguns projetos são negócios, outros sistemas internos, comunidades ou experimentos. O critério comum é simples: precisam produzir algo que possa ser usado, observado ou aprendido.</p>
        </header>
        <div className={styles.grid}>
          {projects.map((project) => (
            <Link className={styles.card} href={project.href} key={project.title}>
              <div className={styles.top}><span>{project.index}</span><span className={styles.status}>{project.status}</span></div>
              <div><h3>{project.title}</h3><p>{project.text}</p><div className={styles.tags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              <span className={styles.open}>Abrir projeto →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.logic} aria-labelledby="logic-title">
        <p className="eyebrow">LÓGICA DE CONSTRUÇÃO</p>
        <h2 id="logic-title">O projeto muda. O método permanece.</h2>
        <div className={styles.logicGrid}>
          {logic.map(([index, title, text]) => (
            <article key={title}><small>{index}</small><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="projects-cta-title">
        <p className="eyebrow">BUILD → TEST → LEARN</p>
        <h2 id="projects-cta-title">Nem tudo precisa virar empresa.<span> Tudo precisa gerar aprendizado.</span></h2>
        <p>O Lab reúne os experimentos menores e interfaces que não precisam esperar um projeto completo para serem testados.</p>
        <div className={styles.ctaLinks}><Link href="/lab">Entrar no Lab</Link><Link href="/inteligencia-artificial">Ver visão de IA</Link></div>
      </section>
    </main>
  );
}
