"use client";

import React from "react";
import { BrainCircuit, BookOpen, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AiTrainingBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3AABFF] to-[#0566FFCC] p-8 md:p-12 shadow-card-blue text-white group"
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <motion.div 
             initial={{ scale: 0.9 }}
             animate={{ scale: 1 }}
             className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[11.5px] font-medium mb-6 tracking-wide"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            AI CAPABILITY BOOST
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-tight">
            Train Your AI Assistant
          </h2>
          <p className="text-white/80 text-[15px] mb-8 max-w-lg font-medium leading-relaxed">
            Add more knowledge to improve AI accuracy and response quality for your unique business needs.
          </p>
        </div>
        
        <div className="flex shrink-0">
          <Button className="bg-white text-[#3AABFF] hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl h-14 px-8 font-medium text-[15px] shadow-2xl shadow-white/10 gap-2 border-none outline-none">
            <Plus className="w-5 h-5" />
            Add Knowledge
          </Button>
        </div>

      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block overflow-hidden rounded-r-[2rem]">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.1, 0.2, 0.1]
           }}
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" 
         />
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      </div>
    </motion.div>
  );
}
