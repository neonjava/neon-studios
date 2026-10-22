import { StructuredData } from "@/components/StructuredData";
import { serviceStructuredData } from "@/lib/structured-data";
import { pageMetadata } from "@/config/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { PageIntro } from "@/components/PageIntro";
import { CallToAction } from "@/components/CallToAction";

export const metadata = pageMetadata("/services");

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={serviceStructuredData} />
      <PageIntro
        label="Migration services"
        title="Built around the code you already have."
      >
        A whole service, a core library, or one carefully chosen component. We
        define the boundaries, preserve the contracts, and verify the
        replacement.
      </PageIntro>
      <div className="container page-content">
        {services.map((service, index) => (
          <section
            className="service-detail"
            id={service.slug}
            key={service.slug}
          >
            <div className="service-detail-side">
              <span className="service-index">SERVICE / 0{index + 1}</span>
              <h2>{service.title}</h2>
              <span className="eyebrow">{service.eyebrow}</span>
            </div>
            <div className="service-detail-main">
              <p>{service.summary}</p>
              <div className="detail-grid">
                <div>
                  <h3>Suitable workloads</h3>
                  <ul>
                    {service.workloads.map((workload) => (
                      <li key={workload}>{workload}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Where Rust may help</h3>
                  <p>{service.helps}</p>
                </div>
                <div>
                  <h3>Compatibility considerations</h3>
                  <p>{service.challenges}</p>
                </div>
                <div>
                  <h3>Migration approach</h3>
                  <p>{service.approach}</p>
                </div>
                <div>
                  <h3>Verification</h3>
                  <p>{service.verification}</p>
                </div>
              </div>
              <Link href="/contact" className="service-link">
                Discuss this migration <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <CallToAction />
    </>
  );
}
