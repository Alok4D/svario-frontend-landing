"use client";

import React from "react";
import { Search, MoreVertical, Smartphone, Instagram, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const CONTACTS = [
  { id: 1, name: "John Doe", lastMessage: "What is the delivery time?", time: "2m", unread: 2, platform: "whatsapp", avatar: "JD", color: "bg-[#3AABFF]" },
  { id: 2, name: "Sarah Smith", lastMessage: "I need a refund for order #1234", time: "15m", unread: 0, platform: "instagram", avatar: "SS", color: "bg-[#8B5CF6]" },
  { id: 3, name: "Mike Johnson", lastMessage: "Is this product available?", time: "1h", unread: 1, platform: "email", avatar: "MJ", color: "bg-[#00C950]" },
  { id: 4, name: "Emma Wilson", lastMessage: "Thank you for the quick support!", time: "2h", unread: 0, platform: "whatsapp", avatar: "EW", color: "bg-[#F97316]" },
];

interface ConversationSidebarProps {
  activeId: number;
  onSelect: (id: number) => void;
}

export function ConversationSidebar({ activeId, onSelect }: ConversationSidebarProps) {
  const [activeTab, setActiveTab] = React.useState("all");


  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0A0A0A] border-r border-[#E6EAF0] dark:border-[#1A1A1A]">
      <div className="p-6 space-y-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#878787] group-focus-within:text-[#3AABFF] transition-colors" />
          <Input 
            placeholder="Search..." 
            className="pl-11 h-12 bg-[#F5F7FA] dark:bg-[#111111] border-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#3AABFF]/50 text-[14.5px]"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Unread", "AI"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                "px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300",
                activeTab === tab.toLowerCase() 
                  ? "bg-[#3AABFF] text-white shadow-lg shadow-[#3AABFF]/20" 
                  : "bg-[#F5F7FA] dark:bg-[#111111] text-[#878787] hover:text-[#000] dark:hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1">
        {CONTACTS.map((contact, i) => {
          const isActive = contact.id === activeId;
          return (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(contact.id)}
              className={cn(
                "group p-4 rounded-2xl cursor-pointer transition-all duration-300 relative",
                isActive ? "bg-[#3AABFF]/5 border border-[#3AABFF]/10" : "hover:bg-[#F5F7FA] dark:hover:bg-[#111111]"
              )}
            >
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white font-medium text-sm shadow-inner", contact.color)}>
                    {contact.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-black bg-green-500" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-[15px] text-[#000] dark:text-white truncate">
                      {contact.name}
                    </span>
                    <span className="text-[11px] text-[#878787] font-medium">{contact.time}</span>
                  </div>
                  <p className="text-[13px] text-[#878787] font-medium truncate mb-2">
                    {contact.lastMessage}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className={cn(
                      "px-2 py-0.5 rounded-lg text-[9px] font-medium uppercase tracking-wider flex items-center gap-1",
                      contact.platform === "whatsapp" ? "bg-green-500/10 text-green-500" :
                      contact.platform === "instagram" ? "bg-pink-500/10 text-pink-500" : "bg-blue-500/10 text-blue-500"
                    )}>
                      {contact.platform === "whatsapp" && <MessageCircle className="w-2.5 h-2.5" />}
                      {contact.platform === "instagram" && <Instagram className="w-2.5 h-2.5" />}
                      {contact.platform}
                    </div>
                    {contact.unread > 0 && !isActive && (
                      <span className="w-5 h-5 rounded-full bg-[#3AABFF] text-white flex items-center justify-center text-[10px] font-medium shadow-lg shadow-[#3AABFF]/30">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#3AABFF] rounded-r-full" />
              )}
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}
