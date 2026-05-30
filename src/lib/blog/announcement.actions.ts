"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  ANNOUNCEMENT_COOKIE_NAME,
  mergeDismissedAnnouncement,
  parseAnnouncementCookie,
} from "@/lib/blog/announcement";

export async function dismissAnnouncement(slug: string) {
  const cookieStore = await cookies();
  const existing = parseAnnouncementCookie(
    cookieStore.get(ANNOUNCEMENT_COOKIE_NAME)?.value,
  );

  const dismissed = mergeDismissedAnnouncement(existing, slug).dismissed;

  cookieStore.set(ANNOUNCEMENT_COOKIE_NAME, JSON.stringify({ dismissed }), {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}
