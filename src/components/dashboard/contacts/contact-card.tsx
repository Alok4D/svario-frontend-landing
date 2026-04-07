import React from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ContactCardProps {
  name: string;
  email: string;
  phone: string;
  tags: string[];
  orderCount: number;
  lastActivity: string;
  onView?: () => void;
  onMessage?: () => void;
}

export function ContactCard({
  name,
  email,
  phone,
  tags,
  orderCount,
  lastActivity,
  onView,
  onMessage,
}: ContactCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-[#0A0A0A] border border-[#E6EAF0] dark:border-[#FFFFFF1A] rounded-[24px] p-8 shadow-soft transition-all duration-300 hover:shadow-primary flex items-center justify-between mb-6 group cursor-default"
    >
      <div className="flex items-center gap-6 flex-1">
        <div className="w-16 h-16 rounded-full bg-[#3AABFF] text-white flex items-center justify-center font-medium text-[18px] shrink-0">
          {initials}
        </div>
        
        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <h3 className="text-[18px] font-medium text-[#1A1C21] dark:text-white leading-tight">{name}</h3>
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center gap-2 text-[#878787]">
                <Mail className="w-4 h-4" />
                <span className="text-[14px] font-medium">{email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#878787]">
                <Phone className="w-4 h-4" />
                <span className="text-[14px] font-medium">{phone}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span 
                key={tag}
                className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                  tag === "VIP" 
                    ? "bg-[#3AABFF1A] text-[#3AABFF]" 
                    : tag === "Frequent"
                    ? "bg-[#00C9501A] text-[#00C950]"
                    : "bg-[#8787871A] text-[#878787]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-6 h-full justify-between pr-2">
        <div className="text-right">
          <p className="text-[14px] font-medium text-[#878787] leading-none mb-1">{orderCount} orders</p>
          <p className="text-[12px] text-[#C4C4C4] font-medium">Last: {lastActivity}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
                variant="outline" 
                onClick={onView}
                className="rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] text-[#1A1C21] dark:text-white h-11 px-6 text-[14px] font-medium hover:bg-[#F5F7FA] dark:hover:bg-[#111111] transition-colors"
            >
                View
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
                variant="outline" 
                onClick={onMessage}
                className="rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] text-[#1A1C21] dark:text-white h-11 px-6 text-[14px] font-medium hover:bg-[#F5F7FA] dark:hover:bg-[#111111] transition-colors"
            >
                Message
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
