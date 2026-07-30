"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./MemoryRevival.module.css";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const memories = [
  {
    index: "01",
    year: "1925",
    place: "ESTAÇÃO MOGIANA · FRANCA",
    title: "A cidade chega pelos trilhos.",
    body: "A ferrovia reorganizou distâncias, comércio e cotidiano. O registro recuperado preserva lado a lado a fotografia histórica e a interpretação restaurada e colorizada, deixando explícito onde termina o documento e onde começa a intervenção.",
    image: "/memoria/arquivo/estacao-mogiana-1925.jpg",
    alt: "Estação Mogiana de Franca em 1925, em comparativo entre fotografia histórica e versão restaurada e colorizada por Marcelo Fradim.",
    href: "/locomotiva-em-1925",
    action: "Abrir o registro ferroviário",
    labels: ["FOTOGRAFIA HISTÓRICA", "RESTAURAÇÃO", "COLORIZAÇÃO"],
  },
  {
    index: "02",
    year: "1957",
    place: "A CRISTALEIRA · FRANCA",
    title: "Uma pequena fachada, uma história enorme.",
    body: "Antes de se tornar uma das maiores empresas do varejo brasileiro, o Magazine Luiza começou em uma pequena loja de Franca. A imagem recuperada aproxima o visitante daquele instante sem fingir que a cor pertence ao documento original.",
    image: "/memoria/arquivo/magazine-luiza-1957.jpg",
    alt: "Fachada da primeira loja do Magazine Luiza em Franca, em fotografia histórica colorizada por Marcelo Fradim.",
    href: "/primeira-loja-do-magazine-luiza-em-1957",
    action: "Conhecer a história da primeira loja",
    labels: ["FRANCA", "MEMÓRIA EMPRESARIAL", "INTERVENÇÃO DIGITAL"],
  },
  {
    index: "03",
    year: "2014—AGORA",
    place: "AMO FRANCA · ARQUIVO VIVO",
    title: "A cidade deixa de ser cenário e vira pertencimento.",
    body: "O Amo Franca reuniu pesquisa, iconografia, comunicação e tecnologia para devolver contexto a imagens, lugares e pessoas. A memória deixa de ser algo imóvel: passa a circular, provocar conversas e reconstruir vínculos entre a cidade e quem vive nela.",
    href: "/projetos/amo-franca",
    action: "Entrar no universo Amo Franca",
    labels: ["DESDE 2014", "COMUNIDADE", "CULTURA DIGITAL"],
  },
] as const;

export function MemoryRevival() {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setRevealedIndex(memories.length - 1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const next = Number((visible.target as HTMLElement).dataset.memoryIndex ?? 0);
        setActiveIndex(next);
        setRevealedIndex((current) => Math.max(current, next));
      },
      {
        rootMargin: "-18% 0px -24%",
        threshold: [0.32, 0.5, 0.68],
      },
    );

    for (const card of cardRefs.current) {
      if (card) observer.observe(card);
    }

    return () => observer.disconnect();
  }, []);

  const jumpTo = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="memoria-viva"
      className={styles.section}
      data-stage={activeIndex}
      aria-labelledby="memory-revival-title"
    >
      <div className={styles.ambient} aria-hidden="true" />

      <header className={styles.intro}>
        <p className="eyebrow">MEMÓRIA VIVA / A COR RETORNA</p>
        <h2 id="memory-revival-title">
          O passado não aparece pronto.
          <span> Ele recupera presença à medida que nos aproximamos.</span>
        </h2>
        <p>
          Cada registro atravessa pesquisa, restauração, contexto e responsabilidade. Aqui, a cor não tenta reescrever a história: ela funciona como uma ponte sensível para que o visitante perceba que aquelas ruas, fachadas e pessoas já foram presente.
        </p>
      </header>

      <nav className={styles.progress} aria-label="Capítulos da memória viva">
        {memories.map((memory, index) => (
          <button
            key={memory.year}
            type="button"
            onClick={() => jumpTo(index)}
            aria-current={activeIndex === index ? "step" : undefined}
            className={activeIndex === index ? styles.progressActive : undefined}
          >
            <span>{memory.index}</span>
            <i />
            <strong>{memory.year}</strong>
          </button>
        ))}
      </nav>

      <div className={styles.track}>
        {memories.map((memory, index) => {
          const active = activeIndex === index;
          const revealed = index <= revealedIndex;

          return (
            <article
              key={memory.year}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-memory-index={index}
              className={`${styles.memory} ${active ? styles.memoryActive : ""} ${revealed ? styles.memoryRevealed : ""}`}
            >
              <div className={styles.media}>
                {"image" in memory ? (
                  <figure>
                    <img
                      src={`${publicBasePath}${memory.image}`}
                      alt={memory.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>
                      <span>{memory.year}</span>
                      <p>Registro histórico com intervenção visual identificada e proveniência documentada.</p>
                    </figcaption>
                  </figure>
                ) : (
                  <div className={styles.livingVisual} aria-hidden="true">
                    <div className={styles.cityPulse} />
                    <span>AF</span>
                    <small>FRANCA COMO ARQUIVO VIVO</small>
                  </div>
                )}
              </div>

              <div className={styles.copy}>
                <div className={styles.meta}>
                  <span>{memory.index}</span>
                  <p>{memory.place}</p>
                  <strong>{memory.year}</strong>
                </div>
                <h3>{memory.title}</h3>
                <p>{memory.body}</p>
                <div className={styles.labels} aria-label="Temas deste registro">
                  {memory.labels.map((label) => <span key={label}>{label}</span>)}
                </div>
                <Link href={memory.href} prefetch={false}>{memory.action} →</Link>
              </div>
            </article>
          );
        })}
      </div>

      <footer className={styles.closing}>
        <p className="eyebrow">DA MEMÓRIA AO FUTURO</p>
        <h2>A tecnologia ganha sentido quando não apaga o que veio antes.</h2>
        <p>
          Ela pode organizar o acervo, revelar detalhes, devolver circulação às histórias e criar novas maneiras de uma comunidade reconhecer a si mesma.
        </p>
        <div>
          <Link href="/memoria" prefetch={false}>Explorar o Arquivo de Memória</Link>
          <Link href="/restauracao-fotografica" prefetch={false}>Conhecer o processo de restauração</Link>
        </div>
      </footer>
    </section>
  );
}
