import type { ReactNode } from "react";
import { RecentWritingsPanel } from "@/components/content/recent-writings-panel";
import { WeblogLayout } from "@/components/layout/weblog-layout";
import { getRecentWritings } from "@/lib/blog/queries";
import { layout } from "@/lib/design-system";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const recentWritings = getRecentWritings(5);

  return (
    <main className={layout.pageMain}>
      <WeblogLayout
        left={<aside aria-label="Sidebar left" />}
        center={children}
        right={<RecentWritingsPanel items={recentWritings} />}
      />
    </main>
  );
}
