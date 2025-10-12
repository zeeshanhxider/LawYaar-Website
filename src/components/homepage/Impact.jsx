import Heading from "../ui/Heading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";
import chatImg from "../../assets/illustrations/chat.png";
import farmerImg from "../../assets/illustrations/farmer.png";

export default function Impact() {
  return (
    <section id="services" className="my-[15%]" aria-label="impact">
      <Heading title="Our Impact" />
      <div className="space-y-20 md:space-y-32">
        <ImpactSection
          title="Accessible Justice for Everyone — Anytime, Anywhere."
          description={
            <>
              In Pakistan, legal knowledge is often locked behind paywalls,
              lawyers, and complicated websites.
              <br />
              <br />
              LawYaar changes that by bringing verified legal help directly to
              WhatsApp — a familiar, trusted platform used by over 60 million
              Pakistanis.
              <br />
              <br />
              Whether you're in a city or a remote village, LawYaar lets you ask
              questions in Urdu, English, or regional languages, and get
              accurate, voice-enabled answers within seconds.
            </>
          }
          image={chatImg}
          imageAlt="WhatsApp Chat Interface"
          imagePosition="right"
        />
        <ImpactSection
          title="Built for the People Who Need It Most."
          description={
            <>
              LawYaar empowers those who often struggle most with the legal
              system — the tenant, the farmer, the student, and the small
              business owner.
              <br />
              <br />
              It gives them the clarity to make informed decisions about their
              rights, without spending thousands on consultations or traveling
              miles to find a lawyer.
              <br />
              <br />
              Our goal is simple: make justice accessible, affordable, and
              understandable for every Pakistani.
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
