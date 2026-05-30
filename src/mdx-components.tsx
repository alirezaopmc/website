import type { MDXContentProps } from "mdx-bundler/client/index.js";
import { Callout } from "@/components/content/mdx/callout";
import { ProjectShowcase } from "@/components/content/mdx/project-showcase";
import { StoryPhoto } from "@/components/content/mdx/story-photo";

export function useMDXComponents(
  components: NonNullable<MDXContentProps["components"]>,
): NonNullable<MDXContentProps["components"]> {
  return {
    ...components,
    Callout,
    ProjectShowcase,
    StoryPhoto,
  };
}

export default useMDXComponents;
