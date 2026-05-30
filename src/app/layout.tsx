import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LatestBlogBar } from "@/components/layout/latest-blog-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { getVisibleAnnouncement } from "@/lib/blog/announcement.server";
import { chrome, layout } from "@/lib/design-system";
import { cn } from "@/lib/utils";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcement = await getVisibleAnnouncement();

  return (
    <html lang={siteConfig.locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TooltipProvider>
            <div className={chrome.fixedShell}>
              <SiteHeader />
              <LatestBlogBar announcement={announcement} />
            </div>
            <div
              className={cn(
                announcement
                  ? layout.headerOffsetWithAnnouncement
                  : layout.headerOffset,
                "min-h-screen",
              )}
            >
              {children}
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
