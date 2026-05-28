import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { BlogDocument, WritingDocument } from "@/lib/blog/queries";

function resolveOgImage(path: string | undefined) {
  if (!path) return siteConfig.defaultOgImage;
  if (path.startsWith("http")) return path;
  return path;
}

export function buildBlogIndexMetadata(): Metadata {
  return {
    title: "Blog",
    description: `Articles and notes by ${siteConfig.name}.`,
    openGraph: {
      type: "website",
      title: `Blog | ${siteConfig.name}`,
      description: `Articles and notes by ${siteConfig.name}.`,
    },
  };
}

export function buildBlogPostMetadata(post: BlogDocument): Metadata {
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.summary;
  const ogImage = resolveOgImage(post.seo?.ogImage);
  const noIndex = post.draft || post.seo?.noIndex;

  return {
    title: post.seo?.title ? { absolute: post.seo.title } : title,
    description,
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.date.toISOString(),
      authors: [siteConfig.author.name],
      tags: post.tagSlugs.map((tag) => tag.label),
      images: [ogImage],
    },
  };
}

export function buildWritingIndexMetadata(): Metadata {
  return {
    title: "Writing",
    description: `External publications and writing by ${siteConfig.name}.`,
    openGraph: {
      type: "website",
      title: `Writing | ${siteConfig.name}`,
      description: `External publications and writing by ${siteConfig.name}.`,
    },
  };
}

export function buildWritingItemMetadata(item: WritingDocument): Metadata {
  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      type: "article",
      title: item.title,
      description: item.summary,
      publishedTime: item.date.toISOString(),
    },
  };
}
