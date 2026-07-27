import Link from "next/link";
import { legacyMemoryEntries } from "@/lib/legacyMemory";
import styles from "./MemoryArchiveIndex.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function statusLabel(slug: string, hasImage: boolean) {
  if (hasImage) return "MÍDIA REINTEGRADA";
  if (slug === "av-central-rio-de-janeiro-em-1910") return "PROVENIÊNCIA EM PESQUISA";
  if (slug === "copacabana-rio-de-janeiro-anos-40") return "MÍDIA NÃO REPUBLICADA";
  return "EM CURADORIA";
}

export function MemoryArchiveIndex() {
  return (
    <section className={styles.archive} aria-labelledby="memory-archive-title" data-memory-archive>
      <header className={styles.header}>
        <div>
          <p className="eyebrow">ARQUIVO EM PROCESSO</p>
          <h2 id="memory-archive-title">Preservar também é mostrar o estado de cada evidência.</h2>
        </div>
        <p>
          Este índice reúne páginas históricas migradas do Fradim.com.br anterior. Uma URL preservada não significa que toda mídia antiga deve ser republicada: cada item carrega seu próprio estado de curadoria, proveniência e uso.
        </p>
      </header>

      <div className={styles.grid}>
        {legacyMemoryEntries.map((entry) => {
          const mediaState = entry.image ? "published" : "unpublished";

          return (
            <Link
              className={styles.card}
              href={`/${entry.slug}`}
              prefetch={false}
              key={entry.slug}
              data-archive-card={entry.slug}
              data-media-state={mediaState}
            >
              <div className={styles.visual}>
                {entry.image ? (
                  <img
                    src={`${basePath}${entry.image.src}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    data-archive-media="published"
                  />
                ) : (
                  <div
                    className={styles.noImage}
                    aria-hidden="true"
                    data-archive-media="unpublished"
                  >
                    <span>{entry.year}</span>
                    <strong>ARQUIVO<br />SEM MÍDIA<br />PUBLICADA</strong>
                  </div>
                )}
                <span className={styles.status}>{statusLabel(entry.slug, Boolean(entry.image))}</span>
              </div>

              <div className={styles.copy}>
                <div className={styles.meta}>
                  <span>{entry.year}</span>
                  <span>{entry.location}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <small>ABRIR REGISTRO →</small>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
