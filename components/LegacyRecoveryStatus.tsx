import { legacyRecoverySnapshot as snapshot } from "@/lib/legacyRecovery";
import styles from "./LegacyRecoveryStatus.module.css";

const metrics = [
  { value: snapshot.postsUnderReview, label: "POSTS AUTORAIS EM REVISÃO" },
  { value: snapshot.attachmentsIndexed, label: "ANEXOS INVENTARIADOS" },
  { value: snapshot.scriptsRemoved, label: "SCRIPTS INJETADOS REMOVIDOS" },
  { value: snapshot.quarantinedPosts, label: "POSTS DE SPAM EM QUARENTENA" },
] as const;

export function LegacyRecoveryStatus() {
  return (
    <section className={styles.section} aria-labelledby="legacy-recovery-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>RECUPERAÇÃO WORDPRESS / SNAPSHOT 29.07.2026</p>
            <h2 id="legacy-recovery-title">
              O acervo entrou no 2.0 como evidência.
              <span> Não como código herdado.</span>
            </h2>
          </div>
          <p className={styles.intro}>
            O arquivo WXR foi auditado e convertido em um manifesto sem HTML executável. Cada texto legítimo
            permanece em revisão editorial; anexos são apenas inventariados até que o arquivo físico, a origem e
            os direitos de uso sejam verificados.
          </p>
        </header>

        <div className={styles.metrics}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value.toLocaleString("pt-BR")}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>

        <div className={styles.protocol}>
          <p>
            <strong>NENHUMA PUBLICAÇÃO AUTOMÁTICA.</strong> As datas originais são recuperadas por metadados,
            scripts e elementos ativos são descartados, páginas suspeitas são rejeitadas e o conteúdo só retorna
            ao domínio depois de curadoria humana.
          </p>
          <code>SHA-256 {snapshot.sourceSha256.slice(0, 16)}…</code>
        </div>
      </div>
    </section>
  );
}
