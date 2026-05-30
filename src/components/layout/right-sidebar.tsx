import { RecentBlogsPanel } from "@/components/content/recent-blogs-panel";
import { RecentWritingsPanel } from "@/components/content/recent-writings-panel";
import type { BlogDocument, WritingDocument } from "@/lib/blog/queries";
import { cn } from "@/lib/utils";

type RightSidebarProps = {
  blogs: BlogDocument[];
  writings: WritingDocument[];
  className?: string;
};

export function RightSidebar({
  blogs,
  writings,
  className,
}: RightSidebarProps) {
  return (
    <aside
      aria-label="Sidebar right"
      className={cn("flex flex-col gap-8", className)}
    >
      <RecentBlogsPanel items={blogs} />
      <RecentWritingsPanel items={writings} />
    </aside>
  );
}
