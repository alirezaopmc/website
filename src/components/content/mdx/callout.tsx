import { typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type CalloutProps = {
  title?: string;
  variant?: "note" | "info" | "warning";
  children: React.ReactNode;
  searchText?: string;
};

const variantStyles = {
  note: "border-border bg-muted/50",
  info: "border-primary/30 bg-primary/5",
  warning: "border-destructive/30 bg-destructive/5",
} as const;

export function Callout({ title, variant = "note", children }: CalloutProps) {
  return (
    <aside
      className={cn("my-6 rounded-lg border px-4 py-3", variantStyles[variant])}
    >
      {title ? <p className={cn(typography.label, "mb-2")}>{title}</p> : null}
      <div className={cn(typography.small, "leading-6")}>{children}</div>
    </aside>
  );
}
