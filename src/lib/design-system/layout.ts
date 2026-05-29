import { cn } from "@/lib/utils";

export const layout = {
  container: cn("mx-auto w-full max-w-content px-6"),
  containerWide: cn("mx-auto w-full max-w-content-wide px-6"),
  section: cn("py-section-y"),
  sectionLg: cn("py-section-y-lg"),
  page: cn("flex min-h-screen flex-col"),
  pageMain: cn("flex flex-1 flex-col"),
  headerOffset: cn("pt-header-offset"),
  headerIsland: cn(
    "w-full max-w-content-wide rounded-full border border-header-island-border",
    "bg-header-island-bg shadow-sm backdrop-blur-md backdrop-saturate-150",
  ),
} as const;
