import type { Metadata } from "next";
import { RecoveredMemoryPage } from "@/components/RecoveredMemoryPage";
import { getRecoveredMemoryEntry } from "@/lib/recoveredMemoryBatch2";

const entry = getRecoveredMemoryEntry("vista-aerea-de-franca-em-1950")!;

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

export default function VistaAerea1950Page() {
  return <RecoveredMemoryPage entry={entry} />;
}
