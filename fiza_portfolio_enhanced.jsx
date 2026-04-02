import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────
const skills = [
  { name: "HTML", level: 92 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 82 },
  { name: "Java", level: 75 },
  { name: "Python", level: 70 },
  { name: "C++", level: 65 },
  { name: "Figma", level: 85 },
  { name: "GitHub", level: 80 },
  { name: "Responsive Design", level: 90 },
  { name: "UI/UX", level: 88 },
  { name: "Frontend Dev", level: 87 },
  { name: "Database Integration", level: 68 },
];

const projects = [
  {
    title: "Dental Clinic Website",
    description:
      "A polished business website concept for a dental clinic designed to build trust, present services clearly, and create a premium first impression online.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: "🌐",
    color: "#00f0ff",
  },
  {
    title: "YumBox Food Delivery",
    description:
      "A food delivery website with cart functionality, structured product sections, and a user-friendly interface focused on smooth browsing.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: "📦",
    color: "#bf00ff",
  },
  {
    title: "Java GUI Management System",
    description:
      "Desktop-based management system with Java and database integration, showing practical software engineering fundamentals.",
    tech: ["Java", "Database", "GUI"],
    icon: "💻",
    color: "#00ff9f",
  },
  {
    title: "UI/UX Design Concepts",
    description:
      "Wireframes and clean interface designs created in Figma with a focus on modern layouts, usability, and visual balance.",
    tech: ["Figma", "UI/UX", "Design Systems"],
    icon: "🎨",
    color: "#ff6b6b",
  },
  {
    title: "Perfume Brand Website",
    description:
      "A luxury-inspired perfume website concept designed with elegant visuals, premium product presentation, and a stylish shopping experience feel.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: "✨",
    color: "#ffd700",
  },
];

const services = [
  { label: "Business Website Development", icon: "⬡" },
  { label: "Landing Page Design", icon: "⬡" },
  { label: "Portfolio Websites", icon: "⬡" },
  { label: "Responsive Frontend Development", icon: "⬡" },
  { label: "Website Redesign", icon: "⬡" },
  { label: "UI-Focused Interfaces", icon: "⬡" },
];

const certifications = [
  { title: "Prompt Engineering", provider: "Coursera", icon: "🧠" },
  { title: "AI Essentials", provider: "Coursera", icon: "🤖" },
];

const experience = [
  {
    title: "Volunteer – SZABIST Convocation",
    description:
      "Contributed as a volunteer during SZABIST Convocation, supporting event coordination and on-ground management.",
    icon: "🎓",
    year: "2024",
  },
  {
    title: "Hackathon Participant",
    description:
      "Participated in hackathon activities, collaborating on problem-solving, idea development, and fast-paced tech execution.",
    icon: "⚡",
    year: "2024",
  },
];

// ─── PARTICLE CANVAS ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS = 40;
    const ROWS = 25;
    const dots = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dots.push({
          x: (c / (COLS - 1)) * canvas.width,
          y: (r / (ROWS - 1)) * canvas.height,
          ox: (c / (COLS - 1)) * canvas.width,
          oy: (r / (ROWS - 1)) * canvas.height,
          phase: Math.random() * Math.PI * 2,
          speed: 0.003 + Math.random() * 0.004,
          amp: 4 + Math.random() * 8,
          opacity: 0.06 + Math.random() * 0.12,
        });
      }
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.5;
      dots.forEach((d) => {
        d.x = d.ox + Math.sin(t * d.speed + d.phase) * d.amp;
        d.y = d.oy + Math.cos(t * d.speed * 1.3 + d.phase) * d.amp * 0.7;
      });

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = (canvas.width / COLS) * 1.6;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.07;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(0,220,255,${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,240,255,${d.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function Typewriter({ phrases }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const current = phrases[idx % phrases.length];
    let timeout;
    if (typing) {
      if (display.length < current.length) {
        timeout = setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          60
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          35
        );
      } else {
        setIdx((i) => i + 1);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, typing, idx, phrases]);
  return (
    <span>
      {display}
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          background: "#00f0ff",
          marginLeft: 3,
          verticalAlign: "text-bottom",
          animation: "blink 1s steps(1) infinite",
        }}
      />
    </span>
  );
}

// ─── GLITCH TEXT ─────────────────────────────────────────────────────────────
function GlitchText({ text, className, style }) {
  return (
    <span className={className} style={{ position: "relative", ...style }} data-text={text}>
      {text}
    </span>
  );
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────
function SkillBar({ name, level, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontSize: 13, color: "#a0b4c8", letterSpacing: "0.1em", fontFamily: "monospace" }}>{name}</span>
        <span style={{ fontSize: 12, color: "#00f0ff", fontFamily: "monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            height: "100%",
            width: animated ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #00f0ff, #bf00ff)",
            borderRadius: 2,
            transition: `width 1.2s cubic-bezier(.4,0,.2,1) ${delay}ms`,
            boxShadow: "0 0 10px rgba(0,240,255,0.5)",
          }}
        />
      </div>
    </div>
  );
}

// ─── SECTION REVEAL ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.4,0,.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const navLinks = ["About", "Skills", "Projects", "Services", "Certs", "Contact"];

function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(2,6,20,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,240,255,0.08)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 13,
          letterSpacing: "0.3em",
          color: "#00f0ff",
          textTransform: "uppercase",
        }}
      >
        &lt;FIZA.DEV /&gt;
      </span>
      <nav style={{ display: "flex", gap: "2rem" }}>
        {navLinks.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setActive(l)}
            style={{
              fontSize: 12,
              letterSpacing: "0.15em",
              textDecoration: "none",
              color: active === l ? "#00f0ff" : "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              fontFamily: "monospace",
              transition: "color 0.3s",
              position: "relative",
            }}
          >
            {l}
          </a>
        ))}
      </nav>
    </header>
  );
}

// ─── HOLOGRAPHIC CARD ────────────────────────────────────────────────────────
function HoloCard({ children, accentColor = "#00f0ff", style }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease",
        background: "rgba(8,16,36,0.7)",
        border: `1px solid ${accentColor}22`,
        borderRadius: 16,
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        ...style,
      }}
    >
      {/* scan line overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: 16,
        }}
      />
      {/* corner accent top-left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          borderTop: `1.5px solid ${accentColor}`,
          borderLeft: `1.5px solid ${accentColor}`,
          borderRadius: "16px 0 0 0",
        }}
      />
      {/* corner accent bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 24,
          height: 24,
          borderBottom: `1.5px solid ${accentColor}`,
          borderRight: `1.5px solid ${accentColor}`,
          borderRadius: "0 0 16px 0",
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "rgba(8,16,36,0.8)",
          border: `1px solid ${hovered ? project.color + "55" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 16,
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? `0 20px 50px ${project.color}18` : "none",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: hovered
              ? `linear-gradient(90deg, transparent, ${project.color}, transparent)`
              : "transparent",
            transition: "background 0.4s",
          }}
        />
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${project.color}18`,
            border: `1px solid ${project.color}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            marginBottom: "1.2rem",
          }}
        >
          {project.icon}
        </div>
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#fff",
            marginBottom: "0.6rem",
            letterSpacing: "0.02em",
          }}
        >
          {project.title}
        </h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.2rem" }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 4,
                background: `${project.color}12`,
                border: `1px solid ${project.color}33`,
                color: project.color,
                fontFamily: "monospace",
                letterSpacing: "0.06em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function FizaPortfolio() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#02060e",
        color: "#fff",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: none; }
          5% { clip-path: inset(10% 0 80% 0); transform: translate(-3px, 0); }
          10% { clip-path: inset(40% 0 50% 0); transform: translate(3px, 0); }
          15% { clip-path: inset(80% 0 10% 0); transform: translate(-2px, 0); }
          20%, 100% { clip-path: inset(0 0 100% 0); transform: none; }
        }
        .glitch-wrap { position: relative; }
        .glitch-wrap::before, .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .glitch-wrap::before {
          color: #00f0ff;
          animation: glitch-1 6s infinite;
          animation-delay: 0.5s;
        }
        .glitch-wrap::after {
          color: #bf00ff;
          animation: glitch-1 6s infinite;
          animation-delay: 1.5s;
        }
        a { text-decoration: none; color: inherit; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #02060e; }
        ::-webkit-scrollbar-thumb { background: #00f0ff44; border-radius: 2px; }
      `}</style>

      <ParticleCanvas />
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "6rem 2rem 4rem",
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* BG radial glows */}
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(191,0,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", width: "100%" }}>
          {/* Left column */}
          <div>
            <Reveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px",
                  borderRadius: 4,
                  border: "1px solid rgba(0,240,255,0.25)",
                  background: "rgba(0,240,255,0.04)",
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "#00f0ff",
                  marginBottom: "1.5rem",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00f0ff", boxShadow: "0 0 8px #00f0ff", animation: "blink 2s steps(1) infinite" }} />
                AVAILABLE FOR FREELANCE
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.35em", color: "#00f0ff88", marginBottom: "0.8rem", textTransform: "uppercase" }}>
                Web Developer · BSSE Student
              </p>
            </Reveal>

            <Reveal delay={180}>
              <h1
                className="glitch-wrap"
                data-text="Fiza Nizamani"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                  background: "linear-gradient(135deg, #fff 30%, #00f0ff 70%, #bf00ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Fiza Nizamani
              </h1>
            </Reveal>

            <Reveal delay={260}>
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "2rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.02em",
                  minHeight: 32,
                }}
              >
                <Typewriter
                  phrases={[
                    "I craft modern, responsive websites.",
                    "I turn ideas into clean interfaces.",
                    "I build digital experiences that stand out.",
                    "I make businesses look great online.",
                  ]}
                />
              </p>
            </Reveal>

            <Reveal delay={340}>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 480, marginBottom: "2.5rem" }}>
                Design-minded frontend developer building modern, aesthetic, and responsive websites that help businesses make a lasting digital impression.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a
                  href="#projects"
                  style={{
                    padding: "12px 28px",
                    borderRadius: 6,
                    background: "linear-gradient(135deg, #00f0ff, #0080ff)",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.08em",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    boxShadow: "0 0 30px rgba(0,240,255,0.3)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  View Projects →
                </a>
                <a
                  href="#contact"
                  style={{
                    padding: "12px 28px",
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: "0.08em",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                >
                  Contact Me
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right column — floating stat cards */}
          <Reveal delay={300}>
            <div style={{ position: "relative", height: 440 }}>
              {/* Spinning ring */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,240,255,0.1)",
                  animation: "spin-slow 20s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  border: "1px dashed rgba(191,0,255,0.15)",
                  animation: "spin-slow 14s linear infinite reverse",
                }}
              />

              {/* Stat cards */}
              {[
                { label: "Projects Built", value: "5+", top: "5%", left: "30%", color: "#00f0ff", delay: "0s" },
                { label: "Skills Mastered", value: "12", top: "42%", left: "2%", color: "#bf00ff", delay: "0.5s" },
                { label: "Tech Stacks", value: "3+", top: "42%", right: "2%", color: "#00ff9f", delay: "1s" },
                { label: "Certifications", value: "2", bottom: "5%", left: "30%", color: "#ffd700", delay: "1.5s" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    position: "absolute",
                    top: s.top,
                    left: s.left,
                    right: s.right,
                    bottom: s.bottom,
                    background: "rgba(8,16,36,0.9)",
                    border: `1px solid ${s.color}33`,
                    borderRadius: 12,
                    padding: "16px 20px",
                    backdropFilter: "blur(12px)",
                    animation: `float 4s ease-in-out ${s.delay} infinite`,
                    minWidth: 120,
                    textAlign: "center",
                    boxShadow: `0 0 20px ${s.color}15`,
                  }}
                >
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color, fontFamily: "monospace" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", marginTop: 4, textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}

              {/* Center avatar */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00f0ff22, #bf00ff22)",
                  border: "2px solid rgba(0,240,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  boxShadow: "0 0 40px rgba(0,240,255,0.15)",
                }}
              >
                👩‍💻
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.3em", color: "#bf00ff", textTransform: "uppercase", marginBottom: "0.6rem" }}>// 001 — About Me</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "3rem", lineHeight: 1.2 }}>
            Design-minded developer<br />with a builder's mindset.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "3rem", alignItems: "start" }}>
          <Reveal delay={100}>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              I'm a Software Engineering student with a growing focus on web development, frontend design, and creating business-ready websites. I enjoy turning concepts into interfaces that feel clean, modern, and easy to use.
            </p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.9 }}>
              My work spans from business landing pages to management systems, always with an eye for visual quality and practical usability. I believe great code and great design go hand in hand.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["🎓", "BS Software Engineering Student"],
                ["💼", "Frontend & UI-focused projects"],
                ["🏗️", "Business-ready websites built"],
              ].map(([icon, text]) => (
                <div
                  key={text}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 10,
                    background: "rgba(0,240,255,0.04)",
                    border: "1px solid rgba(0,240,255,0.1)",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontFamily: "monospace",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.3em", color: "#00f0ff", textTransform: "uppercase", marginBottom: "0.6rem" }}>// 002 — Skills</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "3rem" }}>Tools I use to bring ideas to life.</h2>
        </Reveal>
        <Reveal delay={100}>
          <HoloCard accentColor="#00f0ff" style={{ padding: "2.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 3rem" }}>
              {skills.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 80} />
              ))}
            </div>
          </HoloCard>
        </Reveal>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.3em", color: "#bf00ff", textTransform: "uppercase", marginBottom: "0.6rem" }}>// 003 — Projects</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "3rem" }}>Selected work and creative builds.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <section id="services" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.3em", color: "#00f0ff", textTransform: "uppercase", marginBottom: "0.6rem" }}>// 004 — Services</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "3rem" }}>How I can help businesses online.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem" }}>
          {services.map((svc, i) => (
            <Reveal key={svc.label} delay={i * 80}>
              <div
                style={{
                  padding: "1.6rem",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transition: "border-color 0.3s, background 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
                  e.currentTarget.style.background = "rgba(0,240,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <span style={{ color: "#00f0ff", fontFamily: "monospace", fontSize: 16 }}>▸</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>{svc.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS & EXPERIENCE ──────────────────────────── */}
      <section id="certs" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.3em", color: "#bf00ff", textTransform: "uppercase", marginBottom: "0.6rem" }}>// 005 — Achievements</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "3rem" }}>Learning, participation, and real involvement.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <Reveal>
              <h3 style={{ fontSize: 14, letterSpacing: "0.2em", color: "#00f0ff", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "1.2rem" }}>Certifications</h3>
            </Reveal>
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <HoloCard accentColor="#00f0ff" style={{ padding: "1.4rem 1.6rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 3, fontFamily: "monospace" }}>Issued · {c.provider}</div>
                  </div>
                </HoloCard>
              </Reveal>
            ))}
          </div>
          <div>
            <Reveal>
              <h3 style={{ fontSize: 14, letterSpacing: "0.2em", color: "#bf00ff", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "1.2rem" }}>Experience & Participation</h3>
            </Reveal>
            {experience.map((ex, i) => (
              <Reveal key={ex.title} delay={i * 100}>
                <HoloCard accentColor="#bf00ff" style={{ padding: "1.4rem 1.6rem", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(191,0,255,0.1)", border: "1px solid rgba(191,0,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{ex.icon}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: 15 }}>{ex.title}</span>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "rgba(191,0,255,0.12)", border: "1px solid rgba(191,0,255,0.25)", color: "#bf00ff", fontFamily: "monospace" }}>{ex.year}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{ex.description}</p>
                    </div>
                  </div>
                </HoloCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "6rem 2rem 8rem", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <HoloCard
            accentColor="#00f0ff"
            style={{ padding: "4rem", textAlign: "center", position: "relative", overflow: "hidden" }}
          >
            {/* Large bg glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 200, background: "radial-gradient(ellipse, rgba(0,240,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

            <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.3em", color: "#00f0ff", textTransform: "uppercase", marginBottom: "1rem" }}>// 006 — Contact</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.2 }}>
              Let's build something that actually stands out.
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
              If you need a modern website, landing page, or clean frontend interface, I'd love to help bring your idea to life.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", marginBottom: "2.5rem" }}>
              <a
                href="mailto:fizanizamani28@gmail.com"
                style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", letterSpacing: "0.05em" }}
              >
                ✉ fizanizamani28@gmail.com
              </a>
              <a
                href="https://github.com/fizanizamani"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", letterSpacing: "0.05em" }}
              >
                ⎇ github.com/fizanizamani
              </a>
            </div>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="mailto:fizanizamani28@gmail.com"
                style={{
                  padding: "13px 32px",
                  borderRadius: 6,
                  background: "linear-gradient(135deg, #00f0ff, #0080ff)",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  boxShadow: "0 0 30px rgba(0,240,255,0.25)",
                }}
              >
                Email Me →
              </a>
              <a
                href="https://github.com/fizanizamani"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "13px 32px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                GitHub
              </a>
            </div>
          </HoloCard>
        </Reveal>

        {/* Footer */}
        <Reveal delay={200}>
          <div style={{ textAlign: "center", marginTop: "4rem", fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
            © 2025 FIZA NIZAMANI · DESIGNED & BUILT WITH ♥
          </div>
        </Reveal>
      </section>
    </div>
  );
}
