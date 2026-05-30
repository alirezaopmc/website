export const ANNOUNCEMENT_COOKIE_NAME = "announcement-bar";

export const ANNOUNCEMENT_DISMISS_TTL_MS = 2 * 24 * 60 * 60 * 1000;

export type AnnouncementCookie = {
  slug: string;
  dismissedAt: string;
};

export function parseAnnouncementCookie(
  value: string | undefined,
): AnnouncementCookie | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as AnnouncementCookie;
    if (
      typeof parsed.slug === "string" &&
      typeof parsed.dismissedAt === "string"
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export function shouldShowAnnouncement(
  latestSlug: string,
  cookie: AnnouncementCookie | null,
  now = Date.now(),
): boolean {
  if (!cookie) return true;
  if (cookie.slug !== latestSlug) return true;

  const dismissedAt = Date.parse(cookie.dismissedAt);
  if (Number.isNaN(dismissedAt)) return true;

  return now - dismissedAt > ANNOUNCEMENT_DISMISS_TTL_MS;
}
