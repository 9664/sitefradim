import Link from "next/link";
import { recoveredMemoryBatch2 } from "@/lib/recoveredMemoryBatch2";
import styles from "./MemoryArchiveIndex.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function RecoveredMemoryIndex() {
  return (
    <section className={styles.archive} aria-labelledby="recovered-memory-title" data-recovered-memory-index>
      <header className={styles.header}>
        <div>
          <p className="eyebrow">NOVOS DOCUMENTOS REINTEGRADOS</p>
          <h2 id="recovered-memory-title">A viagem no tempo começa a ganhar ruas, pessoas e horizontes.</h2>
        </div>
        <p>
          Este segundo lote foi reconstruído pelo encontro entre o texto legítimo do WordPress, a data editorial original, o anexo correspondente e o mestre preservado no backup privado.
        </p>
      </header>

      <div className={styles.grid}>
        {recoveredMemoryBatch2.map((entry) => (
          <Link
            className={styles.card}
            href={`/${entry.slug}`}
            prefetch={false}
            key={entry.slug}
            data-archive-card={entry.slug}
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
  );
}
