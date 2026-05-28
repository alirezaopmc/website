# Blog & Writing Reference

Authoring guide for on-site blog posts (MDX) and external writing entries (frontmatter-only).

## Architecture

| Layer | Location |
|-------|----------|
| Content files | `src/content/blog/*.mdx`, `src/content/writing/*.md` |
| Collection config | `content-collections.ts` (root) |
| Generated data | `content-collections` import alias → `.content-collections/generated` |
| Blog utilities | `src/lib/blog/` |
| MDX components | `src/components/content/mdx/` |
| MDX component map | `src/mdx-components.tsx` |
| Routes | `src/app/blog/`, `src/app/writing/` |

**Build flow:** MDX/frontmatter → Zod validation → transform (compile MDX, derive reading time, normalize tags) → static routes.

## Blog posts (MDX)

### File location and slug

- Path: `src/content/blog/<slug>.mdx`
- URL: `/blog/<slug>`
- Slug = filename without `.mdx`

### Frontmatter schema

```yaml
---
title: string          # required
summary: string        # required — used in cards, SEO, future RSS
date: 2026-05-01       # required — ISO date
tags:                  # optional — default []
  - Next.js
  - Web Dev
draft: false           # optional — default false
featured: false        # optional
readingTimeMinutes: 5  # optional — manual override
seo:                   # optional
  title: string
  description: string
  ogImage: /path-or-url
  noIndex: false
---
```

### Draft behavior

| Environment | List pages | Post route |
|-------------|------------|------------|
| Development | Drafts shown with badge | Accessible |
| Production | Drafts hidden | `notFound()` |

Drafts are excluded from `generateStaticParams` in production builds.

### Tags

- Author free-form labels in frontmatter (`Web Dev`, `nextjs`)
- Pipeline normalizes to `{ label, slug }` via `src/lib/blog/tags.ts`
- Index supports filter: `/blog?tag=web-dev`
- Tag index routes (`/blog/tag/[tag]`) are deferred

### Reading time

Computed at build time in `src/lib/blog/derive.ts`:

1. Strip frontmatter, fenced code, math, MDX component tags
2. Run `reading-time` on remainder
3. Use `readingTimeMinutes` frontmatter override when set (visual-heavy posts)

### Code blocks

Fenced blocks use **Shiki** via `rehype-pretty-code` (github-light / github-dark themes). Styled in `src/styles/blog.css`.

### Math

Use `$...$` (inline) and `$$...$$` (display) with `remark-math` + `rehype-katex`. KaTeX CSS loaded in `src/app/blog/layout.tsx`.

### Custom MDX components

Register in `src/mdx-components.tsx`. Starter components:

| Component | Usage |
|-----------|--------|
| `Callout` | `<Callout title="Note" variant="info">...</Callout>` |
| `ProjectShowcase` | `<ProjectShowcase slug="demo" title="..." href="..." tags={["React"]} />` |

**Rules:**

- Place blog-only components in `src/components/content/mdx/`
- Server-first; use `"use client"` only for interactivity
- Optional `searchText` prop reserved for future search indexing

**Add a component:**

1. Create `src/components/content/mdx/my-component.tsx`
2. Export from `src/mdx-components.tsx`
3. Document usage in this file

## Writing entries (external)

### File location

- Path: `src/content/writing/<slug>.md`
- Frontmatter only (parser: `frontmatter-only`)
- Listed at `/writing`; links open externally

### Frontmatter schema

```yaml
---
title: string
summary: string
date: 2025-11-15
tags: []
draft: false
featured: false
publication: Example Journal  # optional
href: https://example.com/article  # required — valid URL
---
```

## SEO

Blog posts use `generateMetadata` via `src/lib/blog/seo.ts`:

- Title: `seo.title ?? title`
- Description: `seo.description ?? summary`
- OG image: `seo.ogImage ?? siteConfig.defaultOgImage`
- `robots: noindex` when `draft` or `seo.noIndex`

JSON-LD and per-post OG image generation are deferred.

## Queries (app code)

Import generated collections only through `src/lib/blog/queries.ts`:

```ts
import { getVisibleBlogs, getBlogBySlug, getVisibleWritings } from "@/lib/blog/queries";
```

Do not import `content-collections` directly in UI components.

## Commands

```bash
bun dev          # drafts visible
bun run build    # drafts excluded from static output
bun run lint     # Biome check
```

## Deferred features (hooks in place)

| Feature | Hook |
|---------|------|
| RSS | `summary`, `date`, `slug` on published posts |
| Search | `stripForReadingTime()` in derive.ts; `searchText` on MDX components |
| Comments | Footer slot in `src/app/blog/[slug]/page.tsx` |
| Tag pages | Normalized `tagSlugs` on every post |

## Related docs

- [AGENTS.md](../AGENTS.md) — agent rules and stack
- [design-system.md](./design-system.md) — typography and layout tokens
