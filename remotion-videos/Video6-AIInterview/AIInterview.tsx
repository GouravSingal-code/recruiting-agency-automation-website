import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
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
const GREEN = "#00FF88";
const GREEN_DIM = "rgba(0,255,136,0.15)";
const GREEN_GLOW = "rgba(0,255,136,0.35)";
const WHITE = "#FFFFFF";
const WHITE_DIM = "rgba(255,255,255,0.5)";
const WHITE_MUTED = "rgba(255,255,255,0.3)";
const RED = "#FF4466";
const SURFACE = "rgba(255,255,255,0.06)";
const SURFACE_BORDER = "rgba(255,255,255,0.1)";

// ─── Frame boundaries ───────────────────────────────────────────
const SCENE1_START = 0;
const SCENE1_END = 183;
const SCENE2A_START = 183;
const SCENE2A_END = 399;
const SCENE2B_START = 399;
const SCENE2B_END = 525;
const SCENE3A_START = 525;
const SCENE3A_END = 675;
const SCENE3B_START = 675;
const SCENE3B_END = 837;
const SCENE4A_START = 837;
const SCENE4A_END = 948;
const SCENE4B_START = 948;
const SCENE4B_END = 1251;
const SCENE5A_START = 1251;
const SCENE5A_END = 1368;
const SCENE5B_START = 1368;
const SCENE5B_END = 1569;
const SCENE6_START = 1569;
const SCENE6_END = 1971;
const SCENE7_START = 1971;
const SCENE7_END = 2133;
const TOTAL_FRAMES = 2133;

const FONT_FAMILY = "'Inter', 'SF Pro Display', -apple-system, sans-serif";

// ─── Conversation data ──────────────────────────────────────────
interface Message {
  speaker: "ai" | "sarah";
  text: string;
  startFrame: number;
  endFrame: number;
}

const MESSAGES: Message[] = [
  {
    speaker: "ai",
    text: "Hi Sarah, calling about the Senior Frontend role...",
    startFrame: SCENE2A_START,
    endFrame: SCENE2A_END,
  },
  {
    speaker: "sarah",
    text: "Hi! Yes, I've been expecting this call.",
    startFrame: SCENE2B_START,
    endFrame: SCENE2B_END,
  },
  {
    speaker: "ai",
    text: "Can you confirm availability and salary expectations?",
    startFrame: SCENE3A_START,
    endFrame: SCENE3A_END,
  },
  {
    speaker: "sarah",
    text: "Two weeks notice. $140-160K depending on equity.",
    startFrame: SCENE3B_START,
    endFrame: SCENE3B_END,
  },
  {
    speaker: "ai",
    text: "Walk me through your React Server Components experience.",
    startFrame: SCENE4A_START,
    endFrame: SCENE4A_END,
  },
  {
    speaker: "sarah",
    text: "Built with RSC for a year. Migrated entire dashboard, cut load times 60%.",
    startFrame: SCENE4B_START,
    endFrame: SCENE4B_END,
  },
  {
    speaker: "ai",
    text: "What team culture works best for you?",
    startFrame: SCENE5A_START,
    endFrame: SCENE5A_END,
  },
  {
    speaker: "sarah",
    text: "Small, fast-moving. I thrive with autonomy.",
    startFrame: SCENE5B_START,
    endFrame: SCENE5B_END,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────
const glowStyle = (color: string, radius = 20): React.CSSProperties => ({
  filter: `drop-shadow(0 0 ${radius}px ${color})`,
});

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

// ─── Scene 1: Phone Ringing ─────────────────────────────────────
const PhoneRinging: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ringPulse = Math.sin(frame * 0.5) * 0.5 + 0.5;
  const slideUp = interpolate(frame, [0, 20], [80, 0], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ringScale = 1 + ringPulse * 0.08;
  const iconShake = Math.sin(frame * 1.2) * (frame < 150 ? 8 : 0);

  // Accept button grows near end of scene
  const acceptScale = interpolate(frame, [150, 170], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const acceptGlow = frame > 150 ? 25 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Radial pulse rings */}
      {[0, 1, 2].map((i) => {
        const pulseFrame = (frame - i * 15) % 60;
        const scale = interpolate(pulseFrame, [0, 60], [0.5, 3], {
          extrapolateRight: "clamp",
        });
        const pulseOpacity = interpolate(pulseFrame, [0, 60], [0.4, 0], {
          extrapolateRight: "clamp",
        });
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
              textTransform: "uppercase" as const,
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
              background: SURFACE,
              border: `1px solid ${SURFACE_BORDER}`,
              borderRadius: 20,
              padding: "20px 32px",
              display: "flex",
              alignItems: "center",
              gap: 20,
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
              color: WHITE,
              opacity: interpolate(frame, [150, 165], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
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
              color: BG,
              transform: `scale(${acceptScale})`,
              ...glowStyle(GREEN, acceptGlow),
            }}
          >
            ✓
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Waveform Bars ──────────────────────────────────────────────
const WaveformBars: React.FC<{
  color: string;
  frame: number;
  barCount?: number;
}> = ({ color, frame, barCount = 24 }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        height: 60,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const height =
          12 +
          Math.abs(Math.sin(frame * 0.12 + i * 0.7)) * 36 +
          Math.abs(Math.sin(frame * 0.08 + i * 1.3)) * 12;
        return (
          <div
            key={i}
            style={{
              width: 4,
              height,
              borderRadius: 2,
              background: color,
              opacity: 0.7 + Math.sin(frame * 0.1 + i) * 0.3,
              transition: "height 0.05s ease",
            }}
          />
        );
      })}
    </div>
  );
};

// ─── Live Indicator ─────────────────────────────────────────────
const LiveIndicator: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = Math.sin(frame * 0.15) * 0.5 + 0.5;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: RED,
          opacity: 0.5 + pulse * 0.5,
          boxShadow: `0 0 ${6 + pulse * 8}px ${RED}`,
        }}
      />
      <span
        style={{
          color: RED,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        LIVE
      </span>
    </div>
  );
};

// ─── Message Bubble ─────────────────────────────────────────────
const MessageBubble: React.FC<{
  message: Message;
  globalFrame: number;
  fps: number;
}> = ({ message, globalFrame, fps }) => {
  const isAI = message.speaker === "ai";
  const color = isAI ? CYAN : GREEN;
  const dimColor = isAI ? CYAN_DIM : GREEN_DIM;
  const label = isAI ? "AI Agent" : "Sarah Chen";

  // Only show messages that have started
  if (globalFrame < message.startFrame) return null;

  const localFrame = globalFrame - message.startFrame;

  // Entry animation
  const entryOpacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const entrySlide = interpolate(localFrame, [0, 10], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Typing effect: reveal characters over time
  const charsPerFrame = message.text.length / Math.min(60, message.endFrame - message.startFrame - 10);
  const visibleChars = Math.min(
    message.text.length,
    Math.floor(localFrame * charsPerFrame)
  );
  const displayText = message.text.substring(0, visibleChars);
  const showCursor =
    visibleChars < message.text.length && localFrame % 10 < 6;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isAI ? "flex-start" : "flex-end",
        opacity: entryOpacity,
        transform: `translateY(${entrySlide}px)`,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color,
          marginBottom: 6,
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: dimColor,
          border: `1px solid ${color}33`,
          borderRadius: isAI ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
          padding: "14px 20px",
          maxWidth: "85%",
        }}
      >
        <span
          style={{
            color: WHITE,
            fontSize: 22,
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          {displayText}
          {showCursor && (
            <span style={{ color, opacity: 0.8 }}>|</span>
          )}
        </span>
      </div>
    </div>
  );
};

// ─── Scenes 2-5: Conversation ───────────────────────────────────
const Conversation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Global frame = frame + SCENE2A_START because this Sequence starts at 183
  const globalFrame = frame + SCENE2A_START;

  // Determine who is currently speaking
  const isSarahSpeaking =
    (globalFrame >= SCENE2B_START && globalFrame < SCENE2B_END) ||
    (globalFrame >= SCENE3B_START && globalFrame < SCENE3B_END) ||
    (globalFrame >= SCENE4B_START && globalFrame < SCENE4B_END) ||
    (globalFrame >= SCENE5B_START && globalFrame < SCENE5B_END);

  const isAISpeaking =
    (globalFrame >= SCENE2A_START && globalFrame < SCENE2A_END) ||
    (globalFrame >= SCENE3A_START && globalFrame < SCENE3A_END) ||
    (globalFrame >= SCENE4A_START && globalFrame < SCENE4A_END) ||
    (globalFrame >= SCENE5A_START && globalFrame < SCENE5A_END);

  const waveColor = isSarahSpeaking ? GREEN : CYAN;
  const speakerLabel = isSarahSpeaking ? "Sarah Chen" : "AI Agent";

  // Call timer (seconds since call started)
  const callSeconds = frame / fps;

  // Calculate scroll offset: as messages accumulate, scroll up
  const visibleMessages = MESSAGES.filter((m) => globalFrame >= m.startFrame);
  const scrollOffset = Math.max(0, (visibleMessages.length - 3) * 120);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: FONT_FAMILY,
        flexDirection: "column",
      }}
    >
      {/* Top bar: call info */}
      <div
        style={{
          padding: "50px 40px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Live indicator + Timer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <LiveIndicator frame={globalFrame} />
          <div
            style={{
              color: WHITE_DIM,
              fontSize: 18,
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              letterSpacing: 2,
            }}
          >
            {formatTime(callSeconds)}
          </div>
        </div>

        {/* Speaker label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: waveColor,
              boxShadow: `0 0 8px ${waveColor}`,
            }}
          />
          <span
            style={{
              color: waveColor,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {speakerLabel} speaking
          </span>
        </div>

        {/* Waveform */}
        <div style={{ marginTop: 12, width: "100%" }}>
          <WaveformBars
            color={waveColor}
            frame={isAISpeaking || isSarahSpeaking ? globalFrame : 0}
            barCount={24}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${SURFACE_BORDER}, transparent)`,
            marginTop: 12,
          }}
        />
      </div>

      {/* Conversation transcript */}
      <div
        style={{
          flex: 1,
          padding: "24px 40px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            transform: `translateY(${-scrollOffset}px)`,
          }}
        >
          {MESSAGES.map((msg, i) => (
            <MessageBubble
              key={i}
              message={msg}
              globalFrame={globalFrame}
              fps={fps}
            />
          ))}
        </div>
      </div>

      {/* Bottom bar: call controls */}
      <div
        style={{
          padding: "20px 40px 60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Mute */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: SURFACE,
            border: `1px solid ${SURFACE_BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          🔇
        </div>
        {/* End call */}
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
            color: WHITE,
            ...glowStyle(RED, 10),
          }}
        >
          ✕
        </div>
        {/* Speaker */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: SURFACE,
            border: `1px solid ${SURFACE_BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          🔊
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 6: Score Reveal ──────────────────────────────────────
interface ScoreItem {
  label: string;
  score: number;
  color: string;
  isOverall?: boolean;
}

const SCORES: ScoreItem[] = [
  { label: "Technical Skills", score: 8.5, color: CYAN },
  { label: "Communication", score: 9.0, color: CYAN },
  { label: "Culture Fit", score: 8.0, color: CYAN },
  { label: "Overall", score: 8.5, color: GREEN, isOverall: true },
];

const ScoreReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Call Complete" fade in
  const callCompleteOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const callCompleteScale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  // Transition: call complete fades, scorecard appears
  const scorecardOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const callCompleteExitOpacity = interpolate(frame, [35, 50], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Call Complete overlay */}
      {frame < 55 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: callCompleteOpacity * callCompleteExitOpacity,
            transform: `scale(${callCompleteScale})`,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: SURFACE,
              border: `2px solid ${CYAN}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            ✓
          </div>
          <div
            style={{
              color: WHITE,
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            Call Complete
          </div>
          <div style={{ color: WHITE_DIM, fontSize: 20 }}>
            46:12 duration
          </div>
        </div>
      )}

      {/* Scorecard */}
      <div
        style={{
          opacity: scorecardOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "0 50px",
          gap: 32,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div
            style={{
              color: CYAN,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase" as const,
              marginBottom: 12,
            }}
          >
            AI Interview Scorecard
          </div>
          <div
            style={{
              color: WHITE,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Sarah Chen
          </div>
          <div style={{ color: WHITE_DIM, fontSize: 18, marginTop: 4 }}>
            Senior Frontend Engineer
          </div>
        </div>

        {/* Score bars */}
        {SCORES.map((item, i) => {
          const barDelay = 70 + i * 30;
          const barProgress = spring({
            frame: frame - barDelay,
            fps,
            config: { damping: 15, stiffness: 80, mass: 0.8 },
          });
          const fillWidth = barProgress * (item.score / 10) * 100;

          const barOpacity = interpolate(
            frame,
            [barDelay - 5, barDelay + 5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                width: "100%",
                opacity: barOpacity,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    color: WHITE,
                    fontSize: item.isOverall ? 24 : 20,
                    fontWeight: item.isOverall ? 700 : 500,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    color: item.color,
                    fontSize: item.isOverall ? 28 : 22,
                    fontWeight: 700,
                  }}
                >
                  {barProgress > 0.1
                    ? `${(item.score * barProgress).toFixed(1)}/10`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: item.isOverall ? 20 : 14,
                  borderRadius: 10,
                  background: SURFACE,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${fillWidth}%`,
                    height: "100%",
                    borderRadius: 10,
                    background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                    boxShadow: `0 0 16px ${item.color}66`,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* RECOMMENDED badge */}
        {(() => {
          const badgeDelay = 210;
          const badgeScale = spring({
            frame: frame - badgeDelay,
            fps,
            config: { damping: 10, stiffness: 120, mass: 0.6 },
          });
          const badgeOpacity = interpolate(
            frame,
            [badgeDelay, badgeDelay + 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const glowPulse =
            frame > badgeDelay
              ? 10 + Math.sin((frame - badgeDelay) * 0.15) * 8
              : 0;

          return (
            <div
              style={{
                marginTop: 24,
                opacity: badgeOpacity,
                transform: `scale(${badgeScale})`,
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${GREEN}22, ${GREEN}44)`,
                  border: `2px solid ${GREEN}`,
                  borderRadius: 16,
                  padding: "18px 48px",
                  boxShadow: `0 0 ${glowPulse}px ${GREEN}88`,
                }}
              >
                <span
                  style={{
                    color: GREEN,
                    fontSize: 28,
                    fontWeight: 800,
                    letterSpacing: 4,
                  }}
                >
                  ✓ RECOMMENDED
                </span>
              </div>
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 7: End Screen ────────────────────────────────────────
const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textSlide = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const glowPulse = frame > 50 ? 10 + Math.sin(frame * 0.1) * 8 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 60,
      }}
    >
      {/* Tagline */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textSlide}px)`,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            color: WHITE,
            fontSize: 38,
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          Every candidate we send you has already passed a{" "}
          <span style={{ color: CYAN }}>live AI interview</span>.
        </div>
      </div>

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: WHITE,
            letterSpacing: -1,
            textShadow: `0 0 ${glowPulse}px ${CYAN}88, 0 0 ${glowPulse * 2}px ${CYAN}44`,
          }}
        >
          Shortlisted
          <span style={{ color: CYAN }}>.ai</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ───────────────────────────────────────────
export const AIInterview: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* ── Scene 1: Phone Ring ── */}
      <Sequence from={SCENE1_START} durationInFrames={SCENE1_END - SCENE1_START}>
        <Audio src={staticFile("voice/video6-scene1.mp3")} />
        <PhoneRinging />
      </Sequence>

      {/* ── Scenes 2-5: Conversation ── */}
      <Sequence
        from={SCENE2A_START}
        durationInFrames={SCENE5B_END - SCENE2A_START}
      >
        <Conversation />
      </Sequence>

      {/* Audio clips for each conversation scene */}
      <Sequence
        from={SCENE2A_START}
        durationInFrames={SCENE2A_END - SCENE2A_START}
      >
        <Audio src={staticFile("voice/video6-scene2a.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE2B_START}
        durationInFrames={SCENE2B_END - SCENE2B_START}
      >
        <Audio src={staticFile("voice/video6-scene2b.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE3A_START}
        durationInFrames={SCENE3A_END - SCENE3A_START}
      >
        <Audio src={staticFile("voice/video6-scene3a.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE3B_START}
        durationInFrames={SCENE3B_END - SCENE3B_START}
      >
        <Audio src={staticFile("voice/video6-scene3b.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE4A_START}
        durationInFrames={SCENE4A_END - SCENE4A_START}
      >
        <Audio src={staticFile("voice/video6-scene4a.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE4B_START}
        durationInFrames={SCENE4B_END - SCENE4B_START}
      >
        <Audio src={staticFile("voice/video6-scene4b.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE5A_START}
        durationInFrames={SCENE5A_END - SCENE5A_START}
      >
        <Audio src={staticFile("voice/video6-scene5a.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE5B_START}
        durationInFrames={SCENE5B_END - SCENE5B_START}
      >
        <Audio src={staticFile("voice/video6-scene5b.mp3")} />
      </Sequence>

      {/* ── Scene 6: Score Reveal ── */}
      <Sequence
        from={SCENE6_START}
        durationInFrames={SCENE6_END - SCENE6_START}
      >
        <Audio src={staticFile("voice/video6-scene6.mp3")} />
        <ScoreReveal />
      </Sequence>

      {/* ── Scene 7: End Screen ── */}
      <Sequence
        from={SCENE7_START}
        durationInFrames={SCENE7_END - SCENE7_START}
      >
        <Audio src={staticFile("voice/video6-scene7.mp3")} />
        <EndScreen />
      </Sequence>
    </AbsoluteFill>
  );
};
