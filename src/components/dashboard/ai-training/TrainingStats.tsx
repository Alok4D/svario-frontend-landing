"use client";

import React from "react";
import { BookOpen, Target, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const STATS = [
  { label: "Total Entries", value: "47", icon: BookOpen, color: "#3AABFF", borderColor: "border-blue-500", bgColor: "bg-blue-50" },
  { label: "Active Topics", value: "12", icon: Target, color: "#8B5CF6", borderColor: "border-purple-500", bgColor: "bg-purple-50" },
  { label: "Avg Accuracy", value: "91%", icon: TrendingUp, color: "#00C950", borderColor: "border-green-500", bgColor: "bg-green-50" },
  { label: "Total Uses", value: "1.2K", icon: Users, color: "#F97316", borderColor: "border-orange-500", bgColor: "bg-orange-50" },
];

export function TrainingStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className={cn(
             "border-l-4 rounded-2xl overflow-hidden bg-white shadow-soft group hover:scale-[1.02] transition-transform duration-300",
             stat.borderColor
          )}>
            <CardContent className="p-5">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bgColor)}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <h3 className="text-2xl font-medium text-[#000] leading-none mb-1">{stat.value}</h3>
              <p className="text-[13px] text-[#878787] font-medium tracking-tight uppercase">{stat.label}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
