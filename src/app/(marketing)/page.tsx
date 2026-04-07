"use client";

import HeroSection from "@/components/shared/HeroSection";
import ComparisonSection from "@/components/shared/ComparisonSection";
import StepsSection from "@/components/shared/StepsSection";
import AIFeaturesSection from "@/components/shared/AIFeaturesSection";
import FeaturesTabSection from "@/components/shared/FeaturesTabSection";
import FAQSection from "@/components/shared/FAQSection";
import PricingSection from "@/components/shared/PricingSection";
import StatsSection from "@/components/shared/StatsSection";
import CTASection from "@/components/shared/CTASection";

const page = () => {
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <div id="comparison">
        <ComparisonSection />
      </div>
      <div id="steps">
        <StepsSection />
      </div>

      <AIFeaturesSection />
      <section id="features" className="relative">
        <FeaturesTabSection />
      </section>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="stats">
        <StatsSection />
      </div>
      <div id="cta">
        <CTASection />
      </div>
    </>
  );
};

export default page;
