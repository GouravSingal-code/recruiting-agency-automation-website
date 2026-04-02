import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ── Color palette ──────────────────────────────────────────────────────────
const BG = "#0A0A0A";
const RED = "#FF3B3B";
const RED_DIM = "#3D1111";
const GREEN = "#00E676";
const GREEN_DIM = "#0A2E1A";
const WHITE = "#FFFFFF";
const GRAY = "#888888";
const DIVIDER = "#1E1E1E";

// ── Helpers ────────────────────────────────────────────────────────────────

/** Animate a number counting up from 0 to `target` between frame start..end */
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

const formatDollars = (n: number): string =>
  "$" + n.toLocaleString("en-US");

// ── Sub-components ─────────────────────────────────────────────────────────

const DollarCounter: React.FC<{
  value: number;
  color: string;
  label: string;
  fontSize?: number;
}> = ({ value, color, label, fontSize = 120 }) => (
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
        fontWeight: 900,
        fontSize,
        color,
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
      }}
    >
      {formatDollars(value)}
    </div>
    <div
      style={{
        fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
        fontWeight: 500,
        fontSize: 32,
        color: GRAY,
        marginTop: 8,
      }}
    >
      {label}
    </div>
  </div>
);

const CalendarIcon: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 56,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckMark: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 40,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XMark: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 40,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Resume card visual
const ResumeCard: React.FC<{
  rotation: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
  color: string;
}> = ({ rotation, offsetX, offsetY, opacity, color }) => (
  <div
    style={{
      width: 70,
      height: 90,
      background: color,
      borderRadius: 6,
      transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
      opacity,
      position: "absolute",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    }}
  >
    {/* Fake text lines */}
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          width: i === 0 ? 40 : 50,
          height: 4,
          background: "rgba(255,255,255,0.25)",
          borderRadius: 2,
          margin: "10px auto 0",
        }}
      />
    ))}
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────

export const CostComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Frame boundaries ───────────────────────────────────────────────────
  const TITLE_START = 0;
  const TITLE_END = 2 * fps; // 60
  const SPLIT_START = TITLE_END;
  const SPLIT_SETTLE = 3 * fps; // 90
  const COST_START = 6 * fps; // 180
  const COST_END = 9 * fps; // 270
  const TIME_START = 9 * fps;
  const TIME_END = 11 * fps; // 330
  const QUALITY_START = 11 * fps;
  const QUALITY_END = 13 * fps; // 390
  const VS_START = 13 * fps; // 390
  const VS_END = 14.5 * fps; // 435
  const END_START = Math.round(14.5 * fps); // 435
  const END_FRAME = 18 * fps; // 540

  // ── Title animation (Scene 1: 0-2s) ────────────────────────────────────
  const titleY = interpolate(frame, [TITLE_START, TITLE_START + 15], [80, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const titleOpacity = interpolate(
    frame,
    [TITLE_START, TITLE_START + 12],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const titleFadeOut = interpolate(
    frame,
    [TITLE_END - 15, TITLE_END],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ── Split screen animation (Scene 2: 2-6s) ────────────────────────────
  const splitReveal = interpolate(
    frame,
    [SPLIT_START, SPLIT_SETTLE],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Divider glow pulse
  const glowPulse =
    0.4 +
    0.6 *
      Math.sin(
        interpolate(frame, [SPLIT_START, END_FRAME], [0, Math.PI * 12], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        })
      ) **
        2;

  // ── Cost counters (Scene 3: 6-9s) ─────────────────────────────────────
  const tradCost = useCountUp(frame, COST_START, COST_START + 45, 15000);
  const shortCost = useCountUp(frame, COST_START + 10, COST_START + 30, 299);
  const costOpacity = interpolate(
    frame,
    [COST_START, COST_START + 10],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ── Timeline (Scene 4: 9-11s) ─────────────────────────────────────────
  const timeRevealTrad = interpolate(
    frame,
    [TIME_START, TIME_START + 40],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const timeRevealShort = spring({
    frame: frame - TIME_START - 8,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });

  // ── Quality (Scene 5: 11-13s) ──────────────────────────────────────────
  const qualityOpacity = interpolate(
    frame,
    [QUALITY_START, QUALITY_START + 12],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const qualityScale = spring({
    frame: frame - QUALITY_START,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.6 },
  });

  // ── VS + crumble (Scene 6: 13-14.5s) ──────────────────────────────────
  const vsScale = spring({
    frame: frame - VS_START,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.4 },
  });
  const vsOpacity = interpolate(frame, [VS_START, VS_START + 6], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  // Top side crumble
  const topCrumble = interpolate(
    frame,
    [VS_START + 10, VS_END],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  // Bottom side glow expand
  const bottomGlow = interpolate(
    frame,
    [VS_START + 10, VS_END],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ── End screen (Scene 7: 14.5-18s) ────────────────────────────────────
  const endReveal = interpolate(
    frame,
    [END_START, END_START + 15],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const endTextY = interpolate(
    frame,
    [END_START, END_START + 20],
    [60, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const pricePopScale = spring({
    frame: frame - END_START - 12,
    fps,
    config: { damping: 10, stiffness: 260, mass: 0.5 },
  });

  // ── Determine which content rows are visible ──────────────────────────
  const showSplit = frame >= SPLIT_START;
  const showCost = frame >= COST_START;
  const showTime = frame >= TIME_START;
  const showQuality = frame >= QUALITY_START;
  const showVS = frame >= VS_START;
  const showEnd = frame >= END_START;

  // In end screen, fade out the split
  const splitFadeForEnd = showEnd
    ? interpolate(frame, [END_START, END_START + 10], [1, 0], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    : 1;

  // ── Shared text styles ─────────────────────────────────────────────────
  const fontBase: React.CSSProperties = {
    fontFamily: "SF Pro Display, Inter, system-ui, sans-serif",
    fontWeight: 800,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* ─── Scene 1: Title ───────────────────────────────────────────── */}
      <Sequence from={TITLE_START} durationInFrames={TITLE_END}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: titleOpacity * titleFadeOut,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              ...fontBase,
              fontSize: 72,
              color: WHITE,
              textAlign: "center",
              lineHeight: 1.2,
              padding: "0 60px",
            }}
          >
            Hiring a Senior
            <br />
            Developer?
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ─── Scenes 2-6: Split screen ────────────────────────────────── */}
      {showSplit && (
        <AbsoluteFill style={{ opacity: splitFadeForEnd }}>
          {/* TOP HALF — Traditional Agency */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              overflow: "hidden",
              opacity: showVS ? topCrumble : splitReveal,
              transform: showVS
                ? `scale(${0.95 + topCrumble * 0.05})`
                : `translateY(${(1 - splitReveal) * -40}px)`,
            }}
          >
            {/* Background tint */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg, ${RED_DIM} 0%, ${BG} 100%)`,
              }}
            />

            {/* Label */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "60px 50px 0",
              }}
            >
              <div
                style={{
                  ...fontBase,
                  fontSize: 38,
                  color: RED,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 4,
                  opacity: splitReveal,
                }}
              >
                Traditional Agency
              </div>
              <div
                style={{
                  width: 80,
                  height: 4,
                  background: RED,
                  borderRadius: 2,
                  opacity: splitReveal,
                }}
              />
            </div>

            {/* Content area */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100% - 140px)",
                gap: 40,
              }}
            >
              {/* Cost */}
              {showCost && (
                <div style={{ opacity: costOpacity }}>
                  <DollarCounter
                    value={tradCost}
                    color={RED}
                    label="per hire"
                    fontSize={110}
                  />
                </div>
              )}

              {/* Timeline */}
              {showTime && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    opacity: timeRevealTrad,
                  }}
                >
                  <CalendarIcon color={RED} />
                  <span
                    style={{
                      ...fontBase,
                      fontSize: 48,
                      color: RED,
                    }}
                  >
                    2-3 months
                  </span>
                </div>
              )}

              {/* Quality */}
              {showQuality && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    opacity: qualityOpacity,
                    transform: `scale(${qualityScale})`,
                  }}
                >
                  {/* Messy stack */}
                  <div
                    style={{
                      position: "relative",
                      width: 90,
                      height: 100,
                    }}
                  >
                    <ResumeCard
                      rotation={-12}
                      offsetX={-5}
                      offsetY={8}
                      opacity={0.5}
                      color="#2A1010"
                    />
                    <ResumeCard
                      rotation={8}
                      offsetX={10}
                      offsetY={-2}
                      opacity={0.7}
                      color="#331515"
                    />
                    <ResumeCard
                      rotation={-3}
                      offsetX={2}
                      offsetY={3}
                      opacity={0.9}
                      color="#3D1A1A"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <XMark color={RED} size={32} />
                      <span
                        style={{
                          ...fontBase,
                          fontSize: 34,
                          color: WHITE,
                          fontWeight: 600,
                        }}
                      >
                        Unvetted resumes
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DIVIDER LINE with glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 3,
              background: DIVIDER,
              transform: `translateY(-50%) scaleX(${splitReveal})`,
              zIndex: 10,
              boxShadow: `0 0 ${20 * glowPulse}px ${8 * glowPulse}px rgba(0, 230, 118, ${0.15 * glowPulse}), 0 0 ${40 * glowPulse}px ${16 * glowPulse}px rgba(0, 230, 118, ${0.08 * glowPulse})`,
            }}
          />

          {/* BOTTOM HALF — Shortlisted.ai */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              overflow: "hidden",
              opacity: splitReveal,
              transform: showVS
                ? `scale(${1 + bottomGlow * 0.03})`
                : `translateY(${(1 - splitReveal) * 40}px)`,
              filter: showVS
                ? `brightness(${1 + bottomGlow * 0.15})`
                : undefined,
            }}
          >
            {/* Background tint */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(0deg, ${GREEN_DIM} 0%, ${BG} 100%)`,
              }}
            />

            {/* Label */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "50px 50px 0",
              }}
            >
              <div
                style={{
                  ...fontBase,
                  fontSize: 38,
                  color: GREEN,
                  letterSpacing: "0.08em",
                  marginBottom: 4,
                  opacity: splitReveal,
                }}
              >
                Shortlisted.ai
              </div>
              <div
                style={{
                  width: 80,
                  height: 4,
                  background: GREEN,
                  borderRadius: 2,
                  opacity: splitReveal,
                }}
              />
            </div>

            {/* Content area */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100% - 130px)",
                gap: 40,
              }}
            >
              {/* Cost */}
              {showCost && (
                <div style={{ opacity: costOpacity }}>
                  <DollarCounter
                    value={shortCost}
                    color={GREEN}
                    label="per role"
                    fontSize={110}
                  />
                </div>
              )}

              {/* Timeline */}
              {showTime && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    opacity: timeRevealShort,
                    transform: `scale(${timeRevealShort})`,
                  }}
                >
                  <CalendarIcon color={GREEN} />
                  <span
                    style={{
                      ...fontBase,
                      fontSize: 48,
                      color: GREEN,
                    }}
                  >
                    10 days
                  </span>
                </div>
              )}

              {/* Quality */}
              {showQuality && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    opacity: qualityOpacity,
                    transform: `scale(${qualityScale})`,
                  }}
                >
                  {/* Clean cards */}
                  <div
                    style={{
                      position: "relative",
                      width: 90,
                      height: 100,
                    }}
                  >
                    <ResumeCard
                      rotation={0}
                      offsetX={0}
                      offsetY={0}
                      opacity={0.95}
                      color="#0D3D1F"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckMark color={GREEN} size={32} />
                      <span
                        style={{
                          ...fontBase,
                          fontSize: 30,
                          color: WHITE,
                          fontWeight: 600,
                        }}
                      >
                        Pre-screened,
                        <br />
                        interview-ready
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* VS badge */}
          {showVS && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${vsScale})`,
                zIndex: 20,
                opacity: vsOpacity * (showEnd ? splitFadeForEnd : 1),
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, #1A1A1A 0%, ${BG} 100%)`,
                  border: `3px solid ${GRAY}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 0 30px rgba(255,59,59,0.3), 0 0 30px rgba(0,230,118,0.3)",
                }}
              >
                <span
                  style={{
                    ...fontBase,
                    fontSize: 44,
                    color: WHITE,
                    letterSpacing: "0.05em",
                  }}
                >
                  VS
                </span>
              </div>
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* ─── Scene 7: End screen ──────────────────────────────────────── */}
      {showEnd && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: endReveal,
            background: `radial-gradient(ellipse at center, #0F1F14 0%, ${BG} 70%)`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 50,
              transform: `translateY(${endTextY}px)`,
            }}
          >
            {/* Tagline */}
            <div
              style={{
                ...fontBase,
                fontSize: 62,
                color: WHITE,
                textAlign: "center",
                lineHeight: 1.25,
                padding: "0 50px",
              }}
            >
              Same result.
              <br />
              <span style={{ color: GREEN }}>Fraction of the cost.</span>
            </div>

            {/* Price callout */}
            <div
              style={{
                transform: `scale(${pricePopScale})`,
                padding: "28px 60px",
                borderRadius: 20,
                background: `linear-gradient(135deg, ${GREEN_DIM} 0%, rgba(0,230,118,0.12) 100%)`,
                border: `2px solid ${GREEN}`,
                boxShadow: `0 0 40px rgba(0,230,118,0.25)`,
              }}
            >
              <span
                style={{
                  ...fontBase,
                  fontSize: 90,
                  color: GREEN,
                  letterSpacing: "-0.02em",
                }}
              >
                $299
              </span>
              <span
                style={{
                  ...fontBase,
                  fontSize: 40,
                  color: GRAY,
                  marginLeft: 8,
                }}
              >
                /role
              </span>
            </div>

            {/* Brand */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                marginTop: 20,
              }}
            >
              <div
                style={{
                  ...fontBase,
                  fontSize: 48,
                  color: WHITE,
                  letterSpacing: "0.04em",
                }}
              >
                Shortlisted
                <span style={{ color: GREEN }}>.ai</span>
              </div>
              <div
                style={{
                  ...fontBase,
                  fontSize: 24,
                  color: GRAY,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                AI-Powered Recruiting
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
