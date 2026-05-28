export const siteConfig = {
  name: "Jay Tash",
  description:
    "Personal website showcasing projects, blog posts, and technical writing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: {
    name: "Jay Tash",
    url: "https://github.com/yourusername",
  },
  locale: "en",
  defaultOgImage: "/og-default.png",
} as const;

export type SiteConfig = typeof siteConfig;
