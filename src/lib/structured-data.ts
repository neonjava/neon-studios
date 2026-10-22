import { site } from "@/config/site";
import { services } from "@/content/services";

const organizationId = `${site.url}/#organization`;
export const studioStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      alternateName: "NeonStudios",
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      alternateName: "NeonStudios",
      url: `${site.url}/`,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      founder: { "@id": `${site.url}/#founder` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: site.founder,
      url: site.personalSite,
      sameAs: [site.github],
      worksFor: { "@id": organizationId },
    },
  ],
};
export const serviceStructuredData = {
  "@context": "https://schema.org",
  "@graph": services.map((service) => ({
    "@type": "Service",
    "@id": `${site.url}/services#${service.slug}`,
    url: `${site.url}/services#${service.slug}`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    provider: { "@id": organizationId },
  })),
};

export function serializeStructuredData(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
