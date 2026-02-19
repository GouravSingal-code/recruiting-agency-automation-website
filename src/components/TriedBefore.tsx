const failures = [
  {
    quote: "It worked for a week, then broke",
    explanation:
      "Freelancers don't build error handling. APIs change, webhooks timeout, and nobody monitors it. We build with retry logic, error alerts, and ongoing monitoring.",
  },
  {
    quote: "The freelancer didn't understand our ATS",
    explanation:
      "Generic automation consultants don't know what a submittal is, what Bullhorn's API quirks are, or how recruiting pipelines actually work. We do.",
  },
  {
    quote: "It created duplicate candidates everywhere",
    explanation:
      "Without proper duplicate detection, automations create more chaos than they solve. We build deduplication into every workflow.",
  },
  {
    quote: "We outgrew it in 3 months",
    explanation:
      "Zapier's free/starter plans hit limits fast. We architect for scale from Day 1 — using the right tool for your volume.",
  },
];

export default function TriedBefore() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Tried Zapier Yourself or Hired a Freelancer?{" "}
            <span className="text-accent-amber">Here&apos;s Why It Didn&apos;t Work.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Most recruiting agencies that &ldquo;tried automation&rdquo; hit the same walls.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {failures.map((f) => (
            <div
              key={f.quote}
              className="rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent-amber/30"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-400">
                  ✗
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">&ldquo;{f.quote}&rdquo;</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">→ {f.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#cta"
            className="inline-block rounded-lg border border-accent-amber/50 px-8 py-3 text-sm font-semibold text-accent-amber transition-colors hover:bg-accent-amber/10"
          >
            Book a Free Audit — We&apos;ll Review What Broke and Fix It
          </a>
        </div>
      </div>
    </section>
  );
}
