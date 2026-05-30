import { cookies } from "next/headers";
import {
  ANNOUNCEMENT_COOKIE_NAME,
  parseAnnouncementCookie,
  shouldShowAnnouncement,
} from "@/lib/blog/announcement";
import { getLatestBlog } from "@/lib/blog/queries";

export async function getVisibleAnnouncement() {
  const latest = getLatestBlog();
  if (!latest) return null;

  const cookieStore = await cookies();
  const cookie = parseAnnouncementCookie(
    cookieStore.get(ANNOUNCEMENT_COOKIE_NAME)?.value,
  );

  if (!shouldShowAnnouncement(latest.slug, cookie)) return null;

  return { slug: latest.slug, title: latest.title };
}
