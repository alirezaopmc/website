import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatContentDate } from "@/lib/blog/format";
import type { WritingDocument } from "@/lib/blog/queries";
import { typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { TagList } from "./tag-list";

type WritingCardProps = {
  item: WritingDocument;
  className?: string;
};

export function WritingCard({ item, className }: WritingCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className={typography.heading3}>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {item.title}
            </Link>
          </CardTitle>
          {item.draft ? <Badge variant="outline">Draft</Badge> : null}
        </div>
        <CardDescription className={typography.lead}>
          {item.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className={cn(typography.small, "flex flex-wrap gap-x-3 gap-y-1")}>
          <time dateTime={item.date.toISOString()}>
            {formatContentDate(item.date)}
          </time>
          {item.publication ? <span>{item.publication}</span> : null}
          <span>External link</span>
        </div>
        <TagList tags={item.tagSlugs} />
      </CardContent>
    </Card>
  );
}
