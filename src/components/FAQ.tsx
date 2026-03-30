"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do you replace our ATS?",
    a: "No. We integrate with your existing ATS (Bullhorn, Recruiterflow, Loxo, JobAdder, etc.) to make it work better. Your ATS handles 30% of your workflow — we automate the other 70%.",
  },
  {
    q: "How is this different from Bullhorn Automation (Herefish)?",
    a: "Bullhorn Automation works within Bullhorn only. We connect ACROSS all your tools — ATS + LinkedIn + Email + Invoicing + Reporting. Most agencies use 5-10 tools; ATS automation only covers 1.",
  },
  {
    q: "How long until we see ROI?",
    a: "At $199–$299 per role, a single successful placement ($20-50k fee) pays for dozens of roles. Most agencies see ROI after their very first hire through us.",
  },
  {
    q: "What if our recruiters are too busy to learn new tools?",
    a: "They don't learn anything new. Automation runs in the background. Candidates auto-populate in the ATS. We train your admins only.",
  },
  {
    q: "What ATS systems do you support?",
    a: "Bullhorn, Recruiterflow, Loxo, JobAdder, Crelate, Zoho Recruit, Greenhouse, Lever, Vincere, and most others with APIs.",
  },
  {
    q: "We tried automation before and it didn't work. What's different?",
    a: "Most generic automation fails because it doesn't understand recruiting. We ONLY work with recruiting agencies — we know ATS APIs, recruiting workflows, and the edge cases that break generic automations.",
  },
  {
    q: "Do you offer refunds?",
    a: "If we don't deliver the agreed-upon automation as specified in the proposal, yes. This has never happened — we only take projects we can deliver.",
  },
  {
    q: "Can you guarantee more placements?",
    a: "We guarantee time savings. When recruiters spend less time on admin and more time on calls, placements typically increase 10-30%. Industry data shows 24% more placements per recruiter with automation (Bullhorn).",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="border-y border-card-border bg-card-bg/30 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-xl border border-card-border bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-muted transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="border-t border-card-border px-6 py-4">
                  <p className="text-sm leading-relaxed text-muted">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
