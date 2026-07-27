import type { Metadata } from "next";
import Link from "next/link";
import { MemoryField } from "@/components/MemoryField";
import { SiteNav } from "@/components/SiteNav";
import styles from "./MemoryPage.module.css";

export const metadata: Metadata = {
  title: "Memória, Cultura e Preservação Digital",
  description:
    "A trajetória de Marcelo Fradim em restauração de imagens, pesquisa iconográfica, acervos, memória coletiva, cultura digital e inteligência artificial.",
  alternates: { canonical: "/memoria" },
};

const moments = [
  {
    index: "01",
    title: "Restaurar para compreender",
    context: "DESDE 2013 · IMAGEM HISTÓRICA",
    body: "A restauração começa como trabalho de leitura da imagem: recuperar informação visual sem apagar marcas do tempo, pesquisar contexto e devolver legibilidade a registros que ainda carregam perguntas.",
  },
  {
    index: "02",
    title: "Mais de mil imagens",
    context: "REGISTRO PÚBLICO · 2020",
    body: "Em 2020, reportagem do Jornal da Franca registrou que mais de mil fotografias antigas de Franca já haviam sido colorizadas e restauradas dentro desse trabalho de resgate histórico.",
  },
  {
    index: "03",
    title: "Do arquivo à infraestrutura",
    context: "ACERVO DIÁRIO DA FRANCA · 2020",
    body: "A memória muda de escala quando deixa de ser uma imagem isolada. Naquele ano, o Amo Franca recebeu o acervo fotográfico remanescente do Diário da Franca; a reportagem registrava 64.932 imagens já catalogadas de um conjunto que se aproximava de 100 mil fotografias.",
  },
  {
    index: "04",
    title: "Memória em espaço público",
    context: "PINACOTECA · FRANCA 200 ANOS · 2024",
    body: "Na exposição “Franca 200 anos”, fotografias históricas restauradas integraram a mostra da Pinacoteca Municipal. O trabalho apresentado ali foi descrito como artesanal, reforçando uma regra importante: tecnologia não substitui critério histórico.",
  },
  {
    index: "05",
    title: "Reconstruir sem inventar",
    context: "MANOEL VALIM · 2025",
    body: "A reconstituição das feições de Manoel Valim partiu de dois vestígios visuais frágeis. O caso sintetiza o desafio atual: combinar pesquisa, tratamento de imagem e novas ferramentas sem transformar hipótese em certeza histórica.",
  },
] as const;

const principles = [
  ["01", "Fonte antes do efeito", "Uma imagem histórica não é matéria-prima neutra. Origem, data, autoria, contexto e limitações precisam acompanhar qualquer intervenção."],
  ["02", "Preservar antes de embelezar", "Nitidez e cor só fazem sentido quando recuperam leitura. Uma restauração bonita que altera informação pode ser visualmente convincente e historicamente errada."],
  ["03", "Incerteza precisa aparecer", "Quando uma reconstrução depende de inferência, isso deve ser tratado como interpretação — não como documento original."],
  ["04", "Tecnologia serve à memória", "IA, software e processamento de imagem ampliam possibilidades. O critério continua sendo humano: pesquisar, comparar, decidir e assumir responsabilidade pela representação."],
] as const;

const sources = [
  {
    category: "REPORTAGEM · 2020",
    title: "Mais de mil fotos antigas restauradas e colorizadas",
    text: "Perfil sobre o trabalho de preservação, exposições, Amo Franca e atuação cultural, registrando a atividade de restauração desde 2013.",
    href: "https://www.jornaldafranca.com.br/marcelo-fradim-artista-que-restaura-a-historia-de-franca-recuperando-fotos-antigas/",
  },
  {
    category: "ACERVO · 2020",
    title: "O arquivo fotográfico do Diário da Franca",
    text: "Registro da doação do acervo ao Amo Franca e do processo de catalogação e digitalização para pesquisa e acesso público.",
    href: "https://www.jornaldafranca.com.br/grupo-amo-franca-recebe-acervo-fotografico-com-65-mil-fotos-do-diario/",
  },
  {
    category: "EXPOSIÇÃO · 2024",
    title: "Franca 200 anos na Pinacoteca Municipal",
    text: "Mostra que reuniu fotografias históricas restauradas, esculturas e obras do acervo municipal para narrar visualmente a trajetória da cidade.",
    href: "https://www.jornaldafranca.com.br/franca-200-anos-pinacoteca-municipal-miguel-angelo-pucci-apresenta-exposicao/",
  },
  {
    category: "PERFIL CULTURAL",
    title: "Memória social, arte tecnológica e inteligência artificial",
    text: "Perfil no Corredor Cultural que documenta atuação em curadoria, restauração de acervos e projetos de resgate iconográfico em diferentes comunidades.",
    href: "https://corredorcultural.com.br/agentes/marcelo-fradim/",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Memória, Cultura e Preservação Digital — Marcelo Fradim",
  url: "https://fradim.com.br/memoria",
  description:
    "Pesquisa iconográfica, restauração de imagens, preservação de acervos, memória coletiva e tecnologia na trajetória de Marcelo Fradim.",
  about: [
    { "@type": "Thing", name: "Preservação digital" },
    { "@type": "Thing", name: "Memória social" },
    { "@type": "Thing", name: "Restauração fotográfica" },
    { "@type": "Thing", name: "Pesquisa iconográfica" },
    { "@type": "Thing", name: "Inteligência Artificial" },
  ],
  author: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
  citation: sources.map((source) => source.href),
};

export default function MemoryPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteNav />

      <section className={styles.hero} aria-labelledby="memory-title">
        <div className={styles.scene} aria-hidden="true"><MemoryField /></div>
        <div className={styles.copy}>
          <p className="eyebrow">MEMÓRIA / IMAGEM × CONTEXTO × TECNOLOGIA</p>
          <h1 id="memory-title">Memória não é passado.<span>É infraestrutura cultural.</span></h1>
          <p>Fotografias, arquivos e fragmentos visuais não servem apenas para produzir nostalgia. Eles ajudam uma comunidade a reconhecer lugares, pessoas, transformações e versões de si mesma. Tecnologia entra aqui para ampliar acesso e leitura — não para reescrever o documento.</p>
        </div>
      </section>

      <section className={styles.thesis} aria-labelledby="memory-thesis-title">
        <div>
          <p className="eyebrow">UMA TESE</p>
          <h2 id="memory-thesis-title">Uma fotografia antiga contém pixels.<br />Mas seu valor está no contexto.</h2>
        </div>
        <div className={styles.thesisText}>
          <p>Restaurar uma imagem pode recuperar contraste, detalhes e leitura. <strong>Preservar memória exige mais.</strong></p>
          <p>É preciso saber de onde a imagem veio, o que ela representa, o que mudou ao redor dela e onde termina a evidência e começa a interpretação.</p>
          <p>Foi essa lógica que aproximou fotografia, pesquisa histórica, construção de comunidade, digitalização de acervos e, mais tarde, inteligência artificial.</p>
        </div>
      </section>

      <section className={styles.timeline} aria-labelledby="memory-timeline-title">
        <header className={styles.timelineHeader}>
          <div>
            <p className="eyebrow">DA IMAGEM AO ACERVO</p>
            <h2 id="memory-timeline-title">A escala da memória foi mudando.</h2>
          </div>
          <p>Os números abaixo aparecem como registros datados de fontes externas, não como slogans. O objetivo é documentar a evolução de um trabalho que começou na imagem e passou a lidar com arquivos, exposições e reconstruções mais complexas.</p>
        </header>

        <div className={styles.timelineGrid}>
          {moments.map((moment) => (
            <article className={styles.moment} key={moment.index}>
              <span>{moment.index}</span>
              <h3>{moment.title}</h3>
              <div><strong>{moment.context}</strong><p>{moment.body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.method} aria-labelledby="memory-method-title">
        <header className={styles.methodHeader}>
          <div>
            <p className="eyebrow">PROTOCOLO DE PRESERVAÇÃO</p>
            <h2 id="memory-method-title">Reconstruir exige limites.</h2>
          </div>
          <p>Quanto mais poderosa a tecnologia, maior precisa ser a disciplina para separar restauração, interpretação e invenção.</p>
        </header>

        <div className={styles.methodGrid}>
          {principles.map(([index, title, body]) => (
            <article key={title}><small>{index}</small><div><h3>{title}</h3><p>{body}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.evidence} aria-labelledby="memory-evidence-title">
        <header className={styles.evidenceHeader}>
          <div>
            <p className="eyebrow">EVIDÊNCIA EXTERNA</p>
            <h2 id="memory-evidence-title">A memória também precisa de fontes.</h2>
          </div>
          <p>Estas referências externas ajudam a verificar etapas do trabalho e dão contexto independente à narrativa apresentada aqui.</p>
        </header>

        <div className={styles.evidenceGrid}>
          {sources.map((source) => (
            <a className={styles.source} href={source.href} target="_blank" rel="noreferrer" key={source.href}>
              <small>{source.category}</small>
              <h3>{source.title}</h3>
              <p>{source.text}</p>
              <span>ABRIR FONTE ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="memory-closing-title">
        <p className="eyebrow">MEMÓRIA × FUTURO</p>
        <h2 id="memory-closing-title">IA pode reconstruir uma imagem.<span> A responsabilidade é reconstruir também o contexto.</span></h2>
        <p>É esse território que me interessa hoje: usar novas ferramentas para ampliar acesso, interpretação e encantamento sem apagar a diferença entre documento, restauração e hipótese visual.</p>
        <div className={styles.closingLinks}>
          <Link href="/projetos/amo-franca" prefetch={false}>Amo Franca</Link>
          <Link href="/inteligencia-artificial" prefetch={false}>IA & inovação</Link>
          <Link href="/imprensa" prefetch={false}>Evidências externas</Link>
          <Link href="/universo" prefetch={false}>Voltar ao Universo</Link>
        </div>
      </section>
    </main>
  );
}
