import React, { useState, useRef, useEffect } from 'react';

/* ============================================================
   CONFETTI BURST — vanilla JS canvas sprinkled via portal
   ============================================================ */
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9997;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#ffd1dc','#e6d9f5','#c8f5e8','#f9a8c9','#c9b8e8','#ffd700','#ff6b9d'];
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    r: Math.random() * 8 + 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * 4 + 2,
    vr: (Math.random() - 0.5) * 8,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
    life: 1,
  }));

  let frame;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rotation += p.vr; p.life -= 0.008;
      if (p.life <= 0) return;
      alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      }
      ctx.restore();
    });
    if (alive) { frame = requestAnimationFrame(draw); }
    else { canvas.remove(); }
  };
  draw();
}

/* ============================================================
   STAR-JAR COMPLIMENTS
   ============================================================ */
const COMPLIMENTS = [
  "✨ You have the most beautiful laugh in the world",
  "🌸 The way you care for others is truly rare",
  "💫 Your eyes hold a thousand galaxies",
  "🌺 You make every room feel warmer",
  "💗 You are braver than you ever believe",
  "🦋 Your smile is my favourite thing to wake up to",
  "🌙 You are someone's reason to smile every single day",
  "⭐ You are absolutely, completely irreplaceable",
  "🌹 The world is genuinely better because you're in it",
  "💜 Everything is softer when you're around",
];

/* ============================================================
   CAKE CANDLES
   ============================================================ */
function Cake() {
  const [blown, setBlown] = useState([false, false, false, false, false]);
  const allBlown = blown.every(Boolean);

  const blowCandle = (i) => {
    setBlown(prev => { const n = [...prev]; n[i] = true; return n; });
  };

  return (
    <div className="cake-wrapper">
      <div className="cake-label">
        {allBlown
          ? '🎉 All wishes sent to the universe! 🎉'
          : 'Click each candle to make a wish! 🕯️'}
      </div>
      <div className="cake-body">
        <div className="cake-candles">
          {blown.map((b, i) => (
            <button
              key={i}
              className={`candle ${b ? 'blown' : ''}`}
              onClick={() => blowCandle(i)}
              aria-label={`Blow out candle ${i + 1}`}
            >
              <div className="candle-stick" />
              {!b && <div className="candle-flame">🔥</div>}
              {b && <div className="candle-smoke">💨</div>}
            </button>
          ))}
        </div>
        <div className="cake-tier cake-top">🌸 Happy Birthday Winuu 🌸</div>
        <div className="cake-tier cake-mid" />
        <div className="cake-tier cake-bot" />
        <div className="cake-plate" />
      </div>
      {allBlown && (
        <p className="cake-wish-msg">
          ✨ May every wish come true, my love ✨
        </p>
      )}
    </div>
  );
}

/* ============================================================
   STAR JAR
   ============================================================ */
function StarJar() {
  const [msg, setMsg] = useState(null);
  const [shake, setShake] = useState(false);
  const usedRef = useRef([]);

  const pickNext = () => {
    if (usedRef.current.length >= COMPLIMENTS.length) usedRef.current = [];
    const remaining = COMPLIMENTS.filter((_, i) => !usedRef.current.includes(i));
    const idx = COMPLIMENTS.indexOf(remaining[Math.floor(Math.random() * remaining.length)]);
    usedRef.current.push(idx);
    return COMPLIMENTS[idx];
  };

  const shake_jar = () => {
    setShake(true);
    setTimeout(() => {
      setMsg(pickNext());
      setShake(false);
    }, 500);
  };

  return (
    <div className="star-jar-wrapper">
      <button
        className={`star-jar-btn ${shake ? 'shaking' : ''}`}
        onClick={shake_jar}
        aria-label="Shake the star jar for a compliment"
      >
        ⭐
      </button>
      <p className="star-jar-hint">Shake the star jar!</p>
      {msg && (
        <div className="star-jar-msg" key={msg}>
          {msg}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MAIN GIFT BOX SECTION
   ============================================================ */
export default function GiftBoxSection() {
  const [opened, setOpened] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && e.target.classList.add('visible'),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openBox = () => {
    if (opened) return;
    setOpened(true);
    launchConfetti();
    setTimeout(() => setShowContents(true), 900);
  };

  return (
    <section className="gift-section" id="gifts">
      <div className="section-inner">
        <h2 className="section-heading reveal" ref={sectionRef}>
          Your Surprise Gifts 🎁
        </h2>
        <p className="gift-subtitle">
          Something special, wrapped just for you — tap to open! 🎀
        </p>

        {/* ── Gift Box ── */}
        <div className="gift-box-scene">
          <div className={`gift-box ${opened ? 'opened' : ''}`} onClick={openBox} role="button" aria-label="Open gift box">
            <div className="gift-lid">
              <div className="gift-lid-face gift-lid-top">
                <div className="gift-ribbon-h" />
                <div className="gift-ribbon-v" />
                <div className="gift-bow">🎀</div>
              </div>
            </div>
            <div className="gift-base">
              <div className="gift-ribbon-h-base" />
              <div className="gift-ribbon-v-base" />
            </div>
          </div>
          {!opened && <p className="gift-tap-hint">tap to open ✨</p>}
        </div>

        {/* ── Contents revealed after opening ── */}
        {showContents && (
          <div className="gift-contents">

            {/* ── Bottom row: Star Jar + Cake ── */}
            <div className="gift-bottom-row">
              <div className="gift-card glass-card">
                <div className="gift-sub-heading">⭐ The Star Jar</div>
                <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', textAlign: 'center', marginBottom: 12 }}>
                  A jar full of kind words just for you
                </p>
                <StarJar />
              </div>

              <div className="gift-card glass-card">
                <div className="gift-sub-heading">🎂 Birthday Cake</div>
                <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', textAlign: 'center', marginBottom: 12 }}>
                  Make a wish on each candle
                </p>
                <Cake />
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
