# Agent Guide — Personal Portfolio

## Purpose

Next.js personal site for projects, blog posts, and technical writing. **Foundation only** — routes beyond `/` are planned but not implemented.

## Stack

| Tool | Role |
|------|------|
| Next.js 16 (App Router, RSC) | Framework |
| React 19 | UI |
| Bun | Package manager & scripts |
| Tailwind CSS v4 | Styling (`@theme inline`, no `tailwind.config`) |
| shadcn/ui v4 (`base-nova`, Radix/Base UI) | Owned components in `src/components/ui/` |
| Biome | Lint & format |
| next-themes | Class-based dark mode (`.dark` on `<html>`) |

## Commands

```bash
bun dev          # dev server
bun run build    # production build
bun run lint     # biome check
bun run format   # biome format --write
bunx shadcn@latest add <name> -y   # add UI primitive
```

## Directory map

```
src/
  app/                 # routes (layout, globals.css, pages)
  components/
    ui/                # shadcn primitives — edit in place, do not duplicate
    providers/         # ThemeProvider, etc.
    layout/            # future Header, Footer, Shell
  config/
    site.ts            # site metadata SSoT
    navigation.ts      # nav items + enabled flags
  lib/
    utils.ts           # cn()
    design-system/     # typography & layout class recipes
  styles/
    tokens.css         # CSS variables SSoT (colors, layout widths)
  types/
    content.ts         # Project, BlogPost, Writing types
docs/
  design-system.md     # token & styling reference
```

## Hard rules

1. **Colors & spacing** — Use semantic tokens (`bg-background`, `text-muted-foreground`, `max-w-content`). Never hardcode hex/oklch in components. Change `src/styles/tokens.css` first.
2. **Typography** — Import from `@/lib/design-system` (`typography.heading1`, `typography.prose`). Do not invent one-off text styles.
3. **Layout** — Use `layout.container`, `layout.section` from design-system. Widths come from CSS vars in tokens.
4. **UI primitives** — Extend shadcn in `components/ui/` or compose wrappers in `components/layout/` / `components/content/`. Do not npm-install parallel button/card libs.
5. **Navigation** — Read `src/config/navigation.ts`. Only link `enabled: true` routes until pages exist.
6. **Content types** — Use `src/types/content.ts` for project/blog/writing data shapes.
7. **Client components** — Add `"use client"` only when using hooks, events, or browser APIs. shadcn client components already include it.
8. **No scope creep** — Do not add MDX, CMS, auth, or full page sections unless explicitly requested.

## Theme

- `ThemeProvider` in root layout: `attribute="class"`, `defaultTheme="system"`.
- Tokens: `src/styles/tokens.css` → imported by `src/app/globals.css`.
- Toggle theme later via a control that calls `useTheme()` from `next-themes`.

## shadcn config

- [`components.json`](components.json): style `base-nova`, baseColor `zinc`, CSS variables on, Tailwind v4 (empty config path).
- Installed: `button`, `card`, `badge`, `separator`, `skeleton`, `tooltip`.
- Root layout wraps `TooltipProvider`.

## Intentionally not built

- `/projects`, `/blog`, `/writing` routes
- Header/footer/nav shell
- MDX / contentlayer / CMS
- OG image asset (`siteConfig.defaultOgImage` placeholder path)
- Tests

## Related docs

- [docs/design-system.md](docs/design-system.md) — tokens, typography, layout recipes
- [.cursor/rules/design-system.mdc](.cursor/rules/design-system.mdc) — Cursor auto-rules for `src/`
