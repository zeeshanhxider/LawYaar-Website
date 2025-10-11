export default function Role({ forwardedRef }) {
  return (
    <section
      ref={forwardedRef}
      id="about"
      className="nav-change my-[20%] flex select-none flex-col items-center justify-center overflow-hidden py-10 md:my-[12%]"
      aria-label="problem section"
    >
      <div className="flex w-full flex-col items-center space-y-8 text-center">
        <h2 className="text-heading-2 font-bold leading-tight text-accent-300">
          Legal help is hard to find — and even harder to afford.
        </h2>
        <p className="max-w-4xl text-body-1 text-accent-300 md:leading-relaxed">
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
