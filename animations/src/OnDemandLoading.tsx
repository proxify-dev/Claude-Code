import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { P } from "./palette";

const SKILLS = [
  { name: "React Testing", lines: 180 },
  { name: "DB Migrations", lines: 120 },
  { name: "Auth Patterns", lines: 150 },
  { name: "CSS Architecture", lines: 90 },
];

const Bar = ({
  label, lines, maxLines, color, fillProgress, opacity, active,
}: {
  label: string; lines: number; maxLines: number; color: string;
  fillProgress: number; opacity: number; active: boolean;
}) => {
  const pct = (lines / maxLines) * 100;
  const barW = interpolate(fillProgress, [0, 1], [0, pct], { extrapolateRight: "clamp" });

  return (
    <div style={{ opacity, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ color: active ? P.textPrimary : P.textMuted, fontSize: 12, fontWeight: active ? 600 : 400 }}>
          {label}
        </span>
        <span style={{ color: P.textMuted, fontSize: 11, fontFamily: '"SF Mono", monospace' }}>{lines}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: `${P.textMuted}18`, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 3, width: `${barW}%`,
          background: active ? color : `${color}30`,
        }} />
      </div>
    </div>
  );
};

const QualityMeter = ({ value, color, opacity }: { value: number; color: string; opacity: number }) => (
  <div style={{ marginTop: 22, opacity }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ color: P.textMuted, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" as const }}>
        Attention Quality
      </span>
      <span style={{ color, fontSize: 10, fontWeight: 600 }}>
        {value > 0.7 ? "FOCUSED" : value > 0.4 ? "DEGRADING" : "POOR"}
      </span>
    </div>
    <div style={{ height: 3, borderRadius: 1.5, background: `${P.textMuted}18`, overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 1.5, width: `${value * 100}%`, background: color }} />
    </div>
  </div>
);

export const OnDemandLoading = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fillBloated = interpolate(frame, [15, 90], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  const attentionDegrading = interpolate(frame, [30, 90], [0.95, 0.25], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const transArrow = spring({ frame: frame - 105, fps, config: { damping: 14, stiffness: 80, mass: 0.8 } });
  const rightPanelIn = spring({ frame: frame - 130, fps, config: { damping: 20, stiffness: 60 } });
  const slimBarIn = spring({ frame: frame - 145, fps, config: { damping: 30, stiffness: 60 } });
  const skillBarsIn = SKILLS.map((_, i) => spring({ frame: frame - (155 + i * 10), fps, config: { damping: 30, stiffness: 60 } }));
  const triggerIn = spring({ frame: frame - 200, fps, config: { damping: 12, stiffness: 70, mass: 0.9 } });
  const triggerCardIn = spring({ frame: frame - 195, fps, config: { damping: 20, stiffness: 80 } });
  const attentionDistributed = interpolate(frame, [160, 220], [0, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const leftOpacity = interpolate(frame, [105, 130], [1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        fontFamily: '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: "0 40px",
      }}
    >
      {/* LEFT */}
      <div style={{ position: "absolute", left: 50, top: 30, width: 500, opacity: leftOpacity }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: P.rose }} />
          <span style={{ color: frame > 105 ? P.textMuted : P.textPrimary, fontSize: 15, fontWeight: 600 }}>
            Everything in CLAUDE.md
          </span>
          <span style={{
            color: P.textMuted, fontSize: 12, fontFamily: '"SF Mono", monospace',
            opacity: interpolate(fillBloated, [0.3, 0.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>540 lines</span>
        </div>

        <Bar label="Core project context" lines={200} maxLines={540} color={P.lavender}
          fillProgress={interpolate(fillBloated, [0, 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          opacity={interpolate(fillBloated, [0, 0.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          active={frame < 105} />

        {SKILLS.map((skill, i) => (
          <Bar key={skill.name} label={skill.name} lines={skill.lines} maxLines={540} color={P.rose}
            fillProgress={interpolate(fillBloated, [0.2 + i * 0.15, 0.5 + i * 0.15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            opacity={interpolate(fillBloated, [0.15 + i * 0.15, 0.25 + i * 0.15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            active={frame < 105} />
        ))}

        <QualityMeter value={frame > 105 ? 0.25 : attentionDegrading} color={attentionDegrading > 0.6 ? P.amber : P.rose}
          opacity={interpolate(fillBloated, [0.3, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      </div>

      {/* Arrow */}
      <div style={{
        position: "absolute", left: 572, top: 280,
        opacity: interpolate(transArrow, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateX(${interpolate(transArrow, [0, 1], [-8, 0])}px)`,
      }}>
        <span style={{ color: P.indigo, fontSize: 28, fontWeight: 300 }}>→</span>
      </div>

      {/* RIGHT */}
      <div style={{
        position: "absolute", right: 50, top: 30, width: 500,
        opacity: interpolate(rightPanelIn, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateX(${interpolate(rightPanelIn, [0, 1], [16, 0])}px)`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: P.mint }} />
          <span style={{ color: P.textPrimary, fontSize: 15, fontWeight: 600 }}>Distributed</span>
        </div>

        <Bar label="CLAUDE.md (pointers only)" lines={45} maxLines={540} color={P.lavender}
          fillProgress={slimBarIn} opacity={slimBarIn} active={true} />

        {SKILLS.map((skill, i) => {
          const isTriggered = i === 0 && frame > 200;
          return (
            <Bar key={skill.name} label={isTriggered ? `${skill.name}  ← triggered` : skill.name}
              lines={skill.lines} maxLines={540} color={P.mint}
              fillProgress={isTriggered ? triggerIn : skillBarsIn[i]}
              opacity={skillBarsIn[i]} active={isTriggered} />
          );
        })}

        <QualityMeter value={attentionDistributed} color={P.mint}
          opacity={interpolate(rightPanelIn, [0.3, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />

        {frame > 190 && (
          <div style={{
            marginTop: 20, padding: "14px 18px", borderRadius: 10,
            border: `1px solid ${P.mint}28`, background: `${P.mint}0A`,
            opacity: interpolate(triggerCardIn, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(triggerCardIn, [0, 1], [8, 0])}px)`,
          }}>
            <span style={{ color: P.mint, fontSize: 13, fontWeight: 500, fontFamily: '"SF Mono", monospace' }}>
              "Write tests for the auth module"
            </span>
            <div style={{ marginTop: 6 }}>
              <span style={{ color: P.textMuted, fontSize: 11 }}>→ React Testing skill loads on demand (180 lines)</span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
