import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";
import Heading from "../ui/Heading";

export default function Solution() {
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
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0
        )
        .to(
          body.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0.2
        )
        .to(
          cardsRef.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1, stagger: 0.15 },
          0.4
        ),

      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [aboutSection]);

  const features = [
    {
      icon: "mdi:account-plus-outline",
      title: "Step 1 — Join the Waitlist",
      description:
        "Add your WhatsApp number to get early access when LawYaar launches. You'll receive an invite link directly to your WhatsApp.",
    },
    {
      icon: "mdi:whatsapp",
      title: "Step 2 — Ask Your Question",
      description:
        "Once you're in, simply text or send a voice message on WhatsApp — in Urdu or English — about any legal issue you're facing, like property, inheritance, or tenancy.",
    },
    {
      icon: "mdi:check-decagram-outline",
      title: "Step 3 — Get Verified Answers",
      description:
        "LawYaar finds the most relevant laws and past court judgments, then explains them in clear, everyday language — even in your regional tongue.",
    },
  ];

  return (
    <section ref={aboutSection} aria-label="solution" className="py-10">
      <Heading title="How It Works" />
      <div className="mt-4 space-y-10">
        <div className="space-y-4 text-center">
          <p
            ref={body}
            className="mx-auto max-w-4xl translate-y-10 text-body-1 opacity-0 2xl:text-4xl"
          >
            With LawYaar, you can get verified answers to your legal questions
            in minutes — right from your WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="translate-y-10 space-y-4 rounded-lg border border-transparent bg-primary-200 p-6 opacity-0 transition-all duration-300 hover:border-black"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-600">
                <Icon
                  icon={feature.icon}
                  className="text-3xl text-primary-200"
                />
              </div>
              <h4 className="text-xl font-semibold text-accent-300">
                {feature.title}
              </h4>
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
