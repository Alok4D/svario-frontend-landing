"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/shared/ContactForm";
import VisitOfficeSection from "@/components/shared/VisitOfficeSection";
import { FiMail, FiPhone, FiMapPin, FiExternalLink } from "react-icons/fi";

const contactInfo = [
  {
    icon: <FiMail />,
    title: "Email",
    details: ["support@svario.is", "sales@svario.is"],
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  {
    icon: <FiPhone />,
    title: "Phone",
    details: ["+1 (555) 123-4567"],
    subtext: "Mon-Fri, 9am-6pm EST",
    bg: "bg-sky-50",
    color: "text-sky-500",
  },
  {
    icon: <FiMapPin />,
    title: "Office",
    details: ["123 AI Street", "San Francisco, CA 94102", "United States"],
    bg: "bg-indigo-50",
    color: "text-indigo-500",
  },
];

const ContactPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-[56px] font-bold text-slate-900 mb-6 tracking-tight"
          >
            Get in <span className="text-[#3AABFF]">touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Have questions? We&apos;d love to hear from you. Send us a message 
            and we&apos;ll respond as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Contact Form */}
          <ContactForm />

          {/* Right: Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-500 leading-relaxed text-[16px]">
                Have a question or want to learn more? Reach out to us through 
                any of these channels.
              </p>
            </div>

            {/* Info Blocks */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300"
                >
                  <div className={`flex-shrink-0 w-12 h-12 ${info.bg} ${info.color} rounded-xl flex items-center justify-center text-xl`}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{info.title}</h4>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-slate-500 text-[15px] font-medium">{detail}</p>
                      ))}
                    </div>
                    {info.subtext && (
                      <p className="mt-2 text-slate-400 text-[13px] font-normal italic">{info.subtext}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Help Center Card */}
            <motion.div
              variants={fadeIn}
              className="bg-[#3AABFF]/5 border border-[#3AABFF]/10 rounded-[24px] p-8 md:p-10"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">Need immediate help?</h3>
              <p className="text-slate-500 mb-8 leading-relaxed text-[15px]">
                Check out our Help Center for instant answers to common questions.
              </p>
              <a
                href="#"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#3AABFF] border border-[#3AABFF]/20 py-4 px-6 rounded-xl font-bold transition-all hover:bg-[#3AABFF] hover:text-white hover:border-[#3AABFF] shadow-sm active:scale-[0.98]"
              >
                Visit Help Center <FiExternalLink className="text-lg" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <VisitOfficeSection />
    </div>
  );
};

export default ContactPage;
