import type { Metadata } from "next";
import { aboutConfig } from "@/config/about";
import { siteConfig } from "@/config/site";
import { getFirstAboutBeatSummary } from "@/lib/about/queries";

export function buildAboutMetadata(): Metadata {
  const description = getFirstAboutBeatSummary() ?? aboutConfig.shortBio;

  return {
    title: aboutConfig.page.title,
    description,
    openGraph: {
      type: "profile",
      title: `${aboutConfig.page.title} | ${siteConfig.name}`,
      description,
      images: [aboutConfig.profileImage.src],
    },
  };
}
