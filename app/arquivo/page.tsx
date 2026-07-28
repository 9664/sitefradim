import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import styles from "./ArchivePage.module.css";

export const metadata: Metadata = {
  title: "Arquivo Fradim — Cronologia, memória e obra",
  description:
    "Arquivo cronológico de Marcelo Fradim: restauração fotográfica, Amo Franca, textos, campanhas, projetos, experimentos e registros preservados do Fradim.com.br.",
  alternates: { canonical: "/arquivo" },
};

type ArchiveKind = "MEMÓRIA" | "TEXTO" | "PROJETO" | "EXPERIMENTO" | "MARCO";

type ArchiveItem = {
  date: string;
  year: string;
  kind: ArchiveKind;
  title: string;
  description: string;
  href: string;
  status?: string;
};

const timeline: ArchiveItem[] = [
  {
    date: "DESDE 2013",
    year: "2013",
    kind: "MEMÓRIA",
    title: "Restauração fotográfica como método de pesquisa",
    description:
      "A restauração deixa de ser apenas tratamento de imagem e passa a combinar leitura visual, pesquisa iconográfica, contexto histórico e reconstrução responsável.",
    href: "/restauracao-fotografica",
  },
  {
    date: "DESDE 2014",
    year: "2014",
    kind: "PROJETO",
    title: "Amo Franca",
    description:
      "Comunidade, comunicação e memória local passam a funcionar como um projeto contínuo de identidade, documentação e pertencimento.",
    href: "/projetos/amo-franca",
  },
  {
    date: "08 JAN 2015",
    year: "2015",
    kind: "MEMÓRIA",
    title: "Locomotiva em 1925",
    description:
      "Registro da Estação Mogiana de Franca restaurado e colorizado. A revisão original do WordPress preserva a data real de publicação anterior ao comprometimento do site.",
    href: "/locomotiva-em-1925",
    status: "MÍDIA REINTEGRADA",
  },
  {
    date: "08 JAN 2015",
    year: "2015",
    kind: "MEMÓRIA",
    title: "Primeira loja do Magazine Luiza em 1957",
    description:
      "Colorização de um registro ligado ao início do Magazine Luiza em Franca. O arquivo original foi recuperado, validado e reintegrado ao novo acervo.",
    href: "/primeira-loja-do-magazine-luiza-em-1957",
    status: "MÍDIA REINTEGRADA",
  },
  {
    date: "17 MAI 2015",
    year: "2015",
    kind: "TEXTO",
    title: "A diferença entre vida simples, minimalismo e frugalidade",
    description:
      "Reflexão de uma fase anterior do site sobre simplicidade, consumo, intenção e a escolha consciente do que merece permanecer.",
    href: "/a-diferenca-entre-vida-simples-minimalismo-e-frugalidade",
  },
  {
    date: "17 MAI 2015",
    year: "2015",
    kind: "TEXTO",
    title: "Somos simples náufragos",
    description:
      "Ensaio pessoal sobre escolhas, autonomia e a experiência de construir o caminho enquanto ele ainda está sendo atravessado.",
    href: "/somos-simples-naufragos",
  },
  {
    date: "18 MAI 2015",
    year: "2015",
    kind: "TEXTO",
    title: "Porque o tempo não para, nos tornamos velhos?",
    description:
      "Uma pergunta sobre tempo, envelhecimento e identidade preservada hoje como registro de pensamento, sem transformar referências antigas em autoridade definitiva.",
    href: "/porque-o-tempo-nao-para-nos-tornamos-velhos",
  },
  {
    date: "25 JUL 2016",
    year: "2016",
    kind: "TEXTO",
    title: "Nada acontece por acaso",
    description:
      "Texto sobre coincidência, interpretação, aprendizado e a forma como acontecimentos ganham sentido quando decisões posteriores conectam os pontos.",
    href: "/nada-acontece-por-acaso",
  },
  {
    date: "2020",
    year: "2020",
    kind: "MARCO",
    title: "A memória ganha escala de acervo",
    description:
      "Reportagens daquele ano registram mais de mil fotografias antigas restauradas e a incorporação ao Amo Franca do acervo remanescente do Diário da Franca, com dezenas de milhares de imagens catalogadas.",
    href: "/memoria",
  },
  {
    date: "22 ABR 2020",
    year: "2020",
    kind: "MEMÓRIA",
    title: "Copacabana — Rio de Janeiro, anos 40",
    description:
      "A página histórica é preservada como registro editorial. A imagem do WordPress legado não foi republicada porque a revisão identificou marca de terceiro no arquivo.",
    href: "/copacabana-rio-de-janeiro-anos-40",
    status: "URL PRESERVADA · ASSET REJEITADO",
  },
  {
    date: "2024",
    year: "2024",
    kind: "MARCO",
    title: "Franca 200 anos — Pinacoteca Municipal",
    description:
      "Fotografias históricas restauradas integram uma exposição pública, levando o trabalho de preservação para além do arquivo digital.",
    href: "/memoria",
  },
  {
    date: "2025",
    year: "2025",
    kind: "EXPERIMENTO",
    title: "Reconstrução de Manoel Valim",
    description:
      "Pesquisa e reconstrução visual a partir de vestígios frágeis consolidam uma regra que seguirá no trabalho com IA: hipótese visual precisa continuar identificada como hipótese.",
    href: "/memoria",
  },
  {
    date: "2026",
    year: "2026",
    kind: "EXPERIMENTO",
    title: "Fradim.com.br 2.0",
    description:
      "O próprio site passa a funcionar como experimento público de identidade digital humano + IA, combinando narrativa, WebGL, acessibilidade, preservação, SEO e arquitetura preparada para sistemas de IA.",
    href: "/lab",
    status: "EM EVOLUÇÃO",
  },
];

const collections = [
  {
    label: "MEMÓRIA",
    title: "Arquivo de imagens e restaurações",
    description: "Fotografias históricas, contexto, proveniência, intervenções e o estado de curadoria de cada registro.",
    href: "/memoria",
  },
  {
    label: "AUTORAL",
    title: "Textos que sobreviveram ao WordPress",
    description: "Ideias antigas preservadas em versões editoriais condensadas, separando reflexão autoral de ruído, formatação e conteúdo de terceiros.",
    href: "/ideias",
  },
  {
    label: "VISUAL",
    title: "Campanhas e trabalhos de outras fases",
    description: "Peças de design, publicidade e comunicação entram novamente somente depois de autoria, uso e valor documental serem verificados.",
    href: "/campanhas",
  },
  {
    label: "SISTEMAS",
    title: "Projetos e produtos",
    description: "Amo Franca, Intelig.Cloud, Gestor 360 e outras iniciativas que transformaram repertório em sistemas, comunidades e produtos.",
    href: "/projetos",
  },
  {
    label: "LAB",
    title: "Experimentos em andamento",
    description: "Protótipos, agentes, interfaces e hipóteses que ainda estão em construção, mas já fazem parte da trajetória documentada.",
    href: "/lab",
  },
] as const;

const yearGroups = timeline.reduce<Record<string, ArchiveItem[]>>((groups, item) => {
  groups[item.year] ??= [];
  groups[item.year].push(item);
  return groups;
}, {});

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Arquivo Fradim — Marcelo Fradim",
  url: "https://fradim.com.br/arquivo",
  description:
    "Cronologia curada de textos, memória, restauração fotográfica, projetos e experimentos de Marcelo Fradim.",
  author: { "@type": "Person", name: "Marcelo Fradim", url: "https://fradim.com.br" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: timeline.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `https://fradim.com.br${item.href}`,
    })),
  },
};

export default function ArchivePage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteNav />

      <section className={styles.hero} aria-labelledby="archive-title">
        <p className="eyebrow">ARQUIVO FRADIM / TRAJETÓRIA DOCUMENTADA</p>
        <h1 id="archive-title">O passado não volta como nostalgia.<span> Volta como evidência.</span></h1>
        <p className={styles.intro}>
          Este é o índice mestre do que merece permanecer: textos, fotografias, campanhas, projetos, experimentos e marcos que ajudam a compreender como o repertório foi sendo construído. O arquivo legado é fonte, não destino. Tudo aqui passa por curadoria antes de voltar ao público.
        </p>
        <div className={styles.heroMeta}>
          <span>WORDPRESS LEGADO → CURADORIA → CONTEXTO → NOVO ARQUIVO</span>
          <strong>{timeline.length} MARCOS JÁ DOCUMENTADOS</strong>
        </div>
      </section>

      <section className={styles.collections} aria-labelledby="collections-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">CAMADAS DO ACERVO</p>
            <h2 id="collections-title">Uma entrada única.<br />Vários tipos de memória.</h2>
          </div>
          <p>O Arquivo Fradim não substitui as páginas especializadas. Ele conecta tudo e dá ordem temporal ao conjunto.</p>
        </header>
        <div className={styles.collectionGrid}>
          {collections.map((collection, index) => (
            <Link href={collection.href} prefetch={false} className={styles.collectionCard} key={collection.title}>
              <span className={styles.collectionIndex}>{String(index + 1).padStart(2, "0")}</span>
              <small>{collection.label}</small>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <span className={styles.open}>EXPLORAR →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.timeline} aria-labelledby="timeline-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className="eyebrow">CRONOLOGIA CURADA</p>
            <h2 id="timeline-title">Quando a produção aconteceu,<br />não quando o hack diz que aconteceu.</h2>
          </div>
          <p>
            O ataque ao WordPress alterou timestamps de posts antigos para 2026. A cronologia abaixo usa revisões, anexos e evidências preservadas para recuperar as datas anteriores sempre que elas são verificáveis.
          </p>
        </header>

        <div className={styles.yearList}>
          {Object.entries(yearGroups).map(([year, items]) => (
            <section className={styles.yearBlock} key={year} aria-labelledby={`year-${year}`}>
              <div className={styles.yearRail}>
                <span id={`year-${year}`}>{year}</span>
                <i aria-hidden="true" />
              </div>
              <div className={styles.entries}>
                {items.map((item) => (
                  <Link href={item.href} prefetch={false} className={styles.entry} key={`${item.date}-${item.title}`}>
                    <div className={styles.entryMeta}>
                      <span>{item.date}</span>
                      <small>{item.kind}</small>
                    </div>
                    <div className={styles.entryCopy}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      {item.status ? <strong>{item.status}</strong> : null}
                    </div>
                    <span className={styles.entryArrow} aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.protocol} aria-labelledby="protocol-title">
        <div>
          <p className="eyebrow">REGRA DO ARQUIVO</p>
          <h2 id="protocol-title">Preservar não é publicar tudo.</h2>
        </div>
        <div className={styles.protocolGrid}>
          <article><span>01</span><h3>Identificar</h3><p>Separar conteúdo legítimo de spam, injeções e alterações produzidas pelo comprometimento do WordPress.</p></article>
          <article><span>02</span><h3>Verificar</h3><p>Conferir data, autoria, origem, direitos de uso, contexto e integridade dos arquivos antes de qualquer republicação.</p></article>
          <article><span>03</span><h3>Reinterpretar</h3><p>Trazer o que tem valor de trajetória para a arquitetura atual, sem reproduzir cegamente a estrutura ou os erros do site antigo.</p></article>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="archive-closing-title">
        <p className="eyebrow">ARQUIVO ABERTO</p>
        <h2 id="archive-closing-title">Este arquivo nunca estará “pronto”.<span> Ele ficará mais preciso.</span></h2>
        <p>
          Novos itens só entram quando houver informação suficiente para dizer o que são, de quando são, por que importam e em que condições podem voltar ao público. O objetivo não é quantidade. É construir uma memória digital confiável da trajetória.
        </p>
        <div className={styles.links}>
          <Link href="/memoria" prefetch={false}>Explorar Memória</Link>
          <Link href="/campanhas" prefetch={false}>Ver Campanhas</Link>
          <Link href="/ideias" prefetch={false}>Ler Ideias</Link>
          <Link href="/projetos" prefetch={false}>Ver Projetos</Link>
        </div>
      </section>
    </main>
  );
}
