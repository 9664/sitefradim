import type { Metadata } from "next";
import { RecoveredMemoryPage } from "@/components/RecoveredMemoryPage";
import { getRecoveredMemoryBatch3Entry } from "@/lib/recoveredMemoryBatch3";

const entry = getRecoveredMemoryBatch3Entry("taxis-na-praca-barao-decada-de-1950")!;

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

export default function TaxisPracaBaraoPage() {
  return <RecoveredMemoryPage entry={entry} />;
}
