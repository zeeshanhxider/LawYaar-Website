import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { useTranslation } from "../../utils/TranslationContext";
import Heading from "../ui/Heading";

export default function Waitlist() {
  const { t } = useTranslation();
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
    if (!form.name.trim()) newErrors.name = t.waitlist.nameError;
    if (!form.whatsapp.trim())
      newErrors.whatsapp = t.waitlist.whatsappError;
    else if (!validateWhatsApp(form.whatsapp))
      newErrors.whatsapp = t.waitlist.whatsappInvalidError;
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
      <Heading title={t.waitlist.heading} />
      <div
        ref={contactSection}
        className="mt-3 flex flex-col items-center text-center"
      >
        <div className="max-w-2xl">
          <p
            ref={body}
            className="mt-6 translate-y-10 text-body-1 opacity-0 2xl:text-3xl"
          >
            {t.waitlist.description}
          </p>
          <form
            name="waitlist"
            autoComplete="off"
            className="mx-auto mt-10 w-full max-w-md font-grotesk"
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
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-left focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  {t.waitlist.nameLabel}
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
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-left focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="whatsapp"
                  className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-accent-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                >
                  {t.waitlist.whatsappLabel}
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
              className="button group mx-auto mt-12 block min-w-0 border border-transparent px-4 py-1.5 duration-200 hover:border-accent-400 hover:bg-transparent"
              style={{ backgroundColor: "#5E862B", color: "#F2F2F2" }}
              disabled={submitting}
            >
              <span className="relative w-fit">
                <span className="group-hover:text-accent-400">
                  {submitting ? t.waitlist.joiningButton : t.waitlist.joinButton}
                </span>
              </span>
            </button>
            {success && (
              <div className="mt-8 font-semibold" style={{ color: "#5E862B" }}>
                {t.waitlist.successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
