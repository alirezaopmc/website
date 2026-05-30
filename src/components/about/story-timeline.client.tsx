"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type StoryBeatTrackerProps = {
  beatIndex: number;
  onActive: (index: number) => void;
  children: React.ReactNode;
};

function StoryBeatTracker({
  beatIndex,
  onActive,
  children,
}: StoryBeatTrackerProps) {
  const { ref, inView } = useInView({
    root: null,
    rootMargin: "-35% 0px -35% 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      onActive(beatIndex);
    }
  }, [beatIndex, inView, onActive]);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}

type StoryTimelineClientProps = {
  className?: string;
  children: React.ReactNode;
};

export function StoryTimelineClient({
  className,
  children,
}: StoryTimelineClientProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) {
      return;
    }

    const pathDots = Array.from(
      timeline.querySelectorAll<HTMLElement>("[data-path-dot]"),
    );

    for (const [index, dot] of pathDots.entries()) {
      dot.dataset.active = index === activeBeatIndex ? "true" : "false";
    }
  }, [activeBeatIndex]);

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={timelineRef} className={cn(className)}>
      {childArray.map((child, index) => (
        <StoryBeatTracker
          key={
            child && typeof child === "object" && "key" in child
              ? child.key
              : index
          }
          beatIndex={index}
          onActive={setActiveBeatIndex}
        >
          {child}
        </StoryBeatTracker>
      ))}
    </div>
  );
}
