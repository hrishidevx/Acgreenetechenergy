import "./footer.css";

const services = [
  "On-grid solar systems",
  "Hybrid solar systems",
  "Off-grid solar systems",
  "Solar accessories",
];

const phoneNumbers = ["9310490600", "9310490500"];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <div>
          <h2 className="site-footer__brand">AC Greentech Energy</h2>
          <h2 className="site-footer__brand">Manju Wires</h2>

          <p className="site-footer__description">
            Solar solutions for a brighter, more sustainable future.
          </p>
        </div>

        <div>
          <h2 className="site-footer__heading">Our Services</h2>
          <ul className="site-footer__list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Contact Us</h2>
          <ul className="site-footer__list">
            {phoneNumbers.map((phoneNumber) => (
              <li key={phoneNumber}>
                <a className="site-footer__link" href={`tel:+91${phoneNumber}`}>
                  {phoneNumber}
                </a>
              </li>
            ))}
            <li>
              <a
                className="site-footer__link site-footer__link--email"
                href="mailto:acgreentechenergy@gmail.com"
              >
                acgreentechenergy@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__copyright">
        © {new Date().getFullYear()} AC Greentech Energy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
