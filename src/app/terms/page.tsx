"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Scale, Users, ShieldAlert, Cpu, Gavel, FileCheck } from "lucide-react";

const TermsOfService = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1505664194762-8597c5f4d33f?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1423592707957-3b212afa6733?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const sections = [
    {
      icon: Users,
      title: "1. User Engagement",
      content: "By accessing or using our Services, you agree to be bound by these terms. If you disagree with any part of the terms then you may not access the service. These Terms govern your use of the Svario.is platform and any related services."
    },
    {
      icon: Cpu,
      title: "2. AI Service Utilization",
      content: "Svario.is provides an AI-powered platform for customer support. You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for all data, content, and communications transmitted through your Svario.is account."
    },
    {
      icon: Gavel,
      title: "3. Intellectual Property Rights",
      content: "The Service and its original content, features, and functionality are and will remain the exclusive property of Svario.is and its licensors. Our platform is protected by copyright, trademark, and other laws of both the country and foreign countries."
    },
    {
      icon: ShieldAlert,
      title: "4. Limitation of Liability",
      content: "In no event shall Svario.is, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
    },
    {
      icon: FileCheck,
      title: "5. Termination of Service",
      content: "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease."
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
                alt={`Terms Background ${idx}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-linear-to-b from-blue-50/20 via-blue-50/40 to-white backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 font-manrope font-bold text-xs uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Scale className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="text-6xl md:text-8xl font-medium text-gray-900 mb-6 font-big-shoulders animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 font-manrope font-medium max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Welcome to Svario.is! Please read these terms and conditions carefully before using our AI-powered service.
          </p>
          <div className="mt-8 text-xs text-slate-400 font-manrope font-bold uppercase tracking-widest bg-white w-fit mx-auto px-6 py-2 rounded-full shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            Effective Date: April 7, 2026
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
            <Gavel className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-medium mb-4 font-big-shoulders">Agreement Confirmation</h2>
            <p className="text-slate-400 font-manrope mb-8 font-medium">
              By using Svario.is, you acknowledge that you have read and understood these Terms of Service.
            </p>
            <button className="bg-[#3da1ff] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all duration-300">
              I Accept & Continue
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
