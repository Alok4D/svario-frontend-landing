"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const OurStorySection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: custom * 0.1,
        ease: [0.22, 1, 0.36, 1] as any 
      },
    }),
  };

  return (
    <section className="py-24 px-4 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[40px] md:text-[48px] font-medium text-slate-900 mb-4 tracking-tight"
          >
            Our <span className="text-[#3AABFF]">Story</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-slate-400 text-[15px] md:text-[16px] max-w-2xl mx-auto font-normal"
          >
            Today, Svario.is serves hundreds of businesses worldwide
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as any }}
            className="relative"
          >
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
                alt="Business collaboration"
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent mix-blend-overlay" />
            </div>
          </motion.div>

          {/* Right Side: Text Content */}
          <div className="space-y-8">
            <motion.p
              custom={1}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#1a1c1e] text-[20px] md:text-[18px] leading-[1.6] font-normal"
            >
              Svario.is was founded in 2024 by a team of AI researchers and 
              customer support veterans who experienced firsthand the challenges 
              businesses face in managing customer conversations across multiple channels.
            </motion.p>

            <motion.p
              custom={2}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#1a1c1e] text-[20px] md:text-[18px] leading-[1.6] font-normal"
            >
              We noticed that support teams were overwhelmed with repetitive 
              questions, slow response times, and scattered communication tools. 
              We knew there had to be a better way.
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#1a1c1e] text-[20px] md:text-[18px] leading-[1.6] font-normal"
            >
              Today, Svario.is serves hundreds of businesses worldwide, helping 
              them automate responses, unify their communication channels, and 
              deliver exceptional customer experiences 24/7.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
