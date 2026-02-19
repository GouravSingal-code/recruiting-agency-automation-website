const comparisonRows = [
  { factor: "Recruiting Expertise", freelancers: "None", diy: "None", generic: "Minimal", us: "Deep" },
  { factor: "Price", freelancers: "$200-5k", diy: "Free + time", generic: "$15k-100k", us: "$3.5k-25k" },
  { factor: "Delivery Speed", freelancers: "1-5 days", diy: "Weeks/months", generic: "4-12 weeks", us: "1-6 weeks" },
  { factor: "Ongoing Support", freelancers: "Rarely", diy: "You're alone", generic: "Expensive", us: "$1.5-3k/mo" },
  { factor: "Error Handling", freelancers: "Minimal", diy: "None", generic: "Good", us: "Built-in" },
  { factor: "Understands ATS", freelancers: "No", diy: "Surface-level", generic: "Maybe", us: "API-deep" },
  { factor: "Documentation", freelancers: "No", diy: "No", generic: "Yes", us: "Yes" },
  { factor: "Training", freelancers: "No", diy: "N/A", generic: "Yes", us: "Yes" },
];

const differentiators = [
  {
    title: "We ONLY Work With Recruiting Agencies",
    description:
      "Not a generalist. We understand placements, submittals, time-to-fill, split fees, VMS, MSP — not just Zapier.",
  },
  {
    title: "Software Engineer + Recruiting Expert",
    description:
      "Unlike Zapier consultants, we write custom code (Python, Node.js) when no-code tools hit their limits.",
  },
  {
    title: "Prove ROI Before You Commit",
    description:
      "Start with a $3,500 Quick Win (1 week). See results before investing $15-25k in full automation.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="border-y border-card-border bg-card-bg/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Why Recruiting Agencies Choose Us Over Freelancers, DIY&nbsp;Zapier, and Generic Agencies
          </h2>
        </div>

        {/* Comparison table */}
        <div className="mt-12 overflow-x-auto rounded-xl border border-card-border">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-card-border bg-card-bg">
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Factor</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-muted">Freelancers</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-muted">DIY Zapier</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-muted">Generic Agencies</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-accent-blue">Us</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.factor}
                  className={`border-b border-card-border/50 ${i % 2 === 0 ? "bg-background" : "bg-card-bg/30"}`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{row.factor}</td>
                  <td className="px-4 py-3 text-center text-sm text-muted">{row.freelancers}</td>
                  <td className="px-4 py-3 text-center text-sm text-muted">{row.diy}</td>
                  <td className="px-4 py-3 text-center text-sm text-muted">{row.generic}</td>
                  <td className="px-4 py-3 text-center text-sm font-semibold text-accent-green">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Differentiators */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {differentiators.map((diff, i) => (
            <div key={diff.title} className="rounded-xl border border-card-border bg-background p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/10 text-lg font-bold text-accent-blue">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{diff.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{diff.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
