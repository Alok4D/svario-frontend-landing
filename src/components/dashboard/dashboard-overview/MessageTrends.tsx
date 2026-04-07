"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const data = [
  { name: "Mon", total: 700, ai: 450 },
  { name: "Tue", total: 850, ai: 550 },
  { name: "Wed", total: 1100, ai: 850 },
  { name: "Thu", total: 950, ai: 700 },
  { name: "Fri", total: 1050, ai: 800 },
  { name: "Sat", total: 1300, ai: 1100 },
  { name: "Sun", total: 1200, ai: 950 },
];

export function MessageTrends() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <Card className="border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-2xl overflow-hidden p-8">
        <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            Message Trends
          </CardTitle>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3AABFF] rounded-full" />
              <span className="text-[13px] text-[#878787] font-medium uppercase tracking-wider">Total</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#0566FFCC] rounded-full" />
              <span className="text-[13px] text-[#878787] font-medium uppercase tracking-wider">AI Handled</span>
            </div>
          </div>
        </CardHeader>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3AABFF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3AABFF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0566FFCC" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0566FFCC" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6EAF0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#878787", fontSize: 13, fontWeight: "500" }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#878787", fontSize: 13, fontWeight: "500" }}
                tickCount={6}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", background: "white" }}
                cursor={{ stroke: "#3AABFF", strokeWidth: 2, strokeDasharray: "5 5" }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#3AABFF" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                animationDuration={2000}
              />
              <Area 
                type="monotone" 
                dataKey="ai" 
                stroke="#0566FFCC" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorAi)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
