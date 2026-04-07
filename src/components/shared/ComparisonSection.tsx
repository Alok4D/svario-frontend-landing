"use client";

import { motion } from "framer-motion";
import { Icons } from "@/utils/icons";
import {
  AiOutlineClockCircle,
  AiOutlineMail,
  AiOutlineMessage,
  AiOutlineWhatsApp,
  AiOutlineInstagram,
} from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";

// Reusable fade animation variants
export const fadeIn: any = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const ComparisonSection = () => {
  return (
    <section className="py-20 px-4 bg-[#fbfcfd] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
          >
            Managing customer messages is messy
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-base md:text-lg text-slate-500 font-medium"
          >
            Traditional support is scattered and slow
          </motion.p>
        </div>

        {/* Cards Grid - The Problem */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1: Messages Everywhere */}
          <motion.div variants={fadeIn} className="flex flex-col group">
            <div className="bg-[#f0f7ff] rounded-[32px] p-6 md:p-8 aspect-square relative overflow-hidden mb-8 border border-blue-50/50 flex items-center justify-center scale-90 md:scale-100">
              <div className="absolute w-[50%] h-[50%] border border-blue-200/40 rounded-full"></div>
              <div className="absolute w-[80%] h-[80%] border border-blue-200/40 rounded-full"></div>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-blue-50"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg transform">
                  <AiOutlineMessage className="text-white text-xl md:text-2xl" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[80%] h-[80%]"
              >
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border border-blue-100 flex items-center justify-center shadow-sm"
                  >
                    <AiOutlineWhatsApp className="text-slate-600 text-sm md:text-lg" />
                  </motion.div>
                </div>
                {/* Orbital items scaled for mobile */}
                <div className="absolute top-[20%] left-[10%]">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border border-blue-100 flex items-center justify-center shadow-sm"
                  >
                    <AiOutlineInstagram className="text-slate-600 text-sm md:text-lg" />
                  </motion.div>
                </div>
                <div className="absolute top-[10%] right-[20%]">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border border-blue-100 flex items-center justify-center shadow-sm text-slate-600"
                  >
                    <FaPaperPlane className="text-[10px] md:text-sm" />
                  </motion.div>
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border border-blue-100 flex items-center justify-center shadow-sm"
                  >
                    <AiOutlineMail className="text-slate-600 text-[10px] md:text-sm" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <div className="text-center px-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">1. Messages Everywhere</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Switching between WhatsApp, Instagram, and email wastes time</p>
            </div>
          </motion.div>

          {/* Card 2: Slow Replies */}
          <motion.div variants={fadeIn} className="flex flex-col">
            <div className="bg-[#f0f9f4]/60 rounded-[32px] p-6 md:p-8 aspect-square relative overflow-hidden mb-8 border border-green-50 flex flex-col items-center justify-start pt-8 md:pt-12 scale-90 md:scale-100">
               <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 320 320"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M 160 50 L 160 260"
                  stroke="#22c55e"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>

              <motion.div
                variants={fadeIn}
                className="bg-[#dcfce7] border border-green-500 text-slate-900 px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs font-bold z-10 mb-6 md:mb-8 shadow-sm"
              >
                Slow Replies
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 md:w-12 md:h-12 bg-white border border-green-500 rounded-full flex items-center justify-center z-10 mb-8 md:mb-10 shadow-sm"
              >
                <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-wider">Agent</span>
              </motion.div>

              <div className="relative z-10 w-full flex flex-col items-center gap-1.5 px-4">
                {[
                  { text: "Wait 3m", width: "w-[60%]", delay: 0.6 },
                  { text: "Search 5m", width: "w-[80%]", delay: 0.9 },
                  { text: "Type 4m", width: "w-full", delay: 1.2 },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: step.delay }}
                    className={`bg-white border border-green-400 rounded-lg py-1.5 md:py-2 ${step.width} text-center text-[9px] md:text-[10px] font-black text-slate-600 shadow-sm`}
                  >
                    {step.text}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center px-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">2. Slow Replies</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Manual responses take too long, customers get frustrated</p>
            </div>
          </motion.div>

          {/* Card 3: Missed Customers */}
          <motion.div variants={fadeIn} className="flex flex-col">
            <div className="bg-[#f8f9fa] rounded-[32px] p-6 md:p-8 aspect-square relative overflow-hidden mb-8 border border-slate-100 flex items-center justify-center scale-90 md:scale-100">
               <div className="relative w-full h-full flex items-center justify-center">
                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
                  <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="30" y1="150" x2="270" y2="150" stroke="#facc15" strokeWidth="2" />
                  <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} x1="150" y1="30" x2="150" y2="270" stroke="#facc15" strokeWidth="2" />
                </svg>

                <div className="absolute top-[5%] left-1/2 -translate-x-1/2">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="w-10 h-10 md:w-12 md:h-12 bg-white border border-yellow-400 rounded-full flex items-center justify-center shadow-xl">
                    <Icons.Users className="text-yellow-500 w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </div>

                <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} animate={{ scale: [1, 1.1, 1] }} transition={{ delay: 0.5, duration: 2, repeat: Infinity }} className="w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-red-500 rounded-full flex items-center justify-center shadow-xl z-20">
                    <Icons.UserX className="text-red-500 w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} className="text-red-600 font-extrabold text-[9px] md:text-[11px] mt-2 whitespace-nowrap uppercase tracking-tighter">Customer Lost!</motion.p>
                </div>
              </div>
            </div>

            <div className="text-center px-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Missed Customers</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Lost sales opportunities from delayed or missed messages</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
