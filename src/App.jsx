import { useState, useEffect, useRef, useMemo } from "react";

const WA = "201007725744";
const CAL = "https://calendar.app.google/35V4etCwYoD5poM77";

/* ═══ THEMES ═══ */
const L = { bg:"#f8f9fa",card:"#fff",cardB:"#e0e0e0",cardH:"#1a73e8",text:"#202124",sub:"#5f6368",acc:"#1a73e8",accL:"#e8f0fe",accH:"#1557b0",accT:"#fff",btn:"#dadce0",nav:"rgba(255,255,255,0.88)",navB:"#e8eaed",faq:"rgba(0,0,0,0.06)",dot:"26,115,232",hero:"#fff",secBg:"#f0f2f5",imgShadow:"0 8px 40px rgba(0,0,0,0.10)" };
const D = { bg:"#0e0e0e",card:"#1e1e1e",cardB:"#303030",cardH:"#8ab4f8",text:"#e8eaed",sub:"#9aa0a6",acc:"#8ab4f8",accL:"rgba(138,180,248,0.12)",accH:"#aecbfa",accT:"#1a1a1a",btn:"#3c4043",nav:"rgba(14,14,14,0.88)",navB:"rgba(255,255,255,0.06)",faq:"rgba(255,255,255,0.08)",dot:"138,180,248",hero:"#0e0e0e",secBg:"#161616",imgShadow:"0 8px 40px rgba(0,0,0,0.4)" };

/* ═══ SHOWCASE DATA ═══ */
const SHOWCASE = {
  ar: [
    { img:"/assets/chatbot-majed.png", title:"وكيل ذكاء اصطناعي يتحدث بلهجتكم", desc:"ماجد — روبوت محادثة ذكي بناه فريقنا لـ Engosoft. يردّ على الاستفسارات بالعربية والإنجليزية على مدار الساعة عبر واتساب والموقع، يحجز المواعيد، ويؤهّل العملاء المحتملين تلقائياً.", tag:"AI Customer Agent", imgStyle:"phone" },
    { img:"/assets/workflow-seo.png", title:"أتمتة المحتوى والتسويق بالكامل", desc:"نظام أتمتة متكامل يقرأ 49 دورة تدريبية، يبحث عن الكلمات المفتاحية، ويكتب مقالات SEO عربية احترافية — تلقائياً دون أي تدخل يدوي.", tag:"AI Workflow Automation", imgStyle:"wide" },
    { img:"/assets/workflow-calls.png", title:"تقييم جودة المكالمات بالذكاء الاصطناعي", desc:"نظام يراقب تسجيلات المكالمات، يحوّلها لنصوص عربية، يقيّمها على 50+ معيار، ويُرسل تقارير مفصّلة بالإيميل — 100% تغطية بدلاً من عيّنات عشوائية.", tag:"AI Quality Monitor", imgStyle:"wide" },
    { img:"/assets/workflow-cv.png", title:"فحص السير الذاتية في ثوانٍ", desc:"وركفلو يستقبل السيرة الذاتية عبر تيليجرام، يحللها بالذكاء الاصطناعي، يصنّف المرشحين، ويُرسل إيميلات القبول أو الرفض — كل ده أوتوماتيكي.", tag:"AI Workflow Automation", imgStyle:"wide" },
  ],
  en: [
    { img:"/assets/chatbot-majed.png", title:"An AI Agent that speaks your language", desc:"Majed — a smart chatbot built by our team for Engosoft. Responds to inquiries in Arabic and English 24/7 via WhatsApp and web, books appointments, and qualifies leads automatically.", tag:"AI Customer Agent", imgStyle:"phone" },
    { img:"/assets/workflow-seo.png", title:"Fully automated content & marketing", desc:"An integrated automation system that reads 49 training courses, researches keywords, and writes professional Arabic SEO articles — automatically with zero manual intervention.", tag:"AI Workflow Automation", imgStyle:"wide" },
    { img:"/assets/workflow-calls.png", title:"AI-powered call quality assessment", desc:"A system that monitors call recordings, converts them to Arabic text, evaluates on 50+ criteria, and sends detailed email reports — 100% coverage instead of random samples.", tag:"AI Quality Monitor", imgStyle:"wide" },
    { img:"/assets/workflow-cv.png", title:"CV screening in seconds", desc:"A workflow that receives CVs via Telegram, analyzes them with AI, ranks candidates, and sends acceptance or rejection emails — all automatically.", tag:"AI Workflow Automation", imgStyle:"wide" },
  ],
};

/* ═══ SERVICES ═══ */
const SVC = {
  ar: [
    { id:"agent", badge:"الأكثر طلباً", title:"AI Customer Agent", subtitle:"وكيل ذكاء اصطناعي لخدمة العملاء", desc:"روبوت محادثة ذكي يردّ على عملائكم 24/7 بالعربية والإنجليزية عبر واتساب والموقع وإنستجرام.",
      cats:[{t:"خدمة عملاء على مدار الساعة",fs:["ردود فورية بالعربية والإنجليزية","قاعدة معرفة ذكية قابلة للتحديث","تحويل ذكي للموظف البشري"]},{t:"تأهيل ذكي للعملاء",fs:["تأهيل تلقائي للعملاء المحتملين","حجز مواعيد من المحادثة","استرجاع السلات المتروكة"]},{t:"تحليلات وتقارير",fs:["تقارير أداء الروبوت","تخصيص كامل لشخصية الروبوت","واتساب + تيليجرام + موقع"]}]},
    { id:"auto", title:"AI Workflow Automation", subtitle:"أتمتة العمليات بالذكاء الاصطناعي", desc:"نربط أنظمتكم مع بعضها ونؤتمت المهام اليدوية — من المتجر للـ ERP للتقارير.",
      cats:[{t:"ربط الأنظمة والمزامنة",fs:["مزامنة فورية متجر ↔ ERP","إنشاء تلقائي للعملاء والطلبات","معالجة ذكية للأخطاء"]},{t:"إشعارات وتسويق تلقائي",fs:["إشعارات واتساب وبريد تلقائية","متابعة العملاء والصفقات","تقارير أداء تلقائية"]},{t:"أتمتة متقدمة",fs:["إدارة صفحات التواصل","فحص السير الذاتية بالـ AI","أتمتة طلبات الأسعار"]}]},
    { id:"quality", title:"AI Quality Monitor", subtitle:"تقييم الجودة والتحليلات الذكية", desc:"نظام يراقب مكالمات فريقكم، يقيّمها بالـ AI، ويوفّر تقارير فورية.",
      cats:[{t:"تقييم جودة المكالمات",fs:["تحويل مكالمات عربية لنصوص","تقييم على 50+ معيار","ربط تلقائي مع CRM"]},{t:"تقارير فورية",fs:["تقارير بالبريد تلقائياً","حماية من التقييمات الخاطئة","لوحة متابعة شاملة"]}]},
  ],
  en: [
    { id:"agent", badge:"Most Popular", title:"AI Customer Agent", subtitle:"Intelligent customer service agent", desc:"Smart chatbot responding 24/7 in Arabic & English via WhatsApp, website & Instagram.",
      cats:[{t:"24/7 Customer Service",fs:["Instant Arabic & English responses","Smart updatable knowledge base","Intelligent human handoff"]},{t:"Smart Lead Qualification",fs:["Automatic lead qualification","Appointment booking from chat","Cart recovery via WhatsApp"]},{t:"Analytics & Reports",fs:["Bot performance reports","Customizable bot personality","WhatsApp + Telegram + web"]}]},
    { id:"auto", title:"AI Workflow Automation", subtitle:"AI-powered process automation", desc:"We connect your systems and automate repetitive tasks — from store to ERP to reports.",
      cats:[{t:"System Integration",fs:["Instant store ↔ ERP sync","Auto customer & order creation","Smart error handling"]},{t:"Auto Notifications",fs:["WhatsApp & email notifications","Lead & deal follow-ups","Auto performance reports"]},{t:"Advanced Automation",fs:["Social media management","AI CV screening","Automated rate requests"]}]},
    { id:"quality", title:"AI Quality Monitor", subtitle:"Quality assessment & analytics", desc:"Monitor your team's calls, evaluate with AI, and get instant reports.",
      cats:[{t:"Call Quality Assessment",fs:["Arabic call-to-text","50+ criteria evaluation","Auto CRM matching"]},{t:"Instant Reports",fs:["Auto email reports","False evaluation prevention","Full history dashboard"]}]},
  ],
};

const FAQS = {
  ar:[{q:"كم يستغرق التنفيذ؟",a:"الأنظمة البسيطة أسبوع إلى أسبوعين، والمعقدة من 3 إلى 5 أسابيع."},{q:"هل يدعم اللغة العربية بلهجاتها؟",a:"نعم. الفصحى والمصرية والسعودية والخليجية والإنجليزية."},{q:"ماذا لو حدثت مشكلة بعد التسليم؟",a:"صيانة ودعم شهري. أي مشكلة تُحَل خلال 4 إلى 24 ساعة."},{q:"لسنا متخصصين في التقنية؟",a:"نحن نتولى الجانب التقني بالكامل. أنتم ترون النتائج فقط."},{q:"هل تعملون خارج مصر؟",a:"نعم. مصر والسعودية والإمارات والكويت وأوروبا."}],
  en:[{q:"How long does implementation take?",a:"Simple: 1-2 weeks. Complex: 3-5 weeks."},{q:"Does it support Arabic dialects?",a:"Yes. MSA, Egyptian, Saudi, Gulf, and English."},{q:"What if something breaks?",a:"Monthly support. Issues resolved in 4-24 hours."},{q:"We're not technical?",a:"We handle everything. You just see results."},{q:"Work outside Egypt?",a:"Yes. Egypt, Saudi, UAE, Kuwait, Europe."}],
};

/* ═══ FLOATING DOTS ═══ */
function Dots({mode}){const ref=useRef();const pts=useMemo(()=>Array.from({length:35},()=>({x:Math.random()*100,y:Math.random()*100,r:Math.random()*2+1,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,o:Math.random()*.4+.2})),[]);
useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d");let raf;const rs=()=>{c.width=window.innerWidth;c.height=window.innerHeight};rs();window.addEventListener("resize",rs);
const draw=()=>{ctx.clearRect(0,0,c.width,c.height);const col=mode==="dark"?"138,180,248":"26,115,232";pts.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>100)d.vx*=-1;if(d.y<0||d.y>100)d.vy*=-1;const px=d.x/100*c.width,py=d.y/100*c.height;ctx.beginPath();ctx.arc(px,py,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(${col},${d.o*(mode==="dark"?.25:.15)})`;ctx.fill()});
for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=(pts[i].x-pts[j].x)/100*c.width,dy=(pts[i].y-pts[j].y)/100*c.height,dist=Math.sqrt(dx*dx+dy*dy);if(dist<140){ctx.beginPath();ctx.moveTo(pts[i].x/100*c.width,pts[i].y/100*c.height);ctx.lineTo(pts[j].x/100*c.width,pts[j].y/100*c.height);ctx.strokeStyle=`rgba(${col},${(1-dist/140)*(mode==="dark"?.07:.04)})`;ctx.lineWidth=1;ctx.stroke()}}
raf=requestAnimationFrame(draw)};draw();return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",rs)}},[mode,pts]);
return <canvas ref={ref} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}/>;
}

function FaqItem({f,th,isRTL,ff}){const[o,setO]=useState(false);return(
<div style={{borderBottom:`1px solid ${th.faq}`}}><button onClick={()=>setO(!o)} style={{width:"100%",padding:"18px 0",border:"none",background:"none",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:ff,textAlign:isRTL?"right":"left"}}>
<span style={{fontSize:15,fontWeight:500,color:th.text}}>{f.q}</span>
<svg width="20" height="20" viewBox="0 0 24 24" fill={th.acc} style={{transform:o?"rotate(180deg)":"rotate(0)",transition:"transform .3s",flexShrink:0,margin:isRTL?"0 16px 0 0":"0 0 0 16px"}}><path d="M7 10l5 5 5-5z"/></svg>
</button><div style={{maxHeight:o?200:0,overflow:"hidden",transition:"max-height .4s ease"}}><div style={{paddingBottom:18,fontSize:14,color:th.sub,lineHeight:1.8}}>{f.a}</div></div></div>);}

function Card({s,th,isRTL,ff}){const[exp,setExp]=useState(false);return(
<div style={{background:th.card,borderRadius:16,border:`1px solid ${th.cardB}`,overflow:"hidden",flex:"1 1 300px",maxWidth:400,minWidth:280,transition:"all .3s",position:"relative",zIndex:1}}
onMouseEnter={e=>{e.currentTarget.style.borderColor=th.cardH;e.currentTarget.style.boxShadow=`0 0 30px ${th.acc}12`;e.currentTarget.style.transform="translateY(-4px)"}}
onMouseLeave={e=>{e.currentTarget.style.borderColor=th.cardB;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)"}}>
{s.badge&&<div style={{position:"absolute",top:16,[isRTL?"left":"right"]:16,background:th.accL,color:th.acc,padding:"4px 14px",borderRadius:20,fontSize:12,fontWeight:600,fontFamily:ff}}>{s.badge}</div>}
<div style={{padding:"32px 24px 20px"}}>
<h3 style={{fontSize:22,fontWeight:600,color:th.text,marginBottom:4}}>{s.title}</h3>
<p style={{fontSize:14,color:th.acc,fontWeight:500,marginBottom:14}}>{s.subtitle}</p>
<p style={{fontSize:14,color:th.sub,lineHeight:1.7,marginBottom:24}}>{s.desc}</p>
<a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"13px 24px",borderRadius:28,background:th.acc,color:th.accT,textDecoration:"none",fontWeight:600,fontSize:14,fontFamily:ff,transition:"background .2s",marginBottom:10}}
onMouseEnter={e=>e.currentTarget.style.background=th.accH} onMouseLeave={e=>e.currentTarget.style.background=th.acc}>
{isRTL?"احجز استشارة مجانية":"Book Free Consultation"}</a>
<a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"11px 24px",borderRadius:28,background:"transparent",color:th.acc,textDecoration:"none",border:`1px solid ${th.btn}`,fontWeight:600,fontSize:13,fontFamily:ff,transition:"background .2s"}}
onMouseEnter={e=>e.currentTarget.style.background=th.accL} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
{isRTL?"تواصل عبر واتساب":"Chat on WhatsApp"}</a></div>
<div style={{borderTop:`1px solid ${th.cardB}`,padding:"16px 24px 8px"}}>
<p style={{fontSize:13,color:th.sub,marginBottom:14}}>{isRTL?"يشمل:":"Includes:"}</p>
{s.cats.map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
<div style={{width:20,height:20,borderRadius:"50%",background:th.accL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
<svg width="12" height="12" viewBox="0 0 24 24" fill={th.acc}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
<span style={{fontSize:14,fontWeight:500,color:th.text}}>{c.t}</span></div>))}</div>
<div style={{borderTop:`1px solid ${th.cardB}`}}>
{exp&&<div style={{padding:"16px 24px"}}>{s.cats.map((c,ci)=>(<div key={ci} style={{marginBottom:16}}>
<div style={{fontSize:13,fontWeight:600,color:th.acc,marginBottom:8}}>{c.t}</div>
{c.fs.map((f,fi)=>(<div key={fi} style={{display:"flex",gap:8,marginBottom:6,paddingRight:isRTL?8:0,paddingLeft:isRTL?0:8}}>
<span style={{color:th.acc,fontSize:11,marginTop:4,flexShrink:0}}>+</span>
<span style={{fontSize:13,color:th.sub,lineHeight:1.6}}>{f}</span></div>))}</div>))}</div>}
<button onClick={()=>setExp(!exp)} style={{width:"100%",padding:"14px",border:"none",background:"transparent",color:th.acc,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:ff,borderTop:exp?`1px solid ${th.cardB}`:"none"}}>
{exp?(isRTL?"إخفاء التفاصيل":"Hide features"):(isRTL?"عرض تفاصيل الخدمة":"View plan features")}
<svg width="12" height="12" viewBox="0 0 24 24" fill={th.acc} style={{display:"inline-block",verticalAlign:"middle",transform:exp?"rotate(180deg)":"rotate(0)",transition:"transform .3s",margin:isRTL?"0 6px 0 0":"0 0 0 6px"}}><path d="M7 10l5 5 5-5z"/></svg>
</button></div></div>);}

/* ═══ SHOWCASE SECTION ═══ */
function ShowcaseItem({item,index,th,isRTL,ff}){
  const reverse = index % 2 !== 0;
  const isPhone = item.imgStyle === "phone";
  return (
    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:40,justifyContent:"center",padding:"60px 24px",maxWidth:1100,margin:"0 auto",flexDirection:reverse&&!isRTL?"row-reverse":!reverse&&isRTL?"row-reverse":"row"}}>
      {/* Image */}
      <div style={{flex:"1 1 400px",maxWidth:isPhone?280:540,minWidth:260}}>
        {isPhone ? (
          <div style={{width:240,margin:"0 auto",background:th.card,borderRadius:28,border:`2px solid ${th.cardB}`,padding:"12px 8px 20px",boxShadow:th.imgShadow,transition:"all .4s"}}>
            <div style={{borderRadius:20,overflow:"hidden"}}><img src={item.img} alt="" style={{width:"100%",display:"block"}} /></div>
          </div>
        ) : (
          <div style={{background:th.card,borderRadius:12,border:`1px solid ${th.cardB}`,overflow:"hidden",boxShadow:th.imgShadow,transition:"all .4s"}}>
            <div style={{height:8,background:th.secBg,display:"flex",alignItems:"center",gap:4,padding:"0 10px"}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#ff5f57"}}/>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#ffbd2e"}}/>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#28c840"}}/>
            </div>
            <img src={item.img} alt="" style={{width:"100%",display:"block"}} />
          </div>
        )}
      </div>
      {/* Text */}
      <div style={{flex:"1 1 360px",maxWidth:480,minWidth:260}}>
        <span style={{display:"inline-block",background:th.accL,color:th.acc,padding:"4px 14px",borderRadius:20,fontSize:12,fontWeight:600,marginBottom:16,fontFamily:ff}}>{item.tag}</span>
        <h3 style={{fontSize:26,fontWeight:600,color:th.text,marginBottom:12,lineHeight:1.4,transition:"color .4s"}}>{item.title}</h3>
        <p style={{fontSize:15,color:th.sub,lineHeight:1.8,marginBottom:24,transition:"color .4s"}}>{item.desc}</p>
        <a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,background:th.acc,color:th.accT,padding:"12px 28px",borderRadius:28,textDecoration:"none",fontWeight:600,fontSize:14,fontFamily:ff,transition:"background .2s"}}
          onMouseEnter={e=>e.currentTarget.style.background=th.accH} onMouseLeave={e=>e.currentTarget.style.background=th.acc}>
          {isRTL?"احجز استشارة":"Book Consultation"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill={th.accT}><path d={isRTL?"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z":"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"}/></svg>
        </a>
      </div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function App(){
  const[lang,setLang]=useState("ar");
  const[mode,setMode]=useState("light");
  const[heroVis,setHeroVis]=useState(false);
  const isRTL=lang==="ar";
  const ff=isRTL?"'Tajawal', sans-serif":"'Segoe UI', system-ui, sans-serif";
  const th=mode==="dark"?D:L;

  useEffect(()=>{setTimeout(()=>setHeroVis(true),100)},[]);
  useEffect(()=>{const s=document.createElement("style");s.textContent=`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}::selection{background:rgba(26,115,232,.2)}.ht{opacity:0;transform:translateY(30px);transition:all .9s cubic-bezier(.16,1,.3,1)}.ht.v{opacity:1;transform:translateY(0)}.ht2{transition-delay:.12s}.ht3{transition-delay:.24s}.ht4{transition-delay:.4s}`;document.head.appendChild(s);return()=>document.head.removeChild(s)},[]);
  useEffect(()=>{document.body.style.background=th.bg},[th.bg]);

  const t=isRTL?{l1:"ارتقِ بأعمالك مع",brand:"Engosoft AI",sub:"ثلاث خدمات ذكية تعمل على مدار الساعة — لتوفير الوقت وزيادة المبيعات وتحسين تجربة عملائكم",cta:"احجز استشارة مجانية",faq:"الأسئلة الشائعة",foot:"حلول تقنية متكاملة — من الفكرة إلى التنفيذ",demo:"احجز استشارة",showcase:"ماذا نبني لعملائنا",plans:"اختر الخدمة المناسبة لك"}
  :{l1:"Power your business with",brand:"Engosoft AI",sub:"Three intelligent services working 24/7 — to save time, increase sales, and improve customer experience",cta:"Book a Free Consultation",faq:"Frequently Asked Questions",foot:"Full-Service Tech Solutions — From Idea to Execution",demo:"Book Consultation",showcase:"What we build for our clients",plans:"Choose the right service for you"};

  return(
  <div dir={isRTL?"rtl":"ltr"} style={{fontFamily:ff,color:th.text,minHeight:"100vh",background:th.bg,transition:"background .4s,color .4s"}}>
  <Dots mode={mode}/>

  {/* NAV */}
  <nav style={{position:"sticky",top:0,zIndex:100,background:th.nav,backdropFilter:"blur(20px)",borderBottom:`1px solid ${th.navB}`,padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background .4s"}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${th.acc},#4285f4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:11}}>ES</div>
      <span style={{fontWeight:700,fontSize:18,color:th.text}}>Engosoft</span></div>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <button onClick={()=>setMode(mode==="light"?"dark":"light")} style={{background:"none",border:`1px solid ${th.btn}`,borderRadius:20,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"background .2s"}}
        onMouseEnter={e=>e.currentTarget.style.background=th.accL} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        {mode==="light"?<svg width="18" height="18" viewBox="0 0 24 24" fill={th.sub}><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
        :<svg width="18" height="18" viewBox="0 0 24 24" fill={th.sub}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>}
      </button>
      <button onClick={()=>setLang(lang==="ar"?"en":"ar")} style={{background:"none",border:`1px solid ${th.btn}`,borderRadius:20,padding:"6px 16px",fontSize:13,fontWeight:500,color:th.sub,cursor:"pointer",fontFamily:ff}}>{lang==="ar"?"English":"عربي"}</button>
      <a href={CAL} target="_blank" rel="noopener noreferrer" style={{background:th.acc,color:th.accT,padding:"8px 22px",borderRadius:20,textDecoration:"none",fontSize:13,fontWeight:600,fontFamily:ff}}>{t.demo}</a>
    </div>
  </nav>

  {/* HERO WITH VIDEO */}
  <section style={{position:"relative",zIndex:1,overflow:"hidden",textAlign:"center",padding:"0",background:th.hero,transition:"background .4s"}}>
    {/* Video background */}
    <div style={{position:"relative",width:"100%",maxHeight:480,overflow:"hidden"}}>
      <video autoPlay muted loop playsInline style={{width:"100%",display:"block",objectFit:"cover",maxHeight:480,filter:mode==="light"?"brightness(0.95)":"brightness(0.7)"}}>
        <source src="/assets/hero-video.mp4" type="video/mp4"/>
      </video>
      {/* Overlay */}
      <div style={{position:"absolute",inset:0,background:mode==="light"?"rgba(255,255,255,0.7)":"rgba(14,14,14,0.65)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px"}}>
        <div className={`ht ${heroVis?'v':''}`} style={{marginBottom:16}}>
          <div style={{width:44,height:44,margin:"0 auto",borderRadius:10,background:`linear-gradient(135deg,${th.acc},#4285f4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:14}}>ES</div>
        </div>
        <h1 className={`ht ht2 ${heroVis?'v':''}`} style={{fontSize:"clamp(28px,5vw,48px)",fontWeight:400,lineHeight:1.25,marginBottom:6,color:th.text,transition:"color .4s"}}>{t.l1}</h1>
        <h1 className={`ht ht3 ${heroVis?'v':''}`} style={{fontSize:"clamp(28px,5vw,48px)",fontWeight:500,lineHeight:1.25,marginBottom:20,color:th.acc}}>{t.brand}</h1>
        <p className={`ht ht3 ${heroVis?'v':''}`} style={{fontSize:15,color:th.sub,maxWidth:520,margin:"0 auto 28px",lineHeight:1.8,transition:"color .4s"}}>{t.sub}</p>
        <div className={`ht ht4 ${heroVis?'v':''}`}>
          <a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,background:th.acc,color:th.accT,padding:"14px 32px",borderRadius:28,textDecoration:"none",fontWeight:600,fontSize:15,fontFamily:ff,transition:"background .2s,transform .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=th.accH;e.currentTarget.style.transform="translateY(-2px)"}}
            onMouseLeave={e=>{e.currentTarget.style.background=th.acc;e.currentTarget.style.transform="translateY(0)"}}>
            {t.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill={th.accT}><path d={isRTL?"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z":"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"}/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  {/* SHOWCASE SECTIONS */}
  <section style={{position:"relative",zIndex:1,borderTop:`1px solid ${th.navB}`,transition:"border-color .4s"}}>
    <h2 style={{fontSize:28,fontWeight:400,textAlign:"center",padding:"48px 24px 0",color:th.text,transition:"color .4s"}}>{t.showcase}</h2>
    {SHOWCASE[lang].map((item,i)=>(
      <div key={i} style={{background:i%2===0?"transparent":th.secBg,transition:"background .4s"}}>
        <ShowcaseItem item={item} index={i} th={th} isRTL={isRTL} ff={ff}/>
      </div>
    ))}
  </section>

  {/* SERVICE CARDS */}
  <section style={{padding:"48px 24px 72px",position:"relative",zIndex:1,borderTop:`1px solid ${th.navB}`}}>
    <h2 style={{fontSize:28,fontWeight:400,textAlign:"center",marginBottom:36,color:th.text,transition:"color .4s"}}>{t.plans}</h2>
    <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",maxWidth:1280,margin:"0 auto",alignItems:"flex-start"}}>
      {SVC[lang].map(s=><Card key={s.id} s={s} th={th} isRTL={isRTL} ff={ff}/>)}
    </div>
  </section>

  {/* FAQ */}
  <section style={{padding:"48px 24px 64px",borderTop:`1px solid ${th.navB}`,position:"relative",zIndex:1}}>
    <div style={{maxWidth:680,margin:"0 auto"}}>
      <h2 style={{fontSize:28,fontWeight:400,textAlign:"center",marginBottom:36,color:th.text}}>{t.faq}</h2>
      {FAQS[lang].map((f,i)=><FaqItem key={i} f={f} th={th} isRTL={isRTL} ff={ff}/>)}
    </div>
  </section>

  {/* FOOTER */}
  <footer style={{padding:"28px 24px",borderTop:`1px solid ${th.navB}`,textAlign:"center",position:"relative",zIndex:1}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:10}}>
      <div style={{width:22,height:22,borderRadius:5,background:`linear-gradient(135deg,${th.acc},#4285f4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:7}}>ES</div>
      <span style={{fontWeight:700,fontSize:14,color:th.text}}>Engosoft</span></div>
    <p style={{fontSize:12,color:th.sub}}>{t.foot}</p>
    <p style={{fontSize:11,color:th.btn,marginTop:4}}>© 2025 Engosoft</p>
  </footer>

  {/* WA */}
  <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{position:"fixed",bottom:24,right:24,zIndex:999,width:52,height:52,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 16px rgba(37,211,102,.35)",textDecoration:"none",transition:"transform .2s"}}
    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  </div>);
}
