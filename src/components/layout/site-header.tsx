import Link from "next/link";
import { SiteNav } from "@/components/layout/site-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";
import { chrome, layout, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className={chrome.headerShell}>
      <div className={cn(layout.headerIsland, chrome.headerInner)}>
        <Link href="/" className={typography.siteTitle}>
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
