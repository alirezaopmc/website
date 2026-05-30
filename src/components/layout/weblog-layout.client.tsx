"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { PathBar } from "@/components/content/path-bar";
import { chrome, layout } from "@/lib/design-system";
import { resolvePathBarItems } from "@/lib/navigation/path-bar";
import { cn } from "@/lib/utils";

type WeblogLayoutClientProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  blogTitlesBySlug: Record<string, string>;
  className?: string;
};

export function WeblogLayoutClient({
  left,
  center,
  right,
  blogTitlesBySlug,
  className,
}: WeblogLayoutClientProps) {
  const pathname = usePathname();
  const pathItems = resolvePathBarItems(pathname, blogTitlesBySlug);
  const isAboutPage = pathname === "/about";

  return (
    <div
      className={cn(layout.containerLanding, chrome.landingShell, className)}
    >
      <div className={layout.bodyIsland}>
        {pathItems.length > 0 ? (
          <div className={chrome.pathBarSlot}>
            <PathBar items={pathItems} />
          </div>
        ) : null}
        <div
          className={
            isAboutPage ? chrome.weblogGridCenterOnly : chrome.weblogGrid
          }
        >
          {isAboutPage ? null : (
            <div className={cn(chrome.weblogPanel, "order-2 lg:order-1")}>
              {left}
            </div>
          )}
          <div
            className={cn(
              chrome.weblogPanel,
              chrome.weblogCenterPanel,
              "order-1 lg:order-2",
            )}
          >
            <div className={layout.centerContent}>{center}</div>
          </div>
          {isAboutPage ? null : (
            <div className={cn(chrome.weblogPanel, "order-3")}>{right}</div>
          )}
        </div>
      </div>
    </div>
  );
}
