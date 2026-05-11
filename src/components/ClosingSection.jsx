import React, { useEffect, useRef } from 'react';
import FloatingParticles from './FloatingParticles';

export default function ClosingSection() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    refs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="closing-section" id="closing">
      <FloatingParticles count={25} />

      <div
        className="closing-emoji reveal"
        ref={el => refs.current[0] = el}
      >
        🎂
      </div>

      <h2
        className="closing-title reveal"
        ref={el => refs.current[1] = el}
        style={{ transitionDelay: '0.15s' }}
      >
        Here's to you,<br />my forever love
      </h2>

      <p
        className="closing-message reveal"
        ref={el => refs.current[2] = el}
        style={{ transitionDelay: '0.3s' }}
      >
        May every wish you make today come true. May this year be filled with joy, laughter,
        and all the beautiful things you deserve. You are so deeply, endlessly loved, Winuu. 🌸💗
      </p>

      <p
        className="closing-from reveal"
        ref={el => refs.current[3] = el}
        style={{ transitionDelay: '0.45s' }}
      >
        With all my love 💌
      </p>

      <div
        className="reveal"
        ref={el => refs.current[4] = el}
        style={{ transitionDelay: '0.6s', fontSize: '2.5rem', letterSpacing: '0.2em' }}
      >
        💗 🌷 ✨ 🌸 💫 🌟 💜
      </div>
    </section>
  );
}
