import { cn } from "@/lib/utils";

export const typography = {
  heading1: cn(
    "font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
  ),
  heading2: cn(
    "font-heading text-2xl font-semibold tracking-tight text-foreground",
  ),
  heading3: cn("font-heading text-xl font-medium text-foreground"),
  lead: cn("text-lg text-muted-foreground"),
  body: cn("text-base leading-7 text-foreground"),
  small: cn("text-sm text-muted-foreground"),
  micro: cn(
    "font-mono text-micro font-medium uppercase tracking-widest text-foreground",
  ),
  siteTitle: cn(
    "font-heading text-sm font-semibold tracking-tight text-foreground sm:text-base",
  ),
  navLabel: cn("text-sm font-medium"),
  label: cn("text-sm font-medium text-foreground"),
  titleLink: cn("text-sm font-medium text-foreground hover:text-primary"),
  prose: cn(
    "max-w-prose space-y-4 text-foreground",
    "[&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight",
    "[&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-medium",
    "[&_p]:leading-7 [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6",
    "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
  ),
} as const;
