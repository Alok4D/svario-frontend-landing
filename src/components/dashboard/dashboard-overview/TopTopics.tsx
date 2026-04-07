"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const TOPICS = [
  { label: "Shipping & Delivery", value: 120, total: 150, color: "#3AABFF" },
  { label: "Refunds & Returns", value: 98, total: 150, color: "#8B5CF6" },
  { label: "Product Information", value: 85, total: 150, color: "#00C950" },
  { label: "Account Issues", value: 67, total: 150, color: "#F97316" },
];

export function TopTopics() {
  return (
    <Card className="border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-2xl overflow-hidden p-6 h-full flex flex-col">
      <CardHeader className="p-0 mb-8 flex flex-row items-center gap-4">
        <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/5 flex items-center justify-center">
          <TrendingUp className="w-4.5 h-4.5 text-[#8B5CF6]" />
        </div>
        <div>
          <CardTitle className="text-[17px] font-medium">Top Topics</CardTitle>
          <p className="text-[13px] text-[#878787] font-medium">Most common inquiries</p>
        </div>
      </CardHeader>
      <div className="space-y-7 flex-1">
        {TOPICS.map((topic, i) => (
          <motion.div 
            key={topic.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="space-y-2.5"
          >
            <div className="flex items-center justify-between font-medium text-[13px]">
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: topic.color }} />
                 <span className="text-[#000] dark:text-white">{topic.label}</span>
               </div>
               <span className="text-[#878787] font-medium">{topic.value}</span>
            </div>

            <div className="w-full h-2 bg-[#F5F7FA] dark:bg-[#111111] rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(topic.value / topic.total) * 100}%` }}
                 transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                 className="h-full rounded-full"
                 style={{ backgroundColor: topic.color }}
               />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
