import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { P } from "./palette";

// --- Data ---

const SKILLS = [
  { name: "React Testing", lines: 180, color: P.rose },
  { name: "Auth Patterns", lines: 150, color: P.amber },
  { name: "DB Migrations", lines: 120, color: P.indigo },
  { name: "CSS Architecture", lines: 90, color: P.mint },
];

const CLAUDE_MD_LINES = 45;

const MONO_FONT = '"SF Mono", "Menlo", "Consolas", monospace';
const SANS_FONT =
  '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, sans-serif';

// --- Layout ---

const BAR_LEFT = 100;
const BAR_RIGHT = 1100;
const BAR_WIDTH = BAR_RIGHT - BAR_LEFT;
const BAR_Y = 110;
const BAR_HEIGHT = 44;
const BAR_RADIUS = 10;

const SHELF_Y = 330;
const PROMPT_Y = 510;

// --- Timeline ---
// Accumulating bar: each skill ADDS to the bar. No reset between phases.
// Reset arc at the end for seamless loop.

const PHASES = [
  {
    // Phase 1: React Testing
    promptIn: 14,
    scanStart: 18,
    liftStart: 24,
    flyStart: 28,
    landFrame: 36,
    inflateEnd: 44,
    prompt: '"Write tests for the auth module"',
    skillIndex: 0,
  },
  {
    // Phase 2: CSS Architecture
    promptIn: 42,
    scanStart: 46,
    liftStart: 52,
    flyStart: 56,
    landFrame: 64,
    inflateEnd: 72,
    prompt: '"Fix the CSS grid layout"',
    skillIndex: 3,
  },
  {
    // Phase 3: Auth Patterns
    promptIn: 70,
    scanStart: 74,
    liftStart: 80,
    flyStart: 84,
    landFrame: 92,
    inflateEnd: 100,
    prompt: '"Set up the auth middleware"',
    skillIndex: 1,
  },
];

// Summary + reset
const SUMMARY_IN = 104;
const SUMMARY_HOLD_END = 120;
const RESET_START = 120;
const RESET_END = 142;
const TOTAL_FRAMES = 150;

// --- Card positions ---

const CARD_WIDTH = 210;
const CARD_GAP = 20;
const TOTAL_CARDS_WIDTH =
  SKILLS.length * CARD_WIDTH + (SKILLS.length - 1) * CARD_GAP;
const CARDS_START_X = (1200 - TOTAL_CARDS_WIDTH) / 2;

function getCardCenterX(index: number): number {
  return CARDS_START_X + index * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
}
function getCardLeftX(index: number): number {
  return CARDS_START_X + index * (CARD_WIDTH + CARD_GAP);
}

// --- Math helpers ---

function clamp01(
  value: number,
  inputRange: [number, number],
  easing?: (t: number) => number,
): number {
  return interpolate(value, inputRange, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

function quadBezier(t: number, p0: number, p1: number, p2: number): number {
  const u = 1 - t;
  return u * u * p0 + 2 * u * t * p1 + t * t * p2;
}

function quadBezierTangent(t: number, p0: number, p1: number, p2: number): number {
  return 2 * (1 - t) * (p1 - p0) + 2 * t * (p2 - p1);
}

// --- Scan pulse ---

function getScanPulse(
  frame: number,
  cardIndex: number,
  totalCards: number,
): number {
  for (const phase of PHASES) {
    if (frame >= phase.scanStart && frame < phase.liftStart) {
      const elapsed = frame - phase.scanStart;
      const duration = phase.liftStart - phase.scanStart;
      const normalizedPos = cardIndex / (totalCards - 1);
      const sweepPos = elapsed / duration;
      const dist = Math.abs(normalizedPos - sweepPos);
      return Math.max(0, 1 - dist * 2.5) * 0.6;
    }
  }
  return 0;
}

// --- Prompt crossfade ---
// Two prompts can coexist: outgoing slides up+fades, incoming slides up+fades in

function getPromptStates(frame: number): Array<{
  text: string;
  opacity: number;
  translateY: number;
}> {
  const results: Array<{ text: string; opacity: number; translateY: number }> = [];

  for (let i = 0; i < PHASES.length; i++) {
    const phase = PHASES[i];
    const nextPromptIn = i < PHASES.length - 1 ? PHASES[i + 1].promptIn : SUMMARY_IN;

    if (frame < phase.promptIn) continue;

    // Fade in
    const fadeInT = clamp01(frame, [phase.promptIn, phase.promptIn + 6]);
    const fadeInY = interpolate(fadeInT, [0, 1], [10, 0]);

    // Fade out (crossfade with next)
    const fadeOutStart = nextPromptIn - 2;
    const fadeOutEnd = nextPromptIn + 4;
    const fadeOutT = frame >= fadeOutStart ? clamp01(frame, [fadeOutStart, fadeOutEnd]) : 0;
    const fadeOutY = fadeOutT * -10;

    const opacity = fadeInT * (1 - fadeOutT);
    if (opacity > 0.01) {
      results.push({
        text: phase.prompt,
        opacity,
        translateY: fadeInY + fadeOutY,
      });
    }
  }

  return results;
}

// --- Bar inflation (accumulating) ---
// Each skill adds a segment. Segments persist until reset arc.

function getBarSegments(
  frame: number,
  fps: number,
): Array<{ skillIndex: number; width: number; color: string; name: string }> {
  const segments: Array<{
    skillIndex: number;
    width: number;
    color: string;
    name: string;
  }> = [];

  for (let i = 0; i < PHASES.length; i++) {
    const phase = PHASES[i];
    const skill = SKILLS[phase.skillIndex];
    const maxWidth = (skill.lines / 600) * BAR_WIDTH;

    let progress = 0;

    if (frame >= phase.landFrame) {
      // Inflate with spring
      const inflateSpring = spring({
        frame: frame - phase.landFrame,
        fps,
        config: { damping: 14, stiffness: 220, mass: 0.7 },
      });
      progress = inflateSpring;

      // Reset arc: retract in reverse order (last loaded first)
      if (frame >= RESET_START) {
        // Reverse stagger: phase 2 retracts first, then 1, then 0
        const reverseIndex = PHASES.length - 1 - i;
        const retractStart = RESET_START + reverseIndex * 5;
        const retractEnd = retractStart + 12;
        const retractT = clamp01(frame, [retractStart, retractEnd], Easing.in(Easing.quad));
        progress = inflateSpring * (1 - retractT);
      }
    }

    if (progress > 0.01) {
      segments.push({
        skillIndex: phase.skillIndex,
        width: maxWidth * progress,
        color: skill.color,
        name: skill.name,
      });
    }
  }

  return segments;
}

// --- Total lines counter ---

function getTotalLines(frame: number, fps: number): number {
  let total = CLAUDE_MD_LINES;
  for (const phase of PHASES) {
    const skill = SKILLS[phase.skillIndex];
    if (frame >= phase.landFrame) {
      const inflateSpring = spring({
        frame: frame - phase.landFrame,
        fps,
        config: { damping: 14, stiffness: 220, mass: 0.7 },
      });
      let progress = inflateSpring;

      if (frame >= RESET_START) {
        const i = PHASES.indexOf(phase);
        const reverseIndex = PHASES.length - 1 - i;
        const retractStart = RESET_START + reverseIndex * 5;
        const retractEnd = retractStart + 12;
        const retractT = clamp01(frame, [retractStart, retractEnd], Easing.in(Easing.quad));
        progress = inflateSpring * (1 - retractT);
      }

      total += Math.round(skill.lines * progress);
    }
  }
  return total;
}

// --- File icon ---

const FileIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <path
      d="M4 2h7l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"
      fill={`${color}25`}
      stroke={`${color}70`}
      strokeWidth={1.2}
    />
    <path d="M11 2v4h4" stroke={`${color}50`} strokeWidth={1.2} />
    <line x1="5.5" y1="9" x2="12.5" y2="9" stroke={`${color}40`} strokeWidth={1} />
    <line x1="5.5" y1="11.5" x2="10.5" y2="11.5" stroke={`${color}40`} strokeWidth={1} />
    <line x1="5.5" y1="14" x2="11.5" y2="14" stroke={`${color}40`} strokeWidth={1} />
  </svg>
);

// --- Component ---

export const OnDemandLoading = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Entrance (compressed to 14 frames) ---

  const labelIn = spring({ frame, fps, config: { damping: 200 } });
  const barTrackIn = spring({ frame: frame - 2, fps, config: { damping: 200 } });
  const claudeMdIn = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const shelfLabelIn = spring({ frame: frame - 7, fps, config: { damping: 200 } });

  const cardSprings = SKILLS.map((_, i) =>
    spring({
      frame: frame - (8 + i * 2), // Tighter stagger: 2f instead of 4f
      fps,
      config: { damping: 22, stiffness: 250 },
    }),
  );

  // --- Bar ---

  const claudeMdWidth = (CLAUDE_MD_LINES / 600) * BAR_WIDTH;
  const barSegments = getBarSegments(frame, fps);
  const totalLines = getTotalLines(frame, fps);

  // Cumulative bar offset for card landing target
  let cumulativeBarWidth = claudeMdWidth * claudeMdIn;

  // Bar bounce on each landing
  let barBounceY = 0;
  for (const phase of PHASES) {
    if (frame >= phase.landFrame && frame < phase.landFrame + 6) {
      const t = (frame - phase.landFrame) / 6;
      barBounceY = Math.sin(t * Math.PI) * -2.5;
    }
  }

  // --- Prompts ---
  const promptStates = getPromptStates(frame);

  // --- Summary ---
  const summaryIn = clamp01(frame, [SUMMARY_IN, SUMMARY_IN + 8]);
  const summaryOut = clamp01(frame, [RESET_START, RESET_START + 8]);
  const summaryOpacity = summaryIn * (1 - summaryOut);

  // Line counter color — use the color of the most recently landed skill
  let counterColor = P.textSecondary;
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (frame >= PHASES[i].landFrame) {
      const skill = SKILLS[PHASES[i].skillIndex];
      // Check if still visible (not fully retracted)
      if (frame < RESET_START || frame < RESET_START + (PHASES.length - 1 - i) * 5 + 12) {
        counterColor = skill.color;
      }
      break;
    }
  }

  return (
    <AbsoluteFill
      style={{ backgroundColor: "transparent", fontFamily: SANS_FONT }}
    >
      {/* ===== CONTEXT WINDOW HEADER ===== */}
      <div
        style={{
          position: "absolute",
          left: BAR_LEFT,
          right: BAR_LEFT,
          top: BAR_Y - 38,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          opacity: interpolate(labelIn, [0, 0.5], [0, 1], {
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(labelIn, [0, 1], [6, 0])}px)`,
        }}
      >
        <span
          style={{
            color: P.textSecondary,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 1.2,
            textTransform: "uppercase" as const,
          }}
        >
          Context Window
        </span>
        <span
          style={{
            color: totalLines > CLAUDE_MD_LINES ? counterColor : P.textSecondary,
            fontSize: 22,
            fontWeight: 600,
            fontFamily: MONO_FONT,
          }}
        >
          {totalLines} lines
        </span>
      </div>

      {/* ===== CONTEXT BAR ===== */}
      <div
        style={{
          position: "absolute",
          left: BAR_LEFT,
          top: BAR_Y,
          width: BAR_WIDTH,
          height: BAR_HEIGHT,
          borderRadius: BAR_RADIUS,
          background: `${P.textMuted}12`,
          opacity: interpolate(barTrackIn, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          }),
          overflow: "hidden",
          display: "flex",
          transform: `translateY(${barBounceY}px)`,
        }}
      >
        {/* CLAUDE.md segment */}
        <div
          style={{
            width: claudeMdWidth * claudeMdIn,
            height: "100%",
            background: P.lavender,
            opacity: 0.6,
            borderRadius: `${BAR_RADIUS}px 0 0 ${BAR_RADIUS}px`,
            flexShrink: 0,
          }}
        />

        {/* Accumulated skill segments */}
        {barSegments.map((seg, idx) => (
          <div
            key={seg.skillIndex}
            style={{
              width: seg.width,
              height: "100%",
              background: seg.color,
              opacity: 0.75,
              flexShrink: 0,
              borderRight:
                idx < barSegments.length - 1 ? `1px solid ${P.bg}60` : "none",
              borderRadius:
                idx === barSegments.length - 1
                  ? `0 ${BAR_RADIUS}px ${BAR_RADIUS}px 0`
                  : "0",
            }}
          />
        ))}
      </div>

      {/* Bar legend */}
      <div
        style={{
          position: "absolute",
          left: BAR_LEFT,
          top: BAR_Y + BAR_HEIGHT + 10,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: interpolate(claudeMdIn, [0.3, 0.8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: P.lavender,
              opacity: 0.7,
            }}
          />
          <span
            style={{ color: P.textSecondary, fontSize: 17, fontFamily: MONO_FONT }}
          >
            CLAUDE.md
          </span>
        </div>

        {/* Show legend entries for loaded skills */}
        {barSegments.map((seg) => (
          <div
            key={seg.skillIndex}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: Math.min(seg.width / 10, 1),
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: seg.color,
              }}
            />
            <span
              style={{ color: seg.color, fontSize: 16, fontFamily: MONO_FONT }}
            >
              {seg.name}
            </span>
          </div>
        ))}
      </div>

      {/* ===== SKILLS SHELF ===== */}

      <div
        style={{
          position: "absolute",
          left: CARDS_START_X,
          top: SHELF_Y - 40,
          opacity: interpolate(shelfLabelIn, [0, 0.5], [0, 1], {
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(shelfLabelIn, [0, 1], [6, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            color: P.textSecondary,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 1.2,
            textTransform: "uppercase" as const,
          }}
        >
          Available Skills
        </span>
        <span style={{ color: P.textMuted, fontSize: 17 }}>
          loaded on demand
        </span>
      </div>

      {/* ===== SKILL CARDS ===== */}
      {SKILLS.map((skill, i) => {
        const cardIn = cardSprings[i];

        // Find which phase (if any) targets this skill
        const phase = PHASES.find((p) => p.skillIndex === i);
        const scanPulse = getScanPulse(frame, i, SKILLS.length);

        // Is this skill the "dormant" one? (DB Migrations, index 2)
        const isDormant = !phase;

        // Dormant card: subtle breathing glow
        const breathe = isDormant
          ? Math.sin((frame / 60) * Math.PI * 2) * 0.08 + 0.38
          : 0;

        // Card resting state
        const restCX = getCardCenterX(i);
        const restLX = getCardLeftX(i);
        const restY = SHELF_Y;

        let cardX = restLX;
        let cardY = restY;
        let cardScale = 1;
        let cardOpacity = 1;
        let cardRotation = 0;
        let cardShadow = "none";
        let isLifted = false;
        let isAbsorbed = false;
        let isHighlighted = false;

        if (phase) {
          // Compute cumulative bar X for this phase's landing target
          let landTargetX = BAR_LEFT + claudeMdWidth;
          for (const p of PHASES) {
            if (p === phase) break;
            const s = SKILLS[p.skillIndex];
            if (frame >= p.landFrame) {
              landTargetX += (s.lines / 600) * BAR_WIDTH;
            }
          }

          // === HIGHLIGHTED (scan matched) ===
          if (frame >= phase.scanStart && frame < phase.landFrame) {
            isHighlighted = true;
          }

          // === LIFT ===
          if (frame >= phase.liftStart && frame < phase.flyStart) {
            isLifted = true;
            const liftT = clamp01(frame, [phase.liftStart, phase.flyStart], Easing.out(Easing.quad));
            cardY = restY - liftT * 16;
            cardScale = 1 + liftT * 0.07;
            cardShadow = `0 ${10 * liftT}px ${28 * liftT}px ${skill.color}40, 0 0 ${22 * liftT}px ${skill.color}25`;
          }

          // === FLY (spring-driven with arc) ===
          if (frame >= phase.flyStart && frame < phase.landFrame) {
            isLifted = true;

            const flySpring = spring({
              frame: frame - phase.flyStart,
              fps,
              config: { damping: 18, stiffness: 280, mass: 0.6 },
            });
            const flyT = Math.min(flySpring, 1);

            const startX = restCX;
            const startY = restY - 16;
            const endX = landTargetX + CARD_WIDTH * 0.3;
            const endY = BAR_Y + BAR_HEIGHT / 2;

            // Arc height proportional to horizontal distance
            const horizDist = Math.abs(endX - startX);
            const cpX = (startX + endX) / 2;
            const cpY = Math.min(startY, endY) - (horizDist * 0.15 + 50);

            const arcX = quadBezier(flyT, startX, cpX, endX);
            const arcY = quadBezier(flyT, startY, cpY, endY);

            cardX = arcX - CARD_WIDTH / 2;
            cardY = arcY - 35;

            // Tangent-following rotation
            const tanX = quadBezierTangent(flyT, startX, cpX, endX);
            const tanY = quadBezierTangent(flyT, startY, cpY, endY);
            cardRotation = Math.atan2(tanY, tanX) * (180 / Math.PI) * 0.3;

            // Scale shrinks on approach
            cardScale = interpolate(flyT, [0, 0.5, 1], [1.07, 0.95, 0.45]);

            // Fade on final approach
            cardOpacity = interpolate(flyT, [0, 0.65, 1], [1, 1, 0]);

            // Speed-trail shadow
            const speedIntensity = interpolate(flyT, [0.15, 0.45, 0.8], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            cardShadow = `0 ${8 + 6 * speedIntensity}px ${24 + 16 * speedIntensity}px ${skill.color}${Math.round((0.3 + speedIntensity * 0.25) * 255).toString(16).padStart(2, "0")}`;
          }

          // === ABSORBED ===
          if (frame >= phase.landFrame && frame < RESET_START) {
            isAbsorbed = true;
            cardOpacity = 0;
          }

          // === RESET: card fades back onto shelf ===
          if (frame >= RESET_START) {
            const phaseIdx = PHASES.indexOf(phase);
            const reverseIdx = PHASES.length - 1 - phaseIdx;
            const returnStart = RESET_START + 2 + reverseIdx * 4;
            const returnEnd = returnStart + 10;

            if (frame >= returnStart) {
              const returnT = clamp01(frame, [returnStart, returnEnd], Easing.out(Easing.quad));
              isAbsorbed = false;
              cardOpacity = returnT;
              cardScale = interpolate(returnT, [0, 1], [0.85, 1]);
            } else {
              isAbsorbed = true;
              cardOpacity = 0;
            }
          }
        }

        // Dimming: not targeted and some other card is active
        const anyPhaseActive = PHASES.some(
          (p) => frame >= p.scanStart && frame < p.landFrame && p.skillIndex !== i,
        );
        let baseAlpha: number;
        if (isAbsorbed) {
          baseAlpha = 0;
        } else if (isDormant) {
          baseAlpha = breathe + scanPulse;
        } else if (isHighlighted || isLifted) {
          baseAlpha = 1;
        } else if (anyPhaseActive) {
          baseAlpha = 0.25 + scanPulse;
        } else {
          baseAlpha = 0.5 + scanPulse;
        }

        // Entrance
        const entranceOpacity = interpolate(cardIn, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });
        const entranceY = interpolate(cardIn, [0, 1], [14, 0]);

        const finalOpacity = entranceOpacity * cardOpacity * baseAlpha;

        if (finalOpacity < 0.01) return null;

        return (
          <div
            key={skill.name}
            style={{
              position: "absolute",
              left: cardX,
              top: cardY + (!isLifted ? entranceY : 0),
              width: CARD_WIDTH,
              opacity: finalOpacity,
              transform: `scale(${cardScale}) rotate(${cardRotation}deg)`,
              transformOrigin: "center center",
              zIndex: isLifted ? 10 : 1,
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                border: `1.5px solid ${
                  isHighlighted || isLifted
                    ? `${skill.color}60`
                    : `${P.textMuted}25`
                }`,
                background:
                  isHighlighted || isLifted
                    ? `${skill.color}15`
                    : `${P.textMuted}08`,
                boxShadow: cardShadow,
                display: "flex",
                flexDirection: "column" as const,
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FileIcon color={skill.color} size={20} />
                <span
                  style={{
                    color:
                      isHighlighted || isLifted
                        ? skill.color
                        : P.textSecondary,
                    fontSize: 19,
                    fontWeight: 600,
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {skill.name}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color:
                      isHighlighted || isLifted
                        ? `${skill.color}BB`
                        : P.textMuted,
                    fontSize: 16,
                    fontFamily: MONO_FONT,
                  }}
                >
                  {skill.lines} lines
                </span>
                <span
                  style={{
                    color:
                      isHighlighted || isLifted
                        ? `${skill.color}BB`
                        : P.textMuted,
                    fontSize: 16,
                    fontFamily: MONO_FONT,
                  }}
                >
                  .md
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* ===== PROMPT AREA (crossfading) ===== */}
      {promptStates.map((ps) => (
        <div
          key={ps.text}
          style={{
            position: "absolute",
            left: BAR_LEFT + 20,
            right: BAR_LEFT + 20,
            top: PROMPT_Y,
            opacity: ps.opacity,
            transform: `translateY(${ps.translateY}px)`,
          }}
        >
          <div
            style={{
              padding: "18px 28px",
              borderRadius: 14,
              border: `1px solid ${P.textMuted}20`,
              background: `${P.textMuted}0A`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                color: P.textMuted,
                fontSize: 24,
                fontFamily: MONO_FONT,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              &gt;
            </span>
            <span
              style={{
                color: P.textPrimary,
                fontSize: 22,
                fontFamily: MONO_FONT,
                fontWeight: 500,
              }}
            >
              {ps.text}
            </span>
          </div>
        </div>
      ))}

      {/* ===== SUMMARY ===== */}
      {summaryOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 40,
            textAlign: "center" as const,
            opacity: summaryOpacity,
            transform: `translateY(${interpolate(summaryOpacity, [0, 1], [8, 0])}px)`,
          }}
        >
          <span
            style={{
              color: P.textSecondary,
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            Skills load when needed. Context stays lean.
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
