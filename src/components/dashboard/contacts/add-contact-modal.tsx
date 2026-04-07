import React, { useState } from "react";
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
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddContactModal({
  isOpen,
  onClose,
  onSubmit,
}: AddContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-[24px] bg-white dark:bg-[#0A0A0A]">
        <div className="relative p-8">
          <DialogHeader className="mb-8 p-0 space-y-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[24px] font-extrabold text-[#1A1C21] dark:text-white">Add Contact</DialogTitle>
              <DialogClose asChild>
                <motion.div whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <X className="w-6 h-6 text-[#878787] cursor-pointer hover:text-[#1A1C21] dark:hover:text-white transition-colors" />
                </motion.div>
              </DialogClose>
            </div>
            <p className="text-[15px] font-medium text-[#878787]">Add a new customer to your contacts</p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <Label className="text-[14px] font-medium text-[#1A1C21] dark:text-white">Name</Label>
              <Input
                placeholder="Customer name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-4 text-[14px] placeholder:text-[#878787] focus:border-[#3AABFF] focus:ring-0 transition-all dark:bg-transparent"
              />
            </div>

            <div className="space-y-2.5">
              <Label className="text-[14px] font-medium text-[#1A1C21] dark:text-white">Email</Label>
              <Input
                placeholder="customer@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-4 text-[14px] placeholder:text-[#878787] focus:border-[#3AABFF] focus:ring-0 transition-all dark:bg-transparent"
              />
            </div>

            <div className="space-y-2.5">
              <Label className="text-[14px] font-medium text-[#1A1C21] dark:text-white">Phone</Label>
              <Input
                placeholder="+1234567890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-4 text-[14px] placeholder:text-[#878787] focus:border-[#3AABFF] focus:ring-0 transition-all dark:bg-transparent"
              />
            </div>

            <div className="space-y-2.5">
              <Label className="text-[14px] font-medium text-[#1A1C21] dark:text-white">Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  className="h-12 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-4 text-[14px] placeholder:text-[#878787] focus:border-[#3AABFF] focus:ring-0 transition-all dark:bg-transparent flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddTag}
                  variant="outline"
                  className="h-12 rounded-xl px-6 border-[#E6EAF0] dark:border-[#FFFFFF1A] text-[#1A1C21] dark:text-white font-medium text-[14px] hover:bg-[#F5F7FA] transition-all"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <AnimatePresence>
                  {formData.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="px-3 py-1 bg-[#3AABFF1A] text-[#3AABFF] rounded-full text-[12px] font-medium flex items-center gap-1.5"
                    >
                      {tag}
                      <X 
                        className="w-3.5 h-3.5 cursor-pointer hover:text-[#3AABFF]/70" 
                        onClick={() => removeTag(tag)}
                      />
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
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
                  Add Contact
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
