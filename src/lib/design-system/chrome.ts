import { cn } from "@/lib/utils";
import { typography } from "./typography";

export const chrome = {
  fixedShell: cn(
    "pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col gap-chrome-stack-gap",
    "px-chrome-padding-x pt-header-padding-top",
  ),
  headerShell: cn("flex justify-center"),
  headerInner: cn(
    "pointer-events-auto flex h-header-island-height w-full max-w-content-wide items-center justify-between gap-4",
    "px-chrome-padding-x sm:px-chrome-padding-x-lg",
  ),
  navLink: cn(
    typography.navLabel,
    "rounded-full px-nav-link-padding-x py-nav-link-padding-y transition-colors",
  ),
  navLinkActive: cn("bg-foreground/10 text-foreground"),
  navLinkInactive: cn(
    "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
  ),
  themeToggle: cn(
    "inline-flex size-chrome-control shrink-0 cursor-pointer items-center justify-center rounded-full",
    "text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
    "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
  ),
  themeTogglePlaceholder: cn("inline-block size-chrome-control shrink-0"),
  announcementBar: cn(
    "pointer-events-auto w-full",
    "border-b border-border bg-announcement-bar-bg backdrop-blur-md",
  ),
  announcementBarInner: cn(
    "mx-auto flex h-announcement-bar-height w-full max-w-content-wide items-center gap-3",
    "px-chrome-padding-x sm:px-chrome-padding-x-lg",
  ),
  announcementBadge: cn(
    typography.micro,
    "rounded-full border border-border bg-background px-2 py-0.5",
  ),
  announcementDismiss: cn(
    "shrink-0 rounded-md p-1 text-muted-foreground transition-colors",
    "hover:bg-accent hover:text-foreground disabled:opacity-50",
  ),
  weblogGrid: cn(
    "grid min-h-[inherit] grid-cols-1",
    "divide-y divide-header-island-border",
    "lg:grid-cols-[minmax(var(--width-panel-left-min),var(--width-panel-left-max))_minmax(0,1fr)_minmax(var(--width-panel-right-min),var(--width-panel-right-max))]",
    "lg:divide-x lg:divide-y-0",
  ),
  weblogGridCenterOnly: cn("grid min-h-[inherit] grid-cols-1"),
  weblogPanel: cn(
    "px-panel-padding-x py-panel-padding-y",
    "lg:px-panel-padding-x-lg lg:py-panel-padding-y-lg",
  ),
  weblogCenterPanel: cn("flex min-h-0 min-w-0 w-full flex-col"),
  landingShell: cn("pb-section-y"),
  iconSm: cn("size-icon-sm"),
  iconMd: cn("size-icon-md"),
  pathBarSlot: cn(
    "flex h-path-bar-slot min-h-path-bar-slot w-full shrink-0 items-center",
    "border-b border-header-island-border",
  ),
  pathBar: cn(
    "w-full px-chrome-padding-x py-path-bar-padding-y sm:px-chrome-padding-x-lg",
  ),
  pathBarList: cn("flex flex-wrap items-center gap-x-2 gap-y-1 font-sans"),
  pathBarLink: cn(
    typography.small,
    "text-muted-foreground transition-colors hover:text-primary",
  ),
  pathBarCurrent: cn(typography.small, "truncate text-foreground"),
  pathBarSeparator: cn(typography.small, "text-muted-foreground"),
  profileAvatar: cn(
    "size-avatar shrink-0 rounded-full border border-border object-cover",
  ),
  profileAvatarLg: cn(
    "size-avatar-lg shrink-0 rounded-full border border-border object-cover",
  ),
  sidebarSectionDivider: cn("h-px w-full shrink-0 bg-header-island-border"),
  sidebarItemDivider: cn("h-px w-full shrink-0 bg-sidebar-divider-item"),
} as const;
