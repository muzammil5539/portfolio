/** Single source of truth for identity, contact details and SEO/LLM copy. Edit here, not in components. */
export const site = {
  url: "https://muzammil5539.vercel.app",
  name: "Muzammil Nawaz Khan",
  role: "AI Engineer",
  tagline: "AI systems that ship, and keep working after launch.",
  summary:
    "AI engineer with 1+ year of production experience building machine learning, LLM and RAG systems in Python. Delivered a claims-classification system at 95% accuracy across 42,900+ cases, cut a claim denial rate from 3.2% to 2.4%, and cut inference costs 35% through prompt caching. Computer vision background in 3D MRI brain tumor segmentation (SegFormer3D, 85%+ Dice).",
  location: { city: "Islamabad", country: "Pakistan", countryCode: "PK" },
  availability: "Open to remote work and relocation",
  email: "mnk.7muzammil86@gmail.com",
  phone: "+92 304 6395539",
  links: {
    linkedin: "https://linkedin.com/in/mnk539",
    github: "https://github.com/muzammil5539",
    resume: "/Resume - Muzammil Nawaz Khan CV.pdf",
  },
  photo: "/portfolio.jpg",
  knowsAbout: [
    "Machine learning",
    "Large language models",
    "Retrieval-augmented generation",
    "AI agents",
    "Model Context Protocol",
    "Computer vision",
    "Medical image segmentation",
    "Voice AI",
    "Python",
    "PyTorch",
    "FastAPI",
  ],
  alumniOf: { name: "National University of Sciences and Technology (NUST)", url: "https://nust.edu.pk" },
  employers: [
    { name: "SME Solutions, Inc. (via Deel)", role: "Data Trainer", period: "Aug 2026 – present" },
    { name: "CareCloud (MTBC)", role: "Junior AI Engineer", period: "Jul 2025 – Aug 2026" },
    { name: "Suidhaga", role: "Software / AI Engineer", period: "Mar 2022 – Nov 2025" },
    { name: "Risetech", role: "AI/ML Research Intern", period: "Jul 2024 – Aug 2024" },
  ],
} as const;

export const heroMetrics = [
  { value: "95%", label: "claims classification accuracy across 42,900+ cases" },
  { value: "3.2 → 2.4%", label: "claim denial rate; resubmission wait from 2 weeks to 3 days" },
  { value: "−35%", label: "inference cost through prompt caching" },
];

export const stackStrip = ["PyTorch", "TensorFlow", "scikit-learn", "CatBoost / XGBoost", "LangChain", "LangGraph", "MCP", "FastAPI", "Docker", "Rust"];

/** Question-and-answer copy: rendered on the home page and reused in FAQ JSON-LD and llms.txt. */
export const faqs = [
  {
    q: "What does Muzammil Nawaz Khan build?",
    a: "He builds production machine learning, LLM and RAG systems in Python: healthcare claims classification and denial prediction, real-time voice AI agents, retrieval-augmented generation engines, and 3D medical image segmentation.",
  },
  {
    q: "What results has he delivered?",
    a: "A claims-classification system at 95% accuracy across 42,900+ cases, a claim denial rate cut from 3.2% to 2.4%, resubmission wait cut from 2 weeks to 3 days, inference costs cut 35% through prompt caching, and front-desk handling time cut 40% with a voice AI agent.",
  },
  {
    q: "Where is Muzammil based, and is he open to relocation?",
    a: "He is based in Islamabad, Pakistan, and is open to remote work and relocation.",
  },
  {
    q: "What is his technical stack?",
    a: "Python, PyTorch, TensorFlow, scikit-learn, CatBoost, XGBoost, AutoGluon, LangChain, LangGraph, the Model Context Protocol, FastAPI, Django, Next.js, Docker and Kubernetes, plus Rust and C++.",
  },
  {
    q: "Where did he study and what has he won?",
    a: "He holds a B.E. in Computer Engineering from NUST (2021–2025, CGPA 3.25). His final year project, Neurofusion, won 1st Place at COMPPEC 2025 and a Departmental Silver Medal.",
  },
  {
    q: "How can I contact him?",
    a: "Email mnk.7muzammil86@gmail.com, or reach him on LinkedIn (linkedin.com/in/mnk539) or GitHub (github.com/muzammil5539).",
  },
];
