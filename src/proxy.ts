import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ANNOUNCEMENT_COOKIE_NAME,
  applyAnnouncementDismissals,
  getAnnouncementSlugsToDismissOnVisit,
  parseAnnouncementCookie,
} from "@/lib/blog/announcement";
import { getLatestBlog } from "@/lib/blog/queries";

const ANNOUNCEMENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const latest = getLatestBlog();
  if (!latest) {
    return NextResponse.next();
  }

  const slugsToDismiss = getAnnouncementSlugsToDismissOnVisit(
    request.nextUrl.pathname,
    latest.slug,
  );

  if (slugsToDismiss.length === 0) {
    return NextResponse.next();
  }

  const existing = parseAnnouncementCookie(
    request.cookies.get(ANNOUNCEMENT_COOKIE_NAME)?.value,
  );
  const { cookie, changed } = applyAnnouncementDismissals(
    existing,
    slugsToDismiss,
  );

  if (!changed) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set(
    ANNOUNCEMENT_COOKIE_NAME,
    JSON.stringify({ dismissed: cookie.dismissed }),
    {
      maxAge: ANNOUNCEMENT_COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
    },
  );

  return response;
}

export const config = {
  matcher: ["/blog", "/blog/:path*"],
};
