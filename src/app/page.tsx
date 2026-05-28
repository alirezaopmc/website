import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { layout, typography } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className={layout.page}>
      <main className={cn(layout.pageMain, layout.container, layout.section)}>
        <Card>
          <CardHeader>
            <CardTitle className={typography.heading2}>
              {siteConfig.name}
            </CardTitle>
            <CardDescription className={typography.lead}>
              {siteConfig.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className={typography.body}>
              Design system and shadcn/ui are configured. Pages for projects,
              blog, and writing will be added next.
            </p>
            <Button variant="outline" disabled>
              Explore (coming soon)
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
