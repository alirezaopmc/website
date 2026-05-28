export type NormalizedTag = {
  label: string;
  slug: string;
};

export function slugifyTag(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeTags(tags: string[]): NormalizedTag[] {
  const seen = new Set<string>();
  const normalized: NormalizedTag[] = [];

  for (const tag of tags) {
    const label = tag.trim();
    if (!label) continue;

    const slug = slugifyTag(label);
    if (!slug || seen.has(slug)) continue;

    seen.add(slug);
    normalized.push({ label, slug });
  }

  return normalized;
}
