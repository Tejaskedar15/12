import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">Winuu 💖</div>
      <ul className="nav-links">
        <li><a href="#hero" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>Home</a></li>
        <li><a href="#letter" onClick={e => { e.preventDefault(); scrollTo('letter'); }}>Letter</a></li>
        <li><a href="#gallery" onClick={e => { e.preventDefault(); scrollTo('gallery'); }}>Memories</a></li>
        <li><a href="#gifts" onClick={e => { e.preventDefault(); scrollTo('gifts'); }}>Gifts 🎁</a></li>
        <li><a href="#closing" onClick={e => { e.preventDefault(); scrollTo('closing'); }}>Closing</a></li>
      </ul>
    </nav>
  );
}
