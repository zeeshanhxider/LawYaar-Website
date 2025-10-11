import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";
import { Icon } from "@iconify/react";

export default function About() {
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
      icon: "mdi:whatsapp",
      title: "Ask on WhatsApp",
      description:
        "Simply message LawYaar on WhatsApp with your legal question in English or Urdu.",
    },
    {
      icon: "mdi:shield-check",
      title: "Get Verified Info",
      description:
        "Receive answers backed by real Pakistani court judgments and legal statutes.",
    },
    {
      icon: "mdi:volume-high",
      title: "Hear It Back",
      description:
        "Listen to your legal guidance with AI-powered voice replies for easy understanding.",
    },
  ];

  return (
    <section ref={aboutSection} aria-label="solution" className="py-10">
      <Heading title="How it works" />
      <div className="mt-10 space-y-10">
        <div className="space-y-4">
          <h3
            ref={heading}
            className="translate-y-10 text-heading-3 font-semibold leading-tight opacity-0 2xl:text-7xl"
          >
            How LawYaar helps you understand the law
          </h3>
          <p
            ref={body}
            className="max-w-4xl translate-y-10 text-body-1 opacity-0 2xl:text-4xl"
          >
            Built on a multi-layered AI system using FastAPI, PocketFlow, and
            ChromaDB for accurate, citation-backed answers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="translate-y-10 space-y-4 rounded-lg border border-accent-100 bg-primary-200 p-6 opacity-0 transition-all duration-300 hover:border-secondary-600 hover:shadow-lg"
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
