"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ContactCard } from "@/components/dashboard/contacts/contact-card";
import { AddContactModal } from "@/components/dashboard/contacts/add-contact-modal";
import { FilterContactsModal } from "@/components/dashboard/contacts/filter-contacts-modal";

const initialContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    tags: ["VIP", "Frequent"],
    orderCount: 12,
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1234567891",
    tags: ["New"],
    orderCount: 1,
    lastActivity: "1 day ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1234567892",
    tags: ["VIP"],
    orderCount: 8,
    lastActivity: "3 days ago",
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleAddContact = (data: any) => {
    const newContact = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      tags: data.tags,
      orderCount: 0,
      lastActivity: "Just now",
    };
    setContacts([newContact, ...contacts]);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto pb-20 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-medium text-[#1A1C21] dark:text-white tracking-tight leading-tight mb-1">Contacts</h1>
          <p className="text-sm font-normal text-[#878787]">Manage your customer contacts</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white rounded-xl h-11 px-6 shadow-lg shadow-[#3AABFF]/20 font-medium transition-all transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add Contact
          </Button>
        </motion.div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4 mb-10 bg-white/50 dark:bg-[#0A0A0A]/50 border border-[#E6EAF0] dark:border-[#FFFFFF1A] rounded-[20px] p-2 pr-4 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#878787]" />
          <Input 
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 bg-transparent border-none pl-14 text-[16px] placeholder:text-[#878787] focus-visible:ring-0"
          />
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            variant="outline"
            onClick={() => setIsFilterModalOpen(true)}
            className="h-11 rounded-xl border-[#E6EAF0] dark:border-[#FFFFFF1A] px-6 text-[#1A1C21] dark:text-white font-medium flex gap-2 hover:bg-white transition-all shadow-sm"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </motion.div>
      </div>

      {/* Contacts List */}
      <div className="space-y-6">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <ContactCard
              {...contact}
              onView={() => console.log("View", contact.id)}
              onMessage={() => console.log("Message", contact.id)}
            />
          </motion.div>
        ))}
        {filteredContacts.length === 0 && (
          <div className="text-center py-20 bg-white/30 dark:bg-[#0A0A0A]/30 rounded-[32px] border border-dashed border-[#E6EAF0] dark:border-[#FFFFFF1A]">
            <p className="text-[#878787] font-normal text-sm">No contacts found matching your search.</p>
          </div>
        )}
      </div>

      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddContact}
      />

      <FilterContactsModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(filters) => console.log("Filters Applied:", filters)}
      />
    </div>
  );
}
