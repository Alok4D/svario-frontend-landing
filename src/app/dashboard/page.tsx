"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCards } from "@/components/dashboard/dashboard-overview/StatCards";
import { MessageTrends } from "@/components/dashboard/dashboard-overview/MessageTrends";
import { RecentActivity } from "@/components/dashboard/dashboard-overview/RecentActivity";
import { TopTopics } from "@/components/dashboard/dashboard-overview/TopTopics";
import { AiTrainingBanner } from "@/components/dashboard/dashboard-overview/AiTrainingBanner";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-[#1A1C21] dark:text-white tracking-tight leading-tight mb-1">
            Dashboard Overview
          </h1>
          <p className="text-sm text-[#878787]">
            Welcome back! Here's what's happening with your support today
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#00C950]/5 rounded-full border border-[#00C950]/10">
          <div className="w-2 h-2 bg-[#00C950] rounded-full animate-pulse" />
          <span className="text-xs font-medium text-[#00C950] uppercase tracking-wider">
            All Systems Operational
          </span>
        </div>
      </div>


      {/* Stat Cards Section */}
      <StatCards />

      {/* Main Chart Section */}
      <MessageTrends />

      {/* Two Column Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7">
          <RecentActivity />
        </div>
        <div className="lg:col-span-5">
          <TopTopics />
        </div>
      </div>

      {/* AI Training Banner Section */}
      <AiTrainingBanner />
    </div>
  );
}
