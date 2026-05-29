import Link from "next/link";
import { SiteNav } from "@/components/layout/site-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";
import { layout } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          layout.headerIsland,
          "pointer-events-auto flex h-14 items-center justify-between gap-4 px-4 sm:px-6",
        )}
      >
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-tight text-foreground sm:text-base"
        >
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <SiteNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
