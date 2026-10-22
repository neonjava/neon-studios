import { createHighlighter } from "shiki";
import type { MigrationExample } from "@/content/migrations";

export type HighlightedExample = MigrationExample & {
  sourceHtml: string;
  rustHtml: string;
};

export async function highlightExamples(
  examples: MigrationExample[],
): Promise<HighlightedExample[]> {
  const highlighter = await createHighlighter({
    themes: ["github-dark", "github-light"],
    langs: ["python", "javascript", "java", "rust"],
  });
  try {
    return examples.map((example) => {
      const options = {
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false as const,
      };
      return {
        ...example,
        sourceHtml: highlighter.codeToHtml(example.sourceCode, {
          ...options,
          lang:
            example.language === "Python"
              ? "python"
              : example.language === "Java"
                ? "java"
                : "javascript",
        }),
        rustHtml: highlighter.codeToHtml(example.rustCode, {
          ...options,
          lang: "rust",
        }),
      };
    });
  } finally {
    highlighter.dispose();
  }
}
