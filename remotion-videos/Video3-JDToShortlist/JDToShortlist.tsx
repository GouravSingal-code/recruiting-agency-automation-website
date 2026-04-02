import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ─── Constants ────────────────────────────────────────────────────────────────
const BG = "#0A0A0A";
const PURPLE = "#8B5CF6";
const CYAN = "#00D4FF";
const GREEN = "#22C55E";
const RED = "#EF4444";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";
const CARD_BG = "#1A1A2E";
const CARD_BORDER = "#2A2A3E";

const GRADIENT = `linear-gradient(135deg, ${PURPLE}, ${CYAN})`;
const GRADIENT_TEXT_STYLE: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ─── Utility: animated counter ───────────────────────────────────────────────
function useCounter(
  frame: number,
  startFrame: number,
  endFrame: number,
  from: number,
  to: number,
): number {
  if (frame < startFrame) return from;
  if (frame >= endFrame) return to;
  const progress = (frame - startFrame) / (endFrame - startFrame);
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(from + (to - from) * eased);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const PipelineConnector: React.FC<{
  progress: number;
  top: number;
}> = ({ progress, top }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top,
      transform: "translateX(-50%)",
      width: 4,
      height: 60,
      background: CARD_BORDER,
      borderRadius: 2,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: "100%",
        height: `${progress * 100}%`,
        background: GRADIENT,
        borderRadius: 2,
      }}
    />
  </div>
);

const StageLabel: React.FC<{
  text: string;
  opacity: number;
  scale: number;
  icon: string;
}> = ({ text, opacity, scale, icon }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      opacity,
      transform: `scale(${scale})`,
      marginBottom: 20,
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: GRADIENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontSize: 36,
        fontWeight: 700,
        fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
        ...GRADIENT_TEXT_STYLE,
      }}
    >
      {text}
    </span>
  </div>
);

// ─── Scene 1: JD Card Drop (0-3s, frames 0-90) ─────────────────────────────
const Scene1_JDCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropY = spring({ frame, fps, from: -400, to: 0, config: { damping: 14, stiffness: 80 } });
  const cardOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const requirements = ["React & React Native", "TypeScript", "5+ years experience", "System Design"];
  const typingCharsPerFrame = 1.5;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          transform: `translateY(${dropY}px)`,
          opacity: cardOpacity,
          width: "100%",
          maxWidth: 900,
        }}
      >
        {/* JD Card */}
        <div
          style={{
            background: CARD_BG,
            border: `2px solid ${CARD_BORDER}`,
            borderRadius: 24,
            padding: 48,
            boxShadow: `0 0 60px rgba(139, 92, 246, 0.15)`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: RED,
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: "#FBBF24",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: GREEN,
              }}
            />
            <span
              style={{
                fontSize: 20,
                color: GRAY,
                marginLeft: 12,
                fontFamily: "SF Mono, monospace",
              }}
            >
              job-description.md
            </span>
          </div>

          <div style={{ height: 2, background: CARD_BORDER, margin: "16px 0 28px" }} />

          {/* Title */}
          <h2
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: WHITE,
              margin: 0,
              fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            }}
          >
            Senior React Developer
          </h2>
          <p
            style={{
              fontSize: 24,
              color: GRAY,
              margin: "8px 0 28px",
              fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            }}
          >
            Remote &bull; Full-time &bull; $150-180k
          </p>

          {/* Requirements with typing effect */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {requirements.map((req, i) => {
              const reqStartFrame = 20 + i * 12;
              const charsToShow = Math.max(
                0,
                Math.floor((frame - reqStartFrame) * typingCharsPerFrame),
              );
              const text = req.slice(0, Math.min(charsToShow, req.length));
              const showCursor = frame >= reqStartFrame && charsToShow <= req.length;
              const rowOpacity = interpolate(frame, [reqStartFrame, reqStartFrame + 5], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    opacity: rowOpacity,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      background: GRADIENT,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 28,
                      color: "#D1D5DB",
                      fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                    }}
                  >
                    {text}
                    {showCursor && (
                      <span
                        style={{
                          opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0,
                          color: CYAN,
                        }}
                      >
                        |
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Sourcing Agent (3-7s, frames 90-210) ──────────────────────────
const Scene2_Sourcing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const labelScale = spring({ frame, fps, from: 0.8, to: 1, config: { damping: 12 } });

  const counter = useCounter(frame, 15, 100, 0, 2847);

  // Profile cards scanning animation
  const profiles = [
    { name: "Sarah Chen", role: "Sr. React Dev", delay: 20 },
    { name: "Mike Johnson", role: "Frontend Lead", delay: 35 },
    { name: "Aisha Patel", role: "Full Stack Eng", delay: 50 },
    { name: "James Lee", role: "React Architect", delay: 65 },
    { name: "Emma Wilson", role: "Sr. Frontend", delay: 80 },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", padding: "80px 60px" }}>
      <StageLabel text="Sourcing Agent" opacity={labelOpacity} scale={labelScale} icon="🔍" />

      {/* Scanning visualization */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: 20,
        }}
      >
        {profiles.map((p, i) => {
          const cardProgress = interpolate(frame, [p.delay, p.delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const slideX = interpolate(cardProgress, [0, 1], [300, 0]);
          const scanLine = interpolate(frame, [p.delay + 10, p.delay + 25], [0, 100], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: 16,
                padding: "20px 28px",
                opacity: cardProgress,
                transform: `translateX(${slideX}px)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Scan line overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: `${scanLine}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)`,
                  borderRight: scanLine < 100 ? `2px solid ${PURPLE}` : "none",
                }}
              />

              {/* Avatar */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: `linear-gradient(135deg, ${PURPLE}40, ${CYAN}40)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                👤
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    color: WHITE,
                    fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: GRAY,
                    fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                  }}
                >
                  {p.role}
                </div>
              </div>

              {/* LinkedIn-style icon */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "#0A66C2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 900,
                  color: WHITE,
                  fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                }}
              >
                in
              </div>
            </div>
          );
        })}
      </div>

      {/* Counter */}
      <div
        style={{
          marginTop: 40,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 64,
            fontWeight: 800,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            ...GRADIENT_TEXT_STYLE,
          }}
        >
          {counter.toLocaleString()}
        </span>
        <div
          style={{
            fontSize: 24,
            color: GRAY,
            marginTop: 4,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
          }}
        >
          profiles scanned
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Outreach Agent (7-10s, frames 210-300) ────────────────────────
const Scene3_Outreach: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const labelScale = spring({ frame, fps, from: 0.8, to: 1, config: { damping: 12 } });

  const counter = useCounter(frame, 15, 75, 0, 312);

  // Message icons flying out
  const messages = Array.from({ length: 12 }, (_, i) => ({
    delay: 10 + i * 5,
    x: (Math.sin(i * 1.8) * 300),
    y: -200 - i * 60,
    rotation: Math.sin(i * 2.1) * 30,
    icon: i % 3 === 0 ? "📧" : i % 3 === 1 ? "💬" : "✉️",
  }));

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", padding: "80px 60px" }}>
      <StageLabel text="Outreach Agent" opacity={labelOpacity} scale={labelScale} icon="📨" />

      {/* Central compose area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          height: 800,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Message template card */}
        <div
          style={{
            background: CARD_BG,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 20,
            padding: "36px 40px",
            width: "85%",
            opacity: interpolate(frame, [5, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: GRAY,
              marginBottom: 12,
              fontFamily: "SF Mono, monospace",
            }}
          >
            Subject: Opportunity at [Company]
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#D1D5DB",
              lineHeight: 1.6,
              fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            }}
          >
            Hi {"{"}<span style={{ color: CYAN }}>name</span>{"}"}, I noticed your experience
            with {"{"}<span style={{ color: PURPLE }}>skill</span>{"}"} at {"{"}<span style={{ color: CYAN }}>company</span>{"}"}...
          </div>

          {/* Typing indicator */}
          <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: PURPLE,
                  opacity: interpolate(
                    Math.sin((frame + dot * 8) * 0.15),
                    [-1, 1],
                    [0.3, 1],
                  ),
                }}
              />
            ))}
          </div>
        </div>

        {/* Flying message icons */}
        {messages.map((m, i) => {
          const msgProgress = interpolate(frame, [m.delay, m.delay + 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const flyY = interpolate(msgProgress, [0, 1], [0, m.y]);
          const flyX = interpolate(msgProgress, [0, 1], [0, m.x]);
          const flyOpacity = interpolate(msgProgress, [0, 0.1, 0.7, 1], [0, 1, 1, 0]);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(${flyX}px, ${flyY}px) rotate(${m.rotation * msgProgress}deg)`,
                opacity: flyOpacity,
                fontSize: 36,
              }}
            >
              {m.icon}
            </div>
          );
        })}
      </div>

      {/* Counter */}
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            fontSize: 64,
            fontWeight: 800,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            ...GRADIENT_TEXT_STYLE,
          }}
        >
          {counter.toLocaleString()}
        </span>
        <div
          style={{
            fontSize: 24,
            color: GRAY,
            marginTop: 4,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
          }}
        >
          candidates contacted
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: AI Voice Screening (10-14s, frames 300-420) ───────────────────
const Scene4_Screening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const labelScale = spring({ frame, fps, from: 0.8, to: 1, config: { damping: 12 } });

  const screenedCount = useCounter(frame, 15, 90, 0, 47);
  const qualifiedCount = useCounter(frame, 50, 100, 0, 8);

  // Voice waveform bars
  const waveformBars = 24;

  // Candidate cards going through funnel
  const candidates = [
    { name: "S.C.", pass: true, delay: 25 },
    { name: "M.J.", pass: true, delay: 35 },
    { name: "R.K.", pass: false, delay: 45 },
    { name: "A.P.", pass: true, delay: 55 },
    { name: "D.W.", pass: false, delay: 65 },
    { name: "J.L.", pass: true, delay: 75 },
    { name: "L.M.", pass: false, delay: 82 },
    { name: "E.W.", pass: true, delay: 90 },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", padding: "80px 60px" }}>
      <StageLabel text="AI Voice Screening" opacity={labelOpacity} scale={labelScale} icon="🎙️" />

      {/* Phone + Waveform */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          marginBottom: 40,
          height: 120,
        }}
      >
        {/* Phone icon */}
        <div
          style={{
            fontSize: 52,
            opacity: interpolate(frame, [10, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          📞
        </div>

        {/* Waveform */}
        <div style={{ display: "flex", alignItems: "center", gap: 3, height: 80 }}>
          {Array.from({ length: waveformBars }, (_, i) => {
            const waveHeight =
              20 +
              Math.abs(Math.sin((frame * 0.12) + i * 0.6)) * 50 +
              Math.abs(Math.cos((frame * 0.08) + i * 0.9)) * 20;
            const barOpacity = interpolate(frame, [12 + i, 15 + i], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  width: 6,
                  height: waveHeight,
                  borderRadius: 3,
                  background: GRADIENT,
                  opacity: barOpacity,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Funnel visualization */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Funnel shape */}
        <svg
          width="500"
          height="200"
          viewBox="0 0 500 200"
          style={{
            position: "absolute",
            top: -10,
            opacity: interpolate(frame, [20, 35], [0, 0.15], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <polygon
            points="50,0 450,0 350,200 150,200"
            fill="url(#funnelGrad)"
          />
          <defs>
            <linearGradient id="funnelGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PURPLE} />
              <stop offset="100%" stopColor={CYAN} />
            </linearGradient>
          </defs>
        </svg>

        {/* Candidate cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            maxWidth: 700,
            position: "relative",
            zIndex: 1,
          }}
        >
          {candidates.map((c, i) => {
            const cardProgress = interpolate(frame, [c.delay, c.delay + 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const resultFrame = c.delay + 25;
            const showResult = frame >= resultFrame;
            const resultOpacity = interpolate(frame, [resultFrame, resultFrame + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const borderColor = showResult
              ? c.pass
                ? GREEN
                : RED
              : CARD_BORDER;

            return (
              <div
                key={i}
                style={{
                  background: CARD_BG,
                  border: `2px solid ${borderColor}`,
                  borderRadius: 14,
                  padding: "16px 24px",
                  opacity: cardProgress,
                  transform: `scale(${interpolate(cardProgress, [0, 1], [0.7, 1])})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "border-color 0.3s",
                  minWidth: 150,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    background: showResult
                      ? c.pass
                        ? `${GREEN}30`
                        : `${RED}30`
                      : `${PURPLE}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  {showResult ? (c.pass ? "✅" : "❌") : "👤"}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: WHITE,
                      fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                    }}
                  >
                    {c.name}
                  </div>
                  {showResult && (
                    <div
                      style={{
                        fontSize: 16,
                        color: c.pass ? GREEN : RED,
                        fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                        opacity: resultOpacity,
                        fontWeight: 600,
                      }}
                    >
                      {c.pass ? "Qualified" : "Not a fit"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Counter */}
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <span
          style={{
            fontSize: 52,
            fontWeight: 800,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            ...GRADIENT_TEXT_STYLE,
          }}
        >
          {screenedCount} screened
        </span>
        <span
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: GRAY,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            margin: "0 16px",
          }}
        >
          →
        </span>
        <span
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: GREEN,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
          }}
        >
          {qualifiedCount} qualified
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: Your Shortlist (14-17s, frames 420-510) ───────────────────────
const Scene5_Shortlist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const labelScale = spring({ frame, fps, from: 0.8, to: 1, config: { damping: 12 } });

  const candidates = [
    { name: "Sarah Chen", role: "Sr. React Developer", score: 9.2, delay: 10 },
    { name: "Aisha Patel", role: "Full Stack Engineer", score: 9.0, delay: 20 },
    { name: "James Lee", role: "React Architect", score: 8.8, delay: 30 },
    { name: "Emma Wilson", role: "Sr. Frontend Eng", score: 8.5, delay: 40 },
    { name: "Mike Johnson", role: "Frontend Lead", score: 8.3, delay: 50 },
    { name: "David Park", role: "React Developer", score: 8.1, delay: 60 },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", padding: "80px 60px" }}>
      <StageLabel text="Your Shortlist" opacity={labelOpacity} scale={labelScale} icon="📋" />

      <div
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: 10,
        }}
      >
        {candidates.map((c, i) => {
          const cardSpring = spring({
            frame: frame - c.delay,
            fps,
            from: 0,
            to: 1,
            config: { damping: 14, stiffness: 100 },
          });
          const slideX = interpolate(cardSpring, [0, 1], [400, 0]);
          const cardOpacity = interpolate(cardSpring, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

          const checkDelay = c.delay + 15;
          const checkScale = spring({
            frame: frame - checkDelay,
            fps,
            from: 0,
            to: 1,
            config: { damping: 10, stiffness: 150 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: 16,
                padding: "20px 28px",
                opacity: cardOpacity,
                transform: `translateX(${slideX}px)`,
              }}
            >
              {/* Rank */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${PURPLE}40, ${CYAN}40)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  color: WHITE,
                  fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                  flexShrink: 0,
                }}
              >
                #{i + 1}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: WHITE,
                    fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: GRAY,
                    fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                  }}
                >
                  {c.role}
                </div>
              </div>

              {/* Score */}
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  fontFamily: "SF Mono, monospace",
                  ...GRADIENT_TEXT_STYLE,
                }}
              >
                {c.score.toFixed(1)}
              </div>

              {/* Checkmark + Interview Ready */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transform: `scale(${checkScale})`,
                  opacity: frame >= checkDelay ? 1 : 0,
                }}
              >
                <div
                  style={{
                    background: GREEN,
                    borderRadius: 8,
                    padding: "6px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 16 }}>✓</span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: WHITE,
                      fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Interview Ready
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 6: Notification Popup (17-19s, frames 510-570) ───────────────────
const Scene6_Notification: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideY = spring({ frame, fps, from: -200, to: 0, config: { damping: 12, stiffness: 80 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.3, 0.6]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60 }}>
      <div
        style={{
          transform: `translateY(${slideY}px)`,
          opacity,
          width: "100%",
          maxWidth: 900,
        }}
      >
        {/* Notification card */}
        <div
          style={{
            background: CARD_BG,
            border: `2px solid ${GREEN}`,
            borderRadius: 24,
            padding: "48px 44px",
            boxShadow: `0 0 80px rgba(34, 197, 94, ${glowPulse})`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: `${GREEN}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
              }}
            >
              📬
            </div>
            <div>
              <div
                style={{
                  fontSize: 22,
                  color: GREEN,
                  fontWeight: 600,
                  fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                  marginBottom: 4,
                }}
              >
                Shortlisted.ai
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: GRAY,
                  fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                }}
              >
                Just now
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: WHITE,
              lineHeight: 1.4,
              fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            }}
          >
            Your shortlist is ready —{" "}
            <span style={{ color: GREEN }}>6 interview-ready candidates</span> for Senior React
            Developer
          </div>

          {/* Mini candidate preview */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 28,
            }}
          >
            {[9.2, 9.0, 8.8, 8.5, 8.3, 8.1].map((score, i) => {
              const chipDelay = 20 + i * 5;
              const chipScale = spring({
                frame: frame - chipDelay,
                fps,
                from: 0,
                to: 1,
                config: { damping: 10, stiffness: 120 },
              });

              return (
                <div
                  key={i}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${PURPLE}50, ${CYAN}50)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    color: WHITE,
                    fontFamily: "SF Mono, monospace",
                    transform: `scale(${chipScale})`,
                  }}
                >
                  {score.toFixed(1)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 7: End Screen (19-23s, frames 570-690) ───────────────────────────
const Scene7_EndScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const textY = spring({ frame, fps, from: 40, to: 0, config: { damping: 14 } });

  const brandOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const brandScale = spring({ frame: Math.max(0, frame - 25), fps, from: 0.8, to: 1, config: { damping: 12 } });

  const glowIntensity = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.15, 0.35]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        background: `radial-gradient(ellipse at center, rgba(139, 92, 246, ${glowIntensity}) 0%, ${BG} 70%)`,
      }}
    >
      {/* Main tagline */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: WHITE,
            lineHeight: 1.3,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            maxWidth: 800,
          }}
        >
          Drop a role.
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.3,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            maxWidth: 800,
            ...GRADIENT_TEXT_STYLE,
          }}
        >
          Get interview-ready candidates.
        </div>
      </div>

      {/* Brand */}
      <div
        style={{
          opacity: brandOpacity,
          transform: `scale(${brandScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            letterSpacing: -2,
            ...GRADIENT_TEXT_STYLE,
          }}
        >
          Shortlisted.ai
        </div>
        <div
          style={{
            fontSize: 24,
            color: GRAY,
            marginTop: 16,
            fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          AI-Powered Recruiting
        </div>
      </div>

      {/* Decorative gradient line */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: 200,
          height: 4,
          borderRadius: 2,
          background: GRADIENT,
          opacity: brandOpacity,
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Pipeline Progress Bar ──────────────────────────────────────────────────
const PipelineProgress: React.FC = () => {
  const frame = useCurrentFrame();

  const stages = [
    { label: "JD", endFrame: 90 },
    { label: "Source", endFrame: 210 },
    { label: "Outreach", endFrame: 300 },
    { label: "Screen", endFrame: 420 },
    { label: "Shortlist", endFrame: 510 },
  ];

  const overallProgress = interpolate(frame, [0, 510], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame >= 510) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 60,
        right: 60,
        zIndex: 10,
      }}
    >
      {/* Progress bar background */}
      <div
        style={{
          width: "100%",
          height: 6,
          background: CARD_BORDER,
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: `${overallProgress * 100}%`,
            height: "100%",
            background: GRADIENT,
            borderRadius: 3,
          }}
        />
      </div>

      {/* Stage labels */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {stages.map((s, i) => {
          const isActive = frame >= (i === 0 ? 0 : stages[i - 1].endFrame) && frame < s.endFrame;
          const isPast = frame >= s.endFrame;

          return (
            <div
              key={i}
              style={{
                fontSize: 16,
                fontWeight: isActive ? 700 : 500,
                color: isPast ? GREEN : isActive ? WHITE : GRAY,
                fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                transition: "color 0.3s",
              }}
            >
              {isPast ? "✓ " : ""}
              {s.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main Composition ────────────────────────────────────────────────────────
export const JDToShortlist: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Scene 1: JD Card Drop — 0-3s (frames 0-90) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1_JDCard />
      </Sequence>

      {/* Scene 2: Sourcing Agent — 3-7s (frames 90-210) */}
      <Sequence from={90} durationInFrames={120}>
        <Scene2_Sourcing />
      </Sequence>

      {/* Scene 3: Outreach Agent — 7-10s (frames 210-300) */}
      <Sequence from={210} durationInFrames={90}>
        <Scene3_Outreach />
      </Sequence>

      {/* Scene 4: AI Voice Screening — 10-14s (frames 300-420) */}
      <Sequence from={300} durationInFrames={120}>
        <Scene4_Screening />
      </Sequence>

      {/* Scene 5: Your Shortlist — 14-17s (frames 420-510) */}
      <Sequence from={420} durationInFrames={90}>
        <Scene5_Shortlist />
      </Sequence>

      {/* Scene 6: Notification — 17-19s (frames 510-570) */}
      <Sequence from={510} durationInFrames={60}>
        <Scene6_Notification />
      </Sequence>

      {/* Scene 7: End Screen — 19-23s (frames 570-690) */}
      <Sequence from={570} durationInFrames={120}>
        <Scene7_EndScreen />
      </Sequence>

      {/* Pipeline progress bar (visible during scenes 1-5) */}
      <PipelineProgress />
    </AbsoluteFill>
  );
};
