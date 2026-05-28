import readingTime from "reading-time";

const FRONTMATTER_PATTERN = /^---[\s\S]*?---\s*/;
const FENCED_CODE_PATTERN = /```[\s\S]*?```/g;
const DISPLAY_MATH_PATTERN = /\$\$[\s\S]*?\$\$/g;
const INLINE_MATH_PATTERN = /\$[^$\n]+\$/g;
const MDX_COMPONENT_PATTERN =
  /<[A-Z][A-Za-z0-9]*[^>]*\/>|<[A-Z][A-Za-z0-9]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z0-9]*>/g;

export function stripForReadingTime(raw: string): string {
  return raw
    .replace(FRONTMATTER_PATTERN, "")
    .replace(FENCED_CODE_PATTERN, " ")
    .replace(DISPLAY_MATH_PATTERN, " ")
    .replace(INLINE_MATH_PATTERN, " ")
    .replace(MDX_COMPONENT_PATTERN, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function deriveReadingTime(raw: string, override?: number): number {
  if (override !== undefined) {
    return Math.max(1, Math.ceil(override));
  }

  const stripped = stripForReadingTime(raw);
  if (!stripped) return 1;

  const stats = readingTime(stripped);
  return Math.max(1, Math.ceil(stats.minutes));
}
