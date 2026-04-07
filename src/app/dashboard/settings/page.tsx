"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Smartphone, 
  Instagram, 
  Facebook, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink,
  Smartphone as Phone
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { InviteMemberModal } from "@/components/dashboard/settings/invite-member-modal";

const channels = [
  { id: 1, name: "WhatsApp", connected: true, icon: Phone },
  { id: 2, name: "Instagram", connected: true, icon: Instagram },
  { id: 3, name: "Facebook", connected: false, icon: Facebook },
  { id: 4, name: "Email", connected: true, icon: Mail },
];

const teamMembers = [
  { id: 1, name: "Fatema Ahmed", email: "fatema@store.com", role: "Owner" },
  { id: 2, name: "John Smith", email: "john@store.com", role: "Admin" },
  { id: 3, name: "Sarah Lee", email: "sarah@store.com", role: "Support" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-20 px-4">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-medium text-[#1A1C21] dark:text-white tracking-tight leading-tight mb-1">Settings</h1>
        <p className="text-sm font-normal text-[#878787]">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="general" onValueChange={setActiveTab} className="space-y-10">
        <TabsList className="bg-transparent h-auto p-0 flex gap-4 overflow-x-auto pb-2 no-scrollbar border-none">
          {["general", "channels", "team", "api"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={`rounded-full px-6 h-10 text-sm font-medium capitalize transition-all duration-300 border-none 
                ${activeTab === tab 
                  ? "bg-[#1A1C21] text-white dark:bg-white dark:text-[#1A1C21] shadow-lg shadow-black/10" 
                  : "bg-white dark:bg-[#0A0A0A] text-[#878787] hover:text-[#1A1C21] dark:hover:text-white border-none"
                }`}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border-none outline-none">
          <Card className="p-10 border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[32px] space-y-10">
            <h2 className="text-lg font-medium text-[#1A1C21] dark:text-white">Store Information</h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[13px] font-medium text-[#878787] ml-1">Store Name</label>
                <Input defaultValue="Fatema Store" className="h-14 rounded-2xl bg-[#F5F7FA] dark:bg-[#111111] border-none px-6 text-[14px] font-medium focus-visible:ring-1 focus-visible:ring-[#3AABFF]/50" />
              </div>
              <div className="space-y-3">
                <label className="text-[13px] font-medium text-[#878787] ml-1">Email</label>
                <Input defaultValue="info@fatemastore.com" className="h-14 rounded-2xl bg-[#F5F7FA] dark:bg-[#111111] border-none px-6 text-[14px] font-medium focus-visible:ring-1 focus-visible:ring-[#3AABFF]/50" />
              </div>
              <div className="space-y-3">
                <label className="text-[13px] font-medium text-[#878787] ml-1">Location</label>
                <Input defaultValue="Iceland, Reykjavik" className="h-14 rounded-2xl bg-[#F5F7FA] dark:bg-[#111111] border-none px-6 text-[14px] font-medium focus-visible:ring-1 focus-visible:ring-[#3AABFF]/50" />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button className="w-full bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white rounded-2xl h-14 text-[15px] font-medium shadow-lg shadow-[#3AABFF]/20">
                Save Changes
              </Button>
            </motion.div>
          </Card>

          <Card className="p-10 border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[32px] space-y-10">
            <h2 className="text-lg font-medium text-[#1A1C21] dark:text-white">Preferences</h2>
            <div className="space-y-8">
              {[
                { title: "Email Notifications", desc: "Receive email updates", default: true },
                { title: "AI Auto-Reply", desc: "Let AI respond automatically", default: true },
                { title: "Sound Notifications", desc: "Play sound for new messages", default: false }
              ].map((pref) => (
                <div key={pref.title} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-[#1A1C21] dark:text-white">{pref.title}</h4>
                    <p className="text-[13px] font-normal text-[#878787]">{pref.desc}</p>
                  </div>
                  <Switch defaultChecked={pref.default} className="data-[state=checked]:bg-[#3AABFF]" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Channels Tab */}
        <TabsContent value="channels" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border-none outline-none">
          <Card className="p-10 border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[32px]">
            <h2 className="text-[18px] font-medium text-[#1A1C21] dark:text-white mb-10">Connected Channels</h2>
            <div className="grid grid-cols-1 gap-6">
              {channels.map((channel, i) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-6 bg-[#F5F7FA] dark:bg-[#111111] rounded-[24px]"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white dark:bg-[#1A1C21] rounded-2xl flex items-center justify-center text-[#1A1C21] dark:text-white shadow-sm">
                      <channel.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[15px] font-medium text-[#1A1C21] dark:text-white">{channel.name}</h4>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${channel.connected ? "bg-[#00C950]" : "bg-[#878787]"}`} />
                        <span className={`text-[12px] font-medium uppercase tracking-wider ${channel.connected ? "text-[#00C950]" : "text-[#878787]"}`}>
                          {channel.connected ? "Connected" : "Not Connected"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className={`h-11 rounded-xl px-8 text-sm font-medium shadow-sm ${channel.connected ? "bg-white text-[#1A1C21] border-[#E6EAF0]" : "bg-[#3AABFF] text-white border-none hover:bg-[#3AABFF]/90"}`}>
                    {channel.connected ? "Manage" : "Connect"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border-none outline-none">
          <Card className="p-10 border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[32px]">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-lg font-medium text-[#1A1C21] dark:text-white font-[Outfit]">Team Members</h2>
              <Button 
                onClick={() => setIsInviteModalOpen(true)}
                className="bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white rounded-xl h-12 px-6 shadow-lg shadow-[#3AABFF]/20 font-medium"
              >
                Invite Member
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-6 bg-[#F5F7FA] dark:bg-[#111111] rounded-[24px]"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-[#3AABFF] rounded-full flex items-center justify-center text-white font-medium text-[18px]">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[15px] font-medium text-[#1A1C21] dark:text-white leading-none">{member.name}</h4>
                      <p className="text-[13px] font-normal text-[#878787]">{member.email}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[12px] font-medium ${member.role === 'Owner' ? 'bg-[#3AABFF1A] text-[#3AABFF]' : 'bg-[#E6EAF0] text-[#1A1C21]'}`}>
                    {member.role}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border-none outline-none">
          <Card className="p-10 border-none bg-white dark:bg-[#0A0A0A] shadow-soft rounded-[32px] space-y-10">
            <h2 className="text-lg font-medium text-[#1A1C21] dark:text-white">API Keys</h2>
            <div className="space-y-10">
              {[
                { label: "Production API Key", value: "sk_live_vxxxxxxxxxxxx" },
                { label: "Test API Key", value: "sk_test_vxxxxxxxxxxxx" },
              ].map((key) => (
                <div key={key.label} className="space-y-3">
                  <label className="text-[13px] font-medium text-[#878787] ml-1">{key.label}</label>
                  <div className="flex gap-4">
                    <Input 
                      readOnly 
                      value={key.value} 
                      className="h-14 rounded-2xl bg-[#F5F7FA] dark:bg-[#111111] border-none px-6 text-[14px] font-medium flex-1 text-[#C4C4C4]" 
                    />
                    <Button 
                      variant="outline"
                      onClick={() => copyToClipboard(key.value, key.label)}
                      className="h-14 px-8 rounded-2xl border-[#E6EAF0] dark:border-[#FFFFFF1A] font-medium flex gap-2 transition-all hover:bg-[#3AABFF] hover:text-white"
                    >
                      {copiedKey === key.label ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-[#FF4D4F] text-[#FF4D4F] hover:bg-[#FF4D4F] hover:text-white text-[15px] font-medium transition-all mt-6">
                Generate New Key
              </Button>
            </motion.div>
          </Card>
        </TabsContent>
      </Tabs>

      <InviteMemberModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={(data) => console.log("Inviting:", data)}
      />
    </div>
  );
}
