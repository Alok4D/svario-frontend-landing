"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const JoinJourneySection = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-[#3AABFF] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white"
        >
          Join us on our journey
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/90 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto"
        >
          Be part of the AI-powered customer support revolution
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <Link
            href="/register"
            className="inline-flex items-center justify-center bg-white text-[#3AABFF] px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-black/10 transition-all duration-300 hover:bg-slate-50 hover:scale-105 active:scale-95"
          >
            Get Started Today
          </Link>
        </motion.div>
      </div>

      {/* Subtle Background Glow/Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[140px] -z-0 pointer-events-none" />
    </section>
  );
};

export default JoinJourneySection;
