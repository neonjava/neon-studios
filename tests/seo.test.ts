import { describe, expect, it } from "vitest";
import { pageMetadata, siteRoutes } from "@/config/seo";
import {
  serializeStructuredData,
  serviceStructuredData,
} from "@/lib/structured-data";
import { services } from "@/content/services";

describe("search metadata", () => {
  it("uses unique canonical URLs and descriptive page titles", () => {
    const pages = siteRoutes.map(pageMetadata);
    expect(new Set(pages.map((page) => page.alternates?.canonical)).size).toBe(
      siteRoutes.length,
    );
    expect(new Set(pages.map((page) => JSON.stringify(page.title))).size).toBe(
      siteRoutes.length,
    );
  });
  it("escapes script termination in structured content", () => {
    const value = { name: '</script><script>alert("x")</script>' };
    const serialized = serializeStructuredData(value);
    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual(value);
  });
  it("describes only the published services", () => {
    expect(
      serviceStructuredData["@graph"].map((service) => service.name),
    ).toEqual(services.map((service) => service.title));
  });
});
