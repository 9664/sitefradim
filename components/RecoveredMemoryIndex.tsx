import Link from "next/link";
import { recoveredMemoryBatch2 } from "@/lib/recoveredMemoryBatch2";
import { recoveredMemoryBatch3 } from "@/lib/recoveredMemoryBatch3";
import { recoveredMemoryBatch4 } from "@/lib/recoveredMemoryBatch4";
import styles from "./MemoryArchiveIndex.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const batches = [
  {
    label: "LOTE 2 / PESSOAS, TRILHOS E HORIZONTES",
    title: "A viagem no tempo começa a ganhar pessoas, movimento e escala urbana.",
    text: "Textos legítimos, datas editoriais, anexos e mestres privados foram recombinados sem importar o WordPress ou seus códigos.",
    entries: recoveredMemoryBatch2,
  },
  {
    label: "LOTE 3 / RUAS, COMÉRCIO E MOBILIDADE",
    title: "A cidade entra na modernidade pelas fachadas, pelo trabalho e pelos veículos.",
    text: "Este lote acompanha a transformação do centro entre 1908 e os anos 1950: da rua de terra ao varejo de bairro e à frota de táxis.",
    entries: recoveredMemoryBatch3,
  },
  {
    label: "LOTE 4 / A CIDADE VISTA DE CIMA, POR DENTRO E EM CONVIVÊNCIA",
    title: "A memória urbana ganha panorama, interior e presença humana.",
    text: "Três comparativos atravessam a praça central, o comércio por dentro e a sociabilidade de um bar entre 1924 e os anos 1960.",
    entries: recoveredMemoryBatch4,
  },
] as const;

export function RecoveredMemoryIndex() {
  return (
    <div data-recovered-memory-index>
      {batches.map((batch, batchIndex) => (
        <section className={styles.archive} aria-labelledby={`recovered-memory-title-${batchIndex}`} key={batch.label}>
          <header className={styles.header}>
            <div>
              <p className="eyebrow">{batch.label}</p>
              <h2 id={`recovered-memory-title-${batchIndex}`}>{batch.title}</h2>
            </div>
            <p>{batch.text}</p>
          </header>

          <div className={styles.grid}>
            {batch.entries.map((entry) => (
              <Link
                className={styles.card}
                href={`/${entry.slug}`}
                prefetch={false}
                key={entry.slug}
                data-archive-card={entry.slug}
                data-recovered-batch={batchIndex + 2}
                data-media-state="published"
              >
                <div className={styles.visual}>
                  <img
                    src={`${basePath}${entry.image.src}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    data-archive-media="published"
                  />
                  <span className={styles.status}>MÍDIA REINTEGRADA</span>
                </div>
                <div className={styles.copy}>
                  <div className={styles.meta}>
                    <span>{entry.year}</span>
                    <span>{entry.location}</span>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  <small>ATRAVESSAR O TEMPO →</small>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
