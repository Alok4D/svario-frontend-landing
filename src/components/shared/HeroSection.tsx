"use client";

import { motion } from "framer-motion";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { SiStripe, SiSpotify, SiWhatsapp, SiMessenger } from "react-icons/si";
import { FiMail, FiMessageSquare } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const customers = [
  { id: 1, name: "John Doe", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop", position: "top-20 left-10 md:top-40 md:left-[15%]", float: "float-1" },
  { id: 2, name: "Sarah Smith", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", position: "top-10 right-10 md:top-20 md:right-[20%]", float: "float-2" },
  { id: 3, name: "Mike Johnson", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", position: "bottom-1/4 left-5 md:bottom-[20%] md:left-[10%]", float: "float-3" },
  { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop", position: "bottom-1/3 right-5 md:bottom-[30%] md:right-[15%]", float: "float-4" },
];

const partners = [
  { name: "stripe", icon: <SiStripe className="text-2xl md:text-3xl" /> },
  { name: "email", icon: <FiMail className="text-2xl md:text-3xl" /> },
  { name: "spotify", icon: <SiSpotify className="text-2xl md:text-3xl" /> },
  { name: "WhatsApp", icon: <SiWhatsapp className="text-2xl md:text-3xl" /> },
  { name: "Messenger", icon: <SiMessenger className="text-2xl md:text-3xl" /> },
  { name: "Chat", icon: <FiMessageSquare className="text-2xl md:text-3xl" /> },
];

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        setIsPlaying(true);
      }
    }
  }, []);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      if (playPromiseRef.current !== null) {
        try {
          await playPromiseRef.current;
          videoRef.current.pause();
          setIsPlaying(false);
        } catch (error) {
          setIsPlaying(false);
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      playPromiseRef.current = videoRef.current.play();
      setIsPlaying(true);
      
      try {
        await playPromiseRef.current;
      } catch (error) {
        setIsPlaying(false);
      }
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden bg-white"
      style={{
        background: "linear-gradient(135deg, #3AABFF1A 10%, #3AABFF33 20%, #3AABFF4D 30%, #ffffff 100%)",
      }}
    >
      {/* Background blurs */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none overflow-hidden -z-10 opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/60 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-50/60 blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] rounded-full bg-sky-50/50 blur-[90px]" />
      </div>

      {/* Floating customer bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className={`absolute ${customer.position} ${customer.float} flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-10 select-none`}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <Image src={customer.image} alt={customer.name} width={36} height={36} className="object-cover" />
            </div>
            <span className="text-[13px] font-bold text-blue-900/70 tracking-tight">{customer.name}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto text-center relative z-20 px-4">
        <div className="hero-fade hero-fade-d1 inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs md:text-sm font-semibold mb-6 md:mb-10 shadow-[0_4px_20px_rgba(59,130,246,0.1)]">
          <span className="animate-pulse">✨</span> AI-Powered Customer Support
        </div>

        <h1 className="hero-fade hero-fade-d2 text-3xl sm:text-4xl md:text-7xl font-bold text-slate-900 mb-6 md:mb-8 leading-[1.1] tracking-[-0.03em] max-w-[95%] lg:max-w-[900px] mx-auto">
          All Your Customer <br className="hidden sm:block" />
          Conversations in{" "}
          <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            One Place
          </span>
        </h1>

        <p className="hero-fade hero-fade-d3 text-base md:text-xl text-slate-500 max-w-[90%] md:max-w-[600px] mx-auto mb-10 md:mb-12 leading-[1.6] font-normal px-4">
          Manage WhatsApp, Instagram, and email messages with smart AI replies.
          Simple, fast, and powerful customer support platform.
        </p>

        <div className="hero-fade hero-fade-d4 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mb-10 md:mb-14">
          <CustomButton
            btnText="Start Free Trial →"
            btnLink="/register"
            bgColor="#2563eb"
            className="w-full sm:w-auto text-white hover:bg-blue-700 px-8 md:px-10 py-4 rounded-xl font-bold transition-all shadow-[0_10px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_50px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-0.5"
          />
          <div onClick={togglePlay} className="w-full sm:w-auto">
            <CustomButton
              btnText={isPlaying ? "Pause Demo" : "Watch Demo"}
              btnLink="#"
              className="w-full text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-8 md:px-10 py-4 rounded-xl font-bold transition-all hover:border-slate-300"
            />
          </div>
        </div>

        <div className="hero-fade hero-fade-d5 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 text-[13px] md:text-[15px] text-slate-400 mb-16 md:mb-20 font-medium">
          <div className="flex gap-2.5 items-center"><span className="text-blue-500 scale-125">✓</span> 14-day free trial</div>
          <div className="flex gap-2.5 items-center"><span className="text-blue-500 scale-125">✓</span> No credit card required</div>
          <div className="flex gap-2.5 items-center"><span className="text-blue-500 scale-125">✓</span> Cancel at any time</div>
        </div>

        <div 
          onClick={togglePlay}
          className="hero-fade hero-fade-d6 relative w-full lg:max-w-[1040px] mx-auto aspect-video rounded-[24px] md:rounded-[40px] overflow-hidden border-[6px] md:border-[16px] border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] bg-[#f1f5f9] group cursor-pointer select-none"
        >
          <video 
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline 
            className="w-full h-full object-cover" 
            poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
          >
            <source src="/homepage-hero-video.mp4" type="video/mp4" />
          </video>

          <div className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-all duration-500 ${isPlaying ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"}`}>
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white/95 rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
               <AiOutlinePlayCircle className="text-blue-600 text-4xl md:text-6xl" />
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
        </div>

        {/* Partner Marquee */}
        <div className="mt-16 md:mt-32 w-full overflow-hidden relative py-6 md:py-10">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 md:gap-24 whitespace-nowrap w-fit px-10"
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex items-center gap-3 md:gap-4 text-[#002B5B] hover:scale-105 transition-all duration-300 opacity-80">
                <span className="scale-75 md:scale-100">{partner.icon}</span>
                <span className="text-lg md:text-2xl font-bold tracking-tight">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
