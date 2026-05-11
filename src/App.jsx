import React from 'react';
import './index.css';
import CursorSparkle from './components/CursorSparkle';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoveLetterSection from './components/LoveLetterSection';
import GallerySection from './components/GallerySection';
import GiftBoxSection from './components/GiftBoxSection';
import ClosingSection from './components/ClosingSection';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <>
      {/* Animated gradient mesh background */}
      <div className="bg-mesh" aria-hidden="true" />

      {/* Custom cursor with sparkle trail */}
      <CursorSparkle />

      {/* Sticky navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <HeroSection />
        <LoveLetterSection />
        <GallerySection />
        <GiftBoxSection />
        <ClosingSection />
      </main>

      {/* Fixed music toggle */}
      <MusicPlayer />
    </>
  );
}
