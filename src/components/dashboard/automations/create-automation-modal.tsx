import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface CreateAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function CreateAutomationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: CreateAutomationModalProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    triggerType: "",
    actionType: "",
    triggerValue: "",
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        triggerType: initialData.triggerType || "",
        actionType: initialData.action || "",
        triggerValue: initialData.triggerValue || "",
      });
    } else {
      setFormData({
        name: "",
        triggerType: "",
        actionType: "",
        triggerValue: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const selectTriggerItems = [
    "Keyword Match",
    "Tag Added",
    "Time-based",
    "Status Change",
  ];

  const selectActionItems = [
    "AI Response",
    "Create Ticket",
    "Add Tag",
    "Assign to Agent",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-[24px] bg-white dark:bg-[#0A0A0A]">
        <div className="relative p-8">
          <DialogHeader className="mb-8 p-0 space-y-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[24px] font-extrabold text-[#1A1C21] dark:text-white">
                {initialData ? "Edit Automation" : "Create Automation"}
              </DialogTitle>
              <DialogClose asChild>
                <motion.div whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <X className="w-6 h-6 text-[#878787] cursor-pointer hover:text-[#1A1C21] dark:hover:text-white transition-colors" />
                </motion.div>
              </DialogClose>
            </div>
            <p className="text-[15px] font-medium text-[#878787]">
              {initialData ? "Update your workflow automation" : "Set up a new workflow automation"}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <Label className="text-[14px] font-medium text-[#1A1C21] dark:text-white">Automation Name</Label>
              <Input
                placeholder="e.g., Auto-respond to shipping inquiries"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-4 text-[14px] placeholder:text-[#878787] focus:border-[#3AABFF] focus:ring-0 transition-all dark:bg-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <Label className="text-[14px] font-medium text-[#1A1C21] dark:text-white">Trigger Type</Label>
                <Select 
                    value={formData.triggerType}
                    onValueChange={(val) => setFormData({ ...formData, triggerType: val })}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-4 text-[14px] text-[#878787] focus:border-[#3AABFF] transition-all dark:bg-transparent">
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-2xl p-2 min-w-[220px]">
                    <div className="p-4 text-center">
                        <span className="text-[14px] text-[#878787] font-medium">Select trigger</span>
                        <div className="mt-2 h-[1px] bg-[#E6EAF0] dark:bg-[#FFFFFF1A] w-full" />
                    </div>
                    {selectTriggerItems.map((item) => (
                      <SelectItem 
                        key={item} 
                        value={item}
                        className="py-3 px-4 text-[18px] font-extrabold text-[#1A1C21] dark:text-white justify-center focus:bg-[#3AABFF10] focus:text-[#3AABFF] rounded-xl cursor-pointer"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <Label className="text-[14px] font-medium text-[#1A1C21] dark:text-white">Action Type</Label>
                <Select
                    value={formData.actionType}
                    onValueChange={(val) => setFormData({ ...formData, actionType: val })}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-4 text-[14px] text-[#878787] focus:border-[#3AABFF] transition-all dark:bg-transparent">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-2xl p-2 min-w-[220px]">
                     <div className="p-4 text-center">
                        <span className="text-[14px] text-[#878787] font-medium">Select action</span>
                        <div className="mt-2 h-[1px] bg-[#E6EAF0] dark:bg-[#FFFFFF1A] w-full" />
                    </div>
                    {selectActionItems.map((item) => (
                      <SelectItem 
                        key={item} 
                        value={item}
                        className="py-3 px-4 text-[18px] font-extrabold text-[#1A1C21] dark:text-white justify-center focus:bg-[#3AABFF10] focus:text-[#3AABFF] rounded-xl cursor-pointer"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2.5">
              <Label className="text-[14px] font-medium text-[#1A1C21] dark:text-white">Trigger Value</Label>
              <Input
                placeholder="e.g., delivery, shipping, refund"
                value={formData.triggerValue}
                onChange={(e) => setFormData({ ...formData, triggerValue: e.target.value })}
                className="h-12 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-4 text-[14px] placeholder:text-[#878787] focus:border-[#3AABFF] focus:ring-0 transition-all dark:bg-transparent"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full h-12 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] text-[15px] font-medium text-[#1A1C21] dark:text-white hover:bg-[#F5F7FA] transition-all"
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white text-[15px] font-medium shadow-lg shadow-[#3AABFF]/20 transition-all"
                >
                  {initialData ? "Update Automation" : "Create Automation"}
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
