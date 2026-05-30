import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogIndex } from "@/components/content/blog-index";
import { getVisibleBlogs } from "@/lib/blog/queries";
import { buildBlogIndexMetadata } from "@/lib/blog/seo";
import { typography } from "@/lib/design-system";

export const dynamic = "force-static";

export const metadata: Metadata = buildBlogIndexMetadata();

export default function BlogPage() {
  const posts = getVisibleBlogs();

  return (
    <Suspense fallback={<p className={typography.body}>Loading posts…</p>}>
      <BlogIndex posts={posts} />
    </Suspense>
  );
}
