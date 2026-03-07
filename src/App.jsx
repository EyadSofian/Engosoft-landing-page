import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "201007725744";
const WEB3FORMS_KEY = "37492e85-55bb-4594-8018-2647115be762";
const GOOGLE_MEET_LINK = "https://calendar.app.google/YOUR_LINK"; // Replace with your actual Google Calendar Appointments link

const workflowDetails = {
  ar: [
    {
      id: "call-quality", tag: "مراكز الاتصال", color: "#0A2463",
      title: "نظام تقييم جودة المكالمات بالذكاء الاصطناعي",
      hero: "حوّل مكالماتك إلى بيانات قابلة للتحليل — أوتوماتيكياً",
      overview: "نظام أوتوماتيكي متكامل يراقب تسجيلات المكالمات من السنترال، يحوّلها لنصوص عربية عالية الدقة، يصحّحها بذكاء اصطناعي متخصص، ثم يقيّمها على أكثر من 50 معيار في 6 فئات مختلفة مع تقارير تفصيلية وإيميلات تلقائية للمسؤولين.",
      problem: "الشركات تقضي ساعات طويلة في الاستماع للمكالمات يدوياً لتقييم أداء الموظفين. هذا يستهلك وقت المديرين ويؤدي لتقييمات غير موضوعية وغير متسقة، مما يصعّب تحسين جودة خدمة العملاء.",
      solution: "نظامنا يستمع لكل مكالمة أوتوماتيكياً، يحوّلها لنص، ويقيّمها بذكاء اصطناعي بنفس المعايير في كل مرة — بدقة وسرعة ودون تدخل بشري. المديرين يستلموا تقارير جاهزة بدل ما يسمعوا ساعات.",
      features: ["مراقبة تلقائية لتسجيلات المكالمات من السنترال", "تحويل المكالمات العربية لنصوص مكتوبة بدقة عالية", "تصحيح ذكي للنصوص مع قاموس مخصص لمصطلحاتك", "ربط تلقائي مع نظام إدارة العملاء (CRM)", "تقييم شامل على +50 معيار في 6 فئات مختلفة", "نظام حماية ذكي يمنع العقوبات الخاطئة", "تقارير تفصيلية ترسل بالإيميل تلقائياً", "لوحة متابعة مع تاريخ كامل لكل تقييم"],
      results: ["توفير +80% من وقت المراجعة اليدوية", "تقييم 100% من المكالمات بدلاً من عينة صغيرة", "معايير موحدة وعادلة لكل الموظفين", "تقارير فورية بدون انتظار"],
      stats: [{ num: "50+", label: "معيار تقييم" }, { num: "6", label: "فئات تقييم" }, { num: "100%", label: "تغطية المكالمات" }, { num: "< 5 دقائق", label: "وقت التقييم" }],
    },
    {
      id: "hotel-rates", tag: "السياحة", color: "#1E5AA8",
      title: "نظام أتمتة أسعار الفنادق",
      hero: "أسعار 250+ فندق في 14 منطقة — بأمر واحد",
      overview: "منظومة متكاملة تدير عملية طلب أسعار الفنادق بالكامل — من إرسال الطلبات التلقائية لمئات الفنادق، تحليل الردود بالذكاء الاصطناعي، التحكم عبر تيليجرام، متابعات تلقائية، وداشبورد ويب تفاعلي لعرض كل الأسعار.",
      problem: "شركات السياحة تتعامل مع مئات الفنادق يومياً. إرسال طلبات الأسعار ومتابعة الردود يدوياً يستهلك ساعات من وقت الموظفين ويؤدي لفقدان فرص بسبب التأخير.",
      solution: "نظام واحد يدير كل شيء — يرسل الطلبات أوتوماتيكياً، يقرأ الردود ويستخرج الأسعار تلقائياً، يتابع الفنادق اللي ما ردتش، ويعرض كل البيانات في لوحة تحكم سهلة.",
      features: ["قاعدة بيانات شاملة لمئات الفنادق في عدة مناطق", "إرسال إيميلات طلب أسعار مخصصة تلقائياً", "قراءة وتحليل ردود الفنادق بالذكاء الاصطناعي", "التحكم الكامل عبر أوامر تيليجرام", "متابعات تلقائية للفنادق غير المستجيبة", "لوحة تحكم ويب تفاعلية للبحث والمقارنة", "تقارير يومية وأسبوعية تلقائية", "أرشيف كامل لكل الأسعار والتواريخ"],
      results: ["توفير 90% من وقت الموظفين", "تغطية كاملة لكل الفنادق بدون نسيان", "ردود أسرع = حجوزات أكتر", "قرارات تسعير مبنية على بيانات حقيقية"],
      stats: [{ num: "250+", label: "فندق" }, { num: "14", label: "منطقة" }, { num: "90%", label: "توفير وقت" }, { num: "0", label: "فنادق منسية" }],
    },
    {
      id: "shopify-odoo", tag: "التجارة الإلكترونية", color: "#714B67",
      title: "ربط المتجر الإلكتروني مع نظام ERP",
      hero: "مزامنة تلقائية — كل طلب من المتجر يوصل لنظامك فوراً",
      overview: "نظام ربط ذكي بين المتجر الإلكتروني ونظام إدارة الأعمال (ERP) — كل طلب جديد ينشئ أوتوماتيكياً عميل وأمر بيع ومنتجات مع معالجة ذكية للتكرارات والأخطاء بدون أي تدخل يدوي.",
      problem: "إدخال الطلبات يدوياً من المتجر لنظام الإدارة يضيع وقت كبير، يسبب أخطاء في البيانات، ويأخر تحديث المخزون مما يؤثر على تجربة العميل.",
      solution: "بمجرد ما العميل يطلب من المتجر، النظام يعمل كل حاجة لوحده — يشوف لو العميل موجود، يعمل أمر البيع، يضيف المنتجات، ويتعامل مع أي أخطاء بذكاء بدون ما تحتاج تتدخل.",
      features: ["مزامنة فورية لكل طلب جديد", "إنشاء تلقائي للعملاء مع فحص التكرارات", "إنشاء أوامر بيع كاملة التفاصيل", "معالجة ذكية للأخطاء وإعادة المحاولة تلقائياً", "مزامنة حالة الطلبات بين النظامين", "تنبيهات فورية عند حدوث أي مشكلة", "دعم العملات والأسعار المتعددة", "سجل كامل وشفاف لكل عملية مزامنة"],
      results: ["صفر إدخال يدوي = صفر أخطاء بشرية", "مخزون محدّث لحظة بلحظة", "توفير ساعات يومياً من وقت الموظفين", "تجربة عميل أسرع وأفضل"],
      stats: [{ num: "0", label: "إدخال يدوي" }, { num: "< 5 ث", label: "وقت المزامنة" }, { num: "100%", label: "دقة البيانات" }, { num: "24/7", label: "يعمل بدون توقف" }],
    },
    {
      id: "cv-screening", tag: "الموارد البشرية", color: "#3B82F6",
      title: "نظام فحص وتصنيف السير الذاتية",
      hero: "فلتر المرشحين بالذكاء الاصطناعي — وفّر أيام من المراجعة",
      overview: "نظام ذكي يستقبل السير الذاتية، يستخرج البيانات المهمة بالذكاء الاصطناعي، يقيّم كل مرشح حسب متطلبات الوظيفة المحددة، ويرتّبهم من الأفضل للأقل مع تقارير واضحة وإشعارات فورية.",
      problem: "مراجعة مئات السير الذاتية يدوياً يستهلك أيام من وقت فريق الموارد البشرية. الكثير من المرشحين غير مناسبين والوقت يضيع في فحصهم واحد واحد.",
      solution: "أرسل السيرة الذاتية والنظام يعمل الباقي — يقرأ، يحلل، يقيّم، ويرتّب المرشحين أوتوماتيكياً حسب المعايير اللي أنت حاططها. تقدر تركّز وقتك على المقابلات بدل القراءة.",
      features: ["استقبال السير الذاتية بصيغ متعددة", "استخراج ذكي للبيانات (اسم، خبرة، مهارات، تعليم)", "تقييم تلقائي حسب متطلبات كل وظيفة", "ترتيب المرشحين بنظام نقاط عادل وشفاف", "تخزين وأرشفة تلقائية لكل السير الذاتية", "تقارير ملخصة بأفضل المرشحين", "دعم كامل للعربية والإنجليزية", "إشعارات فورية لما يجي مرشح مميز"],
      results: ["توفير 95% من وقت المراجعة", "فحص كل CV في أقل من 30 ثانية", "معايير تقييم موحدة وعادلة", "ما يفوتك مرشح مميز أبداً"],
      stats: [{ num: "95%", label: "توفير وقت" }, { num: "< 30 ث", label: "لكل سيرة ذاتية" }, { num: "بدون حدود", label: "عدد السير" }, { num: "AR/EN", label: "ثنائي اللغة" }],
    },
    {
      id: "ai-bot", tag: "خدمة العملاء", color: "#0A6332",
      title: "AI Bot — وكيل ذكاء اصطناعي لخدمة العملاء",
      hero: "بوت محادثة ذكي يخدم عملاءك 24/7 بالعربي والإنجليزي",
      overview: "شات بوت متقدم يعمل بأحدث تقنيات الذكاء الاصطناعي، يتحدث العربية والإنجليزية بطلاقة، مع قاعدة معرفة شاملة عن منتجاتك وخدماتك وإمكانية تحويل المحادثة لموظف بشري تلقائياً لما يحتاج العميل مساعدة متخصصة.",
      problem: "العملاء بيسألوا نفس الأسئلة مرات كتير، الموظفين مش متاحين 24 ساعة، والردود بتتأخر خصوصاً بالليل وأيام الإجازات — وكل رد متأخر ممكن يكون عميل ضايع.",
      solution: "بوت ذكي بيرد على العملاء فوراً في أي وقت، بيفهم السياق والنية، بيجاوب من قاعدة معرفة محدّثة عن شركتك، ولو المسألة محتاجة تدخل بشري بيحوّل المحادثة لموظف مع كل السياق محفوظ.",
      features: ["دعم كامل للعربية والإنجليزية مع كشف تلقائي للغة", "قاعدة معرفة ذكية قابلة للتحديث عن منتجاتك وخدماتك", "يعمل على واتساب وتيليجرام وموقعك في نفس الوقت", "تحويل ذكي للموظف البشري مع حفظ كل سياق المحادثة", "تحليلات وتقارير مفصلة عن أسئلة العملاء وأداء البوت", "تخصيص كامل لشخصية البوت حسب هوية شركتك", "يتعلم ويتحسن مع الوقت", "تكلفة تشغيل أقل بكتير من موظف إضافي"],
      results: ["خدمة عملاء 24/7 بدون إضافة موظفين", "رد فوري في أقل من ثانيتين", "أكثر من 90% من الأسئلة بتتحل تلقائياً", "رضا عملاء أعلى = مبيعات أكتر"],
      stats: [{ num: "24/7", label: "متاح دائماً" }, { num: "< 2 ث", label: "وقت الرد" }, { num: "AR/EN", label: "متعدد اللغات" }, { num: "90%+", label: "حل تلقائي" }],
    },
  ],
  en: [
    {
      id: "call-quality", tag: "Call Centers", color: "#0A2463",
      title: "AI-Powered Call Quality Auditing System",
      hero: "Turn your calls into actionable data — automatically",
      overview: "A fully automated system that monitors call recordings from your PBX, transcribes them into high-accuracy Arabic text, AI-corrects the transcripts, then evaluates against 50+ criteria across 6 categories with detailed reports and automatic emails to managers.",
      problem: "Companies spend hours manually listening to calls to evaluate employee performance. This consumes manager time and leads to inconsistent, subjective evaluations that make it hard to improve service quality.",
      solution: "Our system listens to every call automatically, converts it to text, and evaluates it with AI using the same criteria every time — with precision, speed, and zero human intervention. Managers receive ready-made reports instead of spending hours listening.",
      features: ["Automatic monitoring of call recordings from PBX", "High-accuracy Arabic speech-to-text conversion", "Smart transcript correction with custom terminology dictionary", "Automatic matching with your CRM system", "Comprehensive evaluation on 50+ criteria across 6 categories", "Smart safety layer preventing false penalties", "Detailed reports sent automatically via email", "Full history dashboard for every evaluation"],
      results: ["Save 80%+ of manual review time", "Evaluate 100% of calls instead of small samples", "Unified, fair standards for all employees", "Instant reports with no waiting"],
      stats: [{ num: "50+", label: "Criteria" }, { num: "6", label: "Categories" }, { num: "100%", label: "Call Coverage" }, { num: "< 5 min", label: "Per Evaluation" }],
    },
    {
      id: "hotel-rates", tag: "Tourism", color: "#1E5AA8",
      title: "Hotel Rate Automation System",
      hero: "Rates from 250+ hotels in 14 regions — with one command",
      overview: "An integrated system managing the entire hotel rate request process — from sending automated requests to hundreds of hotels, AI-parsing replies, Telegram bot control, auto follow-ups, and an interactive web dashboard for price comparison.",
      problem: "Tourism companies deal with hundreds of hotels daily. Manually sending rate requests and tracking replies wastes hours of employee time and leads to missed opportunities.",
      solution: "One system manages everything — sends requests automatically, reads and extracts prices from replies, follows up with non-responsive hotels, and displays all data in an easy-to-use dashboard.",
      features: ["Comprehensive database of hundreds of hotels across multiple regions", "Automated custom rate request emails", "AI-powered reading and analysis of hotel replies", "Full control via Telegram commands", "Automatic follow-ups for non-responsive hotels", "Interactive web dashboard for search and comparison", "Daily and weekly automated reports", "Complete archive of all rates and dates"],
      results: ["Save 90% of employee time", "Full coverage — no hotel forgotten", "Faster responses = more bookings", "Pricing decisions based on real data"],
      stats: [{ num: "250+", label: "Hotels" }, { num: "14", label: "Regions" }, { num: "90%", label: "Time Saved" }, { num: "0", label: "Hotels Missed" }],
    },
    {
      id: "shopify-odoo", tag: "E-Commerce", color: "#714B67",
      title: "Online Store to ERP Integration",
      hero: "Automatic sync — every store order reaches your system instantly",
      overview: "A smart integration system between your online store and ERP — every new order automatically creates a customer, sales order, and products with smart duplicate and error handling, zero manual intervention needed.",
      problem: "Manually entering online orders into ERP wastes significant time, causes data errors, and delays inventory updates affecting customer experience.",
      solution: "Once a customer places an order, the system does everything — checks if the customer exists, creates the sales order, adds products, and handles any errors intelligently without any human intervention.",
      features: ["Instant sync for every new order", "Automatic customer creation with duplicate check", "Complete sales order creation with full details", "Smart error handling and automatic retry", "Order status sync between both systems", "Instant alerts on any issues", "Multi-currency and pricing support", "Complete transparent log for every sync operation"],
      results: ["Zero manual entry = zero human errors", "Inventory updated in real-time", "Save hours of employee time daily", "Faster, better customer experience"],
      stats: [{ num: "0", label: "Manual Entry" }, { num: "< 5s", label: "Sync Time" }, { num: "100%", label: "Data Accuracy" }, { num: "24/7", label: "Always Running" }],
    },
    {
      id: "cv-screening", tag: "Human Resources", color: "#3B82F6",
      title: "CV Screening & Ranking System",
      hero: "AI-powered candidate filtering — save days of review time",
      overview: "A smart system that receives CVs, extracts key data using AI, evaluates each candidate against specified job requirements, and ranks them from best to least suitable with clear reports and instant notifications.",
      problem: "Reviewing hundreds of CVs manually takes days of HR time. Many candidates are unsuitable and time is wasted screening them one by one.",
      solution: "Send the CV and the system does the rest — reads, analyzes, evaluates, and ranks candidates automatically based on your criteria. Focus your time on interviews instead of reading.",
      features: ["Accept CVs in multiple formats", "Smart data extraction (name, experience, skills, education)", "Automatic evaluation against each job's requirements", "Fair and transparent point-based candidate ranking", "Automatic archiving of all CVs", "Summary reports of top candidates", "Full Arabic and English language support", "Instant notifications for outstanding candidates"],
      results: ["Save 95% of review time", "Screen each CV in under 30 seconds", "Unified, fair evaluation criteria", "Never miss a great candidate"],
      stats: [{ num: "95%", label: "Time Saved" }, { num: "< 30s", label: "Per CV" }, { num: "Unlimited", label: "CV Capacity" }, { num: "AR/EN", label: "Bilingual" }],
    },
    {
      id: "ai-bot", tag: "Customer Service", color: "#0A6332",
      title: "AI Bot — Intelligent Customer Service Agent",
      hero: "Smart chatbot serving your customers 24/7 in Arabic & English",
      overview: "An advanced chatbot powered by cutting-edge AI technology, fluent in Arabic and English, with a comprehensive knowledge base about your products and services, and automatic human handoff when customers need specialized help.",
      problem: "Customers ask repetitive questions, staff aren't available 24/7, and responses get delayed especially at night and on holidays — every late response is a potentially lost customer.",
      solution: "A smart bot responds to customers instantly at any time, understands context and intent, answers from an updated knowledge base about your company, and hands off to a human with full context when needed.",
      features: ["Full Arabic & English support with auto language detection", "Smart updatable knowledge base about your products & services", "Works on WhatsApp, Telegram & your website simultaneously", "Smart human handoff with full conversation context preserved", "Detailed analytics and reports on customer questions and bot performance", "Fully customizable bot personality matching your brand", "Learns and improves over time", "Operating cost far less than an additional employee"],
      results: ["24/7 customer service without hiring more staff", "Instant response in under 2 seconds", "90%+ of questions resolved automatically", "Higher customer satisfaction = more sales"],
      stats: [{ num: "24/7", label: "Always Available" }, { num: "< 2s", label: "Response Time" }, { num: "AR/EN", label: "Multilingual" }, { num: "90%+", label: "Auto-Resolve" }],
    },
  ],
};

const translations = {
  ar: {
    nav: { home: "الرئيسية", services: "خدماتنا", products: "أعمالنا", tools: "الأدوات", contact: "تواصل معنا" },
    hero: { badge: "حلول تقنية متكاملة", title1: "نبني لك", title2: "نظامك الرقمي", title3: "من الصفر", subtitle: "من إنشاء المواقع إلى أتمتة العمليات وأنظمة ERP المتكاملة — نحوّل أعمالك إلى آلة رقمية ذكية", cta1: "احجز استشارة مجانية", cta2: "اكتشف خدماتنا", stat1: "مشروع مُنجز", stat2: "عميل راضٍ", stat3: "وركفلو مؤتمت" },
    services: {
      title: "خدماتنا", subtitle: "حلول شاملة لكل احتياجات عملك الرقمية",
      items: [
        { icon: "⚡", title: "أتمتة العمليات", desc: "نصمم وننفذ سيناريوهات أتمتة معقدة لتوفير الوقت وتقليل الأخطاء البشرية — من ربط الأنظمة لتقارير تلقائية", features: ["ربط الأنظمة", "إشعارات ذكية", "تقارير تلقائية", "معالجة البيانات"] },
        { icon: "🤖", title: "شات بوت و AI Agent", desc: "نبني وكلاء ذكاء اصطناعي يتحدثون العربية والإنجليزية بطلاقة ويخدمون عملاءك 24 ساعة", features: ["دعم 24/7", "واتساب وتيليجرام", "قاعدة معرفة", "تحويل للموظف"] },
        { icon: "🏢", title: "نظام ERP متكامل", desc: "ننشئ نظام إدارة أعمال مخصص بالكامل مع تطوير موديولات حسب احتياجك الفعلي", features: ["تخصيص كامل", "موديولات مخصصة", "تكامل شامل", "تقارير متقدمة"] },
        { icon: "🌐", title: "إنشاء مواقع إلكترونية", desc: "نصمم مواقع احترافية ولاندينج بيدجز عالية التحويل مع تكامل مع كل أدوات التسويق", features: ["تصميم متجاوب", "SEO محسّن", "لوحة تحكم", "سرعة فائقة"] },
      ],
    },
    products: { title: "أعمالنا المميزة", subtitle: "مشاريع حقيقية نفذناها لعملائنا — اضغط على أي مشروع لمعرفة التفاصيل", viewDetails: "عرض التفاصيل →" },
    tools: { title: "الأدوات والتقنيات التي نتقنها" },
    contact: {
      title: "ابدأ رحلتك الرقمية الآن", subtitle: "احجز استشارة مجانية أو أرسل لنا تفاصيل مشروعك",
      form: { name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف", company: "اسم الشركة", service: "الخدمة المطلوبة", message: "تفاصيل المشروع", submit: "أرسل الطلب", sending: "جاري الإرسال...", meeting: "أو احجز مكالمة على Google Meet", serviceOptions: ["أتمتة عمليات", "شات بوت / AI Agent", "نظام ERP", "إنشاء موقع إلكتروني", "خدمة متكاملة", "أخرى"], success: "تم إرسال طلبك بنجاح!", successSub: "سنتواصل معك خلال 24 ساعة", error: "حدث خطأ، حاول مرة أخرى أو تواصل عبر واتساب" },
    },
    footer: { rights: "جميع الحقوق محفوظة", tagline: "حلول تقنية متكاملة — من الفكرة إلى التنفيذ" },
    detail: { back: "العودة للرئيسية →", overview: "نظرة عامة", problem: "المشكلة", solution: "الحل", features: "مميزات النظام", results: "النتائج المتوقعة", cta: "عايز نظام زي ده لشركتك؟", ctaBtn: "اطلب الآن" },
  },
  en: {
    nav: { home: "Home", services: "Services", products: "Portfolio", tools: "Tools", contact: "Contact" },
    hero: { badge: "Full-Service Tech Solutions", title1: "We Build Your", title2: "Digital System", title3: "From Scratch", subtitle: "From website creation to process automation and integrated ERP systems — we transform your business into a smart digital machine", cta1: "Book Free Consultation", cta2: "Explore Services", stat1: "Projects Done", stat2: "Happy Clients", stat3: "Automated Workflows" },
    services: {
      title: "Our Services", subtitle: "Comprehensive solutions for all your digital needs",
      items: [
        { icon: "⚡", title: "Process Automation", desc: "Complex automation scenarios to save time and reduce errors — from system integration to automated reports", features: ["System Integration", "Smart Alerts", "Auto Reports", "Data Processing"] },
        { icon: "🤖", title: "Chatbot & AI Agent", desc: "Advanced AI agents fluent in Arabic & English serving your customers around the clock", features: ["24/7 Support", "WhatsApp & Telegram", "Knowledge Base", "Human Handoff"] },
        { icon: "🏢", title: "Integrated ERP", desc: "Fully customized business management system with modules tailored to your actual needs", features: ["Full Custom", "Custom Modules", "Full Integration", "Advanced Reports"] },
        { icon: "🌐", title: "Web Development", desc: "Professional websites and high-conversion landing pages with full marketing tool integration", features: ["Responsive", "SEO Optimized", "Admin Panel", "Blazing Fast"] },
      ],
    },
    products: { title: "Featured Projects", subtitle: "Real projects delivered for our clients — click any project for details", viewDetails: "View Details →" },
    tools: { title: "Tools & Technologies We Master" },
    contact: {
      title: "Start Your Digital Journey Now", subtitle: "Book a free consultation or send us your project details",
      form: { name: "Full Name", email: "Email", phone: "Phone", company: "Company", service: "Service Needed", message: "Project Details", submit: "Send Request", sending: "Sending...", meeting: "Or book a call on Google Meet", serviceOptions: ["Process Automation", "Chatbot / AI Agent", "ERP System", "Website Development", "Full-Service Package", "Other"], success: "Request Sent!", successSub: "We'll get back within 24 hours", error: "Error. Try again or contact via WhatsApp" },
    },
    footer: { rights: "All Rights Reserved", tagline: "Full-Service Tech Solutions — From Idea to Execution" },
    detail: { back: "← Back to Home", overview: "Overview", problem: "The Problem", solution: "The Solution", features: "System Features", results: "Expected Results", cta: "Want a system like this for your company?", ctaBtn: "Request Now" },
  },
};

const toolLogos = [
  { name: "n8n", color: "#EA4B71", letter: "n8n" }, { name: "Odoo", color: "#714B67", letter: "Odoo" },
  { name: "Botpress", color: "#3C58E3", letter: "BP" }, { name: "Make", color: "#6D00CC", letter: "Make" },
  { name: "Zapier", color: "#FF4A00", letter: "Zap" }, { name: "Meta", color: "#0668E1", letter: "Meta" },
  { name: "UiPath", color: "#FA4616", letter: "UiP" }, { name: "OpenAI", color: "#000000", letter: "AI" },
  { name: "Google", color: "#4285F4", letter: "G" }, { name: "Shopify", color: "#96BF48", letter: "Shp" },
  { name: "Telegram", color: "#26A5E4", letter: "TG" }, { name: "WhatsApp", color: "#25D366", letter: "WA" },
  { name: "Groq", color: "#F55036", letter: "Grq" }, { name: "Gemini", color: "#886FBF", letter: "Gem" },
];

const WaSvg = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const WaSmall = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

function DetailPage({ wf, t, isRTL, ff, onBack, onContact }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ fontFamily: ff, minHeight: "100vh", background: "#FAFAFA" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 100, padding: "16px 40px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: ff, fontSize: 15, fontWeight: 600, color: "#0A2463" }}>{t.detail.back}</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={onBack}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #0A2463, #1E5AA8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 12 }}>ES</div>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#0A2463" }}>Engosoft</span>
        </div>
      </div>

      <div style={{ padding: "80px 40px 50px", textAlign: "center", background: `linear-gradient(180deg, ${wf.color}08 0%, #FAFAFA 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: wf.color, opacity: 0.04, filter: "blur(80px)", top: -100, left: "50%", transform: "translateX(-50%)" }} />
        <span style={{ display: "inline-block", padding: "8px 20px", borderRadius: 100, background: wf.color + "15", color: wf.color, fontSize: 14, fontWeight: 700, marginBottom: 20 }}>{wf.tag}</span>
        <h1 style={{ fontSize: 38, fontWeight: 900, marginBottom: 16, color: "#1A1A2E", maxWidth: 700, margin: "0 auto 16px" }}>{wf.title}</h1>
        <p style={{ fontSize: 19, color: "#555", maxWidth: 600, margin: "0 auto" }}>{wf.hero}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", padding: "40px 40px 0" }}>
        {wf.stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "20px 28px", background: "#fff", borderRadius: 14, border: "1px solid #EEF2F7", minWidth: 120 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: wf.color }}>{s.num}</div>
            <div style={{ fontSize: 12, color: "#777", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "50px 40px" }}>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, color: "#0A2463" }}>{t.detail.overview}</h2>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 2 }}>{wf.overview}</p>
        </div>

        <div className="dg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
          <div style={{ padding: 24, borderRadius: 14, background: "#FFF5F5", border: "1px solid #FED7D7" }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>⚠️</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#C53030" }}>{t.detail.problem}</h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8 }}>{wf.problem}</p>
          </div>
          <div style={{ padding: 24, borderRadius: 14, background: "#F0FFF4", border: "1px solid #C6F6D5" }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>✅</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#276749" }}>{t.detail.solution}</h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8 }}>{wf.solution}</p>
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16, color: "#0A2463" }}>{t.detail.features}</h2>
          <div className="dg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {wf.features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 14, background: "#fff", borderRadius: 10, border: "1px solid #EEF2F7" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: wf.color + "15", color: wf.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
                <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6, paddingTop: 2 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div style={{ marginBottom: 50 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16, color: "#0A2463" }}>{t.detail.results}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {wf.results.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: `linear-gradient(135deg, ${wf.color}08, ${wf.color}03)`, borderRadius: 12, border: `1px solid ${wf.color}15` }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: wf.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✓</div>
                <span style={{ fontSize: 14, color: "#333", fontWeight: 500 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", padding: 40, borderRadius: 18, background: `linear-gradient(135deg, ${wf.color}0D, ${wf.color}05)`, border: `1px solid ${wf.color}20` }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16, color: "#1A1A2E" }}>{t.detail.cta}</h3>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={onContact} style={{ background: `linear-gradient(135deg, ${wf.color}, ${wf.color}CC)`, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>{t.detail.ctaBtn}</button>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}><WaSmall /> WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("ar");
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const t = translations[lang];
  const isRTL = lang === "ar";
  const ff = isRTL ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif";

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      if (currentPage !== "home") return;
      for (const id of ["contact","tools","products","services","home"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 300) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [currentPage]);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{overflow-x:hidden;background:#FAFAFA}
      @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes waPulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)}70%{box-shadow:0 0 0 16px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}
      .af{opacity:0;animation:fadeUp .8s ease forwards}.af1{animation-delay:.1s}.af2{animation-delay:.2s}.af3{animation-delay:.3s}.af4{animation-delay:.4s}
      .ch{transition:all .4s cubic-bezier(.25,.8,.25,1)}.ch:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,20,60,.1)}
      .bp{background:linear-gradient(135deg,#0A2463,#1E5AA8);color:#fff;border:none;padding:16px 36px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:all .3s ease}
      .bp:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(10,36,99,.35)}
      .bs{background:transparent;color:#0A2463;border:2px solid #0A2463;padding:14px 34px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:all .3s ease}
      .bs:hover{background:#0A2463;color:#fff}
      .mt{display:flex;animation:marquee 30s linear infinite}.mt:hover{animation-play-state:paused}
      .gt{background:linear-gradient(135deg,#0A2463,#1E5AA8,#3B82F6);background-size:200% 200%;animation:gradientShift 4s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .nl{position:relative}.nl::after{content:'';position:absolute;bottom:-4px;${isRTL?'right':'left'}:0;width:0;height:2px;background:#0A2463;transition:width .3s ease}
      .nl:hover::after,.nl.ac::after{width:100%}
      input,textarea,select{width:100%;padding:14px 18px;border:2px solid #E2E8F0;border-radius:10px;font-size:15px;transition:all .3s;background:#fff;outline:none;font-family:${ff}}
      input:focus,textarea:focus,select:focus{border-color:#0A2463;box-shadow:0 0 0 4px rgba(10,36,99,.08)}
      .bl{position:absolute;border-radius:50%;filter:blur(80px);opacity:.12;animation:float 8s ease-in-out infinite}
      @media(max-width:768px){.ht{font-size:34px!important}.st{font-size:28px!important}.g2{grid-template-columns:1fr!important}.hm{display:none!important}.hs{flex-direction:column;gap:16px!important}.hb{flex-direction:column;align-items:center}.nvl{display:none!important}.mt2{display:flex!important}.pci{flex-direction:column!important}.dg{grid-template-columns:1fr!important}}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, [isRTL, ff]);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileMenu(false); };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.service) return;
    setFormStatus("sending");
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🔔 Engosoft Lead — ${formData.service}`,
          from_name: "Engosoft Website",
          name: formData.name, email: formData.email,
          phone: formData.phone || "N/A", company: formData.company || "N/A",
          service: formData.service, message: formData.message || "N/A",
        }),
      });
      const d = await r.json();
      setFormStatus(d.success ? "success" : "error");
    } catch { setFormStatus("error"); }
  };

  if (currentPage !== "home") {
    const wf = workflowDetails[lang].find(w => w.id === currentPage);
    if (wf) return (
      <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff }}>
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9997, opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9998, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.45)", animation: "waPulse 2s infinite", textDecoration: "none" }}><WaSvg /></a>
        <DetailPage wf={wf} t={t} isRTL={isRTL} ff={ff} onBack={() => setCurrentPage("home")} onContact={() => { setCurrentPage("home"); setTimeout(() => go("contact"), 100); }} />
      </div>
    );
  }

  const products = workflowDetails[lang];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: ff, color: "#1A1A2E", lineHeight: 1.7 }}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9997, opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9998, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.45)", animation: "waPulse 2s infinite", textDecoration: "none", transition: "transform .3" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}><WaSvg /></a>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 40px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 50 ? "rgba(255,255,255,0.92)" : "transparent", backdropFilter: scrollY > 50 ? "blur(20px)" : "none", borderBottom: scrollY > 50 ? "1px solid rgba(0,0,0,0.06)" : "none", transition: "all .4s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => go("home")}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: "linear-gradient(135deg, #0A2463, #1E5AA8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>ES</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#0A2463" }}>Engosoft</span>
        </div>
        <div className="nvl" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {Object.entries(t.nav).map(([k, v]) => (
            <button key={k} className={`nl ${activeSection === k ? 'ac' : ''}`} onClick={() => go(k)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, color: "#1A1A2E", fontFamily: ff }}>{v}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{ background: "none", border: "2px solid #E2E8F0", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#0A2463", fontFamily: ff }}>{lang === "ar" ? "EN" : "عربي"}</button>
          <button className="mt2" onClick={() => setMobileMenu(!mobileMenu)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 24, color: "#0A2463" }}>☰</button>
        </div>
      </nav>

      {mobileMenu && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, bottom: 0, zIndex: 999, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {Object.entries(t.nav).map(([k, v]) => (
            <button key={k} onClick={() => go(k)} style={{ background: "none", border: "none", fontSize: 24, fontWeight: 600, color: "#0A2463", cursor: "pointer", fontFamily: ff }}>{v}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 40px 80px", background: "linear-gradient(180deg, #F0F4FF 0%, #FAFAFA 100%)" }}>
        <div className="bl" style={{ width: 500, height: 500, background: "#0A2463", top: -100, [isRTL?'left':'right']: -150 }} />
        <div className="bl" style={{ width: 400, height: 400, background: "#3B82F6", bottom: -100, [isRTL?'right':'left']: -100, animationDelay: "3s" }} />
        <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 2 }}>
          <div className="af" style={{ display: "inline-block", padding: "8px 20px", borderRadius: 100, background: "rgba(10,36,99,0.08)", color: "#0A2463", fontSize: 14, fontWeight: 600, marginBottom: 28 }}>✦ {t.hero.badge}</div>
          <h1 className="af af1 ht" style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.15, marginBottom: 24 }}>{t.hero.title1}<br /><span className="gt">{t.hero.title2}</span><br />{t.hero.title3}</h1>
          <p className="af af2" style={{ fontSize: 19, color: "#555", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.8 }}>{t.hero.subtitle}</p>
          <div className="af af3 hb" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
            <button className="bp" onClick={() => go("contact")} style={{ fontFamily: ff }}>{t.hero.cta1} →</button>
            <button className="bs" onClick={() => go("services")} style={{ fontFamily: ff }}>{t.hero.cta2}</button>
          </div>
          <div className="af af4 hs" style={{ display: "flex", justifyContent: "center", gap: 48 }}>
            {[{ n: "50+", l: t.hero.stat1 }, { n: "30+", l: t.hero.stat2 }, { n: "100+", l: t.hero.stat3 }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#0A2463" }}>{s.n}</div>
                <div style={{ fontSize: 14, color: "#777", fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="st" style={{ fontSize: 44, fontWeight: 900, marginBottom: 16 }}>{t.services.title}</h2>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 500, margin: "0 auto" }}>{t.services.subtitle}</p>
        </div>
        <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {t.services.items.map((item, i) => (
            <div key={i} className="ch" style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #EEF2F7", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, [isRTL?'left':'right']: -30, width: 120, height: 120, borderRadius: "50%", background: `linear-gradient(135deg, ${['#0A2463','#1E5AA8','#714B67','#3B82F6'][i]}, transparent)`, opacity: 0.06 }} />
              <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: "#0A2463" }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "#666", marginBottom: 20, lineHeight: 1.8 }}>{item.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {item.features.map((f, j) => <span key={j} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, background: "#F0F4FF", color: "#0A2463", fontWeight: 500 }}>{f}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "100px 40px", background: "linear-gradient(180deg, #FAFAFA 0%, #F0F4FF 50%, #FAFAFA 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 className="st" style={{ fontSize: 44, fontWeight: 900, marginBottom: 16 }}>{t.products.title}</h2>
            <p style={{ fontSize: 18, color: "#666" }}>{t.products.subtitle}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {products.map((item, i) => (
              <div key={i} className="ch" onClick={() => setCurrentPage(item.id)} style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #EEF2F7", cursor: "pointer" }}>
                <div className="pci" style={{ display: "flex", gap: 32, alignItems: "center", flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, background: item.color + "15", color: item.color, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>{item.tag}</span>
                    <h3 style={{ fontSize: 21, fontWeight: 800, marginBottom: 12, color: "#1A1A2E" }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, marginBottom: 16 }}>{item.overview.substring(0, 140)}...</p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 14, borderTop: "1px solid #F0F0F0", alignItems: "center" }}>
                      {item.stats.slice(0, 2).map((st, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: item.color }}>{st.num} {st.label}</span>
                        </div>
                      ))}
                      <span style={{ [isRTL ? 'marginRight' : 'marginLeft']: "auto", fontSize: 14, fontWeight: 700, color: item.color }}>{t.products.viewDetails}</span>
                    </div>
                  </div>
                  <div className="hm" style={{ width: 200, height: 150, borderRadius: 14, flexShrink: 0, background: `linear-gradient(135deg, ${item.color}12, ${item.color}06)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {[0,1,2].map(j => (
                        <div key={j} style={{ width: 36, height: 36, borderRadius: 9, background: j === 1 ? item.color : "#fff", color: j === 1 ? "#fff" : item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, boxShadow: "0 3px 10px rgba(0,0,0,.06)", animation: `float ${3+j}s ease-in-out infinite`, animationDelay: `${j*.5}s` }}>
                          {["⚙","🔗","📊"][j]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" style={{ padding: "80px 0", overflow: "hidden" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 900, marginBottom: 48 }}>{t.tools.title}</h2>
        <div style={{ overflow: "hidden", direction: "ltr" }}>
          <div className="mt">
            {[...toolLogos, ...toolLogos].map((tl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 28px", margin: "0 12px", background: "#fff", borderRadius: 14, border: "1px solid #EEF2F7", flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: tl.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: tl.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{tl.letter}</div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", whiteSpace: "nowrap", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{tl.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 40px", background: "linear-gradient(180deg, #FAFAFA 0%, #F0F4FF 100%)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="st" style={{ fontSize: 44, fontWeight: 900, marginBottom: 16 }}>{t.contact.title}</h2>
            <p style={{ fontSize: 18, color: "#666" }}>{t.contact.subtitle}</p>
          </div>
          {formStatus === "success" ? (
            <div style={{ textAlign: "center", padding: 60, background: "#fff", borderRadius: 24, border: "1px solid #C6F6D5" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32, color: "#276749" }}>✓</div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "#276749", marginBottom: 8 }}>{t.contact.form.success}</h3>
              <p style={{ color: "#666", marginBottom: 24 }}>{t.contact.form.successSub}</p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 12, fontWeight: 600, textDecoration: "none" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {isRTL ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
              </a>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 24, padding: 48, border: "1px solid #EEF2F7", boxShadow: "0 8px 40px rgba(0,0,0,.04)" }}>
              <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#333" }}>{t.contact.form.name} *</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={isRTL ? "محمد أحمد" : "John Doe"} /></div>
                <div><label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#333" }}>{t.contact.form.email} *</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@company.com" style={{ direction: "ltr", textAlign: isRTL ? "right" : "left" }} /></div>
              </div>
              <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#333" }}>{t.contact.form.phone}</label><input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+20 1xx xxx xxxx" style={{ direction: "ltr", textAlign: isRTL ? "right" : "left" }} /></div>
                <div><label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#333" }}>{t.contact.form.company}</label><input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder={isRTL ? "اسم شركتك" : "Your Company"} /></div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#333" }}>{t.contact.form.service} *</label>
                <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                  <option value="">{isRTL ? "— اختر —" : "— Select —"}</option>
                  {t.contact.form.serviceOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#333" }}>{t.contact.form.message}</label>
                <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder={isRTL ? "اكتب تفاصيل مشروعك..." : "Describe your project..."} />
              </div>
              {formStatus === "error" && <div style={{ padding: "12px 20px", borderRadius: 10, background: "#FFF5F5", color: "#C53030", fontSize: 14, marginBottom: 16, textAlign: "center" }}>{t.contact.form.error}</div>}
              <button className="bp" onClick={handleSubmit} disabled={formStatus === "sending" || !formData.name || !formData.email || !formData.service} style={{ width: "100%", fontFamily: ff, fontSize: 17, padding: "18px 36px", opacity: (formStatus === "sending" || !formData.name || !formData.email || !formData.service) ? 0.6 : 1 }}>
                {formStatus === "sending" ? t.contact.form.sending : t.contact.form.submit + " →"}
              </button>
              <div style={{ textAlign: "center", marginTop: 24, paddingTop: 24, borderTop: "1px solid #F0F0F0" }}>
                <p style={{ fontSize: 15, color: "#888", marginBottom: 12 }}>{t.contact.form.meeting}</p>
                <a href={GOOGLE_MEET_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 28px", borderRadius: 12, background: "#fff", border: "2px solid #E2E8F0", color: "#1A1A2E", fontWeight: 600, fontSize: 15, textDecoration: "none", fontFamily: ff }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#4285F4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>G</div>
                  Google Meet
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer style={{ padding: "48px 40px", background: "#0A2463", color: "rgba(255,255,255,0.8)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 12 }}>ES</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>Engosoft</span>
        </div>
        <p style={{ fontSize: 14, marginBottom: 8, opacity: 0.7 }}>{t.footer.tagline}</p>
        <p style={{ fontSize: 13, opacity: 0.5 }}>© 2025 Engosoft. {t.footer.rights}</p>
      </footer>
    </div>
  );
}
