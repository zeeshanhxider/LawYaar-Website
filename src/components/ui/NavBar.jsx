import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarSVG from "./NavbarSVG";
import { Squash as Hamburger } from "hamburger-react";
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
              LawYaar
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
              LawYaar
            </h1>
          </a>
          <nav className=" space-x-7 font-grotesk text-body-3 sm:block">
            <a
              href="#hero"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#hero")}
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#about")}
            >
              <span>About</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="#services"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#services")}
            >
              <span>Impact</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a
              href="#works"
              className="group relative hidden md:inline-block"
              onClick={(e) => handleSmoothScroll(e, "#works")}
            >
              <span>Pricing</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <button
              onClick={() => navigate("/associates")}
              className="group relative hidden md:inline-block"
            >
              <span>For Law Firms</span>
              <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
            </button>
            <a
              ref={cta}
              className="button group relative mt-10 min-w-0 border border-transparent px-4 py-1.5 duration-200 hover:border-accent-400 hover:bg-transparent"
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
            >
              <span className="relative w-fit">
                <span className="group-hover:text-black">Join Waitlist</span>
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
            <span>Home</span>
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "#about")}
            className="hb-text"
          >
            <span>About</span>
          </a>
          <a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, "#services")}
            className="hb-text"
          >
            <span>Impact</span>
          </a>
          <a
            href="#works"
            onClick={(e) => handleSmoothScroll(e, "#works")}
            className="hb-text"
          >
            <span>Pricing</span>
          </a>
          <button onClick={() => navigate("/associates")} className="hb-text">
            <span>For Law Firms</span>
          </button>
          <a
            className="button group relative mt-4 min-w-0 border border-transparent px-5 py-1.5 duration-200 hover:border-accent-400 hover:bg-transparent"
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            ref={cta}
            style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
          >
            <span className="relative w-fit">
              <span className="group-hover:text-black">Join Waitlist</span>
            </span>
          </a>
        </nav>
      </div>
    </>
  );
}
