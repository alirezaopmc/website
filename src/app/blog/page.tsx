import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogIndex } from "@/components/content/blog-index";
import { PathBar } from "@/components/content/path-bar";
import { getVisibleBlogs } from "@/lib/blog/queries";
import { buildBlogIndexMetadata } from "@/lib/blog/seo";
import { typography } from "@/lib/design-system";
import { blogIndexPath } from "@/lib/navigation/path-bar";

export const dynamic = "force-static";

export const metadata: Metadata = buildBlogIndexMetadata();

export default function BlogPage() {
  const posts = getVisibleBlogs();

  return (
    <>
      <PathBar items={blogIndexPath()} />
      <header className="mb-10 flex flex-col gap-3">
        <h1 className={typography.heading1}>Blog</h1>
      </header>
      <Suspense fallback={<p className={typography.body}>Loading posts…</p>}>
        <BlogIndex posts={posts} />
      </Suspense>
    </>
  );
}
