const benchmarks = [
  { value: "24%", label: "more hires per recruiter", source: "Bullhorn", direction: "up" },
  { value: "85%", label: "faster time-to-hire", source: "Loxo", direction: "down" },
  { value: "3x", label: "hiring team productivity", source: "Recruiterflow", direction: "up" },
  { value: "70%", label: "less time on admin", source: "Industry average", direction: "down" },
  { value: "$335k", label: "recovered from stale pipelines", source: "Bullhorn", direction: "up" },
];

export default function Results() {
  return (
    <section className="border-y border-card-border bg-card-bg/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3">
            Industry Benchmarks
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            What companies like yours are getting
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Based on published data from Bullhorn, Recruiterflow, and Loxo — companies
            using automated hiring pipelines consistently report these outcomes.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benchmarks.map((b) => (
            <div
              key={b.label}
              className="rounded-xl border border-card-border bg-background p-5 text-center transition-all hover:border-accent-blue/40"
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-accent-green">
                  {b.direction === "up" ? "↑" : "↓"}
                </span>
                <span className="text-2xl font-bold text-white">{b.value}</span>
              </div>
              <div className="mt-2 text-xs leading-relaxed text-muted">{b.label}</div>
              <div className="mt-1 text-[10px] text-accent-blue/70">{b.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
