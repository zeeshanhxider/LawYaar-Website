import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";
import { Icon } from "@iconify/react";

export default function Pricing({ forwardedRef }) {
  const cardsRef = useRef([]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#works",
      start: "top 400px",
      animation: gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        duration: 0.5,
        stagger: 0.1,
      }),
      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, []);

  const pricingPlans = [
    {
      name: "Starter",
      price: "PKR 0",
      period: "/month",
      description: "Try LawYaar for free",
      features: [
        "3 legal queries per month",
        "Voice & text replies included",
        "Verified answers from real laws",
        "English, Urdu & regional languages support",
      ],
      highlighted: false,
    },
    {
      name: "Plus",
      price: "PKR 350",
      period: "/month",
      description: "For individuals needing regular legal help",
      features: [
        "100 legal queries per month",
        "Ask follow-up questions",
        "Voice & text replies included",
        "Verified answers from real laws",
        "Priority response time",
        "English, Urdu & regional languages support",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored for law firms & organizations",
      features: [
        "Unlimited team queries",
        "Research version for legal teams",
        "Lawyer & firm promotion tools",
        "Custom data integrations",
        "Legal insights dashboard",
        "Dedicated support & onboarding",
      ],
      highlighted: false,
    },
  ];

  return (
    <section ref={forwardedRef} id="works" className="nav-change my-[20%]">
      <Heading title="Pricing" />
      <div className="mt-5">
        <p className="mx-auto mb-12 max-w-2xl text-center text-body-1 text-accent-300">
          Choose the plan that works for you. Start free and upgrade anytime.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`translate-y-10 space-y-6 overflow-hidden rounded-lg border-2 p-8 opacity-0 transition-all duration-300 ${
                plan.highlighted
                  ? "scale-105 border-secondary-600 bg-secondary-600 text-primary-200 hover:border-primary-200"
                  : "border-transparent bg-primary-200 hover:border-secondary-600"
              }`}
            >
              <div>
                <h4
                  className={`text-2xl font-bold ${
                    plan.highlighted ? "text-primary-200" : "text-accent-300"
                  }`}
                >
                  {plan.name}
                </h4>
                <p
                  className={`mt-2 text-sm ${
                    plan.highlighted ? "text-primary-200" : "text-accent-200"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline">
                <span
                  className={`font-serif text-4xl font-bold ${
                    plan.highlighted ? "text-primary-200" : "text-accent-300"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`ml-1 font-serif font-bold ${
                    plan.highlighted ? "text-primary-300" : "text-accent-200"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Icon
                      icon="mdi:check-circle"
                      className={`mr-3 mt-0.5 flex-shrink-0 text-xl ${
                        plan.highlighted
                          ? "text-primary-200"
                          : "text-secondary-600"
                      }`}
                    />
                    <span
                      className={`text-body-3 ${
                        plan.highlighted
                          ? "text-primary-200"
                          : "text-accent-300"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
