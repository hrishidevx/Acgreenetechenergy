import { createSlice } from "@reduxjs/toolkit";
import solar1 from "../assets/solar/solar1.png";
import solar2 from "../assets/solar/solar2.jpeg";
import solar3 from "../assets/solar/solar3.jpeg";
import pcu from "../assets/solar/pcu.jpg";
import battery from "../assets/solar/battery.png";

const initialState = {
  slides: [
    {
      image: solar1,
      alt: "Residential and commercial solar energy storage solutions",
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
      image: solar3,
      alt: "Solar Installation",
    },
    {
      image: solar2,
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
