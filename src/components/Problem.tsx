const painCards = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Roles Stay Open for Weeks",
    description:
      "Every unfilled position costs you productivity and revenue. The average time-to-hire is 40+ days — most of that is wasted waiting.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "Hours Wasted Screening the Wrong People",
    description:
      "Your team reads hundreds of CVs, interviews candidates who aren't a fit, and starts over. That time belongs on growing the business.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Job Boards Flood You With Noise",
    description:
      "Post a role and get 300 applications — 280 irrelevant. Sorting through them manually is a full-time job nobody signed up for.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Hard-to-Fill Roles Drag On Forever",
    description:
      "Specialist or niche roles can take 3–6 months with traditional methods. The right candidate exists — finding them is the problem.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3">
            The Problem
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Hiring is slow, noisy, and eats your team&apos;s time.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Most companies spend weeks just getting to a shortlist — and still end up interviewing the wrong people. We fix that.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {painCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent-blue/50 hover:bg-card-bg/80"
            >
              <div className="text-accent-blue">{card.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
