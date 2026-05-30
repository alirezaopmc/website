"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { LatestBlogBarClient } from "@/components/layout/latest-blog-bar.client";
import { LayoutContentOffset } from "@/components/layout/layout-content-offset";
import { dismissAnnouncement } from "@/lib/blog/announcement.actions";
import { getAnnouncementVisibility } from "@/lib/blog/announcement.visibility";

type AnnouncementConfig = {
  slug: string;
  title: string;
};

type AnnouncementContextValue = {
  announcement: AnnouncementConfig;
  visible: boolean;
  resolved: boolean;
  dismiss: () => void;
  isDismissing: boolean;
};

const AnnouncementContext = createContext<AnnouncementContextValue | null>(
  null,
);

function useAnnouncement() {
  const value = useContext(AnnouncementContext);
  if (!value) {
    throw new Error("AnnouncementProvider is required");
  }
  return value;
}

type AnnouncementProviderProps = {
  announcement: AnnouncementConfig;
  children: ReactNode;
};

export function AnnouncementProvider({
  announcement,
  children,
}: AnnouncementProviderProps) {
  const [visible, setVisible] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [isDismissing, startDismissTransition] = useTransition();
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers re-check after blog visit cookie is set
  useEffect(() => {
    let cancelled = false;

    void getAnnouncementVisibility(announcement.slug).then((shouldShow) => {
      if (cancelled) return;
      setVisible(shouldShow);
      setResolved(true);
    });

    return () => {
      cancelled = true;
    };
  }, [announcement.slug, pathname]);

  const dismiss = useCallback(() => {
    startDismissTransition(async () => {
      await dismissAnnouncement(announcement.slug);
      setVisible(false);
      setResolved(true);
    });
  }, [announcement.slug]);

  return (
    <AnnouncementContext.Provider
      value={{ announcement, visible, resolved, dismiss, isDismissing }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
}

export function AnnouncementBarSlot() {
  const { announcement, visible, resolved, dismiss, isDismissing } =
    useAnnouncement();

  if (!resolved || !visible) return null;

  return (
    <LatestBlogBarClient
      slug={announcement.slug}
      title={announcement.title}
      onDismiss={dismiss}
      isDismissing={isDismissing}
    />
  );
}

export function AnnouncementContentShell({
  children,
}: {
  children: ReactNode;
}) {
  const { visible, resolved } = useAnnouncement();

  return (
    <LayoutContentOffset hasAnnouncement={resolved && visible}>
      {children}
    </LayoutContentOffset>
  );
}
