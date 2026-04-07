"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Devesh T.",
    role: "Technical Lead",
    title: "Works great with AI integration",
    content: "Svario.is is very easy to operate. Svario.is handles most of support itselves and if AI is not able to handle, user also have an option to talk to a person directly.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    source: "G2",
  },
  {
    name: "Thomas N.",
    role: "Founder",
    title: "Relieves support inquiries and helps customers quickly!",
    content: "Adding knowledge is very simple, either through an FAQ on one's own website or manually through self-entered questions. The design is intuitive.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    source: "G2",
  },
  {
    name: "Shabbir Y.",
    role: "Software Developer",
    title: "Great tool for customer conversations",
    content: "Earlier, we struggled to respond quickly to multiple inquiries, but now, the chatbot handles most basic questions, saving us time and letting us focus on complex issues.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
    source: "G2",
  },
  {
    name: "Kayela J.",
    role: "Marketing Expert",
    title: "Top-notch platform",
    content: "Svario.is, the AI agent, is also super helpful. I am always concerned that visitors will get stuck in an infinite loop, but the bot has a built-in feature to push queries to a live agent.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    source: "G2",
  },
  {
    name: "Alex M.",
    role: "Product Designer",
    title: "Beautiful and functional UI",
    content: "The interface is very clean and easy to navigate for our agents.",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=200",
    source: "G2",
  },
  {
    name: "Jessica P.",
    role: "Support Manager",
    title: "Response time cut in half",
    content: "Since moving to Svario, our team has seen a 50% reduction in first response time. The AI handles most basic queries effortlessly.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    source: "G2",
  },
  {
    name: "Marcus K.",
    role: "Venture Partner",
    title: "Scalable support",
    content: "It's the right choice for any startup that needs to grow fast without hiring overhead immediately.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    source: "G2",
  },
  {
    name: "Lina B.",
    role: "E-commerce Owner",
    title: "Shopify integration",
    content: "The connection was instant and the AI understood our product catalog perfectly.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    source: "G2",
  },
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-24 px-4 bg-white overflow-hidden w-full relative">
       {/* Background Glow */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3AABFF]/5 blur-[140px] rounded-full -z-10" />
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/5 blur-[140px] rounded-full -z-10" />

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-[60px] font-medium text-slate-900 mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            What our customers say about <span className="text-[#3AABFF]">Svario.is</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-[18px] font-normal"
          >
            Used By The World&apos;s Best Marketing Teams
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto"
        >
          {testimonials.map((test, index) => {
            // Bento Span Logic
            let colSpan = "col-span-1";
            let rowSpan = "row-span-1";

            if (index === 0) { colSpan = "lg:col-span-1"; rowSpan = "row-span-1"; }
            if (index === 1) { colSpan = "lg:col-span-2"; rowSpan = "row-span-1"; }
            if (index === 3) { colSpan = "lg:col-span-1"; rowSpan = "lg:row-span-2"; }
            if (index === 4) { colSpan = "lg:col-span-1"; rowSpan = "row-span-1"; }
            if (index === 5) { colSpan = "lg:col-span-2"; rowSpan = "row-span-1"; }

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group flex flex-col justify-between bg-white border border-slate-100 rounded-[28px] p-8 md:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(58,171,255,0.08)] transition-all duration-500 
                  ${colSpan} ${rowSpan}
                `}
              >
                <div>
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden grayscale-0 group-hover:grayscale-0 transition-all duration-500 ring-2 ring-transparent group-hover:ring-[#3AABFF]/20">
                      <Image src={test.avatar} alt={test.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-slate-900 leading-none mb-1">{test.name}</h4>
                      <p className="text-[14px] text-slate-400 font-medium">{test.role}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <h5 className="text-[20px] md:text-[22px] font-bold text-slate-900 mb-5 leading-tight tracking-tight group-hover:text-[#3AABFF] transition-colors duration-300">
                    {test.title}
                  </h5>
                  <p className="text-slate-500 text-[16px] md:text-[17px] leading-[1.6] font-normal mb-10">
                    &quot;{test.content}&quot;
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="flex items-center gap-1.5 text-[14px] text-slate-400 font-medium hover:text-[#3AABFF] transition-colors">
                    Source: <span className="underline decoration-slate-200">G2</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
