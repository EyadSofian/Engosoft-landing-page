import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Moon, Sun, ExternalLink, Github, Linkedin, MessageCircle, Mail, X, Play, Menu } from "lucide-react";
import { PROJECTS, CATEGORIES, SKILLS, EXPERIENCE, CERTS } from "./data";

/* ── helpers ── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}
const gl = { background: "var(--glass)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid var(--glass-b)", borderRadius: "var(--r)" };

/* ── Animated Workflow Visualization ── */
function WorkflowAnim() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const nodes = [
    { x: 60, y: 80, label: "Trigger", icon: "⚡", color: "#F59E0B" },
    { x: 220, y: 40, label: "AI Process", icon: "🧠", color: "#8B5CF6" },
    { x: 220, y: 120, label: "Data Fetch", icon: "📦", color: "#3B82F6" },
    { x: 390, y: 80, label: "Transform", icon: "⚙️", color: "#10B981" },
    { x: 540, y: 40, label: "CRM Save", icon: "💾", color: "#EF4444" },
    { x: 540, y: 120, label: "Notify", icon: "📧", color: "#F97316" },
  ];
  const paths = [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5]];

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 620, margin: "0 auto", padding: "20px 0" }}>
      <svg viewBox="0 0 620 170" style={{ width: "100%", height: "auto" }}>
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="g" /><feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {/* Animated connection lines */}
        {paths.map(([a, b], i) => {
          const n1 = nodes[a], n2 = nodes[b];
          const d = `M${n1.x + 35},${n1.y + 20} C${(n1.x + n2.x) / 2 + 35},${n1.y + 20} ${(n1.x + n2.x) / 2 + 35},${n2.y + 20} ${n2.x + 35},${n2.y + 20}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="var(--glass-b)" strokeWidth="2" />
              {inView && (
                <motion.path d={d} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="8 4"
                  initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, delay: i * 0.3 + 0.5, repeat: Infinity, ease: "linear" }} />
              )}
            </g>
          );
        })}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g key={i} initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <rect x={n.x} y={n.y} width="70" height="40" rx="10" fill="var(--glass)" stroke={n.color + "60"} strokeWidth="1.5" filter="url(#glow)" />
            <text x={n.x + 18} y={n.y + 24} fontSize="16">{n.icon}</text>
            <text x={n.x + 36} y={n.y + 26} fontSize="8" fill="var(--text2)" fontFamily="system-ui" textAnchor="start" fontWeight="600">{n.label.length > 6 ? "" : n.label}</text>
            <text x={n.x + 35} y={n.y + 56} fontSize="9" fill="var(--muted)" fontFamily="system-ui" textAnchor="middle" fontWeight="500">{n.label}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({ p, i, onClick }) {
  return (
    <Reveal delay={i * 0.04}>
      <motion.div onClick={() => onClick(p)} whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(0,0,0,.15)" }}
        transition={{ duration: 0.2 }}
        style={{ ...gl, padding: 22, cursor: "pointer", position: "relative", overflow: "hidden", height: "100%" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <span style={{ fontSize: 28 }}>{p.emoji}</span>
          <span style={{ fontSize: 10, color: p.color, background: p.color + "14", padding: "3px 10px", borderRadius: 12, fontWeight: 600 }}>{p.cat}</span>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{p.title}</h3>
        <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, marginBottom: 10 }}>{p.client} · {p.year}</p>
        <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.65, marginBottom: 14 }}>
          {p.desc.length > 130 ? p.desc.slice(0, 130) + "…" : p.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: (p.demo || p.repo || p.workflow) ? 12 : 0 }}>
          {p.tags.slice(0, 4).map(t => <span key={t} style={{ fontSize: 9.5, color: "var(--muted)", background: "var(--surface)", padding: "3px 7px", borderRadius: 5, fontWeight: 500 }}>{t}</span>)}
          {p.tags.length > 4 && <span style={{ fontSize: 9, color: "var(--muted)" }}>+{p.tags.length - 4}</span>}
        </div>
        {(p.demo || p.repo || p.workflow) && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {p.demo && <span onClick={e => { e.stopPropagation(); window.open(p.demo, "_blank") }}
              style={{ fontSize: 10, color: "#FFF", background: p.color, padding: "4px 10px", borderRadius: 6, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Play size={10} /> Try It</span>}
            {p.repo && <span onClick={e => { e.stopPropagation(); window.open(p.repo, "_blank") }}
              style={{ fontSize: 10, color: "var(--text2)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>Repo ↗</span>}
            {p.workflow && <span onClick={e => { e.stopPropagation(); window.open(p.workflow, "_blank") }}
              style={{ fontSize: 10, color: "var(--text2)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>Workflow ↗</span>}
          </div>
        )}
      </motion.div>
    </Reveal>
  );
}

/* ── Skill bar ── */
function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ delay }}
      style={{ ...gl, padding: "12px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{name}</span>
        <span style={{ fontSize: 10.5, color: "var(--muted)" }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "var(--surface)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={v ? { width: level + "%" } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }}
          style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, var(--accent), var(--accent2))" }} />
      </div>
    </motion.div>
  );
}

/* ── Modal ── */
function Modal({ p, onClose }) {
  if (!p) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} onClick={e => e.stopPropagation()}
        style={{ background: "var(--bg2)", border: "1px solid var(--glass-b)", borderRadius: 20, maxWidth: 600, width: "100%", maxHeight: "82vh", overflow: "auto", padding: "28px 24px", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "var(--glass)", border: "1px solid var(--glass-b)", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}><X size={15} /></button>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)`, borderRadius: "20px 20px 0 0" }} />
        <span style={{ fontSize: 38, display: "block", marginBottom: 8 }}>{p.emoji}</span>
        <span style={{ fontSize: 10, color: p.color, background: p.color + "14", padding: "3px 11px", borderRadius: 12, fontWeight: 600 }}>{p.cat}</span>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: "8px 0 4px" }}>{p.title}</h2>
        <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, marginBottom: 14 }}>{p.client} · {p.year}</p>
        {(p.demo || p.repo || p.workflow) && (
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
            {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#FFF", background: p.color, padding: "8px 16px", borderRadius: 9, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}><Play size={14} /> Live Demo</a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "var(--text2)", background: "var(--glass)", padding: "8px 16px", borderRadius: 9, fontWeight: 600, border: "1px solid var(--glass-b)" }}>Repo ↗</a>}
            {p.workflow && <a href={p.workflow} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "var(--text2)", background: "var(--glass)", padding: "8px 16px", borderRadius: 9, fontWeight: 600, border: "1px solid var(--glass-b)" }}>Workflow ↗</a>}
          </div>
        )}
        <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.75, marginBottom: 18 }}>{p.desc}</p>
        <p style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1.3, fontWeight: 700, marginBottom: 8 }}>Metrics</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.entries(p.metrics).map(([k, v]) => (
            <div key={k} style={{ ...gl, padding: "10px 14px", flex: 1, minWidth: 90 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: p.color }}>{v}</div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", marginTop: 2 }}>{k}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── MAIN APP ── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [cat, setCat] = useState(0);
  const [sel, setSel] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { document.body.className = dark ? "" : "light"; }, [dark]);

  const filtered = cat === 0 ? PROJECTS : PROJECTS.filter(p => p.cat === CATEGORIES[cat]);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const navLinks = ["projects", "skills", "experience", "contact"];

  return (
    <>
      {/* ── NAV ── */}
      <motion.nav initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "12px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all .3s",
          ...(scrolled ? { background: dark ? "rgba(11,14,20,.9)" : "rgba(247,248,250,.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--glass-b)" } : {}) }}>
        <div style={{ fontWeight: 800, fontSize: 17 }}>
          eyad<span style={{ color: "var(--accent)" }}>.</span><span style={{ color: "var(--muted)" }}>dev</span>
        </div>
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }} className="desk-nav">
          {navLinks.map(s => (
            <span key={s} onClick={() => go(s)} style={{ fontSize: 13, color: "var(--text2)", cursor: "pointer", padding: "6px 10px", borderRadius: 8, fontWeight: 500 }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}</span>
          ))}
          <button onClick={() => setDark(!dark)} style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid var(--glass-b)", background: "var(--glass)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer">
            <button style={{ background: "var(--accent)", color: "#FFF", fontWeight: 700, fontSize: 12, padding: "7px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "inherit" }}>Let's Talk</button>
          </a>
        </div>
        {/* Mobile hamburger */}
        <div style={{ display: "none" }} className="mob-nav">
          <button onClick={() => setDark(!dark)} style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid var(--glass-b)", background: "var(--glass)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)", marginRight: 6 }}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid var(--glass-b)", background: "var(--glass)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}>
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: "fixed", top: 58, left: 0, right: 0, zIndex: 99, background: dark ? "rgba(11,14,20,.95)" : "rgba(247,248,250,.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--glass-b)", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
            {navLinks.map(s => (
              <span key={s} onClick={() => go(s)} style={{ fontSize: 15, color: "var(--text)", padding: "10px 0", cursor: "pointer", fontWeight: 600, borderBottom: "1px solid var(--glass-b)" }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}</span>
            ))}
            <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8 }}>
              <button style={{ background: "var(--accent)", color: "#FFF", fontWeight: 700, fontSize: 14, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", width: "100%" }}>Let's Talk</button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "90px 20px 50px", position: "relative" }}>
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: `radial-gradient(circle, ${dark ? "rgba(52,211,153,.05)" : "rgba(5,150,105,.04)"} 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--glow)", border: `1px solid ${dark ? "rgba(52,211,153,.2)" : "rgba(5,150,105,.15)"}`, borderRadius: 18, padding: "4px 13px", marginBottom: 22 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>Botpress Certified Partner</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
            style={{ fontSize: "clamp(32px, 6vw, 62px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 14 }}>
            Eyad <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sofian</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)", color: "var(--text2)", fontWeight: 500, marginBottom: 8 }}>
            AI Product & Technology Specialist
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
            style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "var(--muted)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 14px" }}>
            I build production chatbots, automation workflows, LLM fine-tuning pipelines, and system integrations — serving clients across Egypt, Saudi Arabia, and the Gulf.
          </motion.p>

          {/* Animated workflow */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <WorkflowAnim />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("projects")} style={{ background: "var(--accent)", color: "#FFF", padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}>View Projects</button>
            {[["GitHub", "https://github.com/EyadSofian", Github], ["LinkedIn", "https://www.linkedin.com/in/eyad-sofian-16b753238", Linkedin]].map(([l, u, Icon]) => (
              <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{ ...gl, padding: "8px 18px", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--text2)" }}><Icon size={13} /> {l}</a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "0 20px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
        {[["🚀", "15+", "Projects"], ["⚡", "22", "n8n Workflows"], ["🤖", "8+", "Bots Live"], ["🤝", "10+", "Clients"], ["🧠", "3+", "LLMs Trained"]].map(([icon, val, label], i) => (
          <Reveal key={i} delay={i * 0.06}>
            <motion.div whileHover={{ y: -3 }} style={{ ...gl, padding: 18, textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px" }}>{val}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 500, marginTop: 2 }}>{label}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ maxWidth: 1020, margin: "0 auto", padding: "60px 20px" }}>
        <Reveal>
          <p style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 }}>Portfolio</p>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px" }}>Featured Projects</h2>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, marginBottom: 24 }}>Real production systems — not demos.</p>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
          {CATEGORIES.map((c, i) => (
            <motion.button key={c} whileTap={{ scale: 0.95 }} onClick={() => setCat(i)}
              style={{ ...gl, padding: "6px 14px", borderRadius: 18, cursor: "pointer", fontSize: 11, fontWeight: 600,
                fontFamily: "inherit", color: cat === i ? "#FFF" : "var(--text2)", whiteSpace: "nowrap",
                background: cat === i ? "var(--accent)" : "var(--glass)",
                borderColor: cat === i ? "var(--accent)" : "var(--glass-b)" }}>{c}</motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} onClick={setSel} />)}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── SKILLS (with new categories) ── */}
      <section id="skills" style={{ maxWidth: 1020, margin: "0 auto", padding: "60px 20px" }}>
        <Reveal>
          <p style={{ fontSize: 11, color: "var(--accent2)", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 }}>Tech Stack</p>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 24 }}>Tools & Technologies</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
          {[...SKILLS,
            ["LLM Fine-tuning (QLoRA)", 75], ["Arabic NLP / Dialect", 85], ["Prompt Engineering", 90], ["Hugging Face", 75], ["Make / Zapier", 70]
          ].map(([n, l], i) => <SkillBar key={n} name={n} level={l} delay={i * 0.025} />)}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ maxWidth: 1020, margin: "0 auto", padding: "60px 20px" }}>
        <Reveal>
          <p style={{ fontSize: 11, color: "#F87171", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 }}>Career</p>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 24 }}>Experience</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <motion.div animate={e.current ? { scale: [1, 1.3, 1] } : {}} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{ width: 10, height: 10, borderRadius: "50%", background: e.current ? "var(--accent)" : "var(--glass-b)", border: e.current ? "none" : "2px solid var(--glass-b)" }} />
                  {i < EXPERIENCE.length - 1 && <div style={{ width: 1, background: "var(--glass-b)", flex: 1, minHeight: 50 }} />}
                </div>
                <div style={{ paddingBottom: 22 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{e.role}</div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 500 }}>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{e.co}</span> · {e.period}
                  </div>
                  <span style={{ fontSize: 9.5, color: "var(--muted)", background: "var(--glass)", padding: "2px 7px", borderRadius: 4, fontWeight: 500, display: "inline-block", marginTop: 3, border: "1px solid var(--glass-b)" }}>{e.type}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CERTS ── */}
      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "0 20px 60px" }}>
        <Reveal>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Certifications</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CERTS.map((c, i) => (
              <motion.div key={i} whileHover={{ y: -2 }}
                style={{ background: c.color + "0A", border: `1px solid ${c.color}20`, borderRadius: 11, padding: "10px 16px", display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, color: "var(--text2)", fontWeight: 500 }}>{c.name}</span>
                {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ color: c.color, display: "flex" }}><ExternalLink size={11} /></a>}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ maxWidth: 620, margin: "0 auto", padding: "60px 20px 80px", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: 11, color: "#FBBF24", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 }}>Get in Touch</p>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10 }}>Let's Build Something</h2>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 26, lineHeight: 1.6 }}>
            Open to AI automation, chatbot development, LLM fine-tuning, and system integration projects.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ y: -2 }} style={{ background: "#25D366", color: "#FFF", padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                <MessageCircle size={15} /> WhatsApp
              </motion.button>
            </a>
            <a href="mailto:eyadsofian862@gmail.com" style={{ ...gl, padding: "10px 22px", display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--text2)" }}><Mail size={15} /> Email</a>
          </div>
        </Reveal>
      </section>

      <footer style={{ borderTop: "1px solid var(--glass-b)", padding: "16px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 10.5, color: "var(--muted)" }}>© 2026 Eyad Sofian · Cairo, Egypt</span>
        <span style={{ fontSize: 10.5, color: "var(--muted)" }}>React + Framer Motion</span>
      </footer>

      <AnimatePresence>{sel && <Modal p={sel} onClose={() => setSel(null)} />}</AnimatePresence>

      {/* Mobile responsive CSS */}
      <style>{`
        @media(min-width:769px){.mob-nav{display:none!important}}
        @media(max-width:768px){.desk-nav{display:none!important}.mob-nav{display:flex!important}}
      `}</style>
    </>
  );
}
