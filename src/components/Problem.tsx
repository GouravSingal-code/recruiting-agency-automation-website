const painCards = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Candidates Fall Through the Cracks",
    description:
      "No automated follow-up = 10-30% of candidates lost. Your competitors respond faster and win the placement.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "Copy-Paste Between 5-10 Tools",
    description:
      "LinkedIn → ATS → Email → Spreadsheet → Slack. Manual data entry wastes 15+ hours/week per recruiter.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Submittals Take Hours, Not Minutes",
    description:
      "Formatting candidate profiles, generating PDFs, sending to clients manually. Every hour lost = placement lost.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "You Can't Scale Without Hiring",
    description:
      "Each new recruiter costs $50-80k/year. Automation lets you do more with your current team.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Your Recruiters Spend{" "}
            <span className="text-accent-amber">70%</span> of Their Time on
            Admin — Not Recruiting
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            The average recruiter spends just 30% of their day on actual recruiting.
            The rest? Data entry, follow-ups, submittals, and reporting.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {painCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent-blue/50 hover:bg-card-bg/80"
            >
              <div className="text-accent-blue transition-colors group-hover:text-accent-blue">
                {card.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
