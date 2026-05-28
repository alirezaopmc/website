import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogIndex } from "@/components/content/blog-index";
import { getVisibleBlogs } from "@/lib/blog/queries";
import { buildBlogIndexMetadata } from "@/lib/blog/seo";
import { layout, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata: Metadata = buildBlogIndexMetadata();

export default function BlogPage() {
  const posts = getVisibleBlogs();

  return (
    <div className={layout.page}>
      <main
        className={cn(layout.pageMain, layout.containerWide, layout.section)}
      >
        <header className="mb-10 flex flex-col gap-3">
          <h1 className={typography.heading1}>Blog</h1>
        </header>
        <Suspense fallback={<p className={typography.body}>Loading posts…</p>}>
          <BlogIndex posts={posts} />
        </Suspense>
      </main>
    </div>
  );
}
