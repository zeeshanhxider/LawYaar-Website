export default function Heading({ title }) {
  return (
    <>
      <div className="section-heading select-none">
        <div className="heading flex translate-y-56 items-center justify-center">
          <h2 className="w-fit text-5xl font-medium uppercase text-secondary-600 sm:text-7xl">
            {title}
          </h2>
        </div>
      </div>
    </>
  );
}
