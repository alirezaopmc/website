import { cn } from "@/lib/utils";

export const layout = {
  container: cn("mx-auto w-full max-w-content px-6"),
  containerWide: cn("mx-auto w-full max-w-content-wide px-6"),
  section: cn("py-section-y"),
  sectionLg: cn("py-section-y-lg"),
  page: cn("flex min-h-screen flex-col"),
  pageMain: cn("flex flex-1 flex-col"),
} as const;
