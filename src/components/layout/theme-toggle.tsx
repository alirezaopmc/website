"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { chrome } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type ThemePreference = "light" | "dark" | "system";

const themeOptions = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

function normalizeTheme(theme: string | undefined): ThemePreference {
  if (theme === "dark" || theme === "system") return theme;
  return "light";
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={chrome.themeTogglePlaceholder} aria-hidden />;
  }

  const preference = normalizeTheme(theme);
  const active =
    themeOptions.find((option) => option.value === preference) ??
    themeOptions[0];
  const ActiveIcon = active.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={chrome.themeToggle}
        aria-label="Change theme"
      >
        <ActiveIcon className={chrome.iconMd} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {themeOptions.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            className="cursor-pointer gap-2"
            onClick={() => setTheme(value)}
          >
            <Icon className={chrome.iconMd} />
            <span>{label}</span>
            {preference === value ? (
              <Check className={cn(chrome.iconMd, "ml-auto text-foreground")} />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
