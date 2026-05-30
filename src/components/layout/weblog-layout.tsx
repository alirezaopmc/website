import type { ReactNode } from "react";
import { WeblogLayoutClient } from "@/components/layout/weblog-layout.client";

type WeblogLayoutProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  blogTitlesBySlug: Record<string, string>;
  className?: string;
};

export function WeblogLayout({
  left,
  center,
  right,
  blogTitlesBySlug,
  className,
}: WeblogLayoutProps) {
  return (
    <WeblogLayoutClient
      left={left}
      center={center}
      right={right}
      blogTitlesBySlug={blogTitlesBySlug}
      className={className}
    />
  );
}
