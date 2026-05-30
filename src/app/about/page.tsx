import type { Metadata } from "next";
import { StoryTimeline } from "@/components/about/story-timeline";
import { getVisibleAboutBeats } from "@/lib/about/queries";
import { buildAboutMetadata } from "@/lib/about/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildAboutMetadata();

export default function AboutPage() {
  const beats = getVisibleAboutBeats();

  return <StoryTimeline beats={beats} />;
}
