import React, { useState, useEffect, useRef } from 'react';

const SPARKLE_CHARS = ['✦', '✧', '⋆', '˚', '·', '✿', '❀'];

export default function CursorSparkle() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      posRef.current = { x, y };

      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top  = y + 'px';
      }

      // spawn sparkle
      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      sparkle.textContent = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
      sparkle.style.left = x + 'px';
      sparkle.style.top  = y + 'px';
      sparkle.style.color = `hsl(${Math.random() * 60 + 300}, 80%, 70%)`;
      sparkle.style.fontSize = `${Math.random() * 10 + 10}px`;
      sparkle.style.animationDuration = `${Math.random() * 400 + 500}ms`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 900);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div className="custom-cursor" ref={cursorRef} />;
}
