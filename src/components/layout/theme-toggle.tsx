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
    return <span className="inline-block size-8 shrink-0" aria-hidden />;
  }

  const preference = normalizeTheme(theme);
  const active =
    themeOptions.find((option) => option.value === preference) ??
    themeOptions[0];
  const ActiveIcon = active.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full",
          "text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        )}
        aria-label="Change theme"
      >
        <ActiveIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {themeOptions.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            className="cursor-pointer gap-2"
            onClick={() => setTheme(value)}
          >
            <Icon className="size-4" />
            <span>{label}</span>
            {preference === value ? (
              <Check className="ml-auto size-4 text-foreground" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
