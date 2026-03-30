export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-0">
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0 animated-grid" />

      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent-blue/10 blur-[160px] animate-pulse-glow"
          style={{ animation: 'pulse-glow 6s ease-in-out infinite' }} />
        <div className="absolute top-20 left-1/4 h-[300px] w-[400px] rounded-full bg-violet-600/6 blur-[120px]"
          style={{ animation: 'pulse-glow 8s ease-in-out infinite 2s' }} />
        <div className="absolute top-10 right-1/4 h-[250px] w-[350px] rounded-full bg-accent-green/5 blur-[100px]"
          style={{ animation: 'pulse-glow 10s ease-in-out infinite 4s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge + headline + sub + CTAs */}
        <div className="text-center mb-10">

          {/* Floating animated badge */}
          <div
            className="mx-auto inline-block rounded-full border border-accent-blue/40 bg-accent-blue/10 px-5 py-1.5 text-xs font-semibold text-accent-blue mb-6 animate-float"
            style={{
              boxShadow: '0 0 20px rgba(37,99,235,0.15)',
            }}
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-blue align-middle"
              style={{ animation: 'dot-ping 1.5s ease-in-out infinite' }} />
            For every company · Any industry · Any role
          </div>

          <h1
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl md:leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            We Source, Screen &amp; Deliver{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #2563eb, #10b981, #7c3aed, #2563eb)',
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 5s ease infinite',
              }}
            >
              Interview-Ready
            </span>{' '}
            Candidates
          </h1>

          <p
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted animate-fade-in-up"
            style={{ animationDelay: '0.25s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Share who you&apos;re looking for. We handle sourcing, screening, and scheduling —
            and hand you a shortlist of candidates ready for your interviews.
          </p>

          <div
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up"
            style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <a
              href="https://calendly.com/jhasaurav215/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer rounded-lg bg-accent-blue px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-blue/90 hover:scale-105"
              style={{
                boxShadow: '0 0 0 0 rgba(37,99,235,0.55)',
                animation: 'pulse-ring 2.5s ease-out infinite',
              }}
            >
              Contact Us
            </a>
            <a
              href="#problem"
              className="flex items-center gap-2 rounded-lg border border-card-border px-8 py-4 text-base font-medium text-muted transition-all hover:border-accent-blue/40 hover:text-foreground hover:scale-105"
            >
              See How It Works
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Video with glowing animated border */}
        <div
          className="rounded-t-2xl overflow-hidden border-b-0 animate-fade-in-up"
          style={{
            animationDelay: '0.55s', opacity: 0, animationFillMode: 'forwards',
            border: '1px solid rgba(37,99,235,0.25)',
            boxShadow: '0 0 0 1px rgba(37,99,235,0.1), 0 0 60px rgba(37,99,235,0.15), 0 32px 64px rgba(0,0,0,0.7)',
            animation: 'border-glow 3s ease-in-out infinite, fade-in-up 0.65s ease 0.55s forwards',
          }}
        >
          <video
            src="/shortlistedai.mp4"
            controls
            playsInline
            className="w-full block"
            style={{ display: 'block' }}
          />

          {/* Caption bar */}
          <div className="flex items-center justify-end px-5 py-3 border-t border-white/[0.05] bg-white/[0.02]">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
              For every company · Any industry · Any role
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
