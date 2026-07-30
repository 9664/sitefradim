import Link from "next/link";
import { SiteNav } from "./SiteNav";
import styles from "./Gestor360Case.module.css";

const baseline = [
  ["116", "datas sazonais cadastradas"],
  ["32", "campanhas no diagnóstico inicial"],
  ["710", "cartazes já produzidos"],
  ["522", "cards no ContentMind"],
] as const;

const silos = [
  {
    index: "01",
    title: "Calendário sem consequência",
    text: "Datas, campanhas e eventos existiam, mas não formavam uma cadeia operacional única. O calendário informava; ele ainda não comandava o trabalho.",
  },
  {
    index: "02",
    title: "Execução sem evidência",
    text: "Tarefas, aprovações, cartazes, conteúdos e ações de loja apareciam em módulos diferentes. Faltava enxergar o que foi planejado, executado e comprovado.",
  },
  {
    index: "03",
    title: "Dados sem narrativa",
    text: "BI, compras, trade e marketing possuíam informações relevantes, mas não respondiam juntos a uma pergunta executiva: o que está acontecendo e qual é o próximo passo?",
  },
] as const;

const flow = [
  ["EVENTO", "Uma data comercial deixa de ser lembrete e passa a carregar objetivo, público, categorias, riscos e aprendizado histórico."],
  ["MISSÃO", "A oportunidade é convertida em briefing, responsabilidades, capacidade, dependências e critérios de sucesso."],
  ["GATES", "Aprovações são atribuídas por papel e risco. A IA propõe; pessoas autorizadas validam o que exige julgamento."],
  ["EXECUÇÃO", "Marketing, trade, compras, cartazeamento e lojas trabalham sobre o mesmo contexto e o mesmo prazo."],
  ["EVIDÊNCIA", "Entregas, fotos, documentos, comentários e resultados passam a provar o estado real da campanha."],
  ["APRENDIZADO", "O resultado retorna ao evento como conhecimento reutilizável, em vez de desaparecer na memória das pessoas."],
] as const;

const capabilities = [
  ["COCKPIT", "Cockpit Diretor", "Uma visão executiva para missões, riscos, decisões, pendências e histórico de briefings."],
  ["PLANEJAMENTO", "Briefing · Capacidade · Benchmark", "A campanha começa com contexto operacional, restrições reais e comparação, não com uma lista solta de peças."],
  ["DEPENDÊNCIAS", "Grafo operacional", "Relações entre entregas, pessoas e bloqueios tornam visível o que impede a execução."],
  ["GOVERNANÇA", "Role Mission Engine", "Papéis, gates, responsáveis e aprovadores estruturam quem decide, quem executa e quem precisa ser informado."],
  ["IA", "Saúde da inteligência", "Propostas de IA são acompanhadas por contexto, explicação, confiança e políticas de aceitação."],
  ["PADRÃO", "Padrão Ouro", "Campanhas importantes podem virar playbooks completos e reutilizáveis, preservando decisões e aprendizados."],
] as const;

const principles = [
  ["01", "Orquestrar, não substituir", "O Gestor 360 não nasce para apagar sistemas existentes. Ele conecta ERP, BI, marketing, trade e operação sem exigir migração destrutiva."],
  ["02", "Evento como eixo", "Campanha, tarefa, cartaz, compra, canal e evidência precisam responder ao mesmo evento comercial."],
  ["03", "IA com responsabilidade", "Automação depende de classe de risco. Baixo risco pode ganhar velocidade; decisões críticas continuam humanas."],
  ["04", "Documento é consequência", "PDF, relatório e apresentação são saídas do processo. O objetivo é manter contexto, responsabilidade e execução vivos no sistema."],
] as const;

const roadmap = [
  {
    phase: "AGORA",
    title: "Fundação relacional",
    text: "Conectar evento, campanha, trade, cartaz, loja e tarefa; remover rotas duplicadas e consolidar uma linguagem operacional única.",
  },
  {
    phase: "INTEGRAÇÃO",
    title: "Missões reais",
    text: "Instanciar workflows, aprovações, evidências e responsabilidades em campanhas reais, usando o calendário como disparador.",
  },
  {
    phase: "INTELIGÊNCIA",
    title: "ROI e conhecimento",
    text: "Unir planejado e realizado, incorporar aprendizados por evento e usar RAG para recuperar decisões, playbooks e histórico relevante.",
  },
  {
    phase: "ESCALA",
    title: "Ecossistema comercial",
    text: "Evoluir fornecedor, JBP, verbas, execução de loja, CRM, canais e previsão por produto, loja e evento.",
  },
] as const;

const collaboration = [
  {
    actor: "MARCELO",
    title: "Contexto e julgamento",
    text: "Traduz a operação do varejo, as dores das áreas, os conflitos de responsabilidade, os limites do time e o que realmente precisa funcionar na segunda-feira.",
  },
  {
    actor: "SPOCK",
    title: "Auditoria e arquitetura",
    text: "Lê relações, identifica silos, confronta premissas, estrutura papéis e transforma o diagnóstico em modelos, componentes, regras e testes verificáveis.",
  },
  {
    actor: "SISTEMA",
    title: "Evidência fora do chat",
    text: "A colaboração só ganha valor quando vira fluxo, interface, regra, dado, responsabilidade e aprendizado que outras pessoas conseguem usar.",
  },
] as const;

export function Gestor360Case({ schema }: { schema: Record<string, unknown> }) {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav backHref="/projetos" backLabel="Projetos" />

      <section className={styles.hero} aria-labelledby="gestor-title">
        <div className={styles.heroCopy}>
          <p className="eyebrow">CASE 01 / SISTEMAS + OPERAÇÃO</p>
          <h1 id="gestor-title">Gestor 360</h1>
          <p className={styles.statement}>Quando marketing, trade, compras e operação deixam de trabalhar como ilhas.</p>
          <p className={styles.intro}>
            Um sistema de orquestração criado dentro de uma operação real de varejo alimentar. O desafio não era produzir mais uma tela, mas conectar calendário, campanhas, responsabilidades, execução, evidências e inteligência em uma visão comum.
          </p>
          <div className={styles.heroActions}>
            <Link href="#arquitetura">Explorar a arquitetura</Link>
            <Link href="/projetos">Voltar aos projetos</Link>
          </div>
        </div>

        <div className={styles.signal} aria-hidden="true">
          <span>EVENTO</span>
          <i />
          <span>MISSÃO</span>
          <i />
          <span>EXECUÇÃO</span>
          <i />
          <span>APRENDIZADO</span>
        </div>
      </section>

      <section className={styles.baseline} aria-labelledby="baseline-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">BASELINE TÉCNICO / 2026</p>
            <h2 id="baseline-title">O sistema já tinha volume.<br />Faltava relação.</h2>
          </div>
          <p>Os números abaixo registram o ponto de partida da auditoria. Eles não são apresentados como resultado final, mas como evidência da complexidade que precisava ser organizada.</p>
        </header>
        <div className={styles.metricGrid}>
          {baseline.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
        <p className={styles.baselineNote}>O diagnóstico encontrou módulos maduros em cartazeamento, BI e conteúdo, mas campanhas, eventos, trade e execução ainda operavam com vínculos incompletos.</p>
      </section>

      <section className={styles.problem} aria-labelledby="problem-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">O PROBLEMA REAL</p>
            <h2 id="problem-title">Um ecossistema forte<br />pode continuar fragmentado.</h2>
          </div>
          <p>A complexidade não estava na ausência de software. Estava no excesso de pontos de entrada e na falta de uma narrativa operacional compartilhada.</p>
        </header>
        <div className={styles.problemGrid}>
          {silos.map((item) => (
            <article key={item.title}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="arquitetura" className={styles.architecture} aria-labelledby="architecture-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">ARQUITETURA DE ORQUESTRAÇÃO</p>
            <h2 id="architecture-title">Uma campanha como sistema,<br />não como sequência de pedidos.</h2>
          </div>
          <p>O Gestor 360 transforma uma oportunidade comercial em uma missão rastreável, com contexto, papéis, dependências, execução e aprendizado.</p>
        </header>

        <div className={styles.flow}>
          {flow.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.capabilities} aria-labelledby="capabilities-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">O QUE FOI CONSTRUÍDO</p>
            <h2 id="capabilities-title">A camada que transforma<br />módulos em decisões.</h2>
          </div>
          <p>As funcionalidades não aparecem como uma lista de recursos. Cada uma responde a um problema de coordenação, responsabilidade ou inteligência.</p>
        </header>
        <div className={styles.capabilityGrid}>
          {capabilities.map(([label, title, text]) => (
            <article key={title}>
              <small>{label}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.principlesLead}>
          <p className="eyebrow">DECISÕES DE PRODUTO</p>
          <h2 id="principles-title">O sistema não precisava de mais promessas. Precisava de regras.</h2>
          <p>As decisões abaixo protegem o projeto contra dois riscos comuns: substituir processos antes de compreendê-los e automatizar problemas que ainda não foram resolvidos.</p>
        </div>
        <div className={styles.principleList}>
          {principles.map(([index, title, text]) => (
            <article key={title}>
              <span>{index}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.roadmap} aria-labelledby="roadmap-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">ROADMAP</p>
            <h2 id="roadmap-title">Conectar antes de escalar.</h2>
          </div>
          <p>A evolução prioriza relações e uso real. Novos módulos só entram quando o núcleo consegue explicar quem precisa agir, por quê e com qual evidência.</p>
        </header>
        <div className={styles.roadmapGrid}>
          {roadmap.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.phase}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.collaboration} aria-labelledby="collaboration-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">MARCELO × SPOCK</p>
            <h2 id="collaboration-title">A colaboração precisa<br />aparecer no método.</h2>
          </div>
          <p>O diferencial não é dizer que o projeto usa IA. É mostrar onde experiência humana, análise artificial e responsabilidade operacional se encontram.</p>
        </header>
        <div className={styles.collaborationGrid}>
          {collaboration.map((item) => (
            <article key={item.actor}>
              <small>{item.actor}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <p className="eyebrow">SISTEMA EM EVOLUÇÃO</p>
        <h2 id="closing-title">Gestão 360 não é ver tudo.<span>É conseguir relacionar o que importa.</span></h2>
        <p>O projeto continua em construção. A evidência de avanço não será o número de telas, mas a capacidade de uma campanha atravessar planejamento, execução e aprendizado sem perder contexto.</p>
        <div className={styles.closingLinks}>
          <Link href="/lab">Ver o laboratório</Link>
          <Link href="/projetos">Explorar outros projetos</Link>
        </div>
      </section>
    </main>
  );
}
