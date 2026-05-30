"use server";

import { cookies } from "next/headers";
import {
  ANNOUNCEMENT_COOKIE_NAME,
  type AnnouncementCookie,
} from "@/lib/blog/announcement";

export async function dismissAnnouncement(slug: string) {
  const cookieStore = await cookies();
  const value: AnnouncementCookie = {
    slug,
    dismissedAt: new Date().toISOString(),
  };

  cookieStore.set(ANNOUNCEMENT_COOKIE_NAME, JSON.stringify(value), {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}
