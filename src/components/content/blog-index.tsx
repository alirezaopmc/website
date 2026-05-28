"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/content/post-card";
import { TagList } from "@/components/content/tag-list";
import { buttonVariants } from "@/components/ui/button";
import { type BlogDocument, filterBlogsByTag } from "@/lib/blog/queries";
import { typography } from "@/lib/design-system";

type BlogIndexProps = {
  posts: BlogDocument[];
};

function collectTags(posts: BlogDocument[]) {
  const tags = new Map<string, BlogDocument["tagSlugs"][number]>();

  for (const post of posts) {
    for (const tag of post.tagSlugs) {
      tags.set(tag.slug, tag);
    }
  }

  return [...tags.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");
  const filteredPosts = filterBlogsByTag(posts, activeTag);
  const allTags = collectTags(posts);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className={typography.lead}>
          Notes on software, systems, and things I am building.
        </p>
        {allTags.length > 0 ? (
          <TagList tags={allTags} activeTag={activeTag} />
        ) : null}
        {activeTag ? (
          <Link
            href="/blog"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Clear tag filter
          </Link>
        ) : null}
      </div>

      {filteredPosts.length === 0 ? (
        <p className={typography.body}>No posts match this tag.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
