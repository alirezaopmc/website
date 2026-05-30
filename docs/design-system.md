# Design System Reference

Concise reference for implementing UI in this portfolio. **SSoT order:** `tokens.css` → `globals.css` (@theme) → `lib/design-system` → shadcn `ui/` → feature components.

## Agent requirement (mandatory)

**All UI work MUST go through the design system.** Do not hardcode colors, sizes, spacing, or typography in feature components.

| Need | Use |
|------|-----|
| Colors | Semantic Tailwind utilities (`bg-background`, `text-muted-foreground`, `border-border`, `bg-header-island-bg`) |
| Spacing / layout widths | Tokens in `tokens.css` → `@/lib/design-system` `layout.*` or `chrome.*` |
| Typography | `@/lib/design-system` `typography.*` |
| Site chrome (header, nav, announcement bar, weblog panels) | `@/lib/design-system` `chrome.*` |
| New token | Add to `src/styles/tokens.css`, wire in `src/app/globals.css` `@theme inline`, then expose via `layout` / `chrome` / `typography` |

**Forbidden in `src/components/**` (except `ui/` shadcn primitives):**

- Raw color values (`#fff`, `oklch(...)`, `rgb(...)`)
- Arbitrary Tailwind values for layout (`text-[10px]`, `min-h-128`, `h-14`, `px-6` when a token/recipe exists)
- Duplicating island/chrome styles instead of `layout.surfaceIsland`, `layout.bodyIsland`, `chrome.*`

When a recipe is missing, **add a token + recipe first**, then use it.

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
| `--content-width-landing` | 78rem | `max-w-content-landing` |
| `--prose-width` | 65ch | `max-w-prose` |
| `--section-y` | 4rem | `py-section-y` |
| `--section-y-lg` | 6rem | `py-section-y-lg` |
| `--radius` | 0.625rem | `rounded-lg` (via radius scale) |
| `--header-offset` | 5.5rem | `pt-header-offset` |
| `--header-stack-height` | pt + island height | `top-header-stack` |
| `--announcement-bar-height` | 2.25rem | `h-announcement-bar-height` |
| `--header-island-bg` / `--header-island-border` | glass island | `bg-header-island-bg`, `border-header-island-border` |
| `--announcement-bar-bg` | 95% background mix | `bg-announcement-bar-bg` |
| `--body-island-min-height` | 32rem | `min-h-body-island` |
| `--body-island-radius` | radius × 2.2 | `rounded-body-island` |
| `--panel-width-*` | left/right min/max | used in `chrome.weblogGrid` |
| `--panel-padding-*` | panel insets | `px-panel-padding-x`, etc. |
| `--chrome-padding-x` | 1rem / 1.5rem lg | `px-chrome-padding-x` |
| `--font-size-micro` | 0.625rem | `text-micro` |

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
| `micro` | Uppercase mono labels (e.g. announcement badge) |
| `siteTitle` | Header site name |
| `navLabel` | Nav link text |
| `label` | Emphasized inline labels |
| `titleLink` | Compact linked titles |
| `prose` | Long-form blog/writing body (no @tailwindcss/typography plugin) |

Fonts: Geist Sans (`--font-geist-sans`), Geist Mono (`--font-geist-mono`), applied in root layout.

## Layout (`src/lib/design-system/layout.ts`)

| Export | Classes |
|--------|---------|
| `container` | centered, `max-w-content`, horizontal padding |
| `containerWide` | `max-w-content-wide` |
| `containerLanding` | `max-w-content-landing` |
| `section` | vertical section padding |
| `sectionLg` | larger section padding |
| `page` | full-height page flex column |
| `pageMain` | flex grow main area |
| `headerOffset` | `pt-header-offset` |
| `headerOffsetWithAnnouncement` | extra padding when announcement bar visible |
| `surfaceIsland` | shared glass island surface |
| `headerIsland` | nav pill |
| `bodyIsland` | landing page bubble |

## Chrome (`src/lib/design-system/chrome.ts`)

Recipes for fixed header, nav links, theme toggle, announcement bar, and weblog grid/panels. **Use these instead of one-off classes in layout components.**

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
