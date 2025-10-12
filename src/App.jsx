import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "./context/TranslationContext";

import NavBar from "./components/ui/NavBar";
import Hero from "./components/homepage/Hero";
import Problem from "./components/homepage/Problem";
import Solution from "./components/homepage/Solution";
import Impact from "./components/homepage/Impact";
import Pricing from "./components/homepage/Pricing";
import Waitlist from "./components/homepage/Waitlist";
import Associates from "./components/homepage/Associates";
import Footer from "./components/ui/Footer";

const App = () => {
  gsap.registerPlugin(ScrollTrigger);
  const { language } = useTranslation();
  const sectionRefs = useRef([]);

  const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
      // Setup ScrollTrigger for section headings
      const sectionHeadings = document.querySelectorAll(".section-heading");
      const triggers = [];

      sectionHeadings.forEach((heading) => {
        const headings = heading.querySelectorAll(".heading");

        headings.forEach((individualHeading) => {
          const trigger = ScrollTrigger.create({
            trigger: heading,
            start: "top 550px",
            end: "bottom 550px",
            animation: gsap.to(individualHeading, {
              opacity: 1,
              y: 0,
              ease: "power4.out",
              duration: 1,
            }),
            toggleActions: "play none none none",
          });
          triggers.push(trigger);
        });
      });

      ScrollTrigger.refresh();

      // Cleanup function to kill all triggers when component unmounts
      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, []);

    useEffect(() => {
      // Handle hash navigation when page loads
      if (location.hash) {
        setTimeout(() => {
          const element = document.querySelector(location.hash);
          if (element) {
            const navbarHeight = 60;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }, [location]);

    return (
      <>
        <Hero />
        <main className="px-5 md:px-10 xl:px-20 2xl:px-28">
          <Problem forwardedRef={(el) => (sectionRefs.current[0] = el)} />{" "}
          {/* forwardedRef props to pass into the child component to access the ref, then this will go into the useRef array  */}
          <Solution />
          <Impact />
          <Pricing forwardedRef={(el) => (sectionRefs.current[1] = el)} />
          <Waitlist />
        </main>
      </>
    );
  };

  return (
    <BrowserRouter>
      <div 
        className={`bg-secondary-100 ${language === "ur" ? "font-urdu" : ""}`}
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        <NavBar sectionRefs={sectionRefs.current} />{" "}
        {/* passing sectionRefs props to give access to Navbar, Navbar can then access the props which have access to the array of sectionRef and loop over it */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/associates" element={<Associates />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
