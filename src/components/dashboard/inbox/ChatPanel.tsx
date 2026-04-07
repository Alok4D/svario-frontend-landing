"use client";

import React from "react";
import { Phone, Video, MoreHorizontal, Paperclip, Smile, Send, Bot, Check, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ChatPanelProps {
  contact: any;
  messages: any[];
  isTyping: boolean;
  onSend: (content: string) => void;
}

export function ChatPanel({ contact, messages, isTyping, onSend }: ChatPanelProps) {
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };


  return (
    <div className="flex flex-col h-full bg-white dark:bg-black relative">
      {/* Header */}
      <div className="h-20 border-b border-[#E6EAF0] dark:border-[#1A1A1A] px-6 flex items-center justify-between shrink-0 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-white font-medium text-sm", contact.color)}>
              {contact.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-black bg-green-500" />
          </div>
          <div>
            <h3 className="font-medium text-[16px] text-[#000] dark:text-white leading-tight">{contact.name}</h3>
            <p className="text-[12px] text-green-500 font-medium capitalize">Online • {contact.platform}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
            <Phone className="w-5 h-5 text-[#878787]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
            <Video className="w-5 h-5 text-[#878787]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
            <MoreHorizontal className="w-5 h-5 text-[#878787]" />
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex flex-col max-w-[80%]",
              msg.sender === "user" ? "ml-auto items-end" : "items-start"
            )}
          >
            {msg.type === "ai-assistant" && (
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className="w-5 h-5 rounded-lg bg-[#8B5CF6] flex items-center justify-center text-white">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-medium text-[#8B5CF6] uppercase tracking-wider">AI Assistant</span>
              </div>
            )}
            <div className={cn(
              "px-5 py-3.5 rounded-2xl relative shadow-sm text-[14.5px] leading-relaxed",
              msg.sender === "user" 
                ? "bg-[#3AABFF] text-white rounded-tr-none shadow-lg shadow-[#3AABFF]/20" 
                : "bg-[#F5F7FA] dark:bg-[#111111] text-[#000] dark:text-white rounded-tl-none border border-[#E6EAF0] dark:border-[#1A1A1A]"
            )}>
              {msg.content}
            </div>
            <div className="flex items-center gap-2 mt-1.5 px-1">
              <span className="text-[11px] text-[#878787] font-medium">{msg.time}</span>
              {msg.sender === "user" && (
                <CheckCheck className={cn("w-3.5 h-3.5", msg.status === "read" ? "text-[#3AABFF]" : "text-[#878787]")} />
              )}
            </div>
          </motion.div>
        ))}

        {/* AI Generating Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex items-center gap-3 px-1"
            >
              <div className="w-8 h-8 rounded-xl bg-[#3AABFF] flex items-center justify-center text-white shadow-lg shadow-[#3AABFF]/20 animate-pulse">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#3AABFF] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#3AABFF] rounded-full animate-bounce delay-75" />
                <div className="w-1.5 h-1.5 bg-[#3AABFF] rounded-full animate-bounce delay-150" />
                <span className="text-[12px] text-[#878787] font-medium ml-2 uppercase tracking-tight">AI is generating response...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input section */}
      <form 
        onSubmit={handleSendMessage}
        className="p-6 shrink-0 bg-white dark:bg-black border-t border-[#E6EAF0] dark:border-[#1A1A1A]"
      >
        <div className="flex items-center gap-4 bg-[#F5F7FA] dark:bg-[#111111] p-2 rounded-2xl border border-transparent focus-within:border-[#3AABFF20] focus-within:bg-white dark:focus-within:bg-black transition-all group">
          <Button type="button" variant="ghost" size="icon" className="rounded-xl shrink-0 group-focus-within:text-[#3AABFF]">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..." 
            className="flex-1 border-none bg-transparent h-10 px-0 focus-visible:ring-0 text-[14.5px]"
          />
          <div className="flex items-center gap-2 shrink-0 pr-1">
            <Button type="button" variant="ghost" size="icon" className="rounded-xl">
              <Smile className="w-5 h-5" />
            </Button>
            <Button 
              type="submit"
              disabled={!input.trim()}
              className="bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white rounded-xl w-10 h-10 p-0 shadow-lg shadow-[#3AABFF]/20 transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              <Send className="w-4.5 h-4.5 ml-0.5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
