import { LatestBlogBarClient } from "@/components/layout/latest-blog-bar.client";
import { getVisibleAnnouncement } from "@/lib/blog/announcement.server";

type LatestBlogBarProps = {
  announcement?: Awaited<ReturnType<typeof getVisibleAnnouncement>>;
};

export async function LatestBlogBar({ announcement }: LatestBlogBarProps = {}) {
  const visible = announcement ?? (await getVisibleAnnouncement());
  if (!visible) return null;

  return <LatestBlogBarClient slug={visible.slug} title={visible.title} />;
}
