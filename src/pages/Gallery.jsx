import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./gallery.css";

function Gallery() {
  const galleryImages = useSelector((state) => state.gallery.images);
  const [activeIndex, setActiveIndex] = useState(null);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  }, [galleryImages.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );
  }, [galleryImages.length]);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, showNext, showPrevious]);

  return (
    <main className="gallery-page">
      <section className="gallery-intro" aria-labelledby="gallery-title">
        <span className="gallery-intro__eyebrow">Our work in pictures</span>
        <h1 id="gallery-title">Solar Projects &amp; Moments</h1>
        <p>
          Explore our installations, team, and the people and projects powering
          a brighter future.
        </p>
      </section>

      <section className="gallery-grid" aria-label="Photo gallery">
        {galleryImages.map(({ src, title, type }, index) => (
          <button
            className="gallery-tile"
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${title}, ${type} ${index + 1} of ${galleryImages.length}`}
          >
            {type === "video" ? (
              <video src={src} muted playsInline preload="metadata" />
            ) : (
              <img src={src} alt={title} loading="lazy" />
            )}
            <span className="gallery-tile__caption">
              <span className="gallery-tile__open" aria-hidden="true">
                {type === "video" ? "Play video" : "View image"} <span>↗</span>
              </span>
            </span>
          </button>
        ))}
      </section>

      {activeIndex !== null && (
        <div
          className="gallery-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery viewer"
          onClick={() => setActiveIndex(null)}
        >
          <button
            className="gallery-viewer__close"
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image viewer"
          >
            &times;
          </button>
          <button
            className="gallery-viewer__arrow gallery-viewer__arrow--previous"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Show previous image"
          >
            &#10094;
          </button>
          <figure
            className="gallery-viewer__content"
            onClick={(event) => event.stopPropagation()}
          >
            {galleryImages[activeIndex].type === "video" ? (
              <video
                key={galleryImages[activeIndex].src}
                src={galleryImages[activeIndex].src}
                autoPlay
                controls
                playsInline
              />
            ) : (
              <img
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].title}
              />
            )}
            <figcaption>
              <span>{galleryImages[activeIndex].title}</span>
              <span>
                {activeIndex + 1} / {galleryImages.length}
              </span>
            </figcaption>
          </figure>
          <button
            className="gallery-viewer__arrow gallery-viewer__arrow--next"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Show next image"
          >
            &#10095;
          </button>
        </div>
      )}
    </main>
  );
}

export default Gallery;
