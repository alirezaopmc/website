import { allBlogs, allWritings } from "content-collections";

const includeDrafts = process.env.NODE_ENV === "development";

function isVisible(item: { draft: boolean }) {
  return includeDrafts || !item.draft;
}

export function getVisibleBlogs() {
  return allBlogs
    .filter(isVisible)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getBlogBySlug(slug: string) {
  const post = allBlogs.find((item) => item.slug === slug);
  if (!post || !isVisible(post)) return undefined;
  return post;
}

export function getPublishedBlogSlugs() {
  return allBlogs.filter((item) => !item.draft).map((item) => item.slug);
}

export function filterBlogsByTag(
  posts: ReturnType<typeof getVisibleBlogs>,
  tagSlug: string | null | undefined,
) {
  if (!tagSlug) return posts;
  return posts.filter((post) =>
    post.tagSlugs.some((tag) => tag.slug === tagSlug),
  );
}

export function getAllBlogTagSlugs() {
  const slugs = new Set<string>();
  for (const post of getVisibleBlogs()) {
    for (const tag of post.tagSlugs) {
      slugs.add(tag.slug);
    }
  }
  return [...slugs].sort();
}

export function getVisibleWritings() {
  return allWritings
    .filter(isVisible)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export type BlogDocument = ReturnType<typeof getVisibleBlogs>[number];
export type WritingDocument = ReturnType<typeof getVisibleWritings>[number];
