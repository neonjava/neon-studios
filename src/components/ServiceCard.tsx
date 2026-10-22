import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link href={`/services#${service.slug}`} className="service-row">
      <span className="row-index">0{index + 1}</span>
      <div className="service-route">
        <h3>{service.source}</h3>
        <ArrowRight size={18} />
        <span>Rust</span>
      </div>
      <div className="service-summary">
        <p>{service.summary}</p>
        <span>{service.workloads.join(" / ")}</span>
      </div>
      <span className="row-arrow">
        <ArrowUpRight size={19} />
      </span>
    </Link>
  );
}
