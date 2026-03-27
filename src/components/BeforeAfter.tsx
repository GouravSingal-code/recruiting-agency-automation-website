const rows = [
  { task: "Adding a candidate to your pipeline", before: "5 min per candidate", after: "10 seconds" },
  { task: "Reaching out to a candidate", before: "30 min per candidate", after: "10 seconds" },
  { task: "Following up after no response", before: "Often forgotten", after: "Automatic on day 3, 7, and 14" },
  { task: "Sending a candidate profile to a client", before: "20 min per profile", after: "One click" },
  { task: "Checking for duplicate candidates", before: "Manual — frequently missed", after: "Instant, every time" },
  { task: "Weekly hiring report", before: "1 hour to put together", after: "Ready in 5 minutes" },
  { task: "Keeping candidate data up to date", before: "4 days per year", after: "Happens automatically" },
];

export default function BeforeAfter() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3">
            Before vs. After
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Where your team&apos;s time goes today — and where it goes with us.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Every task below happens the same way at most companies. Here&apos;s what changes.
          </p>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-0 mb-2 px-5">
          <span className="text-xs font-bold uppercase tracking-widest text-muted/50" />
          <span className="w-44 text-center text-xs font-bold uppercase tracking-widest text-red-400/70">Without us</span>
          <span className="w-44 text-center text-xs font-bold uppercase tracking-widest text-accent-green/80">With us</span>
        </div>

        <div className="rounded-2xl border border-card-border overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={row.task}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-0 px-5 py-4 border-b border-card-border/50 last:border-b-0 transition-colors hover:bg-card-bg/60 ${
                i % 2 === 0 ? 'bg-background' : 'bg-card-bg/30'
              }`}
            >
              {/* Task */}
              <span className="text-sm font-medium text-white pr-6">{row.task}</span>

              {/* Before */}
              <div className="w-44 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/8 border border-red-500/15 px-3 py-1.5 text-xs font-medium text-red-400">
                  <span className="text-red-400/60">✗</span>
                  {row.before}
                </span>
              </div>

              {/* After */}
              <div className="w-44 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-green/8 border border-accent-green/20 px-3 py-1.5 text-xs font-medium text-accent-green">
                  <span className="text-accent-green/60">✓</span>
                  {row.after}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-card-border" />
          <p className="text-sm font-semibold text-white px-4">
            Your team saves <span className="text-accent-green">20–30 hours every week</span> — per person
          </p>
          <div className="h-px flex-1 bg-card-border" />
        </div>
      </div>
    </section>
  );
}
