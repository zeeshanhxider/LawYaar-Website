export default function Heading({ title }) {
  return (
    <>
      <div className="section-heading select-none">
        <div className="heading flex translate-y-56 items-center justify-center pb-2">
          <h2 className="w-fit pb-1 text-5xl font-medium uppercase leading-tight text-secondary-600 sm:pb-2 sm:text-7xl">
            {title}
          </h2>
        </div>
      </div>
    </>
  );
}
