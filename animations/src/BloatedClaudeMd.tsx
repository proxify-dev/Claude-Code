import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { P } from "./palette";

const SECTIONS = [
  { name: "Core Context", lines: 200, color: P.lavender },
  { name: "React Testing", lines: 180, color: P.rose },
  { name: "Auth Patterns", lines: 150, color: P.amber },
  { name: "DB Migrations", lines: 120, color: P.indigo },
  { name: "CSS Architecture", lines: 90, color: P.mint },
];

const DISPLAY_TOTAL = 540;

export const BloatedClaudeMd = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- Layout constants ----
  const barLeft = 100;
  const barRight = 1100;
  const barWidth = barRight - barLeft;
  const barY = 155;
  const barHeight = 48;

  // ---- Title entrance (frames 0-10) ----
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // ---- Line counter climbs (frames 5-80) ----
  const lineCount = Math.round(
    interpolate(frame, [5, 80], [0, DISPLAY_TOTAL], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    })
  );

  const lineCountOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Each section fills sequentially (frames 8-85) ----
  const sectionFills = SECTIONS.map((_, i) => {
    const start = 8 + i * 14;
    return interpolate(frame, [start, start + 22], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    });
  });

  // Section widths as proportions of bar
  const sectionWidths = SECTIONS.map(
    (s) => (s.lines / DISPLAY_TOTAL) * barWidth
  );

  // ---- Section labels fade in as their bar segment fills ----
  const labelOpacities = sectionFills.map((fill) =>
    interpolate(fill, [0.4, 0.85], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // ---- Quality meter (frames 15-95) ----
  const qualityMeterOpacity = interpolate(frame, [12, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const qualityValue = interpolate(frame, [15, 95], [0.95, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const qualityColor =
    qualityValue > 0.7 ? P.mint : qualityValue > 0.4 ? P.amber : P.rose;

  const qualityLabel =
    qualityValue > 0.7
      ? "FOCUSED"
      : qualityValue > 0.4
        ? "DEGRADING"
        : "POOR";

  // Numeric display of quality
  const qualityPercent = Math.round(qualityValue * 100);

  // ---- Warning message (frames 95-115) ----
  const warningIn = spring({
    frame: frame - 95,
    fps,
    config: { damping: 16, stiffness: 70, mass: 0.8 },
  });

  const warningOpacity = interpolate(warningIn, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle pulse on the warning when quality is really low
  const warningGlow = frame > 105
    ? interpolate(frame, [105, 120], [0, 0.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        fontFamily:
          '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Title: CLAUDE.md + line counter */}
      <div
        style={{
          position: "absolute",
          left: barLeft,
          top: 55,
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [8, 0])}px)`,
        }}
      >
        <span
          style={{
            color: P.textPrimary,
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          CLAUDE.md
        </span>
        <span
          style={{
            color: lineCount > 400 ? P.rose : lineCount > 200 ? P.amber : P.textSecondary,
            fontSize: 26,
            fontWeight: 500,
            fontFamily: '"SF Mono", monospace',
            opacity: lineCountOpacity,
          }}
        >
          {lineCount} lines
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          left: barLeft,
          top: 98,
          opacity: interpolate(frame, [3, 12], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            color: P.textMuted,
            fontSize: 19,
            fontWeight: 400,
          }}
        >
          Every section added competes for Claude's attention
        </span>
      </div>

      {/* Stacked bar background track */}
      <div
        style={{
          position: "absolute",
          left: barLeft,
          top: barY,
          width: barWidth,
          height: barHeight,
          borderRadius: 10,
          background: `${P.textMuted}10`,
          border: `1px solid ${P.border}`,
          overflow: "hidden",
          display: "flex",
          opacity: interpolate(titleIn, [0.3, 0.8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {SECTIONS.map((section, i) => (
          <div
            key={section.name}
            style={{
              width: sectionWidths[i] * sectionFills[i],
              height: "100%",
              background: section.color,
              opacity: 0.75,
              flexShrink: 0,
              borderRight:
                i < SECTIONS.length - 1 ? `1px solid ${P.bg}90` : "none",
            }}
          />
        ))}
      </div>

      {/* Section labels below the bar */}
      <div
        style={{
          position: "absolute",
          left: barLeft,
          top: barY + barHeight + 16,
          width: barWidth,
          display: "flex",
        }}
      >
        {SECTIONS.map((section, i) => (
          <div
            key={section.name}
            style={{
              width: sectionWidths[i],
              opacity: labelOpacities[i],
              paddingRight: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 5,
                  background: section.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: P.textSecondary,
                  fontSize: 18,
                  fontWeight: 500,
                  whiteSpace: "nowrap" as const,
                }}
              >
                {section.name}
              </span>
            </div>
            <span
              style={{
                color: P.textMuted,
                fontSize: 18,
                fontFamily: '"SF Mono", monospace',
                paddingLeft: 15,
              }}
            >
              {section.lines} lines
            </span>
          </div>
        ))}
      </div>

      {/* Attention Quality meter */}
      <div
        style={{
          position: "absolute",
          left: barLeft,
          right: barLeft,
          top: 340,
          opacity: qualityMeterOpacity,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              color: P.textMuted,
              fontSize: 20,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              fontWeight: 500,
            }}
          >
            Attention Quality
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                color: qualityColor,
                fontSize: 24,
                fontWeight: 600,
                fontFamily: '"SF Mono", monospace',
              }}
            >
              {qualityPercent}%
            </span>
            <span
              style={{
                color: qualityColor,
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {qualityLabel}
            </span>
          </div>
        </div>

        {/* Quality bar */}
        <div
          style={{
            height: 10,
            borderRadius: 5,
            background: `${P.textMuted}18`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 5,
              width: `${qualityValue * 100}%`,
              background: qualityColor,
              boxShadow: qualityValue < 0.4 ? `0 0 12px ${P.rose}60` : "none",
            }}
          />
        </div>

        {/* Scale markers */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <span style={{ color: P.textMuted, fontSize: 16, opacity: 0.5 }}>0%</span>
          <span style={{ color: P.textMuted, fontSize: 16, opacity: 0.5 }}>100%</span>
        </div>
      </div>

      {/* Warning message */}
      {frame > 92 && (
        <div
          style={{
            position: "absolute",
            left: barLeft,
            right: barLeft,
            top: 460,
            opacity: warningOpacity,
            transform: `translateY(${interpolate(warningIn, [0, 1], [12, 0])}px)`,
          }}
        >
          <div
            style={{
              padding: "18px 28px",
              borderRadius: 12,
              border: `1px solid ${P.rose}35`,
              background: `${P.rose}0C`,
              boxShadow: warningGlow > 0 ? `0 0 ${20 * warningGlow}px ${P.rose}15` : "none",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* Warning icon */}
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke={P.rose}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                color: P.rose,
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              Everything competes for attention. Instructions degrade.
            </span>
          </div>
        </div>
      )}

      {/* Bottom summary: before/after comparison hint */}
      {frame > 110 && (
        <div
          style={{
            position: "absolute",
            left: barLeft,
            right: barLeft,
            bottom: 50,
            opacity: interpolate(frame, [110, 125], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            textAlign: "center" as const,
          }}
        >
          <span
            style={{
              color: P.textMuted,
              fontSize: 19,
              fontWeight: 400,
            }}
          >
            540 lines of domain knowledge, all loaded into every conversation
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
