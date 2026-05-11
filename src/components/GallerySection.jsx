import React, { useState, useEffect, useRef } from 'react';

const PHOTOS = [
  { src: '/gallery_1.jpeg' },
  { src: '/gallery_2.jpeg' },
  { src: '/gallery_3.jpeg' },
  { src: '/gallery_4.jpeg' },
  { src: '/gallery_5.jpeg' },
  { src: '/gallery_6.jpeg' },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);
  const headingRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    itemRefs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-inner">
        <h2 className="section-heading reveal" ref={headingRef}>Our Memories ✨</h2>

        <div className="gallery-grid">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="gallery-item reveal"
              ref={el => itemRefs.current[i] = el}
              style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={() => setLightbox(photo)}
              role="button"
              tabIndex={0}
              aria-label="View memory"
              onKeyDown={e => e.key === 'Enter' && setLightbox(photo)}
            >
              <img src={photo.src} alt="Memory" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Photo lightbox"
        >
          <button className="lightbox-close" aria-label="Close lightbox">✕</button>
          <img
            className="lightbox-img"
            src={lightbox.src}
            alt="Memory"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
