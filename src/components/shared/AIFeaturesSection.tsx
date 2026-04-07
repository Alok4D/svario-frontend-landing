"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { Icons } from "@/utils/icons";
import { AiOutlineMail, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineSparkles, HiOutlineLightningBolt } from "react-icons/hi";

const features = [
  {
    icon: <HiOutlineSparkles className="w-5 h-5 text-white" />,
    title: "AI Auto Replies",
    description: "Smart AI understands context and generates perfect responses",
  },
  {
    icon: <AiOutlineMail className="w-5 h-5 text-white" />,
    title: "Unified Inbox",
    description: "All channels in one beautiful interface. No more switching",
  },
  {
    icon: <HiOutlineLightningBolt className="w-5 h-5 text-white" />,
    title: "Smart Automation",
    description: "Create workflows that handle repetitive tasks automatically",
  },
];

const AIFeaturesSection = () => {
  const pathRef = useRef<SVGPathElement>(null);

  const trackPath =
    "M 120 10 H 380 A 110 110 0 0 1 490 120 A 110 110 0 0 1 380 230 H 120 A 110 110 0 0 1 10 120 A 110 110 0 0 1 120 10 Z";

  return (
    <section className="relative w-full bg-[#3da1ff] py-8 md:py-10 px-4 overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col items-center font-sans">
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.1]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Background Decorative Ellipses */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[500px] border border-dashed border-white rounded-full opacity-50" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[500px] border border-dashed border-white rounded-full opacity-50" />
      </div>

      <div className="relative z-10 text-center mb-6 pt-4 md:pt-8 max-w-4xl px-4">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tighter leading-[1.1]">
          Meet Your AI Support Assistant
        </h2>
        <p className="text-base md:text-lg text-white/80 font-normal">
          Automated, intelligent, and always available
        </p>
      </div>

      <div className="max-w-[1300px] w-full mx-auto rounded-[32px] md:rounded-[48px] px-6 md:px-12 py-12 lg:flex-row flex flex-col items-center justify-between gap-12 md:gap-16 relative z-10">
        <div className="flex-1 relative w-full h-[300px] md:h-[450px] flex items-center justify-center z-10 overflow-visible mt-8 lg:mt-0">
          <div className="relative w-full max-w-[320px] md:max-w-[550px] aspect-[2.2/1] flex items-center justify-center">
            {/* Horizontal Connection Lines: Bit Bigger and Faded ends */}
            <div
              className="absolute left-[-25%] md:left-[-35%] top-1/2 -translate-y-1/2 w-[45%] h-[14px] md:h-[18px] -z-10 opacity-90 blur-[0.5px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, #3f4b5e 30%, #3f4b5e)",
              }}
            />
            <div
              className="absolute right-[-25%] md:right-[-35%] top-1/2 -translate-y-1/2 w-[45%] h-[14px] md:h-[18px] -z-10 opacity-90 blur-[0.5px]"
              style={{
                background:
                  "linear-gradient(to left, transparent, #3f4b5e 30%, #3f4b5e)",
              }}
            />

            <svg
              viewBox="0 0 500 240"
              className="w-full h-full overflow-visible"
            >
              <path
                ref={pathRef}
                d={trackPath}
                fill="none"
                stroke="#3f4b5e"
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-95"
              />

              <OrbitingIcon
                pathRef={pathRef}
                delay={0}
                icon={<HiOutlineSparkles className="w-full h-full" />}
              />
              <OrbitingIcon
                pathRef={pathRef}
                delay={0.25}
                icon={<HiOutlineLightningBolt className="w-full h-full" />}
              />
              <OrbitingIcon
                pathRef={pathRef}
                delay={0.5}
                icon={<AiOutlineMessage className="w-full h-full" />}
              />
              <OrbitingIcon
                pathRef={pathRef}
                delay={0.75}
                icon={<AiOutlineMail className="w-full h-full" />}
              />
            </svg>

            {/* Left Cap: AI Node */}
            <div className="absolute left-[30px] top-1/2 -translate-x-[60%] -translate-y-1/2 z-40 rounded-full">
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl shadow-xl flex items-center justify-center border-[2.5px] border-slate-200">
                <Icons.Cpu className="w-8 h-8 md:w-11 md:h-11 text-blue-600" />
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-10 bg-fuchsia-500/40 blur-[15px] rounded-full -z-10" />
              </div>
            </div>

            {/* Right Cap: Chat Node */}
            <div className="absolute right-[30px] top-1/2 translate-x-[60%] -translate-y-1/2 z-40 rounded-full">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl shadow-xl flex items-center justify-center border-[2.5px] border-slate-200">
                <AiOutlineMessage className="text-3xl md:text-5xl text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[300px] w-full space-y-4 md:space-y-6 z-10 shrink-0 rounded-full">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 md:p-8 border border-white/10 rounded-2xl md:rounded-3xl flex flex-col gap-3 group transition-all hover:bg-white/5 bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="text-white w-6 h-6">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {feature.title}
                </h3>
              </div>
              <p className="text-white/70 text-sm md:text-lg leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrbitingIcon = ({
  pathRef,
  delay,
  icon,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  delay: number;
  icon: React.ReactNode;
}) => {
  const time = useTime();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const x = useTransform(time, (t) => {
    if (!pathRef.current) return 0;
    try {
      const length = pathRef.current.getTotalLength();
      const progress = (t / 15000 + delay) % 1;
      return pathRef.current.getPointAtLength(progress * length).x;
    } catch (e) {
      return 0;
    }
  });

  const y = useTransform(time, (t) => {
    if (!pathRef.current) return 0;
    try {
      const length = pathRef.current.getTotalLength();
      const progress = (t / 15000 + delay) % 1;
      return pathRef.current.getPointAtLength(progress * length).y;
    } catch (e) {
      return 0;
    }
  });

  if (!isClient) return null;

  return (
    <motion.g style={{ x, y }}>
      <circle
        r={30}
        fill="white"
        className="shadow-lg transition-transform duration-300 md:scale-100 scale-[0.6]"
      />
      <foreignObject
        x="-15"
        y="-15"
        width="30"
        height="30"
        className="overflow-visible"
      >
        <div className="w-[30px] h-[30px] flex items-center justify-center text-blue-600 transition-transform duration-300 md:scale-100 scale-[0.6] origin-center">
          {icon}
        </div>
      </foreignObject>
    </motion.g>
  );
};

export default AIFeaturesSection;
