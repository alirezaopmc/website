import type { PathBarItem } from "@/components/content/path-bar";

const blogSectionLabel = "Blog";

export function blogIndexPath(): PathBarItem[] {
  return [{ label: blogSectionLabel }];
}

export function blogPostPath(title: string): PathBarItem[] {
  return [{ label: blogSectionLabel, href: "/blog" }, { label: title }];
}
