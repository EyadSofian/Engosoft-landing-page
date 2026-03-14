import { useState, useEffect, useRef } from "react";

const WA = "201007725744";
const WEB3KEY = "37492e85-55bb-4594-8018-2647115be762";

/* ─── Scroll reveal hook ─── */
function useOnScreen(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}
function FadeIn({ children, delay = 0, style = {} }) {
  const r = useRef();
  const v = useOnScreen(r);
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s cubic-bezier(0.25,0.8,0.25,1) ${delay}s`, ...style }}>{children}</div>;
}

/* ─── FAQ Accordion ─── */
function FaqItem({ f, i }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={i * 0.08}>
      <div style={{ background: "#fff", borderRadius: 12, marginBottom: 8, border: "1px solid #EEF2F7", overflow: "hidden" }}>
        <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: open ? "#0A2463" : "#333" }}>{f.q}</span>
          <span style={{ fontSize: 18, color: "#0A2463", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
        </div>
        {open && <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#666", lineHeight: 1.8 }}>{f.a}</div>}
      </div>
    </FadeIn>
  );
}

/* ─── WhatsApp SVG ─── */
const WaSvg = ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const Check = ({ color = "#25D366" }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

/* ═══════════════════════════════════════════
   NEEDS ASSESSMENT QUESTIONNAIRE
   ═══════════════════════════════════════════ */
const STEPS = [
  { id: "industry", titleAr: "ما هو مجال عمل شركتكم؟", titleEn: "What industry is your company in?", type: "select",
    options: [
      { value: "tourism", ar: "سياحة وفنادق", en: "Tourism & Hotels" },
      { value: "ecommerce", ar: "تجارة إلكترونية", en: "E-Commerce" },
      { value: "realestate", ar: "عقارات", en: "Real Estate" },
      { value: "healthcare", ar: "رعاية صحية / صيدلة", en: "Healthcare / Pharma" },
      { value: "education", ar: "تعليم وتدريب", en: "Education & Training" },
      { value: "food", ar: "مطاعم وأغذية", en: "Food & Restaurants" },
      { value: "services", ar: "خدمات مهنية", en: "Professional Services" },
      { value: "retail", ar: "تجارة تجزئة", en: "Retail" },
      { value: "tech", ar: "تقنية وبرمجيات", en: "Tech & Software" },
      { value: "other", ar: "مجال آخر", en: "Other" },
    ] },
  { id: "need", titleAr: "ما أكثر ما تحتاجه حالياً؟", titleEn: "What do you need most right now?", subtitleAr: "اختر كل ما ينطبق عليك", subtitleEn: "Select all that apply", type: "multi",
    options: [
      { value: "chatbot", ar: "روبوت محادثة / بوت واتساب لخدمة العملاء", en: "Chatbot / WhatsApp bot" },
      { value: "automation", ar: "أتمتة العمليات (ربط أنظمة، تقارير)", en: "Process automation" },
      { value: "crm", ar: "نظام إدارة علاقات العملاء (CRM / ERP)", en: "CRM / ERP system" },
      { value: "calls", ar: "تقييم جودة المكالمات بالذكاء الاصطناعي", en: "AI call quality monitoring" },
      { value: "hr", ar: "فحص وتصنيف السير الذاتية تلقائياً", en: "CV screening & ranking" },
      { value: "social", ar: "أتمتة وسائل التواصل الاجتماعي", en: "Social media automation" },
      { value: "website", ar: "إنشاء موقع إلكتروني أو صفحة هبوط", en: "Website / landing page" },
      { value: "notsure", ar: "غير متأكد — أحتاج استشارة", en: "Not sure — need consultation" },
    ] },
  { id: "size", titleAr: "كم عدد أفراد فريقكم؟", titleEn: "How many people in your team?", type: "select",
    options: [
      { value: "solo", ar: "شخص واحد (شركة ناشئة)", en: "Just me (startup)" },
      { value: "small", ar: "2 – 10 أشخاص", en: "2 – 10 people" },
      { value: "medium", ar: "11 – 50 شخصاً", en: "11 – 50 people" },
      { value: "large", ar: "51 – 200 شخص", en: "51 – 200 people" },
      { value: "enterprise", ar: "أكثر من 200 شخص", en: "200+ people" },
    ] },
  { id: "tools", titleAr: "هل تستخدمون أي أنظمة أو أدوات حالياً؟", titleEn: "What tools do you currently use?", subtitleAr: "اختر كل ما تستخدمه", subtitleEn: "Select all you use", type: "multi",
    options: [
      { value: "wa", ar: "واتساب للأعمال", en: "WhatsApp Business" },
      { value: "excel", ar: "Excel / Google Sheets", en: "Excel / Google Sheets" },
      { value: "odoo", ar: "Odoo", en: "Odoo" },
      { value: "shopify", ar: "Shopify / WooCommerce / Salla", en: "Shopify / WooCommerce / Salla" },
      { value: "crm", ar: "HubSpot / Zoho / Salesforce", en: "HubSpot / Zoho / Salesforce" },
      { value: "pbx", ar: "نظام هاتف (Yeastar / غير ذلك)", en: "PBX (Yeastar / Other)" },
      { value: "none", ar: "لا نستخدم أي أدوات حالياً", en: "No tools currently" },
    ] },
  { id: "pain", titleAr: "ما أكبر تحدٍّ تواجهه شركتكم؟", titleEn: "What's your biggest challenge?", type: "select",
    options: [
      { value: "time", ar: "يهدر الموظفون وقتاً طويلاً في مهام يدوية متكررة", en: "Staff waste time on repetitive manual work" },
      { value: "customers", ar: "يشتكي العملاء من بطء الاستجابة أو انعدامها", en: "Customers complain about slow responses" },
      { value: "data", ar: "لا تتوفر بيانات واضحة عن الأداء والمبيعات", en: "No clear performance data" },
      { value: "growth", ar: "الشركة في نمو ونحتاج لتنظيم العمليات", en: "Company growing, need to organize" },
      { value: "cost", ar: "تكلفة الموظفين مرتفعة ونريد تقليل النفقات", en: "High staff costs" },
      { value: "competition", ar: "المنافسون يستخدمون التكنولوجيا ونحن متأخرون", en: "Competitors using tech" },
    ] },
  { id: "budget", titleAr: "ما ميزانيتكم التقريبية؟", titleEn: "Approximate budget?", subtitleAr: "يساعدنا ذلك في اقتراح الحل الأنسب لكم", subtitleEn: "Helps us suggest the right solution", type: "select",
    options: [
      { value: "u500", ar: "أقل من $500", en: "Under $500" },
      { value: "500_1500", ar: "$500 – $1,500", en: "$500 – $1,500" },
      { value: "1500_5000", ar: "$1,500 – $5,000", en: "$1,500 – $5,000" },
      { value: "5000p", ar: "أكثر من $5,000", en: "$5,000+" },
      { value: "discuss", ar: "نتفق بعد الاستشارة", en: "Discuss after consultation" },
    ] },
  { id: "contact", titleAr: "كيف يمكننا التواصل معكم؟", titleEn: "How can we reach you?", type: "contact" },
];

function NeedsAssessment({ lang, onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "", company: "", website: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const isRTL = lang === "ar";
  const ff = isRTL ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif";
  const cur = STEPS[step];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const select = (val) => {
    if (cur.type === "multi") {
      const prev = answers[cur.id] || [];
      setAnswers({ ...answers, [cur.id]: prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val] });
    } else {
      setAnswers({ ...answers, [cur.id]: val });
      if (step < STEPS.length - 1) setTimeout(() => setStep(step + 1), 250);
    }
  };

  const canNext = () => {
    if (cur.type === "multi") return (answers[cur.id] || []).length > 0;
    if (cur.type === "contact") return contact.name && contact.phone;
    return !!answers[cur.id];
  };

  const submit = async () => {
    if (!canNext()) return;
    setSending(true);
    const labels = {};
    STEPS.forEach(s => {
      if (s.type === "contact" || !answers[s.id]) return;
      const val = answers[s.id];
      labels[s.titleEn] = Array.isArray(val)
        ? val.map(v => (s.options.find(x => x.value === v) || {}).en || v).join(" | ")
        : (s.options.find(x => x.value === val) || {}).en || val;
    });
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: WEB3KEY, subject: `Engosoft Assessment: ${contact.name}`, from_name: "Engosoft Assessment", "Name": contact.name, "Phone": contact.phone, "Email": contact.email || "—", "Company": contact.company || "—", "Website": contact.website || "—", "Notes": contact.notes || "—", ...labels }),
      });
    } catch {}
    setDone(true); setSending(false);
  };

  if (done) return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff, minHeight: "100vh", background: "linear-gradient(180deg,#F0F4FF,#FAFAFA)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 40, maxWidth: 460, width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(0,20,60,.06)" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: "3px solid #C6F6D5" }}><Check color="#276749" /></div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0A2463", marginBottom: 8 }}>{isRTL ? "شكراً لكم!" : "Thank you!"}</h2>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>{isRTL ? "تم استلام بياناتكم وسنتواصل معكم خلال 24 ساعة" : "We'll contact you within 24 hours"}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14, fontFamily: ff }}><WaSvg size={16} /> {isRTL ? "واتساب" : "WhatsApp"}</a>
          {onBack && <button onClick={onBack} style={{ padding: "12px 20px", borderRadius: 10, border: "2px solid #E2E8F0", background: "#fff", color: "#0A2463", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: ff }}>{isRTL ? "العودة" : "Back"}</button>}
        </div>
      </div>
    </div>
  );

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff, minHeight: "100vh", background: "linear-gradient(180deg,#F0F4FF,#FAFAFA)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {onBack && <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#0A2463", fontFamily: ff }}>{isRTL ? "العودة" : "Back"}</button>}
          <div style={{ width: 1, height: 18, background: "#E2E8F0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#0A2463,#1E5AA8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 9 }}>ES</div>
            <span style={{ fontWeight: 800, fontSize: 14, color: "#0A2463" }}>Engosoft</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 24px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: "#888" }}>{isRTL ? `${step + 1} / ${STEPS.length}` : `${step + 1} / ${STEPS.length}`}</span>
          <span style={{ fontSize: 11, color: "#0A2463", fontWeight: 700 }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 4, background: "#E2E8F0", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#0A2463,#1E5AA8)", borderRadius: 8, transition: "width 0.4s" }} />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 24px" }}>
        <div style={{ maxWidth: 520, width: "100%" }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0A2463", marginBottom: 4, lineHeight: 1.5 }}>{isRTL ? cur.titleAr : cur.titleEn}</h2>
          {(cur.subtitleAr) && <p style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>{isRTL ? cur.subtitleAr : cur.subtitleEn}</p>}

          {cur.type !== "contact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
              {cur.options.map(opt => {
                const sel = cur.type === "multi" ? (answers[cur.id] || []).includes(opt.value) : answers[cur.id] === opt.value;
                return (
                  <button key={opt.value} onClick={() => select(opt.value)} style={{ padding: "12px 14px", borderRadius: 10, background: sel ? "#EBF0FA" : "#fff", border: `2px solid ${sel ? '#0A2463' : '#E2E8F0'}`, textAlign: isRTL ? "right" : "left", fontFamily: ff, fontSize: 14, fontWeight: 500, color: sel ? "#0A2463" : "#333", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "all 0.2s" }}>
                    <div style={{ width: 18, height: 18, borderRadius: cur.type === "multi" ? 4 : "50%", border: `2px solid ${sel ? '#0A2463' : '#CCC'}`, background: sel ? "#0A2463" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {sel && (cur.type === "multi" ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />)}
                    </div>
                    {isRTL ? opt.ar : opt.en}
                  </button>
                );
              })}
            </div>
          )}

          {cur.type === "contact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              {[
                { key: "name", lAr: "الاسم *", lEn: "Name *", ph: isRTL ? "محمد" : "John" },
                { key: "phone", lAr: "رقم الواتساب *", lEn: "WhatsApp *", ph: "+20...", dir: "ltr" },
                { key: "email", lAr: "البريد الإلكتروني", lEn: "Email", ph: "email@...", dir: "ltr" },
                { key: "company", lAr: "اسم الشركة", lEn: "Company", ph: isRTL ? "اسم شركتكم" : "Company" },
                { key: "website", lAr: "الموقع الإلكتروني / فيسبوك", lEn: "Website / Facebook", ph: "https://...", dir: "ltr" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, marginBottom: 2, color: "#444" }}>{isRTL ? f.lAr : f.lEn}</label>
                  <input value={contact[f.key]} onChange={e => setContact({ ...contact, [f.key]: e.target.value })} placeholder={f.ph}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "2px solid #E2E8F0", fontSize: 14, fontFamily: ff, outline: "none", direction: f.dir || "inherit" }} />
                </div>
              ))}
              <textarea value={contact.notes} onChange={e => setContact({ ...contact, notes: e.target.value })} rows={2} placeholder={isRTL ? "تفاصيل إضافية..." : "Additional details..."}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "2px solid #E2E8F0", fontSize: 14, fontFamily: ff, outline: "none", resize: "vertical" }} />
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: "12px 24px 20px", maxWidth: 520, width: "100%", margin: "0 auto", display: "flex", gap: 8 }}>
        {step > 0 && <button onClick={() => setStep(step - 1)} style={{ padding: "11px 20px", borderRadius: 10, border: "2px solid #E2E8F0", background: "#fff", color: "#666", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: ff }}>{isRTL ? "السابق" : "Back"}</button>}
        {cur.type === "multi" && <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: canNext() ? "linear-gradient(135deg,#0A2463,#1E5AA8)" : "#E2E8F0", color: canNext() ? "#fff" : "#999", fontWeight: 700, fontSize: 14, cursor: canNext() ? "pointer" : "default", fontFamily: ff }}>{isRTL ? "التالي" : "Next"}</button>}
        {cur.type === "contact" && <button onClick={submit} disabled={!canNext() || sending} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: canNext() && !sending ? "linear-gradient(135deg,#0A2463,#1E5AA8)" : "#E2E8F0", color: canNext() ? "#fff" : "#999", fontWeight: 700, fontSize: 14, cursor: canNext() ? "pointer" : "default", fontFamily: ff }}>{sending ? "..." : isRTL ? "أرسل" : "Submit"}</button>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SALES FUNNEL
   ═══════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState("ar");
  const [page, setPage] = useState("funnel"); // funnel | assessment
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const isRTL = lang === "ar";
  const ff = isRTL ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif";

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{overflow-x:hidden;background:#FAFAFA}
      .cta-btn{transition:all .3s ease}.cta-btn:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(10,36,99,0.4)!important}
      .pain-card{transition:all .3s ease}.pain-card:hover{background:#FFF5F5!important}
      @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)}70%{box-shadow:0 0 0 14px rgba(37,211,102,0)}}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const submit = async () => {
    if (!form.name || !form.phone) return;
    setSending(true);
    try { await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ access_key: WEB3KEY, subject: `Engosoft Lead: ${form.name}`, name: form.name, phone: form.phone, service: form.service || "General" }) }); } catch {}
    setSent(true); setSending(false);
  };

  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(isRTL ? "مرحباً، أودّ الاستفسار عن خدمات الأتمتة والذكاء الاصطناعي" : "Hi, I want to know more about automation services")}`;

  // ─── Assessment Page ───
  if (page === "assessment") return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff }}>
      <NeedsAssessment lang={lang} onBack={() => { setPage("funnel"); window.scrollTo(0, 0); }} />
    </div>
  );

  // ─── Translations ───
  const t = lang === "ar" ? {
    hook: "هل لا تزال شركتكم تعمل بالطريقة اليدوية؟",
    hookSub: "كل يوم يمرّ دون أتمتة، تخسرون أموالاً وعملاء ووقتاً لن يعود",
    hookCta: "أريد توفير الوقت والمال",
    hookCta2: "ابدأ تقييم احتياجاتك",
    painTitle: "هل يحدث هذا في شركتكم؟",
    pains: [
      { q: "يقضي الموظفون ساعات في مهام يدوية متكررة؟", d: "نقل بيانات، إرسال رسائل، متابعة ردود... مهام يمكن إنجازها في ثوانٍ" },
      { q: "يتواصل العملاء ولا يجدون من يردّ عليهم؟", d: "في الليل، في العطلات، أو عندما يكون الفريق مشغولاً... كل ردّ متأخر يعني عميلاً مفقوداً" },
      { q: "لا تعرف من هو أفضل موظف ومن يحتاج تدريباً؟", d: "تستمع لمكالمات عشوائية وتحكم بناءً على الانطباع لا على البيانات" },
      { q: "تُدخِل الطلبات يدوياً من المتجر إلى النظام؟", d: "أخطاء في الأرقام، تأخير في تحديث المخزون، وشكاوى من العملاء" },
    ],
    painBottom: "إذا كانت أيٌّ من هذه المشكلات تحدث لديكم — فأنتم تخسرون أموالاً كل يوم دون أن تشعروا",
    costTitle: "هل تعلم كم تخسر؟",
    costs: [{ n: "3-5", u: "ساعات يومياً", d: "تُهدر في عمل يدوي قابل للأتمتة" }, { n: "30%", u: "من العملاء", d: "يغادرون بسبب تأخر الاستجابة" }, { n: "60%", u: "من المكالمات", d: "لا تتم مراجعتها أبداً" }],
    solTitle: "الحل بسيط — دع التكنولوجيا تعمل بدلاً عنكم",
    solSub: "في Engosoft، نبني أنظمة ذكية تعمل على مدار الساعة حتى لا يضطر فريقكم للعمل الإضافي",
    results: [
      { b: "موظف يردّ على 50 رسالة يومياً", a: "روبوت ذكي يردّ على 5,000 رسالة يومياً", s: "توفير رواتب 2-3 موظفين" },
      { b: "3 ساعات يومياً لنقل البيانات يدوياً", a: "مزامنة تلقائية في أقل من 5 ثوانٍ", s: "توفير أكثر من 60 ساعة شهرياً" },
      { b: "مشرف يراجع 10 مكالمات من أصل 500", a: "الذكاء الاصطناعي يقيّم 100% من المكالمات", s: "تغطية شاملة + تقارير فورية" },
      { b: "طلبات أسعار يدوية لأكثر من 250 فندقاً", a: "نظام آلي بأمر واحد", s: "توفير 90% من وقت الموظفين" },
    ],
    rb: "قبل", ra: "بعد",
    howTitle: "كيف نعمل؟",
    steps: [{ n: "1", t: "استشارة مجانية", d: "نستمع لتحدياتكم في 30 دقيقة — دون أي التزام" }, { n: "2", t: "تصميم الحل", d: "نصمم نظاماً مخصصاً لشركتكم — وليس حلاً جاهزاً" }, { n: "3", t: "التنفيذ والتسليم", d: "نبني وننفذ ونختبر — ونبقى معكم للدعم المستمر" }],
    offerTitle: "العرض المتاح الآن",
    offerSub: "استشارة مجانية لمدة 30 دقيقة — نحلل التحديات ونقدم الحل المناسب مع تقدير واضح للتكلفة",
    offerPoints: ["تحليل مجاني لعملياتكم الحالية", "خطة أتمتة مخصصة لشركتكم", "تقدير تكلفة واضح وشفاف", "دون أي التزام — إن لم تقتنعوا لا تدفعون شيئاً"],
    faqTitle: "الأسئلة الشائعة",
    faqs: [
      { q: "ما تكلفة النظام؟", a: "تعتمد على حجم شركتكم واحتياجاتكم. تبدأ الأسعار من 10,000 ج.م. نوضح لكم التكلفة بدقة خلال الاستشارة المجانية." },
      { q: "كم يستغرق التنفيذ؟", a: "الأنظمة البسيطة تحتاج 1-2 أسبوع، والمعقدة 3-5 أسابيع. نتفق على جدول زمني واضح قبل البدء." },
      { q: "ماذا لو حدثت مشكلة بعد التسليم؟", a: "نقدم صيانة ودعماً شهرياً. أي مشكلة تُحَل خلال 4 إلى 24 ساعة حسب الأولوية." },
      { q: "لست متخصصاً في التقنية، هل سيكون الأمر صعباً؟", a: "على الإطلاق. نحن نتولى الجانب التقني بالكامل. أنتم ترون النتائج فقط." },
      { q: "هل تعملون مع شركات خارج مصر؟", a: "نعم. نخدم عملاء في مصر والمملكة العربية السعودية والإمارات والكويت وأوروبا." },
    ],
    finalTitle: "كل يوم يمرّ = أموال تُفقد",
    finalSub: "منافسوكم بدأوا بأتمتة عملياتهم. السؤال ليس هل تحتاجون للأتمتة — بل متى تبدأون.",
    finalCta: "ابدأ الآن — استشارة مجانية",
    formPh: { name: "الاسم", phone: "رقم الواتساب", service: "— ما الذي تحتاجه؟ —", send: "أرسل — سنتواصل معكم فوراً", options: ["روبوت محادثة / واتساب", "أتمتة عمليات", "تقييم جودة المكالمات", "ربط المتجر مع نظام ERP", "أحتاج استشارة"] },
  } : {
    hook: "Is your company still running on manual work?",
    hookSub: "Every day without automation, you're losing money, customers, and time you'll never get back",
    hookCta: "I want to save time and money",
    hookCta2: "Start needs assessment",
    painTitle: "Is this happening in your company?",
    pains: [
      { q: "Staff spending hours on repetitive tasks?", d: "Data entry, sending emails, tracking replies... work that could be done in seconds" },
      { q: "Customers messaging and nobody responds?", d: "At night, on holidays — every late reply = a lost customer" },
      { q: "No idea who's performing well?", d: "Random call sampling and gut-feeling evaluations, not real data" },
      { q: "Manually entering orders from store to system?", d: "Number errors, inventory delays, customer complaints" },
    ],
    painBottom: "If any of these is happening — you're losing money every day without realizing it",
    costTitle: "Do you know how much you're losing?",
    costs: [{ n: "3-5", u: "hours/day", d: "wasted on manual work" }, { n: "30%", u: "of customers", d: "leave due to slow responses" }, { n: "60%", u: "of calls", d: "never reviewed" }],
    solTitle: "The solution is simple — let technology work for you",
    solSub: "We build smart systems that work 24/7 so your team doesn't have to work overtime",
    results: [
      { b: "Employee answers 50 messages/day", a: "Smart bot handles 5,000/day", s: "Saved 2-3 salaries" },
      { b: "3 hours daily data entry", a: "Auto-sync in under 5 seconds", s: "Saved 60+ hours/month" },
      { b: "Supervisor reviews 10 of 500 calls", a: "AI evaluates 100%", s: "Full coverage + reports" },
      { b: "Manual rate requests to 250 hotels", a: "One-command system", s: "Saved 90% of time" },
    ],
    rb: "Before", ra: "After",
    howTitle: "How we work",
    steps: [{ n: "1", t: "Free consultation", d: "30 minutes, zero commitment" }, { n: "2", t: "We design the solution", d: "Custom solution for your company" }, { n: "3", t: "We build & deliver", d: "Build, test, deliver + ongoing support" }],
    offerTitle: "Available offer right now",
    offerSub: "Free 30-minute consultation — we analyze your problems and give you the exact solution and cost",
    offerPoints: ["Free operations analysis", "Custom automation plan", "Clear cost estimate", "Zero commitment — pay nothing if not convinced"],
    faqTitle: "FAQ",
    faqs: [
      { q: "How much does it cost?", a: "Depends on your needs. Starts from $200. We'll tell you exactly in the free consultation." },
      { q: "How long does it take?", a: "1-2 weeks simple, 3-5 weeks complex. Clear timeline agreed before starting." },
      { q: "What if something breaks?", a: "Monthly maintenance and support. Issues resolved in 4-24 hours." },
      { q: "I'm not technical?", a: "We handle all technical parts. You just see results." },
      { q: "Do you work outside Egypt?", a: "Yes. Egypt, Saudi Arabia, UAE, Kuwait, and Europe." },
    ],
    finalTitle: "Every day that passes = money lost",
    finalSub: "Your competitors are already automating. The question isn't whether — it's when.",
    finalCta: "Start now — Free consultation",
    formPh: { name: "Your name", phone: "WhatsApp number", service: "— What do you need? —", send: "Send — We'll contact you immediately", options: ["Chatbot / WhatsApp bot", "Process automation", "Call quality monitoring", "Store-ERP integration", "Need consultation"] },
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff, color: "#1A1A2E", background: "#FAFAFA" }}>
      {/* Floating WA */}
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,.4)", animation: "pulse 2s infinite", textDecoration: "none" }}><WaSvg /></a>

      {/* Top bar */}
      <div style={{ padding: "10px 24px", background: "#0A2463", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 9 }}>ES</div>
          <span style={{ fontWeight: 800, fontSize: 15 }}>Engosoft</span>
        </div>
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{ background: "rgba(255,255,255,.15)", border: "none", color: "#fff", padding: "4px 12px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontFamily: ff, fontSize: 12 }}>{lang === "ar" ? "EN" : "عربي"}</button>
      </div>

      {/* HERO */}
      <section style={{ padding: "70px 24px 50px", textAlign: "center", background: "linear-gradient(180deg,#0A2463,#1E3A7A)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#3B82F6", opacity: .07, filter: "blur(100px)", top: -200, left: "50%", transform: "translateX(-50%)" }} />
        <div style={{ maxWidth: 650, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.4, marginBottom: 16 }}>{t.hook}</h1>
          <p style={{ fontSize: 17, opacity: .85, lineHeight: 1.8, marginBottom: 30, maxWidth: 520, margin: "0 auto 30px" }}>{t.hookSub}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "15px 30px", borderRadius: 12, textDecoration: "none", fontWeight: 800, fontSize: 15, fontFamily: ff }}><WaSvg size={18} /> {t.hookCta}</a>
            <button onClick={() => setPage("assessment")} className="cta-btn" style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "2px solid rgba(255,255,255,.25)", padding: "15px 30px", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: ff }}>{t.hookCta2}</button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: "50px 24px", maxWidth: 650, margin: "0 auto" }}>
        <FadeIn><h2 style={{ fontSize: 26, fontWeight: 900, textAlign: "center", marginBottom: 28 }}>{t.painTitle}</h2></FadeIn>
        {t.pains.map((p, i) => (
          <FadeIn key={i} delay={i * .1}>
            <div className="pain-card" style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", marginBottom: 10, border: "1px solid #EEF2F7" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#C53030", marginBottom: 4 }}>{p.q}</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{p.d}</div>
            </div>
          </FadeIn>
        ))}
        <FadeIn delay={.4}>
          <div style={{ textAlign: "center", marginTop: 20, padding: "14px 20px", background: "#FFF5F5", borderRadius: 10, border: "1px solid #FED7D7" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#C53030" }}>{t.painBottom}</p>
          </div>
        </FadeIn>
      </section>

      {/* COST OF INACTION */}
      <section style={{ padding: "45px 24px", background: "#1A1A2E", color: "#fff" }}>
        <div style={{ maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
          <FadeIn><h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 28 }}>{t.costTitle}</h2></FadeIn>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {t.costs.map((c, i) => (
              <FadeIn key={i} delay={i * .12}>
                <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 12, padding: "20px 18px", minWidth: 170, flex: 1 }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#FF6B6B" }}>{c.n}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, opacity: .7, marginBottom: 2 }}>{c.u}</div>
                  <div style={{ fontSize: 12, opacity: .5 }}>{c.d}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={.4}><div style={{ marginTop: 28 }}><a href={waLink} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 12, textDecoration: "none", fontWeight: 800, fontSize: 15, fontFamily: ff }}><WaSvg size={18} /> {isRTL ? "تواصل الآن" : "Contact now"}</a></div></FadeIn>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: "50px 24px", textAlign: "center", maxWidth: 650, margin: "0 auto" }}>
        <FadeIn><h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 10 }}>{t.solTitle}</h2></FadeIn>
        <FadeIn delay={.1}><p style={{ fontSize: 15, color: "#666", lineHeight: 1.8 }}>{t.solSub}</p></FadeIn>
      </section>

      {/* BEFORE / AFTER */}
      <section style={{ padding: "30px 24px 50px", maxWidth: 750, margin: "0 auto" }}>
        {t.results.map((r, i) => (
          <FadeIn key={i} delay={i * .1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center", marginBottom: 12, background: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid #EEF2F7" }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#C53030", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{t.rb}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{r.b}</div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#0A2463,#1E5AA8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Arrow /></div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#276749", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{t.ra}</div>
                <div style={{ fontSize: 12, color: "#333", fontWeight: 600, lineHeight: 1.5 }}>{r.a}</div>
                <div style={{ fontSize: 11, color: "#0A6332", fontWeight: 700, marginTop: 3, background: "#F0FFF4", display: "inline-block", padding: "2px 8px", borderRadius: 5 }}>{r.s}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* MID CTA */}
      <section style={{ padding: "30px 24px", textAlign: "center", background: "#F0F4FF" }}>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#0A2463,#1E5AA8)", color: "#fff", padding: "15px 32px", borderRadius: 12, textDecoration: "none", fontWeight: 800, fontSize: 15, fontFamily: ff }}>{isRTL ? "احجز استشارة مجانية" : "Book free consultation"}</a>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "50px 24px", maxWidth: 650, margin: "0 auto" }}>
        <FadeIn><h2 style={{ fontSize: 24, fontWeight: 900, textAlign: "center", marginBottom: 30 }}>{t.howTitle}</h2></FadeIn>
        {t.steps.map((s, i) => (
          <FadeIn key={i} delay={i * .12}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#0A2463,#1E5AA8)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17, flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#0A2463", marginBottom: 2 }}>{s.t}</div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{s.d}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* OFFER + FORM */}
      <section style={{ padding: "50px 24px", background: "linear-gradient(180deg,#0A2463,#1E3A7A)", color: "#fff" }}>
        <div style={{ maxWidth: 550, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 10 }}>{t.offerTitle}</h2>
            <p style={{ fontSize: 14, opacity: .85, marginBottom: 20, lineHeight: 1.7 }}>{t.offerSub}</p>
          </FadeIn>
          <FadeIn delay={.1}>
            <div style={{ textAlign: isRTL ? "right" : "left", marginBottom: 24 }}>
              {t.offerPoints.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Check /><span style={{ fontSize: 13 }}>{p}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          {sent ? (
            <div style={{ background: "rgba(255,255,255,.1)", borderRadius: 14, padding: 28 }}>
              <Check color="#fff" /><h3 style={{ fontSize: 18, fontWeight: 800, margin: "12px 0 6px" }}>{isRTL ? "تم استلام طلبكم!" : "Request received!"}</h3>
              <p style={{ fontSize: 13, opacity: .8, marginBottom: 16 }}>{isRTL ? "سنتواصل معكم خلال ساعات" : "We'll contact you within hours"}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14, fontFamily: ff }}><WaSvg size={16} /> {isRTL ? "ابدأ المحادثة" : "Start chatting"}</a>
            </div>
          ) : (
            <FadeIn delay={.2}>
              <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 14, padding: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={t.formPh.name} style={{ padding: "12px 14px", borderRadius: 9, border: "2px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.04)", color: "#fff", fontSize: 14, fontFamily: ff, outline: "none" }} />
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder={t.formPh.phone} style={{ padding: "12px 14px", borderRadius: 9, border: "2px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.04)", color: "#fff", fontSize: 14, fontFamily: ff, outline: "none", direction: "ltr" }} />
                  <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} style={{ padding: "12px 14px", borderRadius: 9, border: "2px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.06)", color: form.service ? "#fff" : "rgba(255,255,255,.45)", fontSize: 14, fontFamily: ff, outline: "none" }}>
                    <option value="" style={{ color: "#333" }}>{t.formPh.service}</option>
                    {t.formPh.options.map(o => <option key={o} value={o} style={{ color: "#333" }}>{o}</option>)}
                  </select>
                  <button onClick={submit} disabled={!form.name || !form.phone || sending} className="cta-btn" style={{ padding: "14px", borderRadius: 9, border: "none", background: form.name && form.phone && !sending ? "#25D366" : "rgba(255,255,255,.12)", color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: ff, cursor: form.name && form.phone ? "pointer" : "default" }}>{sending ? "..." : t.formPh.send}</button>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "50px 24px", maxWidth: 650, margin: "0 auto" }}>
        <FadeIn><h2 style={{ fontSize: 24, fontWeight: 900, textAlign: "center", marginBottom: 28 }}>{t.faqTitle}</h2></FadeIn>
        {t.faqs.map((f, i) => <FaqItem key={i} f={f} i={i} />)}
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "50px 24px", background: "#C53030", color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 550, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 10 }}>{t.finalTitle}</h2>
          <p style={{ fontSize: 15, opacity: .9, marginBottom: 28, lineHeight: 1.7 }}>{t.finalSub}</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#C53030", padding: "16px 36px", borderRadius: 12, textDecoration: "none", fontWeight: 900, fontSize: 17, fontFamily: ff }}>{t.finalCta}</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "28px 24px", background: "#0A2463", color: "rgba(255,255,255,.6)", textAlign: "center", fontSize: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
          <div style={{ width: 24, height: 24, borderRadius: 5, background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 8, color: "#fff" }}>ES</div>
          <span style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>Engosoft</span>
        </div>
        <p>{isRTL ? "حلول تقنية متكاملة — من الفكرة إلى التنفيذ" : "Full-Service Tech Solutions"}</p>
        <p style={{ opacity: .4, marginTop: 3 }}>© 2025 Engosoft</p>
      </footer>
    </div>
  );
}
