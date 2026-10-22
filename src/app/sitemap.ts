import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { siteRoutes } from "@/config/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({ url: new URL(route, site.url).href }));
}
