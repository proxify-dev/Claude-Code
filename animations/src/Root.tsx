import { AbsoluteFill, Composition } from "remotion";
import { InstructionHierarchy } from "./InstructionHierarchy";
import { RoutingDecision } from "./RoutingDecision";
import { OnDemandLoading } from "./OnDemandLoading";
import { P } from "./palette";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="InstructionHierarchy"
        component={InstructionHierarchy}
        durationInFrames={240}
        fps={30}
        width={1200}
        height={680}
      />
      <Composition
        id="InstructionHierarchyDark"
        component={() => <AbsoluteFill style={{ background: P.bg }}><InstructionHierarchy /></AbsoluteFill>}
        durationInFrames={240}
        fps={30}
        width={1200}
        height={680}
      />
      <Composition
        id="RoutingDecision"
        component={RoutingDecision}
        durationInFrames={300}
        fps={30}
        width={1200}
        height={680}
      />
      <Composition
        id="RoutingDecisionDark"
        component={() => <AbsoluteFill style={{ background: P.bg }}><RoutingDecision /></AbsoluteFill>}
        durationInFrames={300}
        fps={30}
        width={1200}
        height={680}
      />
      <Composition
        id="OnDemandLoading"
        component={OnDemandLoading}
        durationInFrames={270}
        fps={30}
        width={1200}
        height={680}
      />
      <Composition
        id="OnDemandLoadingDark"
        component={() => <AbsoluteFill style={{ background: P.bg }}><OnDemandLoading /></AbsoluteFill>}
        durationInFrames={270}
        fps={30}
        width={1200}
        height={680}
      />
    </>
  );
};
