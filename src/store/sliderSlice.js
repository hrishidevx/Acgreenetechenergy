import { createSlice } from "@reduxjs/toolkit";
import solar1 from "../assets/solar/solar1.png";
import inverter from "../assets/solar/inverter.png";
import solar3 from "../assets/solar/solar3.png";
import pcu from "../assets/solar/pcu.jpg";
import battery from "../assets/solar/battery.png";
import industries from "../assets/solar/industries.jpeg";

const initialState = {
  slides: [
    {
      image: solar3,
      alt: "Residential and commercial solar energy storage solutions",
    },
    {
      image: inverter,
      alt: "utl Inverter Installed",
    },
    {
      image: pcu,
      alt: "UTL Solar SPGS award presented to Manju Wires, Gurgaon",
    },
    {
      image: battery,
      alt: "Lithium battery and pcu",
    },
    {
      image: solar1,
      alt: "Solar Installation",
    },
    {
      image: industries,
      alt: "Solar Installation",
    },
  ],
  currentIndex: 0,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    nextSlide: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.slides.length;
    },
    previousSlide: (state) => {
      state.currentIndex =
        (state.currentIndex - 1 + state.slides.length) % state.slides.length;
    },
  },
});

export const { nextSlide, previousSlide } = sliderSlice.actions;
export default sliderSlice.reducer;
