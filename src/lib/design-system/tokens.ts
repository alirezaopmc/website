/** CSS custom property names — mirror src/styles/tokens.css */
export const cssVars = {
  background: "--background",
  foreground: "--foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  border: "--border",
  brand: "--brand",
  brandForeground: "--brand-foreground",
  contentWidth: "--content-width",
  contentWidthWide: "--content-width-wide",
  proseWidth: "--prose-width",
  sectionY: "--section-y",
  sectionYlg: "--section-y-lg",
  radius: "--radius",
} as const;

export type CssVarKey = keyof typeof cssVars;
