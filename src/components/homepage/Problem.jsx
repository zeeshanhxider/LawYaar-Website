import { useTranslation } from "../../utils/TranslationContext";

export default function Problem({ forwardedRef }) {
  const { t } = useTranslation();

  return (
    <section
      ref={forwardedRef}
      id="about"
      className="nav-change my-[20%] flex select-none flex-col items-center justify-center overflow-hidden py-10 md:my-[12%]"
      aria-label="problem section"
    >
      <div className="flex w-full flex-col items-center space-y-8 text-center">
        <h2 className="text-heading-2 font-bold leading-tight text-accent-300">
          {t.problem.title}{" "}
          <span className="font-[inherit] text-secondary-600">{t.problem.titleHighlight1}</span> {t.problem.titleAnd}{" "}
          <span className="font-[inherit] text-secondary-600">{t.problem.titleHighlight2}</span>
        </h2>
        <p className="max-w-4xl text-body-1 text-accent-300 md:leading-relaxed">
          {t.problem.descriptionBegin}{" "}
          <span className="font-semibold text-secondary-600">
            {t.problem.descriptionHighlight}
          </span>{" "}
          {t.problem.descriptionEnd}
        </p>
      </div>
    </section>
  );
}
