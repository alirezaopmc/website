# Design System Reference

Concise reference for implementing UI in this portfolio. **SSoT order:** `tokens.css` → `globals.css` (@theme) → `lib/design-system` → shadcn `ui/` → feature components.

## Style preset

| Setting | Value |
|---------|-------|
| shadcn style | `base-nova` |
| Base color | `zinc` (components.json; tokens use neutral oklch from init) |
| CSS variables | enabled |
| Icon library | lucide-react |
| Dark mode | class `.dark` via next-themes |

## CSS tokens (`src/styles/tokens.css`)

### Semantic colors (shadcn)

`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `chart-1`…`chart-5`, sidebar variants.

Use as Tailwind utilities: `bg-background`, `text-muted-foreground`, `border-border`, etc.

### Portfolio extensions

| Variable | Default | Tailwind usage |
|----------|---------|----------------|
| `--brand` | maps to `--primary` | `bg-brand`, `text-brand` |
| `--content-width` | 42rem | `max-w-content` |
| `--content-width-wide` | 64rem | `max-w-content-wide` |
| `--prose-width` | 65ch | `max-w-prose` |
| `--section-y` | 4rem | `py-section-y` |
| `--section-y-lg` | 6rem | `py-section-y-lg` |
| `--radius` | 0.625rem | `rounded-lg` (via radius scale) |

### Changing the palette

1. Edit `:root` / `.dark` in `tokens.css`.
2. Avoid editing color blocks in `globals.css` — keep wiring only.
3. Rebuild; no component changes needed if semantic names unchanged.

## Typography (`src/lib/design-system/typography.ts`)

| Export | Use for |
|--------|---------|
| `heading1` | Page titles |
| `heading2` | Section titles |
| `heading3` | Subsections |
| `lead` | Intro / card descriptions |
| `body` | Default paragraph |
| `small` | Meta, dates, captions |
| `prose` | Long-form blog/writing body (no @tailwindcss/typography plugin) |

Fonts: Geist Sans (`--font-geist-sans`), Geist Mono (`--font-geist-mono`), applied in root layout.

## Layout (`src/lib/design-system/layout.ts`)

| Export | Classes |
|--------|---------|
| `container` | centered, `max-w-content`, horizontal padding |
| `containerWide` | `max-w-content-wide` |
| `section` | vertical section padding |
| `sectionLg` | larger section padding |
| `page` | full-height page flex column |
| `pageMain` | flex grow main area |

## shadcn components

Location: `src/components/ui/`. Add via CLI:

```bash
bunx shadcn@latest add <component> -y
```

Merge classes with `cn()` from `@/lib/utils`.

**Installed:** button, card, badge, separator, skeleton, tooltip.

## Dark mode

- Provider: `src/components/providers/theme-provider.tsx`
- HTML: `suppressHydrationWarning` on `<html>`
- Variant: `@custom-variant dark (&:is(.dark *));` in globals.css
- Prefer `dark:` utilities over media-query-only styles

## Site config

- `src/config/site.ts` — name, description, url, author, locale, OG placeholder
- `src/config/navigation.ts` — nav roadmap; respect `enabled` flag

## Content types

`src/types/content.ts`: `ContentMeta`, `Project`, `BlogPost`, `Writing`, `ContentItem`.

## Biome

- 2-space indent, organize imports on save (assist)
- Tailwind directives enabled in CSS parser
- Run `bun run lint` before committing
