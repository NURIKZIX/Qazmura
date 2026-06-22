"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Kazakh alphabet letters for the hero animation ─── */
const KZ_LETTERS = ["Ә","Ғ","Қ","Ң","Ө","Ұ","Ү","Һ","І","А","Б","В","Г","Д","Е","Ж","З","И","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Ы","Э","Ю","Я"];

/* ─── Floating star particles ─── */
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 6,
    dur: Math.random() * 4 + 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: 0,
            animation: `starPulse ${s.dur}s ${s.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Cycling Kazakh letter ─── */
function CyclingLetter() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % KZ_LETTERS.length);
        setFade(true);
      }, 300);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="inline-block"
      style={{
        color: "#F5C842",
        transition: "opacity 0.3s, transform 0.3s",
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0)" : "translateY(-10px)",
        minWidth: "1ch",
        display: "inline-block",
      }}
    >
      {KZ_LETTERS[idx]}
    </span>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── Scroll-reveal wrapper ─── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.7s ${delay}ms, transform 0.7s ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      {/* ── Global keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }

        @keyframes starPulse {
          0%, 100% { opacity: 0; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.4); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes heroPop {
          0%   { opacity: 0; transform: scale(0.92) translateY(30px); }
          100% { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.9); opacity: 0.6; }
          70%  { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 0 3px rgba(245,200,66,0.3); }
          50%       { box-shadow: 0 0 0 6px rgba(245,200,66,0.7); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes letterRain {
          0%   { transform: translateY(-20px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.7; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        .btn-primary {
          background: linear-gradient(135deg, #F5C842 0%, #E8A000 100%);
          color: #0D1B4B;
          font-weight: 700;
          font-size: 1rem;
          padding: 1rem 2.2rem;
          border-radius: 1rem;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 40px rgba(245,200,66,0.5);
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .btn-primary:hover::after { transform: translateX(100%); }

        .btn-ghost {
          background: rgba(255,255,255,0.07);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          padding: 1rem 2.2rem;
          border-radius: 1rem;
          border: 1.5px solid rgba(255,255,255,0.25);
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-2px);
        }

        .glass-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(16px);
          border-radius: 1.5rem;
          transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
        }
        .glass-card:hover {
          transform: translateY(-6px);
          background: rgba(255,255,255,0.1);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }

        .light-card {
          background: #fff;
          border: 1px solid #EEF0F8;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px rgba(13,27,75,0.07);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .light-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(13,27,75,0.14);
        }

        .gold-badge {
          display: inline-block;
          background: linear-gradient(135deg, #F5C842, #E8A000);
          color: #0D1B4B;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #F5C842 40%, #fff 60%, #F5C842 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .ornament-ring {
          animation: rotateSlow 20s linear infinite;
        }

        .hero-image-float { animation: float 5s ease-in-out infinite; }

        .pulse-dot::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #F5C842;
          animation: pulse-ring 2s ease-out infinite;
        }

        .pricing-featured {
          background: linear-gradient(135deg, #0D1B4B 0%, #1A2F7A 100%);
          border: 2px solid #F5C842;
          animation: borderGlow 3s ease-in-out infinite;
          transform: scale(1.05);
          position: relative;
          z-index: 2;
        }

        .tab-active {
          background: linear-gradient(135deg, #F5C842, #E8A000);
          color: #0D1B4B;
        }
      `}</style>

      <div style={{ background: "#0D1B4B", minHeight: "100vh", color: "#fff", fontFamily: "'Inter', sans-serif" }}>

        {/* ══════════════════════════════
            NAV
        ══════════════════════════════ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 2.5rem",
          background: "rgba(13,27,75,0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg,#F5C842,#E8A000)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "1rem", color: "#0D1B4B"
            }}>Q</div>
            <span style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "0.05em" }}>QAZMURA</span>
          </div>
          <div style={{ display: "flex", gap: "2rem", fontSize: "0.9rem", opacity: 0.8 }}>
            <a href="#about" style={{ color: "#fff", textDecoration: "none" }}>Туралы</a>
            <a href="#learn" style={{ color: "#fff", textDecoration: "none" }}>Оқу</a>
            <a href="#culture" style={{ color: "#fff", textDecoration: "none" }}>Мәдениет</a>
            <a href="#pricing" style={{ color: "#fff", textDecoration: "none" }}>Тариф</a>
          </div>
          <Link href="/register">
            <button className="btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.85rem" }}>
              Тіркелу
            </button>
          </Link>
        </nav>

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <section style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: "80px",
        }}>
          {/* Background orbs */}
          <div style={{
            position: "absolute", top: "-10%", right: "-5%",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%)",
            animation: "floatOrb 8s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "-15%", left: "-8%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,130,255,0.15) 0%, transparent 70%)",
            animation: "floatOrb 10s 2s ease-in-out infinite",
          }} />

          {/* Stars */}
          <StarField />

          {/* Kazakh letter rain (ambient) */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.04 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <span key={i} style={{
                position: "absolute",
                left: `${(i * 5.2) % 100}%`,
                top: `-5%`,
                fontSize: `${Math.random() * 40 + 24}px`,
                fontWeight: 900,
                color: "#F5C842",
                animation: `letterRain ${Math.random() * 8 + 8}s ${Math.random() * 10}s linear infinite`,
              }}>
                {KZ_LETTERS[i % KZ_LETTERS.length]}
              </span>
            ))}
          </div>

          {/* Rotating Kazakh ornament ring */}
          <div style={{
            position: "absolute", right: "4%", top: "50%",
            transform: "translateY(-50%)",
            width: 500, height: 500,
            opacity: 0.13,
          }}>
            <svg viewBox="0 0 200 200" className="ornament-ring">
              {[0,45,90,135,180,225,270,315].map((deg, i) => (
                <g key={i} transform={`rotate(${deg} 100 100)`}>
                  <path d="M100 10 C120 30 120 50 100 60 C80 50 80 30 100 10Z" fill="#F5C842"/>
                  <circle cx="100" cy="10" r="5" fill="#F5C842"/>
                </g>
              ))}
              <circle cx="100" cy="100" r="30" fill="none" stroke="#F5C842" strokeWidth="2"/>
              <circle cx="100" cy="100" r="50" fill="none" stroke="#F5C842" strokeWidth="0.8" strokeDasharray="4 4"/>
              <circle cx="100" cy="100" r="70" fill="none" stroke="#F5C842" strokeWidth="0.5"/>
              <circle cx="100" cy="100" r="12" fill="#F5C842"/>
            </svg>
          </div>

          <div style={{
            maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "3rem", width: "100%",
            animation: "heroPop 1s ease-out both",
          }}>
            {/* Left text */}
            <div style={{ maxWidth: 620, flex: "1 1 auto" }}>
              <div className="gold-badge" style={{ marginBottom: "1.5rem" }}>
                🇰🇿 Қазақстанның №1 тіл платформасы
              </div>

              <h1 style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}>
                <span className="shimmer-text">QAZMURA</span>
                <br />
                <span style={{ color: "#fff" }}>Тіл · Дәстүр · </span>
                <CyclingLetter />
              </h1>

              <p style={{
                marginTop: "1.5rem",
                fontSize: "1.15rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 520,
              }}>
                Қазақ тілін AI мұғаліммен, интерактивті ертегілермен
                және мәдени модульдермен үйреніңіз. Бір платформада — бәрі.
              </p>

              {/* Mini stats */}
              <div style={{
                display: "flex", gap: "2.5rem", marginTop: "2rem",
                fontSize: "0.85rem", color: "rgba(255,255,255,0.55)",
              }}>
                {[["12 000+","оқушы"],["42","сабақ"],["3","тіл тірек"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F5C842" }}>{n}</div>
                    <div>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                <Link href="/register">
                  <button className="btn-primary">🚀 Үйренуді бастау</button>
                </Link>
                <Link href="/ai">
                  <button className="btn-ghost">🤖 AI Мұғалім</button>
                </Link>
              </div>

              {/* Social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  {["#F5A623","#4A90E2","#7ED321","#9B59B6","#E74C3C"].map((c, i) => (
                    <div key={i} style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: c, border: "2px solid #0D1B4B",
                      marginLeft: i ? "-8px" : 0,
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
                  <strong style={{ color: "#fff" }}>1 200+</strong> оқушы осы аптада қосылды
                </span>
              </div>
            </div>

            {/* Right: logo card */}
            <div style={{ flex: "0 0 auto", position: "relative" }}>
              <div style={{
                position: "absolute", inset: -20,
                borderRadius: "50%",
                border: "1.5px dashed rgba(245,200,66,0.3)",
                animation: "rotateSlow 30s linear infinite",
              }}/>
              <div
                className="hero-image-float"
                style={{
                  width: 340, height: 340,
                  borderRadius: "2rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(20px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Decorative corner ornaments */}
                {["top-left","top-right","bottom-left","bottom-right"].map((pos) => (
                  <div key={pos} style={{
                    position: "absolute",
                    ...(pos.includes("top") ? { top: 12 } : { bottom: 12 }),
                    ...(pos.includes("left") ? { left: 12 } : { right: 12 }),
                    width: 20, height: 20,
                    borderTop: pos.includes("top") ? "2px solid #F5C842" : "none",
                    borderBottom: pos.includes("bottom") ? "2px solid #F5C842" : "none",
                    borderLeft: pos.includes("left") ? "2px solid #F5C842" : "none",
                    borderRight: pos.includes("right") ? "2px solid #F5C842" : "none",
                  }}/>
                ))}
                <img
                  src="/Qazmura.jpg"
                  alt="QAZMURA"
                  style={{ width: "80%", height: "80%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute", bottom: 28, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "0.4rem", opacity: 0.5, fontSize: "0.75rem",
          }}>
            <span>Төмен жылжыңыз</span>
            <div style={{
              width: 20, height: 32, border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: 999, display: "flex", justifyContent: "center", paddingTop: 6,
            }}>
              <div style={{
                width: 4, height: 8, borderRadius: 999, background: "#F5C842",
                animation: "float 1.5s ease-in-out infinite",
              }}/>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            FEATURES STRIP
        ══════════════════════════════ */}
        <section style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem 2.5rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "📘", title: "Толық бағдарлама", desc: "Әліпби → C1 деңгейіне дейін" },
              { icon: "🤖", title: "AI Мұғалім 24/7", desc: "Claude AI арқылы жеке сабақ" },
              { icon: "📖", title: "Интерактивті ертегі", desc: "Сіз — кейіпкерсіз" },
              { icon: "🏹", title: "Мәдени модульдер", desc: "Батырлар, дәстүр, карта" },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="glass-card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ fontSize: "2rem", flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{f.title}</div>
                    <div style={{ fontSize: "0.82rem", opacity: 0.6, marginTop: 2 }}>{f.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════
            STATS
        ══════════════════════════════ */}
        <section style={{ padding: "6rem 2.5rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div className="gold-badge" style={{ marginBottom: "1rem" }}>Нәтижелер</div>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
                  Сандар өзі айтады
                </h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {[
                { n: 12000, suf: "+", label: "Белсенді оқушы", icon: "👤" },
                { n: 42, suf: "", label: "Сабақ модулі", icon: "📚" },
                { n: 98, suf: "%", label: "Қанағаттану дәрежесі", icon: "⭐" },
                { n: 3, suf: " тіл", label: "Оқыту тілі", icon: "🌐" },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="glass-card" style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>{s.icon}</div>
                    <div style={{ fontSize: "3rem", fontWeight: 900, color: "#F5C842", lineHeight: 1 }}>
                      <Counter target={s.n} suffix={s.suf} />
                    </div>
                    <div style={{ marginTop: "0.6rem", opacity: 0.65, fontSize: "0.9rem" }}>{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            ABOUT
        ══════════════════════════════ */}
        <section id="about" style={{ background: "#fff", padding: "7rem 2.5rem", color: "#0D1B4B" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <div className="gold-badge" style={{ marginBottom: "1.2rem", background: "linear-gradient(135deg,#0D1B4B,#1A2F7A)", color: "#F5C842" }}>
                Мұра — мирас — Heritage
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 900, marginBottom: "2rem", lineHeight: 1.1 }}>
                QAZMURA туралы
              </h2>
              <p style={{ fontSize: "1.2rem", lineHeight: 1.9, color: "#334155", maxWidth: 720, margin: "0 auto" }}>
                <strong>QAZMURA</strong> — «мұра» сөзінен туған. Мұра — ата-бабадан қалған
                байлық: тіл, дәстүр және мәдениет. Платформа қазақ, орыс және ағылшын
                тілдерінде — интерактивті, жеке, AI-қуатты.
              </p>

              {/* 3-column values */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "3.5rem" }}>
                {[
                  { icon: "🌿", title: "Тамыр", body: "Қазақ рухынан бастау алады." },
                  { icon: "⚡", title: "Технология", body: "AI + геймификация + контент." },
                  { icon: "🎯", title: "Мақсат", body: "Тілді сүйіп үйрену." },
                ].map((v, i) => (
                  <Reveal key={i} delay={i * 120}>
                    <div className="light-card" style={{ padding: "2rem" }}>
                      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{v.icon}</div>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>{v.title}</div>
                      <div style={{ fontSize: "0.9rem", color: "#64748B" }}>{v.body}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════
            LEARNING MODULES
        ══════════════════════════════ */}
        <section id="learn" style={{ padding: "7rem 2.5rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div className="gold-badge" style={{ marginBottom: "1rem" }}>Оқу жолы</div>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
                  📚 Негізгі модульдер
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {[
                { emoji: "🔤", title: "Әліпби & Фонетика", desc: "42 әріп, дыбыс, айту ережелері. Бейне + тест.", level: "Бастауыш", color: "#4ADE80" },
                { emoji: "✍️", title: "Толық Грамматика", desc: "Септік, жіктік, етіс — AI түсіндіреді.", level: "A1 → C1", color: "#60A5FA" },
                { emoji: "📖", title: "Сөздік Қор", desc: "Флэшкарта, контекст, ойындар арқылы.", level: "5 000+ сөз", color: "#F472B6" },
                { emoji: "📝", title: "Оқылым & Жазылым", desc: "Мәтін, диктант, шығарма тексеруші.", level: "A2 → C1", color: "#FB923C" },
              ].map((m, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="glass-card" style={{ padding: "2rem", cursor: "pointer" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "1rem",
                      background: `${m.color}20`, border: `1.5px solid ${m.color}50`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.8rem", marginBottom: "1.2rem",
                    }}>{m.emoji}</div>
                    <span style={{
                      display: "inline-block", background: `${m.color}25`,
                      color: m.color, fontSize: "0.72rem", fontWeight: 700,
                      padding: "0.25rem 0.75rem", borderRadius: 999,
                      marginBottom: "0.8rem", letterSpacing: "0.05em",
                    }}>{m.level}</span>
                    <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.6rem" }}>{m.title}</h3>
                    <p style={{ fontSize: "0.88rem", opacity: 0.65, lineHeight: 1.6 }}>{m.desc}</p>
                    <div style={{
                      marginTop: "1.5rem", display: "flex", alignItems: "center",
                      gap: "0.4rem", color: m.color, fontWeight: 700, fontSize: "0.85rem",
                    }}>
                      Бастау <span>→</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            CULTURE
        ══════════════════════════════ */}
        <section id="culture" style={{ background: "#fff", padding: "7rem 2.5rem", color: "#0D1B4B" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div className="gold-badge" style={{ background: "linear-gradient(135deg,#0D1B4B,#1A2F7A)", color: "#F5C842", marginBottom: "1rem" }}>
                  Мәдениет
                </div>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
                  🏹 Мәдени Модульдер
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {[
                { emoji: "📖", title: "Қазақ Ертегілері", desc: "Интерактивті сюжетте сіз — кейіпкер. Оқы, таңда, үйрен.", bg: "linear-gradient(135deg,#667EEA,#764BA2)" },
                { emoji: "⚔️", title: "Батырлар Тарихы", desc: "Абылай, Бауыржан, Қабанбай. Тарих тіл арқылы.", bg: "linear-gradient(135deg,#F093FB,#F5576C)" },
                { emoji: "🎉", title: "Салт-Дәстүрлер", desc: "Наурыз, той, ас. 3D карта + мультимедиа.", bg: "linear-gradient(135deg,#4FACFE,#00F2FE)" },
                { emoji: "🗺️", title: "Қазақстан Картасы", desc: "Интерактивті карта: аймақ, тіл, мәдениет.", bg: "linear-gradient(135deg,#43E97B,#38F9D7)" },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div style={{
                    borderRadius: "1.5rem", overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 60px rgba(0,0,0,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; }}
                  >
                    <div style={{ background: c.bg, padding: "2.5rem 2rem", color: "#fff" }}>
                      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{c.emoji}</div>
                      <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.6rem" }}>{c.title}</h3>
                      <p style={{ fontSize: "0.88rem", opacity: 0.88, lineHeight: 1.6 }}>{c.desc}</p>
                    </div>
                    <div style={{
                      background: "#fff", padding: "1rem 2rem",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      fontSize: "0.85rem", fontWeight: 700, color: "#0D1B4B",
                    }}>
                      <span>Зерттеу</span>
                      <span>→</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            AI TEACHER
        ══════════════════════════════ */}
        <section style={{ padding: "7rem 2.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
              <Reveal>
                <div>
                  <div className="gold-badge" style={{ marginBottom: "1.2rem" }}>AI технология</div>
                  <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem" }}>
                    🤖 Жеке AI<br/>Мұғаліміңіз
                  </h2>
                  <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: "2rem", fontSize: "1rem" }}>
                    Claude AI арқылы сіздің деңгейіңізге, қарқыныңызға
                    және мақсатыңызға бейімделген жеке сабақ алыңыз —
                    тәулік бойы, кез келген жерде.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      { icon: "✅", text: "Claude AI мұғалімі — жеке бағдарлама" },
                      { icon: "✅", text: "Жазылымды автоматты тексеру" },
                      { icon: "✅", text: "AI ертегі генераторы" },
                      { icon: "✅", text: "Сөйлеу тренажері (TTS + STT)" },
                      { icon: "✅", text: "Автоматты тест жасаушы" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ opacity: 0.85, fontSize: "0.95rem" }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "2.5rem" }}>
                    <Link href="/ai">
                      <button className="btn-primary">AI Мұғалімді сынап көру</button>
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Chat mockup */}
              <Reveal delay={200}>
                <div className="glass-card" style={{ padding: "1.5rem", maxWidth: 420 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "linear-gradient(135deg,#F5C842,#E8A000)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, color: "#0D1B4B", fontSize: "1rem",
                    }}>Q</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>QAZMURA AI</div>
                      <div style={{ fontSize: "0.75rem", color: "#4ADE80", display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }}/>
                        Желіде
                      </div>
                    </div>
                  </div>

                  {[
                    { role: "ai", msg: "Сәлем! Бүгін не үйренгіңіз келеді? 😊" },
                    { role: "user", msg: "Септік жалғауларын үйренгім келеді" },
                    { role: "ai", msg: "Тамаша! Қазақ тілінде 7 септік бар. Бастайық — «кітап» сөзін алайық..." },
                  ].map((m, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                      marginBottom: "0.75rem",
                    }}>
                      <div style={{
                        maxWidth: "80%", padding: "0.7rem 1rem", borderRadius: "1rem",
                        fontSize: "0.85rem", lineHeight: 1.5,
                        background: m.role === "user"
                          ? "linear-gradient(135deg,#F5C842,#E8A000)"
                          : "rgba(255,255,255,0.1)",
                        color: m.role === "user" ? "#0D1B4B" : "#fff",
                        fontWeight: m.role === "user" ? 600 : 400,
                        ...(m.role === "user" ? { borderBottomRightRadius: 4 } : { borderBottomLeftRadius: 4 }),
                      }}>
                        {m.msg}
                      </div>
                    </div>
                  ))}

                  <div style={{
                    marginTop: "1rem", display: "flex", gap: "0.5rem",
                    background: "rgba(255,255,255,0.06)", borderRadius: "0.75rem",
                    padding: "0.6rem 0.8rem", alignItems: "center",
                  }}>
                    <div style={{ flex: 1, fontSize: "0.82rem", opacity: 0.4 }}>Хабар жазыңыз...</div>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "linear-gradient(135deg,#F5C842,#E8A000)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.8rem", color: "#0D1B4B", fontWeight: 800, cursor: "pointer",
                    }}>↑</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            TESTIMONIALS
        ══════════════════════════════ */}
        <section style={{ background: "#fff", padding: "7rem 2.5rem", color: "#0D1B4B" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div className="gold-badge" style={{ background: "linear-gradient(135deg,#0D1B4B,#1A2F7A)", color: "#F5C842", marginBottom: "1rem" }}>
                  Пікірлер
                </div>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
                  Оқушылар айтады
                </h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {[
                { name: "Айгерім С.", city: "Алматы", rating: 5, text: "2 айда базалық деңгейге жеттім. AI мұғалім таңғаларлық — әр сұрақты түсіндіреді!", avatar: "#E74C3C" },
                { name: "Дмитрий П.", city: "Астана", rating: 5, text: "Орыс тілді болсам да, интерфейс өте анық. Ертегі модулі балама ұнады.", avatar: "#3498DB" },
                { name: "Fatima K.", city: "Шымкент", rating: 5, text: "The cultural modules are incredible. I finally understand Kazakh traditions deeply.", avatar: "#9B59B6" },
              ].map((t, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="light-card" style={{ padding: "2rem" }}>
                    <div style={{ display: "flex", marginBottom: "1rem", gap: "2px" }}>
                      {Array.from({ length: t.rating }, (_, j) => (
                        <span key={j} style={{ color: "#F5C842", fontSize: "1rem" }}>★</span>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#334155", marginBottom: "1.5rem" }}>
                      "{t.text}"
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: t.avatar,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                      }}>
                        {t.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#94A3B8" }}>{t.city}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            PRICING
        ══════════════════════════════ */}
        <section id="pricing" style={{ padding: "7rem 2.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div className="gold-badge" style={{ marginBottom: "1rem" }}>Тарифтер</div>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
                  💎 Өзіңізге сай тариф
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
              {/* FREE */}
              <Reveal delay={0}>
                <div className="glass-card" style={{ padding: "2.5rem" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", opacity: 0.6, marginBottom: "0.5rem" }}>ТЕГІН</div>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1, marginBottom: "0.3rem" }}>0 ₸</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.55, marginBottom: "2rem" }}>мүшелік ақысыз</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                    {["✓ Әліпби модулі","✓ Сөздік қор (500 сөз)","✓ Күнделікті тест"].map(f => (
                      <div key={f} style={{ fontSize: "0.9rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>{f}</div>
                    ))}
                  </div>
                  <Link href="/register">
                    <button className="btn-ghost" style={{ width: "100%", textAlign: "center" }}>Бастау</button>
                  </Link>
                </div>
              </Reveal>

              {/* PLUS — featured */}
              <Reveal delay={120}>
                <div className="pricing-featured" style={{ padding: "2.5rem", borderRadius: "1.5rem", color: "#fff" }}>
                  <div style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg,#F5C842,#E8A000)",
                    color: "#0D1B4B", fontSize: "0.7rem", fontWeight: 800,
                    padding: "0.3rem 0.9rem", borderRadius: 999, marginBottom: "1rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>⭐ Танымал</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", opacity: 0.7, marginBottom: "0.5rem" }}>PLUS</div>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1, marginBottom: "0.3rem" }}>1 990 ₸</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.55, marginBottom: "2rem" }}>ай сайын</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                    {["✓ AI Мұғалім (шексіз)","✓ Толық грамматика","✓ AI тест жасаушы","✓ Ертегі модулі","✓ Жетістік жүйесі"].map(f => (
                      <div key={f} style={{ fontSize: "0.9rem", display: "flex", gap: "0.5rem" }}>{f}</div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ width: "100%" }}>Жазылу</button>
                </div>
              </Reveal>

              {/* PRO */}
              <Reveal delay={240}>
                <div className="glass-card" style={{ padding: "2.5rem" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", opacity: 0.6, marginBottom: "0.5rem" }}>PRO</div>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1, marginBottom: "0.3rem" }}>3 990 ₸</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.55, marginBottom: "2rem" }}>ай сайын</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                    {["✓ Барлық PLUS мүмкіндіктер","✓ Мұғалім панелі","✓ Ата-ана кабинеті","✓ Класс турнирлері","✓ API интеграция","✓ Приоритетті қолдау"].map(f => (
                      <div key={f} style={{ fontSize: "0.9rem", display: "flex", gap: "0.5rem" }}>{f}</div>
                    ))}
                  </div>
                  <Link href="/register">
                    <button className="btn-ghost" style={{ width: "100%", textAlign: "center" }}>Бастау</button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            TEACHER PANEL
        ══════════════════════════════ */}
        <section style={{ background: "#fff", padding: "7rem 2.5rem", color: "#0D1B4B" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div className="gold-badge" style={{ background: "linear-gradient(135deg,#0D1B4B,#1A2F7A)", color: "#F5C842", marginBottom: "1rem" }}>
                  Панельдер
                </div>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }}>
                  👨‍🏫 Мұғалім & Ата-ана Панелі
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {[
                {
                  icon: "👨‍🏫",
                  title: "Мұғалім панелі",
                  items: ["Барлық оқушының прогресі","XP және streak трекер","Тапсырма жіберу","AI-тест генератор","Класс рейтингі"],
                  color: "#667EEA",
                },
                {
                  icon: "👨‍👩‍👧",
                  title: "Ата-ана кабинеті",
                  items: ["Баланың белсенділігі","Уақыт трекері","Жетістіктер","Хабарландырулар","Есеп PDF-і"],
                  color: "#F093FB",
                },
              ].map((panel, i) => (
                <Reveal key={i} delay={i * 150}>
                  <div className="light-card" style={{ padding: "2.5rem" }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: "1rem",
                      background: `${panel.color}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "2rem", marginBottom: "1.5rem",
                    }}>{panel.icon}</div>
                    <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "1.2rem" }}>{panel.title}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                      {panel.items.map(item => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: panel.color, flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            CTA BANNER
        ══════════════════════════════ */}
        <section style={{ padding: "6rem 2.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, rgba(245,200,66,0.08) 0%, transparent 70%)",
          }} />
          <Reveal>
            <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Қазақ тілін бүгін<br/>
                <span style={{ color: "#F5C842" }}>бастаңыз</span>
              </h2>
              <p style={{ opacity: 0.7, fontSize: "1.1rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
                Тегін тіркеліп, алғашқы сабағыңызды бүгін өтіңіз.
                AI мұғалім сізді күтіп тұр.
              </p>
              <Link href="/register">
                <button className="btn-primary" style={{ fontSize: "1.1rem", padding: "1.2rem 3rem" }}>
                  🚀 Тегін бастау — 0 ₸
                </button>
              </Link>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════════════════
            FOOTER
        ══════════════════════════════ */}
        <footer style={{
          background: "rgba(0,0,0,0.4)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "3rem 2.5rem",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg,#F5C842,#E8A000)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "0.85rem", color: "#0D1B4B",
                }}>Q</div>
                <span style={{ fontWeight: 800, fontSize: "1rem" }}>QAZMURA</span>
              </div>
              <div style={{ fontSize: "0.8rem", opacity: 0.5 }}>
                Қазақ тілін үйренуге арналған интерактивті платформа
              </div>
            </div>
            <div style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", opacity: 0.6 }}>
              <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Конфиденциалдылық</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Шарттар</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Байланыс</a>
            </div>
            <div style={{ fontSize: "0.8rem", opacity: 0.4 }}>
              © 2026 QAZMURA. Барлық құқықтар қорғалған.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}