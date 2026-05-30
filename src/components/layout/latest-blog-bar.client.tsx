"use client";

import { Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { dismissAnnouncement } from "@/lib/blog/announcement.actions";
import { chrome, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type LatestBlogBarClientProps = {
  slug: string;
  title: string;
};

export function LatestBlogBarClient({ slug, title }: LatestBlogBarClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDismiss() {
    startTransition(async () => {
      await dismissAnnouncement(slug);
      router.refresh();
    });
  }

  return (
    <section className={chrome.announcementBar} aria-label="Latest blog post">
      <div className={chrome.announcementBarInner}>
        <div className="flex shrink-0 items-center gap-2">
          <Sparkles
            className={cn(chrome.iconSm, "animate-pulse text-primary")}
            aria-hidden
          />
          <span className={chrome.announcementBadge}>Fresh</span>
        </div>

        <Link
          href={`/blog/${slug}`}
          className={cn(
            typography.small,
            "min-w-0 flex-1 truncate text-foreground transition-colors hover:text-primary",
          )}
        >
          {title}
        </Link>

        <button
          type="button"
          onClick={handleDismiss}
          disabled={isPending}
          className={chrome.announcementDismiss}
          aria-label="Dismiss announcement"
        >
          <X className={chrome.iconSm} />
        </button>
      </div>
    </section>
  );
}
