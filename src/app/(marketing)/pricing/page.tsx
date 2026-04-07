"use client";

import FAQSection from "@/components/shared/FAQSection";
import PricingSection from "@/components/shared/PricingSection";
import StatsSection from "@/components/shared/StatsSection";
import PricingQuestionsSection from "@/components/shared/PricingQuestionsSection";

const page = () => {
  return (
    <>
      <PricingSection />
      <FAQSection />
      <StatsSection />
      <PricingQuestionsSection />
    </>
  );
};

export default page;
