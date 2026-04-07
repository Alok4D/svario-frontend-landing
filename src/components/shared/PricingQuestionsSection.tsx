"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ── Floating particle component ── */
const FloatingParticle = ({
  size,
  x,
  y,
  delay,
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-white/15 pointer-events-none"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      x: [0, 6, -4, 0],
      opacity: [0.2, 0.65, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 5 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

/* ── Animated ring decoration ── */
const PulsingRing = ({
  size,
  x,
  y,
  delay,
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
}) => (
  <motion.div
    className="absolute rounded-full border border-white/10 pointer-events-none"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.15, 0.35, 0.15],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

/* ── Animation variants ── */
const containerVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      staggerChildren: 0.12,
      delayChildren: 0.18,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 18,
    },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 130,
      damping: 20,
      delay: 0.1,
    },
  },
};

const buttonContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 18,
    },
  },
};

/* ── Shimmer line animation ── */
const ShimmerLine = () => (
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
    animate={{
      x: ["-100%", "100%"],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatDelay: 2,
    }}
  />
);

const PricingQuestionsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-28 px-3 sm:px-4 bg-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative overflow-hidden bg-[#3da1ff] rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[48px] p-6 py-10 sm:p-8 sm:py-12 md:p-12 md:py-16 lg:p-16 lg:py-20 flex flex-col items-center justify-center text-center gap-5 sm:gap-6 md:gap-8 shadow-[0_30px_70px_-20px_rgba(58,171,255,0.4)]"
        >
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-[#2b8ae6]/20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_70%)] pointer-events-none" />

          {/* Floating Particles */}
          <FloatingParticle size={5} x="8%" y="18%" delay={0} />
          <FloatingParticle size={9} x="88%" y="30%" delay={1.2} />
          <FloatingParticle size={7} x="72%" y="62%" delay={0.6} />
          <FloatingParticle size={4} x="20%" y="78%" delay={2} />
          <FloatingParticle size={11} x="48%" y="10%" delay={1.8} />
          <FloatingParticle size={6} x="94%" y="72%" delay={0.3} />
          <FloatingParticle size={8} x="35%" y="88%" delay={1.5} />

          {/* Pulsing rings */}
          <PulsingRing size={80} x="5%" y="10%" delay={0} />
          <PulsingRing size={60} x="80%" y="60%" delay={1.5} />
          <PulsingRing size={100} x="60%" y="5%" delay={3} />

          {/* Shimmer */}
          <ShimmerLine />

          {/* Content */}
          <div className="max-w-[800px] flex flex-col gap-2.5 sm:gap-3 md:gap-4 relative z-10">
            <motion.h2
              variants={headingVariants}
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
            >
              Still have questions?
            </motion.h2>
            <motion.p
              variants={descVariants}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-medium max-w-[320px] sm:max-w-[420px] md:max-w-[500px] mx-auto leading-relaxed"
            >
              Our team is here to help you find the perfect plan for your
              business.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            variants={buttonContainerVariants}
            className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 md:gap-4 w-full sm:w-auto relative z-10 mt-1 sm:mt-2"
          >
            <motion.div variants={buttonVariants} className="w-full sm:w-auto">
              <Link href="/contact" className="block w-full sm:w-auto">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 12px 30px -8px rgba(0,0,0,0.15)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-[#3da1ff] py-2.5 sm:py-3 md:py-3.5 px-5 sm:px-6 md:px-8 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold shadow-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} className="w-full sm:w-auto">
              <Link href="/register" className="block w-full sm:w-auto">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-transparent border border-white/50 text-white py-2.5 sm:py-3 md:py-3.5 px-5 sm:px-6 md:px-8 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm"
                >
                  Start Free Trial
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingQuestionsSection;
