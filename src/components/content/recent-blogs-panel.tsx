import Link from "next/link";
import { PostCardSmall } from "@/components/content/post-card-small";
import type { BlogDocument } from "@/lib/blog/queries";
import { typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type RecentBlogsPanelProps = {
  items: BlogDocument[];
  className?: string;
};

export function RecentBlogsPanel({ items, className }: RecentBlogsPanelProps) {
  return (
    <section
      aria-label="Recent blog posts"
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex items-baseline justify-between gap-2">
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
        <ul className="flex flex-col gap-2">
          {items.map((post) => (
            <li key={post.slug}>
              <PostCardSmall post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
