import Link from "next/link";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { UniverseExplorer } from "@/components/UniverseExplorer";

const territories = [
  ["Marcelo", "Trajetória, pensamento e autoridade.", "/sobre"],
  ["Spock", "A colaboração entre humano e inteligência artificial.", "/spock"],
  ["Lab", "Agentes, protótipos, experimentos e pesquisa.", "/lab"],
  ["Work", "Projetos reais, produtos e transformação de negócios.", "/projetos"],
  ["Ideias", "Ensaios, artigos, provocações e diálogos.", "/ideias"],
  ["Memória", "Cultura, fotografia histórica e preservação digital.", "/memoria"],
] as const;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Marcelo Fradim",
    url: "https://fradim.com.br",
    jobTitle: "Especialista em Inteligência Artificial e Inovação",
    knowsAbout: [
      "Inteligência Artificial",
      "Inovação",
      "Marketing",
      "Agentes de IA",
      "Automação",
      "Engenharia de Prompts",
      "Context Engineering",
      "Vibe Coding",
      "Transformação Digital",
      "IA Generativa",
    ],
    sameAs: [
      "https://www.linkedin.com/in/marcelofradim/",
      "https://www.instagram.com/marcelofradim/",
    ],
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <ImmersiveHero />

      <section className="thesis" aria-labelledby="thesis-title">
        <p className="eyebrow">UMA TESE</p>
        <h2 id="thesis-title">
          A próxima vantagem competitiva não será simplesmente usar IA.
          <span> Será aprender a redesenhar processos a partir dela.</span>
        </h2>
      </section>

      <UniverseExplorer />

      <section className="territories" aria-labelledby="territories-title">
        <header className="section-heading">
          <p className="eyebrow">EXPLORE SEM 3D</p>
          <h2 id="territories-title">O mesmo universo, por caminhos diretos.</h2>
        </header>

        <div className="territory-grid">
          {territories.map(([name, description, href], index) => (
            <Link className="territory-card" href={href} key={name}>
              <span className="territory-index">0{index + 1}</span>
              <h3>{name}</h3>
              <p>{description}</p>
              <span className="territory-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="duality" aria-label="Marcelo e Spock">
        <article>
          <span className="monogram">M</span>
          <p className="eyebrow">MARCELO</p>
          <h2>Contexto, experiência, intuição e visão.</h2>
        </article>
        <div className="duality-symbol" aria-hidden="true">×</div>
        <article>
          <span className="monogram">S</span>
          <p className="eyebrow">SPOCK</p>
          <h2>Análise, estrutura, pesquisa e amplificação.</h2>
        </article>
      </section>

      <section className="manifesto" aria-labelledby="manifesto-title">
        <p className="eyebrow">HUMANO + IA</p>
        <h2 id="manifesto-title">Não é sobre substituir o pensamento humano.</h2>
        <p>É sobre ampliar a capacidade de pensar, construir, testar e transformar.</p>
        <Link className="text-link" href="/spock">Descobrir quem é Spock →</Link>
      </section>
    </main>
  );
}
