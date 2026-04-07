"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const ref = useScrollReveal();

  return (
    <footer ref={ref} id="contact" className="pt-20 pb-10 px-4 bg-white border-t border-slate-100 overflow-hidden font-sans">
      <div className="reveal max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">

          {/* Brand & Mission */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-20 h-10 relative">
                <Image
                  src="/nav-logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-[15px] text-slate-500 font-normal leading-relaxed max-w-xs">
              AI-powered customer support platform. Empowering businesses to deliver exceptional responses at scale.
            </p>
            <Link href="/register">
              <button className="bg-[#3da1ff] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-100 transition-all duration-200 hover:bg-blue-500 active:scale-[0.98] w-fit">
                Get Started Free <FiArrowRight strokeWidth={3} className="text-base" />
              </button>
            </Link>
          </div>

          {/* Quick Links Group */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <h4 className="text-[15px] font-bold text-slate-900 tracking-tight">Product</h4>
              <nav className="flex flex-col gap-3.5">
                <Link href="/features" className="text-[14px] text-slate-500 font-medium hover:text-[#3da1ff] transition-colors">Features</Link>
                <Link href="/pricing" className="text-[14px] text-slate-500 font-medium hover:text-[#3da1ff] transition-colors">Pricing</Link>
                <Link href="/security" className="text-[14px] text-slate-500 font-medium hover:text-[#3da1ff] transition-colors">Security</Link>
              </nav>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-[15px] font-bold text-slate-900 tracking-tight">Company</h4>
              <nav className="flex flex-col gap-3.5">
                <Link href="/about" className="text-[14px] text-slate-500 font-medium hover:text-[#3da1ff] transition-colors">About Us</Link>
                <Link href="/contact" className="text-[14px] text-slate-500 font-medium hover:text-[#3da1ff] transition-colors">Contact</Link>
                <Link href="/help" className="text-[14px] text-slate-500 font-medium hover:text-[#3da1ff] transition-colors">Help Center</Link>
              </nav>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="text-[15px] font-bold text-slate-900 tracking-tight">News & Update</h4>
            <div className="flex w-full items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100 shadow-sm focus-within:border-[#3da1ff] transition-all">
              <input 
                type="email" 
                placeholder="Enter your Email" 
                className="bg-transparent border-none outline-none flex-1 px-3 text-sm text-slate-900 font-medium placeholder:text-slate-400" 
              />
              <button className="bg-[#3da1ff] text-white px-5 py-2 rounded-[10px] font-bold shadow-sm transition-all duration-200 hover:bg-blue-500 active:scale-[0.97] text-xs">
                Subscribe
              </button>
            </div>
            <p className="text-[13px] text-slate-400 font-normal leading-relaxed">
              Join our newsletter for the latest AI support tips. No spam, just value.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 font-medium text-sm">
            © 2026 Svario.is. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-600 font-medium">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600 font-medium">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
