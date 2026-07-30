import type { Metadata } from "next";
import Link from "next/link";
import { AIField } from "@/components/AIField";
import { SiteNav } from "@/components/SiteNav";
import styles from "./AIPage.module.css";

export const metadata: Metadata = {
  title: "Inteligência Artificial e Inovação",
  description:
    "A visão de Marcelo Fradim sobre inteligência artificial aplicada a negócios, agentes, automação, context engineering, vibe coding e redesenho de processos.",
  alternates: { canonical: "/inteligencia-artificial" },
};

const layers = [
  ["01", "Problema", "DIAGNÓSTICO", "Antes de escolher modelo, agente ou automação, é preciso definir qual decisão, gargalo ou experiência precisa melhorar."],
  ["02", "Contexto", "CONTEXT ENGINEERING", "A qualidade da IA depende do contexto que recebe: regras, memória, dados, objetivos, restrições, ferramentas e critérios de sucesso."],
  ["03", "Modelo", "RACIOCÍNIO + GERAÇÃO", "O modelo é uma peça da arquitetura. Seu valor depende menos do nome na etiqueta e mais de como é inserido no fluxo de trabalho."],
  ["04", "Agente", "ORQUESTRAÇÃO", "Agentes conectam intenção a ferramentas, fontes de dados e ações. Autonomia sem limites claros é risco; autonomia bem desenhada é capacidade."],
  ["05", "Workflow", "PROCESSO", "A IA precisa entrar em processos reais: marketing, operação, atendimento, conteúdo, análise, software e gestão — com papéis e handoffs definidos."],
  ["06", "Resultado", "MÉTRICA", "Velocidade sozinha não é transformação. O sistema precisa melhorar qualidade, custo, tempo, conversão, decisão ou experiência de forma observável."],
] as const;

const applications = [
  ["AGENTES + AUTOMAÇÃO", "Intelig.Cloud", "Construção de agentes, automações e produtos digitais orientados a problemas reais de negócio.", "/projetos/intelig-cloud"],
  ["OPERAÇÃO + IA", "Gestor 360", "Experimento de integração entre campanhas, trade, tarefas, BI e inteligência operacional.", "/projetos/gestor-360"],
  ["HUMANO + IA", "Marcelo × Spock", "Um método contínuo de contexto, confronto, construção e verificação aplicado aos próprios projetos.", "/spock"],
] as const;

const antiPatterns = [
  ["01", "Automatizar processo ruim", "Se o fluxo já produz desperdício, a IA pode apenas fazer o desperdício acontecer mais rápido."],
  ["02", "Colecionar ferramentas", "Conhecer dezenas de plataformas não substitui arquitetura, contexto, integração e clareza sobre o problema."],
  ["03", "Confundir demo com produto", "Uma interface impressionante em cinco minutos ainda precisa sobreviver a dados reais, exceções, usuários e métricas."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Inteligência Artificial e Inovação — Marcelo Fradim",
  url: "https://fradim.com.br/inteligencia-artificial",
  about: [
    { "@type": "Thing", name: "Inteligência Artificial" },
    { "@type": "Thing", name: "Agentes de IA" },
    { "@type": "Thing", name: "Context Engineering" },
    { "@type": "Thing", name: "Automação" },
    { "@type": "Thing", name: "Vibe Coding" },
  ],
  author: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
};

export default function AIPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteNav />

      <section className={styles.hero} aria-labelledby="ai-title">
        <div className={styles.scene} aria-hidden="true"><AIField /></div>
        <div className={styles.copy}>
          <p className="eyebrow">INTELIGÊNCIA ARTIFICIAL / APLICAÇÃO</p>
          <h1 id="ai-title">IA não começa no modelo.<span>Começa no problema.</span></h1>
          <p>Minha visão de inteligência artificial não é uma coleção de ferramentas. É uma arquitetura que conecta contexto, modelos, agentes, software e processos para produzir capacidade real dentro de empresas e projetos.</p>
        </div>
      </section>

      <section className={styles.thesis} aria-labelledby="ai-thesis-title">
        <div><p className="eyebrow">TESE</p><h2 id="ai-thesis-title">Usar IA é fácil. Redesenhar trabalho é difícil.</h2></div>
        <div className={styles.thesisText}>
          <p>Adicionar um chatbot a um processo antigo pode ser útil. Mas isso não é necessariamente transformação.</p>
          <p>O salto acontece quando perguntamos se aquela tarefa ainda precisa existir, quais decisões podem ser assistidas, onde o contexto está perdido e como humano e software devem dividir responsabilidade.</p>
          <p><strong>A IA mais valiosa não é a que aparece mais. É a que remove fricção, melhora julgamento e cria novas capacidades.</strong></p>
        </div>
      </section>

      <section className={styles.stack} aria-labelledby="stack-title">
        <header className={styles.header}>
          <div><p className="eyebrow">ARQUITETURA</p><h2 id="stack-title">Do problema ao resultado.</h2></div>
          <p>Uma aplicação robusta de IA precisa atravessar várias camadas. Pular uma delas costuma produzir demos bonitas e sistemas frágeis.</p>
        </header>
        <div className={styles.layers}>
          {layers.map(([index, title, context, text]) => (
            <article className={styles.layer} key={title}>
              <span>{index}</span><h3>{title}</h3><div><strong>{context}</strong><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.applications} aria-labelledby="applications-title">
        <p className="eyebrow">APLICAÇÃO REAL</p>
        <h2 id="applications-title">A teoria precisa encontrar sistemas.</h2>
        <div className={styles.applicationGrid}>
          {applications.map(([category, title, text, href]) => (
            <Link href={href} prefetch={false} key={title}><small>{category}</small><div><h3>{title}</h3><p>{text}</p></div><span>Explorar →</span></Link>
          ))}
        </div>
      </section>

      <section className={styles.anti} aria-labelledby="anti-title">
        <p className="eyebrow">O QUE EVITAR</p>
        <h2 id="anti-title">Três atalhos que parecem inovação.</h2>
        <div className={styles.antiGrid}>
          {antiPatterns.map(([index, title, text]) => (
            <article key={title}><small>{index}</small><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="ai-cta-title">
        <p className="eyebrow">PRÓXIMA FRONTEIRA</p>
        <h2 id="ai-cta-title">O futuro não será decidido por quem tem acesso à IA.<span> Será decidido por quem aprender a reorganizar trabalho com ela.</span></h2>
        <p>É esse território que estou explorando hoje: agentes, context engineering, automação, desenvolvimento assistido por IA, produtos digitais e novas formas de colaboração humano-máquina.</p>
        <div className={styles.ctaLinks}><Link href="/lab" prefetch={false}>Entrar no Lab</Link><Link href="/ideias" prefetch={false}>Ler ideias</Link><Link href="/sobre" prefetch={false}>Conhecer Marcelo</Link></div>
      </section>
    </main>
  );
}
