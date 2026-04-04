import { useState, useEffect, useRef, useMemo } from "react";

const WA = "201007725744";
const CAL = "https://calendar.app.google/35V4etCwYoD5poM77";
const MAJED = "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/02/11/18/20260211184124-KE13UNZE.json";

const L={bg:"#f8f9fa",card:"#fff",cardB:"#e0e0e0",cardH:"#1a73e8",text:"#202124",sub:"#5f6368",acc:"#1a73e8",accL:"#e8f0fe",accH:"#1557b0",accT:"#fff",btn:"#dadce0",nav:"rgba(255,255,255,0.92)",navB:"#e8eaed",faq:"rgba(0,0,0,0.06)",dot:"26,115,232",hero:"#fff",sec:"#f0f2f5",shadow:"0 8px 32px rgba(0,0,0,0.08)"};
const D={bg:"#0e0e0e",card:"#1e1e1e",cardB:"#303030",cardH:"#8ab4f8",text:"#e8eaed",sub:"#9aa0a6",acc:"#8ab4f8",accL:"rgba(138,180,248,0.12)",accH:"#aecbfa",accT:"#1a1a1a",btn:"#3c4043",nav:"rgba(14,14,14,0.92)",navB:"rgba(255,255,255,0.06)",faq:"rgba(255,255,255,0.08)",dot:"138,180,248",hero:"#0e0e0e",sec:"#161616",shadow:"0 8px 32px rgba(0,0,0,0.3)"};

const SHOW={ar:[
  {img:"/assets/chatbot-majed.png",title:"وكيل ذكاء اصطناعي يتحدث بلهجتكم",desc:"ماجد — روبوت محادثة ذكي بناه فريقنا. يردّ بالعربية والإنجليزية على مدار الساعة، يحجز المواعيد، ويؤهّل العملاء تلقائياً.",tag:"AI Customer Agent",phone:true,tryBot:true},
  {img:"/assets/workflow-seo.png",title:"أتمتة المحتوى والتسويق بالكامل",desc:"نظام يقرأ 49 دورة تدريبية، يبحث عن الكلمات المفتاحية، ويكتب مقالات SEO عربية — تلقائياً.",tag:"AI Workflow Automation",scroll:true},
  {img:"/assets/workflow-calls.png",title:"تقييم جودة المكالمات بالذكاء الاصطناعي",desc:"يراقب التسجيلات، يحوّلها لنصوص عربية، يقيّمها على 50+ معيار — 100% تغطية.",tag:"AI Quality Monitor",scroll:true},
  {img:"/assets/workflow-cv.png",title:"فحص السير الذاتية في ثوانٍ",desc:"يستقبل الـ CV عبر تيليجرام، يحلله بالـ AI، يصنّف المرشحين، ويُرسل إيميلات القبول/الرفض تلقائياً.",tag:"AI Workflow Automation",scroll:true},
],en:[
  {img:"/assets/chatbot-majed.png",title:"An AI Agent that speaks your language",desc:"Majed — responds 24/7 in Arabic & English, books appointments, qualifies leads automatically.",tag:"AI Customer Agent",phone:true,tryBot:true},
  {img:"/assets/workflow-seo.png",title:"Fully automated content & marketing",desc:"Researches keywords, writes Arabic SEO articles — zero manual work.",tag:"AI Workflow Automation",scroll:true},
  {img:"/assets/workflow-calls.png",title:"AI call quality assessment",desc:"Monitors recordings, converts to text, evaluates 50+ criteria — 100% coverage.",tag:"AI Quality Monitor",scroll:true},
  {img:"/assets/workflow-cv.png",title:"CV screening in seconds",desc:"Receives CVs via Telegram, analyzes with AI, sends acceptance/rejection emails automatically.",tag:"AI Workflow Automation",scroll:true},
]};

const SVC={ar:[
  {id:"a",badge:"الأكثر طلباً",title:"AI Customer Agent",sub:"وكيل ذكاء اصطناعي",desc:"روبوت يردّ 24/7 بالعربية عبر واتساب والموقع.",cats:[{t:"خدمة عملاء 24/7",fs:["ردود عربية وإنجليزية","قاعدة معرفة ذكية","تحويل للموظف"]},{t:"تأهيل العملاء",fs:["تأهيل تلقائي","حجز مواعيد","استرجاع سلات"]},{t:"تحليلات",fs:["تقارير الأداء","تخصيص الشخصية","واتساب+تيليجرام+موقع"]}]},
  {id:"b",title:"AI Workflow Automation",sub:"أتمتة العمليات",desc:"نربط أنظمتكم ونؤتمت المهام اليدوية.",cats:[{t:"ربط الأنظمة",fs:["مزامنة متجر↔ERP","إنشاء تلقائي","معالجة أخطاء"]},{t:"إشعارات تلقائية",fs:["واتساب+بريد","متابعة صفقات","تقارير تلقائية"]},{t:"أتمتة متقدمة",fs:["سوشيال ميديا","فحص CV","طلبات أسعار"]}]},
  {id:"c",title:"AI Quality Monitor",sub:"تقييم الجودة",desc:"يراقب المكالمات ويقيّمها بالـ AI.",cats:[{t:"تقييم المكالمات",fs:["صوت→نص عربي","50+ معيار","ربط CRM"]},{t:"تقارير فورية",fs:["بريد تلقائي","حماية أخطاء","لوحة متابعة"]}]},
],en:[
  {id:"a",badge:"Most Popular",title:"AI Customer Agent",sub:"AI customer service",desc:"Chatbot responding 24/7 in Arabic & English.",cats:[{t:"24/7 Support",fs:["Arabic & English","Smart KB","Human handoff"]},{t:"Lead Qualification",fs:["Auto scoring","Appointment booking","Cart recovery"]},{t:"Analytics",fs:["Reports","Custom personality","Multi-channel"]}]},
  {id:"b",title:"AI Workflow Automation",sub:"Process automation",desc:"Connect systems, automate tasks.",cats:[{t:"Integration",fs:["Store↔ERP sync","Auto creation","Error handling"]},{t:"Notifications",fs:["WhatsApp+email","Follow-ups","Auto reports"]},{t:"Advanced",fs:["Social media","CV screening","Rate requests"]}]},
  {id:"c",title:"AI Quality Monitor",sub:"Quality analytics",desc:"Monitor calls, evaluate with AI.",cats:[{t:"Assessment",fs:["Arabic STT","50+ criteria","CRM match"]},{t:"Reports",fs:["Auto email","Error prevention","Dashboard"]}]},
]};

const FAQS={ar:[{q:"كم يستغرق التنفيذ؟",a:"أسبوع لأسبوعين للبسيط، 3-5 أسابيع للمعقد."},{q:"يدعم العربية بلهجاتها؟",a:"نعم. فصحى ومصرية وسعودية وخليجية."},{q:"مشكلة بعد التسليم؟",a:"دعم شهري. تُحَل في 4-24 ساعة."},{q:"لسنا تقنيين؟",a:"نتولى كل شيء."},{q:"خارج مصر؟",a:"مصر والسعودية والإمارات والكويت وأوروبا."}],
en:[{q:"Implementation time?",a:"1-2 weeks simple, 3-5 complex."},{q:"Arabic dialects?",a:"MSA, Egyptian, Saudi, Gulf."},{q:"Issues after delivery?",a:"Monthly support. 4-24h."},{q:"Not technical?",a:"We handle everything."},{q:"Outside Egypt?",a:"Egypt, Saudi, UAE, Kuwait, Europe."}]};

function useInView(t=0.12){const r=useRef();const[v,setV]=useState(false);
useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect()},[t]);return[r,v];}

function Dots({mode}){const ref=useRef();const pts=useMemo(()=>Array.from({length:28},()=>({x:Math.random()*100,y:Math.random()*100,r:Math.random()*2+1,vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.1,o:Math.random()*.3+.15})),[]);
useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d");let raf;const rs=()=>{c.width=window.innerWidth;c.height=window.innerHeight};rs();window.addEventListener("resize",rs);
const draw=()=>{ctx.clearRect(0,0,c.width,c.height);const col=mode==="dark"?"138,180,248":"26,115,232";pts.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>100)d.vx*=-1;if(d.y<0||d.y>100)d.vy*=-1;ctx.beginPath();ctx.arc(d.x/100*c.width,d.y/100*c.height,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(${col},${d.o*(mode==="dark"?.2:.12)})`;ctx.fill()});
for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=(pts[i].x-pts[j].x)/100*c.width,dy=(pts[i].y-pts[j].y)/100*c.height,dist=Math.sqrt(dx*dx+dy*dy);if(dist<130){ctx.beginPath();ctx.moveTo(pts[i].x/100*c.width,pts[i].y/100*c.height);ctx.lineTo(pts[j].x/100*c.width,pts[j].y/100*c.height);ctx.strokeStyle=`rgba(${col},${(1-dist/130)*(mode==="dark"?.06:.03)})`;ctx.lineWidth=1;ctx.stroke()}}
raf=requestAnimationFrame(draw)};draw();return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",rs)}},[mode,pts]);
return <canvas ref={ref} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}/>;}

function ShowItem({item,idx,th,isRTL,ff}){const[ref,vis]=useInView();const rev=idx%2!==0;
return(<div ref={ref} style={{display:"flex",flexDirection:"column",gap:"clamp(20px,4vw,40px)",padding:"clamp(28px,5vw,64px) clamp(16px,4vw,48px)",maxWidth:1100,margin:"0 auto",
  opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all .8s cubic-bezier(.16,1,.3,1)","@media(min-width:768px)":{flexDirection:rev?"row-reverse":"row"}}}>
  <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"clamp(20px,4vw,40px)",justifyContent:"center",flexDirection:rev?"row-reverse":"row"}}>
    {/* IMG */}
    <div style={{flex:"1 1 260px",maxWidth:item.phone?240:500,width:"100%",
      opacity:vis?1:0,transform:vis?"translateX(0)":`translateX(${(isRTL?!rev:rev)?40:-40}px)`,transition:"all .8s .15s cubic-bezier(.16,1,.3,1)"}}>
      {item.phone?(
        <div style={{width:"min(220px,65vw)",margin:"0 auto",background:th.card,borderRadius:24,border:`2px solid ${th.cardB}`,padding:"10px 6px 14px",boxShadow:th.shadow,transition:"all .4s"}}>
          <div style={{borderRadius:18,overflow:"hidden"}}><img src={item.img} alt="" style={{width:"100%",display:"block"}} loading="lazy"/></div></div>
      ):(
        <div style={{background:th.card,borderRadius:12,border:`1px solid ${th.cardB}`,overflow:"hidden",boxShadow:th.shadow,transition:"all .4s"}}>
          <div style={{height:24,background:th.sec,display:"flex",alignItems:"center",gap:5,padding:"0 10px",transition:"background .4s"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#ff5f57"}}/>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#ffbd2e"}}/>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#28c840"}}/></div>
          {item.scroll?(
            <div style={{overflow:"hidden"}}><div style={{display:"flex",animation:vis?`wfScroll 25s linear infinite`:"none",width:"200%"}}>
              <img src={item.img} alt="" style={{width:"50%",display:"block",flexShrink:0}} loading="lazy"/>
              <img src={item.img} alt="" style={{width:"50%",display:"block",flexShrink:0}} loading="lazy"/></div></div>
          ):(<img src={item.img} alt="" style={{width:"100%",display:"block"}} loading="lazy"/>)}
        </div>
      )}
    </div>
    {/* TEXT */}
    <div style={{flex:"1 1 260px",maxWidth:460,width:"100%",
      opacity:vis?1:0,transform:vis?"translateX(0)":`translateX(${(isRTL?!rev:rev)?-40:40}px)`,transition:"all .8s .25s cubic-bezier(.16,1,.3,1)"}}>
      <span style={{display:"inline-block",background:th.accL,color:th.acc,padding:"4px 14px",borderRadius:20,fontSize:11,fontWeight:600,marginBottom:14,fontFamily:ff}}>{item.tag}</span>
      <h3 style={{fontSize:"clamp(20px,3.5vw,26px)",fontWeight:600,color:th.text,marginBottom:10,lineHeight:1.4}}>{item.title}</h3>
      <p style={{fontSize:"clamp(13px,2vw,15px)",color:th.sub,lineHeight:1.8,marginBottom:20}}>{item.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        <a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,background:th.acc,color:th.accT,padding:"10px 22px",borderRadius:28,textDecoration:"none",fontWeight:600,fontSize:13,fontFamily:ff,transition:"background .2s"}}
          onMouseEnter={e=>e.currentTarget.style.background=th.accH} onMouseLeave={e=>e.currentTarget.style.background=th.acc}>
          {isRTL?"احجز استشارة":"Book Consultation"}</a>
        {item.tryBot&&(
          <a href={MAJED} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,background:"transparent",color:th.acc,padding:"10px 22px",borderRadius:28,textDecoration:"none",border:`1.5px solid ${th.acc}`,fontWeight:600,fontSize:13,fontFamily:ff,transition:"background .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background=th.accL} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {isRTL?"جرّب ماجد الآن":"Try Majed Now"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill={th.acc}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></a>
        )}</div>
    </div>
  </div>
</div>);}

function FaqItem({f,th,isRTL,ff}){const[o,setO]=useState(false);return(
<div style={{borderBottom:`1px solid ${th.faq}`}}><button onClick={()=>setO(!o)} style={{width:"100%",padding:"14px 0",border:"none",background:"none",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:ff,textAlign:isRTL?"right":"left"}}>
<span style={{fontSize:14,fontWeight:500,color:th.text}}>{f.q}</span>
<svg width="16" height="16" viewBox="0 0 24 24" fill={th.acc} style={{transform:o?"rotate(180deg)":"",transition:"transform .3s",flexShrink:0,margin:isRTL?"0 12px 0 0":"0 0 0 12px"}}><path d="M7 10l5 5 5-5z"/></svg>
</button><div style={{maxHeight:o?200:0,overflow:"hidden",transition:"max-height .4s"}}><div style={{paddingBottom:14,fontSize:13,color:th.sub,lineHeight:1.8}}>{f.a}</div></div></div>);}

function Card({s,th,isRTL,ff}){const[exp,setExp]=useState(false);const[ref,vis]=useInView(0.05);return(
<div ref={ref} style={{background:th.card,borderRadius:16,border:`1px solid ${th.cardB}`,overflow:"hidden",flex:"1 1 260px",maxWidth:380,minWidth:250,transition:"all .5s",position:"relative",zIndex:1,
  opacity:vis?1:0,transform:vis?"translateY(0) scale(1)":"translateY(30px) scale(.97)"}}
onMouseEnter={e=>{e.currentTarget.style.borderColor=th.cardH;e.currentTarget.style.boxShadow=th.shadow;e.currentTarget.style.transform="translateY(-4px)"}}
onMouseLeave={e=>{e.currentTarget.style.borderColor=th.cardB;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)"}}>
{s.badge&&<div style={{position:"absolute",top:12,[isRTL?"left":"right"]:12,background:th.accL,color:th.acc,padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:600,fontFamily:ff}}>{s.badge}</div>}
<div style={{padding:"24px 18px 16px"}}>
<h3 style={{fontSize:18,fontWeight:600,color:th.text,marginBottom:3}}>{s.title}</h3>
<p style={{fontSize:12,color:th.acc,fontWeight:500,marginBottom:10}}>{s.sub}</p>
<p style={{fontSize:12,color:th.sub,lineHeight:1.7,marginBottom:16}}>{s.desc}</p>
<a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"11px",borderRadius:28,background:th.acc,color:th.accT,textDecoration:"none",fontWeight:600,fontSize:13,fontFamily:ff,transition:"background .2s",marginBottom:6}}
onMouseEnter={e=>e.currentTarget.style.background=th.accH} onMouseLeave={e=>e.currentTarget.style.background=th.acc}>
{isRTL?"احجز استشارة مجانية":"Book Free Consultation"}</a>
<a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"9px",borderRadius:28,background:"transparent",color:th.acc,textDecoration:"none",border:`1px solid ${th.btn}`,fontWeight:600,fontSize:12,fontFamily:ff}}>
{isRTL?"واتساب":"WhatsApp"}</a></div>
<div style={{borderTop:`1px solid ${th.cardB}`,padding:"12px 18px 4px"}}>
{s.cats.map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
<svg width="14" height="14" viewBox="0 0 24 24" fill={th.acc}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
<span style={{fontSize:12,fontWeight:500,color:th.text}}>{c.t}</span></div>))}</div>
<div style={{borderTop:`1px solid ${th.cardB}`}}>
{exp&&<div style={{padding:"12px 18px"}}>{s.cats.map((c,ci)=>(<div key={ci} style={{marginBottom:10}}>
<div style={{fontSize:11,fontWeight:600,color:th.acc,marginBottom:4}}>{c.t}</div>
{c.fs.map((f,fi)=>(<div key={fi} style={{display:"flex",gap:5,marginBottom:3}}>
<span style={{color:th.acc,fontSize:9,marginTop:3}}>+</span>
<span style={{fontSize:11,color:th.sub,lineHeight:1.5}}>{f}</span></div>))}</div>))}</div>}
<button onClick={()=>setExp(!exp)} style={{width:"100%",padding:"10px",border:"none",background:"transparent",color:th.acc,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:ff}}>
{exp?(isRTL?"إخفاء":"Hide"):(isRTL?"التفاصيل":"Details")}
<svg width="10" height="10" viewBox="0 0 24 24" fill={th.acc} style={{verticalAlign:"middle",transform:exp?"rotate(180deg)":"",transition:"transform .3s",margin:isRTL?"0 4px 0 0":"0 0 0 4px"}}><path d="M7 10l5 5 5-5z"/></svg>
</button></div></div>);}

export default function App(){
  const[lang,setLang]=useState("ar");const[mode,setMode]=useState("light");const[hv,setHv]=useState(false);
  const isRTL=lang==="ar";const ff=isRTL?"'Tajawal',sans-serif":"'Segoe UI',system-ui,sans-serif";const th=mode==="dark"?D:L;
  useEffect(()=>{setTimeout(()=>setHv(true),150)},[]);
  useEffect(()=>{const s=document.createElement("style");s.textContent=`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}::selection{background:rgba(26,115,232,.2)}.ht{opacity:0;transform:translateY(24px);transition:all .8s cubic-bezier(.16,1,.3,1)}.ht.v{opacity:1;transform:translateY(0)}.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.35s}@keyframes wfScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`;document.head.appendChild(s);return()=>document.head.removeChild(s)},[]);
  useEffect(()=>{document.body.style.background=th.bg},[th.bg]);
  const t=isRTL?{l1:"ارتقِ بأعمالك مع",brand:"Engosoft AI",sub:"ثلاث خدمات ذكية تعمل على مدار الساعة — لتوفير الوقت وزيادة المبيعات وتحسين تجربة عملائكم",cta:"احجز استشارة مجانية",faq:"الأسئلة الشائعة",foot:"حلول تقنية متكاملة — من الفكرة إلى التنفيذ",demo:"استشارة",show:"ماذا نبني لعملائنا",plans:"اختر الخدمة المناسبة"}:{l1:"Power your business with",brand:"Engosoft AI",sub:"Three AI services working 24/7 — save time, increase sales, improve experience",cta:"Book Free Consultation",faq:"FAQ",foot:"Full-Service AI Solutions",demo:"Consult",show:"What we build",plans:"Choose your service"};
  return(<div dir={isRTL?"rtl":"ltr"} style={{fontFamily:ff,color:th.text,minHeight:"100vh",background:th.bg,transition:"background .4s,color .4s"}}>
  <Dots mode={mode}/>
  {/* NAV */}
  <nav style={{position:"sticky",top:0,zIndex:100,background:th.nav,backdropFilter:"blur(16px)",borderBottom:`1px solid ${th.navB}`,padding:"0 clamp(10px,3vw,32px)",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:26,height:26,borderRadius:6,background:`linear-gradient(135deg,${th.acc},#4285f4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:9}}>ES</div>
    <span style={{fontWeight:700,fontSize:15,color:th.text}}>Engosoft</span></div>
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <button onClick={()=>setMode(mode==="light"?"dark":"light")} style={{background:"none",border:`1px solid ${th.btn}`,borderRadius:16,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
        {mode==="light"?<svg width="14" height="14" viewBox="0 0 24 24" fill={th.sub}><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>:<svg width="14" height="14" viewBox="0 0 24 24" fill={th.sub}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>}</button>
      <button onClick={()=>setLang(lang==="ar"?"en":"ar")} style={{background:"none",border:`1px solid ${th.btn}`,borderRadius:16,padding:"4px 10px",fontSize:11,fontWeight:500,color:th.sub,cursor:"pointer",fontFamily:ff}}>{lang==="ar"?"EN":"عربي"}</button>
      <a href={CAL} target="_blank" rel="noopener noreferrer" style={{background:th.acc,color:th.accT,padding:"6px 14px",borderRadius:16,textDecoration:"none",fontSize:11,fontWeight:600,fontFamily:ff}}>{t.demo}</a></div></nav>
  {/* HERO */}
  <section style={{position:"relative",zIndex:1,overflow:"hidden",background:th.hero,transition:"background .4s"}}>
    <div style={{position:"relative",width:"100%",minHeight:"clamp(260px,45vh,440px)",overflow:"hidden"}}>
      <video autoPlay muted loop playsInline style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:mode==="light"?"brightness(.92)":"brightness(.6)"}}><source src="/assets/hero-video.mp4" type="video/mp4"/></video>
      <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"clamp(260px,45vh,440px)",padding:"clamp(20px,4vw,48px) clamp(14px,3vw,40px)",background:mode==="light"?"rgba(255,255,255,.72)":"rgba(14,14,14,.6)",textAlign:"center"}}>
        <div className={`ht ${hv?'v':''}`} style={{marginBottom:12}}><div style={{width:36,height:36,margin:"0 auto",borderRadius:8,background:`linear-gradient(135deg,${th.acc},#4285f4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:12}}>ES</div></div>
        <h1 className={`ht d1 ${hv?'v':''}`} style={{fontSize:"clamp(22px,4.5vw,44px)",fontWeight:400,lineHeight:1.3,color:th.text}}>{t.l1}</h1>
        <h1 className={`ht d2 ${hv?'v':''}`} style={{fontSize:"clamp(22px,4.5vw,44px)",fontWeight:500,lineHeight:1.3,marginBottom:"clamp(10px,2vw,18px)",color:th.acc}}>{t.brand}</h1>
        <p className={`ht d2 ${hv?'v':''}`} style={{fontSize:"clamp(12px,1.8vw,15px)",color:th.sub,maxWidth:480,margin:"0 auto clamp(14px,2.5vw,24px)",lineHeight:1.8}}>{t.sub}</p>
        <div className={`ht d3 ${hv?'v':''}`}>
          <a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,background:th.acc,color:th.accT,padding:"clamp(9px,1.5vw,13px) clamp(18px,3vw,28px)",borderRadius:28,textDecoration:"none",fontWeight:600,fontSize:"clamp(12px,1.8vw,14px)",fontFamily:ff,transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=th.accH;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.background=th.acc;e.currentTarget.style.transform="translateY(0)"}}>
            {t.cta}<svg width="14" height="14" viewBox="0 0 24 24" fill={th.accT}><path d={isRTL?"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z":"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"}/></svg></a></div></div></div></section>
  {/* SHOWCASE */}
  <section style={{position:"relative",zIndex:1,borderTop:`1px solid ${th.navB}`}}>
    <h2 style={{fontSize:"clamp(20px,3.5vw,26px)",fontWeight:400,textAlign:"center",padding:"clamp(28px,4vw,44px) 14px 0",color:th.text}}>{t.show}</h2>
    {SHOW[lang].map((item,i)=>(<div key={i} style={{background:i%2===0?"transparent":th.sec,transition:"background .4s"}}><ShowItem item={item} idx={i} th={th} isRTL={isRTL} ff={ff}/></div>))}</section>
  {/* CARDS */}
  <section style={{padding:"clamp(28px,4vw,44px) clamp(10px,2vw,20px) clamp(40px,5vw,64px)",position:"relative",zIndex:1,borderTop:`1px solid ${th.navB}`}}>
    <h2 style={{fontSize:"clamp(20px,3.5vw,26px)",fontWeight:400,textAlign:"center",marginBottom:"clamp(20px,3vw,32px)",color:th.text}}>{t.plans}</h2>
    <div style={{display:"flex",gap:"clamp(10px,2vw,16px)",justifyContent:"center",flexWrap:"wrap",maxWidth:1200,margin:"0 auto",alignItems:"flex-start"}}>{SVC[lang].map(s=><Card key={s.id} s={s} th={th} isRTL={isRTL} ff={ff}/>)}</div></section>
  {/* FAQ */}
  <section style={{padding:"clamp(28px,4vw,44px) clamp(10px,2vw,20px) clamp(36px,4vw,56px)",borderTop:`1px solid ${th.navB}`,position:"relative",zIndex:1}}>
    <div style={{maxWidth:640,margin:"0 auto"}}><h2 style={{fontSize:"clamp(20px,3.5vw,26px)",fontWeight:400,textAlign:"center",marginBottom:24,color:th.text}}>{t.faq}</h2>
    {FAQS[lang].map((f,i)=><FaqItem key={i} f={f} th={th} isRTL={isRTL} ff={ff}/>)}</div></section>
  {/* FOOT */}
  <footer style={{padding:"20px 14px",borderTop:`1px solid ${th.navB}`,textAlign:"center",position:"relative",zIndex:1}}>
    <p style={{fontSize:11,color:th.sub}}>{t.foot}</p><p style={{fontSize:10,color:th.btn,marginTop:3}}>© 2025 Engosoft</p></footer>
  {/* WA */}
  <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{position:"fixed",bottom:18,right:18,zIndex:999,width:46,height:46,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px rgba(37,211,102,.3)",textDecoration:"none"}}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
  </div>);}
