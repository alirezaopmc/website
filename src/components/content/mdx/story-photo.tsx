import Image from "next/image";
import { story } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import type { StoryPhotoProps } from "@/types/about";

export function StoryPhoto({
  src,
  alt,
  width,
  height,
  caption,
}: StoryPhotoProps) {
  return (
    <figure className={cn(story.photoInline)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={story.photoImage}
        sizes="88px"
      />
      {caption ? (
        <figcaption className={story.photoCaption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
