import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

// ─── Links ────────────────────────────────────────────────────────────────────
const WA    = "201007725744";
const CAL   = "https://calendar.app.google/35V4etCwYoD5poM77";
const MAJED = "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/02/11/18/20260211184124-KE13UNZE.json";
const EMAIL = "eyad.sofiane@engosoft.com";

// ─── Workflow node data ───────────────────────────────────────────────────────
const FLOWS = {
  seo:[
    {icon:"⏰",n:"Schedule Trigger"},{icon:"📄",n:"Read Courses"},
    {icon:"🔍",n:"Serper Search"},{icon:"🤖",n:"Topics Generator"},
    {icon:"📊",n:"SEO Analysis"},{icon:"✍️",n:"Article Writer"},
    {icon:"📋",n:"Format Output"},{icon:"💾",n:"Save to Sheets"},
  ],
  calls:[
    {icon:"📁",n:"Drive Monitor"},{icon:"⬇️",n:"Download WAV"},
    {icon:"🎙️",n:"Groq Whisper"},{icon:"🤖",n:"AI Correction"},
    {icon:"🔗",n:"Match CRM"},{icon:"📊",n:"AI Evaluation"},
    {icon:"📧",n:"Send Report"},{icon:"💾",n:"Log to Sheets"},
  ],
  cv:[
    {icon:"✈️",n:"Telegram Trigger"},{icon:"📥",n:"Download CV"},
    {icon:"📄",n:"Extract Text"},{icon:"🤖",n:"AI Analysis"},
    {icon:"📋",n:"Parse Response"},{icon:"💾",n:"Save to Sheets"},
    {icon:"✅",n:"Accept / Reject"},{icon:"📧",n:"Send Email"},
  ],
};

// ─── Showcase items ───────────────────────────────────────────────────────────
const SHOW = {
  ar:[
    {img:"/assets/chatbot-majed.png",title:"وكيل ذكاء اصطناعي يتحدث بلهجتكم",desc:"ماجد — روبوت محادثة ذكي يردّ بالعربية والإنجليزية على مدار الساعة، يحجز المواعيد، ويؤهّل العملاء تلقائياً.",tag:"AI Customer Agent",phone:true,tryBot:true},
    {img:"/assets/workflow-seo.png",title:"أتمتة المحتوى والتسويق",desc:"نظام يبحث عن الكلمات المفتاحية ويكتب مقالات SEO عربية احترافية تلقائياً — بدون تدخل بشري.",tag:"AI Workflow Automation",flow:"seo",metrics:[{v:"20+",l:"Node"},{v:"49",l:"Course"},{v:"GPT-4.1",l:"Model"}],tools:["n8n","Serper","GPT-4.1","Google Sheets"]},
    {img:"/assets/workflow-calls.png",title:"تقييم جودة المكالمات بالـ AI",desc:"يراقب التسجيلات، يحوّلها لنصوص عربية دقيقة، ويقيّمها على أكثر من 50 معياراً احترافياً.",tag:"AI Quality Monitor",flow:"calls",metrics:[{v:"32-40",l:"Node"},{v:"46+",l:"Criteria"},{v:"A-F",l:"Scoring"}],tools:["n8n","Groq Whisper","GPT-4o","Pinecone","Odoo"]},
    {img:"/assets/workflow-cv.png",title:"فحص السير الذاتية في ثوانٍ",desc:"يستقبل الـ CV عبر تيليجرام ويصنّف المرشحين تلقائياً بدقة عالية في أقل من 30 ثانية.",tag:"AI Workflow Automation",flow:"cv",metrics:[{v:"22",l:"Node"},{v:"<30s",l:"Speed"},{v:"AI",l:"Scoring"}],tools:["n8n","Telegram","GPT-4o","Google Sheets"]},
  ],
  en:[
    {img:"/assets/chatbot-majed.png",title:"An AI Agent that speaks your language",desc:"Majed — responds 24/7 in Arabic & English, books appointments, and qualifies leads automatically.",tag:"AI Customer Agent",phone:true,tryBot:true},
    {img:"/assets/workflow-seo.png",title:"Fully automated content & SEO",desc:"Researches keywords and writes professional Arabic SEO articles automatically — zero human effort.",tag:"AI Workflow Automation",flow:"seo",metrics:[{v:"20+",l:"Nodes"},{v:"49",l:"Courses"},{v:"GPT-4.1",l:"Model"}],tools:["n8n","Serper","GPT-4.1","Google Sheets"]},
    {img:"/assets/workflow-calls.png",title:"AI call quality assessment",desc:"Monitors recordings, transcribes Arabic speech accurately, evaluates 50+ quality criteria automatically.",tag:"AI Quality Monitor",flow:"calls",metrics:[{v:"32-40",l:"Nodes"},{v:"46+",l:"Criteria"},{v:"A-F",l:"Scoring"}],tools:["n8n","Groq Whisper","GPT-4o","Pinecone","Odoo"]},
    {img:"/assets/workflow-cv.png",title:"CV screening in seconds",desc:"Receives CVs via Telegram, analyzes and ranks candidates automatically with high accuracy in under 30s.",tag:"AI Workflow Automation",flow:"cv",metrics:[{v:"22",l:"Nodes"},{v:"<30s",l:"Speed"},{v:"AI",l:"Scoring"}],tools:["n8n","Telegram","GPT-4o","Google Sheets"]},
  ],
};

// ─── Services ─────────────────────────────────────────────────────────────────
const SVC = {
  ar:[
    {id:"a",badge:"الأكثر طلباً",title:"AI Customer Agent",sub:"وكيل ذكاء اصطناعي",desc:"روبوت يردّ 24/7 بالعربية عبر واتساب والموقع، يفهم السياق ويؤهّل العملاء ويحجز المواعيد.",cats:[{t:"خدمة عملاء 24/7"},{t:"تأهيل العملاء تلقائياً"},{t:"تحليلات وتقارير"},{t:"دعم متعدد اللغات"}],featured:true},
    {id:"b",title:"AI Workflow Automation",sub:"أتمتة العمليات",desc:"نربط أنظمتكم ونؤتمت المهام اليدوية المتكررة بدقة واحترافية عالية.",cats:[{t:"ربط الأنظمة والمزامنة"},{t:"إشعارات تلقائية ذكية"},{t:"أتمتة البيانات المتقدمة"}]},
    {id:"c",title:"AI Quality Monitor",sub:"تقييم الجودة",desc:"يراقب مكالمات فريقك ويقيّمها بالـ AI مع تقارير فورية ومفصّلة.",cats:[{t:"تقييم جودة المكالمات"},{t:"تقارير فورية تلقائية"},{t:"تحليل أداء الفريق"}]},
  ],
  en:[
    {id:"a",badge:"Most Popular",title:"AI Customer Agent",sub:"AI-powered customer service",desc:"Chatbot responding 24/7 in Arabic & English, understands context, qualifies leads, books appointments.",cats:[{t:"24/7 Customer Support"},{t:"Auto Lead Qualification"},{t:"Analytics & Reports"},{t:"Multi-language Support"}],featured:true},
    {id:"b",title:"AI Workflow Automation",sub:"Process automation",desc:"Connect your systems and automate repetitive manual tasks with precision and expertise.",cats:[{t:"System Integration & Sync"},{t:"Smart Auto Notifications"},{t:"Advanced Data Automation"}]},
    {id:"c",title:"AI Quality Monitor",sub:"Quality analytics",desc:"Monitor your team's calls and evaluate them with AI — instant detailed reports.",cats:[{t:"Call Quality Assessment"},{t:"Instant Auto Reports"},{t:"Team Performance Analysis"}]},
  ],
};

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = {
  ar:[
    {q:"كم يستغرق التنفيذ؟",a:"أسبوع لأسبوعين للمشاريع البسيطة، 3-5 أسابيع للمعقدة. نتفق على جدول واضح من البداية."},
    {q:"هل يتكامل مع أنظمتنا الحالية؟",a:"نعم. نتكامل مع Odoo وShopify وSalla وZid وHubSpot وZoho وYeastar وPBX وأي نظام يدعم API."},
    {q:"هل يحتاج تثبيتاً على سيرفراتنا؟",a:"لا. كل شيء سحابي ومُدار بالكامل من طرفنا. لا تحتاجون لأي بنية تحتية إضافية."},
    {q:"هل يدعم اللغة العربية بلهجاتها؟",a:"نعم. فصحى ومصرية وسعودية وخليجية وإنجليزية — مع كشف تلقائي للغة."},
    {q:"ماذا لو حدثت مشكلة بعد التسليم؟",a:"دعم وصيانة شهرية مستمرة. أي مشكلة تُحَل في 4-24 ساعة حسب الأولوية."},
    {q:"هل يمكن ربط واتساب بشكل رسمي؟",a:"نعم. نستخدم WhatsApp Business API الرسمي عبر Meta — رقم موثّق واشتراك رسمي."},
  ],
  en:[
    {q:"How long does implementation take?",a:"1-2 weeks for simple projects, 3-5 weeks for complex ones. Clear timeline agreed upfront."},
    {q:"Does it integrate with our existing systems?",a:"Yes. Odoo, Shopify, Salla, Zid, HubSpot, Zoho, Yeastar PBX, and any API-enabled system."},
    {q:"Do we need to install anything on our servers?",a:"No. Everything is cloud-hosted and fully managed by us. Zero additional infrastructure needed."},
    {q:"Does it support Arabic dialects?",a:"Yes. MSA, Egyptian, Saudi, Gulf dialects, and English — with automatic language detection."},
    {q:"What if there's an issue after delivery?",a:"Continuous monthly maintenance and support. Issues resolved in 4-24 hours by priority."},
    {q:"Can we connect WhatsApp officially?",a:"Yes. We use the official WhatsApp Business API via Meta — verified number and official subscription."},
  ],
};

// ─── Tools ────────────────────────────────────────────────────────────────────
const TOOLS = [
  {n:"Botpress",src:"/assets/logos/botpress.png"},
  {n:"n8n",src:"/assets/logos/n8n.png"},
  {n:"Odoo",src:"/assets/logos/odoo.png"},
  {n:"Meta",src:"/assets/logos/meta.png"},
  {n:"OpenAI",src:"/assets/logos/openai.png"},
  {n:"Chatwoot",src:"/assets/logos/chatwoot.png"},
  {n:"Yeastar",src:"/assets/logos/yeastar.png"},
  {n:"Zapier",src:"/assets/logos/zapier.png"},
  {n:"Make",src:"/assets/logos/make.png"},
];

// ─── Clients ──────────────────────────────────────────────────────────────────
const CLIENTS = {
  ar:[
    {logo:"/assets/logos/elbakri.png",name:"El-Bakri Overseas",text:"فريق Engosoft ساعدنا في أتمتة طلبات الأسعار اليومية لأكثر من 250 فندقاً — وفّرنا أكثر من 90% من وقت الموظفين.",role:"إدارة العمليات"},
    {logo:"/assets/logos/terynova.png",name:"Terynova",text:"البوت الذكي على متجرنا في Shopify يردّ على العملاء فوراً ويتابع الطلبات تلقائياً — تجربة ممتازة جداً.",role:"التجارة الإلكترونية"},
    {logo:"/assets/logos/xqpharma.png",name:"XQ Pharma",text:"نظام تسجيل المصروفات والإيرادات عبر واتساب سهّل علينا المتابعة المالية اليومية بشكل ملحوظ.",role:"الإدارة المالية"},
  ],
  en:[
    {logo:"/assets/logos/elbakri.png",name:"El-Bakri Overseas",text:"Engosoft automated our daily rate requests to 250+ hotels — saving over 90% of our staff time.",role:"Operations"},
    {logo:"/assets/logos/terynova.png",name:"Terynova",text:"The smart bot on our Shopify store responds instantly and tracks orders automatically — excellent experience.",role:"E-Commerce"},
    {logo:"/assets/logos/xqpharma.png",name:"XQ Pharma",text:"The WhatsApp-based expense and revenue tracking system greatly simplified our daily financial monitoring.",role:"Finance"},
  ],
};

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  ar:{
    navCta:"احجز استشارة",
    eyebrow:"حلول AI للسوق الخليجي",
    h1a:"ارتقِ بأعمالك مع",
    h1b:"Engosoft AI",
    sub:"ثلاث خدمات ذكاء اصطناعي تعمل على مدار الساعة — وفّر الوقت، زد المبيعات، وحسّن تجربة عملائك.",
    cta:"احجز استشارة مجانية",
    ctaSec:"تواصل واتساب",
    trustedBy:"يثق بنا",
    showTitle:"ماذا نبني لعملائنا",
    showSub:"أمثلة حقيقية من مشاريع منفّذة",
    consult:"احجز استشارة",
    tryBot:"جرّب ماجد",
    viewFlow:"شاهد سير العمل",
    svcTitle:"اختر الخدمة المناسبة",
    svcSub:"حلول مرنة وقابلة للتخصيص لكل قطاع",
    bookFree:"احجز استشارة مجانية",
    whatsapp:"واتساب",
    clientsTitle:"عملاؤنا يتحدثون",
    clientsSub:"نتائج حقيقية من شركات تثق بنا",
    toolsTitle:"نتكامل مع أدواتكم المفضّلة",
    faqTitle:"الأسئلة الشائعة",
    ctaTitle:"هل أنت مستعد للانطلاق؟",
    ctaSub:"انضم إلى عشرات الشركات التي تعمل بذكاء أكثر مع Engosoft",
    ctaBtn:"احجز استشارة مجانية الآن",
    footerTag:"حلول تقنية متكاملة — من الفكرة إلى التنفيذ",
    contact:"تواصل معنا",
    rights:"جميع الحقوق محفوظة",
    workflow:"سير العمل",
  },
  en:{
    navCta:"Book Consultation",
    eyebrow:"AI Solutions for the Gulf Market",
    h1a:"Power your business with",
    h1b:"Engosoft AI",
    sub:"Three AI services working 24/7 — save time, increase sales, and improve customer experience.",
    cta:"Book Free Consultation",
    ctaSec:"WhatsApp Us",
    trustedBy:"Trusted by",
    showTitle:"What we build for our clients",
    showSub:"Real examples from delivered projects",
    consult:"Book Consultation",
    tryBot:"Try Majed",
    viewFlow:"View Workflow",
    svcTitle:"Choose your service",
    svcSub:"Flexible solutions customizable for every industry",
    bookFree:"Book Free Consultation",
    whatsapp:"WhatsApp",
    clientsTitle:"Our clients speak",
    clientsSub:"Real results from companies that trust us",
    toolsTitle:"We integrate with your favorite tools",
    faqTitle:"Frequently Asked Questions",
    ctaTitle:"Ready to get started?",
    ctaSub:"Join dozens of companies working smarter with Engosoft",
    ctaBtn:"Book a Free Consultation Now",
    footerTag:"Full-Service AI Solutions — from idea to implementation",
    contact:"Contact Us",
    rights:"All rights reserved",
    workflow:"WORKFLOW",
  },
};

// ─── Framer Motion variants ───────────────────────────────────────────────────
const fadeUp = {
  hidden:{opacity:0,y:28},
  show:(d=0)=>({opacity:1,y:0,transition:{duration:0.65,delay:d,ease:[0.16,1,0.3,1]}}),
};
const fadeLeft  = {hidden:{opacity:0,x:-32},show:{opacity:1,x:0,transition:{duration:0.7,ease:[0.16,1,0.3,1]}}};
const fadeRight = {hidden:{opacity:0,x:32}, show:{opacity:1,x:0,transition:{duration:0.7,ease:[0.16,1,0.3,1]}}};

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(thresh=0.1){
  const ref=useRef();
  const [v,setV]=useState(false);
  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:thresh});
    if(ref.current)ob.observe(ref.current);
    return()=>ob.disconnect();
  },[thresh]);
  return [ref,v];
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const ICONS = {
  check:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>,
  arrowR:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>,
  arrowL:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>,
  close:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  sun:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  chevD:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6,9 12,15 18,9"/></svg>,
  chevR:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9,18 15,12 9,6"/></svg>,
  chevL:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>,
  play:      <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>,
  star:      <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  calendar:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  chat:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  zap:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
  mail:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  whatsapp:  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
};

const Ico = ({n,size=16,col})=>(
  <span style={{display:"inline-flex",width:size,height:size,flexShrink:0,color:col||"currentColor"}}>{ICONS[n]}</span>
);

// ─── Reusable: SectionHeader ──────────────────────────────────────────────────
function SectionHeader({title,sub,ff,center=true}){
  const [ref,v]=useInView();
  return(
    <div ref={ref} style={{textAlign:center?"center":"start",marginBottom:"clamp(36px,5vw,56px)"}}>
      <motion.h2 variants={fadeUp} custom={0} initial="hidden" animate={v?"show":"hidden"}
        style={{fontSize:"clamp(26px,3.8vw,40px)",fontWeight:800,color:"var(--text)",letterSpacing:"-0.025em",lineHeight:1.15,fontFamily:ff,marginBottom:sub?12:0}}>
        {title}
      </motion.h2>
      {sub&&<motion.p variants={fadeUp} custom={0.1} initial="hidden" animate={v?"show":"hidden"}
        style={{fontSize:"clamp(14px,1.6vw,17px)",color:"var(--text2)",lineHeight:1.7,maxWidth:560,margin:center?"0 auto":"",fontFamily:ff}}>
        {sub}
      </motion.p>}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({lang,setLang,mode,setMode,isRTL,t,ff}){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>30);
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[]);

  const btnBase={
    display:"flex",alignItems:"center",justifyContent:"center",
    cursor:"pointer",border:"1px solid var(--border)",
    background:"var(--card)",transition:"all 0.2s",
    borderRadius:10,flexShrink:0,
  };

  return(
    <motion.nav initial={{y:-72}} animate={{y:0}} transition={{duration:0.5,ease:[0.16,1,0.3,1]}}
      style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        height:64,display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 clamp(16px,3vw,36px)",fontFamily:ff,
        background:scrolled?"var(--nav)":"transparent",
        backdropFilter:scrolled?"blur(20px)":"none",
        WebkitBackdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?"1px solid var(--nav-b)":"1px solid transparent",
        transition:"background 0.3s,border-color 0.3s,backdrop-filter 0.3s",
      }}>
      {/* Logo */}
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:34,height:34,borderRadius:9,background:"var(--g-btn)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:11,letterSpacing:"0.04em",flexShrink:0,boxShadow:"0 2px 8px var(--glow)"}}>ES</div>
        <span style={{fontWeight:700,fontSize:16,color:"var(--text)",letterSpacing:"-0.02em"}}>Engosoft</span>
      </div>
      {/* Actions */}
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <motion.button whileTap={{scale:0.9}} onClick={()=>setMode(mode==="light"?"dark":"light")}
          style={{...btnBase,width:36,height:36,color:"var(--text2)"}}>
          <Ico n={mode==="light"?"moon":"sun"} size={14}/>
        </motion.button>
        <motion.button whileTap={{scale:0.9}} onClick={()=>setLang(lang==="ar"?"en":"ar")}
          style={{...btnBase,height:36,padding:"0 13px",color:"var(--text2)",fontSize:13,fontWeight:600,fontFamily:ff}}>
          {lang==="ar"?"EN":"ع"}
        </motion.button>
        <motion.a whileHover={{scale:1.03}} whileTap={{scale:0.97}}
          href={CAL} target="_blank" rel="noopener noreferrer"
          style={{height:36,padding:"0 18px",borderRadius:10,background:"var(--g-btn)",color:"#fff",textDecoration:"none",fontSize:13,fontWeight:700,fontFamily:ff,display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",boxShadow:"0 2px 14px var(--glow)"}}>
          <Ico n="calendar" size={13} col="#fff"/>
          {t.navCta}
        </motion.a>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({isRTL,t,ff,mode}){
  return(
    <section style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden"}}>
      <video autoPlay muted loop playsInline
        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",
          filter:mode==="dark"?"brightness(0.28) saturate(0.5)":"brightness(0.6) saturate(0.75)"}}>
        <source src="/assets/hero-video.mp4" type="video/mp4"/>
      </video>
      <div style={{position:"absolute",inset:0,background:"var(--g-hero)"}}/>

      {/* Gradient orbs */}
      <div style={{position:"absolute",top:"20%",left:"10%",width:400,height:400,borderRadius:"50%",background:"rgba(37,99,235,0.12)",filter:"blur(80px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"15%",right:"8%",width:350,height:350,borderRadius:"50%",background:"rgba(124,58,237,0.1)",filter:"blur(80px)",pointerEvents:"none"}}/>

      <div style={{position:"relative",zIndex:1,width:"100%",textAlign:"center",padding:"96px clamp(16px,4vw,48px) 80px"}}>
        {/* Eyebrow badge */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 18px",borderRadius:100,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.18)",backdropFilter:"blur(8px)",color:"rgba(255,255,255,0.9)",fontSize:13,fontWeight:500,fontFamily:ff,letterSpacing:"0.01em",marginBottom:28}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block",flexShrink:0}}/>
            {t.eyebrow}
          </span>
        </motion.div>

        <motion.h1 initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:[0.16,1,0.3,1]}}
          style={{fontSize:"clamp(36px,6.5vw,76px)",fontWeight:900,lineHeight:1.08,letterSpacing:"-0.03em",color:"#fff",fontFamily:ff,marginBottom:0}}>
          {t.h1a}
        </motion.h1>
        <motion.h1 initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.28,ease:[0.16,1,0.3,1]}}
          style={{fontSize:"clamp(36px,6.5vw,76px)",fontWeight:900,lineHeight:1.08,letterSpacing:"-0.03em",background:"linear-gradient(135deg,#60a5fa,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",fontFamily:ff,marginBottom:28}}>
          {t.h1b}
        </motion.h1>

        <motion.p initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.42}}
          style={{fontSize:"clamp(15px,1.9vw,20px)",color:"rgba(255,255,255,0.75)",maxWidth:560,margin:"0 auto 40px",lineHeight:1.75,fontFamily:ff}}>
          {t.sub}
        </motion.p>

        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.55}}
          style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <motion.a whileHover={{scale:1.04,boxShadow:"0 12px 40px rgba(37,99,235,0.45)"}} whileTap={{scale:0.96}}
            href={CAL} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:9,padding:"15px 30px",borderRadius:100,background:"linear-gradient(135deg,#2563eb,#7c3aed)",color:"#fff",textDecoration:"none",fontWeight:700,fontSize:"clamp(14px,1.5vw,16px)",fontFamily:ff,boxShadow:"0 4px 28px rgba(37,99,235,0.35)"}}>
            <Ico n="calendar" size={16} col="#fff"/>
            {t.cta}
          </motion.a>
          <motion.a whileHover={{scale:1.04}} whileTap={{scale:0.96}}
            href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:9,padding:"15px 30px",borderRadius:100,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(8px)",color:"#fff",textDecoration:"none",fontWeight:600,fontSize:"clamp(14px,1.5vw,16px)",fontFamily:ff}}>
            <Ico n="whatsapp" size={16} col="#fff"/>
            {t.ctaSec}
          </motion.a>
        </motion.div>
      </div>

      <div className="scroll-dot">
        <span style={{color:"rgba(255,255,255,0.45)",display:"flex"}}>
          <Ico n="chevD" size={26}/>
        </span>
      </div>
    </section>
  );
}

// ─── TrustedBy ────────────────────────────────────────────────────────────────
function TrustedBy({isRTL,t,ff}){
  const [ref,v]=useInView(0.1);
  const clients=[
    {logo:"/assets/logos/elbakri.png",name:"El-Bakri Overseas"},
    {logo:"/assets/logos/terynova.png",name:"Terynova"},
    {logo:"/assets/logos/xqpharma.png",name:"XQ Pharma"},
  ];
  return(
    <div ref={ref} style={{padding:"clamp(36px,5vw,56px) clamp(16px,3vw,32px)",borderBottom:"1px solid var(--border)",background:"var(--bg2)"}}>
      <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <motion.p variants={fadeUp} custom={0} initial="hidden" animate={v?"show":"hidden"}
          style={{fontSize:12,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--text3)",marginBottom:28,fontFamily:ff}}>
          {t.trustedBy}
        </motion.p>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"clamp(24px,5vw,56px)",flexWrap:"wrap"}}>
          {clients.map((c,i)=>(
            <motion.div key={i} variants={fadeUp} custom={0.1+i*0.08} initial="hidden" animate={v?"show":"hidden"}
              style={{display:"flex",alignItems:"center",gap:10,opacity:0.55}}>
              <div style={{width:40,height:40,borderRadius:10,background:"var(--bg3)",border:"1px solid var(--border)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",padding:5}}>
                <img src={c.logo} alt={c.name} style={{width:"100%",height:"100%",objectFit:"contain",filter:"grayscale(100%)"}} loading="lazy"/>
              </div>
              <span style={{fontSize:"clamp(12px,1.4vw,14px)",fontWeight:600,color:"var(--text2)",fontFamily:ff,whiteSpace:"nowrap"}}>{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── WorkflowModal ────────────────────────────────────────────────────────────
function WorkflowModal({flow,title,img,metrics,tools,isRTL,ff,t,onClose}){
  const nodes=FLOWS[flow]||[];
  const [active,setActive]=useState(-1);

  useEffect(()=>{
    document.body.style.overflow="hidden";
    let timer;
    const delay=setTimeout(()=>{
      let i=0;
      timer=setInterval(()=>{setActive(i);i++;if(i>nodes.length)clearInterval(timer);},280);
    },450);
    return()=>{clearTimeout(delay);clearInterval(timer);document.body.style.overflow="";};
  },[nodes.length]);

  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.22}}
      onClick={onClose}
      style={{position:"fixed",inset:0,zIndex:300,background:"var(--modal-o)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"}}>
      <motion.div initial={{opacity:0,scale:0.88,y:32}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.88,y:32}}
        transition={{duration:0.38,ease:[0.16,1,0.3,1]}}
        onClick={e=>e.stopPropagation()}
        style={{background:"var(--modal-bg)",borderRadius:22,border:"1px solid var(--border)",maxWidth:580,width:"100%",maxHeight:"92vh",overflow:"auto",boxShadow:"var(--shadow-x)"}}>

        {/* Image header */}
        <div style={{position:"relative",borderRadius:"22px 22px 0 0",overflow:"hidden"}}>
          <img src={img} alt="" style={{width:"100%",display:"block",maxHeight:210,objectFit:"cover"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,var(--modal-bg) 100%)"}}/>
          <motion.button whileHover={{scale:1.12}} whileTap={{scale:0.88}} onClick={onClose}
            style={{position:"absolute",top:14,[isRTL?"left":"right"]:14,width:34,height:34,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.25)",background:"rgba(0,0,0,0.45)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}>
            <Ico n="close" size={14} col="#fff"/>
          </motion.button>
        </div>

        <div style={{padding:"20px 26px 28px"}}>
          <span style={{display:"inline-block",padding:"3px 13px",borderRadius:100,background:"var(--acc-l)",color:"var(--acc)",fontSize:10,fontWeight:800,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:10,fontFamily:ff}}>
            {t.workflow}
          </span>
          <h3 style={{fontSize:"clamp(17px,2.5vw,22px)",fontWeight:700,color:"var(--text)",marginBottom:20,lineHeight:1.3,letterSpacing:"-0.015em",fontFamily:ff}}>
            {title}
          </h3>

          {/* Animated nodes */}
          <div style={{background:"var(--bg2)",borderRadius:14,border:"1px solid var(--border)",padding:"16px 14px",marginBottom:22,display:"flex",flexWrap:"wrap",alignItems:"center",gap:7}}>
            {nodes.map((nd,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:5}}>
                <motion.div
                  animate={i<=active?{opacity:1,scale:1,background:"var(--node-bg)",borderColor:"var(--node-b)"}:{opacity:0.22,scale:0.88,background:"transparent",borderColor:"var(--border)"}}
                  transition={{duration:0.35,ease:[0.16,1,0.3,1]}}
                  style={{display:"flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:10,border:"1.5px solid var(--border)",fontSize:11,fontWeight:600,color:"var(--text)",fontFamily:ff,whiteSpace:"nowrap"}}>
                  <span style={{fontSize:14}}>{nd.icon}</span>{nd.n}
                </motion.div>
                {i<nodes.length-1&&(
                  <motion.span animate={{color:i<active?"var(--acc)":"var(--border)"}} transition={{duration:0.3}} style={{display:"flex",flexShrink:0}}>
                    <Ico n={isRTL?"chevL":"chevR"} size={13}/>
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          {/* Metrics */}
          {metrics&&(
            <div style={{display:"flex",gap:12,marginBottom:20}}>
              {metrics.map((m,i)=>(
                <motion.div key={i} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.35+i*0.1,duration:0.45}}
                  style={{flex:1,padding:"14px 8px",borderRadius:12,border:"1px solid var(--border)",background:"var(--bg2)",textAlign:"center"}}>
                  <div style={{fontSize:"clamp(18px,2.5vw,24px)",fontWeight:800,color:"var(--acc)",letterSpacing:"-0.025em",fontFamily:ff}}>{m.v}</div>
                  <div style={{fontSize:10,color:"var(--text3)",marginTop:3,fontFamily:ff}}>{m.l}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tools */}
          {tools&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:22}}>
              {tools.map((tool,i)=>(
                <span key={i} style={{padding:"5px 13px",borderRadius:8,background:"var(--bg3)",border:"1px solid var(--border)",fontSize:12,fontWeight:500,color:"var(--text2)",fontFamily:ff}}>{tool}</span>
              ))}
            </div>
          )}

          <motion.a whileHover={{scale:1.02}} whileTap={{scale:0.98}}
            href={CAL} target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px",borderRadius:13,background:"var(--g-btn)",color:"#fff",textDecoration:"none",fontWeight:700,fontSize:15,fontFamily:ff,boxShadow:"0 4px 20px var(--glow)"}}>
            <Ico n="calendar" size={16} col="#fff"/>
            {t.cta}
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ShowcaseItem ─────────────────────────────────────────────────────────────
function ShowcaseItem({item,idx,isRTL,ff,t}){
  const [ref,v]=useInView(0.08);
  const [modal,setModal]=useState(false);
  const imgFirst=idx%2===0;

  return(
    <>
      <div ref={ref} style={{padding:"clamp(44px,6vw,80px) clamp(16px,4vw,40px)",maxWidth:1160,margin:"0 auto"}}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"clamp(24px,4vw,64px)",flexDirection:imgFirst?"row":"row-reverse"}}>
          {/* Image side */}
          <motion.div variants={imgFirst?fadeLeft:fadeRight} initial="hidden" animate={v?"show":"hidden"}
            style={{flex:"1 1 260px",maxWidth:item.phone?240:520}}>
            {item.phone?(
              <div style={{width:"min(240px,65vw)",margin:"0 auto"}}>
                <motion.div whileHover={{y:-6}} transition={{type:"spring",stiffness:280}}
                  style={{background:"var(--card)",borderRadius:32,boxShadow:"var(--shadow-l)",overflow:"hidden",border:"6px solid var(--card)",outline:"1px solid var(--border)"}}>
                  <div style={{height:28,background:"var(--bg3)",display:"flex",alignItems:"center",justifyContent:"center",borderBottom:"1px solid var(--border)"}}>
                    <div style={{width:64,height:7,borderRadius:4,background:"var(--border)"}}/>
                  </div>
                  <img src={item.img} alt="" style={{width:"100%",display:"block"}} loading="lazy"/>
                </motion.div>
              </div>
            ):(
              <motion.div whileHover={item.flow?{scale:1.02,boxShadow:"var(--shadow-x)"}:{y:-4}}
                transition={{type:"spring",stiffness:260}}
                onClick={()=>item.flow&&setModal(true)}
                style={{borderRadius:14,border:"1px solid var(--border)",overflow:"hidden",boxShadow:"var(--shadow-l)",cursor:item.flow?"pointer":"default",position:"relative",background:"var(--card)"}}>
                <div style={{height:32,background:"var(--bg3)",display:"flex",alignItems:"center",padding:"0 12px",gap:7,borderBottom:"1px solid var(--border)"}}>
                  {["#ff5f57","#ffbd2e","#28c840"].map((c,i)=><div key={i} style={{width:11,height:11,borderRadius:"50%",background:c}}/>)}
                </div>
                <img src={item.img} alt="" style={{width:"100%",display:"block"}} loading="lazy"/>
                {item.flow&&(
                  <motion.div initial={{opacity:0}} whileHover={{opacity:1}}
                    style={{position:"absolute",inset:"32px 0 0 0",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.28)",backdropFilter:"blur(3px)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,padding:"11px 26px",borderRadius:100,background:"var(--acc)",color:"#fff",fontWeight:700,fontSize:14,fontFamily:ff}}>
                      <Ico n="play" size={14} col="#fff"/>{t.viewFlow}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Text side */}
          <motion.div variants={imgFirst?fadeRight:fadeLeft} initial="hidden" animate={v?"show":"hidden"}
            style={{flex:"1 1 260px",maxWidth:460}}>
            <span style={{display:"inline-block",padding:"4px 13px",borderRadius:100,background:"var(--acc-l)",color:"var(--acc)",fontSize:10,fontWeight:800,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:16,fontFamily:ff}}>
              {item.tag}
            </span>
            <h3 style={{fontSize:"clamp(22px,3vw,33px)",fontWeight:800,color:"var(--text)",letterSpacing:"-0.025em",lineHeight:1.2,marginBottom:14,fontFamily:ff}}>
              {item.title}
            </h3>
            <p style={{fontSize:"clamp(14px,1.5vw,16px)",color:"var(--text2)",lineHeight:1.8,marginBottom:24,fontFamily:ff}}>
              {item.desc}
            </p>

            {item.metrics&&(
              <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap"}}>
                {item.metrics.map((m,i)=>(
                  <div key={i} style={{textAlign:"center",padding:"12px 18px",borderRadius:12,border:"1px solid var(--border)",background:"var(--bg2)",minWidth:76}}>
                    <div style={{fontSize:"clamp(18px,2.5vw,26px)",fontWeight:900,color:"var(--acc)",letterSpacing:"-0.03em",fontFamily:ff}}>{m.v}</div>
                    <div style={{fontSize:10,color:"var(--text3)",marginTop:3,fontFamily:ff}}>{m.l}</div>
                  </div>
                ))}
              </div>
            )}

            {item.tools&&(
              <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:24}}>
                {item.tools.map((tool,i)=>(
                  <span key={i} style={{padding:"4px 12px",borderRadius:8,background:"var(--bg3)",border:"1px solid var(--border)",fontSize:12,fontWeight:500,color:"var(--text2)",fontFamily:ff}}>{tool}</span>
                ))}
              </div>
            )}

            <div style={{display:"flex",gap:11,flexWrap:"wrap"}}>
              <motion.a whileHover={{scale:1.04}} whileTap={{scale:0.96}}
                href={CAL} target="_blank" rel="noopener noreferrer"
                style={{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 24px",borderRadius:100,background:"var(--acc)",color:"#fff",textDecoration:"none",fontWeight:700,fontSize:14,fontFamily:ff,boxShadow:"0 2px 12px var(--glow)"}}>
                {t.consult}<Ico n={isRTL?"arrowL":"arrowR"} size={14} col="#fff"/>
              </motion.a>
              {item.tryBot&&(
                <motion.a whileHover={{scale:1.04}} whileTap={{scale:0.96}}
                  href={MAJED} target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 22px",borderRadius:100,border:"1.5px solid var(--border)",color:"var(--text)",background:"transparent",textDecoration:"none",fontWeight:600,fontSize:14,fontFamily:ff}}>
                  <Ico n="chat" size={14}/>{t.tryBot}
                </motion.a>
              )}
              {item.flow&&(
                <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.96}}
                  onClick={()=>setModal(true)}
                  style={{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 22px",borderRadius:100,border:"1.5px solid var(--border)",color:"var(--acc)",background:"var(--acc-l)",fontWeight:600,fontSize:14,fontFamily:ff,cursor:"pointer"}}>
                  <Ico n="zap" size={14}/>{t.viewFlow}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {modal&&<WorkflowModal flow={item.flow} title={item.title} img={item.img} metrics={item.metrics} tools={item.tools} isRTL={isRTL} ff={ff} t={t} onClose={()=>setModal(false)}/>}
      </AnimatePresence>
    </>
  );
}

// ─── ServicesSection ──────────────────────────────────────────────────────────
function ServiceCard({s,isRTL,ff,t,delay=0}){
  const [ref,v]=useInView(0.05);
  return(
    <motion.div ref={ref} variants={fadeUp} custom={delay} initial="hidden" animate={v?"show":"hidden"}
      whileHover={{y:-7,boxShadow:"var(--shadow-x)"}}
      transition={{...fadeUp.show(delay).transition,layout:false}}
      className={s.featured?"g-border":""}
      style={{flex:"1 1 270px",maxWidth:390,minWidth:250,background:"var(--card)",borderRadius:20,border:s.featured?"none":"1px solid var(--border)",overflow:"hidden",position:"relative",boxShadow:s.featured?"var(--shadow-l)":"var(--shadow)"}}>

      <div style={{padding:"26px 22px 20px"}}>
        {s.badge&&(
          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 13px",borderRadius:100,background:"linear-gradient(135deg,rgba(37,99,235,0.08),rgba(124,58,237,0.08))",border:"1px solid rgba(37,99,235,0.18)",marginBottom:18,fontFamily:ff}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/>
            <span style={{fontSize:11,fontWeight:800,color:"var(--acc)",letterSpacing:"0.03em"}}>{s.badge}</span>
          </div>
        )}
        <h3 style={{fontSize:20,fontWeight:800,color:"var(--text)",marginBottom:4,letterSpacing:"-0.025em",fontFamily:ff}}>{s.title}</h3>
        <p style={{fontSize:13,color:"var(--acc)",fontWeight:600,marginBottom:12,fontFamily:ff}}>{s.sub}</p>
        <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.75,marginBottom:22,fontFamily:ff}}>{s.desc}</p>

        <motion.a whileHover={{scale:1.02}} whileTap={{scale:0.97}}
          href={CAL} target="_blank" rel="noopener noreferrer"
          style={{display:"block",textAlign:"center",padding:"13px",borderRadius:13,background:s.featured?"var(--g-btn)":"var(--bg3)",color:s.featured?"#fff":"var(--text)",border:s.featured?"none":"1px solid var(--border)",textDecoration:"none",fontWeight:700,fontSize:14,fontFamily:ff,marginBottom:10,boxShadow:s.featured?"0 4px 18px var(--glow)":"none"}}>
          {t.bookFree}
        </motion.a>
        <motion.a whileHover={{scale:1.02}} whileTap={{scale:0.97}}
          href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"11px",borderRadius:13,border:"1px solid var(--border)",color:"var(--text2)",textDecoration:"none",fontWeight:600,fontSize:13,fontFamily:ff}}>
          <Ico n="whatsapp" size={14}/>{t.whatsapp}
        </motion.a>
      </div>

      <div style={{borderTop:"1px solid var(--border)",padding:"16px 22px 22px"}}>
        {s.cats.map((c,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"var(--acc-l)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--acc)"}}>
              <Ico n="check" size={10}/>
            </div>
            <span style={{fontSize:13,fontWeight:500,color:"var(--text)",fontFamily:ff}}>{c.t}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── ClientCard ───────────────────────────────────────────────────────────────
function ClientCard({c,idx,ff}){
  const [ref,v]=useInView(0.1);
  return(
    <motion.div ref={ref} variants={fadeUp} custom={idx*0.1} initial="hidden" animate={v?"show":"hidden"}
      whileHover={{y:-5}}
      style={{flex:"1 1 270px",maxWidth:380,background:"var(--card)",borderRadius:20,border:"1px solid var(--border)",padding:"26px 24px",boxShadow:"var(--shadow)"}}>
      <div style={{display:"flex",gap:4,marginBottom:16}}>
        {[...Array(5)].map((_,i)=><Ico key={i} n="star" size={14} col="#f59e0b"/>)}
      </div>
      <p style={{fontSize:"clamp(13px,1.4vw,15px)",color:"var(--text2)",lineHeight:1.85,fontStyle:"italic",marginBottom:22,fontFamily:ff}}>
        "{c.text}"
      </p>
      <div style={{display:"flex",alignItems:"center",gap:13}}>
        <div style={{width:48,height:48,borderRadius:12,background:"var(--bg3)",border:"1px solid var(--border)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",padding:7,flexShrink:0}}>
          <img src={c.logo} alt={c.name} style={{width:"100%",height:"100%",objectFit:"contain"}} loading="lazy"/>
        </div>
        <div>
          <div style={{fontSize:14,fontWeight:700,color:"var(--text)",fontFamily:ff}}>{c.name}</div>
          <div style={{fontSize:12,color:"var(--acc)",fontWeight:600,fontFamily:ff}}>{c.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── FaqItem ──────────────────────────────────────────────────────────────────
function FaqItem({f,isRTL,ff}){
  const [open,setOpen]=useState(false);
  return(
    <div style={{borderBottom:"1px solid var(--faq-b)"}}>
      <button onClick={()=>setOpen(!open)}
        style={{width:"100%",padding:"20px 0",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:ff,textAlign:isRTL?"right":"left",gap:16}}>
        <span style={{fontSize:"clamp(14px,1.5vw,16px)",fontWeight:600,color:"var(--text)",fontFamily:ff,lineHeight:1.4}}>{f.q}</span>
        <motion.div animate={{rotate:open?180:0}} transition={{duration:0.3}} style={{color:"var(--acc)",flexShrink:0}}>
          <Ico n="chevD" size={18}/>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open&&(
          <motion.div key="ans" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
            transition={{duration:0.32,ease:"easeInOut"}} style={{overflow:"hidden"}}>
            <div style={{paddingBottom:20,fontSize:"clamp(13px,1.5vw,15px)",color:"var(--text2)",lineHeight:1.85,fontFamily:ff}}>{f.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ToolsMarquee ─────────────────────────────────────────────────────────────
function ToolsMarquee({isRTL}){
  const tripled=[...TOOLS,...TOOLS,...TOOLS];
  return(
    <div style={{position:"relative",overflow:"hidden",padding:"28px 0",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
      <div style={{position:"absolute",inset:0,background:"var(--fade-l)",zIndex:1,pointerEvents:"none"}}/>
      <div className="marquee-track">
        {tripled.map((tool,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:9,flexShrink:0,opacity:0.45}}>
            <img src={tool.src} alt={tool.n} style={{height:"clamp(22px,2.8vw,30px)",width:"auto",maxWidth:84,objectFit:"contain",filter:"grayscale(100%)"}} loading="lazy"/>
            <span style={{fontSize:"clamp(11px,1.2vw,13px)",fontWeight:600,color:"var(--text2)",whiteSpace:"nowrap"}}>{tool.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CtaBanner ────────────────────────────────────────────────────────────────
function CtaBanner({isRTL,t,ff}){
  const [ref,v]=useInView(0.1);
  return(
    <section ref={ref} style={{padding:"clamp(48px,6vw,80px) clamp(16px,3vw,32px)"}}>
      <motion.div variants={fadeUp} custom={0} initial="hidden" animate={v?"show":"hidden"}
        style={{maxWidth:820,margin:"0 auto",textAlign:"center",padding:"clamp(44px,6vw,70px) clamp(28px,5vw,60px)",borderRadius:24,background:"var(--g-cta)",position:"relative",overflow:"hidden"}}>
        {/* Glow orbs */}
        <div style={{position:"absolute",top:-80,right:-80,width:220,height:220,borderRadius:"50%",background:"rgba(96,165,250,0.12)",filter:"blur(50px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-80,left:-80,width:220,height:220,borderRadius:"50%",background:"rgba(167,139,250,0.12)",filter:"blur(50px)",pointerEvents:"none"}}/>
        <h2 style={{fontSize:"clamp(28px,4.5vw,44px)",fontWeight:900,color:"#fff",marginBottom:14,letterSpacing:"-0.025em",fontFamily:ff,position:"relative"}}>
          {t.ctaTitle}
        </h2>
        <p style={{fontSize:"clamp(15px,1.8vw,18px)",color:"rgba(255,255,255,0.68)",marginBottom:36,lineHeight:1.75,fontFamily:ff,position:"relative"}}>
          {t.ctaSub}
        </p>
        <motion.a whileHover={{scale:1.04,boxShadow:"0 12px 40px rgba(37,99,235,0.5)"}} whileTap={{scale:0.96}}
          href={CAL} target="_blank" rel="noopener noreferrer"
          style={{display:"inline-flex",alignItems:"center",gap:9,padding:"16px 34px",borderRadius:100,background:"linear-gradient(135deg,#2563eb,#7c3aed)",color:"#fff",textDecoration:"none",fontWeight:700,fontSize:"clamp(14px,1.5vw,16px)",fontFamily:ff,boxShadow:"0 4px 28px rgba(37,99,235,0.4)",position:"relative"}}>
          <Ico n="calendar" size={16} col="#fff"/>
          {t.ctaBtn}
        </motion.a>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({isRTL,t,ff}){
  const year=new Date().getFullYear();
  const lnkStyle={display:"flex",alignItems:"center",gap:9,color:"var(--text2)",textDecoration:"none",fontSize:14,fontFamily:ff,padding:"4px 0",transition:"color 0.2s"};
  return(
    <footer style={{borderTop:"1px solid var(--border)",padding:"clamp(44px,5vw,64px) clamp(16px,3vw,36px) 24px",background:"var(--bg2)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:"clamp(32px,5vw,64px)",justifyContent:"space-between",marginBottom:48}}>
          {/* Brand */}
          <div style={{flex:"1 1 240px",maxWidth:340}}>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:16}}>
              <div style={{width:38,height:38,borderRadius:11,background:"var(--g-btn)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:12,letterSpacing:"0.03em",boxShadow:"0 3px 12px var(--glow)"}}>ES</div>
              <span style={{fontWeight:800,fontSize:18,color:"var(--text)",letterSpacing:"-0.025em"}}>Engosoft</span>
            </div>
            <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.75,marginBottom:22,fontFamily:ff}}>{t.footerTag}</p>
            <div style={{display:"flex",gap:10}}>
              {[{href:`https://wa.me/${WA}`,icon:"whatsapp"},{href:`mailto:${EMAIL}`,icon:"mail"}].map((s,i)=>(
                <motion.a key={i} whileHover={{scale:1.08}} whileTap={{scale:0.92}}
                  href={s.href} target={s.icon==="whatsapp"?"_blank":undefined} rel="noopener noreferrer"
                  style={{width:38,height:38,borderRadius:10,background:"var(--bg3)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)",textDecoration:"none"}}>
                  <Ico n={s.icon} size={16}/>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{fontSize:12,fontWeight:800,color:"var(--text)",marginBottom:18,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:ff}}>{t.contact}</h4>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <a href={`mailto:${EMAIL}`} style={lnkStyle}><Ico n="mail" size={14}/>{EMAIL}</a>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={lnkStyle}><Ico n="whatsapp" size={14}/>+20 100 772 5744</a>
              <motion.a whileHover={{scale:1.02}} href={CAL} target="_blank" rel="noopener noreferrer"
                style={{...lnkStyle,color:"var(--acc)",fontWeight:600}}>
                <Ico n="calendar" size={14}/>{t.navCta}
              </motion.a>
            </div>
          </div>
        </div>

        <div style={{borderTop:"1px solid var(--border)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <p style={{fontSize:12,color:"var(--text3)",fontFamily:ff}}>© {year} Engosoft. {t.rights}.</p>
          <p style={{fontSize:12,color:"var(--text3)",fontFamily:ff}}>Made in Egypt · Serving the Gulf</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [lang,setLang]=useState("ar");
  const [mode,setMode]=useState("light");

  const isRTL=lang==="ar";
  const ff=isRTL?"'Tajawal',sans-serif":"'Inter',system-ui,sans-serif";
  const t=T[lang];

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",mode);
    document.documentElement.style.colorScheme=mode;
  },[mode]);

  useEffect(()=>{
    document.documentElement.setAttribute("dir",isRTL?"rtl":"ltr");
    document.documentElement.setAttribute("lang",lang);
    document.body.style.fontFamily=ff;
    document.body.style.background="var(--bg)";
    document.body.style.color="var(--text)";
  },[isRTL,lang,ff]);

  const sec=(top="clamp(72px,8vw,96px)",bottom="clamp(72px,8vw,96px)",extra={})=>({
    padding:`${top} clamp(16px,3vw,32px) ${bottom}`,
    borderTop:"1px solid var(--border)",
    position:"relative",zIndex:1,...extra
  });

  return(
    <div style={{fontFamily:ff,color:"var(--text)",background:"var(--bg)",minHeight:"100vh",overflowX:"hidden",transition:"background 0.35s,color 0.35s"}}>

      <Navbar lang={lang} setLang={setLang} mode={mode} setMode={setMode} isRTL={isRTL} t={t} ff={ff}/>

      <Hero isRTL={isRTL} t={t} ff={ff} mode={mode}/>

      <TrustedBy isRTL={isRTL} t={t} ff={ff}/>

      {/* ── Showcase ── */}
      <section style={{...sec("clamp(48px,6vw,72px)","0"),borderTop:"none"}}>
        <div style={{maxWidth:1160,margin:"0 auto",paddingBottom:"clamp(20px,3vw,40px)"}}>
          <SectionHeader title={t.showTitle} sub={t.showSub} ff={ff}/>
        </div>
        {SHOW[lang].map((item,i)=>(
          <div key={i} style={{background:i%2===0?"transparent":"var(--bg2)",borderTop:"1px solid var(--border)"}}>
            <ShowcaseItem item={item} idx={i} isRTL={isRTL} ff={ff} t={t}/>
          </div>
        ))}
      </section>

      {/* ── Services ── */}
      <section style={sec()}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionHeader title={t.svcTitle} sub={t.svcSub} ff={ff}/>
          <div style={{display:"flex",gap:"clamp(14px,2vw,22px)",justifyContent:"center",flexWrap:"wrap"}}>
            {SVC[lang].map((s,i)=><ServiceCard key={s.id} s={s} isRTL={isRTL} ff={ff} t={t} delay={i*0.1}/>)}
          </div>
        </div>
      </section>

      {/* ── Clients ── */}
      <section style={{...sec(),background:"var(--bg2)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionHeader title={t.clientsTitle} sub={t.clientsSub} ff={ff}/>
          <div style={{display:"flex",gap:"clamp(14px,2vw,22px)",justifyContent:"center",flexWrap:"wrap"}}>
            {CLIENTS[lang].map((c,i)=><ClientCard key={i} c={c} idx={i} ff={ff}/>)}
          </div>
        </div>
      </section>

      {/* ── Tools marquee ── */}
      <section style={{...sec("clamp(44px,5vw,64px)","clamp(44px,5vw,64px)")}}>
        <div style={{maxWidth:900,margin:"0 auto",marginBottom:"clamp(28px,3vw,40px)"}}>
          <SectionHeader title={t.toolsTitle} ff={ff}/>
        </div>
        <ToolsMarquee isRTL={isRTL}/>
      </section>

      {/* ── FAQ ── */}
      <section style={{...sec(),background:"var(--bg2)"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <SectionHeader title={t.faqTitle} ff={ff}/>
          {FAQS[lang].map((f,i)=><FaqItem key={i} f={f} isRTL={isRTL} ff={ff}/>)}
        </div>
      </section>

      <CtaBanner isRTL={isRTL} t={t} ff={ff}/>

      <Footer isRTL={isRTL} t={t} ff={ff}/>

      {/* ── WhatsApp FAB ── */}
      <motion.a initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:1.2,type:"spring",stiffness:280}}
        whileHover={{scale:1.12}} whileTap={{scale:0.88}}
        href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
        style={{position:"fixed",bottom:24,[isRTL?"left":"right"]:24,zIndex:99,width:54,height:54,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.42)",textDecoration:"none"}}>
        <Ico n="whatsapp" size={26} col="#fff"/>
        {/* Pulse ring */}
        <span style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid #25D366",animation:"pulseRing 2.5s ease-out infinite"}}/>
      </motion.a>

    </div>
  );
}
