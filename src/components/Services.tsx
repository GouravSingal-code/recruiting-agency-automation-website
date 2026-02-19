const services = [
  {
    tier: "Free",
    name: "Recruiting Automation Audit",
    description:
      "30-minute call to map your recruiting workflow and identify 2-3 automation opportunities with estimated time savings.",
    price: "Free",
    details: "30 Minutes · No Obligation",
    cta: "Book Your Audit",
    href: "#cta",
    highlight: false,
  },
  {
    tier: "Quick Win",
    name: "Automate Your #1 Pain Point",
    description:
      "Candidate sourcing, submittal generation, or interview scheduling — pick your biggest time-waster and we'll automate it.",
    price: "$3,500",
    details: "1 Week Delivery · 2 Weeks Support",
    cta: "Start with a Quick Win",
    href: "#cta",
    highlight: false,
  },
  {
    tier: "Full Workflow",
    name: "End-to-End Recruiting Automation",
    description:
      "Sourcing → Screening → Submittal → Placement → Reporting. Your entire recruitment pipeline, automated across all your tools.",
    price: "$15k-$25k",
    details: "4-6 Weeks · 30 Days Support",
    cta: "Discuss Your Project",
    href: "#cta",
    highlight: true,
  },
  {
    tier: "Ongoing",
    name: "Optimization & Support",
    description:
      "We monitor, maintain, and improve your automations as you scale. New integrations, performance optimization, priority support.",
    price: "$1.5-3k/mo",
    details: "10-15 hrs/month",
    cta: "Add Ongoing Support",
    href: "#cta",
    highlight: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Recruiting Automation Services — From Quick Wins to Full Workflow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Four ways to work together, depending on where you are.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.name}
              className={`group relative flex flex-col rounded-xl border p-6 transition-all ${
                service.highlight
                  ? "border-accent-blue bg-accent-blue/5 shadow-lg shadow-accent-blue/10"
                  : "border-card-border bg-card-bg hover:border-accent-blue/30"
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-blue px-3 py-0.5 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="text-xs font-medium uppercase tracking-wider text-accent-blue">
                {service.tier}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{service.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {service.description}
              </p>

              <div className="mt-6">
                <div className="text-2xl font-bold text-white">{service.price}</div>
                <div className="mt-1 text-xs text-muted">{service.details}</div>
              </div>

              <a
                href={service.href}
                className={`mt-6 block rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                  service.highlight
                    ? "bg-accent-blue text-white hover:bg-accent-blue/90"
                    : "border border-card-border text-foreground hover:border-accent-blue/50 hover:text-accent-blue"
                }`}
              >
                {service.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
