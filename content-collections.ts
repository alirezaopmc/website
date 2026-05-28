import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import { deriveReadingTime } from "./src/lib/blog/derive";
import { rehypePlugins, remarkPlugins } from "./src/lib/blog/mdx-plugins";
import { normalizeTags } from "./src/lib/blog/tags";

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().optional(),
});

const blogFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().optional(),
  readingTimeMinutes: z.number().optional(),
  seo: seoSchema.optional(),
  content: z.string(),
});

const writingFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().optional(),
  publication: z.string().optional(),
  href: z.string().url(),
});

const blogs = defineCollection({
  name: "blogs",
  directory: "src/content/blog",
  include: "**/*.mdx",
  schema: blogFrontmatterSchema,
  transform: async (document, context) => {
    const slug = document._meta.path.replace(/\.mdx$/, "");
    const tagSlugs = normalizeTags(document.tags);
    const readingTimeMinutes = deriveReadingTime(
      document.content,
      document.readingTimeMinutes,
    );
    const body = await compileMDX(context, document, {
      remarkPlugins: [...remarkPlugins],
      rehypePlugins: [...rehypePlugins],
    });

    return {
      ...document,
      slug,
      tagSlugs,
      readingTimeMinutes,
      body,
    };
  },
});

const writings = defineCollection({
  name: "writings",
  directory: "src/content/writing",
  include: "**/*.md",
  parser: "frontmatter-only",
  schema: writingFrontmatterSchema,
  transform: (document) => {
    const slug = document._meta.path.replace(/\.md$/, "");
    const tagSlugs = normalizeTags(document.tags);

    return {
      ...document,
      slug,
      tagSlugs,
    };
  },
});

export default defineConfig({
  content: [blogs, writings],
});
