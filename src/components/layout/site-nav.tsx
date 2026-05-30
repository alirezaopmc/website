"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { enabledNavigation } from "@/config/navigation";
import { chrome } from "@/lib/design-system";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-0.5 sm:gap-1">
        {enabledNavigation.map((item) => {
          const active = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  chrome.navLink,
                  active ? chrome.navLinkActive : chrome.navLinkInactive,
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
