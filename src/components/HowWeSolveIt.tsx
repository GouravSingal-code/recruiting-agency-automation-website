'use client';

import { useRef, useState, useEffect } from 'react';

export default function HowWeSolveIt() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function scale() {
      if (!outerRef.current || !innerRef.current) return;
      const w = outerRef.current.clientWidth;
      const s = w / 1280;
      innerRef.current.style.transform = `scale(${s})`;
      outerRef.current.style.height = `${720 * s}px`;
    }
    scale();
    window.addEventListener('resize', scale);
    return () => window.removeEventListener('resize', scale);
  }, []);

  function iframeWin() {
    return iframeRef.current?.contentWindow as (Window & { togglePlay?: () => void; restartDemo?: () => void }) | null;
  }

  function handleStart() {
    setStarted(true);
    setPlaying(true);
    setTimeout(() => {
      try {
        const stage = iframeRef.current?.contentDocument?.getElementById('stage');
        if (stage) stage.click();
      } catch { /* same-origin guard */ }
    }, 120);
  }

  function handlePlayPause() {
    try {
      iframeWin()?.togglePlay?.();
      setPlaying((p) => !p);
    } catch { /* guard */ }
  }

  function handleRestart() {
    try {
      iframeWin()?.restartDemo?.();
      setPlaying(true);
    } catch { /* guard */ }
  }

  return (
    <section className="border-y border-card-border bg-card-bg/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[2.5px] uppercase text-accent-blue mb-3">
            This Is How We Do It
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            From job description to shortlisted candidates.{' '}
            <span className="text-accent-blue">Fully automated.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            We don&apos;t hand you a playbook and leave. We build the automation end to end,
            connected to your ATS and tools. Click below to see a live walkthrough of what we deploy.
          </p>
        </div>

        {/* Demo frame */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(37,99,235,0.12),0_32px_64px_rgba(0,0,0,0.6)]">
          <div className="relative" ref={outerRef}>
            {/* Scaled iframe */}
            <div ref={innerRef} style={{ width: 1280, height: 720, transformOrigin: 'top left' }}>
              <iframe
                ref={iframeRef}
                src="/hiring-demo.html"
                width={1280}
                height={720}
                scrolling="no"
                title="Automated recruiting pipeline demo"
                style={{ display: 'block', border: 'none' }}
              />
            </div>

            {/* Click-to-start overlay */}
            {!started && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
                style={{ background: 'rgba(7,7,15,0.72)', backdropFilter: 'blur(2px)' }}
                onClick={handleStart}
              >
                <div className="relative flex items-center justify-center mb-6">
                  <span
                    className="absolute rounded-full border border-accent-blue/30 animate-ping"
                    style={{ width: 88, height: 88 }}
                  />
                  <span
                    className="absolute rounded-full border border-accent-blue/20 animate-ping"
                    style={{ width: 112, height: 112, animationDelay: '0.3s' }}
                  />
                  <button
                    className="relative flex items-center justify-center rounded-full text-white font-bold text-xl"
                    style={{
                      width: 68,
                      height: 68,
                      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                      boxShadow: '0 0 36px rgba(37,99,235,0.55)',
                    }}
                    aria-label="Play demo"
                  >
                    ▶
                  </button>
                </div>
                <p className="text-white font-semibold text-base">Watch how we work</p>
                <p className="text-muted text-sm mt-1">Click to start — audio included</p>
              </div>
            )}
          </div>

          {/* Controls + caption bar */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/7 bg-white/[0.02]">
            {/* Playback controls — visible after demo starts */}
            <div className="flex items-center gap-2">
              {started ? (
                <>
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                  >
                    {playing ? '⏸ Pause' : '▶ Play'}
                  </button>
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      color: 'rgba(255,255,255,0.55)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  >
                    ↺ Restart
                  </button>
                </>
              ) : (
                <p className="text-xs text-white/25">Controls appear after you start the demo</p>
              )}
            </div>

            <p className="text-xs text-white/20 hidden md:block">
              Built with Make.com · LinkedIn · Bullhorn / Recruiterflow / Loxo
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4">
          {[
            { n: '01', title: 'Intake & JD Parsing', desc: 'Share your job description — we extract every hiring signal automatically.' },
            { n: '02', title: 'Automated Sourcing', desc: 'Boolean search runs across LinkedIn and your ATS. Hundreds of profiles, zero manual effort.' },
            { n: '03', title: 'AI Screening & Scoring', desc: 'Every profile scored against your JD. Personalised outreach goes out automatically.' },
            { n: '04', title: 'Shortlist Delivered', desc: 'Scheduled, screened, shortlisted. Your recruiter only touches interview-ready candidates.' },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-card-border bg-background p-5">
              <span className="text-xs font-bold tracking-widest text-accent-blue block mb-2">
                STEP {s.n}
              </span>
              <div className="text-sm font-semibold text-white mb-1">{s.title}</div>
              <div className="text-xs text-muted leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
