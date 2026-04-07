"use client";

import React from "react";
import { Search, Plus, Bell, Menu, LayoutGrid } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

export function Header({
  onMenuClick,
  sidebarOpen,
  isCollapsed,
  onCollapseToggle,
}: HeaderProps) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="h-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-[#E6EAF0] dark:border-[#1A1A1A] flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Section: Mobile Menu & Search */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0 mr-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-[#F5F7FA] dark:hover:bg-[#111111] rounded-xl transition-colors active:scale-90"
        >
          <Menu className="w-5.5 h-5.5 text-[#000] dark:text-white" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onCollapseToggle}
          className="hidden lg:flex p-2 hover:bg-[#F5F7FA] dark:hover:bg-[#111111] rounded-xl transition-all active:scale-90 group"
        >
          <LayoutGrid className={cn(
            "w-5.5 h-5.5 transition-all duration-300",
            isCollapsed ? "text-[#3AABFF] rotate-90" : "text-[#878787] group-hover:text-[#3AABFF]"
          )} />
        </button>

        <div className="hidden md:flex items-center relative max-w-md w-full group ml-2 min-w-0">
          <Search className="absolute left-4 w-4.5 h-4.5 text-[#878787] group-focus-within:text-[#3AABFF] transition-colors" />
          <Input 
            type="text" 
            placeholder="Search conversations..." 
            className="pl-11 pr-4 h-11 bg-[#F5F7FA] dark:bg-[#111111] border-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#3AABFF]/50 text-[14px] placeholder:text-[#878787] w-full"
          />
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <Button 
          className="hidden sm:flex items-center gap-2 bg-[#3AABFF] hover:bg-[#3AABFF]/90 text-white rounded-xl h-11 px-5 shadow-lg shadow-[#3AABFF]/20 font-medium text-[14px] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>New</span>
        </Button>

        <button className="relative p-3 hover:bg-[#F5F7FA] dark:hover:bg-[#111111] rounded-xl transition-colors group">
          <Bell className="w-6 h-6 text-[#000] dark:text-white group-hover:text-[#3AABFF] transition-colors" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#3AABFF] border-2 border-white dark:border-black rounded-full" />
        </button>

        <div className="h-8 w-[1px] bg-[#E6EAF0] dark:bg-[#1A1A1A] mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-4 pl-2 pr-1 py-1 rounded-2xl hover:bg-[#F5F7FA] dark:hover:bg-[#111111] transition-all group">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="font-medium text-[14.5px] text-[#000] dark:text-white leading-tight">
                   {user?.firstName ? `${user.firstName} ${user.lastName}` : "Fatema Store"}
                </span>
                <span className="text-[11px] text-[#878787] font-medium tracking-tight uppercase">
                   {user?.role || "Store Manager"}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#3AABFF] flex items-center justify-center text-white font-medium text-[14px] shadow-lg shadow-[#3AABFF]/20 transition-transform group-hover:scale-105">
                {user?.firstName?.charAt(0) || "F"}{user?.lastName?.charAt(0) || "S"}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 border-[#E6EAF0] dark:border-[#1A1A1A]">
            <DropdownMenuLabel className="font-medium text-[13px] text-[#878787] px-3 py-2">ACCOUNT</DropdownMenuLabel>
            <DropdownMenuItem className="rounded-xl px-3 py-2.5 focus:bg-[#3AABFF]/10 focus:text-[#3AABFF] cursor-pointer font-medium">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl px-3 py-2.5 focus:bg-[#3AABFF]/10 focus:text-[#3AABFF] cursor-pointer font-medium">
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2 bg-[#E6EAF0] dark:bg-[#1A1A1A]" />
            <DropdownMenuItem className="rounded-xl px-3 py-2.5 focus:bg-red-50 focus:text-red-500 text-red-500 cursor-pointer font-medium">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

