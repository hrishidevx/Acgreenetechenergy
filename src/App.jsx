import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import About from "./pages/about";
import Contact from "./pages/contact";
import Services from "./pages/services";
import Gallery from "./pages/Gallery";
import { store } from "./store/store";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <SpeedInsights />
      </div>
    </Provider>
  );
}

export default App;
