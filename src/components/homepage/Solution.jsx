import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";
import { useTranslation } from "../../context/TranslationContext";
import Heading from "../ui/Heading";

export default function Solution() {
  const { t } = useTranslation();
  const aboutSection = useRef(null);
  const heading = useRef(null);
  const body = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: aboutSection.current,
      start: "top 400px",
      animation: gsap
        .timeline()
        .to(
          heading.current,
          { opacity: 1, y: 0, ease: "power3.out", duration: 0.6 },
          0
        )
        .to(
          body.current,
          { opacity: 1, y: 0, ease: "power3.out", duration: 0.6 },
          0.1
        )
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.5,
            stagger: 0.08,
          },
          0.2
        ),

      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [aboutSection]);

  const features = [
    {
      icon: "mdi:account-plus-outline",
      title: t.solution.step1Title,
      description: t.solution.step1Description,
    },
    {
      icon: "mdi:whatsapp",
      title: t.solution.step2Title,
      description: t.solution.step2Description,
    },
    {
      icon: "mdi:check-decagram-outline",
      title: t.solution.step3Title,
      description: t.solution.step3Description,
    },
  ];

  return (
    <section ref={aboutSection} aria-label="solution" className="py-10">
      <Heading title={t.solution.heading} />
      <div className="mt-4 space-y-10">
        <div className="space-y-4 text-center">
          <p
            ref={body}
            className="mx-auto max-w-4xl translate-y-10 text-body-1 opacity-0 2xl:text-4xl"
          >
            {t.solution.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="translate-y-10 space-y-4 rounded-lg border-2 border-transparent bg-primary-200 p-6 opacity-0 transition-all duration-300 hover:border-secondary-600"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary-600">
                  <Icon
                    icon={feature.icon}
                    className="text-2xl text-primary-200"
                  />
                </div>
                <h4 className="text-xl font-semibold text-accent-300">
                  {feature.title}
                </h4>
              </div>
              <p className="text-body-2 text-accent-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
