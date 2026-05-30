import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  AnnouncementBarSlot,
  AnnouncementContentShell,
  AnnouncementProvider,
} from "@/components/layout/announcement-provider.client";
import { LayoutContentOffset } from "@/components/layout/layout-content-offset";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { getLatestBlog } from "@/lib/blog/queries";
import { chrome } from "@/lib/design-system";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const latest = getLatestBlog();
  const shell = (
    <>
      <div className={chrome.fixedShell}>
        <SiteHeader />
        {latest ? <AnnouncementBarSlot /> : null}
      </div>
      {latest ? (
        <AnnouncementContentShell>
          <SiteShell>{children}</SiteShell>
        </AnnouncementContentShell>
      ) : (
        <LayoutContentOffset hasAnnouncement={false}>
          <SiteShell>{children}</SiteShell>
        </LayoutContentOffset>
      )}
    </>
  );

  return (
    <html lang={siteConfig.locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TooltipProvider>
            {latest ? (
              <AnnouncementProvider
                announcement={{ slug: latest.slug, title: latest.title }}
              >
                {shell}
              </AnnouncementProvider>
            ) : (
              shell
            )}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
