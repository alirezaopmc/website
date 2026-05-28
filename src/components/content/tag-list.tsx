import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NormalizedTag } from "@/types/content";

type TagListProps = {
  tags: NormalizedTag[];
  activeTag?: string | null;
  className?: string;
};

export function TagList({ tags, activeTag, className }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => {
        const isActive = activeTag === tag.slug;

        return (
          <Link key={tag.slug} href={`/blog?tag=${tag.slug}`}>
            <Badge variant={isActive ? "default" : "secondary"}>
              {tag.label}
            </Badge>
          </Link>
        );
      })}
    </div>
  );
}
