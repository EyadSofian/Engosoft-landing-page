import { useState, useEffect, useRef, useMemo } from "react";
const WA="201007725744",CAL="https://calendar.app.google/35V4etCwYoD5poM77",MAJED="https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/02/11/18/20260211184124-KE13UNZE.json";
const L={bg:"#f8f9fa",card:"#fff",cardB:"#e0e0e0",cardH:"#1a73e8",text:"#202124",sub:"#5f6368",acc:"#1a73e8",accL:"#e8f0fe",accH:"#1557b0",accT:"#fff",btn:"#dadce0",nav:"rgba(255,255,255,.92)",navB:"#e8eaed",faq:"rgba(0,0,0,.06)",dot:"26,115,232",hero:"#fff",sec:"#f0f2f5",shadow:"0 8px 32px rgba(0,0,0,.08)",modal:"rgba(0,0,0,.6)",modalBg:"#fff",nodeBg:"#e8f0fe",nodeB:"#1a73e8"};
const D={bg:"#0e0e0e",card:"#1e1e1e",cardB:"#303030",cardH:"#8ab4f8",text:"#e8eaed",sub:"#9aa0a6",acc:"#8ab4f8",accL:"rgba(138,180,248,.12)",accH:"#aecbfa",accT:"#1a1a1a",btn:"#3c4043",nav:"rgba(14,14,14,.92)",navB:"rgba(255,255,255,.06)",faq:"rgba(255,255,255,.08)",dot:"138,180,248",hero:"#0e0e0e",sec:"#161616",shadow:"0 8px 32px rgba(0,0,0,.3)",modal:"rgba(0,0,0,.8)",modalBg:"#1e1e1e",nodeBg:"rgba(138,180,248,.1)",nodeB:"#8ab4f8"};

/* Node flows for each workflow */
const FLOWS={seo:[{icon:"⏰",n:"Schedule Trigger"},{icon:"📄",n:"Read Courses"},{icon:"🔍",n:"Serper Search"},{icon:"🤖",n:"Topics Generator"},{icon:"📊",n:"SEO Analysis Agent"},{icon:"✍️",n:"Article Writer Agent"},{icon:"📋",n:"Format Output"},{icon:"💾",n:"Save to Sheets"}],
calls:[{icon:"📁",n:"Google Drive Monitor"},{icon:"⬇️",n:"Download WAV"},{icon:"🎙️",n:"Groq Whisper STT"},{icon:"🤖",n:"AI Correction Agent"},{icon:"🔗",n:"Match CRM Opportunity"},{icon:"📊",n:"AI Evaluation Agent"},{icon:"📧",n:"Send Email Report"},{icon:"💾",n:"Log to Sheets"}],
cv:[{icon:"✈️",n:"Telegram Trigger"},{icon:"📥",n:"Download CV"},{icon:"📄",n:"Extract Text"},{icon:"🤖",n:"AI Agent Analysis"},{icon:"📋",n:"Parse Response"},{icon:"💾",n:"Save to Sheets"},{icon:"✅",n:"Accept / Reject"},{icon:"📧",n:"Send Email"}]};

const SHOW={ar:[
  {img:"/assets/chatbot-majed.png",title:"وكيل ذكاء اصطناعي يتحدث بلهجتكم",desc:"ماجد — روبوت محادثة ذكي يردّ بالعربية والإنجليزية 24/7، يحجز المواعيد، ويؤهّل العملاء تلقائياً.",tag:"AI Customer Agent",phone:true,tryBot:true},
  {img:"/assets/workflow-seo.png",title:"أتمتة المحتوى والتسويق",desc:"نظام يبحث عن الكلمات المفتاحية ويكتب مقالات SEO عربية تلقائياً.",tag:"AI Workflow Automation",flow:"seo",metrics:[{v:"20+",l:"Node"},{v:"49",l:"Course"},{v:"GPT-4",l:"Model"}],tools:["n8n","Serper","GPT-4.1","Google Sheets"]},
  {img:"/assets/workflow-calls.png",title:"تقييم جودة المكالمات بالـ AI",desc:"يراقب التسجيلات، يحوّلها لنصوص عربية، يقيّمها على 50+ معيار.",tag:"AI Quality Monitor",flow:"calls",metrics:[{v:"32-40",l:"Node"},{v:"46+",l:"Criteria"},{v:"A-F",l:"Scoring"}],tools:["n8n","Groq Whisper","GPT-4o","Pinecone","Odoo"]},
  {img:"/assets/workflow-cv.png",title:"فحص السير الذاتية في ثوانٍ",desc:"يستقبل الـ CV عبر تيليجرام ويصنّف المرشحين تلقائياً.",tag:"AI Workflow Automation",flow:"cv",metrics:[{v:"22",l:"Node"},{v:"<30s",l:"Speed"},{v:"AI",l:"Scoring"}],tools:["n8n","Telegram","GPT-4o","Google Sheets"]},
],en:[
  {img:"/assets/chatbot-majed.png",title:"An AI Agent that speaks your language",desc:"Majed — responds 24/7 in Arabic & English, books appointments, qualifies leads.",tag:"AI Customer Agent",phone:true,tryBot:true},
  {img:"/assets/workflow-seo.png",title:"Fully automated content & SEO",desc:"Researches keywords, writes Arabic SEO articles automatically.",tag:"AI Workflow Automation",flow:"seo",metrics:[{v:"20+",l:"Nodes"},{v:"49",l:"Courses"},{v:"GPT-4",l:"Model"}],tools:["n8n","Serper","GPT-4.1","Sheets"]},
  {img:"/assets/workflow-calls.png",title:"AI call quality assessment",desc:"Monitors recordings, evaluates 50+ criteria, sends reports.",tag:"AI Quality Monitor",flow:"calls",metrics:[{v:"32-40",l:"Nodes"},{v:"46+",l:"Criteria"},{v:"A-F",l:"Scoring"}],tools:["n8n","Groq Whisper","GPT-4o","Pinecone","Odoo"]},
  {img:"/assets/workflow-cv.png",title:"CV screening in seconds",desc:"Receives CVs via Telegram, analyzes & ranks candidates automatically.",tag:"AI Workflow Automation",flow:"cv",metrics:[{v:"22",l:"Nodes"},{v:"<30s",l:"Speed"},{v:"AI",l:"Scoring"}],tools:["n8n","Telegram","GPT-4o","Sheets"]},
]};

const SVC={ar:[
  {id:"a",badge:"الأكثر طلباً",title:"AI Customer Agent",sub:"وكيل ذكاء اصطناعي",desc:"روبوت يردّ 24/7 بالعربية عبر واتساب والموقع.",cats:[{t:"خدمة عملاء 24/7"},{t:"تأهيل العملاء تلقائياً"},{t:"تحليلات وتقارير"}]},
  {id:"b",title:"AI Workflow Automation",sub:"أتمتة العمليات",desc:"نربط أنظمتكم ونؤتمت المهام اليدوية.",cats:[{t:"ربط الأنظمة والمزامنة"},{t:"إشعارات تلقائية"},{t:"أتمتة متقدمة"}]},
  {id:"c",title:"AI Quality Monitor",sub:"تقييم الجودة",desc:"يراقب المكالمات ويقيّمها بالـ AI.",cats:[{t:"تقييم جودة المكالمات"},{t:"تقارير فورية تلقائية"}]},
],en:[
  {id:"a",badge:"Most Popular",title:"AI Customer Agent",sub:"AI customer service",desc:"Chatbot responding 24/7 in Arabic & English.",cats:[{t:"24/7 Customer Support"},{t:"Auto Lead Qualification"},{t:"Analytics & Reports"}]},
  {id:"b",title:"AI Workflow Automation",sub:"Process automation",desc:"Connect systems, automate tasks.",cats:[{t:"System Integration"},{t:"Auto Notifications"},{t:"Advanced Automation"}]},
  {id:"c",title:"AI Quality Monitor",sub:"Quality analytics",desc:"Monitor calls, evaluate with AI.",cats:[{t:"Call Quality Assessment"},{t:"Instant Auto Reports"}]},
]};

const FAQS={ar:[{q:"كم يستغرق التنفيذ؟",a:"أسبوع لأسبوعين للبسيط، 3-5 أسابيع للمعقد. نتفق على جدول واضح."},{q:"هل يتكامل مع أنظمتنا الحالية؟",a:"نعم. نتكامل مع Odoo وShopify وSalla وZid وHubSpot وZoho وYeastar وPBX وأي نظام يدعم API."},{q:"هل يحتاج تثبيت على سيرفراتنا؟",a:"لا. كل شيء سحابي ومُدار بالكامل من طرفنا. لا تحتاجون لأي بنية تحتية."},{q:"هل يدعم اللغة العربية بلهجاتها؟",a:"نعم. فصحى ومصرية وسعودية وخليجية وإنجليزية — مع كشف تلقائي للغة."},{q:"ماذا لو حدثت مشكلة بعد التسليم؟",a:"دعم وصيانة شهرية مستمرة. أي مشكلة تُحَل في 4-24 ساعة حسب الأولوية."},{q:"هل يمكن ربط واتساب بشكل رسمي؟",a:"نعم. نستخدم WhatsApp Business API الرسمي عبر Meta — رقم موثّق واشتراك رسمي."}],
en:[{q:"Implementation time?",a:"1-2 weeks simple, 3-5 weeks complex. Clear timeline agreed upfront."},{q:"Does it integrate with our systems?",a:"Yes. Odoo, Shopify, Salla, Zid, HubSpot, Zoho, Yeastar PBX, and any API-enabled system."},{q:"Do we need to install anything?",a:"No. Everything is cloud-hosted and fully managed by us. Zero infrastructure needed."},{q:"Arabic dialect support?",a:"Yes. MSA, Egyptian, Saudi, Gulf dialects, and English — with auto language detection."},{q:"Post-delivery support?",a:"Continuous monthly maintenance. Issues resolved in 4-24 hours by priority."},{q:"Official WhatsApp integration?",a:"Yes. We use official WhatsApp Business API via Meta — verified number and official subscription."}]};

const TOOLS=[{n:"Botpress",src:"/assets/logos/botpress.png"},{n:"n8n",src:"/assets/logos/n8n.png"},{n:"Odoo",src:"/assets/logos/odoo.png"},{n:"Meta",src:"/assets/logos/meta.png"},{n:"OpenAI",src:"/assets/logos/openai.png"},{n:"Chatwoot",src:"/assets/logos/chatwoot.png"},{n:"Yeastar",src:"/assets/logos/yeastar.png"},{n:"Zapier",src:"/assets/logos/zapier.png"},{n:"Make",src:"/assets/logos/make.png"}];

const CLIENTS={ar:[
  {logo:"/assets/logos/elbakri.png",name:"El-Bakri Overseas",text:"فريق Engosoft ساعدنا في أتمتة طلبات الأسعار اليومية لأكثر من 250 فندقاً — وفّرنا أكثر من 90% من وقت الموظفين.",role:"إدارة العمليات"},
  {logo:"/assets/logos/terynova.png",name:"Terynova",text:"البوت الذكي على متجرنا في Shopify يردّ على العملاء فوراً ويتابع الطلبات تلقائياً — تجربة ممتازة.",role:"التجارة الإلكترونية"},
  {logo:"/assets/logos/xqpharma.png",name:"XQ Pharma",text:"نظام تسجيل المصروفات والإيرادات عبر واتساب سهّل علينا المتابعة المالية بشكل كبير.",role:"الإدارة المالية"},
],en:[
  {logo:"/assets/logos/elbakri.png",name:"El-Bakri Overseas",text:"Engosoft automated our daily rate requests to 250+ hotels — saving 90%+ of staff time.",role:"Operations"},
  {logo:"/assets/logos/terynova.png",name:"Terynova",text:"The smart bot on our Shopify store responds instantly and tracks orders automatically — excellent experience.",role:"E-Commerce"},
  {logo:"/assets/logos/xqpharma.png",name:"XQ Pharma",text:"The WhatsApp-based expense and revenue tracking system greatly simplified our financial monitoring.",role:"Finance"},
]};

function ToolsMarquee({th,isRTL}){
  return(<div style={{overflow:"hidden",padding:"16px 0",position:"relative",zIndex:1,borderTop:`1px solid ${th.navB}`,borderBottom:`1px solid ${th.navB}`}}>
    <div style={{display:"flex",animation:"marquee 35s linear infinite",width:"max-content",gap:"clamp(24px,4vw,40px)",alignItems:"center",paddingLeft:20,paddingRight:20}}>
      {[...TOOLS,...TOOLS,...TOOLS].map((t,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:6,flexShrink:0,opacity:.55}}>
          <img src={t.src} alt={t.n} style={{height:"clamp(20px,3vw,30px)",width:"auto",maxWidth:80,objectFit:"contain",filter:th===L?"grayscale(100%) opacity(.6)":"grayscale(100%) brightness(1.8) opacity(.5)"}} loading="lazy"/>
          <span style={{fontSize:"clamp(10px,1.4vw,12px)",fontWeight:600,color:th.sub,whiteSpace:"nowrap"}}>{t.n}</span>
        </div>
      ))}
    </div>
  </div>);
}

function ClientsSection({th,isRTL,ff,lang}){
  const clients=CLIENTS[lang];const[ref,vis]=useInView(.1);
  return(<div ref={ref} style={{padding:"clamp(28px,5vw,48px) clamp(12px,3vw,24px)",position:"relative",zIndex:1,borderTop:`1px solid ${th.navB}`}}>
    <h2 style={{fontSize:"clamp(18px,3.5vw,24px)",fontWeight:400,textAlign:"center",marginBottom:"clamp(20px,3vw,32px)",color:th.text}}>{lang==="ar"?"عملاؤنا يتحدثون":"Our Clients Speak"}</h2>
    <div style={{display:"flex",gap:"clamp(10px,2vw,16px)",justifyContent:"center",flexWrap:"wrap",maxWidth:1000,margin:"0 auto"}}>
      {clients.map((c,i)=>(<div key={i} style={{flex:"1 1 240px",maxWidth:320,minWidth:220,background:th.card,borderRadius:14,border:`1px solid ${th.cardB}`,padding:"24px 20px",transition:"all .5s",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)",transitionDelay:`${i*.15}s`}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <img src={c.logo} alt={c.name} style={{width:44,height:44,borderRadius:10,objectFit:"contain",background:th.sec||"#f5f5f5",padding:4}} loading="lazy"/>
          <div><div style={{fontSize:14,fontWeight:600,color:th.text}}>{c.name}</div><div style={{fontSize:11,color:th.sub}}>{c.role}</div></div>
        </div>
        <p style={{fontSize:13,color:th.sub,lineHeight:1.7,fontStyle:"italic"}}>{`"${c.text}"`}</p>
      </div>))}
    </div>
  </div>);
}

function useInView(t=.1){const r=useRef();const[v,setV]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect()},[t]);return[r,v];}

function Dots({mode}){const ref=useRef();const pts=useMemo(()=>Array.from({length:25},()=>({x:Math.random()*100,y:Math.random()*100,r:Math.random()*2+1,vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.1,o:Math.random()*.3+.15})),[]);
useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d");let raf;const rs=()=>{c.width=window.innerWidth;c.height=window.innerHeight};rs();window.addEventListener("resize",rs);const draw=()=>{ctx.clearRect(0,0,c.width,c.height);const col=mode==="dark"?"138,180,248":"26,115,232";pts.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>100)d.vx*=-1;if(d.y<0||d.y>100)d.vy*=-1;ctx.beginPath();ctx.arc(d.x/100*c.width,d.y/100*c.height,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(${col},${d.o*(mode==="dark"?.2:.12)})`;ctx.fill()});for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=(pts[i].x-pts[j].x)/100*c.width,dy=(pts[i].y-pts[j].y)/100*c.height,dist=Math.sqrt(dx*dx+dy*dy);if(dist<120){ctx.beginPath();ctx.moveTo(pts[i].x/100*c.width,pts[i].y/100*c.height);ctx.lineTo(pts[j].x/100*c.width,pts[j].y/100*c.height);ctx.strokeStyle=`rgba(${col},${(1-dist/120)*(mode==="dark"?.06:.03)})`;ctx.lineWidth=1;ctx.stroke()}}raf=requestAnimationFrame(draw)};draw();return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",rs)}},[mode,pts]);
return <canvas ref={ref} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}/>;}

/* ═══ WORKFLOW MODAL ═══ */
function WorkflowModal({flow,th,isRTL,ff,onClose,title,img,metrics,tools}){
  const nodes=FLOWS[flow]||[];const[active,setActive]=useState(-1);
  useEffect(()=>{document.body.style.overflow="hidden";let t;const animate=()=>{let i=0;t=setInterval(()=>{setActive(i);i++;if(i>nodes.length)clearInterval(t)},350)};setTimeout(animate,300);return()=>{clearInterval(t);document.body.style.overflow=""}},[nodes.length]);
  return(<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1000,background:th.modal,display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"fadeIn .3s ease"}}>
    <div onClick={e=>e.stopPropagation()} style={{background:th.modalBg,borderRadius:20,maxWidth:520,width:"100%",maxHeight:"90vh",overflow:"auto",position:"relative",animation:"slideUp .4s cubic-bezier(.16,1,.3,1)",boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
      {/* Close */}
      <button onClick={onClose} style={{position:"absolute",top:12,right:isRTL?undefined:12,left:isRTL?12:undefined,width:32,height:32,borderRadius:"50%",border:`1px solid ${th.cardB}`,background:th.card,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:2}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill={th.sub}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
      {/* Header image */}
      <div style={{borderRadius:"20px 20px 0 0",overflow:"hidden",borderBottom:`1px solid ${th.cardB}`}}>
        <img src={img} alt="" style={{width:"100%",display:"block",maxHeight:200,objectFit:"cover"}} /></div>
      <div style={{padding:"20px 24px 24px"}}>
        <span style={{display:"inline-block",background:th.accL,color:th.acc,padding:"3px 12px",borderRadius:16,fontSize:11,fontWeight:600,marginBottom:10}}>{isRTL?"سير العمل":"WORKFLOW"}</span>
        <h3 style={{fontSize:20,fontWeight:600,color:th.text,marginBottom:16}}>{title}</h3>
        {/* Animated Nodes */}
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:6,marginBottom:20}}>
          {nodes.map((node,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:12,background:i<=active?th.nodeBg:"transparent",border:`1.5px solid ${i<=active?th.nodeB:th.cardB}`,opacity:i<=active?1:.3,transform:i<=active?"scale(1)":"scale(.9)",transition:"all .4s cubic-bezier(.16,1,.3,1)"}}>
              <span style={{fontSize:16}}>{node.icon}</span>
              <span style={{fontSize:11,fontWeight:600,color:th.text,whiteSpace:"nowrap"}}>{node.n}</span>
            </div>
            {i<nodes.length-1&&<svg width="16" height="16" viewBox="0 0 24 24" fill={i<active?th.acc:th.cardB} style={{flexShrink:0,transition:"fill .4s",transform:isRTL?"rotate(180deg)":"none"}}><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>}
          </div>))}
        </div>
        {/* Metrics */}
        {metrics&&<div style={{display:"flex",gap:12,marginBottom:16}}>
          {metrics.map((m,i)=>(<div key={i} style={{flex:1,padding:"12px 8px",borderRadius:12,border:`1px solid ${th.cardB}`,textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:700,color:th.acc}}>{m.v}</div>
            <div style={{fontSize:10,color:th.sub,marginTop:2}}>{m.l}</div></div>))}</div>}
        {/* Tools */}
        {tools&&<div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {tools.map((t,i)=>(<span key={i} style={{padding:"4px 10px",borderRadius:8,background:th.sec||th.accL,fontSize:10,fontWeight:500,color:th.sub}}>{t}</span>))}</div>}
      </div>
    </div>
  </div>);}

function ShowItem({item,idx,th,isRTL,ff}){const[ref,vis]=useInView();const[modal,setModal]=useState(false);const rev=idx%2!==0;
return(<><div ref={ref} style={{padding:"clamp(24px,5vw,56px) clamp(14px,4vw,40px)",maxWidth:1060,margin:"0 auto",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(36px)",transition:"all .7s cubic-bezier(.16,1,.3,1)"}}>
  <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"clamp(16px,3vw,36px)",justifyContent:"center",flexDirection:rev?"row-reverse":"row"}}>
    <div style={{flex:"1 1 240px",maxWidth:item.phone?220:480,width:"100%",opacity:vis?1:0,transform:vis?"translateX(0)":`translateX(${(isRTL?!rev:rev)?30:-30}px)`,transition:"all .7s .15s cubic-bezier(.16,1,.3,1)",cursor:item.flow?"pointer":"default"}} onClick={()=>item.flow&&setModal(true)}>
      {item.phone?(
        <div style={{width:"min(200px,55vw)",margin:"0 auto",background:th.card,borderRadius:22,border:`2px solid ${th.cardB}`,padding:"8px 6px 12px",boxShadow:th.shadow}}>
          <div style={{borderRadius:16,overflow:"hidden"}}><img src={item.img} alt="" style={{width:"100%",display:"block"}} loading="lazy"/></div></div>
      ):(
        <div style={{background:th.card,borderRadius:10,border:`1px solid ${th.cardB}`,overflow:"hidden",boxShadow:th.shadow,position:"relative"}}>
          <div style={{height:22,background:th.sec,display:"flex",alignItems:"center",gap:4,padding:"0 8px"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#ff5f57"}}/>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#ffbd2e"}}/>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#28c840"}}/></div>
          <img src={item.img} alt="" style={{width:"100%",display:"block"}} loading="lazy"/>
          {item.flow&&<div style={{position:"absolute",inset:0,top:22,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.25)",opacity:0,transition:"opacity .3s",borderRadius:"0 0 10px 10px"}} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}>
            <div style={{background:th.acc,color:th.accT,padding:"10px 24px",borderRadius:24,fontWeight:600,fontSize:13,fontFamily:ff,display:"flex",alignItems:"center",gap:6}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={th.accT}><path d="M8 5v14l11-7z"/></svg>
              {isRTL?"شاهد سير العمل":"View Workflow"}</div></div>}
        </div>
      )}
    </div>
    <div style={{flex:"1 1 240px",maxWidth:440,width:"100%",opacity:vis?1:0,transform:vis?"translateX(0)":`translateX(${(isRTL?!rev:rev)?-30:30}px)`,transition:"all .7s .25s cubic-bezier(.16,1,.3,1)"}}>
      <span style={{display:"inline-block",background:th.accL,color:th.acc,padding:"4px 12px",borderRadius:16,fontSize:11,fontWeight:600,marginBottom:12,fontFamily:ff}}>{item.tag}</span>
      <h3 style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:600,color:th.text,marginBottom:8,lineHeight:1.4}}>{item.title}</h3>
      <p style={{fontSize:"clamp(13px,1.8vw,14px)",color:th.sub,lineHeight:1.8,marginBottom:16}}>{item.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        <a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,background:th.acc,color:th.accT,padding:"10px 20px",borderRadius:24,textDecoration:"none",fontWeight:600,fontSize:13,fontFamily:ff,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background=th.accH} onMouseLeave={e=>e.currentTarget.style.background=th.acc}>
          {isRTL?"احجز استشارة":"Consult"}</a>
        {item.tryBot&&<a href={MAJED} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,background:"transparent",color:th.acc,padding:"10px 20px",borderRadius:24,textDecoration:"none",border:`1.5px solid ${th.acc}`,fontWeight:600,fontSize:13,fontFamily:ff,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background=th.accL} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          {isRTL?"جرّب ماجد":"Try Majed"} <svg width="14" height="14" viewBox="0 0 24 24" fill={th.acc}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></a>}
        {item.flow&&<button onClick={()=>setModal(true)} style={{display:"inline-flex",alignItems:"center",gap:6,background:"transparent",color:th.acc,padding:"10px 20px",borderRadius:24,border:`1.5px solid ${th.acc}`,fontWeight:600,fontSize:13,fontFamily:ff,cursor:"pointer",transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background=th.accL} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          {isRTL?"سير العمل":"Workflow"} <svg width="14" height="14" viewBox="0 0 24 24" fill={th.acc}><path d="M8 5v14l11-7z"/></svg></button>}
      </div>
    </div>
  </div>
</div>
{modal&&<WorkflowModal flow={item.flow} th={th} isRTL={isRTL} ff={ff} onClose={()=>setModal(false)} title={item.title} img={item.img} metrics={item.metrics} tools={item.tools}/>}
</>);}

function FaqItem({f,th,isRTL,ff}){const[o,setO]=useState(false);return(<div style={{borderBottom:`1px solid ${th.faq}`}}><button onClick={()=>setO(!o)} style={{width:"100%",padding:"14px 0",border:"none",background:"none",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:ff,textAlign:isRTL?"right":"left"}}><span style={{fontSize:14,fontWeight:500,color:th.text}}>{f.q}</span><svg width="16" height="16" viewBox="0 0 24 24" fill={th.acc} style={{transform:o?"rotate(180deg)":"",transition:"transform .3s",flexShrink:0,margin:isRTL?"0 12px 0 0":"0 0 0 12px"}}><path d="M7 10l5 5 5-5z"/></svg></button><div style={{maxHeight:o?200:0,overflow:"hidden",transition:"max-height .4s"}}><div style={{paddingBottom:14,fontSize:13,color:th.sub,lineHeight:1.8}}>{f.a}</div></div></div>);}

function Card({s,th,isRTL,ff}){const[ref,vis]=useInView(.05);return(
<div ref={ref} style={{background:th.card,borderRadius:14,border:`1px solid ${th.cardB}`,overflow:"hidden",flex:"1 1 250px",maxWidth:360,minWidth:240,transition:"all .5s",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)"}}
onMouseEnter={e=>{e.currentTarget.style.borderColor=th.cardH;e.currentTarget.style.boxShadow=th.shadow;e.currentTarget.style.transform="translateY(-3px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=th.cardB;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)"}}>
{s.badge&&<div style={{position:"absolute",top:12,[isRTL?"left":"right"]:12,background:th.accL,color:th.acc,padding:"3px 10px",borderRadius:16,fontSize:10,fontWeight:600,fontFamily:ff}}>{s.badge}</div>}
<div style={{padding:"24px 18px 16px"}}><h3 style={{fontSize:17,fontWeight:600,color:th.text,marginBottom:2}}>{s.title}</h3><p style={{fontSize:12,color:th.acc,fontWeight:500,marginBottom:10}}>{s.sub}</p><p style={{fontSize:12,color:th.sub,lineHeight:1.7,marginBottom:16}}>{s.desc}</p>
<a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"11px",borderRadius:24,background:th.acc,color:th.accT,textDecoration:"none",fontWeight:600,fontSize:13,fontFamily:ff,marginBottom:6}}>{isRTL?"احجز استشارة مجانية":"Book Free Consultation"}</a>
<a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"9px",borderRadius:24,background:"transparent",color:th.acc,textDecoration:"none",border:`1px solid ${th.btn}`,fontWeight:600,fontSize:12,fontFamily:ff}}>{isRTL?"واتساب":"WhatsApp"}</a></div>
<div style={{borderTop:`1px solid ${th.cardB}`,padding:"12px 18px 8px"}}>{s.cats.map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><svg width="14" height="14" viewBox="0 0 24 24" fill={th.acc}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span style={{fontSize:12,fontWeight:500,color:th.text}}>{c.t}</span></div>))}</div></div>);}

export default function App(){
  const[lang,setLang]=useState("ar");const[mode,setMode]=useState("light");const[hv,setHv]=useState(false);
  const isRTL=lang==="ar",ff=isRTL?"'Tajawal',sans-serif":"'Segoe UI',system-ui,sans-serif",th=mode==="dark"?D:L;
  useEffect(()=>{setTimeout(()=>setHv(true),150)},[]);
  useEffect(()=>{const s=document.createElement("style");s.textContent=`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{overflow-x:hidden}::selection{background:rgba(26,115,232,.2)}.ht{opacity:0;transform:translateY(20px);transition:all .7s cubic-bezier(.16,1,.3,1)}.ht.v{opacity:1;transform:translateY(0)}.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.35s}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-33.33%)}}`;document.head.appendChild(s);return()=>document.head.removeChild(s)},[]);
  useEffect(()=>{document.body.style.background=th.bg},[th.bg]);
  const t=isRTL?{l1:"ارتقِ بأعمالك مع",brand:"Engosoft AI",sub:"ثلاث خدمات ذكية تعمل على مدار الساعة — لتوفير الوقت وزيادة المبيعات وتحسين تجربة عملائكم",cta:"احجز استشارة مجانية",faq:"الأسئلة الشائعة",foot:"حلول تقنية متكاملة — من الفكرة إلى التنفيذ",demo:"استشارة",show:"ماذا نبني لعملائنا",plans:"اختر الخدمة المناسبة"}:{l1:"Power your business with",brand:"Engosoft AI",sub:"Three AI services working 24/7 — save time, increase sales, improve experience",cta:"Book Free Consultation",faq:"FAQ",foot:"Full-Service AI Solutions",demo:"Consult",show:"What we build",plans:"Choose your service"};

  return(<div dir={isRTL?"rtl":"ltr"} style={{fontFamily:ff,color:th.text,minHeight:"100vh",background:th.bg,transition:"background .4s,color .4s",overflowX:"hidden",width:"100%"}}>
  <Dots mode={mode}/>
  <nav style={{position:"sticky",top:0,zIndex:100,background:th.nav,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",borderBottom:`1px solid ${th.navB}`,padding:"0 clamp(8px,2vw,28px)",height:48,display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background .4s"}}>
    <div style={{display:"flex",alignItems:"center",gap:5,minWidth:0}}>
      <div style={{width:24,height:24,borderRadius:5,background:`linear-gradient(135deg,${th.acc},#4285f4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:8,flexShrink:0}}>ES</div>
      <span style={{fontWeight:700,fontSize:13,color:th.text,whiteSpace:"nowrap"}}>Engosoft</span></div>
    <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
      <button onClick={()=>setMode(mode==="light"?"dark":"light")} style={{background:"none",border:`1px solid ${th.btn}`,borderRadius:12,width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>{mode==="light"?<svg width="12" height="12" viewBox="0 0 24 24" fill={th.sub}><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>:<svg width="12" height="12" viewBox="0 0 24 24" fill={th.sub}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>}</button>
      <button onClick={()=>setLang(lang==="ar"?"en":"ar")} style={{background:"none",border:`1px solid ${th.btn}`,borderRadius:12,padding:"3px 8px",fontSize:10,color:th.sub,cursor:"pointer",fontFamily:ff,flexShrink:0}}>{lang==="ar"?"EN":"ع"}</button>
      <a href={CAL} target="_blank" rel="noopener noreferrer" style={{background:th.acc,color:th.accT,padding:"4px 12px",borderRadius:12,textDecoration:"none",fontSize:10,fontWeight:600,fontFamily:ff,whiteSpace:"nowrap",flexShrink:0}}>{t.demo}</a></div></nav>

  <section style={{position:"relative",zIndex:1,overflow:"hidden",background:th.hero}}>
    <div style={{position:"relative",width:"100%",minHeight:"clamp(240px,42vh,400px)",overflow:"hidden"}}>
      <video autoPlay muted loop playsInline style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:mode==="light"?"brightness(.92)":"brightness(.55)"}}><source src="/assets/hero-video.mp4" type="video/mp4"/></video>
      <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"clamp(240px,42vh,400px)",padding:"clamp(16px,4vw,40px) clamp(12px,3vw,32px)",background:mode==="light"?"rgba(255,255,255,.72)":"rgba(14,14,14,.6)",textAlign:"center"}}>
        <div className={`ht ${hv?'v':''}`} style={{marginBottom:10}}><div style={{width:32,height:32,margin:"0 auto",borderRadius:7,background:`linear-gradient(135deg,${th.acc},#4285f4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:10}}>ES</div></div>
        <h1 className={`ht d1 ${hv?'v':''}`} style={{fontSize:"clamp(20px,4.5vw,42px)",fontWeight:400,lineHeight:1.3,color:th.text}}>{t.l1}</h1>
        <h1 className={`ht d2 ${hv?'v':''}`} style={{fontSize:"clamp(20px,4.5vw,42px)",fontWeight:500,lineHeight:1.3,marginBottom:"clamp(8px,2vw,16px)",color:th.acc}}>{t.brand}</h1>
        <p className={`ht d2 ${hv?'v':''}`} style={{fontSize:"clamp(12px,1.6vw,14px)",color:th.sub,maxWidth:460,margin:"0 auto clamp(12px,2vw,20px)",lineHeight:1.8}}>{t.sub}</p>
        <div className={`ht d3 ${hv?'v':''}`}><a href={CAL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,background:th.acc,color:th.accT,padding:"clamp(8px,1.5vw,12px) clamp(16px,3vw,24px)",borderRadius:24,textDecoration:"none",fontWeight:600,fontSize:"clamp(11px,1.6vw,14px)",fontFamily:ff}}>{t.cta}<svg width="14" height="14" viewBox="0 0 24 24" fill={th.accT}><path d={isRTL?"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z":"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"}/></svg></a></div></div></div></section>

  {/* TOOLS MARQUEE */}
  <ToolsMarquee th={th} isRTL={isRTL}/>

  <section style={{position:"relative",zIndex:1,borderTop:`1px solid ${th.navB}`}}>
    <h2 style={{fontSize:"clamp(18px,3.5vw,24px)",fontWeight:400,textAlign:"center",padding:"clamp(24px,4vw,40px) 12px 0",color:th.text}}>{t.show}</h2>
    {SHOW[lang].map((item,i)=>(<div key={i} style={{background:i%2===0?"transparent":th.sec,transition:"background .4s"}}><ShowItem item={item} idx={i} th={th} isRTL={isRTL} ff={ff}/></div>))}</section>

  <section style={{padding:"clamp(24px,4vw,40px) clamp(10px,2vw,18px) clamp(36px,5vw,56px)",position:"relative",zIndex:1,borderTop:`1px solid ${th.navB}`}}>
    <h2 style={{fontSize:"clamp(18px,3.5vw,24px)",fontWeight:400,textAlign:"center",marginBottom:"clamp(18px,3vw,28px)",color:th.text}}>{t.plans}</h2>
    <div style={{display:"flex",gap:"clamp(8px,1.5vw,14px)",justifyContent:"center",flexWrap:"wrap",maxWidth:1140,margin:"0 auto"}}>{SVC[lang].map(s=><Card key={s.id} s={s} th={th} isRTL={isRTL} ff={ff}/>)}</div></section>

  {/* CLIENTS */}
  <ClientsSection th={th} isRTL={isRTL} ff={ff} lang={lang}/>

  <section style={{padding:"clamp(24px,4vw,40px) clamp(10px,2vw,18px) clamp(32px,4vw,48px)",borderTop:`1px solid ${th.navB}`,position:"relative",zIndex:1}}>
    <div style={{maxWidth:600,margin:"0 auto"}}><h2 style={{fontSize:"clamp(18px,3.5vw,24px)",fontWeight:400,textAlign:"center",marginBottom:20,color:th.text}}>{t.faq}</h2>{FAQS[lang].map((f,i)=><FaqItem key={i} f={f} th={th} isRTL={isRTL} ff={ff}/>)}</div></section>

  <footer style={{padding:"18px 12px",borderTop:`1px solid ${th.navB}`,textAlign:"center",position:"relative",zIndex:1}}><p style={{fontSize:11,color:th.sub}}>{t.foot}</p></footer>

  <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{position:"fixed",bottom:16,right:16,zIndex:999,width:44,height:44,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(37,211,102,.3)",textDecoration:"none"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
  </div>);}
