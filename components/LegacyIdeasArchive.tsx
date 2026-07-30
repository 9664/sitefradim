import Link from "next/link";
import { legacyIdeaEntries } from "@/lib/legacyIdeas";
import styles from "./LegacyIdeasArchive.module.css";

export function LegacyIdeasArchive() {
  return (
    <section className={styles.archive} aria-labelledby="legacy-ideas-title" data-legacy-ideas-archive>
      <header className={styles.header}>
        <div>
          <p className="eyebrow">ARQUIVO AUTORAL</p>
          <h2 id="legacy-ideas-title">Antes da IA, outras perguntas já estavam em movimento.</h2>
        </div>
        <p>
          Textos de uma fase anterior do Fradim.com.br preservados como registros condensados. O endereço antigo continua existindo, mas o conteúdo foi reconstruído editorialmente para separar a ideia autoral de formatação, citações e ruídos do WordPress legado.
        </p>
      </header>

      <div className={styles.list}>
        {legacyIdeaEntries.map((entry, index) => (
          <Link
            href={`/${entry.slug}`}
            prefetch={false}
            className={styles.card}
            key={entry.slug}
            data-legacy-idea-card={entry.slug}
          >
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.copy}>
              <span className={styles.theme}>{entry.theme}</span>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
            </div>
            <span className={styles.action}>ABRIR ARQUIVO →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
