"use client";

import React from "react";
import { Bot, User, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ACTIVITIES = [
  { 
    id: 1, 
    type: "ai", 
    action: "AI responded to shipping inquiry", 
    time: "2 minutes ago", 
    status: "success" 
  },
  { 
    id: 2, 
    type: "ai", 
    action: "AI resolved refund request", 
    time: "5 minutes ago", 
    status: "success" 
  },
  { 
    id: 3, 
    type: "agent", 
    action: "Agent John replied to technical query", 
    time: "12 minutes ago", 
    status: "none" 
  },
  { 
    id: 4, 
    type: "ai", 
    action: "AI answered product question", 
    time: "18 minutes ago", 
    status: "success" 
  },
  { 
    id: 5, 
    type: "issue", 
    action: "Complex issue escalated to support", 
    time: "25 minutes ago", 
    status: "none" 
  },
];

export function RecentActivity() {
  return (
    <Card className="border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-2xl overflow-hidden p-6 h-full flex flex-col">
      <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#3AABFF]/5 flex items-center justify-center">
            <Bot className="w-4.5 h-4.5 text-[#3AABFF]" />
          </div>
          <div>
            <CardTitle className="text-[17px] font-medium">Recent Activity</CardTitle>
            <p className="text-[13px] text-[#878787] font-medium">Latest AI and agent actions</p>
          </div>
        </div>
        <Button variant="outline" className="rounded-xl h-9 px-3.5 text-[12px] font-medium border-[#E6EAF0]">
          View All
        </Button>
      </CardHeader>
      <div className="space-y-5 flex-1">
        {ACTIVITIES.map((activity, i) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className={cn(
               "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110",
               activity.type === "ai" ? "bg-[#3AABFF] text-white" : 
               activity.type === "agent" ? "bg-[#8B5CF6] text-white" : "bg-[#F97316] text-white"
            )}>
              {activity.type === "ai" ? <Bot className="w-4.5 h-4.5" /> : 
               activity.type === "agent" ? <User className="w-4.5 h-4.5" /> : <AlertCircle className="w-4.5 h-4.5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-medium text-[#000] dark:text-white truncate group-hover:text-[#3AABFF] transition-colors">{activity.action}</p>
              <p className="text-[11.5px] text-[#878787] font-medium uppercase tracking-wider">{activity.time}</p>
            </div>
            {activity.status === "success" && (
              <CheckCircle2 className="w-4.5 h-4.5 text-[#00C950]" />
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
