import Link from "next/link";
import { formatContentDate } from "@/lib/blog/format";
import type { BlogDocument } from "@/lib/blog/queries";
import { typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type PostCardSmallProps = {
  post: BlogDocument;
  className?: string;
};

export function PostCardSmall({ post, className }: PostCardSmallProps) {
  return (
    <div className={cn("flex flex-col gap-1 py-3", className)}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(typography.titleLink, "line-clamp-2 hover:text-primary")}
      >
        {post.title}
      </Link>
      <time dateTime={post.date.toISOString()} className={typography.small}>
        {formatContentDate(post.date)}
      </time>
    </div>
  );
}
