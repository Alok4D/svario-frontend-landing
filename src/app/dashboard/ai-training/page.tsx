"use client";

import React from "react";
import { TrainingStats } from "@/components/dashboard/ai-training/TrainingStats";
import { TrainingStatusSidebar } from "@/components/dashboard/ai-training/TrainingStatusSidebar";
import { KnowledgeEntryForm } from "@/components/dashboard/ai-training/KnowledgeEntryForm";
import { KnowledgeBaseList } from "@/components/dashboard/ai-training/KnowledgeBaseList";
import { motion } from "framer-motion";
import { FileText, Link, Database, BrainCircuit, Plus, Sparkles } from "lucide-react";

const ACTION_CARDS = [
  { title: "Add FAQ", desc: "Create question & answer pairs", icon: FileText, color: "#3AABFF" },
  { title: "Upload Document", desc: "Import PDF or text files", icon: Database, color: "#8B5CF6" },
  { title: "Add Website URL", desc: "Train from your website", icon: Link, color: "#00C950" },
];

const INITIAL_ENTRIES = [
  { id: 1, question: "What is the delivery time?", answer: "Inside Dhaka: 2-3 days. Outside Dhaka: 4-5 days. We offer express delivery as well!", category: "Shipping", accuracy: 92, andUsed: 128, updated: "2 days ago", active: true },
  { id: 2, question: "How do I return a product?", answer: "You can return within 7 days with original packaging. Contact our support team to initiate the return process.", category: "Returns", accuracy: 88, andUsed: 65, updated: "5 days ago", active: true },
  { id: 3, question: "Do you ship internationally?", answer: "Currently we only ship within Bangladesh. International shipping will be available soon!", category: "Shipping", accuracy: 95, andUsed: 67, updated: "1 week ago", active: true },
  { id: 4, question: "What payment methods do you accept?", answer: "We accept bKash, Nagad, Rocket, and Cash on Delivery for your convenience.", category: "Payment", accuracy: 99, andUsed: 145, updated: "3 days ago", active: true },
];

export default function AiTrainingPage() {
  const [entries, setEntries] = React.useState(INITIAL_ENTRIES);
  const [editingEntry, setEditingEntry] = React.useState<any>(null);

  const handleAddEntry = (entryData: any) => {
    if (editingEntry) {
      setEntries(prev => prev.map(e => e.id === editingEntry.id ? { ...e, ...entryData, updated: "Just now" } : e));
      setEditingEntry(null);
    } else {
      setEntries(prev => [{ ...entryData, id: Date.now(), accuracy: 100, andUsed: 0, updated: "Just now", active: true }, ...prev]);
    }
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const handleToggleEntry = (id: number) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
  };

  const handleStartEdit = (entry: any) => {
    setEditingEntry(entry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-[#1A1C21] dark:text-white tracking-tight leading-tight mb-1">
            AI Training & Knowledge Base
          </h1>
          <p className="text-sm font-normal text-[#878787]">
            Teach your AI assistant how to respond to customer inquiries
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#8B5CF6]/5 rounded-full border border-[#8B5CF6]/10 shrink-0 self-start md:self-auto group">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:animate-spin transition-all" />
          <span className="text-[11px] font-medium text-[#8B5CF6] uppercase tracking-wider">
            AI Learning Active
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <TrainingStats />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-10">
          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACTION_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#0A0A0A] border rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:border-[#3AABFF]/50 transition-all shadow-soft group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F5F7FA] dark:bg-[#111111] flex items-center justify-center text-[#878787] group-hover:text-white group-hover:bg-[#3AABFF] transition-all shrink-0">
                  <card.icon className="w-5.5 h-5.5" />
                </div>
                <div>
                   <h4 className="font-medium text-[15px] text-[#1A1C21] dark:text-white leading-tight">{card.title}</h4>
                   <p className="text-[11px] text-[#878787] font-normal tracking-tight mt-0.5">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Knowledge Form */}
          <KnowledgeEntryForm 
            onAdd={handleAddEntry} 
            editingEntry={editingEntry}
            onCancelEdit={() => setEditingEntry(null)}
          />

          {/* List Section */}
          <KnowledgeBaseList 
            entries={entries} 
            onDelete={handleDeleteEntry} 
            onToggle={handleToggleEntry}
            onEdit={handleStartEdit}
          />

        </div>

        <div className="lg:col-span-4 h-full">
           <TrainingStatusSidebar />
        </div>
      </div>
    </div>
  );
}

