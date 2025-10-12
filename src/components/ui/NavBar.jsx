import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarSVG from "./NavbarSVG";
import { Squash as Hamburger } from "hamburger-react";
import { Icon } from "@iconify/react";
import { useTranslation } from "../../context/TranslationContext";
import lawyaarLogo from "../../assets/logo/lawyaar_logo.png";

export default function NavBar({ sectionRefs = [] }) {
  const navBar = useRef(null);
  const cta = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);
  const lenisRef = useRef(null); // Store Lenis instance
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage, t } = useTranslation();
  const tl = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    tl.to(navBar.current, {
      y: 0,
      duration: 1,
      delay: 0.2,
      ease: "power4.inOut",
    });
  }, []);

  useEffect(() => {
    sectionRefs.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 375px",
        end: "bottom 300px",
        animation: gsap
          .timeline()
          .to(navBar.current, { color: "#0E0E0C" }, 0)
          .to(hamburgerRef.current, { color: "#0E0E0C" }, 0)
          .to(".hb-text", { color: "#0E0E0C" }, 0),
        toggleActions: "restart reverse restart reverse",
      });
    });
  }, [sectionRefs]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // If not on home page, navigate to home page with hash
    if (location.pathname !== "/") {
      navigate("/" + targetId);
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement && lenisRef.current) {
      const navbarHeight = navBar.current?.offsetHeight || 60;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      lenisRef.current.scrollTo(offsetPosition, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current.querySelectorAll("a"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.1,
          ease: "power2.out",
        }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
        },
      });
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        ref={navBar}
        className="fixed top-0 z-50 flex w-full -translate-y-full items-center justify-between bg-secondary-100 px-4 py-1 md:py-3"
      >
        {/* Mobile Layout */}
        <div className="flex w-full items-center justify-between md:hidden">
          <a
            href="#hero"
            aria-label="Logo"
            className="z-50"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
          >
            <h1 className="font flex items-center gap-2 text-lg font-semibold">
              <img src={lawyaarLogo} alt="LawYaar Logo" className="h-8 w-8" />
              {t.brand.name}
            </h1>
          </a>

          {/* Hamburger Menu Icon */}
          <button
            aria-label="Toggle menu"
            className="hamburger-sync relative z-50 translate-x-1 focus:outline-none"
            onClick={toggleMenu}
            ref={hamburgerRef}
          >
            <Hamburger
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
              size={24}
              duration={0.4}
              color="currentColor"
            />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden w-full items-center justify-between md:flex">
          <a
            href="#hero"
            aria-label="Logo"
            className="z-50"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
          >
            <h1 className="font flex items-center gap-2 text-lg font-semibold">
              <img src={lawyaarLogo} alt="LawYaar Logo" className="h-8 w-8" />
              {t.brand.name}
            </h1>
          </a>
          <nav className="flex items-center space-x-7 font-grotesk text-body-3">
            <a
              href="#hero"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#hero")}
            >
              <span>{t.nav.home}</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#about")}
            >
              <span>{t.nav.about}</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="#services"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#services")}
            >
              <span>{t.nav.impact}</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="#works"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#works")}
            >
              <span>{t.nav.pricing}</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <button
              onClick={() => navigate("/associates")}
              className="group relative hidden md:inline-block"
            >
              <span>{t.nav.forLawFirms}</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </button>
            <button
              onClick={toggleLanguage}
              className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-transparent transition-all duration-200 hover:border-secondary-600"
              aria-label="Toggle language"
              title={language === "en" ? "اردو میں دیکھیں" : "View in English"}
            >
              <Icon icon="mdi:translate" className="text-xl text-accent-400 transition-colors duration-200 group-hover:text-secondary-600" />
            </button>
            <a
              ref={cta}
              className="button group relative min-w-0 border border-transparent px-4 py-1.5 duration-200 hover:border-accent-400 hover:bg-transparent"
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
            >
              <span className="relative w-fit">
                <span className="group-hover:text-black">{t.nav.joinWaitlist}</span>
              </span>
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center bg-secondary-100 md:hidden"
        style={{ display: "none" }}
      >
        <nav className="flex flex-col items-center space-y-8 font-grotesk text-2xl">
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
            className="hb-text"
          >
            <span>{t.nav.home}</span>
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "#about")}
            className="hb-text"
          >
            <span>{t.nav.about}</span>
          </a>
          <a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, "#services")}
            className="hb-text"
          >
            <span>{t.nav.impact}</span>
          </a>
          <a
            href="#works"
            onClick={(e) => handleSmoothScroll(e, "#works")}
            className="hb-text"
          >
            <span>{t.nav.pricing}</span>
          </a>
          <button onClick={() => navigate("/associates")} className="hb-text">
            <span>{t.nav.forLawFirms}</span>
          </button>
          <button
            onClick={toggleLanguage}
            className="group hb-text flex items-center gap-2 rounded-full border border-transparent px-4 py-2 transition-all duration-200 hover:border-secondary-600"
            aria-label="Toggle language"
          >
            <Icon icon="mdi:translate" className="text-3xl transition-colors duration-200 group-hover:text-secondary-600" />
            <span className="text-lg transition-colors duration-200 group-hover:text-secondary-600">{language === "en" ? "اردو" : "English"}</span>
          </button>
          <a
            className="button group relative min-w-0 border border-transparent px-5 py-1.5 duration-200 hover:border-accent-400 hover:bg-transparent"
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            ref={cta}
            style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
          >
            <span className="relative w-fit">
              <span className="group-hover:text-black">{t.nav.joinWaitlist}</span>
            </span>
          </a>
        </nav>
      </div>
    </>
  );
}
