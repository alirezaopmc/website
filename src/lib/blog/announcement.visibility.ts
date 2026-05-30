"use server";

import { cookies } from "next/headers";
import {
  ANNOUNCEMENT_COOKIE_NAME,
  parseAnnouncementCookie,
  shouldShowAnnouncement,
} from "@/lib/blog/announcement";

export async function getAnnouncementVisibility(slug: string) {
  const cookieStore = await cookies();
  const cookie = parseAnnouncementCookie(
    cookieStore.get(ANNOUNCEMENT_COOKIE_NAME)?.value,
  );

  return shouldShowAnnouncement(slug, cookie);
}
