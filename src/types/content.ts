export type ContentMeta = {
  title: string;
  slug: string;
  summary: string;
  date: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
};

export type Project = ContentMeta & {
  kind: "project";
  href?: string;
  repoUrl?: string;
  techStack?: string[];
};

export type BlogPost = ContentMeta & {
  kind: "blog";
  readingTimeMinutes?: number;
};

export type Writing = ContentMeta & {
  kind: "writing";
  publication?: string;
  href?: string;
};

export type ContentItem = Project | BlogPost | Writing;
