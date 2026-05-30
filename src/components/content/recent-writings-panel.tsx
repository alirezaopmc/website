import Link from "next/link";
import { WritingCardSmall } from "@/components/content/writing-card-small";
import { Separator } from "@/components/ui/separator";
import type { WritingDocument } from "@/lib/blog/queries";
import { chrome, typography } from "@/lib/design-system";
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
    <section
      aria-label="Recent writing"
      className={cn("flex flex-col", className)}
    >
      <div className="flex items-baseline justify-between gap-2 pb-4">
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
        <ul className="flex flex-col">
          {items.map((item, index) => (
            <li key={item.slug}>
              {index > 0 ? (
                <Separator className={chrome.sidebarItemDivider} />
              ) : null}
              <WritingCardSmall item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
