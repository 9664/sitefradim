import recovery from "@/config/legacy-wxr-recovery-2026-07-29.json";

const audit = recovery.audit;

export const legacyRecoverySnapshot = {
  generatedAt: recovery.source.generatedAt,
  sourceSha256: recovery.source.sha256,
  postsUnderReview: recovery.acceptedPostIds.length,
  quarantinedPosts: audit.trashedPostsQuarantined,
  attachmentsIndexed: audit.attachmentsIndexed,
  scriptsRemoved: audit.injectedScriptTagsRemovedFromPublishedPosts,
  curatedPages: recovery.pages.filter((page) => page.action === "curate").length,
  rejectedPages: recovery.pages.filter((page) => page.action === "reject").length,
  automaticPublishing: recovery.policy.autoPublish,
} as const;
