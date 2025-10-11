import ServiceUi from "../ui/ServiceUi";
import Heading from "../ui/Heading";

export default function Services() {
  const impactStats = ["Accessible", "Affordable", "Verified", "Multilingual"];

  const audienceItems = [
    "Tenants",
    "Students",
    "Farmers",
    "Small Business Owners",
  ];

  return (
    <section id="services" className="my-[15%]" aria-label="impact">
      <Heading title="Our Impact" />
      <div className="space-y-14">
        <ServiceUi
          title="Empowering every Pakistani — from Karachi to Khuzdar."
          description="LawYaar bridges the gap between the people and the law. Whether you're a tenant, student, or farmer — you deserve legal clarity. We're making justice accessible to everyone, regardless of income or location."
          items={impactStats}
        />
        <ServiceUi
          title="Built for the people who need it most."
          description="Our mission is to serve those who face legal challenges without the means to hire expensive lawyers. From understanding tenant rights to navigating business regulations, LawYaar is here to help every Pakistani make informed decisions."
          items={audienceItems}
        />
      </div>
    </section>
  );
}
