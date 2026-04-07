"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { AutomationCard } from "@/components/dashboard/automations/automation-card";
import { CreateAutomationModal } from "@/components/dashboard/automations/create-automation-modal";

const initialAutomations = [
  {
    id: 1,
    name: "Auto-respond to Shipping Inquiries",
    status: "Active" as const,
    usageCount: 234,
    triggerType: "Keyword Match",
    triggerValue: "delivery, shipping",
    action: "AI Response",
  },
  {
    id: 2,
    name: "Create Ticket for Refund Requests",
    status: "Active" as const,
    usageCount: 89,
    triggerType: "Keyword Match",
    triggerValue: "refund",
    action: "Create Ticket",
  },
  {
    id: 3,
    name: "Tag VIP Customers",
    status: "Inactive" as const,
    usageCount: 45,
    triggerType: "Status Change",
    triggerValue: "Order value > $500",
    action: "Add Tag",
  },
];

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(initialAutomations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<any>(null);

  const toggleAutomation = (id: number) => {
    setAutomations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Active" ? ("Inactive" as const) : ("Active" as const) }
          : item
      )
    );
  };

  const handleOpenCreate = () => {
    setEditingAutomation(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (automation: any) => {
    setEditingAutomation(automation);
    setIsModalOpen(true);
  };

  const handleSubmitAutomation = (data: any) => {
    if (editingAutomation) {
      setAutomations((prev) =>
        prev.map((item) =>
          item.id === editingAutomation.id
            ? { 
                ...item, 
                name: data.name, 
                triggerType: data.triggerType, 
                triggerValue: data.triggerValue, 
                action: data.actionType 
              }
            : item
        )
      );
    } else {
      const newAutomation = {
        id: Date.now(),
        name: data.name,
        status: "Active" as const,
        usageCount: 0,
        triggerType: data.triggerType,
        triggerValue: data.triggerValue,
        action: data.actionType,
      };
      setAutomations([...automations, newAutomation]);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-medium text-[#1A1C21] dark:text-white tracking-tight leading-tight mb-1">Automations</h1>
          <p className="text-sm font-normal text-[#878787]">Automate your customer support workflow</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={handleOpenCreate}
            className="bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white rounded-xl h-11 px-6 shadow-lg shadow-[#3AABFF]/20 font-medium transition-all"
          >
            <Plus className="w-5 h-5 mr-1" />
            Create Automation
          </Button>
        </motion.div>
      </div>

      <div className="space-y-6">
        {automations.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <AutomationCard
              {...automation}
              trigger={`${automation.triggerType}: ${automation.triggerValue}`}
              onToggle={() => toggleAutomation(automation.id)}
              onEdit={() => handleOpenEdit(automation)}
              onDelete={() => setAutomations(prev => prev.filter(a => a.id !== automation.id))}
            />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-12 bg-[#EBF5FF] dark:bg-[#002D5C]/20 border border-[#3AABFF]/20 rounded-[32px] p-12 text-center"
      >
        <div className="max-w-[500px] mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-[#1A1C21] dark:text-white leading-tight">Create Your First Automation</h2>
            <p className="text-sm font-normal text-[#878787]">Automate repetitive tasks and save time with smart workflows</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={handleOpenCreate}
              className="bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white rounded-xl h-12 px-10 shadow-lg shadow-[#3AABFF]/20 font-medium transition-all w-full"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <CreateAutomationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitAutomation}
        initialData={editingAutomation}
      />
    </div>
  );
}
