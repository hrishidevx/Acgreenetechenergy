import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../assets/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <header className="Roboto-font sticky top-0 z-50 flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-2 bg-sky-100 text-[#1039E3] shadow-sm pl-[2rem] pr-[1rem]">
      <Link to="/" aria-label="AC Greentech Energy home" className="shrink-0">
        <img
          src={logo}
          alt="AC Greentech Energy"
          className="h-[6rem] object-contain"
        />
      </Link>
      <button
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
        className="p-2 md:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-8 w-8"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={`${isMenuOpen ? "flex" : "hidden"} order-3 w-full md:order-none md:flex md:w-auto`}
      >
        <ul
          className="flex w-full flex-col items-center gap-4 py-2 text-2xl md:w-auto md:flex-row md:justify-center md:gap-8 md:py-0 md:text-3xl"
        >
          <li className="link">
            <NavLink
              to="/"
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-red-600" : "")}
            >
              Home
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-red-600" : "")}
            >
              About
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-red-600" : "")}
            >
              Services
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-red-600" : "")}
            >
              Gallery
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-red-600" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="tangerine-font hidden shrink-0 bg-green-600 px-4 py-3 text-center text-white md:block">
        <h3 className="text-2xl font-bold">Contact No.</h3>
        <h4 className="whitespace-nowrap text-xl">9310490600 / 7290066600</h4>
      </div>
    </header>
  );
}

export default Navbar;
