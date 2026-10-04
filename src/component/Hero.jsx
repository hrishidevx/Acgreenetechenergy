import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Hero.css";
import winner from "../assets/acheivment/winner.png";
import winner1 from "../assets/acheivment/winner1.png";
import generation from "../assets/video/generation.mp4";
import kapil from "../assets/team/kapil.png";
import virender from "../assets/team/virender.png";
import rishi from "../assets/team/rishi.png";
import rahul from "../assets/team/rahul.jpeg";
import manoj from "../assets/team/manoj.jpeg";
import technician from "../assets/team/dilip.jpeg";
import team from "../assets/team/team.jpeg";

import HeroActions from "./HeroActions";
import { nextSlide, previousSlide } from "../store/sliderSlice";
import { useNavigate } from "react-router";

function Hero() {
  const teamMembers = [
    { image: kapil, role: "Director" },
    { image: virender, role: "Manager" },
    { image: rishi, role: "Accountant" },
    { image: rahul, role: "Accountant" },
    { image: manoj, role: "Sr. Technician" },
    { image: technician, role: "Technician" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slides = useSelector((state) => state.slider.slides);
  const activeSlide = useSelector((state) => state.slider.currentIndex);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      dispatch(nextSlide());
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [dispatch]);

  const handleclick = () => {
    navigate("/about");
  };

  return (
    <div>
      <div className="advertise relative h-[30rem] w-full pt-[2rem]">
      <div className="advertise-text advertise__badges absolute top-[28%] sm:top-[30%] left-4 sm:left-1/5 z-10 mb-6 flex flex-wrap items-center gap-2.5 sm:gap-4 text-center">
          <p className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-sm sm:text-base font-semibold text-slate-800 shadow-md backdrop-blur-md border border-slate-200/80 transition-all hover:bg-white hover:shadow-lg">
            <svg
              className="h-4 w-4 text-emerald-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Trusted</span>
          </p>
          <p className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-sm sm:text-base font-semibold text-slate-800 shadow-md backdrop-blur-md border border-slate-200/80 transition-all hover:bg-white hover:shadow-lg">
            <svg
              className="h-4 w-4 text-emerald-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Reliable</span>
          </p>
          <p className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-sm sm:text-base font-semibold text-slate-800 shadow-md backdrop-blur-md border border-slate-200/80 transition-all hover:bg-white hover:shadow-lg">
            <svg
              className="h-4 w-4 text-emerald-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Affordable</span>
          </p>
          <p className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-sm sm:text-base font-semibold text-slate-800 shadow-md backdrop-blur-md border border-slate-200/80 transition-all hover:bg-white hover:shadow-lg">
            <svg
              className="h-4 w-4 text-emerald-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Quality</span>
          </p>
        </div>
        <div className="advertise__heading absolute top-1/2 left-1/3 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5">
          <h1 className="text-xl ml-[3rem] font-bold leading-tight text-[#1039E3] sm:text-4xl lg:text-5xl Roboto-font">
            Multi Solar Company{" "}
            <span className="text-[#1039E3]">Distributor</span> in
            <span className="text-emerald-700">Gurgaon</span>
          </h1>

          <HeroActions />
        </div>
        <div className="solar" aria-live="off">
          <div className="solar__track">
            {slides.map((slide, index) => (
              <div
                className="solar__slide"
                key={slide.image}
                style={{
                  transform: `translateX(${(index - activeSlide) * 100}%)`,
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="solar__image"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="solar__arrow solar__arrow--previous"
            onClick={() => dispatch(previousSlide())}
            aria-label="Show previous solar image"
          >
            &#10094;
          </button>
          <button
            type="button"
            className="solar__arrow solar__arrow--next"
            onClick={() => dispatch(nextSlide())}
            aria-label="Show next solar image"
          >
            &#10095;
          </button>
        </div>
      </div>
      <div className="video">
        <div className="commercial">
          <h1>Commercial & Industrial Solution</h1>
          <p className="text-justify text-xl leading-relaxed text-[#70706E] ">
            Commercial and industrial energy storage systems reduce electricity
            costs, enhance power reliability, support the energy transition, and
            create new revenue streams. They enable peak-valley arbitrage,
            demand charge reduction, and provide emergency backup, while also
            increasing distributed PV utilization and promoting sustainable
            development.
          </p>
        </div>
        <video className="video__media" src={generation} autoPlay muted loop />
      </div>
      <section className="achievement" aria-labelledby="achievement-title">
        <div className="achievement__heading">
          <span className="achievement__eyebrow">
            A milestone we’re proud of
          </span>
          <h2 id="achievement-title">UTL Solar High Sales Performance Award</h2>
        </div>
        <div className="achievement__gallery">
          <figure className="achievement-card">
            <img
              src={winner}
              alt="Manju Wires, Gurgaon, recognized as an UTL Solar SPGS winner"
            />
          </figure>
          <figure className="achievement-card  ">
            <img
              src={winner1}
              alt="UTL Solar high sale performance award presented to Manju Wire"
            />
          </figure>
        </div>
      </section>
      <section className="bg-[#F2F5F4] px-4 py-6 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-center text-2xl font-bold leading-tight text-[#1039E3] sm:text-3xl lg:text-4xl Roboto-font">
            Best Solar Plant Installation Service in Gurugram
          </h1>
          <h4 className="mt-4 ml-12 mr-12 text-justify text-base leading-relaxed sm:text-lg">
            AC Greentech Energy is a trusted name in the solar energy industry,
            committed to providing reliable and sustainable solar panel
            solutions for homes, businesses, and industries. Our goal is to
            promote clean and renewable energy while helping customers reduce
            electricity costs and carbon footprints. With a team of skilled
            professionals and advanced technology, we offer high-quality solar
            panel installation, maintenance, and energy solutions tailored to
            meet the unique needs of every client. At AC Greentech Energy, we
            believe in building a greener future by making solar power
            accessible and affordable. Our services focus on efficiency,
            durability, and long-term performance, ensuring maximum energy
            generation from every solar system we install. Customer
            satisfaction, quality service, and eco-friendly innovation are at
            the core of our work.
          </h4>
          <p className="mt-4 ml-12 mr-12 text-justify text-sm leading-relaxed text-[#70706E] sm:text-base">
            Best Solar Plant Installation Service in Gurugram , Solar Power
            System Wholesalers in Gurugram , Best Solar System Distributors in
            Gurugram , Commercial Solar Panel Distributors in Gurugram , E
            Rickshaw Battery Distributors in Gurugram , Best Inverter Battery
            Distributors in Gurugram , Best Solar Panel Distributor UTL in
            Gurugram , Best Solar Inverter Distributors in Gurugram , Best Solar
            Rooftop Panel Distributors in Gurugram , Best Solar Repair and
            Service in Gurugram
          </p>
          <div className="mt-4 mr-12 flex justify-end">
            <button
              onClick={handleclick}
              className="rounded-md border border-green-700 bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 mt-[-2rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              View More
            </button>
          </div>
        </div>
      </section>
      <section className="team" aria-labelledby="team-title">
        <div className="team__heading">
          <span className="team__eyebrow">The people behind our work</span>
          <h2 id="team-title">Meet Our Team</h2>
        </div>
        <div className="team-img">
          {teamMembers.map(({ image, role }) => (
            <figure className="team-card" key={role}>
              <div className="team-card__photo">
                <img src={image} alt={role} />
              </div>
              <figcaption>{role}</figcaption>
            </figure>
          ))}
          <figure className="team-card team-card--wide team_img">
            <div className="team-card__photo ">
              <img src={team} alt="Supportive team" />
            </div>
            <figcaption>Supportive Team</figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}

export default Hero;
