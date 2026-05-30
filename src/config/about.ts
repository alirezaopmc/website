import { siteConfig } from "@/config/site";

export const aboutConfig = {
  profileImage: {
    src: "/images/about/profile.jpg",
    alt: `Portrait of ${siteConfig.name}`,
  },
  headline: "Building software and writing about it.",
  shortBio:
    "I write about engineering, systems, and the craft of building useful things. This site collects my blog posts, external writing, and projects.",
  page: {
    title: "About Me",
    lead: "A bit about who I am and what I do.",
    paragraphs: [
      `I'm ${siteConfig.name}, a software engineer focused on building reliable systems and sharing what I learn along the way.`,
      "This site is my home on the web — a place for blog posts, selected external writing, and eventually projects as they take shape.",
      "When I'm not writing code, I'm usually reading, experimenting with new tools, or refining how I think about software design.",
    ],
  },
} as const;

export type AboutConfig = typeof aboutConfig;
