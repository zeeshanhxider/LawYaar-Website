export default function Problem({ forwardedRef }) {
  return (
    <section
      ref={forwardedRef}
      id="about"
      className="nav-change my-[20%] flex select-none flex-col items-center justify-center overflow-hidden py-10 md:my-[12%]"
      aria-label="problem section"
    >
      <div className="flex w-full flex-col items-center space-y-8 text-center">
        <h2 className="text-heading-2 font-bold leading-tight text-primary-200">
          Legal help is hard to{" "}
          <span className="font-[inherit] text-secondary-600">find</span> — and
          even harder to{" "}
          <span className="font-[inherit] text-secondary-600">afford</span>
        </h2>
        <p className="max-w-4xl text-body-1 text-primary-200 md:leading-relaxed">
          Millions of Pakistanis face legal problems every year, but most can't
          afford a lawyer or don't know where to start. LawYaar changes that —
          making verified legal guidance just a{" "}
          <span className="font-semibold text-secondary-600">
            WhatsApp message
          </span>{" "}
          away.
        </p>
      </div>
    </section>
  );
}
