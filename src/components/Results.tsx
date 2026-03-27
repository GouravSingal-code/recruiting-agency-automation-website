'use client';

import { useEffect, useRef, useState } from 'react';

const benchmarks = [
  { value: "24%",   label: "more hires per recruiter",    source: "Bullhorn",        direction: "up",   raw: 24,   suffix: "%" },
  { value: "85%",   label: "faster time-to-hire",         source: "Loxo",            direction: "down", raw: 85,   suffix: "%" },
  { value: "3x",    label: "hiring team productivity",    source: "Recruiterflow",   direction: "up",   raw: 3,    suffix: "x" },
  { value: "70%",   label: "less time on admin",          source: "Industry avg",    direction: "down", raw: 70,   suffix: "%" },
  { value: "$335k", label: "recovered from stale pipelines", source: "Bullhorn",     direction: "up",   raw: 335,  suffix: "k", prefix: "$" },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatCard({ b, delay, active }: { b: typeof benchmarks[0]; delay: number; active: boolean }) {
  const count = useCountUp(b.raw, 1800, active);
  const display = b.prefix
    ? `${b.prefix}${count}${b.suffix}`
    : `${count}${b.suffix}`;

  return (
    <div
      className="group rounded-xl border border-card-border bg-background p-5 text-center transition-all duration-300 hover:border-accent-blue/40 hover:-translate-y-1.5 cursor-default"
      style={{
        opacity: 0,
        animation: active ? `fade-in-up 0.6s ease ${delay}s forwards` : 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span
          className="text-lg font-bold"
          style={{ color: b.direction === 'up' ? '#10b981' : '#60a5fa' }}
        >
          {b.direction === 'up' ? '↑' : '↓'}
        </span>
        <span className="text-2xl font-bold text-white tabular-nums">{active ? display : b.value}</span>
      </div>
      <div className="text-xs leading-relaxed text-muted">{b.label}</div>
      <div className="mt-1.5 text-[10px] font-semibold text-accent-blue/60 uppercase tracking-wider">{b.source}</div>
    </div>
  );
}

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative border-y border-card-border py-20 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-accent-blue/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3"
            style={{ opacity: 0, animation: 'fade-in 0.5s ease 0.1s forwards' }}>
            Industry Benchmarks
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl"
            style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.2s forwards' }}>
            What companies like yours are getting
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted"
            style={{ opacity: 0, animation: 'fade-in-up 0.6s ease 0.3s forwards' }}>
            Based on published data from Bullhorn, Recruiterflow, and Loxo — companies
            using automated hiring pipelines consistently report these outcomes.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benchmarks.map((b, i) => (
            <div key={b.label} className="relative">
              <StatCard b={b} delay={0.1 + i * 0.1} active={active} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
