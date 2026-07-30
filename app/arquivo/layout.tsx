import type { ReactNode } from "react";
import { LegacyRecoveryStatus } from "@/components/LegacyRecoveryStatus";

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <LegacyRecoveryStatus />
    </>
  );
}
