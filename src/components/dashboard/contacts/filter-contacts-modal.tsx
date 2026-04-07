import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface FilterContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const tagFilters = [
  "VIP", "New Customer", "Repeat Buyer", "High Value", "Support Issue", "Product Question", "Shipping Query"
];

const statusFilters = [
  "Active", "Inactive", "Pending", "Blocked"
];

const conversationFilters = [
  "No conversations", "1-5 conversations", "6-20 conversations", "20+ conversations"
];

export function FilterContactsModal({
  isOpen,
  onClose,
  onApply,
}: FilterContactsModalProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedConvo, setSelectedConvo] = useState<string[]>([]);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleClear = () => {
    setSelectedTags([]);
    setSelectedStatus([]);
    setSelectedConvo([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[450px] p-0 overflow-hidden border-none shadow-2xl rounded-[24px] bg-white dark:bg-[#0A0A0A]">
        <div className="relative p-8">
          <DialogHeader className="mb-6 p-0 space-y-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[24px] font-extrabold text-[#1A1C21] dark:text-white">Filter Contacts</DialogTitle>
              <DialogClose asChild>
                <motion.div whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <X className="w-6 h-6 text-[#878787] cursor-pointer hover:text-[#1A1C21] dark:hover:text-white transition-colors" />
                </motion.div>
              </DialogClose>
            </div>
            <p className="text-[15px] font-medium text-[#878787]">Filter contacts by tags and status</p>
          </DialogHeader>

          <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-4">
              <h4 className="text-[14px] font-medium text-[#878787] uppercase tracking-wider">Filter by Tags</h4>
              <div className="space-y-3">
                {tagFilters.map((tag) => (
                  <div key={tag} className="flex items-center gap-3">
                    <Checkbox 
                      id={`tag-${tag}`} 
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleFilter(selectedTags, setSelectedTags, tag)}
                      className="border-[#E6EAF0] dark:border-[#FFFFFF1A] data-[state=checked]:bg-[#3AABFF] rounded-[4px]"
                    />
                    <Label 
                      htmlFor={`tag-${tag}`}
                      className="px-3 py-1 bg-[#3AABFF0D] text-[#3AABFF] rounded-full text-[12px] font-medium cursor-pointer"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-[#E6EAF0] dark:bg-[#FFFFFF1A] w-full" />

            <div className="space-y-4">
              <h4 className="text-[14px] font-medium text-[#878787] uppercase tracking-wider">Filter by Status</h4>
              <div className="space-y-3">
                {statusFilters.map((status) => (
                  <div key={status} className="flex items-center gap-3">
                    <Checkbox 
                      id={`status-${status}`} 
                      checked={selectedStatus.includes(status)}
                      onCheckedChange={() => toggleFilter(selectedStatus, setSelectedStatus, status)}
                      className="border-[#E6EAF0] dark:border-[#FFFFFF1A] data-[state=checked]:bg-[#3AABFF] rounded-[4px]"
                    />
                    <Label 
                      htmlFor={`status-${status}`}
                      className="text-[14px] font-medium text-[#1A1C21] dark:text-white cursor-pointer"
                    >
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-[#E6EAF0] dark:bg-[#FFFFFF1A] w-full" />

            <div className="space-y-4">
              <h4 className="text-[14px] font-medium text-[#878787] uppercase tracking-wider">Conversation Count</h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {conversationFilters.map((convo) => (
                  <div key={convo} className="flex items-center gap-3">
                    <Checkbox 
                      id={`convo-${convo}`} 
                      checked={selectedConvo.includes(convo)}
                      onCheckedChange={() => toggleFilter(selectedConvo, setSelectedConvo, convo)}
                      className="border-[#E6EAF0] dark:border-[#FFFFFF1A] data-[state=checked]:bg-[#3AABFF] rounded-[4px]"
                    />
                    <Label 
                      htmlFor={`convo-${convo}`}
                      className="text-[13px] font-medium text-[#1A1C21] dark:text-white cursor-pointer"
                    >
                      {convo}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-8 mt-4">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="w-full h-12 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] text-[15px] font-medium text-[#1A1C21] dark:text-white hover:bg-[#F5F7FA] transition-all"
              >
                Clear All
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                onClick={() => {
                    onApply({ tags: selectedTags, status: selectedStatus, convo: selectedConvo });
                    onClose();
                }}
                className="w-full h-12 rounded-xl bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white text-[15px] font-medium shadow-lg shadow-[#3AABFF]/20 transition-all"
              >
                Apply Filters
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
