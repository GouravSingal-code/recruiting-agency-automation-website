const steps = [
  {
    step: "01",
    title: "Share your job description",
    description: "Just send us the role. That's all we need to start.",
  },
  {
    step: "02",
    title: "We build the search",
    description: "We turn your JD into a precision LinkedIn search — automatically pulling every signal that matters.",
  },
  {
    step: "03",
    title: "Hundreds of profiles surface",
    description: "The search runs. We pull the most relevant candidates from LinkedIn and other sources instantly.",
  },
  {
    step: "04",
    title: "AI filters the list",
    description: "Every profile goes through our filters. Only the strongest candidates make the cut — the rest are dropped.",
  },
  {
    step: "05",
    title: "We reach out to each one",
    description: "Personalised messages go out to every shortlisted candidate on LinkedIn and email — automatically.",
  },
  {
    step: "06",
    title: "Every resume is scored",
    description: "We score each resume against your JD. The best matches rise to the top so you always see them first.",
  },
  {
    step: "07",
    title: "We send scheduling links",
    description: "Top candidates get a link to book their slot. They pick the time. It lands straight in your calendar.",
  },
  {
    step: "08",
    title: "AI runs the intro call",
    description: "Our AI conducts a live intro call with each candidate — assessing their fit, motivation, and availability before they ever reach you.",
  },
  {
    step: "09",
    title: "You get a ready shortlist",
    description: "A shortlist of screened, scored, interviewed, and scheduled candidates — ready for your main interviews. Nothing else to do.",
  },
];

export default function WhyUs() {
  return (
    <section id="how-it-works" className="border-y border-card-border bg-card-bg/30 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3">
            How It Works
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            You tell us who you need.<br />We do everything else.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted text-base">
            From sourcing to scheduling — we handle the entire process and hand you candidates ready to interview.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-card-border hidden md:block" />

          <div className="space-y-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative flex items-start gap-5 rounded-xl border border-card-border bg-background px-6 py-5 transition-all hover:border-accent-blue/30 md:ml-12"
              >
                {/* Step dot on the line */}
                <div className="absolute -left-[2.85rem] top-1/2 -translate-y-1/2 hidden md:flex h-5 w-5 items-center justify-center rounded-full bg-accent-blue/20 border border-accent-blue/40">
                  <div className="h-2 w-2 rounded-full bg-accent-blue" />
                </div>

                <span className="flex-shrink-0 text-xs font-bold tracking-widest text-accent-blue pt-0.5 w-8">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
