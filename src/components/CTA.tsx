const trustSignals = [
  "30-minute call, no commitment",
  "Specific to YOUR workflow and ATS",
  "You'll leave with 2-3 actionable automation ideas",
  "Quick Win projects start at $3,500 (1 week delivery)",
];

export default function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to Stop Losing Placements to Slower Workflows?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Book a free 30-minute Recruiting Automation Audit. We&apos;ll map your
          current workflow, identify 2-3 automation opportunities, and calculate
          your exact ROI — even if we don&apos;t work together.
        </p>

        <p className="mt-4 text-sm text-muted">
          No sales pressure. No obligation. Just an honest look at what&apos;s
          costing your recruiters 15-25 hours every week.
        </p>

        <a
          href="https://calendly.com" // Replace with actual Calendly link
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-lg bg-accent-blue px-10 py-4 text-base font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all hover:bg-accent-blue/90 hover:shadow-accent-blue/40"
        >
          Book Your Free Recruiting Automation Audit →
        </a>

        <div className="mt-8 flex flex-col items-center gap-3">
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2 text-sm text-muted">
              <svg className="h-4 w-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {signal}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
