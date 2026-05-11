import React, { useEffect, useRef } from 'react';

export default function LoveLetterSection() {
  const headingRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="letter-section" id="letter">
      <div className="section-inner">
        <h2 className="section-heading reveal" ref={headingRef}>A Letter For You</h2>

        <div className="glass-card letter-card reveal" ref={cardRef} style={{ transitionDelay: '0.2s' }}>
          <p className="letter-salutation">My dearest Winuu,</p>

          <div className="letter-body">
            <p>
              On this magical day, I want you to know just how extraordinary you are. The way your eyes
              light up when you laugh, the warmth you carry in your heart, and the quiet strength you
              show every single day — it's all breathtaking to me. 🌸
            </p>
            <p>
              From all our little moments — every inside joke, every shared silence, every late-night
              conversation — you've made my world so much brighter and fuller than I ever thought
              possible. You are someone truly rare, Winuu.
            </p>
            <p>
              Today is yours. Every candle flame, every petal, every star in the sky — they're all
              celebrating the masterpiece that is you. I hope this birthday feels as beautiful as you
              make everything around you feel. 💫
            </p>
            <p>
              No matter where life takes us, know that I will always be right here, grateful for every
              moment I get to spend with you. Here's to you — the most wonderful person I know.
            </p>
          </div>

          <p className="letter-sign">Forever yours 🌷</p>
          <div className="letter-hearts">
            <span>💗</span><span>💜</span><span>💗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
