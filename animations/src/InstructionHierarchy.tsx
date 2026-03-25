import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { P } from "./palette";

/*
 * Instruction Hierarchy — visual metaphor: pyramid stack + attention gauge.
 *
 * Layers appear top-to-bottom (highest priority first, widest).
 * Each layer's entrance incrementally fills an attention gauge on the right,
 * showing the finite budget being consumed. The gauge shifts from green
 * to amber to rose as it fills, ending with a warning label.
 *
 * 90 frames @ 30fps = 3s total.
 */

const LAYERS = [
  {
    label: "System Prompt",
    detail: "Always loaded, highest priority",
    accent: P.indigo,
    widthPct: 95,
    weight: 0.15,
  },
  {
    label: "Tool Descriptions",
    detail: "Loaded per tool call",
    accent: P.indigoMuted,
    widthPct: 85,
    weight: 0.2,
  },
  {
    label: "CLAUDE.md",
    detail: "Every session, loaded at launch",
    accent: P.lavender,
    widthPct: 75,
    weight: 0.25,
  },
  {
    label: "Skills",
    detail: "On trigger, pay-per-use",
    accent: P.mint,
    widthPct: 65,
    weight: 0.2,
  },
  {
    label: "User Messages",
    detail: "Single turn, ephemeral",
    accent: P.textSecondary,
    widthPct: 55,
    weight: 0.2,
  },
];

const FONT =
  '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, sans-serif';

const LAYER_H = 76;
const GAP = 10;

// Tight stagger: layers appear fast, each 10 frames apart
const layerDelay = (i: number) => 4 + i * 10;

// Gauge color interpolation based on fill level
const gaugeColor = (fill: number): string => {
  if (fill < 0.4) return P.mint;
  if (fill < 0.7) return P.amber;
  return P.rose;
};

export const InstructionHierarchy = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalStackH = LAYERS.length * LAYER_H + (LAYERS.length - 1) * GAP;
  const stackOriginY = (680 - totalStackH) / 2;

  // --- Gauge state: accumulates as each layer enters ---
  let gaugeFill = 0;
  const layerEntrances = LAYERS.map((_, i) => {
    const entrance = spring({
      frame: frame - layerDelay(i),
      fps,
      config: { damping: 14, stiffness: 90, mass: 0.7 },
    });
    return entrance;
  });

  for (let i = 0; i < LAYERS.length; i++) {
    gaugeFill += layerEntrances[i] * LAYERS[i].weight;
  }

  // Warning label appears after last layer is mostly in
  const warningDelay = layerDelay(LAYERS.length - 1) + 20;
  const warningOpacity = spring({
    frame: frame - warningDelay,
    fps,
    config: { damping: 30, stiffness: 60 },
  });

  // Gauge bar dimensions
  const gaugeX = 1060;
  const gaugeW = 24;
  const gaugeTop = stackOriginY + 10;
  const gaugeH = totalStackH - 20;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        fontFamily: FONT,
      }}
    >
      {/* --- Layer stack --- */}
      {LAYERS.map((layer, i) => {
        const entrance = layerEntrances[i];
        const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });
        const translateY = interpolate(entrance, [0, 1], [18, 0]);
        const scale = interpolate(entrance, [0, 1], [0.97, 1]);
        const y = stackOriginY + i * (LAYER_H + GAP);

        // Priority number
        const priorityNum = i <= 1 ? i + 1 : i <= 3 ? 3 : 4;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: y,
              left: 40,
              width: `${layer.widthPct - 15}%`,
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
                padding: "0 24px",
                gap: 14,
              }}
            >
              {/* Priority badge */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: `${layer.accent}18`,
                  border: `1px solid ${layer.accent}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: layer.accent,
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  {priorityNum}
                </span>
              </div>

              {/* Label + detail */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: 2,
                }}
              >
                <span
                  style={{
                    color: P.textPrimary,
                    fontSize: 24,
                    fontWeight: 600,
                    letterSpacing: -0.3,
                  }}
                >
                  {layer.label}
                </span>
                <span
                  style={{
                    color: P.textSecondary,
                    fontSize: 19,
                    fontWeight: 400,
                  }}
                >
                  {layer.detail}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* --- Attention gauge (vertical bar on right) --- */}
      <div
        style={{
          position: "absolute",
          left: gaugeX,
          top: gaugeTop,
          width: gaugeW,
          height: gaugeH,
        }}
      >
        {/* Track */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: gaugeW / 2,
            background: `${P.textMuted}18`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Fill — grows from bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: `${gaugeFill * 100}%`,
              borderRadius: gaugeW / 2,
              background: gaugeColor(gaugeFill),
              transition: "background 0.3s",
            }}
          />
        </div>
      </div>

      {/* Gauge label — top */}
      <div
        style={{
          position: "absolute",
          left: gaugeX - 30,
          top: gaugeTop - 34,
          width: gaugeW + 60,
          textAlign: "center" as const,
        }}
      >
        <span
          style={{
            color: P.textMuted,
            fontSize: 16,
            letterSpacing: 1.2,
            textTransform: "uppercase" as const,
            fontWeight: 600,
          }}
        >
          Budget
        </span>
      </div>

      {/* Warning label — below gauge */}
      <div
        style={{
          position: "absolute",
          left: gaugeX - 80,
          top: gaugeTop + gaugeH + 16,
          width: gaugeW + 160,
          textAlign: "center" as const,
          opacity: warningOpacity,
        }}
      >
        <span
          style={{
            color: P.rose,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Every instruction dilutes
        </span>
      </div>
    </AbsoluteFill>
  );
};
