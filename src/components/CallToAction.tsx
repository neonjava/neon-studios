import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="container closing-section">
      <div className="cta-band">
        <div>
          <span className="eyebrow">The next chapter</span>
          <h2>
            Good software deserves
            <br />a considered evolution.
          </h2>
          <p>Bring your codebase. We’ll start with the right questions.</p>
        </div>
        <Link href="/contact" className="button button-primary">
          Discuss your project <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
