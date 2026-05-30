import Image from "next/image";
import Link from "next/link";
import { StoryBeat } from "@/components/about/story-beat";
import { StoryTimelineClient } from "@/components/about/story-timeline.client";
import { aboutConfig } from "@/config/about";
import { siteConfig } from "@/config/site";
import { chrome, story, typography } from "@/lib/design-system";
import type { AboutBeat } from "@/types/about";

type StoryTimelineProps = {
  beats: AboutBeat[];
};

export function StoryTimeline({ beats }: StoryTimelineProps) {
  return (
    <div className={story.page}>
      <header className={story.intro}>
        <div aria-hidden />
        <div className={story.introContent}>
          <Image
            src={aboutConfig.profileImage.src}
            alt={aboutConfig.profileImage.alt}
            width={128}
            height={128}
            className={chrome.profileAvatarLg}
            priority
          />
          <div className="flex flex-col gap-2">
            <h1 className={typography.heading1}>{aboutConfig.page.title}</h1>
            <p className={typography.lead}>{aboutConfig.page.lead}</p>
          </div>
        </div>
      </header>

      <StoryTimelineClient className={story.timeline}>
        {beats.map((beat) => (
          <StoryBeat key={beat.slug} beat={beat} />
        ))}
      </StoryTimelineClient>

      <footer className={story.footer}>
        <div aria-hidden />
        <div className={story.footerContent}>
          <p className={typography.body}>
            You can also find me on{" "}
            <Link
              href={siteConfig.author.url}
              className="text-primary underline-offset-4 hover:underline"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
