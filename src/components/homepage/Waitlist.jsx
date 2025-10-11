import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";

export default function Waitlist() {
  const [form, setForm] = useState({ name: "", whatsapp: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const heading = useRef(null);
  const body = useRef(null);
  const contactSection = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: contactSection.current,
      start: "180px bottom",

      // markers: true,
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
        ),

      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [contactSection]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validateWhatsApp(number) {
    return /^(\+92|0)?3[0-9]{9}$/.test(number.replace(/\s/g, ""));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.whatsapp.trim())
      newErrors.whatsapp = "WhatsApp number is required.";
    else if (!validateWhatsApp(form.whatsapp))
      newErrors.whatsapp = "Please enter a valid Pakistani WhatsApp number.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 5000);
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xovnveoy", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSuccess(true);
        setForm({ name: "", whatsapp: "" });
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
    <section
      id="contact"
      className="my-[10%] overflow-hidden"
      aria-label="waitlist"
    >
      <Heading title="Join Waitlist" />
      <div
        ref={contactSection}
        className="mt-10 flex flex-col items-center text-center"
      >
        <div className="max-w-2xl">
          <h3
            ref={heading}
            className="translate-y-10 text-heading-3 font-semibold leading-tight opacity-0 2xl:text-7xl"
          >
            Be among the first to use LawYaar.
          </h3>
          <p
            ref={body}
            className="mt-6 translate-y-10 text-body-1 opacity-0 2xl:text-3xl"
          >
            Enter your name and WhatsApp number to get early access when we
            launch.
          </p>
          <form
            name="waitlist"
            autoComplete="off"
            className="mt-10 w-full max-w-md font-grotesk"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8">
              <div className="relative z-0">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-center focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-1/2 top-3 -z-10 origin-[0] -translate-x-1/2 -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-1/2 peer-focus:-translate-x-1/2 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  Your Name
                </label>
                {errors.name && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-center focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="whatsapp"
                  className="absolute left-1/2 top-3 -z-10 origin-[0] -translate-x-1/2 -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-1/2 peer-focus:-translate-x-1/2 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  WhatsApp Number (e.g., 03001234567)
                </label>
                {errors.whatsapp && (
                  <span className="absolute -bottom-6 left-0 text-sm text-red-500">
                    {errors.whatsapp}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="button group mt-12 w-full border duration-200 hover:border-accent-400 hover:bg-transparent"
              style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
              disabled={submitting}
            >
              <span className="relative">
                <span className="group-hover:text-accent-400">
                  {submitting ? "Joining..." : "Join Waitlist"}
                </span>
              </span>
            </button>
            {success && (
              <div className="mt-4 font-semibold text-green-600">
                Welcome to the waitlist! We'll contact you soon on WhatsApp.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
