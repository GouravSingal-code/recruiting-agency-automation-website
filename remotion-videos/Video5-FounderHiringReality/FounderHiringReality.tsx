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

// ── Color palette ──────────────────────────────────────────────────────────
const BG = "#0A0A0A";
const RED = "#FF3B3B";
const GREEN = "#00E676";
const GREEN_DIM = "#0A2E1A";
const WHITE = "#FFFFFF";
const GRAY = "#888888";
const GRAY_DIM = "#333333";
const BLUE_MUTED = "#4A6FA5";
const BLUE_DIM = "#1A2A40";

// ── Font base ──────────────────────────────────────────────────────────────
const fontBase: React.CSSProperties = {
  fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
  fontWeight: 800,
};

// ── Helpers ────────────────────────────────────────────────────────────────
const useCountUp = (
  frame: number,
  startFrame: number,
  endFrame: number,
  target: number
): number => {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.round(progress * target);
};

const clamp = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ── Scene header component ─────────────────────────────────────────────────
const SceneHeader: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
  color?: string;
}> = ({ text, frame, startFrame, color = GRAY }) => {
  const opacity = clamp(frame, [startFrame, startFrame + 12], [0, 1]);
  const y = clamp(frame, [startFrame, startFrame + 15], [-30, 0]);
  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <span
        style={{
          ...fontBase,
          fontSize: 30,
          color,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// ── LinkedIn DM message bubble ─────────────────────────────────────────────
const MessageBubble: React.FC<{
  text: string;
  sent?: boolean;
  opacity?: number;
  translateX?: number;
}> = ({ text, sent = true, opacity = 1, translateX = 0 }) => (
  <div
    style={{
      display: "flex",
      justifyContent: sent ? "flex-end" : "flex-start",
      opacity,
      transform: `translateX(${translateX}px)`,
      marginBottom: 10,
    }}
  >
    <div
      style={{
        maxWidth: 420,
        padding: "14px 20px",
        borderRadius: sent ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: sent ? BLUE_MUTED : GRAY_DIM,
        color: WHITE,
        fontSize: 22,
        fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
        fontWeight: 500,
        lineHeight: 1.4,
      }}
    >
      {text}
    </div>
  </div>
);

// ── Typing indicator dots ──────────────────────────────────────────────────
const TypingIndicator: React.FC<{ frame: number; opacity?: number }> = ({
  frame,
  opacity = 1,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      opacity,
      marginBottom: 10,
    }}
  >
    <div
      style={{
        padding: "14px 20px",
        borderRadius: "18px 18px 18px 4px",
        background: GRAY_DIM,
        display: "flex",
        gap: 6,
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: GRAY,
            opacity: 0.4 + 0.6 * Math.sin((frame * 0.15 + i * 1.2) % (Math.PI * 2)),
          }}
        />
      ))}
    </div>
  </div>
);

// ── Conversation row for inbox view ────────────────────────────────────────
const ConversationRow: React.FC<{
  name: string;
  status: string;
  statusColor: string;
  opacity?: number;
  y?: number;
}> = ({ name, status, statusColor, opacity = 1, y = 0 }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "16px 24px",
      borderBottom: `1px solid ${GRAY_DIM}`,
      opacity,
      transform: `translateY(${y}px)`,
    }}
  >
    {/* Avatar */}
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: BLUE_DIM,
        marginRight: 16,
        flexShrink: 0,
      }}
    />
    <div style={{ flex: 1 }}>
      <div
        style={{
          ...fontBase,
          fontSize: 22,
          color: WHITE,
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 18,
          fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
          color: statusColor,
          fontWeight: 500,
        }}
      >
        {status}
      </div>
    </div>
  </div>
);

// ── Agency card ────────────────────────────────────────────────────────────
const AgencyCard: React.FC<{
  name: string;
  price: string;
  opacity: number;
  scale: number;
  y?: number;
}> = ({ name, price, opacity, scale, y = 0 }) => (
  <div
    style={{
      background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
      borderRadius: 20,
      padding: "32px 40px",
      border: "1px solid #2A2A4A",
      opacity,
      transform: `scale(${scale}) translateY(${y}px)`,
      marginBottom: 20,
      width: 500,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}
  >
    <div
      style={{
        ...fontBase,
        fontSize: 28,
        color: WHITE,
        fontWeight: 700,
        marginBottom: 12,
      }}
    >
      {name}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ ...fontBase, fontSize: 64, color: RED }}>{price}</span>
    </div>
    <div
      style={{
        fontSize: 22,
        fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
        color: GRAY,
        fontWeight: 500,
        marginTop: 4,
      }}
    >
      recruiter fee
    </div>
  </div>
);

// ── Red flag pill ──────────────────────────────────────────────────────────
const RedFlag: React.FC<{ text: string; opacity: number; x?: number }> = ({
  text,
  opacity,
  x = 0,
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "14px 24px",
      borderRadius: 14,
      background: "rgba(255,59,59,0.12)",
      border: `1px solid ${RED}`,
      opacity,
      transform: `translateX(${x}px)`,
      marginBottom: 14,
    }}
  >
    <span style={{ fontSize: 24 }}>&#9888;</span>
    <span
      style={{
        ...fontBase,
        fontSize: 26,
        color: RED,
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  </div>
);

// ── Cycle node ─────────────────────────────────────────────────────────────
const CycleNode: React.FC<{
  label: string;
  icon: string;
  angle: number;
  radius: number;
  opacity: number;
  color: string;
}> = ({ label, icon, angle, radius, opacity, color }) => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: `rgba(255,59,59,0.15)`,
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          ...fontBase,
          fontSize: 18,
          color,
          fontWeight: 600,
          textAlign: "center",
          maxWidth: 110,
          lineHeight: 1.2,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
export const FounderHiringReality: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Frame boundaries (matched to Jessica audio + ~1s padding per scene) ─
  const S1_START = 0; // Scene 1: LinkedIn Grind (audio 7.8s → 9s)
  const S1_END = 9 * fps; // 270
  const S2_START = S1_END; // Scene 2: The Silence (audio 6.4s → 7.5s)
  const S2_END = Math.round(16.5 * fps); // 495
  const S3_START = S2_END; // Scene 3: Recruiter Sticker Shock (audio 4.5s → 5.5s)
  const S3_END = 22 * fps; // 660
  const S4_START = S3_END; // Scene 4: No Hire (audio 5.2s → 6.5s)
  const S4_END = Math.round(28.5 * fps); // 855
  const S5_START = S4_END; // Scene 5: Bad Hire (audio 5.6s → 7s)
  const S5_END = Math.round(35.5 * fps); // 1065
  const S6_START = S5_END; // Scene 6: The Cycle (audio 6.3s → 7.5s)
  const S6_END = 43 * fps; // 1290
  const S7_START = S6_END; // Scene 7: Break the Cycle (audio 5.4s → 7s)
  const S7_END = 50 * fps; // 1500

  // ════════════════════════════════════════════════════════════════════════
  // SCENE 1: The LinkedIn Grind (0-3s)
  // ════════════════════════════════════════════════════════════════════════
  const s1LocalFrame = frame - S1_START;
  const s1Opacity = clamp(frame, [S1_START, S1_START + 8], [0, 1]) *
    clamp(frame, [S1_END - 8, S1_END], [1, 0]);

  // Messages send one by one
  const msg1Op = clamp(frame, [S1_START + 10, S1_START + 18], [0, 1]);
  const msg1X = clamp(frame, [S1_START + 10, S1_START + 18], [80, 0]);
  const msg2Op = clamp(frame, [S1_START + 25, S1_START + 33], [0, 1]);
  const msg2X = clamp(frame, [S1_START + 25, S1_START + 33], [80, 0]);
  const msg3Op = clamp(frame, [S1_START + 40, S1_START + 48], [0, 1]);
  const msg3X = clamp(frame, [S1_START + 40, S1_START + 48], [80, 0]);
  const msg4Op = clamp(frame, [S1_START + 55, S1_START + 63], [0, 1]);
  const msg4X = clamp(frame, [S1_START + 55, S1_START + 63], [80, 0]);

  const messageCount = useCountUp(frame, S1_START + 10, S1_END - 10, 47);
  const counterOp = clamp(frame, [S1_START + 15, S1_START + 25], [0, 1]);

  // ════════════════════════════════════════════════════════════════════════
  // SCENE 2: The Silence (3-6s)
  // ════════════════════════════════════════════════════════════════════════
  const s2Opacity = clamp(frame, [S2_START, S2_START + 10], [0, 1]) *
    clamp(frame, [S2_END - 8, S2_END], [1, 0]);

  const row1Op = clamp(frame, [S2_START + 8, S2_START + 16], [0, 1]);
  const row2Op = clamp(frame, [S2_START + 18, S2_START + 26], [0, 1]);
  const row3Op = clamp(frame, [S2_START + 28, S2_START + 36], [0, 1]);
  const row4Op = clamp(frame, [S2_START + 38, S2_START + 46], [0, 1]);
  const row5Op = clamp(frame, [S2_START + 48, S2_START + 56], [0, 1]);

  // Reply bubbles
  const reply1Op = clamp(frame, [S2_START + 50, S2_START + 58], [0, 1]);
  const reply2Op = clamp(frame, [S2_START + 60, S2_START + 68], [0, 1]);

  // Typing indicator that appears then fades (ghosting)
  const typingOp =
    clamp(frame, [S2_START + 55, S2_START + 60], [0, 1]) *
    clamp(frame, [S2_START + 72, S2_START + 80], [1, 0]);

  const replyCountVal = useCountUp(frame, S2_START + 50, S2_END - 15, 3);
  const replyCountOp = clamp(frame, [S2_START + 50, S2_START + 58], [0, 1]);

  // ════════════════════════════════════════════════════════════════════════
  // SCENE 3: Recruiter Sticker Shock (6-9s)
  // ════════════════════════════════════════════════════════════════════════
  const s3Opacity = clamp(frame, [S3_START, S3_START + 10], [0, 1]) *
    clamp(frame, [S3_END - 8, S3_END], [1, 0]);

  const card1Scale = spring({
    frame: frame - S3_START - 15,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.6 },
  });
  const card1Op = clamp(frame, [S3_START + 15, S3_START + 25], [0, 1]);

  const priceDropScale = spring({
    frame: frame - S3_START - 30,
    fps,
    config: { damping: 6, stiffness: 300, mass: 0.8 },
  });

  const card2Scale = spring({
    frame: frame - S3_START - 50,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.6 },
  });
  const card2Op = clamp(frame, [S3_START + 50, S3_START + 58], [0, 1]);

  // Deflate / zoom-out on sticker shock
  const shockZoom = clamp(frame, [S3_START + 35, S3_START + 50], [1, 0.94]);

  // ════════════════════════════════════════════════════════════════════════
  // SCENE 4: No Hire (9-12s)
  // ════════════════════════════════════════════════════════════════════════
  const s4Opacity = clamp(frame, [S4_START, S4_START + 10], [0, 1]) *
    clamp(frame, [S4_END - 8, S4_END], [1, 0]);

  // Calendar flip
  const calWeek = Math.min(
    8,
    Math.floor(
      clamp(frame, [S4_START + 10, S4_START + 40], [1, 8.99])
    )
  );
  const calFlipOp = clamp(frame, [S4_START + 8, S4_START + 15], [0, 1]);

  // "3 months. No hire." text
  const noHireOp = clamp(frame, [S4_START + 42, S4_START + 52], [0, 1]);
  const noHireY = clamp(frame, [S4_START + 42, S4_START + 52], [40, 0]);

  // Shaky "HIRED" stamp
  const hiredOp = clamp(frame, [S4_START + 60, S4_START + 68], [0, 1]);
  const hiredScale = spring({
    frame: frame - S4_START - 60,
    fps,
    config: { damping: 5, stiffness: 200, mass: 0.7 },
  });
  const hiredShake =
    frame >= S4_START + 60
      ? Math.sin(frame * 0.8) * 2 + Math.cos(frame * 1.3) * 1.5
      : 0;

  // "Settled for best available" text
  const settledOp = clamp(frame, [S4_START + 72, S4_START + 80], [0, 1]);

  // ════════════════════════════════════════════════════════════════════════
  // SCENE 5: The Bad Hire (12-15s)
  // ════════════════════════════════════════════════════════════════════════
  const s5Opacity = clamp(frame, [S5_START, S5_START + 10], [0, 1]) *
    clamp(frame, [S5_END - 8, S5_END], [1, 0]);

  const flag1Op = clamp(frame, [S5_START + 12, S5_START + 20], [0, 1]);
  const flag1X = clamp(frame, [S5_START + 12, S5_START + 20], [-60, 0]);
  const flag2Op = clamp(frame, [S5_START + 24, S5_START + 32], [0, 1]);
  const flag2X = clamp(frame, [S5_START + 24, S5_START + 32], [60, 0]);
  const flag3Op = clamp(frame, [S5_START + 36, S5_START + 44], [0, 1]);
  const flag3X = clamp(frame, [S5_START + 36, S5_START + 44], [-60, 0]);

  // Performance bar going red
  const perfWidth = clamp(frame, [S5_START + 8, S5_START + 45], [80, 20]);
  const perfColor = clamp(frame, [S5_START + 8, S5_START + 45], [0, 1]);

  // "Terminated" stamp
  const termOp = clamp(frame, [S5_START + 50, S5_START + 58], [0, 1]);
  const termScale = spring({
    frame: frame - S5_START - 50,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.5 },
  });

  // "Back to square one"
  const backOp = clamp(frame, [S5_START + 65, S5_START + 75], [0, 1]);
  const backY = clamp(frame, [S5_START + 65, S5_START + 75], [30, 0]);

  // ════════════════════════════════════════════════════════════════════════
  // SCENE 6: The Painful Cycle (15-17s)
  // ════════════════════════════════════════════════════════════════════════
  const s6Opacity = clamp(frame, [S6_START, S6_START + 10], [0, 1]) *
    clamp(frame, [S6_END - 6, S6_END], [1, 0]);

  const cycleRotation = clamp(frame, [S6_START, S6_END], [0, 360]);
  const cycleRedTint = clamp(frame, [S6_START + 20, S6_END], [0, 0.25]);

  const cycleLabels = [
    { label: "LinkedIn\nGrind", icon: "\u{1F4AC}" },
    { label: "Ghosted", icon: "\u{1F47B}" },
    { label: "Agency\n$$$", icon: "\u{1F4B8}" },
    { label: "Bad\nHire", icon: "\u{274C}" },
  ];
  const cycleRadius = 220;

  // ════════════════════════════════════════════════════════════════════════
  // SCENE 7: Break the Cycle (17-22s)
  // ════════════════════════════════════════════════════════════════════════
  const s7LocalFrame = frame - S7_START;

  // Shatter effect: pieces fly outward
  const shatterProgress = clamp(frame, [S7_START, S7_START + 20], [0, 1]);
  const shatterOp = clamp(frame, [S7_START, S7_START + 20], [1, 0]);

  // "Break the cycle" text
  const breakTextScale = spring({
    frame: s7LocalFrame - 18,
    fps,
    config: { damping: 10, stiffness: 160, mass: 0.6 },
  });
  const breakTextOp = clamp(frame, [S7_START + 18, S7_START + 28], [0, 1]);

  // Value prop
  const valueOp = clamp(frame, [S7_START + 45, S7_START + 55], [0, 1]);
  const valueY = clamp(frame, [S7_START + 45, S7_START + 55], [30, 0]);

  // Brand
  const brandOp = clamp(frame, [S7_START + 70, S7_START + 80], [0, 1]);
  const brandGlow = spring({
    frame: s7LocalFrame - 70,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  // CTA
  const ctaOp = clamp(frame, [S7_START + 95, S7_START + 105], [0, 1]);
  const ctaScale = spring({
    frame: s7LocalFrame - 95,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });

  // CTA pulse
  const ctaPulse =
    frame >= S7_START + 110
      ? 1 + 0.03 * Math.sin((frame - S7_START - 110) * 0.12)
      : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Per-scene narration audio — synced to scene boundaries */}
      <Sequence from={S1_START} durationInFrames={S1_END - S1_START}>
        <Audio src={staticFile("voice/video5-scene1.mp3")} />
      </Sequence>
      <Sequence from={S2_START} durationInFrames={S2_END - S2_START}>
        <Audio src={staticFile("voice/video5-scene2.mp3")} />
      </Sequence>
      <Sequence from={S3_START} durationInFrames={S3_END - S3_START}>
        <Audio src={staticFile("voice/video5-scene3.mp3")} />
      </Sequence>
      <Sequence from={S4_START} durationInFrames={S4_END - S4_START}>
        <Audio src={staticFile("voice/video5-scene4.mp3")} />
      </Sequence>
      <Sequence from={S5_START} durationInFrames={S5_END - S5_START}>
        <Audio src={staticFile("voice/video5-scene5.mp3")} />
      </Sequence>
      <Sequence from={S6_START} durationInFrames={S6_END - S6_START}>
        <Audio src={staticFile("voice/video5-scene6.mp3")} />
      </Sequence>
      <Sequence from={S7_START} durationInFrames={S7_END - S7_START}>
        <Audio src={staticFile("voice/video5-scene7.mp3")} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 1: The LinkedIn Grind (0-5s)
          ═══════════════════════════════════════════════════════════════════ */}
      <Sequence from={S1_START} durationInFrames={S1_END - S1_START}>
        <AbsoluteFill style={{ opacity: s1Opacity }}>
          <SceneHeader
            text="Week 1-2: The LinkedIn Grind"
            frame={frame}
            startFrame={S1_START}
            color={BLUE_MUTED}
          />

          {/* LinkedIn-style DM mockup */}
          <div
            style={{
              position: "absolute",
              top: 180,
              left: 60,
              right: 60,
              background: "#111111",
              borderRadius: 20,
              padding: "28px 24px",
              border: `1px solid ${GRAY_DIM}`,
            }}
          >
            {/* Header bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: `1px solid ${GRAY_DIM}`,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: BLUE_DIM,
                }}
              />
              <div>
                <div
                  style={{
                    ...fontBase,
                    fontSize: 22,
                    color: WHITE,
                    fontWeight: 600,
                  }}
                >
                  Sr. Backend Engineer
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
                    color: GRAY,
                  }}
                >
                  Messaging
                </div>
              </div>
            </div>

            {/* Messages flying out */}
            <MessageBubble
              text="Hi! I'm the CTO at a Series A startup..."
              sent
              opacity={msg1Op}
              translateX={msg1X}
            />
            <MessageBubble
              text="We're building something exciting in fintech..."
              sent
              opacity={msg2Op}
              translateX={msg2X}
            />
            <MessageBubble
              text="Would love to chat about the role!"
              sent
              opacity={msg3Op}
              translateX={msg3X}
            />
            <MessageBubble
              text="Competitive equity package + flexible remote..."
              sent
              opacity={msg4Op}
              translateX={msg4X}
            />

            {/* Typing indicator */}
            {s1LocalFrame > 60 && (
              <TypingIndicator
                frame={frame}
                opacity={clamp(frame, [S1_START + 60, S1_START + 66], [0, 0.6])}
              />
            )}
          </div>

          {/* Message counter */}
          <div
            style={{
              position: "absolute",
              bottom: 280,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: counterOp,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 32px",
                borderRadius: 16,
                background: "rgba(74,111,165,0.15)",
                border: `1px solid ${BLUE_MUTED}`,
              }}
            >
              <span style={{ fontSize: 28 }}>&#x1F4E8;</span>
              <span
                style={{
                  ...fontBase,
                  fontSize: 36,
                  color: BLUE_MUTED,
                  fontWeight: 700,
                }}
              >
                {messageCount} messages sent
              </span>
            </div>
          </div>

          {/* Hopeful sentiment */}
          <div
            style={{
              position: "absolute",
              bottom: 180,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: clamp(frame, [S1_START + 50, S1_START + 60], [0, 0.7]),
            }}
          >
            <span
              style={{
                ...fontBase,
                fontSize: 24,
                color: GRAY,
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              "Someone will bite..."
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 2: The Silence (3-6s)
          ═══════════════════════════════════════════════════════════════════ */}
      <Sequence from={S2_START} durationInFrames={S2_END - S2_START}>
        <AbsoluteFill style={{ opacity: s2Opacity }}>
          <SceneHeader
            text="Week 3-4: The Silence"
            frame={frame}
            startFrame={S2_START}
            color={GRAY}
          />

          {/* Inbox view */}
          <div
            style={{
              position: "absolute",
              top: 180,
              left: 50,
              right: 50,
              background: "#111111",
              borderRadius: 20,
              border: `1px solid ${GRAY_DIM}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderBottom: `1px solid ${GRAY_DIM}`,
              }}
            >
              <span
                style={{
                  ...fontBase,
                  fontSize: 22,
                  color: GRAY,
                  fontWeight: 600,
                }}
              >
                Inbox
              </span>
            </div>

            <ConversationRow
              name="Alex Chen"
              status="Seen \u2713\u2713"
              statusColor={GRAY}
              opacity={row1Op}
            />
            <ConversationRow
              name="Sarah Kim"
              status="Not interested right now"
              statusColor={RED}
              opacity={row2Op}
            />
            <ConversationRow
              name="David Park"
              status="Seen \u2713\u2713"
              statusColor={GRAY}
              opacity={row3Op}
            />
            <ConversationRow
              name="Priya Sharma"
              status="Already accepted another offer"
              statusColor={RED}
              opacity={row4Op}
            />
            <ConversationRow
              name="James Liu"
              status="No reply"
              statusColor={"#555555"}
              opacity={row5Op}
            />
          </div>

          {/* Reply bubbles popping in */}
          <div
            style={{
              position: "absolute",
              top: 780,
              left: 60,
              right: 60,
            }}
          >
            <MessageBubble
              text="Not interested right now"
              sent={false}
              opacity={reply1Op}
            />
            <MessageBubble
              text="Already accepted another offer"
              sent={false}
              opacity={reply2Op}
            />
            {/* Ghost typing */}
            <TypingIndicator frame={frame} opacity={typingOp} />
          </div>

          {/* Reply counter */}
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: replyCountOp,
            }}
          >
            <span
              style={{
                ...fontBase,
                fontSize: 42,
                color: RED,
                fontWeight: 700,
              }}
            >
              {replyCountVal} out of 47 replied
            </span>
          </div>

          {/* Deflating feeling text */}
          <div
            style={{
              position: "absolute",
              bottom: 150,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: clamp(frame, [S2_END - 30, S2_END - 18], [0, 0.6]),
            }}
          >
            <span
              style={{
                ...fontBase,
                fontSize: 22,
                color: GRAY,
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              Weeks of outreach. Three responses.
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 3: Recruiter Sticker Shock (6-9s)
          ═══════════════════════════════════════════════════════════════════ */}
      <Sequence from={S3_START} durationInFrames={S3_END - S3_START}>
        <AbsoluteFill
          style={{
            opacity: s3Opacity,
            transform: `scale(${shockZoom})`,
          }}
        >
          <SceneHeader
            text='Week 5-6: "Maybe a Recruiter?"'
            frame={frame}
            startFrame={S3_START}
            color={GRAY}
          />

          <div
            style={{
              position: "absolute",
              top: 240,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AgencyCard
              name="Apex Talent Partners"
              price="$15,000"
              opacity={card1Op}
              scale={card1Scale}
            />

            {/* Dramatic price emphasis */}
            {frame >= S3_START + 30 && (
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  left: "50%",
                  transform: `translate(-50%, 0) scale(${priceDropScale})`,
                  opacity: clamp(
                    frame,
                    [S3_START + 30, S3_START + 38],
                    [0, 1]
                  ),
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    ...fontBase,
                    fontSize: 120,
                    color: RED,
                    textShadow: `0 0 40px rgba(255,59,59,0.5)`,
                    letterSpacing: "-0.03em",
                  }}
                >
                  $15,000
                </div>
                <div
                  style={{
                    textAlign: "center",
                    ...fontBase,
                    fontSize: 28,
                    color: GRAY,
                    fontWeight: 500,
                    marginTop: -4,
                  }}
                >
                  recruiter fee
                </div>
              </div>
            )}

            <div style={{ marginTop: 220 }}>
              <AgencyCard
                name="Elite Search Group"
                price="$12,000 - $20,000"
                opacity={card2Op}
                scale={card2Scale}
              />
            </div>
          </div>

          {/* Shock reaction text */}
          <div
            style={{
              position: "absolute",
              bottom: 200,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: clamp(frame, [S3_START + 55, S3_START + 65], [0, 0.8]),
            }}
          >
            <span
              style={{
                ...fontBase,
                fontSize: 26,
                color: GRAY,
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              "That's our entire Q2 marketing budget..."
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 4: No Hire, Giving Up (9-12s)
          ═══════════════════════════════════════════════════════════════════ */}
      <Sequence from={S4_START} durationInFrames={S4_END - S4_START}>
        <AbsoluteFill style={{ opacity: s4Opacity }}>
          <SceneHeader
            text="Week 8: Desperation"
            frame={frame}
            startFrame={S4_START}
            color={GRAY}
          />

          {/* Calendar flip */}
          <div
            style={{
              position: "absolute",
              top: 220,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: calFlipOp,
            }}
          >
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: 24,
                background: "#151515",
                border: `2px solid ${GRAY_DIM}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: RED,
                  width: "100%",
                  padding: "10px 0",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    ...fontBase,
                    fontSize: 22,
                    color: WHITE,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  WEEK
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    ...fontBase,
                    fontSize: 120,
                    color: WHITE,
                    lineHeight: 1,
                  }}
                >
                  {calWeek}
                </span>
              </div>
            </div>
          </div>

          {/* "3 months. No hire." */}
          <div
            style={{
              position: "absolute",
              top: 570,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: noHireOp,
              transform: `translateY(${noHireY}px)`,
            }}
          >
            <div
              style={{
                ...fontBase,
                fontSize: 56,
                color: WHITE,
                lineHeight: 1.3,
              }}
            >
              3 months.
              <br />
              <span style={{ color: RED }}>No hire.</span>
            </div>
          </div>

          {/* Shaky "HIRED" stamp */}
          <div
            style={{
              position: "absolute",
              top: 820,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: hiredOp,
              transform: `scale(${hiredScale}) rotate(${hiredShake}deg)`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "16px 48px",
                border: `4px solid #FFAA00`,
                borderRadius: 12,
                transform: "rotate(-5deg)",
              }}
            >
              <span
                style={{
                  ...fontBase,
                  fontSize: 52,
                  color: "#FFAA00",
                  letterSpacing: "0.15em",
                }}
              >
                HIRED?
              </span>
            </div>
          </div>

          {/* "Settled" text */}
          <div
            style={{
              position: "absolute",
              bottom: 280,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: settledOp,
            }}
          >
            <span
              style={{
                ...fontBase,
                fontSize: 26,
                color: GRAY,
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              Settled for the best available option.
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 5: The Bad Hire (12-15s)
          ═══════════════════════════════════════════════════════════════════ */}
      <Sequence from={S5_START} durationInFrames={S5_END - S5_START}>
        <AbsoluteFill style={{ opacity: s5Opacity }}>
          <SceneHeader
            text="Month 4-5: The Bad Hire"
            frame={frame}
            startFrame={S5_START}
            color={RED}
          />

          {/* Performance bar */}
          <div
            style={{
              position: "absolute",
              top: 200,
              left: 80,
              right: 80,
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
                  ...fontBase,
                  fontSize: 22,
                  color: GRAY,
                  fontWeight: 600,
                }}
              >
                Performance
              </span>
              <span
                style={{
                  ...fontBase,
                  fontSize: 22,
                  color: interpolateColor(perfColor, RED, "#FFAA00"),
                  fontWeight: 600,
                }}
              >
                {Math.round(perfWidth)}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 16,
                borderRadius: 8,
                background: GRAY_DIM,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${perfWidth}%`,
                  height: "100%",
                  borderRadius: 8,
                  background: interpolateColor(perfColor, RED, "#FFAA00"),
                  transition: "background 0.1s",
                }}
              />
            </div>
          </div>

          {/* Red flags */}
          <div
            style={{
              position: "absolute",
              top: 320,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <RedFlag text="Missed deadlines" opacity={flag1Op} x={flag1X} />
            <RedFlag
              text="Can't work independently"
              opacity={flag2Op}
              x={flag2X}
            />
            <RedFlag text="Culture mismatch" opacity={flag3Op} x={flag3X} />
          </div>

          {/* Terminated stamp */}
          <div
            style={{
              position: "absolute",
              top: 680,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: termOp,
              transform: `scale(${termScale}) rotate(-8deg)`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "14px 44px",
                border: `4px solid ${RED}`,
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  ...fontBase,
                  fontSize: 52,
                  color: RED,
                  letterSpacing: "0.2em",
                }}
              >
                TERMINATED
              </span>
            </div>
          </div>

          {/* "Back to square one" */}
          <div
            style={{
              position: "absolute",
              bottom: 300,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: backOp,
              transform: `translateY(${backY}px)`,
            }}
          >
            <div
              style={{
                ...fontBase,
                fontSize: 48,
                color: WHITE,
                lineHeight: 1.3,
              }}
            >
              Back to{" "}
              <span style={{ color: RED }}>square one.</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 6: The Painful Cycle (15-17s)
          ═══════════════════════════════════════════════════════════════════ */}
      <Sequence from={S6_START} durationInFrames={S6_END - S6_START}>
        <AbsoluteFill style={{ opacity: s6Opacity }}>
          {/* Red tint overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `rgba(255,59,59,${cycleRedTint})`,
              pointerEvents: "none",
            }}
          />

          <SceneHeader
            text="The Startup Hiring Loop"
            frame={frame}
            startFrame={S6_START}
            color={RED}
          />

          {/* Rotating cycle */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: cycleRadius * 2 + 140,
                height: cycleRadius * 2 + 140,
                transform: `rotate(${cycleRotation}deg)`,
              }}
            >
              {/* Circle path (SVG ring) */}
              <svg
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                width={cycleRadius * 2 + 40}
                height={cycleRadius * 2 + 40}
                viewBox={`0 0 ${cycleRadius * 2 + 40} ${cycleRadius * 2 + 40}`}
              >
                <circle
                  cx={cycleRadius + 20}
                  cy={cycleRadius + 20}
                  r={cycleRadius}
                  fill="none"
                  stroke={RED}
                  strokeWidth={3}
                  strokeDasharray="12 8"
                  opacity={0.5}
                />
                {/* Arrows on the ring */}
                {[0, 1, 2, 3].map((i) => {
                  const a = (i * Math.PI) / 2 + Math.PI / 4;
                  const ax = cycleRadius + 20 + Math.cos(a) * cycleRadius;
                  const ay = cycleRadius + 20 + Math.sin(a) * cycleRadius;
                  const arrowAngle = (a * 180) / Math.PI + 90;
                  return (
                    <g
                      key={i}
                      transform={`translate(${ax},${ay}) rotate(${arrowAngle})`}
                    >
                      <polygon
                        points="-8,6 0,-8 8,6"
                        fill={RED}
                        opacity={0.7}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Nodes - counter-rotate so text stays upright */}
              {cycleLabels.map((item, i) => {
                const angle = (i * Math.PI * 2) / 4 - Math.PI / 2;
                const nodeOp = clamp(
                  frame,
                  [S6_START + 5 + i * 6, S6_START + 12 + i * 6],
                  [0, 1]
                );
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) rotate(${-cycleRotation}deg)`,
                    }}
                  >
                    <CycleNode
                      label={item.label}
                      icon={item.icon}
                      angle={angle}
                      radius={cycleRadius}
                      opacity={nodeOp}
                      color={RED}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* "The startup hiring loop" overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 200,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: clamp(frame, [S6_START + 25, S6_START + 35], [0, 1]),
            }}
          >
            <span
              style={{
                ...fontBase,
                fontSize: 36,
                color: WHITE,
                fontWeight: 700,
              }}
            >
              Sound familiar?
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 7: Break the Cycle (17-22s)
          ═══════════════════════════════════════════════════════════════════ */}
      <Sequence from={S7_START} durationInFrames={S7_END - S7_START}>
        <AbsoluteFill>
          {/* Shatter remnants of the cycle */}
          {shatterOp > 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: shatterOp,
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 12;
                const dist = shatterProgress * 600;
                const rotation = shatterProgress * (120 + i * 30);
                const x = Math.cos(angle) * dist;
                const y = Math.sin(angle) * dist;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: 40 + (i % 3) * 20,
                      height: 8,
                      background: RED,
                      borderRadius: 4,
                      opacity: 1 - shatterProgress,
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Background gradient for solution */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center, #0A1F14 0%, ${BG} 65%)`,
              opacity: clamp(frame, [S7_START + 15, S7_START + 30], [0, 1]),
            }}
          />

          {/* "Break the cycle." */}
          <div
            style={{
              position: "absolute",
              top: 380,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: breakTextOp,
              transform: `scale(${breakTextScale})`,
            }}
          >
            <div
              style={{
                ...fontBase,
                fontSize: 72,
                color: WHITE,
                lineHeight: 1.2,
              }}
            >
              Break the cycle.
            </div>
          </div>

          {/* Value prop */}
          <div
            style={{
              position: "absolute",
              top: 560,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: valueOp,
              transform: `translateY(${valueY}px)`,
            }}
          >
            <div
              style={{
                ...fontBase,
                fontSize: 38,
                color: GREEN,
                lineHeight: 1.5,
                fontWeight: 700,
                padding: "0 60px",
              }}
            >
              6 pre-screened candidates.
              <br />
              10 days.
            </div>
          </div>

          {/* Brand */}
          <div
            style={{
              position: "absolute",
              top: 820,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: brandOp,
            }}
          >
            <div
              style={{
                ...fontBase,
                fontSize: 64,
                color: WHITE,
                letterSpacing: "0.03em",
                textShadow: `0 0 ${brandGlow * 40}px rgba(0,230,118,${brandGlow * 0.4})`,
              }}
            >
              Shortlisted
              <span style={{ color: GREEN }}>.ai</span>
            </div>
            <div
              style={{
                ...fontBase,
                fontSize: 22,
                color: GRAY,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                marginTop: 8,
              }}
            >
              AI-Powered Recruiting
            </div>
          </div>

          {/* CTA Button */}
          <div
            style={{
              position: "absolute",
              bottom: 320,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: ctaOp,
              transform: `scale(${ctaScale * ctaPulse})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "22px 64px",
                borderRadius: 16,
                background: `linear-gradient(135deg, ${GREEN} 0%, #00C864 100%)`,
                boxShadow: `0 0 30px rgba(0,230,118,0.35), 0 4px 20px rgba(0,0,0,0.3)`,
              }}
            >
              <span
                style={{
                  ...fontBase,
                  fontSize: 32,
                  color: "#0A0A0A",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                }}
              >
                Book a Demo
              </span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// ── Utility: interpolate between two colors via a 0-1 progress value ───────
function interpolateColor(t: number, colorA: string, colorB: string): string {
  const parseHex = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });
  const a = parseHex(colorA);
  const b = parseHex(colorB);
  const r = Math.round(a.r + (b.r - a.r) * (1 - t));
  const g = Math.round(a.g + (b.g - a.g) * (1 - t));
  const bl = Math.round(a.b + (b.b - a.b) * (1 - t));
  return `rgb(${r},${g},${bl})`;
}
