import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AutomationCardProps {
  name: string;
  status: "Active" | "Inactive";
  usageCount: number;
  trigger: string;
  action: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggle?: (checked: boolean) => void;
}

export function AutomationCard({
  name,
  status,
  usageCount,
  trigger,
  action,
  onEdit,
  onDelete,
  onToggle,
}: AutomationCardProps) {
  const isActive = status === "Active";

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-[#0A0A0A] border border-[#E6EAF0] dark:border-[#FFFFFF1A] rounded-[24px] p-8 shadow-soft transition-all duration-300 hover:shadow-primary mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-[18px] font-medium text-[#1A1C21] dark:text-white leading-tight">{name}</h3>
          <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${
            isActive 
              ? "bg-[#00C950]/10 text-[#00C950]" 
              : "bg-[#878787]/10 text-[#878787]"
          }`}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <Switch 
          checked={isActive} 
          onCheckedChange={onToggle}
          className="scale-110 data-[state=checked]:bg-[#3AABFF]"
        />
      </div>
      
      <p className="text-[14px] text-[#878787] font-medium mb-8">Used {usageCount} times</p>

      <div className="flex items-center gap-6 mb-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex-1 bg-[#F5F7FA] dark:bg-[#111111] rounded-[16px] p-5 min-h-[90px] flex flex-col justify-center"
        >
          <span className="text-[12px] font-medium text-[#878787] uppercase mb-2 tracking-wider">Trigger</span>
          <p className="text-[15px] font-medium text-[#1A1C21] dark:text-white leading-snug">{trigger}</p>
        </motion.div>
        
        <ArrowRight className="w-6 h-6 text-[#3AABFF] shrink-0" />
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex-1 bg-[#F5F7FA] dark:bg-[#111111] rounded-[16px] p-5 min-h-[90px] flex flex-col justify-center"
        >
          <span className="text-[12px] font-medium text-[#878787] uppercase mb-2 tracking-wider">Action</span>
          <p className="text-[15px] font-medium text-[#1A1C21] dark:text-white leading-snug">{action}</p>
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="outline" 
            onClick={onEdit}
            className="rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] text-[#1A1C21] dark:text-white h-11 px-6 text-[14px] font-medium hover:bg-[#F5F7FA] dark:hover:bg-[#111111] transition-colors"
          >
            Edit
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="outline" 
            onClick={onDelete}
            className="rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] text-[#FF4D4F] h-11 px-6 text-[14px] font-medium hover:bg-[#FF4D4F0D] hover:border-[#FF4D4F33] transition-colors"
          >
            Delete
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
