import type { ReactNode } from "react";
import { layout } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type LayoutContentOffsetProps = {
  hasAnnouncement: boolean;
  children: ReactNode;
};

export function LayoutContentOffset({
  hasAnnouncement,
  children,
}: LayoutContentOffsetProps) {
  return (
    <div
      className={cn(
        hasAnnouncement
          ? layout.headerOffsetWithAnnouncement
          : layout.headerOffset,
        layout.page,
        "min-h-screen",
      )}
    >
      {children}
    </div>
  );
}
