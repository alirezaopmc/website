import { RecentWritingsPanel } from "@/components/content/recent-writings-panel";
import { WeblogLayout } from "@/components/layout/weblog-layout";
import { getRecentWritings } from "@/lib/blog/queries";
import { layout } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

export default function Home() {
  const recentWritings = getRecentWritings(5);

  return (
    <div className={layout.page}>
      <main className={cn(layout.pageMain)}>
        <WeblogLayout
          left={<aside aria-label="Sidebar left" />}
          center={<section aria-label="Main content" />}
          right={<RecentWritingsPanel items={recentWritings} />}
        />
      </main>
    </div>
  );
}
