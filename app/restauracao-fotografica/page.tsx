import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import styles from "./RestorationPage.module.css";

export const metadata: Metadata = {
  title: "Restauração Fotográfica",
  description:
    "Restauração digital de fotografias com foco em legibilidade, preservação da memória e transparência sobre os limites entre recuperação documental e reconstrução interpretativa.",
  alternates: { canonical: "/restauracao-fotografica" },
  openGraph: {
    title: "Restauração Fotográfica | Marcelo Fradim",
    description:
      "Recuperação digital de fotografias, preservação da memória e tratamento responsável de imagens históricas e afetivas.",
    url: "https://fradim.com.br/restauracao-fotografica",
  },
};

const steps = [
  ["01", "Avaliar", "A primeira etapa é entender a origem do arquivo, o tipo de dano, a resolução disponível e o que pode ser recuperado sem prometer informação que a imagem já não contém."],
  ["02", "Recuperar", "Contraste, cor, manchas, riscos, ruído e pequenas perdas podem ser tratados digitalmente para devolver leitura e equilíbrio à fotografia."],
  ["03", "Reconstruir com critério", "Quando partes importantes desapareceram, qualquer reconstrução precisa ser tratada como intervenção interpretativa e não como recuperação literal do documento original."],
  ["04", "Entregar e preservar", "O resultado digital deve permitir novas cópias sem manipular novamente o original físico e pode integrar um fluxo mais amplo de organização e preservação familiar."],
] as const;

const boundaries = [
  ["Restauração", "Busca recuperar informação que ainda está presente na fotografia: leitura, contraste, danos e equilíbrio visual."],
  ["Reconstrução", "Completa áreas perdidas por inferência visual. Pode ser útil, mas precisa ser distinguida do que estava documentado na imagem original."],
  ["IA assistida", "Ferramentas de inteligência artificial podem apoiar etapas específicas. O critério continua sendo humano e a intervenção deve ser transparente quando altera conteúdo."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Restauração Fotográfica Digital",
  url: "https://fradim.com.br/restauracao-fotografica",
  description:
    "Serviço de restauração digital de fotografias e orientação para preservação de imagens pessoais e históricas.",
  provider: {
    "@type": "Person",
    name: "Marcelo Fradim",
    url: "https://fradim.com.br/sobre",
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
};

export default function RestorationPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteNav />

      <section className={styles.hero} aria-labelledby="restoration-title">
        <p className="eyebrow">RESTAURAÇÃO FOTOGRÁFICA / PRESERVAR SEM INVENTAR</p>
        <h1 id="restoration-title">Recuperar a imagem.<span>Respeitar a memória.</span></h1>
        <p>Uma fotografia danificada pode ganhar novamente legibilidade, contraste, equilíbrio e presença. O objetivo não é transformar o passado em uma imagem artificialmente perfeita, mas recuperar o que ainda pode ser lido e deixar claro quando uma intervenção ultrapassa a restauração e entra no território da reconstrução.</p>
      </section>

      <section className={styles.promise} aria-labelledby="restoration-thesis-title">
        <div>
          <p className="eyebrow">CRITÉRIO</p>
          <h2 id="restoration-thesis-title">Antes do software, vem a pergunta: o que a fotografia ainda consegue nos dizer?</h2>
        </div>
        <div className={styles.promiseText}>
          <p>Meu trabalho com imagens antigas começou muito antes da atual geração de ferramentas de inteligência artificial. Esse repertório importa porque <strong>restaurar não é simplesmente gerar pixels plausíveis.</strong></p>
          <p>Fotografias de família, documentos visuais e registros históricos carregam valor afetivo e informacional. A intervenção precisa melhorar sua leitura sem apagar a diferença entre evidência e hipótese.</p>
          <p>Quando o objetivo é histórico ou patrimonial, a proveniência e o contexto são tão importantes quanto a qualidade visual do arquivo final.</p>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="restoration-process-title">
        <header className={styles.header}>
          <div><p className="eyebrow">COMO O TRABALHO É PENSADO</p><h2 id="restoration-process-title">Quatro etapas. Uma mesma responsabilidade.</h2></div>
          <p>Cada fotografia tem limitações diferentes. Por isso, o processo começa por avaliação e não por uma promessa automática de resultado.</p>
        </header>
        <div className={styles.grid}>
          {steps.map(([index, title, text]) => (
            <article key={title}><small>{index}</small><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.boundaries} aria-labelledby="restoration-boundaries-title">
        <p className="eyebrow">TRANSPARÊNCIA</p>
        <h2 id="restoration-boundaries-title">Nem toda imagem melhorada é uma restauração.</h2>
        <div className={styles.boundaryGrid}>
          {boundaries.map(([title, text]) => (
            <article key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="restoration-cta-title">
        <p className="eyebrow">FOTOGRAFIAS PESSOAIS + MEMÓRIA HISTÓRICA</p>
        <h2 id="restoration-cta-title">Uma foto pode voltar a ser vista.<span>E continuar contando sua história.</span></h2>
        <p>Para avaliar uma fotografia específica, o primeiro passo é enviar uma boa digitalização ou reprodução para análise. Para conhecer o trabalho de pesquisa iconográfica e preservação histórica, a página Memória mostra a evolução dessa trajetória.</p>
        <div className={styles.links}>
          <Link href="/contato" prefetch={false}>Solicitar avaliação</Link>
          <Link href="/memoria" prefetch={false}>Explorar Memória</Link>
        </div>
      </section>
    </main>
  );
}
