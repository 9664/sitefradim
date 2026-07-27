import type { Metadata } from "next";
import Link from "next/link";
import styles from "./PressPage.module.css";

export const metadata: Metadata = {
  title: "Imprensa e evidências",
  description:
    "Reportagens, registros institucionais e perfis externos que documentam a trajetória profissional, cultural e tecnológica de Marcelo Fradim.",
  alternates: { canonical: "/imprensa" },
};

const coverage = [
  {
    date: "2013",
    source: "Sampi / Comércio da Franca",
    title: "Marcelo Fradim resgata cores de fotos centenárias de Franca",
    text: "Registro do início público do trabalho de recuperação e colorização de fotografias históricas de Franca, já associado a um acervo de milhares de imagens antigas.",
    href: "https://sampi.net.br/franca/noticias/1482571/pecas-e-exposicoes/2013/02/marcelo-fradim-resgata-cores-de-fotos-centenarias-de-franca",
  },
  {
    date: "2018",
    source: "Sampi",
    title: "Memória: conheça a Franca de antigamente em 80 fotos",
    text: "A cobertura relaciona Marcelo Fradim, o acervo histórico e o Amo Franca ao trabalho de preservação visual da memória da cidade.",
    href: "https://sampi.net.br/franca/noticias/1669195/local/2018/11/memoria-conheca-a-franca-de-antigamente-em-80-fotos",
  },
  {
    date: "2020",
    source: "Jornal da Franca",
    title: "Artista restaura a história de Franca recuperando fotos antigas",
    text: "Perfil amplo sobre trajetória, marketing, Amo Franca, restauração de mais de mil fotografias e participação em ações culturais da cidade.",
    href: "https://www.jornaldafranca.com.br/marcelo-fradim-artista-que-restaura-a-historia-de-franca-recuperando-fotos-antigas/",
  },
  {
    date: "2023",
    source: "Sampi",
    title: "Grupo Amo Franca comemora aniversário com Festa Disco Music",
    text: "A reportagem registra Marcelo Fradim como fundador do Amo Franca e documenta a dimensão alcançada pela comunidade digital naquele período.",
    href: "https://sampi.net.br/franca/noticias/2754574/franca-e-regiao/2023/04/grupo-amo-franca-comemora-aniversario-com-festa-disco-music",
  },
  {
    date: "VAREJO",
    source: "Jornal da Franca",
    title: "Transformação do Supermercado Tiãozinho em Pedregulho",
    text: "Cobertura da expansão do grupo cita Marcelo Fradim como consultor de marketing e registra sua visão sobre experiência, comunidade e transformação do varejo.",
    href: "https://www.jornaldafranca.com.br/veja-a-transformacao-que-o-supermercado-tiaozinho-fez-na-sua-unidade-de-pedregulho/",
  },
] as const;

const signals = [
  {
    type: "PERFIL PROFISSIONAL",
    title: "LinkedIn",
    text: "Trajetória profissional, artigos, recomendações, publicações e atividade recente em IA, inovação e produtos digitais.",
    href: "https://www.linkedin.com/in/marcelofradim/",
  },
  {
    type: "PORTFÓLIO CRIATIVO",
    title: "Behance",
    text: "Registro de projetos de marca, embalagem, planejamento e design, conectado à atuação em marketing e comunicação.",
    href: "https://www.behance.net/fradim",
  },
  {
    type: "REGISTRO INSTITUCIONAL",
    title: "Corredor Cultural",
    text: "Perfil como agente cultural e pesquisador independente na interface entre memória social, arte tecnológica e inteligência artificial.",
    href: "https://corredorcultural.com.br/agentes/marcelo-fradim/",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Marcelo Fradim — Imprensa e evidências",
  url: "https://fradim.com.br/imprensa",
  about: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: coverage.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.href,
      name: item.title,
    })),
  },
};

export default function PressPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="top-nav inner-nav" aria-label="Navegação principal">
        <Link className="brand" href="/">MF<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">← Universo</Link>
      </nav>

      <section className={styles.hero} aria-labelledby="press-title">
        <p className="eyebrow">IMPRENSA / EVIDÊNCIA EXTERNA</p>
        <h1 id="press-title">Não basta dizer quem você é.<span>Outras fontes precisam conseguir mostrar.</span></h1>
        <p>Este arquivo reúne registros externos que ajudam a documentar a trajetória de Marcelo Fradim. Reportagem independente, perfil profissional e registro institucional não têm o mesmo peso — por isso aparecem separados.</p>
      </section>

      <section className={styles.archive} aria-labelledby="archive-title">
        <header className={styles.header}>
          <div><p className="eyebrow">COBERTURA EDITORIAL</p><h2 id="archive-title">Uma história distribuída no tempo.</h2></div>
          <p>Os registros mostram uma linha que começa na imagem e preservação histórica, passa por comunidade e cultura e chega à atuação em marketing, varejo e tecnologia.</p>
        </header>

        <div className={styles.list}>
          {coverage.map((item) => (
            <a className={styles.item} href={item.href} target="_blank" rel="noreferrer" key={item.title}>
              <span className={styles.date}>{item.date}</span>
              <span className={styles.source}>{item.source}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.signals} aria-labelledby="signals-title">
        <header className={styles.signalsHeader}>
          <div><p className="eyebrow">SINAIS DE IDENTIDADE</p><h2 id="signals-title">A mesma pessoa, em ecossistemas diferentes.</h2></div>
          <p>Perfis externos não substituem imprensa independente. Eles cumprem outra função: ajudam mecanismos de busca e pessoas a relacionar nome, carreira, projetos, portfólio e atuação cultural à mesma identidade pública.</p>
        </header>
        <div className={styles.signalGrid}>
          {signals.map((signal) => (
            <a href={signal.href} target="_blank" rel="noreferrer" key={signal.title}>
              <small>{signal.type}</small>
              <div><h3>{signal.title}</h3><p>{signal.text}</p></div>
              <span>Abrir fonte externa ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.statement} aria-labelledby="statement-title">
        <p className="eyebrow">REGRA DE CREDIBILIDADE</p>
        <h2 id="statement-title">Autoridade não será fabricada.<span> Será documentada.</span></h2>
        <p>O objetivo deste projeto é tornar mais fácil encontrar, verificar e conectar o que já foi construído — e criar novos trabalhos dignos de serem citados por fontes independentes.</p>
        <Link href="/sobre">Voltar à trajetória →</Link>
      </section>
    </main>
  );
}
