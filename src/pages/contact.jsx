import HeroActions from "../component/HeroActions";
import "./contact.css";

const contactNumbers = ["9310490600", "9310490500", "7290066600"];

function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-card" aria-labelledby="contact-title">
        <span className="contact-card__eyebrow">Get in touch</span>
        <h1 id="contact-title">Contact Details</h1>
        <p className="contact-card__intro">
          Reach AC Greentech Energy &amp; Manju Wires for solar products,
          installation, and support.
        </p>

        <dl className="contact-details">
          <div className="contact-details__item">
            <dt>Business</dt>
            <dd>AC Greentech Energy &amp; Manju Wires</dd>
          </div>
          <div className="contact-details__item">
            <dt>Contact numbers</dt>
            <dd className="contact-details__phones">
              {contactNumbers.map((number) => (
                <a href={`tel:${number}`} key={number}>
                  {number}
                </a>
              ))}
            </dd>
          </div>
          <div className="contact-details__item">
            <dt>Address</dt>
            <dd>FF 416/16, Sant Ravidas Marg, Nai Basti, Gurugram - 122001</dd>
          </div>
          <div className="contact-details__item">
            <dt>GST number</dt>
            <dd>06BPCPS2896J1ZC - Ac Greentech Energy</dd>
            <dd>06AYHPS6363H1Z1 - Manju Wires</dd>
          </div>
        </dl>
        <div className="mt-[0.5rem] pt-[1rem]">
          <HeroActions />
        </div>
      </section>
    </main>
  );
}

export default Contact;
