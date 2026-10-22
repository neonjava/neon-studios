import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Brand />
          <p>
            Careful migrations.
            <br />
            Software with a future.
          </p>
        </div>
        <div>
          <span className="footer-heading">Studio</span>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <span className="footer-heading">Connect</span>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={12} />
          </a>
          <a href={site.personalSite} target="_blank" rel="noreferrer">
            NeonJava <ArrowUpRight size={12} />
          </a>
          <a href={`mailto:${site.email}`}>
            Email <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Neon Studios</span>
        <span>Independent by design.</span>
        <span className="footer-location">Rust first. Always considered.</span>
      </div>
    </footer>
  );
}
