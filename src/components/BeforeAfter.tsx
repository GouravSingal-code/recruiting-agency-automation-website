const rows = [
  { task: "Add candidate to ATS", before: "5 min/candidate", after: "10 seconds" },
  { task: "Candidate outreach", before: "30 min/candidate", after: "10 seconds" },
  { task: "Log recruiter activity", before: "1 min/activity", after: "0 sec (auto)" },
  { task: "Generate submittal", before: "20 min/submittal", after: "1 click" },
  { task: "Follow-up on ghosted", before: "Forgot entirely", after: "Auto at Day 3, 7, 14" },
  { task: "Weekly placement report", before: "1 hour/report", after: "5 min (auto)" },
  { task: "Duplicate detection", before: "None (chaos)", after: "Instant (auto)" },
  { task: "Database maintenance", before: "4 days/year", after: "0 days (auto)" },
];

export default function BeforeAfter() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Manual vs. Automated: The Recruiting Workflow Comparison
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            See the real difference automation makes across every part of your recruiting workflow.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-card-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border bg-card-bg">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Task</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Before (Manual)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-accent-green">After (Automated)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.task}
                  className={`border-b border-card-border/50 ${i % 2 === 0 ? "bg-background" : "bg-card-bg/30"}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{row.task}</td>
                  <td className="px-6 py-4 text-sm text-red-400/80">{row.before}</td>
                  <td className="px-6 py-4 text-sm text-accent-green">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-accent-amber">
            Total: Save 20-30 hours/week per recruiter
          </p>
        </div>
      </div>
    </section>
  );
}
