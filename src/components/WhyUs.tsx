'use client';

import { useEffect, useRef } from 'react';

const steps = [
  { step: "01", title: "Share your job description", description: "Just send us the role. That's all we need to start.", icon: "📄" },
  { step: "02", title: "We build the search", description: "We turn your JD into a precision LinkedIn search — automatically pulling every signal that matters.", icon: "🔍" },
  { step: "03", title: "Hundreds of profiles surface", description: "The search runs. We pull the most relevant candidates from LinkedIn and other sources instantly.", icon: "⚡" },
  { step: "04", title: "AI filters the list", description: "Every profile goes through our filters. Only the strongest candidates make the cut — the rest are dropped.", icon: "🤖" },
  { step: "05", title: "We reach out to each one", description: "Personalised messages go out to every shortlisted candidate on LinkedIn and email — automatically.", icon: "✉️" },
  { step: "06", title: "Every resume is scored", description: "We score each resume against your JD. The best matches rise to the top so you always see them first.", icon: "📊" },
  { step: "07", title: "We send scheduling links", description: "Top candidates get a link to book their slot. They pick the time. It lands straight in your calendar.", icon: "📅" },
  { step: "08", title: "AI runs the intro call", description: "Our AI conducts a live intro call with each candidate — assessing their fit, motivation, and availability before they ever reach you.", icon: "🎙️" },
  { step: "09", title: "You get a ready shortlist", description: "A shortlist of screened, scored, interviewed, and scheduled candidates — ready for your main interviews. Nothing else to do.", icon: "✅" },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the line
            if (lineRef.current) {
              lineRef.current.style.animation = 'draw-line 1.8s ease forwards';
            }
            // Animate each step with stagger
            stepRefs.current.forEach((el, i) => {
              if (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateX(0)';
                el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative border-y border-card-border py-20 md:py-28 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 animated-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-card-bg/20 via-card-bg/40 to-card-bg/20" />

      <div className="relative mx-auto max-w-4xl px-6">
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
          {/* Animated vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-card-border hidden md:block overflow-hidden">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-accent-blue via-accent-green to-accent-blue"
              style={{ transform: 'scaleY(0)', transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-3">
            {steps.map((s, i) => (
              <div
                key={s.step}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="relative flex items-start gap-5 rounded-xl border border-card-border bg-background px-6 py-5 md:ml-12 group hover:border-accent-blue/30 hover:bg-card-bg/60 cursor-default"
                style={{
                  opacity: 0,
                  transform: 'translateX(-20px)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                {/* Dot on the line */}
                <div className="absolute -left-[2.85rem] top-1/2 -translate-y-1/2 hidden md:flex">
                  <div className="relative h-5 w-5 items-center justify-center rounded-full bg-accent-blue/20 border border-accent-blue/40 flex">
                    <div className="h-2 w-2 rounded-full bg-accent-blue" />
                    {/* Ping ring */}
                    <div
                      className="absolute inset-0 rounded-full bg-accent-blue/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700"
                    />
                  </div>
                </div>

                <span className="flex-shrink-0 text-xl pt-0.5">{s.icon}</span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tracking-widest text-accent-blue/60">{s.step}</span>
                    <h3 className="text-base font-semibold text-white group-hover:text-accent-blue transition-colors duration-200">{s.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{s.description}</p>
                </div>

                {/* Arrow on hover */}
                <svg
                  className="h-4 w-4 text-accent-blue/0 group-hover:text-accent-blue/60 flex-shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
