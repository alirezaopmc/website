import { MDXContent } from "@content-collections/mdx/react";
import { story } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import useMDXComponents from "@/mdx-components";
import type { AboutBeat } from "@/types/about";

type StoryBeatProps = {
  beat: AboutBeat;
};

export function StoryBeat({ beat }: StoryBeatProps) {
  const components = useMDXComponents({});
  const titleId = `beat-title-${beat.slug}`;

  return (
    <section
      id={`beat-${beat.slug}`}
      data-story-beat
      aria-labelledby={titleId}
      className={story.beat}
    >
      <div className={story.pathCell}>
        <div className={story.pathDot} data-path-dot data-active="false" />
      </div>

      <div className={story.contentCell}>
        <header className={story.beatTitleGroup}>
          {beat.year ? (
            <span className={story.pathYear}>{beat.year}</span>
          ) : null}
          <h2 id={titleId} className={story.beatTitle}>
            {beat.title}
          </h2>
        </header>

        <div className={cn(story.proseBody, "story-prose-body")}>
          <MDXContent
            code={beat.body}
            components={{
              ...components,
              p: ({ className, ...props }) => (
                <p {...props} className={cn(story.prose, className)} />
              ),
            }}
          />
        </div>
      </div>
    </section>
  );
}
