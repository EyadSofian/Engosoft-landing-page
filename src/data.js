export const PROJECTS = [
  {
    id: 1, emoji: "📞", color: "#10B981", cat: "AI & Automation",
    title: "Call Quality Auditing System", client: "Engosoft", year: "2025",
    tags: ["n8n", "Groq Whisper", "GPT-4o", "Pinecone", "Odoo CRM"],
    desc: "32–40 node n8n pipeline: Yeastar PBX recordings → Groq Whisper Arabic STT → GPT-4o evaluation across 46+ criteria (categories A–F) → Pinecone RAG for course catalog → Odoo CRM integration with HTML email reports. Score Recalculator safety layer for consistency.",
    metrics: { "Workflow Nodes": "32–40", "Scoring Criteria": "46+", "Categories": "A–F" },
    demo: null, repo: null, workflow: "https://n8n.engosoft.com"
  },
  {
    id: 2, emoji: "🎓", color: "#8B5CF6", cat: "Conversational AI",
    title: "Majed — AI Educational Copilot", client: "Engosoft Training", year: "2025–2026",
    tags: ["Botpress", "Gemini 2.5 Flash", "n8n", "Odoo", "Google Calendar", "Chatwoot"],
    desc: "Full-stack Arabic AI copilot for engineering trainees. Study plans, quizzes (→Word→email), Google Calendar scheduling, notes (→PDF→email). Chatwoot HITL with 30-question moderator assessment. Token-optimized English prompt (~950 tokens) with multilingual output.",
    metrics: { "n8n Workflows": "3+", "Assessment": "30 Q's", "Languages": "Any" },
    demo: "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/02/11/18/20260211184124-KE13UNZE.json",
    repo: null, workflow: null
  },
  {
    id: 3, emoji: "🤖", color: "#EF4444", cat: "Conversational AI",
    title: "Fahad — Customer Service Bot", client: "Engosoft", year: "2025",
    tags: ["Botpress", "Gemini 2.5 Flash", "Chatwoot", "Node.js", "n8n"],
    desc: "Production customer service chatbot: 6 flows, 25+ nodes, 3 Autonomous Nodes (inquiry, operations, sales). Auto language detection. Chatwoot-Botpress bridge on Coolify for seamless bot-to-human handoff. Infrastructure course keyword mapping.",
    metrics: { "Flows": "6", "Nodes": "25+", "AI Agents": "3" },
    demo: "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2025/12/14/16/20251214162629-RCBC4P4N.json",
    repo: "https://github.com/EyadSofian/chatwoot-botpress-bridge", workflow: null
  },
  {
    id: 4, emoji: "🛒", color: "#F59E0B", cat: "Integration",
    title: "Shopify → Odoo Real-Time Sync", client: "Engosoft", year: "2025",
    tags: ["n8n", "Shopify API", "Odoo 18", "Webhooks"],
    desc: "Real-time webhook-triggered order sync: customer creation, barcode-based product matching, two-step order creation (Create → Update for One2many fields), HTTP 200 dedup response. Published as n8n Creator marketplace template.",
    metrics: { "Sync": "Real-time", "Entities": "5", "Response": "<200ms" },
    demo: null, repo: null, workflow: "https://n8n.engosoft.com"
  },
  {
    id: 5, emoji: "📄", color: "#06B6D4", cat: "AI & Automation",
    title: "CV Screening & Ranking Workflow", client: "Engosoft HR", year: "2025",
    tags: ["n8n", "GPT-4o-mini", "GPT-4o", "Google Sheets", "Telegram"],
    desc: "HR automation: Telegram bot receives CVs → GPT-4o-mini individual analysis → GPT-4o batch ranking → Google Sheets structured output → HTML email accept/reject templates sent automatically.",
    metrics: { "AI Models": "2", "Output": "Ranked List", "Notify": "Auto" },
    demo: null, repo: null, workflow: null
  },
  {
    id: 6, emoji: "🔗", color: "#F97316", cat: "Integration",
    title: "Chatwoot–Botpress Bridge", client: "Engosoft", year: "2025",
    tags: ["Node.js", "Express.js", "Chatwoot", "Botpress", "Coolify"],
    desc: "Custom Node.js bridge: bidirectional webhook routing, conversation state tracking for HITL, context reset on agent→bot transition. Self-hosted on Coolify at chat.engosoft.com.",
    metrics: { "Endpoints": "2", "State": "Tracked", "Deploy": "Coolify" },
    demo: "https://chat.engosoft.com", repo: "https://github.com/EyadSofian/chatwoot-botpress-bridge", workflow: null
  },
  {
    id: 7, emoji: "💊", color: "#A78BFA", cat: "Conversational AI",
    title: "XQ Pharma — Doctor AI", client: "XQ Pharma", year: "2024–2025",
    tags: ["Botpress", "NLP", "WhatsApp", "Messenger", "Knowledge Base"],
    desc: "Multichannel AI agent (WhatsApp, Messenger, Web). Doctor AI for drug interactions & dosage. Automated order processing reduced manual entry by 80%. Response time improved 60%.",
    metrics: { "Response": "↓60%", "Manual Entry": "↓80%", "Channels": "3" },
    demo: null, repo: null, workflow: null
  },
  {
    id: 8, emoji: "⚙️", color: "#14B8A6", cat: "RPA",
    title: "UiPath — Yeastar PBX Automation", client: "Engosoft", year: "2025",
    tags: ["UiPath", "Python", "Yeastar PBX", "Google Drive", "n8n"],
    desc: "UiPath Yasster_Bot automates PBX UI. Python watchdog monitors .tar → extracts .wav → copies to Drive → triggers n8n transcription webhook. Railway proxy solves IP FORBIDDEN error.",
    metrics: { "RPA Bot": "Yasster_Bot", "Files": ".tar/.wav", "Proxy": "Railway" },
    demo: null, repo: "https://github.com/EyadSofian/yeastar-bridge", workflow: null
  },
  {
    id: 9, emoji: "📱", color: "#3B82F6", cat: "Meta & CRM",
    title: "Meta + Odoo CRM Integration", client: "Multiple Clients", year: "2024–2025",
    tags: ["WhatsApp Business API", "Messenger", "Odoo CRM", "n8n", "Botpress"],
    desc: "Unified lead capture: WA Business + Messenger → Botpress → auto lead creation in Odoo CRM with UTM tracking. Email summarization → opportunity notes. Multi-client Egypt & Gulf deployment.",
    metrics: { "Channels": "WA + FB", "CRM": "Odoo", "Markets": "EG / GCC" },
    demo: null, repo: null, workflow: "https://n8n.engosoft.com"
  },
  {
    id: 10, emoji: "🌐", color: "#22D3EE", cat: "Web",
    title: "Engosoft Landing Page", client: "Engosoft", year: "2025–2026",
    tags: ["React", "Vite", "Vercel", "Web3Forms", "Tailwind"],
    desc: "React + Vite SPA: Google One-style services page, 7-step multi-step needs assessment form, Web3Forms API for lead capture, WhatsApp & Google Calendar booking. Deployed to Vercel.",
    metrics: { "Steps": "7", "Stack": "React/Vite", "Deploy": "Vercel" },
    demo: "https://engosoft-landing-page.vercel.app", repo: null, workflow: null
  },
  {
    id: 11, emoji: "👥", color: "#34D399", cat: "Conversational AI",
    title: "Engosoft HR Bot", client: "Engosoft", year: "2026",
    tags: ["Botpress", "n8n", "HR Automation"],
    desc: "Internal HR chatbot: employee self-service for policy queries, leave management, onboarding. n8n workflow for approval processes. Arabic-first design, live in production.",
    metrics: { "Status": "Live", "Design": "Arabic-first", "Type": "Internal" },
    demo: null, repo: null, workflow: null
  },
  {
    id: 12, emoji: "📊", color: "#FB923C", cat: "AI & Automation",
    title: "ERP AI Chatbot — Odoo Sales", client: "Engosoft", year: "2025",
    tags: ["OpenAI", "Odoo", "n8n", "Sales Module"],
    desc: "AI chatbot integrated with Odoo sales module using OpenAI. Natural language queries for products & orders, automated workflow suggestions, email summarization → opportunity notes.",
    metrics: { "AI": "OpenAI", "ERP": "Odoo 18", "Module": "Sales" },
    demo: null, repo: null, workflow: null
  }
];

export const CATEGORIES = ["All", "Conversational AI", "AI & Automation", "Integration", "RPA", "Meta & CRM", "Web"];

export const SKILLS = [
  ["n8n", 95], ["Botpress", 95], ["Odoo 17/18", 85], ["OpenAI / GPT-4o", 90],
  ["Gemini 2.5 Flash", 85], ["Pinecone", 80], ["Chatwoot", 85], ["UiPath", 75],
  ["Python", 80], ["JavaScript / Node.js", 85], ["Flutter / Dart", 70], ["React", 75],
  ["Docker / Coolify", 75], ["Groq Whisper", 85], ["WhatsApp Business API", 85], ["Shopify API", 80]
];

export const EXPERIENCE = [
  { role: "AI Product & Technology Specialist", co: "Engosoft Training & Consulting", period: "Oct 2024 – Present", type: "Founder", current: true },
  { role: "AI Solutions Engineer → Consultant", co: "XQ Pharma", period: "Mar 2024 – Present", type: "FT → Consultant", current: false },
  { role: "AI Chatbot Developer", co: "Terynova (Shopify)", period: "2025", type: "Freelance", current: false },
  { role: "AI & Automation Developer", co: "Wonder of Women", period: "Dec 2023 – Feb 2024", type: "Contract", current: false },
  { role: "Chatbot Developer", co: "Al-Bakry Overseas", period: "Sep – Nov 2023", type: "Contract", current: false }
];

export const CERTS = [
  { name: "Botpress Certified Partner", color: "#10B981", link: "https://botpress.com/experts/eyad-sofian" },
  { name: "DeepLearning.AI — Prompt Engineering", color: "#8B5CF6" },
  { name: "DeepLearning.AI — LLM Fine-tuning", color: "#A78BFA" },
  { name: "Hugging Face — LLM Training", color: "#F59E0B" }
];
