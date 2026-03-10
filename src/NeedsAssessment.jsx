import { useState, useEffect } from "react";

const WEB3FORMS_KEY = "37492e85-55bb-4594-8018-2647115be762";
const WHATSAPP = "201007725744";

const STEPS = [
  {
    id: "industry",
    titleAr: "في أي مجال شركتك؟",
    titleEn: "What industry is your company in?",
    type: "select",
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
    ],
  },
  {
    id: "need",
    titleAr: "إيه أكتر حاجة محتاجها دلوقتي؟",
    titleEn: "What do you need most right now?",
    subtitleAr: "اختر كل اللي ينطبق عليك",
    subtitleEn: "Select all that apply",
    type: "multi",
    options: [
      { value: "chatbot", ar: "شات بوت / بوت واتساب لخدمة العملاء", en: "Chatbot / WhatsApp bot for customer service" },
      { value: "automation", ar: "أتمتة عمليات (ربط أنظمة، إشعارات، تقارير)", en: "Process automation (system integration, alerts, reports)" },
      { value: "crm", ar: "نظام إدارة عملاء (CRM / ERP)", en: "CRM / ERP system" },
      { value: "calls", ar: "تقييم جودة مكالمات بالذكاء الاصطناعي", en: "AI call quality monitoring" },
      { value: "hr", ar: "فحص وتصنيف سير ذاتية أوتوماتيكي", en: "Automated CV screening & ranking" },
      { value: "social", ar: "أتمتة السوشيال ميديا", en: "Social media automation" },
      { value: "website", ar: "إنشاء موقع أو لاندينج بيدج", en: "Website or landing page" },
      { value: "notsure", ar: "مش متأكد — محتاج استشارة", en: "Not sure — need consultation" },
    ],
  },
  {
    id: "size",
    titleAr: "كام شخص في فريقك / شركتك؟",
    titleEn: "How many people are in your team / company?",
    type: "select",
    options: [
      { value: "solo", ar: "شخص واحد (فريلانسر / startup)", en: "Just me (freelancer / startup)" },
      { value: "small", ar: "2 – 10 أشخاص", en: "2 – 10 people" },
      { value: "medium", ar: "11 – 50 شخص", en: "11 – 50 people" },
      { value: "large", ar: "51 – 200 شخص", en: "51 – 200 people" },
      { value: "enterprise", ar: "أكثر من 200 شخص", en: "200+ people" },
    ],
  },
  {
    id: "tools",
    titleAr: "بتستخدم أي أنظمة أو أدوات حالياً؟",
    titleEn: "What tools or systems do you currently use?",
    subtitleAr: "اختر كل اللي بتستخدمه",
    subtitleEn: "Select all that you use",
    type: "multi",
    options: [
      { value: "whatsapp_business", ar: "واتساب بيزنس", en: "WhatsApp Business" },
      { value: "excel", ar: "Excel / Google Sheets", en: "Excel / Google Sheets" },
      { value: "odoo", ar: "Odoo", en: "Odoo" },
      { value: "shopify", ar: "Shopify / WooCommerce / Salla", en: "Shopify / WooCommerce / Salla" },
      { value: "crm_tool", ar: "HubSpot / Zoho / Salesforce", en: "HubSpot / Zoho / Salesforce" },
      { value: "social_tools", ar: "Meta Business / Hootsuite", en: "Meta Business / Hootsuite" },
      { value: "pbx", ar: "سنترال (Yeastar / Grandstream / أخرى)", en: "PBX (Yeastar / Grandstream / Other)" },
      { value: "nothing", ar: "لا أستخدم أي أدوات حالياً", en: "I don't use any tools currently" },
    ],
  },
  {
    id: "pain",
    titleAr: "إيه أكبر مشكلة بتواجهك دلوقتي؟",
    titleEn: "What's your biggest challenge right now?",
    type: "select",
    options: [
      { value: "time", ar: "الموظفين بيضيعوا وقت كتير في شغل يدوي متكرر", en: "Staff waste too much time on repetitive manual work" },
      { value: "customers", ar: "العملاء بيشتكوا من بطء الرد أو عدم الرد", en: "Customers complain about slow or no responses" },
      { value: "data", ar: "مفيش بيانات واضحة عن أداء الفريق أو المبيعات", en: "No clear data on team performance or sales" },
      { value: "growth", ar: "الشركة بتكبر وعايز أنظم العمليات قبل ما تتعقد", en: "Company is growing and I need to organize before it gets complex" },
      { value: "cost", ar: "تكلفة الموظفين عالية وعايز أقلل المصاريف", en: "Staff costs are high and I want to reduce expenses" },
      { value: "competition", ar: "المنافسين بيستخدموا تكنولوجيا وأنا لسه", en: "Competitors are using tech and I'm falling behind" },
    ],
  },
  {
    id: "budget",
    titleAr: "ميزانيتك التقريبية؟",
    titleEn: "What's your approximate budget?",
    subtitleAr: "ده بيساعدنا نقترح الحل الأنسب ليك",
    subtitleEn: "This helps us suggest the most suitable solution",
    type: "select",
    options: [
      { value: "under500", ar: "أقل من $500 (25,000 ج.م)", en: "Under $500" },
      { value: "500_1500", ar: "$500 – $1,500 (25K – 75K ج.م)", en: "$500 – $1,500" },
      { value: "1500_5000", ar: "$1,500 – $5,000 (75K – 250K ج.م)", en: "$1,500 – $5,000" },
      { value: "5000_plus", ar: "أكثر من $5,000 (250K+ ج.م)", en: "$5,000+" },
      { value: "discuss", ar: "نتفق بعد ما أفهم الحل", en: "Let's discuss after I understand the solution" },
    ],
  },
  {
    id: "timeline",
    titleAr: "امتى محتاج النظام يشتغل؟",
    titleEn: "When do you need the system running?",
    type: "select",
    options: [
      { value: "asap", ar: "في أقرب وقت (أسبوع – أسبوعين)", en: "ASAP (1–2 weeks)" },
      { value: "month", ar: "خلال شهر", en: "Within a month" },
      { value: "quarter", ar: "خلال 3 شهور", en: "Within 3 months" },
      { value: "exploring", ar: "بستكشف الخيارات — مفيش استعجال", en: "Exploring options — no rush" },
    ],
  },
  {
    id: "contact",
    titleAr: "ممتاز! أخيراً، ازاي نتواصل معاك؟",
    titleEn: "Great! Finally, how can we reach you?",
    type: "contact",
  },
];

export default function NeedsAssessment({ lang: propLang, onBack }) {
  const [lang, setLang] = useState(propLang || "ar");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "", company: "", website: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const isRTL = lang === "ar";
  const ff = isRTL ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif";
  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { if (propLang) setLang(propLang); }, [propLang]);

  const select = (val) => {
    if (current.type === "multi") {
      const prev = answers[current.id] || [];
      setAnswers({ ...answers, [current.id]: prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val] });
    } else {
      setAnswers({ ...answers, [current.id]: val });
      if (step < STEPS.length - 1) setTimeout(() => setStep(step + 1), 250);
    }
  };

  const canNext = () => {
    if (current.type === "multi") return (answers[current.id] || []).length > 0;
    if (current.type === "contact") return contact.name && (contact.phone || contact.email);
    return !!answers[current.id];
  };

  const submit = async () => {
    if (!canNext()) return;
    setSending(true);
    const labels = {};
    STEPS.forEach(s => {
      if (s.type === "contact") return;
      const val = answers[s.id];
      if (!val) return;
      if (Array.isArray(val)) {
        labels[s.titleEn] = val.map(v => { const o = s.options.find(x => x.value === v); return o ? o.en : v; }).join(" | ");
      } else {
        const o = s.options.find(x => x.value === val);
        labels[s.titleEn] = o ? o.en : val;
      }
    });
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Engosoft — New Client Assessment: ${contact.name}`,
          from_name: "Engosoft Needs Assessment",
          "Client Name": contact.name, "Phone": contact.phone || "—",
          "Email": contact.email || "—", "Company": contact.company || "—",
          "Website": contact.website || "—", "Notes": contact.notes || "—",
          ...labels,
        }),
      });
    } catch {}
    setDone(true);
    setSending(false);
  };

  if (done) {
    return (
      <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff, minHeight: "100vh", background: "linear-gradient(180deg, #F0F4FF, #FAFAFA)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 48, maxWidth: 500, width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(0,20,60,0.06)" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", border: "3px solid #C6F6D5" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#276749" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0A2463", marginBottom: 10 }}>{isRTL ? "شكراً لك!" : "Thank you!"}</h2>
          <p style={{ fontSize: 15, color: "#666", marginBottom: 24, lineHeight: 1.8 }}>
            {isRTL ? "استلمنا إجاباتك وهنتواصل معاك خلال 24 ساعة بعرض مخصص ليك." : "We received your answers and will contact you within 24 hours with a custom proposal."}
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(isRTL ? "مرحباً، ملأت استبيان الاحتياجات وعايز أتكلم معاكم" : "Hi, I filled the needs assessment and want to discuss")}`} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff",
              padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14, fontFamily: ff,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {isRTL ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
            </a>
            {onBack && <button onClick={onBack} style={{ padding: "12px 24px", borderRadius: 12, border: "2px solid #E2E8F0", background: "#fff", color: "#0A2463", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: ff }}>{isRTL ? "العودة للموقع" : "Back to site"}</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff, minHeight: "100vh", background: "linear-gradient(180deg, #F0F4FF, #FAFAFA)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {onBack && <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#0A2463", fontFamily: ff }}>{isRTL ? "العودة" : "Back"}</button>}
          <div style={{ width: 1, height: 20, background: "#E2E8F0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: 7, background: "linear-gradient(135deg, #0A2463, #1E5AA8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 10 }}>ES</div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "#0A2463" }}>Engosoft</span>
          </div>
        </div>
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{ padding: "5px 12px", borderRadius: 7, border: "2px solid #E2E8F0", background: "#fff", color: "#0A2463", fontWeight: 700, cursor: "pointer", fontFamily: ff, fontSize: 12 }}>{lang === "ar" ? "EN" : "عربي"}</button>
      </div>

      {/* Progress */}
      <div style={{ padding: "0 24px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "#888" }}>{isRTL ? `سؤال ${step + 1} من ${STEPS.length}` : `Question ${step + 1} of ${STEPS.length}`}</span>
          <span style={{ fontSize: 12, color: "#0A2463", fontWeight: 700 }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 5, background: "#E2E8F0", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #0A2463, #1E5AA8)", borderRadius: 10, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 24px" }}>
        <div style={{ maxWidth: 560, width: "100%" }}>
          <h2 style={{ fontSize: 21, fontWeight: 900, color: "#0A2463", marginBottom: 6, lineHeight: 1.5 }}>
            {isRTL ? current.titleAr : current.titleEn}
          </h2>
          {(current.subtitleAr || current.subtitleEn) && (
            <p style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>{isRTL ? current.subtitleAr : current.subtitleEn}</p>
          )}

          {current.type !== "contact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 14 }}>
              {current.options.map(opt => {
                const isSel = current.type === "multi" ? (answers[current.id] || []).includes(opt.value) : answers[current.id] === opt.value;
                return (
                  <button key={opt.value} onClick={() => select(opt.value)} style={{
                    padding: "13px 16px", borderRadius: 11, background: isSel ? "#EBF0FA" : "#fff",
                    border: `2px solid ${isSel ? '#0A2463' : '#E2E8F0'}`,
                    textAlign: isRTL ? "right" : "left", fontFamily: ff, fontSize: 14, fontWeight: 500,
                    color: isSel ? "#0A2463" : "#333", display: "flex", alignItems: "center", gap: 10,
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}>
                    {current.type === "multi" && (
                      <div style={{
                        width: 20, height: 20, borderRadius: 5, border: `2px solid ${isSel ? '#0A2463' : '#CCC'}`,
                        background: isSel ? "#0A2463" : "#fff", display: "flex", alignItems: "center",
                        justifyContent: "center", flexShrink: 0, transition: "all 0.2s",
                      }}>
                        {isSel && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                    )}
                    {current.type === "select" && (
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", border: `2px solid ${isSel ? '#0A2463' : '#CCC'}`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s",
                      }}>
                        {isSel && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0A2463" }} />}
                      </div>
                    )}
                    {isRTL ? opt.ar : opt.en}
                  </button>
                );
              })}
            </div>
          )}

          {current.type === "contact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              {[
                { key: "name", labelAr: "اسمك *", labelEn: "Your name *", ph: isRTL ? "محمد أحمد" : "John Doe" },
                { key: "phone", labelAr: "رقم الواتساب / الموبايل *", labelEn: "WhatsApp / Phone *", ph: "+20 1xx xxx xxxx", dir: "ltr" },
                { key: "email", labelAr: "الإيميل", labelEn: "Email", ph: "email@company.com", dir: "ltr" },
                { key: "company", labelAr: "اسم الشركة", labelEn: "Company name", ph: isRTL ? "اسم شركتك" : "Your Company" },
                { key: "website", labelAr: "موقعك / صفحة فيسبوك / إنستجرام", labelEn: "Website / Facebook / Instagram", ph: "https://...", dir: "ltr" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 3, color: "#444" }}>{isRTL ? f.labelAr : f.labelEn}</label>
                  <input value={contact[f.key]} onChange={e => setContact({ ...contact, [f.key]: e.target.value })}
                    placeholder={f.ph} style={{
                      width: "100%", padding: "11px 14px", borderRadius: 9, border: "2px solid #E2E8F0",
                      fontSize: 14, fontFamily: ff, outline: "none", background: "#fff",
                      direction: f.dir || "inherit", textAlign: f.dir === "ltr" && isRTL ? "right" : "inherit",
                    }} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 3, color: "#444" }}>{isRTL ? "أي تفاصيل إضافية؟" : "Any additional details?"}</label>
                <textarea value={contact.notes} onChange={e => setContact({ ...contact, notes: e.target.value })}
                  rows={3} placeholder={isRTL ? "اكتب أي حاجة تحب توصلنا..." : "Write anything you'd like us to know..."}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 9, border: "2px solid #E2E8F0", fontSize: 14, fontFamily: ff, outline: "none", resize: "vertical", background: "#fff" }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ padding: "14px 24px 24px", maxWidth: 560, width: "100%", margin: "0 auto", display: "flex", gap: 10 }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{
            padding: "12px 22px", borderRadius: 11, border: "2px solid #E2E8F0",
            background: "#fff", color: "#666", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: ff,
          }}>{isRTL ? "السابق" : "Back"}</button>
        )}
        {current.type === "multi" && step < STEPS.length - 1 && (
          <button onClick={() => { if (canNext()) setStep(step + 1); }} disabled={!canNext()} style={{
            flex: 1, padding: "12px 22px", borderRadius: 11, border: "none",
            background: canNext() ? "linear-gradient(135deg, #0A2463, #1E5AA8)" : "#E2E8F0",
            color: canNext() ? "#fff" : "#999", fontWeight: 700, fontSize: 14,
            cursor: canNext() ? "pointer" : "default", fontFamily: ff,
          }}>{isRTL ? "التالي" : "Next"}</button>
        )}
        {current.type === "contact" && (
          <button onClick={submit} disabled={!canNext() || sending} style={{
            flex: 1, padding: "13px 22px", borderRadius: 11, border: "none",
            background: canNext() && !sending ? "linear-gradient(135deg, #0A2463, #1E5AA8)" : "#E2E8F0",
            color: canNext() && !sending ? "#fff" : "#999", fontWeight: 700, fontSize: 15,
            cursor: canNext() && !sending ? "pointer" : "default", fontFamily: ff,
          }}>{sending ? (isRTL ? "جاري الإرسال..." : "Sending...") : (isRTL ? "أرسل وتواصل معنا" : "Submit & Contact Us")}</button>
        )}
      </div>
    </div>
  );
}
