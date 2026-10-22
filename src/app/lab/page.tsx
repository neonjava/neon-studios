import { pageMetadata } from "@/config/seo";
import { MigrationLab } from "@/components/MigrationLab";
import { PageIntro } from "@/components/PageIntro";
import { migrationExamples } from "@/content/migrations";
import { highlightExamples } from "@/lib/highlight";

export const metadata = pageMetadata("/lab");

export default async function LabPage() {
  const examples = await highlightExamples(migrationExamples);
  return (
    <>
      <PageIntro
        label="The migration lab"
        title="Same behavior. Different foundations."
      >
        Explore small, documented implementations in Python, Node.js, Java, and
        Rust. Compare the code, inspect the contracts, and see where the
        differences matter.
      </PageIntro>
      <section className="container page-content">
        <MigrationLab examples={examples} />
      </section>
    </>
  );
}
