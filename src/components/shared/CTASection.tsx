"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FiArrowRight } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const CTASection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-24 px-4 bg-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto md:px-4">
        {/* Main CTA Container */}
        <div className="reveal relative overflow-hidden bg-[#00132b] rounded-[32px] md:rounded-[40px] px-8 py-14 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Background Gradient/Glow (The lighter blue glow from the screenshot) */}
          <div className="absolute right-0 top-0 w-full lg:w-[60%] h-full bg-gradient-to-l from-blue-600/30 via-transparent to-transparent pointer-events-none z-0" />
          <div className="absolute right-[-10%] top-[-20%] w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none z-0" />

          {/* Left Content Wrapper */}
          <div className="flex-1 text-white relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left max-w-[650px]">
            {/* Glassmorphic Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-lg text-[13px] font-medium border border-white/10 shadow-sm mb-8">
              <span>🚀</span> Start Your Free Trial Today
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-6">
              Ready to transform your <br className="hidden md:block" /> customer support?
            </h2>

            <p className="text-lg md:text-xl text-white/70 font-normal leading-relaxed max-w-[90%] md:max-w-none mx-auto lg:mx-0 mb-10 md:mb-12">
              Join hundreds of businesses using AI to deliver exceptional support and scale effortlessly
            </p>

            {/* Checkmark Features (Single row on large screens) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-[13px] md:text-[14px] font-medium text-white/80">
              <div className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-xl text-white" /> No credit card required</div>
              <div className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-xl text-white" /> 14-day free trial</div>
              <div className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-xl text-white" /> Cancel anytime</div>
            </div>
          </div>

          {/* Right Action Area */}
          <div className="flex flex-col items-center gap-4 relative z-10 w-full lg:w-auto shrink-0 md:min-w-[280px]">
             {/* Primary Action */}
             <div className="w-full flex flex-col items-center gap-3">
                <button className="w-full bg-[#6aff9b] text-[#00132b] py-4.5 px-10 rounded-[14px] text-lg font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_15px_40px_-5px_rgba(106,255,155,0.25)] hover:bg-[#5aff8b] active:scale-[0.97]">
                  Start Free Trial <FiArrowRight className="text-xl" strokeWidth={3} />
                </button>
                <span className="text-white/60 text-[12px] font-medium tracking-tight">No credit card required</span>
             </div>
             
             {/* Secondary Action */}
             <button className="w-full bg-white text-[#00132b] py-4.5 px-10 rounded-[14px] text-lg font-bold shadow-xl transition-all duration-300 hover:bg-slate-50 active:scale-[0.97]">
               Schedule Demo
             </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
