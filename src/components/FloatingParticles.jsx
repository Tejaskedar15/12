import React, { useEffect, useRef } from 'react';

const EMOJIS = ['💗', '✨', '🌸', '💫', '🌷', '⭐', '💕', '🌟', '🦋', '🌺'];

export default function FloatingParticles({ count = 18 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = Array.from({ length: count }, (_, i) => {
      const el = document.createElement('span');
      el.className = 'particle';
      el.textContent = EMOJIS[i % EMOJIS.length];
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDuration = `${Math.random() * 12 + 10}s`;
      el.style.animationDelay = `${Math.random() * 10}s`;
      el.style.fontSize = `${Math.random() * 14 + 16}px`;
      el.style.opacity = '0';
      container.appendChild(el);
      return el;
    });

    return () => particles.forEach(p => p.remove());
  }, [count]);

  return <div className="particles-container" ref={containerRef} />;
}
