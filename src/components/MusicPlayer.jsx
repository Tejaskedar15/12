import React, { useState, useRef, useEffect } from 'react';

// Using a locally hosted Happy Birthday tune for 100% reliability
const MUSIC_URL = '/birthday_song.mp3';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audio.addEventListener('canplaythrough', () => setLoaded(true));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [MUSIC_URL]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <button
      id="music-toggle-btn"
      className="music-btn"
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause music' : 'Play romantic music 🎵'}
    >
      {playing ? '🔇' : '🎵'}
      <style>{`
        .music-btn {
          animation: ${playing ? 'musicPulse 1.5s ease-in-out infinite' : 'musicPulse 3s ease-in-out infinite'};
        }
      `}</style>
    </button>
  );
}
