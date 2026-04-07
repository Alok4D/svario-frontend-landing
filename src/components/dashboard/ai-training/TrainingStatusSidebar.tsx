"use client";

import React from "react";
import { Zap, Activity, MessageCircle, Bot, Send, BrainCircuit, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const METRICS = [
  { label: "Overall Accuracy", value: 91, color: "bg-[#3AABFF]" },
  { label: "Knowledge Coverage", value: 78, color: "bg-[#8B5CF6]" },
  { label: "Response Speed", value: 95, color: "bg-[#00C950]" },
];

const ACTIVITIES = [
  { action: "New entry added", topic: "Shipping", time: "5 min ago", icon: PlusCircle },
  { action: "Entry updated", topic: "Returns", time: "1 hour ago", icon: EditCircle },
  { action: "Training completed", topic: "Payment", time: "2 hours ago", icon: CheckCircle },
];

// Helper icons for local usage if needed, or use lucide
function PlusCircle(props: any) { return <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>; }
function EditCircle(props: any) { return <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>; }
function CheckCircle(props: any) { return <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>; }

export function TrainingStatusSidebar() {
  const [testQuestion, setTestQuestion] = React.useState("");
  const [chat, setChat] = React.useState([
    { role: "user", content: "What is delivery time?" },
    { role: "ai", content: "Inside Dhaka: 2-3 days. Outside Dhaka: 4-5 days. We also offer express delivery!" }
  ]);
  const [isThinking, setIsThinking] = React.useState(false);

  const handleTest = () => {
    if (!testQuestion.trim()) return;
    const q = testQuestion;
    setChat(prev => [...prev, { role: "user", content: q }]);
    setTestQuestion("");
    setIsThinking(true);

    setTimeout(() => {
      setChat(prev => [...prev, { role: "ai", content: `I've analyzed your question "${q}". Based on my training, I would respond with our standard ${q.includes("delivery") ? "shipping" : "support"} protocol. Is this correct?` }]);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* AI Training Status */}
      <Card className="border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[2rem] p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
            <Activity className="w-4.5 h-4.5 text-[#8B5CF6]" />
          </div>
          <div>
            <h3 className="font-medium text-[15.5px]">AI Training Status</h3>
            <p className="text-[11px] text-[#878787] font-medium">Real-time learning progress</p>
          </div>
        </div>

        <div className="space-y-6">
          {METRICS.map(m => (
            <div key={m.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#878787] uppercase tracking-wider">{m.label}</span>
                <span className="text-[13.5px] font-medium text-[#000] dark:text-white">{m.value}%</span>
              </div>
              <div className="w-full h-2 bg-[#F5F7FA] dark:bg-[#111111] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={cn("h-full rounded-full", m.color)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full h-11 rounded-xl border-[#E6EAF0] dark:border-[#1A1A1A] font-medium text-[13px] hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
          View Detailed Analytics
        </Button>
      </Card>

      {/* Live AI Preview */}
      <Card className="border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[2rem] p-6 space-y-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-xl bg-[#00C950]/10 flex items-center justify-center">
               <Zap className="w-4.5 h-4.5 text-[#00C950]" />
             </div>
             <h3 className="font-medium text-[15.5px]">Live AI Preview</h3>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-medium flex items-center gap-1.5 border border-green-500/20 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active
          </div>
        </div>

        <div className="space-y-4 min-h-[200px] flex flex-col pt-2 max-h-[300px] overflow-y-auto no-scrollbar">
          {chat.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={cn("flex flex-col gap-1.5", msg.role === 'user' ? "items-end ml-auto" : "items-start mr-auto")}
            >
              {msg.role === 'ai' && (
                <div className="flex items-center gap-2 mb-0.5 pl-1">
                  <div className="w-5 h-5 bg-[#8B5CF6] rounded-lg flex items-center justify-center text-white scale-75 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-medium text-[#8B5CF6] uppercase">AI Assistant</span>
                </div>
              )}
              <div className={cn(
                "p-3.5 rounded-2xl text-[12.5px] font-medium shadow-sm max-w-[95%] leading-relaxed",
                msg.role === 'user' 
                  ? "bg-[#3AABFF] text-white rounded-tr-none" 
                  : "bg-[#F5F7FA] dark:bg-[#111111] border border-[#E6EAF0] dark:border-[#1A1A1A] text-[#000] dark:text-white rounded-tl-none"
              )}>
                 {msg.content}
              </div>
            </motion.div>
          ))}
          {isThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 pl-2">
               <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce" />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce [animation-delay:0.2s]" />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce [animation-delay:0.4s]" />
               </div>
               <span className="text-[11px] text-[#878787] font-medium uppercase tracking-wider italic">AI is thinking...</span>
            </motion.div>
          )}
        </div>

        <div className="space-y-3 pt-4">
           <Input 
             value={testQuestion}
             onChange={(e) => setTestQuestion(e.target.value)}
             onKeyPress={(e) => e.key === 'Enter' && handleTest()}
             placeholder="Test a question..." 
             className="h-10 rounded-xl bg-[#F5F7FA] dark:bg-[#111111] border-[#E6EAF0] dark:border-[#1A1A1A] text-[13px] px-4" 
           />
           <Button 
             onClick={handleTest}
             disabled={isThinking || !testQuestion.trim()}
             className="w-full h-11 rounded-xl bg-[#3AABFF] text-white hover:bg-[#3AABFF]/90 font-medium text-[13px] shadow-lg shadow-[#3AABFF]/20 transition-all active:scale-95 group"
           >
             {isThinking ? "Testing Response..." : "Test AI Response"}
           </Button>
        </div>
      </Card>


      {/* Recent Activity */}
      <Card className="border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[2rem] p-6 space-y-6">
        <h3 className="font-medium text-[15.5px]">Recent Activity</h3>
        <div className="space-y-5">
           {ACTIVITIES.map((act, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ delay: i * 0.1 }}
               className="flex items-center gap-3 group cursor-pointer"
             >
                <act.icon />
                <div className="flex-1 min-w-0">
                   <p className="text-[13.5px] font-medium text-[#000] dark:text-white group-hover:text-[#3AABFF] transition-colors">{act.action}</p>
                   <p className="text-[11.5px] text-[#878787] font-medium uppercase tracking-tight">{act.topic} • {act.time}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </Card>
    </div>
  );
}
