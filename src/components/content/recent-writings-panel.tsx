import Link from "next/link";
import { WritingCardSmall } from "@/components/content/writing-card-small";
import type { WritingDocument } from "@/lib/blog/queries";
import { typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type RecentWritingsPanelProps = {
  items: WritingDocument[];
  className?: string;
};

export function RecentWritingsPanel({
  items,
  className,
}: RecentWritingsPanelProps) {
  return (
    <aside
      aria-label="Recent writing"
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h2 className={typography.heading3}>Writing</h2>
        <Link
          href="/writing"
          className={cn(typography.small, "shrink-0 hover:text-primary")}
        >
          View all
        </Link>
      </div>

      {items.length === 0 ? (
        <p className={typography.small}>No writing entries yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.slug}>
              <WritingCardSmall item={item} />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
