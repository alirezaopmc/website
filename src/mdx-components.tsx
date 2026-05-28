import type { MDXContentProps } from "mdx-bundler/client/index.js";
import { Callout } from "@/components/content/mdx/callout";
import { ProjectShowcase } from "@/components/content/mdx/project-showcase";

export function useMDXComponents(
  components: NonNullable<MDXContentProps["components"]>,
): NonNullable<MDXContentProps["components"]> {
  return {
    ...components,
    Callout,
    ProjectShowcase,
  };
}

export default useMDXComponents;
