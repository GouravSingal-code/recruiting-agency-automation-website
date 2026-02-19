const atsLogos = [
  "Bullhorn", "Recruiterflow", "Loxo", "JobAdder", "Crelate",
  "Zoho Recruit", "Greenhouse", "Lever", "Vincere",
];

const toolCategories = [
  { category: "Sourcing", tools: "LinkedIn Recruiter · Indeed · Dice · ZipRecruiter" },
  { category: "Communication", tools: "Gmail · Outlook · Twilio SMS · Slack · Teams" },
  { category: "Scheduling", tools: "Calendly · Cal.com · Google Calendar" },
  { category: "Data", tools: "Google Sheets · Airtable · Looker Studio · Metabase" },
  { category: "Automation", tools: "Zapier · Make.com · n8n (self-hosted)" },
  { category: "Custom", tools: "Python · Node.js · REST APIs · Webhooks" },
];

export default function Integrations() {
  return (
    <section className="border-y border-card-border bg-card-bg/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Works With Your Existing ATS & Recruiting Tools
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            If your ATS has an API, we can integrate it.
          </p>
        </div>

        {/* ATS grid */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-4">
          {atsLogos.map((ats) => (
            <div
              key={ats}
              className="rounded-lg border border-card-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent-blue/50"
            >
              {ats}
            </div>
          ))}
        </div>

        {/* Tool categories */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolCategories.map((cat) => (
            <div key={cat.category} className="rounded-xl border border-card-border bg-background p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue">
                {cat.category}
              </div>
              <div className="mt-2 text-sm text-muted">{cat.tools}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
