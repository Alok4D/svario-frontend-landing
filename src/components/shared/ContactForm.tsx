/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  company: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", company: "", message: "" },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form Submitted:", values);
      toast.success("Your message has been sent successfully.");
      reset();
    } catch (error: any) {
      toast.error("Failed to send your message. Please try again.");
    }
  });

  const isBusy = isSubmitting;

  const labelClasses = "block text-slate-700 font-semibold mb-2 text-sm md:text-[15px]";
  const inputClasses = `
    w-full px-4 py-3 rounded-xl border border-slate-200 bg-white
    focus:outline-none focus:ring-2 focus:ring-[#3AABFF]/20 focus:border-[#3AABFF]
    transition-all duration-200 text-slate-900 placeholder:text-slate-400
  `;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white rounded-[24px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h3>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClasses}>Name</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={inputClasses}
            placeholder="Your name"
            disabled={isBusy}
          />
          {errors.name && <p className="mt-2 text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={inputClasses}
            placeholder="you@example.com"
            disabled={isBusy}
          />
          {errors.email && <p className="mt-2 text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="company" className={labelClasses}>Company (Optional)</label>
          <input
            type="text"
            id="company"
            {...register("company")}
            className={inputClasses}
            placeholder="Your company name"
            disabled={isBusy}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>Message</label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className={`${inputClasses} resize-none`}
            placeholder="Tell us about your needs..."
            disabled={isBusy}
          />
          {errors.message && <p className="mt-2 text-red-500 text-xs">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className="w-full bg-[#3AABFF] text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(58,171,255,0.3)] hover:bg-[#2e9ee4] hover:shadow-[0_15px_25px_-5px_rgba(58,171,255,0.4)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isBusy ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <FiSend className="text-xl" />
              Send Message
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
