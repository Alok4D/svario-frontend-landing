"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Bot, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Dot
} from 'recharts';

const trendData = [
  { day: 'Mon', messages: 120 },
  { day: 'Tue', messages: 155 },
  { day: 'Wed', messages: 185 },
  { day: 'Thu', messages: 145 },
  { day: 'Fri', messages: 210 },
  { day: 'Sat', messages: 165 },
  { day: 'Sun', messages: 135 },
];

const responseData = [
  { day: 'Mon', count: 95 },
  { day: 'Tue', count: 130 },
  { day: 'Wed', count: 160 },
  { day: 'Thu', count: 120 },
  { day: 'Fri', count: 180 },
  { day: 'Sat', count: 140 },
  { day: 'Sun', count: 110 },
];

const topTopics = [
  { topic: "Shipping & Delivery", queries: 234, percentage: 85 },
  { topic: "Refunds & Returns", queries: 187, percentage: 65 },
  { topic: "Product Information", queries: 143, percentage: 45 },
  { topic: "Account Issues", queries: 102, percentage: 35 },
];

const stats = [
  { 
    label: "Total Messages", 
    value: "2,847", 
    icon: MessageSquare, 
    trend: "+12.5%", 
    isUp: true,
    color: "#3AABFF",
    bgColor: "#3AABFF0D",
    borderColor: "#3AABFF"
  },
  { 
    label: "AI Response Rate", 
    value: "89%", 
    icon: Bot, 
    trend: "+5.2%", 
    isUp: true,
    color: "#8B5CF6",
    bgColor: "#8B5CF60D",
    borderColor: "#8B5CF6"
  },
  { 
    label: "Avg Response Time", 
    value: "2.3m", 
    icon: Clock, 
    trend: "-18%", 
    isUp: false,
    color: "#00C950",
    bgColor: "#00C9500D",
    borderColor: "#00C950"
  },
  { 
    label: "Satisfaction Rate", 
    value: "94%", 
    icon: TrendingUp, 
    trend: "+3.1%", 
    isUp: true,
    color: "#FF8A00",
    bgColor: "#FF8A000D",
    borderColor: "#FF8A00"
  },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-[1200px] mx-auto pb-20 px-4">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-medium text-[#1A1C21] dark:text-white leading-tight">Analytics</h1>
        <p className="text-sm text-[#878787]">Track your support performance</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card className="p-6 bg-white dark:bg-[#0A0A0A] border-2 rounded-[24px] shadow-soft flex flex-col justify-between h-[180px] transition-all hover:shadow-primary cursor-default" style={{ borderColor: stat.borderColor }}>
              <div className="flex items-start justify-between">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center" 
                  style={{ backgroundColor: stat.bgColor, color: stat.color }}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.isUp ? 'text-[#00C950]' : 'text-[#FF4D4F]'}`}>
                  {stat.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1 mt-4">
                <h3 className="text-2xl font-medium text-[#1A1C21] dark:text-white tracking-tight leading-none">{stat.value}</h3>
                <p className="text-sm text-[#878787]">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="p-8 border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[24px]">
            <h4 className="text-lg font-medium text-[#1A1C21] dark:text-white mb-8">Message Trends</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6EAF0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#878787', fontSize: 13, fontWeight: 500 }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#878787', fontSize: 13, fontWeight: 500 }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#3AABFF" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#3AABFF', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="p-8 border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[24px]">
            <h4 className="text-lg font-medium text-[#1A1C21] dark:text-white mb-8">AI vs Manual Responses</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6EAF0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#878787', fontSize: 13, fontWeight: 500 }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#878787', fontSize: 13, fontWeight: 500 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#3AABFF" 
                    radius={[6, 6, 0, 0]} 
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Top Topics Section */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="p-8 border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[24px]">
          <h4 className="text-lg font-medium text-[#1A1C21] dark:text-white mb-8">Top Topics</h4>
          <div className="space-y-8">
            {topTopics.map((item) => (
              <div key={item.topic} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1A1C21] dark:text-white">{item.topic}</span>
                  <span className="text-xs text-[#878787]">{item.queries} queries</span>
                </div>
                <div className="h-2.5 w-full bg-[#E6EAF0] dark:bg-[#FFFFFF1A] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-[#3AABFF] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
