"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  { question: "Can I change plans later?", answer: "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle." },
  { question: "Is there a long-term contract?", answer: "No, all plans are month-to-month. You can cancel anytime without any penalties or fees." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, debit cards, and PayPal. Enterprise customers can also pay via invoice." },
  { question: "Do you offer refunds?", answer: "Yes, we offer a 14-day money-back guarantee on all paid plans. No questions asked." }
];

const FAQSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto">

        <div className="text-center mb-20">
          <h2 className="reveal text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">

          <div className="hidden lg:flex flex-1 relative h-[500px] items-center justify-center">
            <div className="float-2">
              <img
                src="/faq-question.png"
                alt="Frequently Asked Questions"
                className="reveal w-full h-auto object-contain select-none pointer-events-none pr-8"
              />
            </div>
          </div>

          <div className="w-full lg:w-[65%] space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1} p-8 bg-[#f8f9fa] rounded-2xl border border-slate-50 transition-colors duration-200 hover:bg-slate-100`}
              >
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 tracking-tight">{faq.question}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
