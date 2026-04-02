import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ─── Color Palette ───────────────────────────────────────────────
const BG = "#0A0A0A";
const CYAN = "#00D4FF";
const CYAN_DIM = "rgba(0,212,255,0.15)";
const CYAN_GLOW = "rgba(0,212,255,0.35)";
const WHITE = "#FFFFFF";
const WHITE_DIM = "rgba(255,255,255,0.5)";
const GREEN = "#00FF88";
const RED = "#FF4466";
const SURFACE = "rgba(255,255,255,0.06)";
const SURFACE_BORDER = "rgba(255,255,255,0.1)";

// ─── Helpers ─────────────────────────────────────────────────────
const glowStyle = (color: string, radius = 20): React.CSSProperties => ({
  filter: `drop-shadow(0 0 ${radius}px ${color})`,
});

const cardStyle: React.CSSProperties = {
  background: SURFACE,
  border: `1px solid ${SURFACE_BORDER}`,
  borderRadius: 20,
  padding: "28px 32px",
};

// ─── Scene 1: Phone Ringing (0-90 frames / 0-3s) ────────────────
const PhoneRinging: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ringPulse = Math.sin(frame * 0.5) * 0.5 + 0.5;
  const slideUp = interpolate(frame, [0, 20], [80, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const ringScale = 1 + ringPulse * 0.08;
  const iconShake = Math.sin(frame * 1.2) * (frame < 70 ? 8 : 0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      {/* Radial pulse rings */}
      {[0, 1, 2].map((i) => {
        const pulseFrame = (frame - i * 12) % 60;
        const scale = interpolate(pulseFrame, [0, 60], [0.5, 2.5], { extrapolateRight: "clamp" });
        const pulseOpacity = interpolate(pulseFrame, [0, 60], [0.4, 0], { extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: `2px solid ${CYAN}`,
              transform: `scale(${scale})`,
              opacity: pulseOpacity,
            }}
          />
        );
      })}

      <div
        style={{
          transform: `translateY(${slideUp}px)`,
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Phone icon */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${CYAN}, #0088CC)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${ringScale}) rotate(${iconShake}deg)`,
            ...glowStyle(CYAN, 30),
          }}
        >
          <span style={{ fontSize: 56 }}>📞</span>
        </div>

        {/* Caller info */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: CYAN,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Incoming Call
          </div>
          <div
            style={{
              color: WHITE,
              fontSize: 42,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Shortlisted AI Agent
          </div>
          <div style={{ color: WHITE_DIM, fontSize: 24, marginBottom: 40 }}>
            calling
          </div>
          <div
            style={{
              ...cardStyle,
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "20px 32px",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: `linear-gradient(135deg, #667eea, #764ba2)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: WHITE,
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              SC
            </div>
            <div>
              <div style={{ color: WHITE, fontSize: 26, fontWeight: 600 }}>
                Sarah Chen
              </div>
              <div style={{ color: CYAN, fontSize: 18 }}>
                Senior React Developer
              </div>
            </div>
          </div>
        </div>

        {/* Accept / Decline buttons */}
        <div style={{ display: "flex", gap: 60, marginTop: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: RED,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              opacity: interpolate(frame, [70, 80], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            ✕
          </div>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: GREEN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              transform: `scale(${interpolate(frame, [70, 85], [1, 1.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              ...glowStyle(GREEN, frame > 70 ? 25 : 0),
            }}
          >
            ✓
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Call Connected + Waveform (frames 90-210 / 3-7s) ──
const CallConnected: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const message = "Hi Sarah, I'm calling from Shortlisted AI to discuss the Senior Frontend role...";
  const charsToShow = Math.floor(
    interpolate(frame, [30, 100], [0, message.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const BARS = 32;
  const barWidth = 12;
  const barGap = 6;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        opacity: fadeIn,
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${CYAN}, #0088CC)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            ...glowStyle(CYAN, 20),
          }}
        >
          🤖
        </div>
        <div style={{ color: WHITE, fontSize: 32, fontWeight: 700 }}>
          Shortlisted AI Agent
        </div>
        <div style={{ color: GREEN, fontSize: 20, fontWeight: 500 }}>
          ● Connected
        </div>
        <div style={{ color: WHITE_DIM, fontSize: 18 }}>
          {`${Math.floor(frame / fps)}:${String(Math.floor((frame % fps) * (60 / fps))).padStart(2, "0")}`}
        </div>
      </div>

      {/* Waveform visualizer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: barGap,
          height: 200,
          marginTop: -40,
        }}
      >
        {Array.from({ length: BARS }).map((_, i) => {
          const amplitude =
            Math.sin(frame * 0.15 + i * 0.4) * 0.4 +
            Math.sin(frame * 0.08 + i * 0.7) * 0.3 +
            0.5;
          const height = amplitude * 140 + 10;
          const barOpacity = interpolate(
            Math.abs(i - BARS / 2),
            [0, BARS / 2],
            [1, 0.3],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                width: barWidth,
                height,
                borderRadius: barWidth / 2,
                background: `linear-gradient(180deg, ${CYAN}, rgba(0,212,255,0.3))`,
                opacity: barOpacity,
                transition: "height 0.05s",
              }}
            />
          );
        })}
      </div>

      {/* Transcription bubble */}
      <div
        style={{
          position: "absolute",
          bottom: 350,
          left: 60,
          right: 60,
          ...cardStyle,
          borderColor: CYAN_DIM,
        }}
      >
        <div style={{ color: CYAN, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
          AI AGENT SPEAKING
        </div>
        <div style={{ color: WHITE, fontSize: 26, lineHeight: 1.5, fontWeight: 400 }}>
          {message.slice(0, charsToShow)}
          <span
            style={{
              opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
              color: CYAN,
            }}
          >
            |
          </span>
        </div>
      </div>

      {/* Candidate info bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: SURFACE,
          borderRadius: 14,
          border: `1px solid ${SURFACE_BORDER}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: WHITE,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            SC
          </div>
          <div>
            <div style={{ color: WHITE, fontSize: 20, fontWeight: 600 }}>Sarah Chen</div>
            <div style={{ color: WHITE_DIM, fontSize: 15 }}>Sr. React Developer</div>
          </div>
        </div>
        <div style={{ color: CYAN, fontSize: 16, fontWeight: 600 }}>SCREENING IN PROGRESS</div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Identity Verification (frames 210-300 / 7-10s) ────
const IdentityVerification: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const checks = [
    { label: "Identity Confirmed", detail: "Verified via LinkedIn profile", delay: 15 },
    { label: "Currently Available", detail: "Can start in 2 weeks", delay: 35 },
    { label: "Salary: $140-160k", detail: "Within client budget range", delay: 55 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        padding: "120px 60px",
        opacity: fadeIn,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ color: CYAN, fontSize: 18, fontWeight: 600, letterSpacing: 3, marginBottom: 12 }}>
          STEP 1 OF 3
        </div>
        <div style={{ color: WHITE, fontSize: 44, fontWeight: 700 }}>
          Identity & Eligibility
        </div>
      </div>

      {/* Small waveform still running */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          marginBottom: 50,
          height: 40,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const h = Math.sin(frame * 0.2 + i * 0.5) * 12 + 16;
          return (
            <div
              key={i}
              style={{
                width: 4,
                height: h,
                borderRadius: 2,
                background: CYAN,
                opacity: 0.5,
              }}
            />
          );
        })}
        <span style={{ color: WHITE_DIM, fontSize: 16, marginLeft: 12 }}>
          Call in progress...
        </span>
      </div>

      {/* Verification checks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {checks.map((check, index) => {
          const isVisible = frame > check.delay;
          const checkSpring = spring({
            frame: frame - check.delay,
            fps,
            config: { damping: 12, stiffness: 100, mass: 0.5 },
          });
          const checkOpacity = isVisible ? checkSpring : 0;
          const slideX = isVisible
            ? interpolate(checkSpring, [0, 1], [-40, 0])
            : -40;

          return (
            <div
              key={index}
              style={{
                ...cardStyle,
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: checkOpacity,
                transform: `translateX(${slideX}px)`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: isVisible ? `rgba(0,255,136,0.15)` : SURFACE,
                  border: `2px solid ${isVisible ? GREEN : SURFACE_BORDER}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: GREEN,
                  ...glowStyle(GREEN, 10),
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ color: WHITE, fontSize: 28, fontWeight: 600 }}>
                  {check.label}
                </div>
                <div style={{ color: WHITE_DIM, fontSize: 18, marginTop: 4 }}>
                  {check.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 60 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ color: WHITE_DIM, fontSize: 16 }}>Screening Progress</span>
          <span style={{ color: CYAN, fontSize: 16, fontWeight: 600 }}>33%</span>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: SURFACE,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${interpolate(frame, [0, 80], [0, 33], { extrapolateRight: "clamp" })}%`,
              background: `linear-gradient(90deg, ${CYAN}, #0088FF)`,
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Technical Screening (frames 300-420 / 10-14s) ─────
const TechnicalScreening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const question = "Describe your experience with React Server Components and how you've used them in production.";
  const charsToShow = Math.floor(
    interpolate(frame, [10, 60], [0, question.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Score gauge animation
  const scoreProgress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 20, stiffness: 40, mass: 1 },
  });
  const score = 8.5;
  const scoreAngle = scoreProgress * (score / 10) * 270 - 135;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        padding: "120px 60px",
        opacity: fadeIn,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ color: CYAN, fontSize: 18, fontWeight: 600, letterSpacing: 3, marginBottom: 12 }}>
          STEP 2 OF 3
        </div>
        <div style={{ color: WHITE, fontSize: 44, fontWeight: 700 }}>
          Technical Assessment
        </div>
      </div>

      {/* Question card */}
      <div
        style={{
          ...cardStyle,
          borderColor: CYAN_DIM,
          marginBottom: 40,
        }}
      >
        <div style={{ color: CYAN, fontSize: 15, fontWeight: 600, marginBottom: 12, letterSpacing: 1 }}>
          QUESTION 3 OF 5
        </div>
        <div style={{ color: WHITE, fontSize: 24, lineHeight: 1.6 }}>
          {question.slice(0, charsToShow)}
          <span style={{ opacity: frame < 65 ? (Math.sin(frame * 0.3) > 0 ? 1 : 0) : 0, color: CYAN }}>
            |
          </span>
        </div>
      </div>

      {/* Response indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 50,
          opacity: interpolate(frame, [65, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const h = Math.sin(frame * 0.18 + i * 0.6) * 10 + 14;
            return (
              <div
                key={i}
                style={{
                  width: 4,
                  height: h,
                  borderRadius: 2,
                  background: GREEN,
                  opacity: 0.6,
                }}
              />
            );
          })}
        </div>
        <span style={{ color: GREEN, fontSize: 16, fontWeight: 500, marginLeft: 8 }}>
          Candidate responding...
        </span>
      </div>

      {/* Score gauge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ position: "relative", width: 260, height: 260, marginBottom: 20 }}>
          {/* Background arc */}
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: "absolute" }}>
            <circle
              cx="130"
              cy="130"
              r="110"
              fill="none"
              stroke={SURFACE_BORDER}
              strokeWidth="12"
              strokeDasharray="518.4 691.2"
              strokeDashoffset="-86.4"
              strokeLinecap="round"
              transform="rotate(0 130 130)"
            />
            <circle
              cx="130"
              cy="130"
              r="110"
              fill="none"
              stroke={CYAN}
              strokeWidth="12"
              strokeDasharray={`${scoreProgress * (score / 10) * 518.4} 691.2`}
              strokeDashoffset="-86.4"
              strokeLinecap="round"
              style={glowStyle(CYAN, 15)}
            />
          </svg>
          {/* Score number */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ color: WHITE, fontSize: 72, fontWeight: 800, lineHeight: 1 }}>
              {(scoreProgress * score).toFixed(1)}
            </div>
            <div style={{ color: WHITE_DIM, fontSize: 22 }}>out of 10</div>
          </div>
        </div>
        <div style={{ color: CYAN, fontSize: 20, fontWeight: 600, letterSpacing: 2 }}>
          TECHNICAL SCORE
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 50 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: WHITE_DIM, fontSize: 16 }}>Screening Progress</span>
          <span style={{ color: CYAN, fontSize: 16, fontWeight: 600 }}>66%</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: SURFACE, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${interpolate(frame, [0, 60], [33, 66], { extrapolateRight: "clamp" })}%`,
              background: `linear-gradient(90deg, ${CYAN}, #0088FF)`,
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: Scoring Dashboard (frames 420-510 / 14-17s) ───────
const ScoringDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const scores = [
    { label: "Technical Skills", value: 8.5, color: CYAN },
    { label: "Communication", value: 9.0, color: "#00FF88" },
    { label: "Culture Fit", value: 8.0, color: "#A855F7" },
    { label: "Problem Solving", value: 8.7, color: "#F59E0B" },
  ];

  const overall = 8.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        padding: "100px 60px",
        opacity: fadeIn,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{ color: CYAN, fontSize: 18, fontWeight: 600, letterSpacing: 3, marginBottom: 12 }}>
          SCREENING COMPLETE
        </div>
        <div style={{ color: WHITE, fontSize: 40, fontWeight: 700 }}>
          Candidate Scorecard
        </div>
      </div>

      {/* Candidate header */}
      <div
        style={{
          ...cardStyle,
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 36,
          padding: "20px 28px",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: WHITE,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          SC
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: WHITE, fontSize: 26, fontWeight: 600 }}>Sarah Chen</div>
          <div style={{ color: WHITE_DIM, fontSize: 17 }}>Senior React Developer</div>
        </div>
        <div style={{ color: WHITE_DIM, fontSize: 15 }}>12 min call</div>
      </div>

      {/* Score bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 40 }}>
        {scores.map((s, i) => {
          const barSpring = spring({
            frame: frame - 15 - i * 10,
            fps,
            config: { damping: 18, stiffness: 60, mass: 0.8 },
          });
          const barWidth = barSpring * (s.value / 10) * 100;
          return (
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: WHITE, fontSize: 22, fontWeight: 500 }}>{s.label}</span>
                <span style={{ color: s.color, fontSize: 22, fontWeight: 700 }}>
                  {(barSpring * s.value).toFixed(1)}
                </span>
              </div>
              <div
                style={{
                  height: 14,
                  borderRadius: 7,
                  background: SURFACE,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${barWidth}%`,
                    borderRadius: 7,
                    background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                    boxShadow: `0 0 20px ${s.color}44`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall score */}
      <div
        style={{
          ...cardStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: CYAN_DIM,
          marginBottom: 30,
        }}
      >
        <div>
          <div style={{ color: WHITE_DIM, fontSize: 18 }}>Overall Score</div>
          <div style={{ color: WHITE, fontSize: 52, fontWeight: 800, lineHeight: 1.2 }}>
            {(
              spring({ frame: frame - 50, fps, config: { damping: 20, stiffness: 50 } }) *
              overall
            ).toFixed(1)}
            <span style={{ color: WHITE_DIM, fontSize: 24, fontWeight: 400 }}>/10</span>
          </div>
        </div>

        {/* RECOMMENDED badge */}
        {(() => {
          const badgeSpring = spring({
            frame: frame - 60,
            fps,
            config: { damping: 10, stiffness: 120, mass: 0.5 },
          });
          return (
            <div
              style={{
                background: `linear-gradient(135deg, ${GREEN}, #00CC66)`,
                color: "#000",
                fontSize: 22,
                fontWeight: 800,
                padding: "14px 28px",
                borderRadius: 12,
                letterSpacing: 2,
                transform: `scale(${badgeSpring})`,
                boxShadow: `0 0 40px ${GREEN}44`,
              }}
            >
              ✓ RECOMMENDED
            </div>
          );
        })()}
      </div>

      {/* Progress complete */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: WHITE_DIM, fontSize: 16 }}>Screening Progress</span>
          <span style={{ color: GREEN, fontSize: 16, fontWeight: 600 }}>100%</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: SURFACE, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${interpolate(frame, [0, 40], [66, 100], { extrapolateRight: "clamp" })}%`,
              background: `linear-gradient(90deg, ${GREEN}, ${CYAN})`,
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 6: Rapid Montage (frames 510-570 / 17-19s) ───────────
const RapidMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const candidates = [
    { name: "James Rodriguez", role: "Backend Engineer", score: 9.1, pass: true, initials: "JR", gradient: "linear-gradient(135deg, #00B4DB, #0083B0)" },
    { name: "Aisha Patel", role: "DevOps Engineer", score: 6.2, pass: false, initials: "AP", gradient: "linear-gradient(135deg, #F2994A, #F2C94C)" },
    { name: "Marcus Thompson", role: "Full-Stack Dev", score: 8.8, pass: true, initials: "MT", gradient: "linear-gradient(135deg, #56ab2f, #a8e063)" },
    { name: "Lisa Wang", role: "React Native Dev", score: 5.4, pass: false, initials: "LW", gradient: "linear-gradient(135deg, #DA4453, #89216B)" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        padding: "100px 60px",
        opacity: fadeIn,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ color: CYAN, fontSize: 18, fontWeight: 600, letterSpacing: 3, marginBottom: 12 }}>
          BATCH SCREENING
        </div>
        <div style={{ color: WHITE, fontSize: 38, fontWeight: 700 }}>
          Screening All Candidates
        </div>
      </div>

      {/* Candidate cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {candidates.map((c, i) => {
          const cardDelay = i * 12;
          const cardSpring = spring({
            frame: frame - cardDelay,
            fps,
            config: { damping: 12, stiffness: 100, mass: 0.5 },
          });
          const slideX = interpolate(cardSpring, [0, 1], [100, 0]);

          return (
            <div
              key={i}
              style={{
                ...cardStyle,
                display: "flex",
                alignItems: "center",
                gap: 18,
                opacity: cardSpring,
                transform: `translateX(${slideX}px)`,
                borderColor: c.pass ? "rgba(0,255,136,0.2)" : "rgba(255,68,102,0.2)",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: c.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: WHITE,
                  fontSize: 18,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {c.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: WHITE, fontSize: 22, fontWeight: 600 }}>{c.name}</div>
                <div style={{ color: WHITE_DIM, fontSize: 16 }}>{c.role}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    color: c.pass ? GREEN : RED,
                    fontSize: 28,
                    fontWeight: 800,
                  }}
                >
                  {(cardSpring * c.score).toFixed(1)}
                </div>
                <div
                  style={{
                    color: c.pass ? GREEN : RED,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: 1,
                    marginTop: 2,
                  }}
                >
                  {c.pass ? "PASS" : "FAIL"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: interpolate(frame, [45, 55], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {[
          { label: "Screened", value: "4", color: CYAN },
          { label: "Passed", value: "2", color: GREEN },
          { label: "Failed", value: "2", color: RED },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ color: stat.color, fontSize: 44, fontWeight: 800 }}>{stat.value}</div>
            <div style={{ color: WHITE_DIM, fontSize: 16 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 7: End Screen (frames 570-690 / 19-23s) ──────────────
const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const textSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 60, mass: 1 },
  });
  const brandSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });

  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${CYAN_GLOW} 0%, transparent 70%)`,
          opacity: glowPulse * 0.3,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 60px",
          transform: `scale(${interpolate(textSpring, [0, 1], [0.9, 1])})`,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${CYAN}, #0088CC)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            marginBottom: 50,
            ...glowStyle(CYAN, 30),
            opacity: textSpring,
          }}
        >
          🎯
        </div>

        {/* Main text */}
        <div
          style={{
            color: WHITE,
            fontSize: 46,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.35,
            opacity: textSpring,
            maxWidth: 900,
          }}
        >
          Every candidate we send you has already passed a{" "}
          <span style={{ color: CYAN, ...glowStyle(CYAN, 8) }}>live AI interview</span>.
        </div>

        {/* Divider */}
        <div
          style={{
            width: interpolate(brandSpring, [0, 1], [0, 200]),
            height: 2,
            background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
            marginTop: 50,
            marginBottom: 50,
          }}
        />

        {/* Brand */}
        <div
          style={{
            opacity: brandSpring,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${CYAN}, #FFFFFF)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -1,
            }}
          >
            Shortlisted.ai
          </div>
          <div
            style={{
              color: WHITE_DIM,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            AI-Powered Recruiting
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 60,
            padding: "18px 48px",
            borderRadius: 50,
            border: `2px solid ${CYAN}`,
            color: CYAN,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 1,
            opacity: brandSpring,
            boxShadow: `0 0 30px ${CYAN}33, inset 0 0 30px ${CYAN}11`,
          }}
        >
          Book a Demo →
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ────────────────────────────────────────────
export const AIScreeningCall: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Scene 1: Phone Ringing (0-3s) */}
      <Sequence from={0} durationInFrames={90}>
        <PhoneRinging />
      </Sequence>

      {/* Scene 2: Call Connected + Waveform (3-7s) */}
      <Sequence from={90} durationInFrames={120}>
        <CallConnected />
      </Sequence>

      {/* Scene 3: Identity Verification (7-10s) */}
      <Sequence from={210} durationInFrames={90}>
        <IdentityVerification />
      </Sequence>

      {/* Scene 4: Technical Screening (10-14s) */}
      <Sequence from={300} durationInFrames={120}>
        <TechnicalScreening />
      </Sequence>

      {/* Scene 5: Scoring Dashboard (14-17s) */}
      <Sequence from={420} durationInFrames={90}>
        <ScoringDashboard />
      </Sequence>

      {/* Scene 6: Rapid Montage (17-19s) */}
      <Sequence from={510} durationInFrames={60}>
        <RapidMontage />
      </Sequence>

      {/* Scene 7: End Screen (19-23s) */}
      <Sequence from={570} durationInFrames={120}>
        <EndScreen />
      </Sequence>
    </AbsoluteFill>
  );
};
