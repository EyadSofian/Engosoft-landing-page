import { useState, useEffect, useRef, useMemo } from "react";

const WA = "201007725744";
const CAL = "https://calendar.app.google/35V4etCwYoD5poM77";

/* ═══ THEMES ═══ */
const LIGHT = { bg: "#f8f9fa", card: "#ffffff", cardBorder: "#e0e0e0", cardHoverBorder: "#1a73e8", text: "#202124", textSub: "#5f6368", accent: "#1a73e8", accentLight: "#e8f0fe", accentHover: "#1557b0", accentText: "#fff", btnOutline: "#dadce0", nav: "rgba(255,255,255,0.85)", navBorder: "#e8eaed", faqBorder: "rgba(0,0,0,0.06)", dot: "rgba(26,115,232,0.12)", heroBg: "#ffffff" };
const DARK = { bg: "#0e0e0e", card: "#1e1e1e", cardBorder: "#303030", cardHoverBorder: "#8ab4f8", text: "#e8eaed", textSub: "#9aa0a6", accent: "#8ab4f8", accentLight: "rgba(138,180,248,0.12)", accentHover: "#aecbfa", accentText: "#1a1a1a", btnOutline: "#3c4043", nav: "rgba(14,14,14,0.85)", navBorder: "rgba(255,255,255,0.06)", faqBorder: "rgba(255,255,255,0.08)", dot: "rgba(138,180,248,0.08)", heroBg: "#0e0e0e" };

/* ═══ SERVICES ═══ */
const SVC = {
  ar: [
    { id: "agent", badge: "الأكثر طلباً", title: "AI Customer Agent", subtitle: "وكيل ذكاء اصطناعي لخدمة العملاء", desc: "روبوت محادثة ذكي يردّ على عملائكم على مدار الساعة بالعربية والإنجليزية عبر واتساب والموقع وإنستجرام.",
      cats: [
        { t: "خدمة عملاء على مدار الساعة", fs: ["ردود فورية بالعربية والإنجليزية مع كشف تلقائي للغة", "قاعدة معرفة ذكية قابلة للتحديث عن منتجاتكم وخدماتكم", "تحويل ذكي للموظف البشري مع حفظ كامل سياق المحادثة"] },
        { t: "تأهيل ذكي للعملاء المحتملين", fs: ["تأهيل العملاء المحتملين تلقائياً", "حجز مواعيد ومعاينات مباشرة من المحادثة", "استرجاع السلات المتروكة وتأكيد الطلبات عبر واتساب"] },
        { t: "تحليلات وتقارير مفصّلة", fs: ["تقارير عن أسئلة العملاء وأداء الروبوت", "تخصيص كامل لشخصية الروبوت حسب هوية شركتكم", "يعمل على واتساب وتيليجرام والموقع في آن واحد"] },
      ] },
    { id: "auto", title: "AI Workflow Automation", subtitle: "أتمتة العمليات بالذكاء الاصطناعي", desc: "نربط أنظمتكم مع بعضها ونؤتمت المهام اليدوية المتكررة — من المتجر للـ ERP للتقارير.",
      cats: [
        { t: "ربط الأنظمة والمزامنة التلقائية", fs: ["مزامنة فورية بين المتجر الإلكتروني ونظام ERP", "إنشاء تلقائي للعملاء وأوامر البيع مع فحص التكرارات", "معالجة ذكية للأخطاء وإعادة المحاولة تلقائياً"] },
        { t: "إشعارات وتسويق تلقائي", fs: ["إرسال إشعارات تلقائية عبر واتساب والبريد", "متابعة تلقائية للعملاء المحتملين والصفقات", "تقارير أداء يومية وأسبوعية تلقائية"] },
        { t: "أتمتة متقدمة", fs: ["أتمتة إدارة صفحات التواصل الاجتماعي", "فحص وتصنيف السير الذاتية بالذكاء الاصطناعي", "أتمتة طلبات الأسعار والمتابعات للمورّدين"] },
      ] },
    { id: "quality", title: "AI Quality Monitor", subtitle: "تقييم الجودة والتحليلات الذكية", desc: "نظام يراقب مكالمات فريقكم، يقيّمها بالذكاء الاصطناعي، ويوفّر تقارير فورية.",
      cats: [
        { t: "تقييم جودة المكالمات", fs: ["تحويل تلقائي للمكالمات العربية إلى نصوص بدقة عالية", "تقييم شامل على أكثر من 50 معياراً في 6 فئات", "ربط تلقائي مع نظام إدارة العملاء"] },
        { t: "تقارير وتحليلات فورية", fs: ["تقارير تفصيلية تُرسل بالبريد تلقائياً", "نظام حماية ذكي يمنع التقييمات الخاطئة", "لوحة متابعة مع تاريخ كامل لكل تقييم"] },
      ] },
  ],
  en: [
    { id: "agent", badge: "Most Popular", title: "AI Customer Agent", subtitle: "Intelligent customer service agent", desc: "Smart chatbot responding to your customers 24/7 in Arabic and English via WhatsApp, website, and Instagram.",
      cats: [
        { t: "24/7 Customer Service", fs: ["Instant Arabic & English responses with auto detection", "Smart updatable knowledge base about your products", "Intelligent human handoff with full context"] },
        { t: "Smart Lead Qualification", fs: ["Automatic lead qualification and scoring", "Direct appointment booking from conversation", "Cart recovery and order confirmation via WhatsApp"] },
        { t: "Analytics & Reports", fs: ["Reports on customer questions and bot performance", "Fully customizable bot personality for your brand", "Works on WhatsApp, Telegram & website simultaneously"] },
      ] },
    { id: "auto", title: "AI Workflow Automation", subtitle: "AI-powered process automation", desc: "We connect your systems and automate repetitive manual tasks — from store to ERP to reports.",
      cats: [
        { t: "System Integration & Sync", fs: ["Instant sync between online store and ERP", "Auto customer & order creation with duplicate detection", "Smart error handling with automatic retry"] },
        { t: "Automated Notifications", fs: ["Auto notifications via WhatsApp and email", "Automated lead and deal follow-ups", "Daily and weekly reports sent automatically"] },
        { t: "Advanced Automation", fs: ["Social media management and auto-replies", "AI-powered CV screening and ranking", "Automated rate requests and supplier follow-ups"] },
      ] },
    { id: "quality", title: "AI Quality Monitor", subtitle: "Quality assessment & analytics", desc: "A system that monitors your team's calls, evaluates with AI, and delivers instant reports.",
      cats: [
        { t: "Call Quality Assessment", fs: ["Auto Arabic call-to-text with high accuracy", "Evaluation on 50+ criteria across 6 categories", "Automatic CRM matching and integration"] },
        { t: "Instant Reports & Analytics", fs: ["Detailed reports sent automatically to managers", "Smart safety layer preventing false evaluations", "Full history dashboard for every evaluation"] },
      ] },
  ],
};

const FAQS = {
  ar: [
    { q: "كم يستغرق التنفيذ؟", a: "الأنظمة البسيطة أسبوع إلى أسبوعين، والمعقدة من 3 إلى 5 أسابيع." },
    { q: "هل يدعم اللغة العربية بلهجاتها؟", a: "نعم. الفصحى والمصرية والسعودية والخليجية والإنجليزية." },
    { q: "ماذا لو حدثت مشكلة بعد التسليم؟", a: "صيانة ودعم شهري. أي مشكلة تُحَل خلال 4 إلى 24 ساعة." },
    { q: "لسنا متخصصين في التقنية؟", a: "نحن نتولى الجانب التقني بالكامل. أنتم ترون النتائج فقط." },
    { q: "هل تعملون خارج مصر؟", a: "نعم. مصر والسعودية والإمارات والكويت وأوروبا." },
  ],
  en: [
    { q: "How long does implementation take?", a: "Simple: 1-2 weeks. Complex: 3-5 weeks." },
    { q: "Does it support Arabic dialects?", a: "Yes. MSA, Egyptian, Saudi, Gulf, and English." },
    { q: "What if something breaks?", a: "Monthly support. Issues resolved in 4-24 hours." },
    { q: "We're not technical?", a: "We handle everything. You just see results." },
    { q: "Do you work outside Egypt?", a: "Yes. Egypt, Saudi, UAE, Kuwait, Europe." },
  ],
};

/* ═══ ANIMATED DOTS BACKGROUND ═══ */
function FloatingDots({ theme }) {
  const canvasRef = useRef(null);
  const dots = useMemo(() => Array.from({ length: 40 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    r: Math.random() * 2.5 + 1, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
    o: Math.random() * 0.5 + 0.2,
  })), []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const color = theme === "dark" ? "138,180,248" : "26,115,232";
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > 100) d.vx *= -1;
        if (d.y < 0 || d.y > 100) d.vy *= -1;
        const px = (d.x / 100) * c.width;
        const py = (d.y / 100) * c.height;
        ctx.beginPath();
        ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${d.o * (theme === "dark" ? 0.3 : 0.2)})`;
        ctx.fill();
      });
      // lines between close dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = ((dots[i].x - dots[j].x) / 100) * c.width;
          const dy = ((dots[i].y - dots[j].y) / 100) * c.height;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo((dots[i].x / 100) * c.width, (dots[i].y / 100) * c.height);
            ctx.lineTo((dots[j].x / 100) * c.width, (dots[j].y / 100) * c.height);
            ctx.strokeStyle = `rgba(${color},${(1 - dist / 150) * (theme === "dark" ? 0.08 : 0.05)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [theme, dots]);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ═══ FAQ ═══ */
function FaqItem({ f, th, isRTL, ff }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${th.faqBorder}` }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "18px 0", border: "none", background: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: ff, textAlign: isRTL ? "right" : "left" }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: th.text }}>{f.q}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={th.accent} style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0, margin: isRTL ? "0 16px 0 0" : "0 0 0 16px" }}><path d="M7 10l5 5 5-5z"/></svg>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div style={{ paddingBottom: 18, fontSize: 14, color: th.textSub, lineHeight: 1.8 }}>{f.a}</div>
      </div>
    </div>
  );
}

/* ═══ SERVICE CARD ═══ */
function Card({ s, th, isRTL, ff }) {
  const [exp, setExp] = useState(false);
  return (
    <div style={{ background: th.card, borderRadius: 16, border: `1px solid ${th.cardBorder}`, overflow: "hidden", flex: "1 1 300px", maxWidth: 400, minWidth: 280, transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s", position: "relative", zIndex: 1 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = th.cardHoverBorder; e.currentTarget.style.boxShadow = `0 0 30px ${th.accent}12`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = th.cardBorder; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
      {s.badge && <div style={{ position: "absolute", top: 16, [isRTL ? "left" : "right"]: 16, background: th.accentLight, color: th.accent, padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: ff }}>{s.badge}</div>}
      <div style={{ padding: "32px 24px 20px" }}>
        <h3 style={{ fontSize: 22, fontWeight: 600, color: th.text, marginBottom: 4 }}>{s.title}</h3>
        <p style={{ fontSize: 14, color: th.accent, fontWeight: 500, marginBottom: 14 }}>{s.subtitle}</p>
        <p style={{ fontSize: 14, color: th.textSub, lineHeight: 1.7, marginBottom: 24 }}>{s.desc}</p>
        <a href={CAL} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "13px 24px", borderRadius: 28, background: th.accent, color: th.accentText, textDecoration: "none", fontWeight: 600, fontSize: 14, fontFamily: ff, transition: "background 0.2s", marginBottom: 10 }}
          onMouseEnter={e => e.currentTarget.style.background = th.accentHover} onMouseLeave={e => e.currentTarget.style.background = th.accent}>
          {isRTL ? "احجز عرضاً تجريبياً" : "Book a Demo"}</a>
        <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "11px 24px", borderRadius: 28, background: "transparent", color: th.accent, textDecoration: "none", border: `1px solid ${th.btnOutline}`, fontWeight: 600, fontSize: 13, fontFamily: ff, transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = th.accentLight} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          {isRTL ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</a>
      </div>
      <div style={{ borderTop: `1px solid ${th.cardBorder}`, padding: "16px 24px 8px" }}>
        <p style={{ fontSize: 13, color: th.textSub, marginBottom: 14 }}>{isRTL ? "يشمل:" : "Includes:"}</p>
        {s.cats.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: th.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={th.accent}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: th.text }}>{c.t}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${th.cardBorder}` }}>
        {exp && (
          <div style={{ padding: "16px 24px" }}>
            {s.cats.map((c, ci) => (
              <div key={ci} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: th.accent, marginBottom: 8 }}>{c.t}</div>
                {c.fs.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", gap: 8, marginBottom: 6, paddingRight: isRTL ? 8 : 0, paddingLeft: isRTL ? 0 : 8 }}>
                    <span style={{ color: th.accent, fontSize: 11, marginTop: 4, flexShrink: 0 }}>+</span>
                    <span style={{ fontSize: 13, color: th.textSub, lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setExp(!exp)} style={{ width: "100%", padding: "14px", border: "none", background: "transparent", color: th.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: ff, borderTop: exp ? `1px solid ${th.cardBorder}` : "none" }}>
          {exp ? (isRTL ? "إخفاء التفاصيل" : "Hide features") : (isRTL ? "عرض تفاصيل الخدمة" : "View plan features")}
          <svg width="12" height="12" viewBox="0 0 24 24" fill={th.accent} style={{ display: "inline-block", verticalAlign: "middle", transform: exp ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", margin: isRTL ? "0 6px 0 0" : "0 0 0 6px" }}><path d="M7 10l5 5 5-5z"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function App() {
  const [lang, setLang] = useState("ar");
  const [mode, setMode] = useState("light");
  const [heroVis, setHeroVis] = useState(false);
  const isRTL = lang === "ar";
  const ff = isRTL ? "'Tajawal', sans-serif" : "'Segoe UI', system-ui, sans-serif";
  const th = mode === "dark" ? DARK : LIGHT;

  useEffect(() => { setTimeout(() => setHeroVis(true), 100); }, []);
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}::selection{background:rgba(26,115,232,0.2)}
    .ht{opacity:0;transform:translateY(30px);transition:all 0.9s cubic-bezier(0.16,1,0.3,1)}.ht.v{opacity:1;transform:translateY(0)}.ht2{transition-delay:.12s}.ht3{transition-delay:.24s}.ht4{transition-delay:.4s}`;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  useEffect(() => { document.body.style.background = th.bg; }, [th.bg]);

  const t = isRTL ? { l1: "ارتقِ بأعمالك مع", brand: "Engosoft AI", sub: "ثلاث خدمات ذكية تعمل على مدار الساعة — لتوفير الوقت وزيادة المبيعات وتحسين تجربة عملائكم", cta: "احجز عرضاً تجريبياً مجاناً", faq: "الأسئلة الشائعة", foot: "حلول تقنية متكاملة — من الفكرة إلى التنفيذ", demo: "احجز عرضاً" }
    : { l1: "Power your business with", brand: "Engosoft AI", sub: "Three intelligent services working 24/7 — to save time, increase sales, and improve customer experience", cta: "Book a free demo", faq: "Frequently Asked Questions", foot: "Full-Service Tech Solutions — From Idea to Execution", demo: "Book Demo" };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff, color: th.text, minHeight: "100vh", background: th.bg, transition: "background 0.4s, color 0.4s" }}>
      <FloatingDots theme={mode} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: th.nav, backdropFilter: "blur(20px)", borderBottom: `1px solid ${th.navBorder}`, padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.4s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${th.accent}, #4285f4)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 11 }}>ES</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: th.text }}>Engosoft</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Dark mode toggle */}
          <button onClick={() => setMode(mode === "light" ? "dark" : "light")} style={{ background: "none", border: `1px solid ${th.btnOutline}`, borderRadius: 20, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = th.accentLight} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            {mode === "light"
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill={th.textSub}><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill={th.textSub}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>}
          </button>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{ background: "none", border: `1px solid ${th.btnOutline}`, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 500, color: th.textSub, cursor: "pointer", fontFamily: ff }}>{lang === "ar" ? "English" : "عربي"}</button>
          <a href={CAL} target="_blank" rel="noopener noreferrer" style={{ background: th.accent, color: th.accentText, padding: "8px 22px", borderRadius: 20, textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: ff }}>{t.demo}</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "80px 24px 48px", background: th.heroBg, transition: "background 0.4s" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className={`ht ${heroVis ? 'v' : ''}`} style={{ marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, margin: "0 auto", borderRadius: 10, background: `linear-gradient(135deg, ${th.accent}, #4285f4)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>ES</div>
          </div>
          <h1 className={`ht ht2 ${heroVis ? 'v' : ''}`} style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, lineHeight: 1.25, marginBottom: 8, color: th.text, transition: "color 0.4s" }}>{t.l1}</h1>
          <h1 className={`ht ht3 ${heroVis ? 'v' : ''}`} style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 500, lineHeight: 1.25, marginBottom: 24, color: th.accent }}>{t.brand}</h1>
          <p className={`ht ht3 ${heroVis ? 'v' : ''}`} style={{ fontSize: 16, color: th.textSub, maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.8 }}>{t.sub}</p>
          <div className={`ht ht4 ${heroVis ? 'v' : ''}`}>
            <a href={CAL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: th.accent, color: th.accentText, padding: "14px 32px", borderRadius: 28, textDecoration: "none", fontWeight: 600, fontSize: 15, fontFamily: ff, transition: "background 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = th.accentHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = th.accent; e.currentTarget.style.transform = "translateY(0)"; }}>
              {t.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill={th.accentText}><path d={isRTL ? "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" : "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"}/></svg>
            </a>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: th.navBorder, position: "relative", zIndex: 1 }} />

      {/* CARDS */}
      <section style={{ padding: "48px 24px 72px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", maxWidth: 1280, margin: "0 auto", alignItems: "flex-start" }}>
          {SVC[lang].map(s => <Card key={s.id} s={s} th={th} isRTL={isRTL} ff={ff} />)}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "48px 24px 64px", borderTop: `1px solid ${th.navBorder}`, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 400, textAlign: "center", marginBottom: 36, color: th.text }}>{t.faq}</h2>
          {FAQS[lang].map((f, i) => <FaqItem key={i} f={f} th={th} isRTL={isRTL} ff={ff} />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 24px", borderTop: `1px solid ${th.navBorder}`, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: `linear-gradient(135deg, ${th.accent}, #4285f4)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 7 }}>ES</div>
          <span style={{ fontWeight: 700, fontSize: 14, color: th.text }}>Engosoft</span>
        </div>
        <p style={{ fontSize: 12, color: th.textSub }}>{t.foot}</p>
        <p style={{ fontSize: 11, color: th.btnOutline, marginTop: 4 }}>© 2025 Engosoft</p>
      </footer>

      {/* WA Float */}
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, width: 52, height: 52, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 16px rgba(37,211,102,0.35)", textDecoration: "none", transition: "transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
