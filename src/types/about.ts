export type StoryPhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type AboutBeat = {
  slug: string;
  order: number;
  title: string;
  year?: string;
  summary?: string;
  draft: boolean;
  body: string;
};
