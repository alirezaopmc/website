import { BioPanel } from "@/components/content/bio-panel";
import { cn } from "@/lib/utils";

type LeftSidebarProps = {
  className?: string;
};

export function LeftSidebar({ className }: LeftSidebarProps) {
  return (
    <aside aria-label="Sidebar left" className={cn("flex flex-col", className)}>
      <BioPanel />
    </aside>
  );
}
