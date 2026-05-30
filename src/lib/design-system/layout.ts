import { cn } from "@/lib/utils";

const surfaceIsland = cn(
  "border border-header-island-border bg-header-island-bg shadow-sm",
  "backdrop-blur-md backdrop-saturate-150",
);

export const layout = {
  container: cn("mx-auto w-full max-w-content px-6"),
  containerWide: cn("mx-auto w-full max-w-content-wide px-6"),
  containerLanding: cn("mx-auto w-full max-w-content-landing px-4 sm:px-6"),
  section: cn("py-section-y"),
  sectionLg: cn("py-section-y-lg"),
  page: cn("flex min-h-screen flex-col"),
  pageMain: cn("flex flex-1 flex-col"),
  centerContent: cn("w-full"),
  centerContentProse: cn("w-full max-w-prose"),
  headerOffset: cn("pt-header-offset"),
  headerOffsetWithAnnouncement: cn("pt-header-offset-with-announcement"),
  surfaceIsland,
  headerIsland: cn(surfaceIsland, "w-full max-w-content-wide rounded-full"),
  bodyIsland: cn(surfaceIsland, "w-full min-h-body-island rounded-body-island"),
} as const;
