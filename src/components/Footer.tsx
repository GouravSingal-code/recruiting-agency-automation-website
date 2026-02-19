const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "ROI Calculator", href: "#roi-calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Book Free Audit", href: "#cta" },
];

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card-bg/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div>
            <a href="#" className="text-xl font-bold text-foreground">
              Recruit<span className="text-accent-blue">Auto</span>
            </a>
            <p className="mt-2 max-w-sm text-sm text-muted">
              We help recruiting agencies automate candidate sourcing, ATS
              workflows, and client submittals — saving 15-25 hours/week per
              recruiter.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-card-border pt-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-4 text-sm text-muted">
            <a href="mailto:hello@yourdomain.com" className="hover:text-foreground">
              hello@yourdomain.com
            </a>
            <span>·</span>
            <a href="#cta" className="hover:text-foreground">
              Calendly
            </a>
            <span>·</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
          </div>

          <div className="text-xs text-muted">
            © {new Date().getFullYear()} RecruitAuto. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
