'use client';

import { useRef } from 'react';

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
    color: '#ef4444',
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
    color: '#f59e0b',
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
    color: '#7c3aed',
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
    color: '#2563eb',
  },
];

function SpotlightCard({ card, delay }: { card: typeof painCards[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="spotlight-card group rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-white/20 hover:-translate-y-1.5"
      style={{
        opacity: 0,
        animation: `fade-in-up 0.6s ease ${delay}s forwards`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="inline-flex rounded-xl p-2.5 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${card.color}18`,
          color: card.color,
          boxShadow: `0 0 0 1px ${card.color}35`,
        }}
      >
        {card.icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
      <div
        className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${card.color}70, transparent)` }}
      />
    </div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3"
            style={{ opacity: 0, animation: 'fade-in 0.5s ease 0.1s forwards' }}>
            The Problem
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl"
            style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.2s forwards' }}>
            Hiring is slow, noisy, and eats your team&apos;s time.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted"
            style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.3s forwards' }}>
            Most companies spend weeks just getting to a shortlist — and still end up interviewing the wrong people. We fix that.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {painCards.map((card, i) => (
            <SpotlightCard key={card.title} card={card} delay={0.15 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
