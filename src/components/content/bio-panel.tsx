import Image from "next/image";
import Link from "next/link";
import { aboutConfig } from "@/config/about";
import { siteConfig } from "@/config/site";
import { chrome, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type BioPanelProps = {
  className?: string;
};

export function BioPanel({ className }: BioPanelProps) {
  return (
    <section
      aria-label="Bio"
      className={cn("flex flex-col items-center gap-4 text-center", className)}
    >
      <Image
        src={aboutConfig.profileImage.src}
        alt={aboutConfig.profileImage.alt}
        width={96}
        height={96}
        className={chrome.profileAvatar}
        priority
      />

      <div className="flex flex-col gap-2">
        <h2 className={typography.heading3}>{siteConfig.name}</h2>
        <p className={typography.small}>{aboutConfig.headline}</p>
        <p className={typography.small}>{aboutConfig.shortBio}</p>
      </div>

      <Link
        href="/about"
        className={cn(typography.small, "hover:text-primary")}
      >
        About me
      </Link>
    </section>
  );
}
