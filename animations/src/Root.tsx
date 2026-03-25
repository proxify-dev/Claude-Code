import { Composition } from "remotion";
import { InstructionHierarchy } from "./InstructionHierarchy";
import { RoutingDecision } from "./RoutingDecision";
import { BloatedClaudeMd } from "./BloatedClaudeMd";
import { OnDemandLoading } from "./OnDemandLoading";

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
        id="RoutingDecision"
        component={RoutingDecision}
        durationInFrames={300}
        fps={30}
        width={1200}
        height={680}
      />
      <Composition
        id="BloatedClaudeMd"
        component={BloatedClaudeMd}
        durationInFrames={150}
        fps={30}
        width={1200}
        height={680}
      />
      <Composition
        id="OnDemandLoading"
        component={OnDemandLoading}
        durationInFrames={150}
        fps={30}
        width={1200}
        height={680}
      />
    </>
  );
};
