"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GlowCard } from "@/components/ui/spotlight-card";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[100px] pt-[50px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=80"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

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
