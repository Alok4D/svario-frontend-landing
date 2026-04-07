"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FiCheck } from "react-icons/fi";

const plans = [
  {
    name: "Monthly",
    price: "15",
    description: "Affordable plans, promotion, measurable results",
    features: [
      "Up to 100 conversations/month",
      "1 connected channel",
      "Basic AI responses",
      "Email support",
      "Community access",
    ],
    buttonText: "Select",
    isPopular: false,
  },
  {
    name: "Half yearly",
    price: "45",
    description: "sustained growth, impactful results",
    features: [
      "Up to 100 conversations/month",
      "1 connected channel",
      "Basic AI responses",
      "Email support",
      "Community access",
    ],
    buttonText: "Select",
    isPopular: true,
  },
  {
    name: "Yearly",
    price: "75",
    description: "long-term success, maximum value",
    features: [
      "Up to 100 conversations/month",
      "1 connected channel",
      "Basic AI responses",
      "Email support",
      "Community access",
    ],
    buttonText: "Select",
    isPopular: false,
  },
];

const PricingSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="pricing" className="py-24 md:py-32 px-4 bg-white relative overflow-hidden font-sans">
      {/* Background Decorative Blurs - Restored for better visual presence */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/40 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-50/40 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="reveal text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="reveal reveal-d1 text-base md:text-lg text-slate-400 font-normal max-w-2xl mx-auto">
            Choose the perfect plan for your business. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-[1100px] mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal reveal-d${i + 1} relative p-8 md:p-10 rounded-[24px] border transition-all duration-500 flex flex-col items-center text-center ${
                plan.isPopular
                  ? "bg-[#ebf5ff] border-[#b3d9ff] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] z-10"
                  : "bg-white border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)]"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3da1ff] text-white px-4 py-1.5 rounded-full text-[11px] font-bold shadow-md tracking-tight">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">{plan.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-slate-900">$</span>
                  <span className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-slate-400 font-medium text-sm mt-4">/month</span>
                </div>
                <p className="text-slate-400 text-sm font-normal leading-relaxed max-w-[180px] mx-auto">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-5 mb-10 flex-1 w-full max-w-[240px] mx-auto">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FiCheck className="text-[#3da1ff] w-5 h-5 shrink-0" />
                    <span className="text-slate-500 text-sm font-normal text-left truncate">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 active:scale-95 ${
                  plan.isPopular
                    ? "bg-[#3da1ff] text-white hover:bg-blue-500 shadow-lg shadow-blue-100"
                    : "bg-[#8c8c8c] text-white hover:bg-[#7a7a7a]"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
