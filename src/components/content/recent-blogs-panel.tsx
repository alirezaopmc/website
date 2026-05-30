import Link from "next/link";
import { PostCardSmall } from "@/components/content/post-card-small";
import { Separator } from "@/components/ui/separator";
import type { BlogDocument } from "@/lib/blog/queries";
import { chrome, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type RecentBlogsPanelProps = {
  items: BlogDocument[];
  className?: string;
};

export function RecentBlogsPanel({ items, className }: RecentBlogsPanelProps) {
  return (
    <section
      aria-label="Recent blog posts"
      className={cn("flex flex-col", className)}
    >
      <div className="flex items-baseline justify-between gap-2 pb-4">
        <h2 className={typography.heading3}>Blog</h2>
        <Link
          href="/blog"
          className={cn(typography.small, "shrink-0 hover:text-primary")}
        >
          View all
        </Link>
      </div>

      {items.length === 0 ? (
        <p className={typography.small}>No blog posts yet.</p>
      ) : (
        <ul className="flex flex-col">
          {items.map((post, index) => (
            <li key={post.slug}>
              {index > 0 ? (
                <Separator className={chrome.sidebarItemDivider} />
              ) : null}
              <PostCardSmall post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
