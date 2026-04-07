"use client";

import React from "react";
import { Sparkles, Bot, Phone, Video, MoreHorizontal, Mail, MapPin, Calendar, Clock, ShoppingBag, ExternalLink, Send, Edit, Copy, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const SUGGESTIONS = [
  { 
    id: 1, 
    tone: "Professional", 
    match: 95, 
    text: "Inside Dhaka: 2-3 days. Outside Dhaka: 4-5 days. We offer express delivery that can deliver within 24 hours!", 
    color: "#3AABFF" 
  },
  { 
    id: 2, 
    tone: "Friendly", 
    match: 88, 
    text: "Your order will be delivered in 2-3 business days for Dhaka area. Would you like to upgrade to express shipping?", 
    color: "#00C950" 
  },
  { 
    id: 3, 
    tone: "Casual", 
    match: 92, 
    text: "Standard delivery takes 2-3 days within Dhaka. For outside Dhaka, it takes 4-5 days. Let me know if you need rush delivery!", 
    color: "#F97316" 
  },
];

interface IntelligencePanelProps {
  contact: any;
  onSendSuggestion: (content: string) => void;
}

export function IntelligencePanel({ contact, onSendSuggestion }: IntelligencePanelProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0A0A0A] border-l border-[#E6EAF0] dark:border-[#1A1A1A] overflow-y-auto no-scrollbar p-6 space-y-8">

      {/* AI Suggestions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="font-medium text-[15.5px] text-[#000] dark:text-white leading-tight">AI Suggestions</h3>
              <p className="text-[11px] text-[#878787] font-medium tracking-tight">Smart replies ready</p>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-medium uppercase tracking-widest border border-green-500/20">
            Active
          </div>
        </div>

        <div className="space-y-4">
          {SUGGESTIONS.map((suggestion, i) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={cn(
                "border-none bg-[#F5F7FA] dark:bg-[#111111] rounded-2xl overflow-hidden hover:bg-white dark:hover:bg-black transition-all duration-300 border border-transparent hover:border-[#3AABFF20] hover:shadow-soft",
                i === 0 && "ring-1 ring-[#3AABFF20] bg-white dark:bg-black shadow-soft"
              )}>
                <CardContent className="p-4 space-y-3">
                   <div className="flex items-center justify-between">
                     <div className={cn(
                       "px-2.5 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider",
                       suggestion.tone === "Professional" ? "bg-blue-500/10 text-blue-500" :
                       suggestion.tone === "Friendly" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                     )}>
                       {suggestion.tone}
                     </div>
                     <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: suggestion.color }} />
                       <span className="text-[11px] font-medium text-[#878787] uppercase">{suggestion.match}%</span>
                     </div>
                   </div>
                   <p className="text-[13px] text-[#454555] dark:text-[#878787] leading-relaxed font-medium">
                     {suggestion.text}
                   </p>
                   {i === 0 && (
                     <div className="flex items-center gap-1.5 pt-2">
                       <Button 
                        onClick={() => onSendSuggestion(suggestion.text)}
                        className="flex-1 bg-[#3AABFF] text-white hover:bg-[#3AABFF]/90 rounded-xl h-9 text-[12px] font-medium gap-1.5 shadow-lg shadow-[#3AABFF]/20"
                       >
                         <Send className="w-3.5 h-3.5" />
                         Send
                       </Button>
                       <Button variant="outline" size="icon" className="w-9 h-9 rounded-xl border-[#E6EAF0] dark:border-[#1A1A1A] hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
                         <Edit className="w-3.5 h-3.5" />
                       </Button>
                       <Button variant="outline" size="icon" className="w-9 h-9 rounded-xl border-[#E6EAF0] dark:border-[#1A1A1A] hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
                         <Copy className="w-3.5 h-3.5" />
                       </Button>
                     </div>
                   )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Customer Info Section */}
      <div className="space-y-6 pt-4 border-t border-[#E6EAF0] dark:border-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#3AABFF]/10 flex items-center justify-center">
            <User className="w-4.5 h-4.5 text-[#3AABFF]" />
          </div>
          <h3 className="font-medium text-[15.5px] text-[#000] dark:text-white leading-tight">Customer Info</h3>
        </div>

        <div className="space-y-5">
          <div className="space-y-1 px-1">
             <label className="text-[11px] text-[#878787] font-medium tracking-wider uppercase">Full Name</label>
             <p className="text-[14px] font-medium text-[#000] dark:text-white">{contact.name}</p>
          </div>
          
          <div className="space-y-1 px-1">
             <label className="text-[11px] text-[#878787] font-medium tracking-wider uppercase">Email Address</label>
             <p className="text-[14px] font-medium text-[#000] dark:text-white">{contact.email}</p>
          </div>


          <div className="space-y-2 px-1">
             <label className="text-[11px] text-[#878787] font-medium tracking-wider uppercase">Tags</label>
             <div className="flex flex-wrap gap-1.5">
               {["VIP", "Frequent Buyer", "Premium"].map(tag => (
                 <span key={tag} className="px-2 py-0.5 rounded-md bg-[#3AABFF]/5 text-[#3AABFF] text-[10px] font-medium uppercase tracking-tight">
                   {tag}
                 </span>
               ))}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-[#F5F7FA] dark:bg-[#111111] p-4 rounded-2xl border border-transparent transition-all transition-colors duration-300">
             <div className="space-y-0.5">
                <p className="text-[11px] text-[#878787] font-medium uppercase">Total Orders</p>
                <p className="text-[15px] font-medium text-[#000] dark:text-white">12 + $2,450</p>
             </div>
             <div className="space-y-0.5">
                <p className="text-[11px] text-[#878787] font-medium uppercase">Last Order</p>
                <p className="text-[15px] font-medium text-[#3AABFF]">3 days ago</p>
             </div>
          </div>

          <div className="px-1 flex flex-col gap-3">
             <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#878787] font-medium flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Customer Since
                </p>
                <span className="text-[12px] font-medium">January 2025</span>
             </div>
             <Button variant="outline" className="w-full h-11 rounded-xl border-[#E6EAF0] dark:border-[#1A1A1A] font-medium text-[13px] hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
               View Full Profile
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
