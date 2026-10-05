import { createSlice } from "@reduxjs/toolkit";

const galleryFiles = import.meta.glob(
  "../assets/gallery/*.{avif,gif,jpeg,jpg,png,webp,mov,mp4,ogv,webm}",
  {
    eager: true,
    import: "default",
  },
);

const galleryOrder = [
  "kapil.png",
  "installed-system.jpeg",
  "rishi.png",
  "Installed-site.jpeg",
  "virender.png",
  "installed-panel.jpeg",
  "manoj.jpeg",
  "panel.jpeg",
  "dilip.jpeg",
  "panel1.jpeg",
  "panel2.jpeg",
  "rahul.jpeg",
  "solar.jpeg",
  "structure.jpeg",
  "structure-setup.jpeg",
  "team.jpeg",
];

const galleryTitles = {
  "Installed-site.jpeg": "Project highlight 2",
  "dilip.jpeg": "Dilip",
  "installed-panel.jpeg": "Project highlight 3",
  "installed-system.jpeg": "Project highlight 1",
  "kapil.png": "Kapil",
  "manoj.jpeg": "Manoj",
  "panel.jpeg": "Solar panel",
  "panel1.jpeg": "Solar panel installation",
  "panel2.jpeg": "Solar panels",
  "rahul.jpeg": "Rahul",
  "rishi.png": "Rishi",
  "solar.jpeg": "Solar installation",
  "structure-setup.jpeg": "Solar structure setup",
  "structure.jpeg": "Solar mounting structure",
  "team.jpeg": "Supportive team",
  "virender.png": "Virender",
};

const images = Object.entries(galleryFiles)
  .map(([path, src]) => {
    const filename = path.split("/").pop();
    const title =
      Object.hasOwn(galleryTitles, filename)
        ? galleryTitles[filename]
        : filename
            .replace(/\.[^.]+$/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (character) => character.toUpperCase());

    const type = /\.(mov|mp4|ogv|webm)$/i.test(filename) ? "video" : "image";

    return { filename, src, title, type };
  })
  .sort((first, second) => {
    const firstOrder = galleryOrder.indexOf(first.filename);
    const secondOrder = galleryOrder.indexOf(second.filename);

    if (firstOrder !== -1 || secondOrder !== -1) {
      if (firstOrder === -1) return 1;
      if (secondOrder === -1) return -1;
      return firstOrder - secondOrder;
    }

    return first.filename.localeCompare(second.filename);
  })
  .map(({ src, title, type }) => ({ src, title, type }));

const gallerySlice = createSlice({
  name: "gallery",
  initialState: { images },
  reducers: {},
});

export default gallerySlice.reducer;
