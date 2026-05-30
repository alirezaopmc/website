import type { PathBarItem } from "@/components/content/path-bar";

const blogSectionLabel = "Blog";
const aboutSectionLabel = "About Me";
const writingSectionLabel = "Writing";

export function aboutPath(): PathBarItem[] {
  return [{ label: aboutSectionLabel }];
}

export function writingPath(): PathBarItem[] {
  return [{ label: writingSectionLabel }];
}

export function blogIndexPath(): PathBarItem[] {
  return [{ label: blogSectionLabel }];
}

export function blogPostPath(title: string): PathBarItem[] {
  return [{ label: blogSectionLabel, href: "/blog" }, { label: title }];
}

export function resolvePathBarItems(
  pathname: string,
  blogTitlesBySlug: Record<string, string>,
): PathBarItem[] {
  if (pathname === "/about") {
    return aboutPath();
  }

  if (pathname === "/writing") {
    return writingPath();
  }

  if (pathname === "/blog") {
    return blogIndexPath();
  }

  const postMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (postMatch) {
    const slug = postMatch[1];
    const title = blogTitlesBySlug[slug];
    if (title) {
      return blogPostPath(title);
    }
  }

  return [];
}
