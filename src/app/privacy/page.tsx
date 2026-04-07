"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Shield, Lock, Eye, FileText, Globe, Server } from "lucide-react";

const PrivacyPolicy = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us."
    },
    {
      icon: Server,
      title: "How We Use Your Information",
      content: "We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations."
    },
    {
      icon: Shield,
      title: "Data Security",
      content: "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure."
    },
    {
      icon: Globe,
      title: "Cookies and Tracking",
      content: "We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice."
    },
    {
      icon: Lock,
      title: "Your Privacy Rights",
      content: "In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-slate-100">
        {/* Dynamic Background Image Slider with Crossfade */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={img} 
                alt={`Privacy Background ${idx}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-linear-to-b from-white/20 via-white/40 to-white backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6 font-manrope font-bold text-xs uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Shield className="w-4 h-4" />
            Trust & Security
          </div>
          <h1 className="text-6xl md:text-8xl font-medium text-gray-900 mb-6 font-big-shoulders animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-500 font-manrope font-medium max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Your privacy is important to us. We are committed to protecting your personal information and your right to privacy.
          </p>
          <div className="mt-8 text-xs text-slate-400 font-manrope font-bold uppercase tracking-widest bg-white w-fit mx-auto px-6 py-2 rounded-full shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            Last Updated: April 7, 2026
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 bg-white font-manrope">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="group flex flex-col md:flex-row gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-12 duration-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <section.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-lg font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 bg-slate-900 rounded-[40px] text-center text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:opacity-30 transition-opacity duration-500" />
            <FileText className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-medium mb-4 font-big-shoulders">Questions about our policy?</h2>
            <p className="text-slate-400 font-manrope mb-8 font-medium">
              If you have any questions or concerns about our privacy policy or practices, please contact us.
            </p>
            <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
