import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../utils/TranslationContext";
import Heading from "../ui/Heading";
import { Icon } from "@iconify/react";

export default function Pricing({ forwardedRef }) {
  const { t } = useTranslation();
  const cardsRef = useRef([]);
  const navigate = useNavigate();

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
      name: t.pricing.starterName,
      price: t.pricing.starterPrice,
      period: t.pricing.starterPeriod,
      description: t.pricing.starterDescription,
      features: [
        t.pricing.starterFeature1,
        t.pricing.starterFeature2,
        t.pricing.starterFeature3,
        t.pricing.starterFeature4,
      ],
      highlighted: false,
    },
    {
      name: t.pricing.plusName,
      price: t.pricing.plusPrice,
      period: t.pricing.plusPeriod,
      description: t.pricing.plusDescription,
      features: [
        t.pricing.plusFeature1,
        t.pricing.plusFeature2,
        t.pricing.plusFeature3,
        t.pricing.plusFeature4,
        t.pricing.plusFeature5,
        t.pricing.plusFeature6,
      ],
      highlighted: true,
    },
    {
      name: t.pricing.enterpriseName,
      price: t.pricing.enterprisePrice,
      period: t.pricing.enterprisePeriod,
      description: t.pricing.enterpriseDescription,
      features: [
        t.pricing.enterpriseFeature1,
        t.pricing.enterpriseFeature2,
        t.pricing.enterpriseFeature3,
        t.pricing.enterpriseFeature4,
        t.pricing.enterpriseFeature5,
        t.pricing.enterpriseFeature6,
      ],
      highlighted: false,
    },
  ];

  return (
    <section ref={forwardedRef} id="works" className="nav-change my-[20%]">
      <Heading title={t.pricing.heading} />
      <div className="mt-5">
        <p className="mx-auto mb-12 max-w-2xl text-center text-body-1 text-accent-300">
          {t.pricing.description}
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

              {plan.name === t.pricing.enterpriseName && (
                <button
                  onClick={() => navigate("/associates")}
                  className="button group mx-auto mt-6 block w-fit border border-transparent px-6 py-1.5 duration-200 hover:border-accent-400 hover:bg-transparent"
                  style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
                >
                  <span className="relative w-fit">
                    <span className="group-hover:text-accent-400">
                      {t.pricing.learnMore}
                    </span>
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
