import solarPlant from "../assets/solar/solar1.png";
import solarHome from "../assets/solar/solar2.jpeg";
import solarInverter from "../assets/solar/pcu.jpg";
import solarBattery from "../assets/solar/battery.png";
import "./services.css";

const services = [
  {
    title: "On-Grid Solar Systems",
    description:
      "Grid-connected solar solutions for homes and businesses looking to generate power from rooftop solar panels.",
    image: solarHome,
    imageAlt: "Solar panels installed on a home's rooftop",
  },
  {
    title: "Hybrid Solar Systems",
    description:
      "Solar solutions that combine grid connectivity with battery storage to help support power needs when sunlight is unavailable.",
    image: solarBattery,
    imageAlt: "Solar power control unit and lithium battery",
  },
  {
    title: "Off-Grid Solar Systems",
    description:
      "Standalone solar and battery system options for properties that need power independent of the electricity grid.",
    image: solarPlant,
    imageAlt: "Solar panel array generating electricity",
  },
  {
    title: "Commercial & Industrial Solar",
    description:
      "Solar and energy storage solutions for commercial and industrial sites, planned around the requirements of the business.",
    image: solarPlant,
    imageAlt: "Large-scale solar plant for commercial and industrial use",
  },
  {
    title: "Solar Panels, Inverters & Batteries",
    description:
      "Supply of essential solar system products, including panels, inverters, power control units, and batteries.",
    image: solarInverter,
    imageAlt: "Solar inverter and battery equipment",
  },
  {
    title: "Solar Accessories & Electrical Components",
    description:
      "Solar accessories, cables, wires, and electrical components to support complete solar system installations.",
    image: solarBattery,
    imageAlt: "Solar power equipment with connected electrical cables",
  },
  {
    title: "Solar System Installation",
    description:
      "Professional installation for residential and commercial solar systems, with attention to product selection and workmanship.",
    image: solarHome,
    imageAlt: "Residential rooftop solar system",
  },
  {
    title: "Retail & Wholesale Supply",
    description:
      "Solar products and system components for individual customers, installers, and wholesale requirements.",
    image: solarInverter,
    imageAlt: "Solar power system components available for supply",
  },
];

function Services() {
  return (
    <main className="services-page">
      <header className="services-page__intro">
        <span className="services-page__eyebrow">
          AC Greentech Energy &amp; Manju Wires
        </span>
        <h1>Solar Services &amp; Solutions</h1>
        <p>
          Explore solar systems, products, installation, and supply for homes
          and businesses in Gurugram. We can help you find a solution to suit
          your energy needs.
        </p>
      </header>

      <section className="services-page__grid" aria-label="Solar services">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <img
              className="service-card__image"
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
            />
            <div className="service-card__content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Services;
