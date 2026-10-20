import React from "react";
import { GlowCard } from "@/components/ui/spotlight-card";

export function Default() {
  return (
    <div className="w-full min-h-screen flex flex-wrap items-center justify-center gap-10 custom-cursor p-8">
      <GlowCard glowColor="blue">
        <div className="text-white text-center flex flex-col items-center justify-center h-full">
          <span className="text-lg font-bold">Blue Spotlight</span>
          <p className="text-xs text-zinc-400 mt-2">Interactive cursor-tracking gradient glow</p>
        </div>
      </GlowCard>
      <GlowCard glowColor="purple">
        <div className="text-white text-center flex flex-col items-center justify-center h-full">
          <span className="text-lg font-bold">Purple Spotlight</span>
          <p className="text-xs text-zinc-400 mt-2">Interactive cursor-tracking gradient glow</p>
        </div>
      </GlowCard>
      <GlowCard glowColor="orange">
        <div className="text-white text-center flex flex-col items-center justify-center h-full">
          <span className="text-lg font-bold">Golden Hour Spotlight</span>
          <p className="text-xs text-zinc-400 mt-2">Interactive cursor-tracking gradient glow</p>
        </div>
      </GlowCard>
    </div>
  );
}
