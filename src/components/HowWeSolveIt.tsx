const steps = [
  { label: "LinkedIn / Job Boards", sublabel: "Auto-extract candidates", color: "text-accent-blue" },
  { label: "Your ATS", sublabel: "Deduplicate & enrich", color: "text-accent-amber" },
  { label: "Email / SMS / LinkedIn", sublabel: "Auto-outreach sequences", color: "text-accent-green" },
  { label: "Calendly / Calendar", sublabel: "Auto-schedule interviews", color: "text-accent-blue" },
  { label: "Client Submittals", sublabel: "Auto-generate PDFs", color: "text-accent-amber" },
  { label: "Placement Dashboard", sublabel: "Real-time reporting", color: "text-accent-green" },
];

export default function HowWeSolveIt() {
  return (
    <section className="border-y border-card-border bg-card-bg/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            We Connect Your ATS + LinkedIn + Email + Invoicing + Reporting{" "}
            <span className="text-accent-blue">Into One Workflow</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Your ATS handles 30% of your workflow. We automate the other 70% — the
            sourcing, follow-ups, submittals, and reporting that fall through the cracks.
          </p>
        </div>

        {/* Workflow diagram */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.label} className="relative">
                <div className="rounded-xl border border-card-border bg-background p-5 transition-all hover:border-accent-blue/40">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-card-bg text-sm font-bold ${step.color}`}>
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">{step.label}</div>
                      <div className="text-xs text-muted">{step.sublabel}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-6 text-center">
            <p className="text-sm text-muted">
              <span className="font-semibold text-white">Unlike ATS built-in automation</span>{" "}
              (Bullhorn Herefish, Recruiterflow workflows), we connect{" "}
              <span className="text-accent-blue font-semibold">ACROSS all your tools</span>{" "}
              — not just within one platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
