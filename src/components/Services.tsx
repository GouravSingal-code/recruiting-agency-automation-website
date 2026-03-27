const plans = [
  {
    name: "Starter",
    tagline: "Try it on one role",
    description:
      "Give us one open role. We source, screen, and deliver 5–8 interview-ready candidates. See the quality before committing to more.",
    price: "$1,500",
    basis: "per role",
    delivery: "12–14 business days",
    includes: [
      "1 active role at a time",
      "5–8 shortlisted candidates",
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
      "Up to 5 active roles at a time, running in parallel. Consistent pipeline of interview-ready candidates every month.",
    price: "$3,500",
    basis: "per month",
    delivery: "Ongoing · 5–8 candidates per role",
    includes: [
      "Up to 5 active roles/month",
      "25–40 shortlisted candidates",
      "Priority turnaround",
      "Dedicated account manager",
      "Weekly pipeline report",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Scale",
    tagline: "High-volume or niche hiring",
    description:
      "Unlimited roles, custom sourcing strategies for hard-to-fill or specialist positions. Pricing based on your hiring volume.",
    price: "Custom",
    basis: "talk to us",
    delivery: "Tailored to your pipeline",
    includes: [
      "Unlimited active roles",
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
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            One service. Priced by how much you hire.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            You tell us who you need. We deliver interview-ready candidates. Pick the plan that matches your hiring volume.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-2xl border p-8 transition-all ${
                plan.highlight
                  ? "border-accent-blue bg-accent-blue/5 shadow-xl shadow-accent-blue/10"
                  : "border-card-border bg-card-bg hover:border-accent-blue/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent-blue px-4 py-1 text-xs font-semibold text-white whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/* Plan name + tagline */}
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-1">
                  {plan.name}
                </div>
                <h3 className="text-xl font-bold text-white">{plan.tagline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-card-border">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-muted mb-1">{plan.basis}</span>
                </div>
                <div className="mt-1 text-xs text-muted">{plan.delivery}</div>
              </div>

              {/* Includes */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-0.5 text-accent-green flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`block rounded-xl py-3.5 text-center text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-accent-blue text-white hover:bg-accent-blue/90"
                    : "border border-card-border text-foreground hover:border-accent-blue/50 hover:text-accent-blue"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-sm text-muted">
          Not sure which plan fits?{" "}
          <a href="#cta" className="text-accent-blue underline underline-offset-2 hover:text-accent-blue/80">
            Book a free 30-min call
          </a>{" "}
          and we&apos;ll tell you exactly what you need.
        </p>
      </div>
    </section>
  );
}
