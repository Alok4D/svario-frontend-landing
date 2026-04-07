"use client";

import React from "react";
import { Search, Filter, Edit2, Trash2, MoreVertical, MessageSquare, TrendingUp, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

interface KnowledgeBaseListProps {
  entries: any[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (entry: any) => void;
}

export function KnowledgeBaseList({ entries, onDelete, onToggle, onEdit }: KnowledgeBaseListProps) {
  const [isDeleting, setIsDeleting] = React.useState<number | null>(null);


  const confirmDelete = () => {
    if (isDeleting !== null) {
      onDelete(isDeleting);
      setIsDeleting(null);
    }
  };

  return (
    <Card className="border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[2.5rem] p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-[#3AABFF]/10 rounded-xl flex items-center justify-center text-[#3AABFF]">
             <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-xl leading-tight text-[#000] dark:text-white">Knowledge Base Entries</h3>
            <p className="text-[13px] text-[#878787] font-medium tracking-tight">4 active entries</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#878787] group-focus-within:text-[#3AABFF] transition-colors" />
            <Input 
              placeholder="Search entries..." 
              className="pl-11 h-12 bg-[#F5F7FA] dark:bg-[#111111] border-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#3AABFF]/30 text-[14px]"
            />
          </div>
          <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-[#E6EAF0] dark:border-[#1A1A1A] hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-[#F5F7FA] dark:bg-[#111111] border border-[#E6EAF0] dark:border-[#1A1A1A] hover:border-[#3AABFF20] hover:bg-white dark:hover:bg-black transition-all duration-300 rounded-[1.5rem] p-6 group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-11 h-11 rounded-xl bg-[#3AABFF] flex items-center justify-center text-white shadow-xl shadow-[#3AABFF]/10 shrink-0">
                  <MessageSquare className="w-5.5 h-5.5" />
                </div>
                
                <div className="flex-1 min-w-0 space-y-4">
                   <div>
                     <h4 className="font-medium text-[15.5px] text-[#000] dark:text-white truncate group-hover:text-[#3AABFF] transition-colors">{entry.question}</h4>
                     <p className="text-[13.5px] text-[#878787] font-medium leading-relaxed mt-1 line-clamp-1">{entry.answer}</p>
                   </div>
                   
                   <div className="flex flex-wrap items-center gap-6">
                      <div className="px-3 py-1 rounded-lg bg-[#3AABFF]/10 text-[#3AABFF] text-[11px] font-medium uppercase tracking-wider">{entry.category}</div>
                      <div className="flex items-center gap-1.5 text-[12px] text-[#878787] font-medium">
                        <TrendingUp className="w-3.5 h-3.5" /> Accuracy: <span className="text-[#00C950] font-medium">{entry.accuracy}%</span>
                      </div>
                      <div className="text-[12px] text-[#878787] font-medium">Used <span className="text-[#000] dark:text-white font-medium">{entry.andUsed}x</span></div>
                      <div className="text-[12px] text-[#878787] font-medium uppercase tracking-tight">Updated {entry.updated}</div>
                   </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#E6EAF0] dark:border-[#1A1A1A] pt-4 md:pt-0 md:pl-6">
                   <Switch 
                     checked={entry.active} 
                     onCheckedChange={() => onToggle(entry.id)}
                     className="data-[state=checked]:bg-[#3AABFF]" 
                   />
                   <div className="flex items-center gap-1.5">
                     <Button 
                        onClick={() => onEdit(entry)}
                        variant="ghost" 
                        size="icon" 
                        className="w-9 h-9 text-[#878787] hover:text-[#3AABFF] hover:bg-[#3AABFF]/10 rounded-xl"
                     >
                        <Edit2 className="w-4 h-4" />
                     </Button>

                     <Button 
                        onClick={() => setIsDeleting(entry.id)}
                        variant="ghost" 
                        size="icon" 
                        className="w-9 h-9 text-[#878787] hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                     >
                        <Trash2 className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="w-9 h-9 text-[#878787] rounded-xl hover:bg-[#F5F7FA] dark:hover:bg-[#111111]">
                        <MoreVertical className="w-4 h-4" />
                     </Button>
                   </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isDeleting !== null} onOpenChange={(open) => !open && setIsDeleting(null)}>
        <DialogContent className="max-w-[400px] rounded-[2rem] p-8 border-none bg-white dark:bg-[#0A0A0A] shadow-2xl">
           <DialogHeader>
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-4">
                 <Trash2 className="w-7 h-7" />
              </div>
              <DialogTitle className="text-xl font-medium text-[#000] dark:text-white">Delete Entry?</DialogTitle>
              <DialogDescription className="text-[14px] text-[#878787] font-medium leading-relaxed pt-2">
                 Are you sure you want to remove this knowledge entry? This action cannot be undone and will affect AI responses.
              </DialogDescription>
           </DialogHeader>
           <DialogFooter className="pt-6 gap-3">
              <Button variant="ghost" onClick={() => setIsDeleting(null)} className="flex-1 rounded-xl h-12 font-medium text-[#878787] hover:bg-[#F5F7FA]">
                 Cancel
              </Button>
              <Button onClick={confirmDelete} className="flex-1 rounded-xl h-12 bg-red-500 text-white hover:bg-red-600 font-medium shadow-lg shadow-red-500/20">
                 Delete Entry
              </Button>
           </DialogFooter>
        </DialogContent>
      </Dialog>

    </Card>
  );
}
