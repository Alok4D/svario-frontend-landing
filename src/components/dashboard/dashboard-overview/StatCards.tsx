"use client";

import React from "react";
import { MessageSquare, Bot, Clock, Smile, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const STATS = [
  { 
    label: "Total Messages", 
    value: "2,847", 
    icon: MessageSquare, 
    trend: "+12.5%", 
    color: "#3AABFF", 
    borderColor: "border-[#3AABFF]",
    bgColor: "bg-[#3AABFF]/10"
  },
  { 
    label: "AI Response Rate", 
    value: "89%", 
    icon: Bot, 
    trend: "+5.2%", 
    color: "#8B5CF6", 
    borderColor: "border-[#8B5CF6]",
    bgColor: "bg-[#8B5CF6]/10"
  },
  { 
    label: "Avg Response Time", 
    value: "2.3m", 
    icon: Clock, 
    trend: "-18%", 
    color: "#00C950", 
    borderColor: "border-[#00C950]",
    bgColor: "bg-[#00C950]/10"
  },
  { 
    label: "Satisfaction Rate", 
    value: "94%", 
    icon: Smile, 
    trend: "+3.1%", 
    color: "#F97316", 
    borderColor: "border-[#F97316]",
    bgColor: "bg-[#F97316]/10"
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat, i) => {
        const isPositive = stat.trend.includes("+");
        const trendColor = isPositive ? "text-[#00C950]" : "text-[#FF4D4F]";
        const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={cn(
               "border-l-4 bg-white dark:bg-[#0A0A0A] shadow-soft rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300",
               stat.borderColor
            )}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm", stat.bgColor)}>
                    <stat.icon style={{ color: stat.color }} className="w-5 h-5" />
                  </div>
                  <div className={cn("flex items-center gap-1 text-[12px] font-medium", trendColor)}>
                    <TrendIcon className="w-3.5 h-3.5" />
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <h3 className="text-[25px] font-medium text-[#000] dark:text-white leading-none mb-1">{stat.value}</h3>
                  <p className="text-[13.5px] text-[#878787] font-medium tracking-tight">{stat.label}</p>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
