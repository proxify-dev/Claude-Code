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
  w: number;
  h: number;
};

type Edge = {
  label: string;
  delay: number;
  from: [number, number];
  to: [number, number];
  labelOffset?: [number, number];
};

// Layout constants
const Y0 = 52;   // start
const Y1 = 170;  // q1 row
const Y2 = 300;  // q2 / q4 row
const Y3 = 430;  // q3 / hook / cmd2 row
const Y4 = 570;  // skill+ref / skill row

const CX = 520;  // center x for the main trunk (shifted left for balance)

const NODES: Node[] = [
  // Start
  { id: "start", label: "New knowledge\nto persist", x: CX, y: Y0, type: "start", accent: P.textSecondary, delay: 0, w: 230, h: 72 },

  // Level 1: "Every session needs it?"
  { id: "q1", label: "Every session\nneeds it?", x: CX, y: Y1, type: "decision", accent: P.indigo, delay: 25, w: 220, h: 92 },
  { id: "cmd1", label: "CLAUDE.md", x: 215, y: Y1, type: "result", accent: P.lavender, delay: 60, w: 176, h: 68 },

  // Level 2: "Domain-specific?" / "Must always execute?"
  { id: "q2", label: "Domain-\nspecific?", x: CX, y: Y2, type: "decision", accent: P.indigo, delay: 68, w: 200, h: 92 },
  { id: "q4", label: "Must always\nexecute?", x: 870, y: Y2, type: "decision", accent: P.indigo, delay: 68, w: 210, h: 92 },

  // Level 3: "Deep framework?" / Hook / CLAUDE.md
  { id: "q3", label: "Deep framework\nwith examples?", x: 350, y: Y3, type: "decision", accent: P.indigo, delay: 110, w: 240, h: 92 },
  { id: "hook", label: "Hook", x: 1010, y: Y3, type: "result", accent: P.amber, delay: 115, w: 150, h: 68 },
  { id: "cmd2", label: "CLAUDE.md", x: 730, y: Y3, type: "result", accent: P.lavender, delay: 115, w: 176, h: 68 },

  // Level 4: Skill+refs / Skill or Agent
  { id: "skillref", label: "Skill +\nreferences/", x: 195, y: Y4, type: "result", accent: P.mint, delay: 155, w: 190, h: 72 },
  { id: "skill", label: "Skill or\nAgent", x: 505, y: Y4, type: "result", accent: P.mint, delay: 155, w: 176, h: 72 },
];

// Helper to get node bounds
const getNode = (id: string) => NODES.find((n) => n.id === id)!;

const EDGES: Edge[] = (() => {
  const start = getNode("start");
  const q1 = getNode("q1");
  const cmd1 = getNode("cmd1");
  const q2 = getNode("q2");
  const q4 = getNode("q4");
  const q3 = getNode("q3");
  const hook = getNode("hook");
  const cmd2 = getNode("cmd2");
  const skillref = getNode("skillref");
  const skill = getNode("skill");

  return [
    // start -> q1
    { label: "", delay: 14, from: [start.x, start.y + start.h / 2], to: [q1.x, q1.y - q1.h / 2] },
    // q1 -> cmd1 (Yes)
    { label: "Yes", delay: 42, from: [q1.x - q1.w / 2, q1.y], to: [cmd1.x + cmd1.w / 2, cmd1.y], labelOffset: [0, -16] },
    // q1 -> q2 (No)
    { label: "No", delay: 48, from: [q1.x, q1.y + q1.h / 2], to: [q2.x, q2.y - q2.h / 2], labelOffset: [14, 0] },
    // q2 -> q3 (Yes)
    { label: "Yes", delay: 88, from: [q2.x - q2.w / 2 + 20, q2.y + q2.h / 2], to: [q3.x + q3.w / 2 - 40, q3.y - q3.h / 2], labelOffset: [-18, 0] },
    // q2 -> q4 (No)
    { label: "No", delay: 88, from: [q2.x + q2.w / 2, q2.y], to: [q4.x - q4.w / 2, q4.y], labelOffset: [0, -16] },
    // q3 -> skillref (Yes)
    { label: "Yes", delay: 135, from: [q3.x - q3.w / 2 + 30, q3.y + q3.h / 2], to: [skillref.x + skillref.w / 2 - 30, skillref.y - skillref.h / 2], labelOffset: [-18, 0] },
    // q3 -> skill (No)
    { label: "No", delay: 135, from: [q3.x + q3.w / 2 - 30, q3.y + q3.h / 2], to: [skill.x - skill.w / 2 + 30, skill.y - skill.h / 2], labelOffset: [18, 0] },
    // q4 -> hook (Yes)
    { label: "Yes", delay: 95, from: [q4.x + q4.w / 2 - 30, q4.y + q4.h / 2], to: [hook.x - hook.w / 2 + 20, hook.y - hook.h / 2], labelOffset: [18, 0] },
    // q4 -> cmd2 (No)
    { label: "No", delay: 95, from: [q4.x - q4.w / 2 + 30, q4.y + q4.h / 2], to: [cmd2.x + cmd2.w / 2 - 20, cmd2.y - cmd2.h / 2], labelOffset: [-18, 0] },
  ];
})();

export const RoutingDecision = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        fontFamily:
          '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Edges layer */}
      <svg
        width={1200}
        height={680}
        style={{ position: "absolute", inset: 0 }}
      >
        {EDGES.map((edge, i) => {
          const drawProgress = spring({
            frame: frame - edge.delay,
            fps,
            config: { damping: 30, stiffness: 60 },
          });

          const [p1, p2] = [edge.from, edge.to];
          const pathD = `M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`;
          const pathLen = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
          const dashOffset = interpolate(drawProgress, [0, 1], [pathLen, 0]);
          const lineOpacity = interpolate(drawProgress, [0, 0.15], [0, 0.45], {
            extrapolateRight: "clamp",
          });

          const mx = (p1[0] + p2[0]) / 2 + (edge.labelOffset?.[0] || 0);
          const my = (p1[1] + p2[1]) / 2 + (edge.labelOffset?.[1] || 0);
          const labelOpacity = interpolate(
            drawProgress,
            [0.4, 0.8],
            [0, 0.85],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={i}>
              <path
                d={pathD}
                stroke={P.textMuted}
                strokeWidth={2}
                fill="none"
                strokeDasharray={pathLen}
                strokeDashoffset={dashOffset}
                opacity={lineOpacity}
              />
              {edge.label && (
                <text
                  x={mx}
                  y={my}
                  fill={edge.label === "Yes" ? P.mint : P.textSecondary}
                  fontSize={20}
                  fontWeight={600}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={labelOpacity}
                  fontFamily='"SF Pro Display", -apple-system, sans-serif'
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes layer */}
      {NODES.map((node) => {
        const entrance = spring({
          frame: frame - node.delay,
          fps,
          config: { damping: 16, stiffness: 90, mass: 0.7 },
        });
        const opacity = interpolate(entrance, [0, 0.25], [0, 1], {
          extrapolateRight: "clamp",
        });
        const scale = interpolate(entrance, [0, 1], [0.92, 1]);
        const translateY = interpolate(entrance, [0, 1], [10, 0]);

        const isResult = node.type === "result";
        const isStart = node.type === "start";
        const accent = node.accent;

        const borderColor = isResult ? `${accent}40` : `${accent}30`;
        const bgColor = isResult ? `${accent}18` : isStart ? `${P.textSecondary}0C` : `${accent}0C`;

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: node.x - node.w / 2,
              top: node.y - node.h / 2,
              width: node.w,
              height: node.h,
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: isResult ? 14 : 12,
                border: `1.5px solid ${borderColor}`,
                background: bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center" as const,
                padding: "0 14px",
              }}
            >
              <span
                style={{
                  color: isResult ? accent : P.textPrimary,
                  fontSize: isResult ? 24 : isStart ? 22 : 22,
                  fontWeight: isResult ? 700 : isStart ? 600 : 500,
                  lineHeight: 1.3,
                  whiteSpace: "pre-line" as const,
                  letterSpacing: isResult ? 0.2 : 0,
                }}
              >
                {node.label}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
