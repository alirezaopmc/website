import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className={cn("shadow-none", className)}>
      <CardContent className="flex flex-col gap-1.5 p-3">
        <Link
          href={`/blog/${post.slug}`}
          className={cn(
            typography.titleLink,
            "line-clamp-1 hover:text-primary",
          )}
        >
          {post.title}
        </Link>
        <p className={cn(typography.small, "line-clamp-1")}>{post.summary}</p>
        <div
          className={cn(typography.small, "flex flex-wrap gap-x-2 gap-y-0.5")}
        >
          <time dateTime={post.date.toISOString()}>
            {formatContentDate(post.date)}
          </time>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
      </CardContent>
    </Card>
  );
}
