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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: any) => void;
}

export function InviteMemberModal({
  isOpen,
  onClose,
  onInvite,
}: InviteMemberModalProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "Support",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInvite(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-[32px] bg-white dark:bg-[#0A0A0A]">
        <div className="relative p-10">
          <DialogHeader className="mb-10 p-0 space-y-3">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[28px] font-extrabold text-[#1A1C21] dark:text-white leading-tight tracking-tight">Invite Team Member</DialogTitle>
              <DialogClose asChild>
                <motion.div whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <X className="w-7 h-7 text-[#878787] cursor-pointer hover:text-[#1A1C21] dark:hover:text-white transition-colors" />
                </motion.div>
              </DialogClose>
            </div>
            <p className="text-[16px] font-medium text-[#878787]">Send an invitation to join your team</p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label className="text-[15px] font-medium text-[#1A1C21] dark:text-white ml-1">Name</Label>
              <Input
                placeholder="Team member name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 rounded-2xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-5 text-[15px] placeholder:text-[#C4C4C4] focus:border-[#3AABFF] focus:ring-0 transition-all dark:bg-transparent"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[15px] font-medium text-[#1A1C21] dark:text-white ml-1">Email</Label>
              <Input
                placeholder="member@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-14 rounded-2xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-5 text-[15px] placeholder:text-[#C4C4C4] focus:border-[#3AABFF] focus:ring-0 transition-all dark:bg-transparent"
              />
            </div>

            <div className="space-y-3 pb-4">
              <Label className="text-[15px] font-medium text-[#1A1C21] dark:text-white ml-1">Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(val) => setFormData({ ...formData, role: val })}
              >
                <SelectTrigger className="h-14 rounded-2xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-5 text-[15px] focus:ring-0 transition-all shadow-none">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-[#E6EAF0] dark:border-[#FFFFFF1A] shadow-xl p-2 bg-white dark:bg-[#0A0A0A]">
                  <SelectItem value="Admin" className="rounded-xl h-11 font-medium cursor-pointer">Admin</SelectItem>
                  <SelectItem value="Support" className="rounded-xl h-11 font-medium cursor-pointer">Support</SelectItem>
                  <SelectItem value="Editor" className="rounded-xl h-11 font-medium cursor-pointer">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-5 pt-4">
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full h-14 rounded-2xl border-[#E6EAF0] dark:border-[#FFFFFF1A] text-[16px] font-medium text-[#1A1C21] dark:text-white hover:bg-[#F5F7FA] transition-all"
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full h-14 rounded-2xl bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white text-[16px] font-medium shadow-lg shadow-[#3AABFF]/20 transition-all"
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
