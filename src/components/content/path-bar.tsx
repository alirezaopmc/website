import Link from "next/link";
import { chrome } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type PathBarItem = {
  label: string;
  href?: string;
};

type PathBarProps = {
  items: PathBarItem[];
  className?: string;
};

export function PathBar({ items, className }: PathBarProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn(chrome.pathBar, className)}>
      <ol className={chrome.pathBarList}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const key = item.href ?? item.label;

          return (
            <li key={key} className="flex min-w-0 items-center gap-2">
              {index > 0 ? (
                <span className={chrome.pathBarSeparator} aria-hidden>
                  &gt;
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className={chrome.pathBarLink}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={chrome.pathBarCurrent}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
