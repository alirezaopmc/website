import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TagList } from "@/components/content/tag-list";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatContentDate } from "@/lib/blog/format";
import { getBlogBySlug, getPublishedBlogSlugs } from "@/lib/blog/queries";
import { buildBlogPostMetadata } from "@/lib/blog/seo";
import { layout, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import useMDXComponents from "@/mdx-components";

export const dynamic = "force-static";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return buildBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});

  return (
    <article className={layout.centerContent}>
      <header className="mb-10 flex flex-col gap-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2">
          {post.draft ? <Badge variant="outline">Draft</Badge> : null}
          {post.featured ? <Badge>Featured</Badge> : null}
        </div>
        <h1 className={typography.heading1}>{post.title}</h1>
        <p className={typography.lead}>{post.summary}</p>
        <div className={cn(typography.small, "flex flex-wrap gap-x-3 gap-y-1")}>
          <time dateTime={post.date.toISOString()}>
            {formatContentDate(post.date)}
          </time>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
        <TagList tags={post.tagSlugs} />
      </header>

      <div className={cn(typography.prosePanel, "blog-prose")}>
        <MDXContent code={post.body} components={components} />
      </div>

      {/* Extension point: comments provider */}
      <footer className="mt-12 border-t border-border pt-8">
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          Back to blog
        </Link>
      </footer>
    </article>
  );
}
