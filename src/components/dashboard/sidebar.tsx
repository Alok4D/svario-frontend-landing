"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Inbox, 
  BrainCircuit, 
  Zap, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/features/user/authSlice";
import { WEBSITE_DETAILS } from "@/lib/constants";
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
}

const SIDEBAR_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", roles: ["STAFF", "CUSTOMER"] },
  { id: "inbox", label: "Inbox", icon: Inbox, href: "/dashboard/inbox", roles: ["STAFF", "CUSTOMER"], badge: 3 },
  { id: "ai-training", label: "AI Training", icon: BrainCircuit, href: "/dashboard/ai-training", roles: ["STAFF"] },
  { id: "automations", label: "Automations", icon: Zap, href: "/dashboard/automations", roles: ["STAFF"] },
  { id: "contacts", label: "Contacts", icon: Users, href: "/dashboard/contacts", roles: ["STAFF", "CUSTOMER"] },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics", roles: ["STAFF"] },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings", roles: ["STAFF", "CUSTOMER"] },
];

export function Sidebar({ isOpen, isCollapsed, onClose }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  
  const [isDesktop, setIsDesktop] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleItems = SIDEBAR_NAV_ITEMS.filter((item) => {
    if (!user) return true;
    return item.roles.includes(user.role as any);
  });

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
    toast.success("Logout successful!");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 88 : 280,
          x: isDesktop ? 0 : (isOpen ? 0 : -320)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 h-screen bg-white dark:bg-black border-r border-[#E6EAF0] dark:border-[#1A1A1A] z-50 overflow-hidden flex flex-col max-w-[85vw]",
          "lg:relative lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className={cn("p-6", isCollapsed && "flex justify-center")}>
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt={WEBSITE_DETAILS.SITE_ONLY_NAME}
              width={isCollapsed ? 40 : 160} 
              height={isCollapsed ? 40 : 160} 
              className="object-contain w-full h-auto"
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 relative group mb-1",
                    isActive 
                      ? "bg-[#3AABFF] text-white shadow-lg shadow-[#3AABFF]/30" 
                      : "text-[#878787] hover:bg-[#F5F7FA] dark:hover:bg-[#111111] hover:text-[#000] dark:hover:text-white"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 transition-transform duration-300",
                    isCollapsed ? "mx-auto scale-110" : ""
                  )}>
                    <Icon className={cn("w-5.5 h-5.5", isActive ? "text-white" : "group-hover:text-[#3AABFF] transition-colors")} />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-1 items-center justify-between overflow-hidden"
                      >
                        <span className="font-medium text-[14px] whitespace-nowrap">{item.label}</span>
                        {item.badge && (
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-medium",
                            isActive ? "bg-white text-[#3AABFF]" : "bg-[#3AABFF] text-white"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {isCollapsed && isActive && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute right-0 w-1 h-5 bg-[#3AABFF] rounded-l-full shadow-[0_0_10px_#3AABFF]"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="px-4 py-4 mt-auto border-t border-[#E6EAF0] dark:border-[#1A1A1A]">
          <button
            onClick={handleLogout}
            className={cn(
               "flex items-center gap-4 px-4 py-2.5 rounded-xl w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 active:scale-95 group overflow-hidden",
               isCollapsed && "justify-center px-0"
            )}
          >
            <LogOut className={cn("w-5 h-5 shrink-0 transition-transform group-hover:rotate-12", isCollapsed && "scale-110")} />
            {!isCollapsed && <span className="font-medium text-[14px]">Logout</span>}
          </button>
        </div>

        {/* User Card */}
        <div className="p-4">
          <div className={cn(
            "rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 bg-[#F5F7FA] dark:bg-[#111111] border border-transparent hover:border-[#3AABFF20]",
            isCollapsed && "p-2 justify-center"
          )}>
            <div className="w-9 h-9 rounded-xl bg-[#3AABFF] flex items-center justify-center text-white font-medium text-[13px] shadow-lg shadow-[#3AABFF]/20 shrink-0">
               {user?.firstName?.charAt(0) || "F"}{user?.lastName?.charAt(0) || "S"}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-[13.5px] text-[#000] dark:text-white truncate">
                  {user?.firstName ? `${user.firstName} ${user.lastName}` : "Fatema Store"}
                </span>
                <span className="text-[10px] text-[#878787] font-medium tracking-tight uppercase">
                  {user?.role === "mover" ? "Business" : "Standard"}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
