import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallerySlice";
import sliderReducer from "./sliderSlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    slider: sliderReducer,
  },
});
