/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Check } from "lucide-react";
import { useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
// react icons

const Accordion = ({
  bgColor = "bg-primary/10",
  title = "FAQ – {WEBSITE_DETAILS.SITE_ONLY_NAME}",
  //   subtitle = "Get answers to common questions about our services",
  showTitle = true,
}: {
  bgColor?: string;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
}) => {
  const faqData = [
    {
      question:
        "How do I book a support service on {WEBSITE_DETAILS.SITE_ONLY_NAME}?",
      answer:
        "Booking support on {WEBSITE_DETAILS.SITE_ONLY_NAME} is simple. Search for the type of support or support worker you need, browse profiles, and choose someone who matches your needs, location, and schedule. You can request a booking directly through the platform and confirm times that work for both sides. All bookings are managed securely within {WEBSITE_DETAILS.SITE_ONLY_NAME} for clear communication and record-keeping.",
    },
    {
      question:
        "Is {WEBSITE_DETAILS.SITE_ONLY_NAME} a registered NDIS provider?",
      answer:
        "{WEBSITE_DETAILS.SITE_ONLY_NAME} is a technology platform, not a direct care provider. Support services are delivered by independent NDIS providers and support workers who use {WEBSITE_DETAILS.SITE_ONLY_NAME} to manage bookings, documentation, and compliance. This gives participants more choice while providers stay organised and compliant.",
    },
    {
      question:
        "Can I use my NDIS funding with {WEBSITE_DETAILS.SITE_ONLY_NAME}?",
      answer:
        "Yes. If your NDIS plan is self-managed or plan-managed, you can use your funding with providers and workers you connect with through {WEBSITE_DETAILS.SITE_ONLY_NAME}. Funding arrangements are handled between you, your provider, and your plan manager where applicable.",
    },
    {
      question:
        "How does {WEBSITE_DETAILS.SITE_ONLY_NAME} keep support flexible?",
      answer:
        "{WEBSITE_DETAILS.SITE_ONLY_NAME} is designed around choice and control. You can:",
      bullets: [
        "Choose your preferred support worker",
        "Book supports that suit your schedule",
        "Adjust services as your needs change",
      ],
      subtitle:
        "There are no long-term lock-ins from the platform, you stay in control of your care.",
    },
    {
      question:
        "How does {WEBSITE_DETAILS.SITE_ONLY_NAME} support NDIS compliance?",
      answer:
        "{WEBSITE_DETAILS.SITE_ONLY_NAME} includes tools that help providers meet NDIS requirements, including:",
      bullets: [
        "Structured shift notes",
        "Incident reporting templates",
        "Claim support checks",
        "Audit-ready documentation",
      ],
      subtitle:
        "These tools help reduce errors and improve documentation quality.",
    },
    {
      question: "Is {WEBSITE_DETAILS.SITE_ONLY_NAME} secure?",
      answer:
        "Yes. {WEBSITE_DETAILS.SITE_ONLY_NAME} is built with strong privacy and security practices suitable for disability services. This includes:",
      bullets: [
        "Role-based access controls",
        "Secure data handling",
        "Privacy-focused design",
        "Protection for sensitive client information",
      ],
      subtitle: "Your data stays protected.",
    },
    {
      question: "Who can use {WEBSITE_DETAILS.SITE_ONLY_NAME}?",
      answer:
        "{WEBSITE_DETAILS.SITE_ONLY_NAME} supports the whole NDIS ecosystem:",
      bullets: [
        "Participants & families",
        "NDIS providers",
        "Support workers",
        "Service coordinators",
        "Admin & compliance teams",
      ],
      subtitle: "It’s one connected platform for everyone involved in care.",
    },
  ];

  const [isAccordingOpen, setIsAccordingOpen] = useState(0);

  const handleClick = (index: any) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

  return (
    <section className={`${bgColor} py-12 sm:py-16 lg:py-20`}>
      <div className="flex flex-col w-full customContainer mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Title Section */}
        {showTitle && (
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-primary mb-4">
              {title}
            </h2>
            {/* <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p> */}
          </div>
        )}

        {/* FAQ Items */}
        {faqData?.map((according, index) => (
          <article
            key={index}
            className="border border-gray-300 px-4 sm:px-6 py-3 sm:py-4 first:rounded-t-sm last:rounded-b-sm"
          >
            <div
              className="flex gap-2 sm:gap-3 cursor-pointer items-start sm:items-center justify-between w-full"
              onClick={() => handleClick(index)}
            >
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 bg-transparent flex-1 min-w-0">
                <span className="text-gray-600 font-medium text-lg sm:text-xl flex-shrink-0 mt-1 sm:mt-0">
                  {index + 1}.{" "}
                </span>
                <h2 className="text-primary font-medium text-base sm:text-lg lg:text-[1.2rem] leading-tight sm:leading-normal">
                  {according.question}
                </h2>
              </div>
              <div className="flex-shrink-0 ml-2">
                {isAccordingOpen === index ? (
                  <FiMinusCircle className="text-xl sm:text-2xl" />
                ) : (
                  <FiPlusCircle className="text-xl sm:text-2xl" />
                )}
              </div>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                isAccordingOpen === index
                  ? "grid-rows-[1fr] opacity-100 mt-3 sm:mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-black dark:text-[#abc2d3] text-sm sm:text-[0.9rem] lg:text-base overflow-hidden pl-6 sm:pl-7">
                  {according.answer}
                </p>

                {/* Bullet Points */}
                {according.bullets && according.bullets.length > 0 && (
                  <ul className="mt-3 pl-6 sm:pl-7 space-y-2">
                    {according.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-black dark:text-[#abc2d3] text-sm sm:text-[0.9rem] lg:text-base"
                      >
                        <span className="text-primary font-medium">
                          <Check />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Subtitle for specific FAQ */}
                {according.subtitle && (
                  <p className="text-black dark:text-[#abc2d3] text-sm sm:text-[0.9rem] lg:text-base mt-3 pl-6 sm:pl-7">
                    {" "}
                    {according.subtitle}{" "}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Accordion;
