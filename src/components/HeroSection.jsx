import React from 'react';
import FloatingParticles from './FloatingParticles';

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <FloatingParticles count={22} />

      <div className="hero-content">
        <div className="hero-image-wrapper reveal">
          <img src="/gallery_1.jpeg" alt="Winuu" className="hero-profile-image" />
          <div className="hero-profile-glow"></div>
        </div>

        <p className="hero-label">✨ A special day for a special soul ✨</p>

        <h1 className="hero-title">Happy Birthday</h1>

        <h2 className="hero-name">Winuu</h2>

        <p className="hero-tagline">
          Today the whole universe pauses to celebrate the most beautiful person in my world —
          you, my love. 🌸
        </p>

        <p className="hero-date">May 12th · A day made of magic</p>
      </div>

      <div className="scroll-hint">
        <span>scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
