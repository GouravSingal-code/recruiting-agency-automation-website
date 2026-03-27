export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-0">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent-blue/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge + headline + sub + CTAs */}
        <div className="text-center mb-10">
          <div className="mx-auto inline-block rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-xs font-medium text-accent-blue mb-5">
            For every company · Any industry · Any role
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl md:leading-tight">
            We Source, Screen & Deliver{' '}
            <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
              Interview-Ready
            </span>{' '}
            Candidates
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Share who you&apos;re looking for. We handle sourcing, screening, and scheduling —
            and hand you a shortlist of candidates ready for your interviews.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://calendly.com/YOUR_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent-blue px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all hover:bg-accent-blue/90"
            >
              Contact Us
            </a>
            <a
              href="#problem"
              className="flex items-center gap-2 rounded-lg border border-card-border px-8 py-4 text-base font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              See How It Works
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>

        {/* YouTube video embed */}
        <div className="rounded-t-2xl overflow-hidden border border-white/10 border-b-0 shadow-[0_0_100px_rgba(37,99,235,0.15),0_32px_64px_rgba(0,0,0,0.7)]">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/CJozTW0Nhso?autoplay=0&rel=0&modestbranding=1"
              title="Shortlisted.ai — Automated Hiring Pipeline Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                border: 'none',
              }}
            />
          </div>

          {/* Caption bar */}
          <div className="flex items-center justify-end px-5 py-3 border-t border-white/7 bg-white/[0.025]">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
              For every company · Any industry · Any role
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
