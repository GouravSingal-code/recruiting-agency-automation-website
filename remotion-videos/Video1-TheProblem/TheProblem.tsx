import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ── Constants ──────────────────────────────────────────────────────────────────
const BG = "#0A0A0A";
const RED = "#FF3B3B";
const WHITE = "#FFFFFF";
const GRAY = "#888888";
const FONT = "Inter, SF Pro Display, -apple-system, system-ui, sans-serif";

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Screen-shake offset driven by frame. */
function shake(
  frame: number,
  intensity: number
): { x: number; y: number } {
  const seed = frame * 7.3;
  return {
    x: Math.sin(seed) * intensity,
    y: Math.cos(seed * 1.4) * intensity,
  };
}

/** Clamp helper */
function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

// ── Sub-components ─────────────────────────────────────────────────────────────

/** Scene 1 (0-3s / frames 0-89): Resume counter + flying cards */
const ResumeFlood: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter goes from 0 → 527
  const count = Math.round(
    interpolate(frame, [0, 75], [0, 527], { extrapolateRight: "clamp" })
  );

  const counterOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  const counterScale = spring({ frame, fps, config: { damping: 12 } });

  // Shake builds up as counter rises
  const shakeIntensity = interpolate(frame, [0, 70], [0, 8], {
    extrapolateRight: "clamp",
  });
  const sk = shake(frame, shakeIntensity);

  // Generate resume cards
  const cards = Array.from({ length: 18 }, (_, i) => {
    const delay = i * 4;
    const localFrame = frame - delay;
    if (localFrame < 0) return null;

    const angle = (i * 137.5 * Math.PI) / 180; // golden angle spread
    const radius = 900;
    const startX = Math.cos(angle) * radius;
    const startY = Math.sin(angle) * radius;

    const progress = interpolate(localFrame, [0, 15], [0, 1], {
      extrapolateRight: "clamp",
    });

    const x = interpolate(progress, [0, 1], [startX, (i % 5 - 2) * 100]);
    const y = interpolate(progress, [0, 1], [startY, (Math.floor(i / 5) - 1) * 140]);
    const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 0.6]);
    const rotation = interpolate(progress, [0, 1], [Math.random() * 40 - 20, (i % 2 === 0 ? 3 : -3)]);
    const scale = interpolate(progress, [0, 0.5, 1], [0.3, 1.1, 0.85]);

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 160,
          height: 200,
          marginLeft: -80,
          marginTop: -100,
          background: `linear-gradient(135deg, #1a1a2e, #16213e)`,
          borderRadius: 12,
          border: "1px solid #333",
          opacity,
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          padding: 14,
          gap: 8,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#333",
          }}
        />
        <div style={{ height: 8, width: "80%", background: "#333", borderRadius: 4 }} />
        <div style={{ height: 6, width: "60%", background: "#2a2a2a", borderRadius: 4 }} />
        <div style={{ height: 6, width: "70%", background: "#2a2a2a", borderRadius: 4 }} />
      </div>
    );
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        transform: `translate(${sk.x}px, ${sk.y}px)`,
      }}
    >
      {cards}
      {/* Counter */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          width: "100%",
          textAlign: "center",
          opacity: counterOpacity,
          transform: `scale(${counterScale})`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 160,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1,
            textShadow: `0 0 60px ${RED}66`,
          }}
        >
          {count}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 600,
            color: GRAY,
            marginTop: 16,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Resumes Received
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Scene 2 (3-6s / frames 90-179): Calendar overwhelm */
const CalendarOverwhelm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calendarScale = interpolate(frame, [0, 30, 60, 89], [0.7, 1, 1.15, 1.3], {
    extrapolateRight: "clamp",
  });

  const sk = shake(frame, interpolate(frame, [40, 89], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  const hours = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${sk.x}px, ${sk.y}px)`,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 160,
          fontFamily: FONT,
          fontSize: 42,
          fontWeight: 700,
          color: RED,
          textTransform: "uppercase",
          letterSpacing: 3,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Today's Schedule
      </div>

      {/* Calendar block */}
      <div
        style={{
          width: 800,
          marginTop: 80,
          transform: `scale(${calendarScale})`,
          transformOrigin: "center top",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {hours.map((hour, i) => {
          const entryDelay = i * 4;
          const localFrame = frame - entryDelay;
          const entryOpacity = interpolate(localFrame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const slideX = interpolate(localFrame, [0, 10], [60, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: entryOpacity,
                transform: `translateX(${slideX}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 22,
                  color: GRAY,
                  width: 130,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {hour}
              </div>
              <div
                style={{
                  flex: 1,
                  background: `linear-gradient(90deg, ${RED}cc, ${RED}88)`,
                  borderRadius: 8,
                  padding: "12px 18px",
                  fontFamily: FONT,
                  fontSize: 22,
                  fontWeight: 600,
                  color: WHITE,
                }}
              >
                Screening Call
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Scene 3 (6-9s / frames 180-269): Rejected candidates */
const RejectedCandidates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const candidates = [
    { name: "Sarah Chen", role: "Senior Engineer", reason: "Not qualified" },
    { name: "James Miller", role: "Full Stack Dev", reason: "No response" },
    { name: "Priya Sharma", role: "Backend Lead", reason: "Wrong salary range" },
    { name: "Mike Johnson", role: "DevOps Engineer", reason: "Culture mismatch" },
    { name: "Ana Rodriguez", role: "Tech Lead", reason: "Not qualified" },
    { name: "David Kim", role: "Sr. Developer", reason: "Ghosted" },
  ];

  const sk = shake(frame, 5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${sk.x}px, ${sk.y}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: 800,
        }}
      >
        {candidates.map((c, i) => {
          const cardDelay = i * 12;
          const localFrame = frame - cardDelay;
          if (localFrame < 0) return null;

          const slideIn = interpolate(localFrame, [0, 8], [100, 0], {
            extrapolateRight: "clamp",
          });
          const cardOpacity = interpolate(localFrame, [0, 6], [0, 1], {
            extrapolateRight: "clamp",
          });

          // Stamp slam effect
          const stampDelay = 10;
          const stampFrame = localFrame - stampDelay;
          const stampScale = stampFrame >= 0
            ? interpolate(stampFrame, [0, 3, 6], [3, 0.9, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;
          const stampOpacity = stampFrame >= 0
            ? interpolate(stampFrame, [0, 3], [0, 1], { extrapolateRight: "clamp" })
            : 0;
          const stampRotation = -12 + i * 3;

          return (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "#141414",
                borderRadius: 16,
                padding: "20px 24px",
                opacity: cardOpacity,
                transform: `translateX(${i % 2 === 0 ? -slideIn : slideIn}px)`,
                border: "1px solid #222",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#2a2a2a",
                  flexShrink: 0,
                }}
              />
              {/* Info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 26,
                    fontWeight: 700,
                    color: WHITE,
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 20,
                    color: GRAY,
                    marginTop: 4,
                  }}
                >
                  {c.role}
                </div>
              </div>
              {/* Reason tag */}
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  color: RED,
                  background: `${RED}18`,
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontWeight: 600,
                }}
              >
                {c.reason}
              </div>
              {/* REJECTED stamp */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${stampRotation}deg) scale(${stampScale})`,
                  opacity: stampOpacity,
                  fontFamily: FONT,
                  fontSize: 52,
                  fontWeight: 900,
                  color: RED,
                  textTransform: "uppercase",
                  letterSpacing: 8,
                  border: `4px solid ${RED}`,
                  padding: "8px 24px",
                  borderRadius: 8,
                  textShadow: `0 0 30px ${RED}88`,
                  pointerEvents: "none" as const,
                }}
              >
                Rejected
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Scene 4 (9-12s / frames 270-359): Founder overwhelm */
const FounderOverwhelm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sk = shake(frame, interpolate(frame, [0, 89], [3, 8], { extrapolateRight: "clamp" }));

  // Pulsing red vignette
  const vignetteOpacity = interpolate(
    Math.sin(frame * 0.3),
    [-1, 1],
    [0.15, 0.4]
  );

  // Inbox count climbs
  const inboxCount = Math.round(
    interpolate(frame, [0, 60], [47, 238], { extrapolateRight: "clamp" })
  );

  // Notification badges popping
  const notifications = [
    { text: "New applicant", x: 720, y: 600, delay: 5 },
    { text: "Interview request", x: 180, y: 500, delay: 15 },
    { text: "Candidate withdrew", x: 650, y: 750, delay: 25 },
    { text: "Reschedule?", x: 250, y: 850, delay: 35 },
    { text: "Urgent: Hiring update", x: 600, y: 450, delay: 45 },
    { text: "Offer rejected", x: 300, y: 650, delay: 55 },
    { text: "3 new applicants", x: 700, y: 900, delay: 60 },
    { text: "Reminder: Screen call", x: 200, y: 400, delay: 70 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        transform: `translate(${sk.x}px, ${sk.y}px)`,
      }}
    >
      {/* Red vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, ${RED}${Math.round(vignetteOpacity * 255)
            .toString(16)
            .padStart(2, "0")} 100%)`,
          pointerEvents: "none" as const,
          zIndex: 20,
        }}
      />

      {/* Founder silhouette - head in hands */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        {/* Head */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#2a2a2a",
            border: `3px solid #444`,
            marginBottom: -20,
            zIndex: 2,
          }}
        />
        {/* Body/desk */}
        <div
          style={{
            width: 200,
            height: 100,
            background: "#1e1e1e",
            borderRadius: "60px 60px 0 0",
          }}
        />
        {/* Hands on head */}
        <div
          style={{
            position: "absolute",
            top: 20,
            display: "flex",
            gap: 60,
          }}
        >
          <div
            style={{
              width: 50,
              height: 70,
              background: "#2a2a2a",
              borderRadius: "30px 30px 10px 10px",
              transform: "rotate(-20deg)",
              border: "2px solid #444",
            }}
          />
          <div
            style={{
              width: 50,
              height: 70,
              background: "#2a2a2a",
              borderRadius: "30px 30px 10px 10px",
              transform: "rotate(20deg)",
              border: "2px solid #444",
            }}
          />
        </div>
      </div>

      {/* Inbox indicator */}
      <div
        style={{
          position: "absolute",
          top: "68%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "#141414",
          borderRadius: 16,
          padding: "20px 36px",
          border: "1px solid #333",
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 40 }}>📧</div>
        <div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 28,
              fontWeight: 600,
              color: GRAY,
            }}
          >
            Inbox
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 48,
              fontWeight: 900,
              color: RED,
            }}
          >
            {inboxCount}+ unread
          </div>
        </div>
      </div>

      {/* Floating notifications */}
      {notifications.map((n, i) => {
        const localFrame = frame - n.delay;
        if (localFrame < 0) return null;
        const popScale = spring({
          frame: localFrame,
          fps,
          config: { damping: 8, stiffness: 200 },
        });
        const fadeOut = interpolate(localFrame, [20, 35], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const floatY = interpolate(localFrame, [0, 35], [0, -30], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              transform: `scale(${popScale}) translateY(${floatY}px)`,
              opacity: fadeOut,
              background: "#1e1e1e",
              border: `1px solid ${RED}44`,
              borderRadius: 12,
              padding: "10px 18px",
              fontFamily: FONT,
              fontSize: 18,
              fontWeight: 600,
              color: WHITE,
              whiteSpace: "nowrap" as const,
              zIndex: 15,
            }}
          >
            🔔 {n.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Scene 5 (12-14s / frames 360-419): "3 months later... Still no hire." */
const StillNoHire: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "3 months later..." fades in and up
  const text1Opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const text1Y = interpolate(frame, [0, 20], [40, 0], {
    extrapolateRight: "clamp",
  });

  // "Still no hire." slams in after pause
  const text2Frame = frame - 35;
  const text2Scale =
    text2Frame >= 0
      ? spring({
          frame: text2Frame,
          fps,
          config: { damping: 8, stiffness: 120 },
        })
      : 0;
  const text2Opacity = text2Frame >= 0
    ? interpolate(text2Frame, [0, 5], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Screen flash on slam
  const flashOpacity =
    text2Frame >= 0
      ? interpolate(text2Frame, [0, 2, 8], [0.6, 0.6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  const sk = text2Frame >= 0 ? shake(text2Frame, interpolate(text2Frame, [0, 5, 15], [12, 12, 0], {
    extrapolateRight: "clamp",
  })) : { x: 0, y: 0 };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${sk.x}px, ${sk.y}px)`,
      }}
    >
      {/* Flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: RED,
          opacity: flashOpacity,
          pointerEvents: "none" as const,
          zIndex: 10,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 52,
            fontWeight: 500,
            color: GRAY,
            opacity: text1Opacity,
            transform: `translateY(${text1Y}px)`,
            letterSpacing: 2,
          }}
        >
          3 months later...
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 96,
            fontWeight: 900,
            color: WHITE,
            opacity: text2Opacity,
            transform: `scale(${text2Scale})`,
            textShadow: `0 0 80px ${RED}66`,
          }}
        >
          Still no hire.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Scene 6 (14-18s / frames 420-539): End screen / CTA */
const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text fades in
  const textOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [0, 25], [50, 0], {
    extrapolateRight: "clamp",
  });

  // "5" number highlight
  const fiveScale = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Logo/wordmark appears below
  const logoFrame = frame - 50;
  const logoOpacity = logoFrame >= 0
    ? interpolate(logoFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 0;
  const logoY = logoFrame >= 0
    ? interpolate(logoFrame, [0, 20], [30, 0], { extrapolateRight: "clamp" })
    : 30;

  // Subtle glow pulse on logo
  const glowPulse = logoFrame >= 20
    ? interpolate(Math.sin((logoFrame - 20) * 0.08), [-1, 1], [0.4, 0.8])
    : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle radial gradient backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, #1a1a2e33 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          padding: "0 60px",
          zIndex: 2,
        }}
      >
        {/* Main CTA text */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 64,
            fontWeight: 700,
            color: WHITE,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          What if you just got
          <br />
          the{" "}
          <span
            style={{
              color: RED,
              display: "inline-block",
              transform: `scale(${fiveScale})`,
              fontWeight: 900,
              fontSize: 80,
            }}
          >
            5
          </span>{" "}
          who
          <br />
          actually fit?
        </div>

        {/* Shortlisted.ai branding */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Divider line */}
          <div
            style={{
              width: 80,
              height: 3,
              background: RED,
              borderRadius: 2,
              opacity: 0.7,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              fontFamily: FONT,
              fontSize: 56,
              fontWeight: 900,
              color: WHITE,
              letterSpacing: -1,
              textShadow: `0 0 ${40 * glowPulse}px ${RED}88`,
            }}
          >
            Shortlisted
            <span style={{ color: RED }}>.ai</span>
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 24,
              fontWeight: 500,
              color: GRAY,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Hire smarter. Hire faster.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ───────────────────────────────────────────────────────────

export const TheProblem: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Scene 1: Resume flood (0-3s) */}
      <Sequence from={0} durationInFrames={90}>
        <ResumeFlood />
      </Sequence>

      {/* Scene 2: Calendar overwhelm (3-6s) */}
      <Sequence from={90} durationInFrames={90}>
        <CalendarOverwhelm />
      </Sequence>

      {/* Scene 3: Rejected candidates (6-9s) */}
      <Sequence from={180} durationInFrames={90}>
        <RejectedCandidates />
      </Sequence>

      {/* Scene 4: Founder overwhelm (9-12s) */}
      <Sequence from={270} durationInFrames={90}>
        <FounderOverwhelm />
      </Sequence>

      {/* Scene 5: "Still no hire" (12-14s) */}
      <Sequence from={360} durationInFrames={60}>
        <StillNoHire />
      </Sequence>

      {/* Scene 6: End screen / CTA (14-18s) */}
      <Sequence from={420} durationInFrames={120}>
        <EndScreen />
      </Sequence>
    </AbsoluteFill>
  );
};
