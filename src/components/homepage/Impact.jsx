import Heading from "../ui/Heading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";
import { useTranslation } from "../../context/TranslationContext";
import chatImg from "../../assets/illustrations/chat.png";
import farmerImg from "../../assets/illustrations/farmer.png";

export default function Impact() {
  const { t } = useTranslation();

  return (
    <section id="services" className="my-[15%]" aria-label="impact">
      <Heading title={t.impact.heading} />
      <div className="space-y-20 md:space-y-32">
        <ImpactSection
          title={t.impact.section1Title}
          description={
            <>
              {t.impact.section1Para1}
              <br />
              <br />
              {t.impact.section1Para2}
              <br />
              <br />
              {t.impact.section1Para3}
            </>
          }
          image={chatImg}
          imageAlt="WhatsApp Chat Interface"
          imagePosition="right"
        />
        <ImpactSection
          title={t.impact.section2Title}
          description={
            <>
              {t.impact.section2Para1}
              <br />
              <br />
              {t.impact.section2Para2}
              <br />
              <br />
              {t.impact.section2Para3}
            </>
          }
          image={farmerImg}
          imageAlt="Farmer illustration"
          imagePosition="left"
        />
      </div>
    </section>
  );
}

function ImpactSection({ title, description, image, imageAlt, imagePosition }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const isImageRight = imagePosition === "right";

    // Set initial state
    gsap.set(imageRef.current, {
      x: isImageRight ? 100 : -100,
      opacity: 0,
    });
    gsap.set([headingRef.current, bodyRef.current], {
      y: 50,
      opacity: 0,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "150px bottom",
      animation: gsap
        .timeline()
        .to(
          imageRef.current,
          { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
          0
        )
        .to(
          headingRef.current,
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1"
        )
        .to(
          bodyRef.current,
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1"
        ),
      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [sectionRef, imagePosition]);

  const isImageRight = imagePosition === "right";

  return (
    <div
      ref={sectionRef}
      className={`mt-10 grid grid-cols-1 items-center gap-8 md:gap-16 lg:gap-24 ${
        isImageRight ? "md:grid-cols-2" : "md:grid-cols-2"
      }`}
    >
      {/* Text Content */}
      <div
        className={`space-y-6 ${isImageRight ? "md:order-1" : "md:order-2"}`}
      >
        <div className="space-y-4 2xl:space-y-10">
          <h3
            ref={headingRef}
            className="text-heading-3 font-semibold leading-tight 2xl:text-7xl"
          >
            {title}
          </h3>
          <p
            ref={bodyRef}
            className="max-w-2xl text-body-1 leading-relaxed 2xl:text-3xl"
          >
            {description}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className={`${isImageRight ? "md:order-2" : "md:order-1"}`}>
        <img
          ref={imageRef}
          src={image}
          alt={imageAlt}
          className="mx-auto h-auto w-full max-w-lg rounded-lg"
        />
      </div>
    </div>
  );
}
