"use client";

import React from "react";
import { ConversationSidebar } from "@/components/dashboard/inbox/ConversationSidebar";
import { ChatPanel } from "@/components/dashboard/inbox/ChatPanel";
import { IntelligencePanel } from "@/components/dashboard/inbox/IntelligencePanel";
import { motion } from "framer-motion";

const CONTACTS = [
  { id: 1, name: "John Doe", lastMessage: "What is the delivery time?", time: "2m", unread: 2, platform: "whatsapp", avatar: "JD", color: "bg-[#3AABFF]", email: "john.doe@example.com", since: "January 2025" },
  { id: 2, name: "Sarah Smith", lastMessage: "I need a refund for order #1234", time: "15m", unread: 0, platform: "instagram", avatar: "SS", color: "bg-[#8B5CF6]", email: "sarah.s@example.com", since: "December 2024" },
  { id: 3, name: "Mike Johnson", lastMessage: "Is this product available?", time: "1h", unread: 1, platform: "email", avatar: "MJ", color: "bg-[#00C950]", email: "mike.j@example.com", since: "February 2024" },
  { id: 4, name: "Emma Wilson", lastMessage: "Thank you for the quick support!", time: "2h", unread: 0, platform: "whatsapp", avatar: "EW", color: "bg-[#F97316]", email: "emma.w@example.com", since: "June 2024" },
];

const INITIAL_MESSAGES = {
  1: [
    { id: 101, sender: "user", content: "Hi! I need help with my order", time: "2:28 PM", status: "read" },
    { id: 102, sender: "ai", content: "Hello! I'd be happy to help you with your order. Could you please provide your order number?", time: "2:28 PM", type: "ai-assistant" },
    { id: 103, sender: "user", content: "Sure, it's #ORD-12345", time: "2:29 PM", status: "read" },
    { id: 104, sender: "ai", content: "Thank you! Let me check that for you. Your order is currently being processed and will be shipped within 24 hours.", time: "2:29 PM", type: "ai-assistant" },
  ],
  2: [
    { id: 201, sender: "user", content: "I would like to return my sweater", time: "1:15 PM", status: "read" },
    { id: 202, sender: "ai", content: "I can help with that! Is there a reason for the return?", time: "1:16 PM", type: "ai-assistant" },
  ],
};

export default function InboxPage() {
  const [activeId, setActiveId] = React.useState(1);
  const [allMessages, setAllMessages] = React.useState<any>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = React.useState(false);

  const activeContact = CONTACTS.find(c => c.id === activeId) || CONTACTS[0];
  const messages = allMessages[activeId] || [];


  const addMessage = (content: string, sender: "user" | "ai", type?: string) => {
    const newMessage = {
      id: Date.now(),
      sender,
      content,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "delivered"
    };

    setAllMessages((prev: any) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage]
    }));


    if (sender === "user") {
      // Simulate auto-AI response if it's from user
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addMessage("I've analyzed your request. We'll update the tracking info within the hour!", "ai", "ai-assistant");
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] -mt-4">
      {/* Inbox Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-medium text-[#1A1C21] dark:text-white tracking-tight leading-tight mb-1">
            Inbox
          </h1>
          <p className="text-sm font-normal text-[#878787]">
            Manage all customer conversations in one place
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00C950]/5 rounded-full border border-[#00C950]/10 shrink-0 self-start md:self-auto">
          <div className="w-2 h-2 bg-[#00C950] rounded-full animate-pulse" />
          <span className="text-[11px] font-medium text-[#00C950] uppercase tracking-wider">
            AI Active
          </span>
        </div>
      </div>

      {/* Main Inbox Layout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex bg-white dark:bg-black rounded-[2.5rem] overflow-hidden shadow-soft border border-[#E6EAF0] dark:border-[#1A1A1A] relative"
      >
        {/* Left Sidebar: Conversations */}
        <div className="hidden lg:block w-[320px] xl:w-[380px] shrink-0 h-full overflow-hidden">
          <ConversationSidebar 
            activeId={activeId} 
            onSelect={setActiveId} 
          />
        </div>

        {/* Middle Panel: Chat */}
        <div className="flex-1 h-full overflow-hidden border-r border-[#E6EAF0] dark:border-[#1A1A1A]">
          <ChatPanel 
            contact={activeContact} 
            messages={messages} 
            isTyping={isTyping}
            onSend={(c) => addMessage(c, "user")} 
          />
        </div>

        {/* Right Panel: Intelligence */}
        <div className="hidden xl:block w-[350px] shrink-0 h-full overflow-hidden">
          <IntelligencePanel 
            contact={activeContact}
            onSendSuggestion={(c) => addMessage(c, "ai", "ai-assistant")}
          />
        </div>
      </motion.div>
    </div>
  );
}

