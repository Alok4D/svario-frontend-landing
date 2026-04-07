"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiTrendingUp, FiTarget, FiUsers, FiCheckCircle } from "react-icons/fi";
import AnimatedCounter from "./AnimatedCounter";

interface StatItem {
  icon: React.ReactNode;
  numericValue: number;
  suffix: string;
  prefix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <FiTrendingUp />,
    numericValue: 5,
    suffix: "x",
    prefix: "",
    label: "Faster Reply Times",
  },
  {
    icon: <FiTarget />,
    numericValue: 80,
    suffix: "%",
    prefix: "",
    label: "Time Saved Daily",
  },
  {
    icon: <FiUsers />,
    numericValue: 500,
    suffix: "+",
    prefix: "",
    label: "Happy Customers",
  },
  {
    icon: <FiCheckCircle />,
    numericValue: 95,
    suffix: "%",
    prefix: "",
    label: "Customer Satisfaction",
  },
];

/* ── Container & item variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 20,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 16,
      delay: 0.05,
    },
  },
};

/* ── Divider component (desktop only) ── */
const VerticalDivider = ({ index }: { index: number }) => {
  if (index === stats.length - 1) return null;
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay: 0.4 + index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-slate-200 to-transparent"
      style={{ originY: 0.5 }}
    />
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-y-10 sm:gap-x-6 md:gap-y-12 md:gap-x-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center group cursor-default px-2 sm:px-4 md:px-6"
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 18 },
              }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-2xl bg-[#3da1ff]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-110"
                aria-hidden
              />

              {/* Icon */}
              <motion.div
                variants={iconVariants}
                className="text-[#3da1ff] text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 md:mb-5"
                whileHover={{
                  scale: 1.2,
                  rotate: 8,
                  transition: { type: "spring", stiffness: 400, damping: 12 },
                }}
              >
                {stat.icon}
              </motion.div>

              {/* Animated Number */}
              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3da1ff] tracking-tight mb-1.5 sm:mb-2 md:mb-3 tabular-nums"
                whileHover={{
                  scale: 1.06,
                  transition: { type: "spring", stiffness: 350, damping: 14 },
                }}
              >
                <AnimatedCounter
                  value={stat.numericValue}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={stat.numericValue > 100 ? 2.4 : 1.8}
                />
              </motion.div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  delay: 0.4 + i * 0.12,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="text-slate-400 font-medium text-[11px] sm:text-xs md:text-sm lg:text-base leading-snug max-w-[100px] sm:max-w-[110px] md:max-w-[130px] lg:max-w-none"
              >
                {stat.label}
              </motion.div>

              {/* Divider */}
              {isInView && <VerticalDivider index={i} />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
