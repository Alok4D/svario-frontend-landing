"use client";

import React from "react";
import { Plus, Sparkles, Wand2, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const CATEGORIES = ["Shipping", "Returns", "Payment", "Product Info", "Account", "Technical"];

interface KnowledgeEntryFormProps {
  onAdd: (entry: { question: string; answer: string; category: string }) => void;
  editingEntry?: any;
  onCancelEdit?: () => void;
}

export function KnowledgeEntryForm({ onAdd, editingEntry, onCancelEdit }: KnowledgeEntryFormProps) {
  const [activeCategory, setActiveCategory] = React.useState("Shipping");
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [isImproving, setIsImproving] = React.useState(false);

  React.useEffect(() => {
    if (editingEntry) {
      setQuestion(editingEntry.question);
      setAnswer(editingEntry.answer);
      setActiveCategory(editingEntry.category);
    } else {
      setQuestion("");
      setAnswer("");
      setActiveCategory("Shipping");
    }
  }, [editingEntry]);

  const handleSave = () => {
    if (!question || !answer) return;
    onAdd({ question, answer, category: activeCategory });
    if (!editingEntry) {
      setQuestion("");
      setAnswer("");
    }
  };

  const handleImprove = () => {
    setIsImproving(true);
    setTimeout(() => {
      setAnswer(prev => prev + " \n\n[AI Improved]: This answer has been refined for better clarity and customer satisfaction based on recent support trends.");
      setIsImproving(false);
    }, 1500);
  };



  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#0A0A0A] border rounded-[2rem] p-8 shadow-card overflow-hidden transition-all duration-300 relative group"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-11 h-11 bg-[#3AABFF] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#3AABFF]/20 overflow-hidden">
           {editingEntry ? <EditCircle className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </div>
        <div>
           <h2 className="text-xl font-medium text-[#000] dark:text-white leading-tight">
             {editingEntry ? "Update Knowledge Entry" : "Create New Knowledge Entry"}
           </h2>
           <p className="text-[13px] text-[#878787] font-medium tracking-tight">
             {editingEntry ? `Editing: ID #${editingEntry.id}` : "Add a new FAQ to train your AI"}
           </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* ... (Topic Category remains similar) */}
        <div className="space-y-4">
           <label className="text-[13px] text-[#878787] font-medium tracking-wider uppercase">Topic Category</label>
           <div className="flex flex-wrap gap-2">
             {CATEGORIES.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={cn(
                   "px-4 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-300",
                   activeCategory === cat 
                     ? "bg-[#3AABFF] text-white shadow-lg shadow-[#3AABFF]/20" 
                     : "bg-[#F5F7FA] dark:bg-[#111111] text-[#878787] hover:text-[#000] dark:hover:text-white hover:bg-[#E6EAF0]"
                 )}
               >
                 {cat}
               </button>
             ))}
             <button className="px-4 py-2 rounded-xl text-[12.5px] font-medium text-[#878787] border border-dashed border-[#E6EAF0] dark:border-[#1A1A1A] hover:bg-[#F5F7FA] transition-all">
               + Add Topic
             </button>
           </div>
        </div>

        <div className="space-y-4">
           <label className="text-[13px] text-[#878787] font-medium tracking-wider uppercase">Customer Question</label>
           <Input 
             value={question}
             onChange={(e) => setQuestion(e.target.value)}
             placeholder="What question will customers typically ask?" 
             className="h-12 rounded-xl border-[#E6EAF0] dark:border-[#1A1A1A] bg-[#F5F7FA] dark:bg-[#111111] text-[14.5px] p-4 focus-visible:ring-[#3AABFF]/50"
           />
        </div>

        <div className="space-y-4">
           <label className="text-[13px] text-[#878787] font-medium tracking-wider uppercase">AI Response</label>
           <Textarea 
             value={answer}
             onChange={(e) => setAnswer(e.target.value)}
             placeholder="How should the AI respond to this question?" 
             className="min-h-[140px] rounded-[1.5rem] border-[#E6EAF0] dark:border-[#1A1A1A] bg-[#F5F7FA] dark:bg-[#111111] text-[14.5px] p-6 focus-visible:ring-[#3AABFF]/50 leading-relaxed"
           />
           <div className="flex gap-2">
             <Button variant="outline" className="rounded-xl h-10 px-4 text-[12px] font-medium border-[#E6EAF0] dark:border-[#1A1A1A] hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
               <Plus className="w-4 h-4 mr-2" /> Add Variations
             </Button>
             <Button 
                onClick={handleImprove}
                disabled={isImproving || !answer}
                className="rounded-xl h-10 px-4 text-[12px] font-medium bg-gradient-to-br from-[#8B5CF6] to-[#0566FFCC] text-white hover:opacity-90 shadow-lg shadow-purple-500/20"
             >
               <Sparkles className={cn("w-4 h-4 mr-2", isImproving && "animate-spin")} /> 
               {isImproving ? "Refining Content..." : "Improve with AI"}
             </Button>
           </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[#E6EAF0] dark:border-[#1A1A1A]">
           <div className="flex items-center gap-3">
             <Switch className="data-[state=checked]:bg-[#3AABFF]" id="activate" />
             <label htmlFor="activate" className="text-[14px] font-medium text-[#000] dark:text-white cursor-pointer select-none">
                Activate immediately
             </label>
           </div>
           
           <div className="flex gap-3">
             <Button 
              onClick={() => editingEntry ? onCancelEdit?.() : (setQuestion(""), setAnswer(""))}
              variant="ghost" 
              className="rounded-xl h-12 px-8 font-medium text-[14px] text-[#878787] hover:bg-[#F5F7FA] dark:hover:bg-[#111111]"
             >
               {editingEntry ? "Cancel Edit" : "Reset Form"}
             </Button>
             <Button 
              onClick={handleSave}
              disabled={!question || !answer}
              className="rounded-xl h-12 px-8 font-medium text-[14px] bg-[#3AABFF] text-white hover:bg-[#3AABFF]/90 shadow-lg shadow-[#3AABFF]/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
             >
               {editingEntry ? "Update & Train AI" : "Save & Train AI"}
             </Button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function EditCircle(props: any) { return <CheckCircle2 className="w-6 h-6 text-white" />; }
import { CheckCircle2 } from "lucide-react";

