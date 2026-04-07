"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const tabs = [
  {
    id: "smart-automation",
    label: "Smart Automation",
    title: "Smart Automation",
    description:
      "Automate repetitive support tasks and streamline your workflow. Create rules that automatically categorize messages, trigger actions, and assign conversations to the right team members—saving time and ensuring faster responses.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "unified-inbox",
    label: "Unified Inbox",
    title: "Unified Inbox",
    description:
      "Manage all your customer conversations from one place. Connect channels like WhatsApp, Instagram, and email into a single inbox so your team can respond faster without switching between platforms.",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "ai-auto-replies",
    label: "AI Auto-Replies",
    title: "AI Auto-Replies",
    description:
      "AI Auto-Replies automatically respond to customer messages using intelligent AI trained on your business knowledge. Instantly handle common questions, reduce response time, and deliver fast, consistent support across all communication channels.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "contact-management",
    label: "Contact Management",
    title: "Contact Management",
    description:
      "Contact Management allows businesses to keep all customer information organized in one place. Each contact profile stores important details such as name, email, phone number, conversation history, tags, and channel source.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "analytics",
    label: "Analytics & Insights",
    title: "Analytics & Insights",
    description:
      "Monitor support performance with powerful analytics. Track message activity, response times, and AI performance to make smarter decisions and improve customer experience.",
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "integration",
    label: "Easy Integration",
    title: "Easy Integration",
    description:
      "Connect your favorite communication channels and business tools in minutes. Seamlessly integrate messaging platforms so all customer conversations appear in one centralized dashboard.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  },
];

const FeaturesTabSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-24 px-4 bg-white overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="reveal text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Everything you need in one platform
          </h2>
          <p className="reveal reveal-d1 text-base md:text-lg text-slate-500 font-normal">
            Powerful features to streamline your support
          </p>
        </div>

        <div className="reveal reveal-d2 flex overflow-x-auto no-scrollbar md:justify-center gap-2 mb-16 p-1.5 bg-slate-50/50 rounded-2xl border border-slate-100 max-w-full md:max-w-fit mx-auto px-4 md:px-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shrink-0 ${
                activeTab.id === tab.id
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {activeTab.id === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white shadow-sm border border-blue-100 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="relative min-h-[400px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center px-4"
            >
              <div className="relative aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100">
                <Image
                  src={activeTab.image}
                  alt={activeTab.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-4 md:gap-6 text-center lg:text-left">
                <h3 className="text-2xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                  {activeTab.title}
                </h3>
                <p className="text-sm md:text-xl text-slate-500 leading-relaxed font-manrope">
                  {activeTab.description}
                </p>
                <div className="pt-2 md:pt-4">
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-base shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
                    Learn more
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTabSection;
