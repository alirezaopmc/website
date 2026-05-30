import type { Metadata } from "next";
import { WritingCard } from "@/components/content/writing-card";
import { getVisibleWritings } from "@/lib/blog/queries";
import { buildWritingIndexMetadata } from "@/lib/blog/seo";
import { typography } from "@/lib/design-system";

export const dynamic = "force-static";

export const metadata: Metadata = buildWritingIndexMetadata();

export default function WritingPage() {
  const items = getVisibleWritings();

  return (
    <>
      <header className="mb-10 flex flex-col gap-3">
        <h1 className={typography.heading1}>Writing</h1>
        <p className={typography.lead}>
          Selected publications and external writing.
        </p>
      </header>

      {items.length === 0 ? (
        <p className={typography.body}>No writing entries yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <WritingCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
