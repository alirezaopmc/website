export const ANNOUNCEMENT_COOKIE_NAME = "announcement-bar";

export const ANNOUNCEMENT_DISMISS_TTL_MS = 2 * 24 * 60 * 60 * 1000;

export type AnnouncementCookie = {
  dismissed: Record<string, string>;
};

type LegacyAnnouncementCookie = {
  slug: string;
  dismissedAt: string;
};

function isLegacyAnnouncementCookie(
  value: unknown,
): value is LegacyAnnouncementCookie {
  return (
    typeof value === "object" &&
    value !== null &&
    "slug" in value &&
    "dismissedAt" in value &&
    typeof (value as LegacyAnnouncementCookie).slug === "string" &&
    typeof (value as LegacyAnnouncementCookie).dismissedAt === "string"
  );
}

export function parseAnnouncementCookie(
  value: string | undefined,
): AnnouncementCookie | null {
  if (!value) return null;

  const candidates = [value];
  if (value.includes("%")) {
    try {
      candidates.push(decodeURIComponent(value));
    } catch {
      // ignore malformed encoding
    }
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as unknown;

      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "dismissed" in parsed &&
        typeof (parsed as AnnouncementCookie).dismissed === "object" &&
        (parsed as AnnouncementCookie).dismissed !== null
      ) {
        return { dismissed: (parsed as AnnouncementCookie).dismissed };
      }

      if (isLegacyAnnouncementCookie(parsed)) {
        return { dismissed: { [parsed.slug]: parsed.dismissedAt } };
      }
    } catch {
      // try next candidate
    }
  }

  return null;
}

export function isAnnouncementDismissed(
  slug: string,
  cookie: AnnouncementCookie | null,
  now = Date.now(),
): boolean {
  if (!cookie) return false;

  const dismissedAt = cookie.dismissed[slug];
  if (!dismissedAt) return false;

  const timestamp = Date.parse(dismissedAt);
  if (Number.isNaN(timestamp)) return false;

  return now - timestamp <= ANNOUNCEMENT_DISMISS_TTL_MS;
}

export function shouldShowAnnouncement(
  slug: string,
  cookie: AnnouncementCookie | null,
  now = Date.now(),
): boolean {
  return !isAnnouncementDismissed(slug, cookie, now);
}

export function mergeDismissedAnnouncement(
  cookie: AnnouncementCookie | null,
  slug: string,
  dismissedAt = new Date().toISOString(),
): AnnouncementCookie {
  return {
    dismissed: {
      ...cookie?.dismissed,
      [slug]: dismissedAt,
    },
  };
}

export function applyAnnouncementDismissals(
  cookie: AnnouncementCookie | null,
  slugs: string[],
): { cookie: AnnouncementCookie; changed: boolean } {
  let next = cookie;
  let changed = false;

  for (const slug of slugs) {
    if (isAnnouncementDismissed(slug, next)) {
      continue;
    }

    next = mergeDismissedAnnouncement(next, slug);
    changed = true;
  }

  return { cookie: next ?? { dismissed: {} }, changed };
}

export function getAnnouncementSlugsToDismissOnVisit(
  pathname: string,
  announcementSlug: string,
): string[] {
  if (pathname === "/blog") {
    return [announcementSlug];
  }

  if (!pathname.startsWith("/blog/")) {
    return [];
  }

  const visitedSlug = pathname.slice("/blog/".length).split("/")[0];
  if (!visitedSlug) {
    return [announcementSlug];
  }

  return [visitedSlug];
}
