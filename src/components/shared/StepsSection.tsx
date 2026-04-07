"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "1",
    title: "Connect Channels",
    description:
      "Link your WhatsApp, Instagram, and email accounts in just a few clicks",
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-200",
  },
  {
    number: "2",
    title: "Set Up AI",
    description:
      "Train your AI with custom responses and let it handle common questions automatically",
    color: "from-indigo-500 to-indigo-600",
    shadow: "shadow-indigo-200",
  },
  {
    number: "3",
    title: "Start Replying",
    description:
      "Manage all conversations from one dashboard with AI-powered suggestions",
    color: "from-sky-500 to-sky-600",
    shadow: "shadow-sky-200",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export const StepsSection = () => {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-4 bg-white overflow-hidden font-sans relative"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-blue-50 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-50 blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Get started in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              minutes
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-base md:text-xl text-slate-400 font-normal max-w-2xl mx-auto"
          >
            Three simple steps to transform your customer support workflow
            forever.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 relative"
        >
          {/* Animated Connectors (Desktop Only) */}
          <div className="hidden md:block absolute top-[50px] left-[20%] right-[20%] h-[2px] -z-10 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative p-8 md:p-12 bg-white border border-slate-100 rounded-[32px] md:rounded-[48px] flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-shadow duration-500`}
            >
              {/* Card Aura */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] md:rounded-[48px] -z-10" />

              {/* Number Pulse Aura */}
              <div className="relative mb-8 md:mb-10">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-[20px] rounded-[28px] opacity-20`}
                />
                <div
                  className={`relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${step.color} rounded-2xl md:rounded-[24px] flex items-center justify-center text-white text-2xl md:text-3xl font-bold z-10 shadow-lg ${step.shadow}`}
                >
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm md:text-lg font-normal leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {step.description}
              </p>

              {/* Subtle Step Indicator for Mobile */}
              <div className="md:hidden mt-8 w-1 h-8 bg-gradient-to-b from-blue-100 to-transparent opacity-50" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;
