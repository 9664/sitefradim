import Link from "next/link";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { MemoryRevival } from "@/components/MemoryRevival";
import { UniverseExplorer } from "@/components/UniverseExplorer";
import { TrajectoryJourney } from "@/components/TrajectoryJourney";

const territories = [
  ["Marcelo", "Trajetória, pensamento e autoridade.", "/sobre"],
  ["Spock", "A colaboração entre humano e inteligência artificial.", "/spock"],
  ["Arquivo", "Cronologia, textos, imagens, campanhas e evidências preservadas.", "/arquivo"],
  ["Lab", "Agentes, protótipos, experimentos e pesquisa.", "/lab"],
  ["Work", "Projetos reais, produtos e transformação de negócios.", "/projetos"],
  ["Ideias", "Ensaios, artigos, provocações e diálogos.", "/ideias"],
  ["Memória", "Cultura, fotografia histórica e preservação digital.", "/memoria"],
  ["Contato", "Projetos, imprensa, parcerias e conversas profissionais.", "/contato"],
] as const;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Marcelo Fradim",
    url: "https://fradim.com.br",
    email: "mailto:fradim@gmail.com",
    jobTitle: "Especialista em Inteligência Artificial e Inovação",
    homeLocation: {
      "@type": "Place",
      name: "Franca, São Paulo, Brasil",
    },
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
      "Memória Digital",
      "Restauração Fotográfica",
    ],
    sameAs: [
      "https://www.linkedin.com/in/marcelofradim/",
      "https://www.instagram.com/marcelofradim/",
      "https://www.behance.net/fradim",
      "https://corredorcultural.com.br/agentes/marcelo-fradim/",
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
        <p className="eyebrow">UMA CONVICÇÃO</p>
        <h2 id="thesis-title">
          O futuro não começa quando apagamos o que veio antes.
          <span> Ele começa quando memória, experiência e imaginação voltam a produzir possibilidades.</span>
        </h2>
      </section>

      <UniverseExplorer />

      <TrajectoryJourney />

      <MemoryRevival />

      <section className="territories" aria-labelledby="territories-title">
        <header className="section-heading">
          <p className="eyebrow">CONTINUE EXPLORANDO</p>
          <h2 id="territories-title">Cada território aprofunda uma camada dessa história.</h2>
        </header>

        <div className="territory-grid">
          {territories.map(([name, description, href], index) => (
            <Link className="territory-card" href={href} prefetch={false} key={name}>
              <span className="territory-index">{String(index + 1).padStart(2, "0")}</span>
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
        <p>É sobre ampliar a capacidade de lembrar, pensar, construir, testar e transformar.</p>
        <Link className="text-link" href="/spock" prefetch={false}>Descobrir quem é Spock →</Link>
      </section>
    </main>
  );
}
