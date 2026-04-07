"use client";

import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";

const VisitOfficeSection = () => {
  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
          className="bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-16 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Visit Our Office
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              We&apos;d love to meet you in person. Drop by our office in San Francisco.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="relative w-full aspect-[2/1] bg-slate-50 rounded-[28px] overflow-hidden flex items-center justify-center border border-slate-100 group">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            {/* Location Pin */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="relative z-10 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center text-[#3AABFF] transition-all"
            >
              <FiMapPin className="text-4xl" />
              <div className="absolute -inset-4 bg-[#3AABFF]/10 rounded-full animate-ping pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisitOfficeSection;
