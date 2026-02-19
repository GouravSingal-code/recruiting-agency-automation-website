const benchmarks = [
  { value: "24%", label: "more placements per recruiter", source: "Bullhorn", direction: "up" },
  { value: "85%", label: "reduction in time-to-hire", source: "Loxo", direction: "down" },
  { value: "3x", label: "recruiter productivity", source: "Recruiterflow", direction: "up" },
  { value: "70%", label: "less time on admin tasks", source: "Industry average", direction: "down" },
  { value: "$335k", label: "recovered revenue", source: "Bullhorn case study", direction: "up" },
];

export default function Results() {
  return (
    <section className="border-y border-card-border bg-card-bg/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Results Recruiting Agencies Get With Automation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Based on industry data from Bullhorn, Recruiterflow, and Loxo. We build the
            custom workflows that connect these tools together for even greater impact.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benchmarks.map((b) => (
            <div
              key={b.label}
              className="rounded-xl border border-card-border bg-background p-5 text-center transition-all hover:border-accent-blue/40"
            >
              <div className="flex items-center justify-center gap-1">
                <span className={b.direction === "up" ? "text-accent-green" : "text-accent-green"}>
                  {b.direction === "up" ? "↑" : "↓"}
                </span>
                <span className="text-2xl font-bold text-white">{b.value}</span>
              </div>
              <div className="mt-2 text-xs leading-relaxed text-muted">{b.label}</div>
              <div className="mt-1 text-[10px] text-accent-blue">{b.source}</div>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <div className="mx-auto mt-14 max-w-2xl rounded-xl border border-card-border bg-background p-8 text-center">
          <svg className="mx-auto h-8 w-8 text-accent-blue/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="mt-4 text-lg italic text-foreground">
            &ldquo;We were spending 15+ hours per week manually sourcing candidates and
            copying data to our ATS. Now it&apos;s automatic. Our recruiters focus on
            calls and interviews instead of admin work.&rdquo;
          </p>
          <div className="mt-4 text-sm text-muted">
            — Your Next Success Story
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-accent-green">
            <span>15 hrs/week saved</span>
            <span>·</span>
            <span>87% less data entry</span>
            <span>·</span>
            <span>3 extra placements/month</span>
          </div>
        </div>
      </div>
    </section>
  );
}
