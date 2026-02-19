const demos = [
  {
    title: "Candidate Sourcing Automation",
    description: "LinkedIn → ATS auto-import with deduplication, enrichment, and auto-outreach sequences.",
    tag: "Sourcing",
    status: "Coming Soon",
  },
  {
    title: "Client Submittal Generator",
    description: "One-click branded PDF submittals generated from ATS data with tracking and follow-up.",
    tag: "Submittals",
    status: "Coming Soon",
  },
  {
    title: "ROI Calculator for Agencies",
    description: "Interactive tool that calculates exact time savings and revenue impact of automation.",
    tag: "Tool",
    status: "Live Above",
  },
  {
    title: "Follow-Up Sequence Engine",
    description: "Multi-channel auto follow-up at Day 3, 7, 14 across email, LinkedIn, and SMS.",
    tag: "Outreach",
    status: "Coming Soon",
  },
  {
    title: "Recruiting Dashboard",
    description: "Real-time placement tracking, recruiter KPIs, pipeline health, and revenue forecasting.",
    tag: "Reporting",
    status: "Coming Soon",
  },
  {
    title: "Communication Agent",
    description: "Multi-party communication hub — candidate updates, client updates, recruiter notifications, scheduling.",
    tag: "Communication",
    status: "Coming Soon",
  },
];

export default function DemoProjects() {
  return (
    <section id="demos" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Demo Projects — See What We Build
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Live demos of the exact automations we build for recruiting agencies.
            Each project showcases a real workflow with real results.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <div
              key={demo.title}
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent-blue/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
                  {demo.tag}
                </span>
                <span className={`text-xs font-medium ${demo.status === "Live Above" ? "text-accent-green" : "text-muted"}`}>
                  {demo.status}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{demo.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{demo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
