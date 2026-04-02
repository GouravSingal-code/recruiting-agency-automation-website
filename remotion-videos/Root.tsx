import React from "react";
import { Composition } from "remotion";
import { TheProblem } from "./Video1-TheProblem/TheProblem";
import { AIScreeningCall } from "./Video2-AIScreeningCall/AIScreeningCall";
import { JDToShortlist } from "./Video3-JDToShortlist/JDToShortlist";
import { CostComparison } from "./Video4-CostComparison/CostComparison";
import { FounderHiringReality } from "./Video5-FounderHiringReality/FounderHiringReality";
import { AIInterview } from "./Video6-AIInterview/AIInterview";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TheProblem"
        component={TheProblem}
        durationInFrames={18 * FPS} // ~18 seconds
        fps={FPS}
        width={1080}
        height={1920} // 9:16 vertical for social
      />
      <Composition
        id="AIScreeningCall"
        component={AIScreeningCall}
        durationInFrames={45 * FPS} // ~45 seconds
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="JDToShortlist"
        component={JDToShortlist}
        durationInFrames={23 * FPS} // ~23 seconds
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="CostComparison"
        component={CostComparison}
        durationInFrames={28 * FPS} // ~28 seconds
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="FounderHiringReality"
        component={FounderHiringReality}
        durationInFrames={50 * FPS} // ~50 seconds
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="AIInterview"
        component={AIInterview}
        durationInFrames={2133}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
