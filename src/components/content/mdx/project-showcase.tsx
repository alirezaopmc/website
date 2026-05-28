import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { typography } from "@/lib/design-system";

type ProjectShowcaseProps = {
  slug: string;
  title?: string;
  description?: string;
  href?: string;
  tags?: string[];
  searchText?: string;
};

export function ProjectShowcase({
  slug,
  title,
  description,
  href,
  tags = [],
}: ProjectShowcaseProps) {
  const displayTitle = title ?? slug;
  const displayDescription =
    description ?? "Project showcase embed — replace with real project data.";

  return (
    <Card className="my-8 not-prose">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className={typography.heading3}>{displayTitle}</CardTitle>
          <Badge variant="secondary">Project</Badge>
        </div>
        <CardDescription>{displayDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
        {href ? (
          <Link
            href={href}
            className="text-sm text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View project
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
