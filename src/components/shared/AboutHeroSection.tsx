"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiTarget, FiHeart, FiZap, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.4 + i * 0.15,
      type: "spring",
      stiffness: 140,
      damping: 20,
    },
  }),
};

const floatVariants = {
  animate: (i: number) => ({
    y: [0, -18, 0],
    x: [0, i % 2 === 0 ? 8 : -8, 0],
    transition: {
      duration: 5 + i * 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

const pillars = [
  {
    icon: <FiTarget />,
    title: "Our Mission",
    description:
      "Empower businesses to provide instant, personalized customer support at scale through AI technology.",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    borderHover: "hover:border-blue-200",
  },
  {
    icon: <FiHeart />,
    title: "Our Vision",
    description:
      "A world where every customer interaction is meaningful, efficient, and delightful.",
    gradient: "from-rose-500/10 to-pink-500/10",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    borderHover: "hover:border-rose-200",
  },
  {
    icon: <FiZap />,
    title: "Our Values",
    description:
      "Innovation, customer-first approach, and commitment to excellence in everything we do.",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    borderHover: "hover:border-amber-200",
  },
];

const AboutHeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-28 md:pt-36 pb-16 md:pb-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3AABFF12 0%, #3AABFF20 15%, #3AABFF30 30%, #ffffff 70%, #f8fbff 100%)",
      }}
    >
      {/* ── Decorative background elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Large ambient blurs */}
        <div className="absolute -top-[15%] -left-[10%] w-[45%] h-[45%] rounded-full bg-blue-100/40 blur-[140px]" />
        <div className="absolute top-[15%] -right-[8%] w-[35%] h-[35%] rounded-full bg-indigo-50/50 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[25%] w-[30%] h-[30%] rounded-full bg-sky-50/40 blur-[100px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          }}
        />
      </div>

      {/* ── Floating decorative orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {[
          { size: "w-3 h-3", pos: "top-[18%] left-[12%]", bg: "bg-blue-400/30", delay: 0 },
          { size: "w-2 h-2", pos: "top-[25%] right-[18%]", bg: "bg-indigo-400/25", delay: 1 },
          { size: "w-4 h-4", pos: "bottom-[30%] left-[8%]", bg: "bg-sky-300/20", delay: 2 },
          { size: "w-2.5 h-2.5", pos: "top-[40%] right-[10%]", bg: "bg-blue-300/25", delay: 3 },
          { size: "w-3 h-3", pos: "bottom-[20%] right-[22%]", bg: "bg-indigo-300/20", delay: 4 },
          { size: "w-1.5 h-1.5", pos: "top-[55%] left-[20%]", bg: "bg-blue-500/20", delay: 5 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatVariants}
            animate="animate"
            className={`absolute ${orb.pos} ${orb.size} ${orb.bg} rounded-full`}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="w-full max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-600 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold mb-8 md:mb-10 shadow-[0_4px_20px_rgba(59,130,246,0.08)]"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          About Svario.is
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl sm:text-5xl md:text-7xl font-medium text-slate-900 mb-6 md:mb-8 leading-[1.08] tracking-[-0.03em] max-w-[95%] lg:max-w-[850px] mx-auto"
        >
          We&apos;re building the future of{" "}
          <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            customer support
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-base md:text-xl text-slate-500 max-w-[90%] md:max-w-[620px] mx-auto mb-10 md:mb-14 leading-[1.7] font-normal"
        >
          Svario.is helps businesses deliver exceptional customer experiences
          through AI-powered automation and intelligent conversation management.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mb-16 md:mb-24"
        >
          <Link
            href="/register"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2563eb] text-white px-8 md:px-10 py-4 rounded-xl font-semibold text-[15px] transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_50px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Join Our Journey
            <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 px-8 md:px-10 py-4 rounded-xl font-semibold text-[15px] transition-all duration-200 hover:border-slate-300"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* ── Pillar Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={`group relative bg-white rounded-2xl p-7 md:p-8 border border-slate-100 ${pillar.borderHover} transition-colors duration-300 cursor-default overflow-hidden`}
            >
              {/* Card hover gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
              />

              {/* Card shadow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]" />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: 8,
                    transition: { type: "spring", stiffness: 400, damping: 12 },
                  }}
                  className={`inline-flex items-center justify-center w-12 h-12 ${pillar.iconBg} ${pillar.iconColor} rounded-xl text-xl mb-5 transition-colors duration-300`}
                >
                  {pillar.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3 tracking-tight">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default AboutHeroSection;
