import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import styles from "./ContactPage.module.css";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Contato profissional de Marcelo Fradim para projetos de inteligência artificial, inovação, sistemas, marketing, cultura, memória e imprensa.",
  alternates: { canonical: "/contato" },
};

const intents = [
  {
    index: "01",
    title: "Inteligência artificial e inovação",
    text: "Agentes, automações, context engineering, produtos digitais, transformação de processos e novas formas de colaboração humano + IA.",
    href: "/inteligencia-artificial",
    action: "Conhecer a visão de IA",
  },
  {
    index: "02",
    title: "Sistemas e projetos",
    text: "Produtos, plataformas, operações, varejo, marketing, trade, BI e iniciativas que precisam conectar estratégia, interface e execução.",
    href: "/projetos",
    action: "Explorar projetos",
  },
  {
    index: "03",
    title: "Cultura, memória e imagem",
    text: "Restauração fotográfica, pesquisa iconográfica, preservação digital, Amo Franca, exposições e projetos de identidade local.",
    href: "/memoria",
    action: "Abrir o arquivo de memória",
  },
  {
    index: "04",
    title: "Imprensa e parcerias",
    text: "Entrevistas, palestras, colaboração editorial, projetos institucionais e oportunidades relacionadas à trajetória de Marcelo Fradim.",
    href: "/imprensa",
    action: "Ver evidências externas",
  },
] as const;

const channels = [
  {
    index: "01",
    type: "E-MAIL PROFISSIONAL",
    title: "fradim@gmail.com",
    text: "Canal principal para propostas, briefings, documentos e conversas que precisam de contexto.",
    href: "mailto:fradim@gmail.com",
    action: "ENVIAR E-MAIL",
  },
  {
    index: "02",
    type: "WHATSAPP",
    title: "+55 16 98180-4590",
    text: "Contato direto para alinhamentos iniciais e assuntos profissionais objetivos.",
    href: "https://wa.me/5516981804590",
    action: "ABRIR CONVERSA",
  },
  {
    index: "03",
    type: "PERFIL PROFISSIONAL",
    title: "LinkedIn",
    text: "Trajetória, artigos, projetos, publicações e atividade em inteligência artificial e inovação.",
    href: "https://www.linkedin.com/in/marcelofradim/",
    action: "ABRIR PERFIL",
  },
  {
    index: "04",
    type: "PRESENÇA PÚBLICA",
    title: "Instagram",
    text: "Registros de projetos, cultura, tecnologia, cotidiano profissional e produção visual.",
    href: "https://www.instagram.com/marcelofradim/",
    action: "ABRIR PERFIL",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contato — Marcelo Fradim",
  url: "https://fradim.com.br/contato",
  description:
    "Canais profissionais de Marcelo Fradim para inteligência artificial, inovação, sistemas, marketing, cultura e memória.",
  mainEntity: {
    "@type": "Person",
    name: "Marcelo Fradim",
    url: "https://fradim.com.br",
    email: "mailto:fradim@gmail.com",
    telephone: "+55 16 98180-4590",
    homeLocation: {
      "@type": "Place",
      name: "Franca, São Paulo, Brasil",
    },
    sameAs: [
      "https://www.linkedin.com/in/marcelofradim/",
      "https://www.instagram.com/marcelofradim/",
      "https://www.behance.net/fradim",
      "https://corredorcultural.com.br/agentes/marcelo-fradim/",
    ],
  },
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav />

      <section className={styles.hero} aria-labelledby="contact-title">
        <p className="eyebrow">CONTATO / PROJETOS + CONVERSAS REAIS</p>
        <h1 id="contact-title">
          Uma boa colaboração começa com contexto.
          <span>Não apenas com uma mensagem genérica.</span>
        </h1>
        <p>
          Conte qual problema precisa ser resolvido, o que já existe, quais são as restrições e o que mudaria se o projeto funcionasse. Quanto melhor o contexto inicial, melhor a conversa que podemos construir.
        </p>
      </section>

      <section className={styles.intents} aria-labelledby="intent-title">
        <header>
          <div>
            <p className="eyebrow">TERRITÓRIOS DE COLABORAÇÃO</p>
            <h2 id="intent-title">Onde uma conversa pode começar.</h2>
          </div>
          <p>
            Marcelo atua na interseção entre criatividade, tecnologia, negócios e cultura. Estes são os principais contextos em que o contato faz sentido.
          </p>
        </header>

        <div className={styles.intentGrid}>
          {intents.map((intent) => (
            <article key={intent.title}>
              <span>{intent.index}</span>
              <h3>{intent.title}</h3>
              <p>{intent.text}</p>
              <Link href={intent.href} prefetch={false}>{intent.action} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.channels} aria-labelledby="channels-title">
        <div className={styles.channelsIntro}>
          <p className="eyebrow">CANAIS PÚBLICOS</p>
          <h2 id="channels-title">Escolha o canal adequado.</h2>
          <p>
            Para propostas estruturadas, prefira o e-mail. Para um primeiro alinhamento objetivo, use o WhatsApp. LinkedIn e Instagram ajudam a acompanhar o trabalho em andamento.
          </p>
        </div>

        <div className={styles.channelList}>
          {channels.map((channel) => (
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
              key={channel.title}
            >
              <small>{channel.index}</small>
              <div>
                <span>{channel.type}</span>
                <h3>{channel.title}</h3>
                <p>{channel.text}</p>
              </div>
              <strong>{channel.action} ↗</strong>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="contact-closing-title">
        <p className="eyebrow">ANTES DO CONTATO</p>
        <h2 id="contact-closing-title">
          Conheça o trabalho.
          <span>Depois traga o problema.</span>
        </h2>
        <p>O site documenta a trajetória, os projetos e a relação Marcelo × Spock para que a conversa possa começar em um nível mais profundo.</p>
        <div className={styles.links}>
          <Link href="/sobre" prefetch={false}>Conhecer Marcelo</Link>
          <Link href="/spock" prefetch={false}>Conhecer Spock</Link>
          <Link href="/projetos" prefetch={false}>Explorar projetos</Link>
        </div>
      </section>
    </main>
  );
}
