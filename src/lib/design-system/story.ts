import { cn } from "@/lib/utils";
import { typography } from "./typography";

const beatGrid = cn(
  "grid w-full items-start gap-x-story-content-gap gap-y-4",
  "grid-cols-[var(--width-story-path-rail)_minmax(0,1fr)]",
);

export const story = {
  page: cn("flex w-full min-w-0 flex-col gap-story-beat-gap"),
  pageGrid: cn(beatGrid),
  timeline: cn("story-timeline-root relative flex flex-col gap-story-beat-gap"),
  beat: cn("story-beat relative", beatGrid),
  pathCell: cn(
    "story-path-cell col-start-1 flex justify-center pt-1",
    "story-reveal",
  ),
  pathDot: cn(
    "relative z-10 size-story-path-dot shrink-0 rounded-full border-2 border-border bg-background",
    "transition-colors duration-200",
    "data-[active=true]:border-primary data-[active=true]:bg-primary",
  ),
  pathYear: cn(typography.micro, "text-muted-foreground"),
  contentCell: cn("col-start-2 min-w-0 w-full", "story-reveal"),
  beatTitle: cn(typography.heading2),
  beatTitleGroup: cn("mb-4 flex min-w-0 flex-col gap-1"),
  proseBody: cn("story-prose-body w-full max-w-none"),
  prose: cn(
    typography.body,
    "leading-relaxed text-muted-foreground",
    "[&_p+p]:mt-4",
  ),
  photoInline: cn(
    "story-photo-inline story-reveal float-right clear-right",
    "ml-story-content-gap mb-3 mt-0.5 w-story-photo-inline shrink-0",
    "overflow-hidden rounded-md border border-border",
  ),
  photoImage: cn("h-auto w-full object-cover"),
  photoCaption: cn(
    typography.small,
    "px-1.5 py-1 text-center text-muted-foreground",
  ),
  intro: cn(
    "grid w-full items-start gap-x-story-content-gap",
    "grid-cols-[var(--width-story-path-rail)_minmax(0,1fr)]",
    "story-reveal",
  ),
  introContent: cn("col-start-2 flex max-w-prose flex-col gap-4"),
  footer: cn(
    "grid w-full gap-x-story-content-gap pt-story-beat-gap",
    "grid-cols-[var(--width-story-path-rail)_minmax(0,1fr)]",
  ),
  footerContent: cn("col-start-2 max-w-prose"),
} as const;
