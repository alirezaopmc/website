# Agent Guide — Personal Portfolio

## Purpose

Next.js personal site for projects, blog posts, and technical writing. Blog and Writing sections are implemented; `/projects` and site shell (header/footer) are still planned.

## Stack

| Tool | Role |
|------|------|
| Next.js 16 (App Router, RSC) | Framework |
| React 19 | UI |
| Bun | Package manager & scripts |
| Tailwind CSS v4 | Styling (`@theme inline`, no `tailwind.config`) |
| shadcn/ui v4 (`base-nova`, Base UI) | Owned components in `src/components/ui/` |
| content-collections | Typed MDX/frontmatter pipeline |
| Biome | Lint & format |
| next-themes | Class-based dark mode (`.dark` on `<html>`) |

## Commands

```bash
bun dev          # dev server (drafts visible)
bun run build    # production build (drafts excluded)
bun run lint     # biome check
bun run format   # biome format --write
bunx shadcn@latest add <name> -y   # add UI primitive
```

## Directory map

```
content-collections.ts   # blog + writing collection config (root)
src/
  app/                     # routes (/, /blog, /writing)
  content/
    blog/                  # *.mdx posts
    writing/               # *.md frontmatter-only entries
  components/
    ui/                    # shadcn primitives
    content/               # PostCard, TagList, blog MDX components
    providers/             # ThemeProvider
    layout/                # future Header, Footer, Shell
  config/
    site.ts                # site metadata SSoT
    navigation.ts          # nav items + enabled flags
  lib/
    blog/                  # queries, derive, seo, tags, mdx-plugins
    design-system/         # typography, layout, chrome recipes
  mdx-components.tsx       # global MDX component map
  styles/
    tokens.css             # design tokens
    blog.css               # blog prose/code/katex styles
  types/
    content.ts             # Project, BlogPost, Writing types
docs/
  design-system.md
  blog.md                  # authoring reference
```

Generated types import: `import { allBlogs } from "content-collections"` — prefer `src/lib/blog/queries.ts` in app code.

## Hard rules

1. **Design system (mandatory)** — Never hardcode colors, sizes, or spacing in feature components. Flow: `tokens.css` → `globals.css` @theme → `@/lib/design-system` (`layout`, `chrome`, `typography`) → components. If a recipe is missing, add the token and recipe first. See [docs/design-system.md](docs/design-system.md).
2. **Colors & spacing** — Semantic tokens only. Change `src/styles/tokens.css` first.
3. **Typography** — Use `@/lib/design-system` (`typography.prose` for blog body).
4. **Layout** — Use `layout.container`, `layout.section`, `chrome.*` for site shell and landing page.
5. **UI primitives** — shadcn in `components/ui/`; blog embeds in `components/content/mdx/`.
6. **Navigation** — Only link `enabled: true` routes in `navigation.ts`.
7. **Content** — Blog MDX in `src/content/blog/`; writing metadata in `src/content/writing/`.
8. **Drafts** — Filter via `src/lib/blog/queries.ts`; never bypass draft rules in routes.
9. **MDX components** — Register in `src/mdx-components.tsx`; document in `docs/blog.md`.
10. **Client components** — `"use client"` only when needed (`BlogIndex` uses search params).
11. **No scope creep** — No RSS, search, comments, CMS unless explicitly requested.

## Blog pipeline

- **Collections:** `content-collections.ts` — Zod schemas, MDX compile (Shiki + KaTeX), reading time, tag normalization
- **Queries:** `getVisibleBlogs()`, `getBlogBySlug()`, `getVisibleWritings()`
- **SEO:** `src/lib/blog/seo.ts` + optional `seo` frontmatter block
- **Rendering:** Full SSG (`force-static`); draft slugs excluded from `generateStaticParams`

## Theme

- `ThemeProvider`: `attribute="class"`, `defaultTheme="system"`
- KaTeX CSS scoped to `/blog` layout only

## shadcn config

- [`components.json`](components.json): `base-nova`, `zinc`, CSS variables, Tailwind v4
- Installed: `button`, `card`, `badge`, `separator`, `skeleton`, `tooltip`

## Intentionally not built

- `/projects` route
- Header/footer/nav shell
- RSS feed, search, comments
- Tag index pages (`/blog/tag/[tag]`)
- CMS / contentlayer
- Tests

## Related docs

- [docs/blog.md](docs/blog.md) — authoring, frontmatter, MDX components
- [docs/design-system.md](docs/design-system.md) — tokens, typography, layout
- [.cursor/rules/design-system.mdc](.cursor/rules/design-system.mdc) — Cursor rules for `src/`

Respond terse like smart caveman. All technical substance stay. Only fluff die.

Rules:
- Drop: articles (a/an/the), filler (just/really/basically), pleasantries, hedging
- Fragments OK. Short synonyms. Technical terms exact. Code unchanged.
- Pattern: [thing] [action] [reason]. [next step].
- Not: "Sure! I'd be happy to help you with that."
- Yes: "Bug in auth middleware. Fix:"

Switch level: /caveman lite|full|ultra|wenyan
Stop: "stop caveman" or "normal mode"

Auto-Clarity: drop caveman for security warnings, irreversible actions, user confused. Resume after.

Boundaries: code/commits/PRs written normal.
