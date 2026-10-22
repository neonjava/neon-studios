import { pageMetadata } from "@/config/seo";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { site } from "@/config/site";

export const metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="Start a conversation"
        title="Let’s understand what comes next."
      >
        Tell us about the software you have, the constraints that matter, and
        why you’re considering Rust. That’s enough for a useful first
        conversation.
      </PageIntro>
      <section className="container form-shell page-content">
        <aside className="contact-aside">
          <span className="eyebrow">Direct to the founder</span>
          <h2>Start with context.</h2>
          <p>
            The current language, dependencies, deployment environment, and
            behavior that cannot change are all useful starting points.
          </p>
          <hr className="aside-divider" />
          <p>Prefer your own email?</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <hr className="aside-divider" />
          <p>
            This form prepares an email draft. Review and send it in your email
            application to complete the enquiry.
          </p>
        </aside>
        <WindowFrame title="Project enquiry" label="Email draft">
          <ContactForm recipient={site.email} />
        </WindowFrame>
      </section>
    </>
  );
}
