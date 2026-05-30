import type { ReactNode } from "react";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { WeblogLayout } from "@/components/layout/weblog-layout";
import {
  getRecentBlogs,
  getRecentWritings,
  getVisibleBlogs,
} from "@/lib/blog/queries";
import { layout } from "@/lib/design-system";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const recentBlogs = getRecentBlogs(5);
  const recentWritings = getRecentWritings(5);
  const blogTitlesBySlug = Object.fromEntries(
    getVisibleBlogs().map((post) => [post.slug, post.title]),
  );

  return (
    <main className={layout.pageMain}>
      <WeblogLayout
        blogTitlesBySlug={blogTitlesBySlug}
        left={<aside aria-label="Sidebar left" />}
        center={children}
        right={<RightSidebar blogs={recentBlogs} writings={recentWritings} />}
      />
    </main>
  );
}
