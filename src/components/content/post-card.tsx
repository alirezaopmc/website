import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatContentDate } from "@/lib/blog/format";
import type { BlogDocument } from "@/lib/blog/queries";
import { typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { TagList } from "./tag-list";

type PostCardProps = {
  post: BlogDocument;
  className?: string;
};

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className={typography.heading3}>
            <Link href={`/blog/${post.slug}`} className="hover:text-primary">
              {post.title}
            </Link>
          </CardTitle>
          {post.draft ? <Badge variant="outline">Draft</Badge> : null}
          {post.featured ? <Badge>Featured</Badge> : null}
        </div>
        <CardAction>
          <time
            dateTime={post.date.toISOString()}
            className={cn(typography.small, "text-muted-foreground")}
          >
            {formatContentDate(post.date)}
          </time>
        </CardAction>
        <CardDescription className={typography.lead}>
          {post.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className={typography.small}>{post.readingTimeMinutes} min read</p>
        <TagList tags={post.tagSlugs} />
      </CardContent>
    </Card>
  );
}
