import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { P } from "./palette";

const LAYERS = [
  {
    label: "System Prompt",
    meta: "Priority 1",
    detail: "Always loaded, cannot be overridden",
    accent: P.indigo,
    widthPct: 92,
  },
  {
    label: "Tool Descriptions",
    meta: "Priority 2",
    detail: "Loaded per tool",
    accent: P.indigoMuted,
    widthPct: 84,
  },
  {
    label: "CLAUDE.md",
    meta: "Priority 3",
    detail: "Every session, loaded at launch",
    accent: P.lavender,
    widthPct: 76,
  },
  {
    label: "Skills",
    meta: "Priority 3",
    detail: "On trigger, pay-per-use",
    accent: P.mint,
    widthPct: 68,
  },
  {
    label: "User Messages",
    meta: "Priority 4",
    detail: "Single turn, ephemeral",
    accent: P.textMuted,
    widthPct: 60,
  },
];

const LAYER_H = 72;
const GAP = 10;

const staggerDelay = (i: number) => {
  const gaps = [0, 18, 32, 50, 72];
  return gaps[i] ?? i * 18;
};

export const InstructionHierarchy = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalH = LAYERS.length * LAYER_H + (LAYERS.length - 1) * GAP;
  const originY = (640 - totalH) / 2;

  const attStart = staggerDelay(4) + 50;
  const attProgress = spring({
    frame: frame - attStart,
    fps,
    config: { damping: 30, stiffness: 60 },
  });
  const attFill = interpolate(
    frame - attStart, [0, 80], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        fontFamily: '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {LAYERS.map((layer, i) => {
        const delay = staggerDelay(i) + 10;
        const entrance = spring({
          frame: frame - delay,
          fps,
          config: { damping: 14, stiffness: 80, mass: 0.8 },
        });

        const opacity = interpolate(entrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
        const translateY = interpolate(entrance, [0, 1], [24, 0]);
        const scale = interpolate(entrance, [0, 1], [0.97, 1]);
        const y = originY + i * (LAYER_H + GAP);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: y,
              left: `${(100 - layer.widthPct) / 2}%`,
              width: `${layer.widthPct}%`,
              height: LAYER_H,
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 14,
                border: `1px solid ${layer.accent}30`,
                background: `${layer.accent}0C`,
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 28,
                  borderRadius: 2,
                  background: layer.accent,
                  opacity: 0.7,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ color: P.textPrimary, fontSize: 19, fontWeight: 600, letterSpacing: -0.3 }}>
                  {layer.label}
                </span>
                <span style={{ color: layer.accent, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const, opacity: 0.7 }}>
                  {layer.meta}
                </span>
              </div>
              <span style={{ color: P.textSecondary, fontSize: 13, fontWeight: 400, opacity: 0.7 }}>
                {layer.detail}
              </span>
            </div>
          </div>
        );
      })}

      {/* Attention budget */}
      <div style={{ position: "absolute", bottom: 20, left: "8%", right: "8%", opacity: attProgress }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: P.textMuted, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" as const }}>
            Attention Budget
          </span>
          <span style={{
            color: P.rose, fontSize: 11, fontWeight: 500,
            opacity: interpolate(attFill, [0.5, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            Every instruction dilutes the others
          </span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: `${P.textMuted}22`, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            width: `${attFill * 100}%`,
            background: `linear-gradient(90deg, ${P.indigo}, ${P.rose})`,
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
