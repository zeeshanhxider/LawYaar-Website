import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export default function Hero() {
  const img = useRef(null);
  const imgContainer = useRef(null);
  const desktopTitles = useRef([]);
  const mobileTitles = useRef([]);
  const scrollLine = useRef(null);
  const scroll = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.from(scrollLine.current, {
      translateX: -40,
      duration: 1.5,
      ease: "power4.inOut",
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(imgContainer.current, {
      scale: 1.3,
      duration: 3.25,
      ease: "power3.inOut",
    })
      .from(
        img.current,
        { scale: 2, duration: 3.2, ease: "power4.inOut" },
        "-=3.1"
      )
      .to(
        [...desktopTitles.current, ...mobileTitles.current],
        {
          y: 0,
          duration: 2,
          ease: "power4.inOut",
        },
        "-=2.5"
      )
      .from(scroll.current, { opacity: 0, duration: 1, ease: "out" }, "-=2");
  }, []);

  return (
    <section
      id="hero"
      className="hero relative flex h-screen w-full select-none items-center justify-center"
      aria-label="hero"
    >
      {/* MOBILE VERSION */}
      <div className="z-10 -mt-10 flex w-full flex-col items-center px-5 text-accent-300 sm:hidden">
        <div className="title py-2">
          <h1
            ref={(el) => (mobileTitles.current[0] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[10vw] font-bold leading-tight"
          >
            Your Legal Questions.
          </h1>
          <h1
            ref={(el) => (mobileTitles.current[1] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[10vw] font-bold leading-tight"
          >
            Verified Answers.
          </h1>
          <h1
            ref={(el) => (mobileTitles.current[2] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[10vw] font-bold leading-tight"
          >
            All on WhatsApp.
          </h1>
        </div>
        <p
          ref={(el) => (mobileTitles.current[3] = el)}
          className="mt-6 max-w-lg translate-y-96 text-center text-body-2 opacity-0"
        >
          LawYaar helps Pakistanis understand their legal rights through an
          AI-powered WhatsApp chatbot — accessible in English and Urdu, verified
          by real court judgments.
        </p>
        <a
          ref={(el) => (mobileTitles.current[4] = el)}
          href="#contact"
          className="button mt-8 translate-y-96 border border-transparent px-6 py-3 opacity-0 duration-200 hover:border-accent-400 hover:bg-transparent"
          style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
        >
          Join Waitlist
        </a>
      </div>
      {/* DESKTOP VERSION */}
      <div className="z-10 hidden w-full flex-col items-center px-10 text-accent-300 sm:flex">
        <div className="title">
          <h1
            ref={(el) => (desktopTitles.current[0] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[6vw] font-bold leading-tight"
          >
            Your Legal Questions.
          </h1>
        </div>
        <div className="title">
          <h1
            ref={(el) => (desktopTitles.current[1] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[6vw] font-bold leading-tight"
          >
            Verified Answers.
          </h1>
        </div>
        <div className="title">
          <h1
            ref={(el) => (desktopTitles.current[2] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[6vw] font-bold leading-tight"
          >
            All on WhatsApp.
          </h1>
        </div>
        <p
          ref={(el) => (desktopTitles.current[3] = el)}
          className="mt-8 max-w-3xl translate-y-96 text-center text-body-1 opacity-0"
        >
          LawYaar helps Pakistanis understand their legal rights through an
          AI-powered WhatsApp chatbot — accessible in English and Urdu, verified
          by real court judgments.
        </p>
        <a
          ref={(el) => (desktopTitles.current[4] = el)}
          href="#contact"
          className="button mt-10 translate-y-96 border border-transparent px-8 py-3 opacity-0 duration-200 hover:border-accent-400 hover:bg-transparent"
          style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
        >
          Join Waitlist
        </a>
      </div>
    </section>
  );
}
