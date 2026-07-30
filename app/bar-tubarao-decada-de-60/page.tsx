import type { Metadata } from "next";
import { RecoveredMemoryPage } from "@/components/RecoveredMemoryPage";
import { getRecoveredMemoryBatch4Entry } from "@/lib/recoveredMemoryBatch4";

const entry = getRecoveredMemoryBatch4Entry("bar-tubarao-decada-de-60")!;

export const metadata: Metadata = {
  title: `${entry.title} — Arquivo de Memória`,
  description: entry.summary,
  alternates: { canonical: `/${entry.slug}` },
  openGraph: {
    type: "article",
    title: entry.title,
    description: entry.summary,
    url: `https://fradim.com.br/${entry.slug}`,
    images: [{ url: `https://fradim.com.br${entry.image.src}`, alt: entry.image.alt }],
  },
};

export default function RecoveredArchivePage() {
  return <RecoveredMemoryPage entry={entry} />;
}
