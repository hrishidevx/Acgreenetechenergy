import { createSlice } from "@reduxjs/toolkit";
import projectImage1 from "../assets/gallery/installed-system.jpeg";
import projectImage2 from "../assets/gallery/Installed-site.jpeg";
import projectImage3 from "../assets/gallery/installed-panel.jpeg";
import panelImage1 from "../assets/gallery/panel.jpeg";
import panelImage2 from "../assets/gallery/panel1.jpeg";
import panelImage3 from "../assets/gallery/panel2.jpeg";
import structureImage from "../assets/gallery/structure.jpeg";
import structureSetupImage from "../assets/gallery/structure-setup.jpeg";
import virender from "../assets/gallery/virender.png";
import team from "../assets/gallery/team.jpeg";
import solar from "../assets/gallery/solar.jpeg";
import rishi from "../assets/gallery/rishi.png";
import rahul from "../assets/gallery/rahul.jpeg";
import manoj from "../assets/gallery/manoj.jpeg";
import kapil from "../assets/gallery/kapil.png";
import dilip from "../assets/gallery/dilip.jpeg";

const images = [
  { src: kapil, title: "Kapil" },
  { src: projectImage1, title: "Project highlight 1" },
  { src: rishi, title: "Rishi" },
  { src: projectImage2, title: "Project highlight 2" },
  { src: virender, title: "Virender" },
  { src: projectImage3, title: "Project highlight 3" },
  { src: manoj, title: "Manoj" },
  { src: panelImage1, title: "Solar panel" },
  { src: dilip, title: "Dilip" },
  { src: panelImage2, title: "Solar panel installation" },
  { src: panelImage3, title: "Solar panels" },
  { src: rahul, title: "Rahul" },
  { src: solar, title: "Solar installation" },
  { src: structureImage, title: "Solar mounting structure" },
  { src: structureSetupImage, title: "Solar structure setup" },
  { src: team, title: "Supportive team" },
];

const gallerySlice = createSlice({
  name: "gallery",
  initialState: { images },
  reducers: {},
});

export default gallerySlice.reducer;
