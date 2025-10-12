import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../ui/Heading";
import lawFirmIllustration from "../../assets/illustrations/law-firm.png";

export default function Associates() {
  const [form, setForm] = useState({
    organization: "",
    email: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Setup animations for headings
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateContact(number) {
    return /^(\+92|0)?3[0-9]{9}$/.test(number.replace(/\s/g, ""));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!form.organization.trim())
      newErrors.organization = "Organization name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(form.email))
      newErrors.email = "Please enter a valid email address.";
    if (!form.contact.trim()) newErrors.contact = "Contact number is required.";
    else if (!validateContact(form.contact))
      newErrors.contact = "Please enter a valid Pakistani contact number.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mjkaanle", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          _subject: "Law Firm Partnership Inquiry",
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setForm({ organization: "", email: "", contact: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setSuccess(false);
      }
    } catch (err) {
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen px-5 pb-16 pt-16 md:px-10 md:pt-20 xl:px-20 2xl:px-28">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-serif text-4xl font-bold text-accent-300 md:text-4xl lg:text-5xl">
          Partner with LawYaar
        </h1>
        <p className="mx-auto mt-2 max-w-3xl text-sm text-accent-300 md:text-base">
          Thousands reach out to LawYaar daily for legal help. While we provide
          initial guidance, many users need professional representation — this
          is where your firm comes in. Expand your reach, connect with clients,
          and access cutting-edge legal research tools.
        </p>
      </div>

      {/* Law Firm Illustration */}
      <div className="mx-auto -mt-20 mb-16 max-w-xl md:max-w-xl">
        <img
          src={lawFirmIllustration}
          alt="Law Firm Partnership"
          className="w-full"
        />
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-4xl space-y-12">
        {/* What We Offer */}
        <div>
          <Heading title="What We Offer" />

          <div className="mt-8 space-y-8">
            {/* Client Referrals */}
            <div className="rounded-lg bg-primary-200 p-8">
              <div className="mb-3 flex items-center gap-3">
                <Icon
                  icon="mdi:account-group"
                  className="text-3xl text-secondary-600"
                />
                <h3 className="font-serif text-xl font-bold text-accent-300 md:text-2xl">
                  1. Client Referrals
                </h3>
              </div>
              <p className="text-body-2 leading-relaxed text-accent-300">
                We direct users who need professional advice or representation
                to our partner law firms. You get visibility where real legal
                demand exists — helping clients who are already pre-screened and
                looking for help in your domain.
              </p>
            </div>

            {/* Lawyer & Firm Promotion */}
            <div className="rounded-lg bg-primary-200 p-8">
              <div className="mb-3 flex items-center gap-3">
                <Icon
                  icon="mdi:office-building"
                  className="text-3xl text-secondary-600"
                />
                <h3 className="font-serif text-xl font-bold text-accent-300 md:text-2xl">
                  2. Lawyer & Firm Promotion
                </h3>
              </div>
              <p className="text-body-2 leading-relaxed text-accent-300">
                Your firm and individual lawyers can be featured directly within
                LawYaar, allowing users to view verified lawyer profiles,
                practice areas, and contact details. This helps build trust and
                increases direct engagement from clients.
              </p>
            </div>

            {/* Custom Research Access */}
            <div className="rounded-lg bg-primary-200 p-8">
              <div className="mb-3 flex items-center gap-3">
                <Icon
                  icon="mdi:magnify"
                  className="text-3xl text-secondary-600"
                />
                <h3 className="font-serif text-xl font-bold text-accent-300 md:text-2xl">
                  3. Custom Research Access
                </h3>
              </div>
              <p className="mb-4 text-body-2 leading-relaxed text-accent-300">
                We provide a dedicated, research-grade version of LawYaar for
                legal professionals and firms. This includes:
              </p>
              <ul className="ml-6 space-y-2 text-body-2 text-accent-300">
                <li className="flex items-start">
                  <Icon
                    icon="mdi:check-circle"
                    className="mr-2 mt-0.5 flex-shrink-0 text-xl text-secondary-600"
                  />
                  <span>Access to our AI-powered legal search tool</span>
                </li>
                <li className="flex items-start">
                  <Icon
                    icon="mdi:check-circle"
                    className="mr-2 mt-0.5 flex-shrink-0 text-xl text-secondary-600"
                  />
                  <span>
                    Retrieval from verified law sources (e.g., Supreme Court
                    judgments, federal/provincial acts)
                  </span>
                </li>
                <li className="flex items-start">
                  <Icon
                    icon="mdi:check-circle"
                    className="mr-2 mt-0.5 flex-shrink-0 text-xl text-secondary-600"
                  />
                  <span>Secure firm-specific data integration (optional)</span>
                </li>
              </ul>
            </div>

            {/* Custom Integration */}
            <div className="rounded-lg bg-primary-200 p-8">
              <div className="mb-3 flex items-center gap-3">
                <Icon icon="mdi:cog" className="text-3xl text-secondary-600" />
                <h3 className="font-serif text-xl font-bold text-accent-300 md:text-2xl">
                  4. Custom Integration
                </h3>
              </div>
              <p className="mb-4 text-body-2 leading-relaxed text-accent-300">
                Connect LawYaar with your firm's internal systems for a seamless
                workflow. This includes:
              </p>
              <ul className="ml-6 space-y-2 text-body-2 text-accent-300">
                <li className="flex items-start">
                  <Icon
                    icon="mdi:check-circle"
                    className="mr-2 mt-0.5 flex-shrink-0 text-xl text-secondary-600"
                  />
                  <span>Integration with your firm's knowledge base</span>
                </li>
                <li className="flex items-start">
                  <Icon
                    icon="mdi:check-circle"
                    className="mr-2 mt-0.5 flex-shrink-0 text-xl text-secondary-600"
                  />
                  <span>CRM system integration for client management</span>
                </li>
                <li className="flex items-start">
                  <Icon
                    icon="mdi:check-circle"
                    className="mr-2 mt-0.5 flex-shrink-0 text-xl text-secondary-600"
                  />
                  <span>Analytics dashboards with engagement insights</span>
                </li>
                <li className="flex items-start">
                  <Icon
                    icon="mdi:check-circle"
                    className="mr-2 mt-0.5 flex-shrink-0 text-xl text-secondary-600"
                  />
                  <span>Tracking of legal topics and demand areas</span>
                </li>
              </ul>
              <p className="mt-4 text-body-2 italic text-accent-300">
                Pricing is customized based on your firm's scale, usage needs,
                and level of integration.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-24">
          <Heading title="Contact Us" />
          <div className="mx-auto mt-8 max-w-2xl">
            <form
              name="law-firm-contact"
              autoComplete="off"
              className="space-y-8 font-grotesk"
              method="POST"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Organization */}
              <div className="relative z-0">
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-left focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="organization"
                  className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  Organization Name
                </label>
                {errors.organization && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.organization}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="relative z-0">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-left focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  Email Address
                </label>
                {errors.email && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Contact */}
              <div className="relative z-0">
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-left focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="contact"
                  className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  Contact Number
                </label>
                {errors.contact && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.contact}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="relative z-0">
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-left focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  Message
                </label>
                {errors.message && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="button group mx-auto mt-12 block min-w-0 border border-transparent px-4 py-1.5 duration-200 hover:border-accent-400 hover:bg-transparent"
                style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
                disabled={submitting}
              >
                <span className="relative w-fit">
                  <span className="group-hover:text-accent-400">
                    {submitting ? "Sending..." : "Submit"}
                  </span>
                </span>
              </button>

              {success && (
                <div
                  className="mt-8 text-center font-semibold"
                  style={{ color: "#5E862B" }}
                >
                  Thank you for your interest! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
