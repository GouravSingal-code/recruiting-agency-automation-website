const stats = [
  { value: "15-25 hrs", label: "Saved per recruiter/week" },
  { value: "2-3 extra", label: "Placements per month" },
  { value: "90%", label: "Less manual data entry" },
  { value: "1-3 mo", label: "ROI payback period" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-accent-blue/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="mx-auto inline-block rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-xs font-medium text-accent-blue mb-6">
          We only work with recruiting agencies
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl md:leading-tight">
          The Only Automation Partner Built{" "}
          <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
            Exclusively
          </span>{" "}
          for Recruiting Agencies
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          We don&apos;t do e-commerce. We don&apos;t do SaaS. We only automate recruiting
          agencies. We speak your language — placements, submittals, time-to-fill,
          split fees — and we build automations that actually stick.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#cta"
            className="rounded-lg bg-accent-blue px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all hover:bg-accent-blue/90 hover:shadow-accent-blue/40"
          >
            Book Free Recruiting Automation Audit
          </a>
          <a
            href="#problem"
            className="flex items-center gap-2 rounded-lg border border-card-border px-8 py-4 text-base font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            See How It Works
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-card-border bg-card-bg/50 px-6 py-5 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-accent-amber">{stat.value}</div>
              <div className="mt-1 text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
