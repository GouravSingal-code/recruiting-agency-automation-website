'use client';

const plans = [
  {
    name: "Starter",
    tagline: "Test the waters",
    description:
      "Hand us 1–2 open roles. We source, screen, and deliver 5–8 interview-ready candidates per role. See the quality before scaling up.",
    price: "$299",
    basis: "per role",
    delivery: "10–12 business days",
    includes: [
      "1–2 active roles",
      "5–8 shortlisted candidates per role",
      "Screened & ranked by fit",
      "Scheduling links sent",
      "Interview brief per candidate",
    ],
    cta: "Start with One Role",
    highlight: false,
  },
  {
    name: "Growth",
    tagline: "For teams hiring regularly",
    description:
      "Commit to 3–10 roles and get a lower per-role rate. Parallel pipelines with priority turnaround and a dedicated account manager.",
    price: "$249",
    basis: "per role · 3–10 roles",
    delivery: "7–10 business days per role",
    includes: [
      "3–10 active roles",
      "5–8 shortlisted candidates per role",
      "Priority turnaround",
      "Dedicated account manager",
      "Weekly pipeline report",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Scale",
    tagline: "Best value for volume hiring",
    description:
      "10+ roles at the lowest per-role rate. Custom sourcing strategies for hard-to-fill or specialist positions.",
    price: "$199",
    basis: "per role · 10+ roles",
    delivery: "7–10 business days per role",
    includes: [
      "10+ active roles",
      "Specialist & niche sourcing",
      "Custom screening criteria",
      "Direct Slack / Teams access",
      "SLA-backed delivery",
    ],
    cta: "Talk to Us",
    highlight: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3"
            style={{ opacity: 0, animation: 'fade-in 0.5s ease 0.1s forwards' }}>
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl"
            style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.2s forwards' }}>
            Simple per-role pricing. No monthly lock-in.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted"
            style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.3s forwards' }}>
            You tell us who you need. We deliver interview-ready candidates. The more roles you hire for, the less you pay per role.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'glow-card-popular hover:-translate-y-2'
                  : 'border border-card-border bg-card-bg hover:border-white/20 hover:-translate-y-1'
              }`}
              style={{
                opacity: 0,
                animation: `fade-in-up 0.65s ease ${0.15 + i * 0.12}s forwards`,
                ...(plan.highlight ? {
                  background: 'linear-gradient(135deg, #0f1729 0%, #0a0f1e 100%)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                } : {
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }),
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent-blue px-5 py-1 text-xs font-bold text-white whitespace-nowrap tracking-wide"
                  style={{ boxShadow: '0 0 20px rgba(37,99,235,0.5)' }}
                >
                  ✦ Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-1">{plan.name}</div>
                <h3 className="text-xl font-bold text-white">{plan.tagline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{plan.description}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-card-border">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-muted mb-1">{plan.basis}</span>
                </div>
                <div className="mt-1 text-xs text-muted">{plan.delivery}</div>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.includes.map((item, j) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted"
                    style={{
                      opacity: 0,
                      animation: `fade-in-up 0.4s ease ${0.3 + i * 0.12 + j * 0.06}s forwards`,
                    }}
                  >
                    <span className="mt-0.5 text-accent-green flex-shrink-0 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`btn-shimmer block rounded-xl py-3.5 text-center text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  plan.highlight
                    ? 'bg-accent-blue text-white hover:bg-accent-blue/90'
                    : 'border border-card-border text-foreground hover:border-accent-blue/50 hover:text-accent-blue'
                }`}
                style={plan.highlight ? { boxShadow: '0 0 20px rgba(37,99,235,0.3)' } : {}}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted"
          style={{ opacity: 0, animation: 'fade-in 0.5s ease 0.6s forwards' }}>
          Not sure which plan fits?{' '}
          <a href="#cta" className="text-accent-blue underline underline-offset-2 hover:text-accent-blue/80 transition-colors">
            Book a free 30-min call
          </a>{' '}
          and we&apos;ll tell you exactly what you need.
        </p>
      </div>
    </section>
  );
}
