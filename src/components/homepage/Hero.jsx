import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import lawFirmIllustration from "../../assets/illustrations/lawyer.png";

export default function Hero() {
  const illustration = useRef(null);
  const desktopTitles = useRef([]);
  const mobileTitles = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial state
    gsap.set(illustration.current, { x: 100, opacity: 0 });
    gsap.set([...desktopTitles.current, ...mobileTitles.current], {
      y: 50,
      opacity: 0,
    });

    // Animate to visible state
    tl.to(illustration.current, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
    }).to(
      [...desktopTitles.current, ...mobileTitles.current],
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=1"
    );
  }, []);

  return (
    <section
      id="hero"
      className="hero relative flex min-h-screen w-full select-none items-center justify-center py-10"
      aria-label="hero"
    >
      {/* MOBILE VERSION */}
      <div className="z-10 flex w-full flex-col items-center justify-between px-5 text-accent-400 lg:hidden">
        {/* Text Content - Top */}
        <div className="flex flex-col items-center">
          <div className="title">
            <h1
              ref={(el) => (mobileTitles.current[0] = el)}
              className="w-full text-center text-[7vw] font-bold leading-tight"
            >
              Your Legal Questions. Verified Answers. All on WhatsApp.
            </h1>
          </div>
          <p
            ref={(el) => (mobileTitles.current[1] = el)}
            className="mt-4 max-w-lg text-center text-[3.5vw] leading-relaxed"
          >
            LawYaar is Pakistan's first AI-powered legal assistant on WhatsApp.
            It helps you understand your rights — from inheritance to tenancy —
            with verified answers backed by real laws and Supreme Court
            judgments. Just text or send a voice note in Urdu or English,
            anytime.
          </p>
        </div>

        {/* Illustration - Bottom */}
        <div className="-mt-4 w-full max-w-xs">
          <img
            ref={(el) => (mobileTitles.current[2] = el)}
            src={lawFirmIllustration}
            alt="Law Firm Illustration"
            className="h-auto w-full"
            onError={(e) => console.error("Image failed to load:", e)}
          />
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div className="z-10 mx-auto hidden w-full max-w-7xl px-10 lg:flex lg:items-center lg:gap-12 xl:gap-16">
        {/* Left Side - Text Content */}
        <div className="flex w-1/2 flex-col text-accent-400">
          <h1
            ref={(el) => (desktopTitles.current[0] = el)}
            className="text-5xl font-bold leading-tight xl:text-6xl"
          >
            Your Legal Questions. Verified Answers. All on WhatsApp.
          </h1>

          <p
            ref={(el) => (desktopTitles.current[1] = el)}
            className="mt-8 text-lg leading-relaxed xl:text-xl"
          >
            LawYaar is Pakistan’s first AI-powered legal assistant on WhatsApp.
            It helps you understand your rights — from inheritance to tenancy —
            with verified answers backed by real laws and Supreme Court
            judgments. Just text or send a voice note in Urdu or English,
            anytime.
          </p>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex w-1/2 items-center justify-center">
          <img
            ref={illustration}
            src={lawFirmIllustration}
            alt="Law Firm Illustration"
            className="h-auto w-full max-w-md"
            onError={(e) => console.error("Image failed to load:", e)}
          />
        </div>
      </div>
    </section>
  );
}
