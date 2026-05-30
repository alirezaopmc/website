import { RecentBlogsPanel } from "@/components/content/recent-blogs-panel";
import { RecentWritingsPanel } from "@/components/content/recent-writings-panel";
import { Separator } from "@/components/ui/separator";
import type { BlogDocument, WritingDocument } from "@/lib/blog/queries";
import { chrome } from "@/lib/design-system";
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
      className={cn("flex flex-col gap-6", className)}
    >
      <RecentBlogsPanel items={blogs} />
      <Separator className={chrome.sidebarSectionDivider} />
      <RecentWritingsPanel items={writings} />
    </aside>
  );
}
