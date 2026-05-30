import type { ReactNode } from "react";
import { chrome, layout } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type WeblogLayoutProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  className?: string;
};

export function WeblogLayout({
  left,
  center,
  right,
  className,
}: WeblogLayoutProps) {
  return (
    <div
      className={cn(layout.containerLanding, chrome.landingShell, className)}
    >
      <div className={layout.bodyIsland}>
        <div className={chrome.weblogGrid}>
          <div className={cn(chrome.weblogPanel, "order-2 lg:order-1")}>
            {left}
          </div>
          <div className={cn(chrome.weblogPanel, "order-1 lg:order-2")}>
            {center}
          </div>
          <div className={cn(chrome.weblogPanel, "order-3")}>{right}</div>
        </div>
      </div>
    </div>
  );
}
