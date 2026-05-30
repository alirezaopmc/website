import type { Metadata } from "next";
import Image from "next/image";
import { aboutConfig } from "@/config/about";
import { siteConfig } from "@/config/site";
import { buildAboutMetadata } from "@/lib/about/seo";
import { chrome, layout, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata: Metadata = buildAboutMetadata();

export default function AboutPage() {
  return (
    <div className={layout.centerContentProse}>
      <Image
        src={aboutConfig.profileImage.src}
        alt={aboutConfig.profileImage.alt}
        width={160}
        height={160}
        className={cn(chrome.profileAvatarLg, "mb-8")}
        priority
      />
      <div className={typography.prose}>
        {aboutConfig.page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          You can also find me on{" "}
          <a href={siteConfig.author.url} rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}
