import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";
import { Icon } from "@iconify/react";

export default function Works({ forwardedRef }) {
  const cardsRef = useRef([]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#works",
      start: "top 400px",
      animation: gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        ease: "power4.out",
        duration: 1,
        stagger: 0.2,
      }),
      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, []);

  const pricingPlans = [
    {
      name: "Free",
      price: "PKR 0",
      period: "/month",
      description: "Get started with legal clarity",
      features: [
        "5 questions per month",
        "Text-based answers",
        "Basic legal guidance",
        "English & Urdu support",
      ],
      highlighted: false,
    },
    {
      name: "Standard",
      price: "PKR 499",
      period: "/month",
      description: "For regular legal assistance",
      features: [
        "Unlimited questions",
        "Voice replies included",
        "Priority response time",
        "Detailed case citations",
        "English & Urdu support",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For NGOs & law firms",
      features: [
        "Bulk query support",
        "Custom integrations",
        "Dedicated support team",
        "Advanced analytics",
        "Training & onboarding",
      ],
      highlighted: false,
    },
  ];

  return (
    <section
      ref={forwardedRef}
      id="works"
      className="nav-change my-[20%] overflow-hidden"
    >
      <Heading title="Pricing" />
      <div className="mt-10">
        <h3 className="mb-4 text-center text-heading-3 font-semibold leading-tight text-accent-300">
          Simple, Affordable, Transparent.
        </h3>
        <p className="mx-auto mb-12 max-w-2xl text-center text-body-1 text-accent-200">
          Choose the plan that works for you. Start free and upgrade anytime.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`translate-y-10 space-y-6 rounded-lg border p-8 opacity-0 transition-all duration-300 hover:shadow-xl ${
                plan.highlighted
                  ? "scale-105 border-secondary-600 bg-secondary-600 text-primary-200 shadow-lg"
                  : "border-accent-100 bg-primary-200 hover:border-secondary-600"
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
                    plan.highlighted ? "text-primary-300" : "text-accent-200"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlighted ? "text-primary-200" : "text-accent-300"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`ml-1 ${
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

              <a
                href="#contact"
                className={`block w-full rounded-full py-3 text-center font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-primary-200 text-secondary-600 hover:bg-primary-300"
                    : "bg-accent-300 text-primary-200 hover:bg-accent-400"
                }`}
              >
                {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
