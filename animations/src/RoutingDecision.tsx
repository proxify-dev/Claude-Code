import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { P } from "./palette";

type NodeType = "start" | "decision" | "result";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  type: NodeType;
  accent: string;
  delay: number;
};

type Edge = {
  label: string;
  delay: number;
  points: [number, number][];
};

const NODES: Node[] = [
  { id: "start", label: "New knowledge\nto persist", x: 600, y: 70, type: "start", accent: P.textSecondary, delay: 0 },
  { id: "q1", label: "Every session\nneeds it?", x: 600, y: 195, type: "decision", accent: P.indigo, delay: 22 },
  { id: "cmd1", label: "CLAUDE.md", x: 220, y: 195, type: "result", accent: P.lavender, delay: 55 },
  { id: "q2", label: "Domain-\nspecific?", x: 600, y: 345, type: "decision", accent: P.indigo, delay: 60 },
  { id: "q3", label: "Deep framework\nwith examples?", x: 320, y: 480, type: "decision", accent: P.indigo, delay: 100 },
  { id: "skillref", label: "Skill +\nreferences/", x: 150, y: 610, type: "result", accent: P.mint, delay: 138 },
  { id: "skill", label: "Skill or\nAgent", x: 490, y: 610, type: "result", accent: P.mint, delay: 138 },
  { id: "q4", label: "Must always\nexecute?", x: 880, y: 345, type: "decision", accent: P.indigo, delay: 60 },
  { id: "hook", label: "Hook", x: 1020, y: 480, type: "result", accent: P.amber, delay: 100 },
  { id: "cmd2", label: "CLAUDE.md", x: 740, y: 480, type: "result", accent: P.lavender, delay: 100 },
];

const EDGES: Edge[] = [
  { label: "", delay: 12, points: [[600, 105], [600, 165]] },
  { label: "Yes", delay: 38, points: [[530, 195], [320, 195]] },
  { label: "No", delay: 42, points: [[600, 230], [600, 315]] },
  { label: "Yes", delay: 78, points: [[530, 360], [390, 450]] },
  { label: "No", delay: 78, points: [[670, 360], [810, 360]] },
  { label: "Yes", delay: 118, points: [[250, 510], [170, 580]] },
  { label: "No", delay: 118, points: [[390, 510], [470, 580]] },
  { label: "Yes", delay: 82, points: [[950, 375], [1000, 450]] },
  { label: "No", delay: 82, points: [[810, 375], [760, 450]] },
];

const resultColors: Record<string, string> = {
  cmd1: P.lavender, cmd2: P.lavender,
  skillref: P.mint, skill: P.mint,
  hook: P.amber,
};

export const RoutingDecision = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        fontFamily: '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <svg width={1200} height={680} style={{ position: "absolute", inset: 0 }}>
        {EDGES.map((edge, i) => {
          const drawProgress = spring({ frame: frame - edge.delay, fps, config: { damping: 30, stiffness: 60 } });
          const [p1, p2] = edge.points;
          const pathD = `M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`;
          const pathLen = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
          const dashOffset = interpolate(drawProgress, [0, 1], [pathLen, 0]);
          const lineOpacity = interpolate(drawProgress, [0, 0.15], [0, 0.35], { extrapolateRight: "clamp" });
          const mx = (p1[0] + p2[0]) / 2;
          const my = (p1[1] + p2[1]) / 2;
          const labelOpacity = interpolate(drawProgress, [0.4, 0.8], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <g key={i}>
              <path d={pathD} stroke={P.textMuted} strokeWidth={1.5} fill="none"
                strokeDasharray={pathLen} strokeDashoffset={dashOffset} opacity={lineOpacity} />
              {edge.label && (
                <text x={mx + (edge.label === "Yes" ? -16 : 16)} y={my - 6}
                  fill={P.textSecondary} fontSize={11} fontWeight={500} textAnchor="middle"
                  opacity={labelOpacity} fontFamily='"SF Pro Display", -apple-system, sans-serif'>
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((node) => {
        const entrance = spring({ frame: frame - node.delay, fps, config: { damping: 14, stiffness: 80, mass: 0.8 } });
        const opacity = interpolate(entrance, [0, 0.25], [0, 1], { extrapolateRight: "clamp" });
        const scale = interpolate(entrance, [0, 1], [0.92, 1]);
        const translateY = interpolate(entrance, [0, 1], [12, 0]);

        const isResult = node.type === "result";
        const isDecision = node.type === "decision";
        const w = isDecision ? 140 : isResult ? 120 : 150;
        const h = isDecision ? 68 : isResult ? 56 : 56;
        const accent = resultColors[node.id] || node.accent;

        return (
          <div key={node.id} style={{
            position: "absolute", left: node.x - w / 2, top: node.y - h / 2,
            width: w, height: h, opacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: 10,
              border: `1px solid ${accent}30`,
              background: isResult ? `${accent}14` : `${node.accent}0A`,
              display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" as const,
            }}>
              <span style={{
                color: isResult ? accent : P.textPrimary,
                fontSize: isResult ? 13 : 12, fontWeight: isResult ? 600 : 500,
                lineHeight: 1.35, whiteSpace: "pre-line" as const,
              }}>
                {node.label}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
