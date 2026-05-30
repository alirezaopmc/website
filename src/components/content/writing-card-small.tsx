import Link from "next/link";
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
    <div className={cn("flex flex-col gap-1 py-3", className)}>
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(typography.titleLink, "line-clamp-2 hover:text-primary")}
      >
        {item.title}
      </Link>
      <time dateTime={item.date.toISOString()} className={typography.small}>
        {formatContentDate(item.date)}
      </time>
    </div>
  );
}
