import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatContentDate } from "@/lib/blog/format";
import type { WritingDocument } from "@/lib/blog/queries";
import { typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type WritingCardSmallProps = {
  item: WritingDocument;
  className?: string;
};

export function WritingCardSmall({ item, className }: WritingCardSmallProps) {
  return (
    <Card className={cn("shadow-none", className)}>
      <CardContent className="flex flex-col gap-1.5 p-3">
        <Link
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            typography.titleLink,
            "line-clamp-1 hover:text-primary",
          )}
        >
          {item.title}
        </Link>
        <p className={cn(typography.small, "line-clamp-1")}>{item.summary}</p>
        <div
          className={cn(typography.small, "flex flex-wrap gap-x-2 gap-y-0.5")}
        >
          <time dateTime={item.date.toISOString()}>
            {formatContentDate(item.date)}
          </time>
          {item.publication ? <span>{item.publication}</span> : null}
        </div>
      </CardContent>
    </Card>
  );
}
