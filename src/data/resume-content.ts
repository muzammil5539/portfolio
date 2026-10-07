/**
 * Résumé content for the downloadable PDFs. One pool of facts, then per-role selections
 * (see ROLE_RESUMES) that choose, order and emphasise them. Nothing here is role-invented:
 * every bullet is an accurate statement that a role resume may pick or leave out.
 * Regenerate the PDFs with: node --experimental-strip-types scripts/generate-resumes.mjs
 */
import type { RoleId } from "./resumes";

export const person = {
  name: "Muzammil Nawaz Khan",
  email: "mnk.7muzammil86@gmail.com",
  phone: "+92 304 6395539",
  location: "Islamabad, Pakistan",
  linkedin: "linkedin.com/in/mnk539",
  github: "github.com/muzammil5539",
  portfolio: "muzammil-nawaz-khan.vercel.app",
};

export interface Job {
  title: string;
  company: string;
  dates: string;
  place: string;
}

export const jobs = {
  sme: { title: "Data Trainer", company: "SME Solutions, Inc. (via Deel)", dates: "Aug 2026 – Present", place: "Remote, independent contractor" },
  carecloud: { title: "Junior AI Engineer", company: "CareCloud (MTBC)", dates: "Jul 2025 – Aug 2026", place: "Islamabad, Pakistan" },
  suidhaga: { title: "Software / AI Engineer", company: "Suidhaga", dates: "Mar 2022 – Nov 2025", place: "Remote, part-time alongside studies" },
  freelance: { title: "Freelance AI Engineer", company: "Independent", dates: "Sep 2022 – Present", place: "Remote" },
  risetech: { title: "AI/ML Research Intern", company: "Risetech", dates: "Jul 2024 – Aug 2024", place: "Rawalpindi / Islamabad, Pakistan" },
} satisfies Record<string, Job>;

export type JobId = keyof typeof jobs;

/** Bullet pool, keyed so each role resume can pick and order them. */
export const bullets = {
  // SME Solutions
  sme_prompts: "Create and review detailed prompts and responses used to train AI models across varied topics.",
  sme_rank: "Evaluate and rank AI model responses to improve accuracy in different contexts.",
  sme_bias: "Test models for inaccuracies and bias, validating their applicability in the target domains.",
  // CareCloud
  cc_ftpr:
    "Built a Python denial-prediction and resubmission automation system with a rule-based First-Time Pass Rate (FTPR) module comparing rejected vs corrected/paid claims by provider, payer, CPT and ICD code. Cut resubmission wait from 2 weeks to 3 days and reduced the denial rate from 3.2% to 2.4%.",
  cc_class:
    "Delivered a production claims-classification system (CatBoost, XGBoost, AutoGluon) at 95% parent-model accuracy and 92%+ category-level accuracy across 42,900+ cases, with daily feedback-loop retraining and multi-month tracking of accuracy and stability.",
  cc_val:
    "Layered rule-based checks with an LLM validation agent that generates root-cause analysis and corrective-action recommendations for each flagged case.",
  cc_voice:
    "Worked across a real-time voice AI front-desk agent on LiveKit (WebRTC) with ElevenLabs TTS, OpenAI models and Silero VAD for low-latency interruption handling; Twilio/SIP trunking for inbound calls with transfer to human staff; LangGraph for multi-state orchestration. Reduced front-desk handling time by 40%.",
  cc_n8n:
    "Designed an n8n workflow acting as a Model Context Protocol (MCP) server for conversation state, backend prompts and call routing, wrapping APIs as tool calls. Cut inference costs 35% through prompt caching.",
  cc_pipe:
    "Engineered Python pipelines that pull Hikvision NVR logs, clean them and load them to a database for HR attendance analytics; built an internal FastAPI EDI Viewer for inspecting raw healthcare claim data.",
  cc_pipe_short: "Built Python data pipelines (Hikvision NVR logs to a database for HR attendance analytics) and an internal FastAPI EDI Viewer for raw healthcare claim data.",
  // Suidhaga
  su_stack:
    "Progressed through the full engineering stack over 3+ years for an e-commerce business: built frontend UI, moved to Django-focused backend development, then owned full-stack web features end to end.",
  su_ds: "Applied data analysis and data science to business data; later built ARIMA-family forecasting models to predict product prices.",
  // Freelance
  fl_all: "Delivered AI development projects for clients, including model training and applied AI application builds.",
  // Risetech
  rt_seg: "Segmented brain tumor regions from multi-modal MRI (T1-CE, T2, FLAIR) on the BraTS20 dataset.",
  rt_bench: "Benchmarked 3D U-Net against SegFormer3D and selected SegFormer3D (85%+ Dice). Used GradCAM for explainability and FastAPI for serving.",
  rt_award: "The work became the Neurofusion final year project: 1st Place at COMPPEC 2025 and a Departmental Silver Medal.",
} as const;

export type BulletId = keyof typeof bullets;

export interface ProjectEntry {
  title: string;
  stack: string;
  text: string;
  links?: { label: string; url: string }[];
}

export const projects = {
  vak: {
    title: "Verifiable Agent Kernel (VAK)",
    stack: "Rust, Python, WASM, Cedar/ABAC",
    text: "Deterministic control plane for LLM agents: least-privilege ABAC, WASM-sandboxed tools, Z3 formal verification before execution, 3-tier memory (Merkle DAG), multi-agent debate with quadratic-voting consensus, and a PRM fine-tuning toolkit. v1.0 with 80%+ test coverage; CI/CD on Docker and Kubernetes; LangChain/AutoGPT/MCP adapters.",
    links: [{ label: "GitHub", url: "github.com/muzammil5539/Verifiable-Agent-Kernel-VAK-" }],
  },
  ragEngine: {
    title: "RAG Custom Engine",
    stack: "Pure Python, GPT-4o-mini",
    text: "From-scratch hybrid retrieval with a custom HNSW store, Okapi BM25 and Reciprocal Rank Fusion, plus a 3-stage Self-RAG gate (retrieval decision, relevance grading, hallucination check) and contextual compression. About 20% precision gain over dense-vector baselines.",
  },
  agent: {
    title: "Conversational AI Agent (ReAct)",
    stack: "LangGraph, FastAPI, Next.js, OpenAI",
    text: "Six tools (Calculator, Weather, DateTime, Web Search, Code Interpreter, RAG Search), visible reasoning traces, WebSocket streaming and a SQLite checkpointer for memory.",
  },
  summarizer: {
    title: "Document Summarizer",
    stack: "FastAPI, Next.js 14, LangChain, ChromaDB",
    text: "Automatic strategy router (Stuff, Map-Reduce, Refine, Recursive), SSE token streaming and async pipelines. About 50% lower latency and 99% factual consistency.",
  },
  ragChroma: {
    title: "RAG LangChain Chroma",
    stack: "LangChain, ChromaDB, FastAPI",
    text: "Hybrid RAG application with dual-layer memory: in-chat session memory and cross-chat LLM-summarized memory.",
  },
  eld: {
    title: "ELD Trip Planner",
    stack: "Django, DRF, React/Vite, Leaflet, Nominatim, OSRM",
    text: "Plans truck trips against FMCSA hours-of-service rules and draws daily ELD log sheets.",
    links: [
      { label: "GitHub", url: "github.com/muzammil5539/eld-trip-planner" },
      { label: "Live", url: "eld-trip-planner-sepia.vercel.app" },
    ],
  },
  fuel: {
    title: "Fuel Route Optimizer",
    stack: "Django, OSRM",
    text: "Geocoded about 8,150 fuel stations, OSRM routing, an 8-mile corridor filter and a Dijkstra cheapest-fuel plan with a 500-mile range; regression-tested.",
    links: [{ label: "GitHub", url: "github.com/muzammil5539/django_application" }],
  },
  freight: {
    title: "Freight Rates Predictor",
    stack: "Python, scikit-learn",
    text: "End-to-end ML pipeline on spatial, load, market-index and temporal features.",
    links: [{ label: "GitHub", url: "github.com/muzammil5539/Machine-Learning-Engineer-Assessment-Ena-Spotter" }],
  },
  cvSuite: {
    title: "Computer Vision Suite",
    stack: "Python, OpenCV",
    text: "Retinal vessel segmentation (multi-level thresholding, morphology), skin lesion segmentation (connected component labeling, IoU), optical Braille recognition (contour analysis), license plate localization (edge detection), optic disc localisation.",
  },
  neurofusion: {
    title: "Neurofusion: 3D Brain Tumor Segmentation",
    stack: "PyTorch, SegFormer3D, 3D U-Net, GradCAM, FastAPI",
    text: "Final year project on multi-modal MRI (T1-CE, T2, FLAIR) from the BraTS20 dataset. SegFormer3D selected over 3D U-Net at 85%+ Dice, with GradCAM explainability. 1st Place at COMPPEC 2025 and a Departmental Silver Medal.",
  },
  luggage: {
    title: "Luggage Threat Detection",
    stack: "Python, ANN, OpenCV",
    text: "ANN architecture for image classification of potential threats in luggage images.",
  },
  qadri: {
    title: "Qadri Traders",
    stack: "E-commerce website",
    text: "Online storefront built and deployed on Vercel.",
    links: [{ label: "Live", url: "qadri-traders.vercel.app" }],
  },
} satisfies Record<string, ProjectEntry>;

export type ProjectId = keyof typeof projects;

export const education = [
  {
    title: "Bachelor of Computer Engineering",
    school: "National University of Sciences and Technology (NUST)",
    dates: "Nov 2021 – Jul 2025",
    place: "Islamabad, Pakistan",
    detail: "CGPA 3.25. Final year project: Neurofusion, 3D brain tumor segmentation (SegFormer3D, BraTS20, 85%+ Dice); 1st Place COMPPEC 2025, Departmental Silver Medal.",
  },
  {
    title: "F.Sc. Pre-Engineering",
    school: "Ghazali Premier College",
    dates: "Jun 2018 – Aug 2020",
    place: "Lahore, Pakistan",
    detail: "",
  },
];

export const certifications = [
  "IBM AI Engineering Professional Certificate",
  "IBM Generative AI Engineering Professional Certificate",
  "IBM RAG and Agentic AI Professional Certificate",
  "IBM Deep Learning with PyTorch, Keras and TensorFlow Professional Certificate",
  "Generative AI Engineering with LLMs Specialization (IBM)",
  "Large Language Model Operations (LLMOps) Specialization, Duke University",
  "Building GenAI Applications and Agents Specialization, Coursera",
  "RAG for Generative AI Applications",
  "Modern Data Strategy for Enterprise Generative AI, Fractal",
  "Informed Clinical Decision Making using Deep Learning, University of Glasgow",
  "Complete Modern C++ (C++11/14/17), Packt",
];

export const honors = ["1st Place, COMPPEC 2025", "Departmental Silver Medal"];

export interface SkillGroup {
  label: string;
  items: string;
}

export interface RoleResume {
  headline: string;
  summary: string;
  skills: SkillGroup[];
  experience: { job: JobId; bullets: BulletId[] }[];
  projects: ProjectId[];
  certifications: number[]; // indexes into `certifications`, in display order
}

const aiSkills: Record<string, SkillGroup> = {
  genai: { label: "Generative AI & Agents", items: "OpenAI API, Anthropic API, LLMs, prompt engineering, structured outputs, RAG, LLM-as-judge evaluation, LangChain, LangGraph, CrewAI, AutoGen, Model Context Protocol (MCP), n8n, ChromaDB, FAISS, custom HNSW, BM25, Reciprocal Rank Fusion" },
  ml: { label: "Machine Learning", items: "Python, PyTorch, TensorFlow, Keras, scikit-learn, CatBoost, XGBoost, AutoGluon, Hugging Face Transformers, Pandas, NumPy" },
  voice: { label: "Voice & Real-Time", items: "LiveKit, WebRTC, ElevenLabs, Silero VAD, STT/TTS, Twilio, SIP trunking, WebSockets, SSE" },
  cv: { label: "Computer Vision", items: "OpenCV, U-Net / 3D U-Net, SegFormer / SegFormer3D, YOLO, GradCAM, medical image segmentation" },
  backend: { label: "Backend & Infrastructure", items: "FastAPI, Django / DRF, REST APIs, Docker, Kubernetes, Git/GitHub, CI/CD" },
  web: { label: "Frontend & Web", items: "Next.js, React (Vite), REST APIs, WebSockets, SSE" },
  langs: { label: "Languages", items: "Python, SQL, Rust, C++, JavaScript/TypeScript" },
  domain: { label: "Domain", items: "Healthcare IT, medical imaging, AI training data" },
  analysis: { label: "Data & Analysis", items: "Python, SQL, Pandas, NumPy, feature engineering, classification, ARIMA-family forecasting, exploratory data analysis, model evaluation" },
};

export const roleResumes: Record<RoleId, RoleResume> = {
  "ai-engineer": {
    headline: "AI Engineer",
    summary:
      "AI Engineer with 1+ year of production experience building machine learning, LLM and RAG systems in Python. Delivered a claims-classification system at 95% accuracy across 42,900+ cases, cut a claim denial rate from 3.2% to 2.4%, and cut inference costs 35% through prompt caching. Computer vision background in 3D MRI brain tumor segmentation (SegFormer3D, 85%+ Dice). Skilled in PyTorch, TensorFlow, scikit-learn, LangChain, FastAPI and Docker. Open to remote work and relocation.",
    skills: [aiSkills.genai!, aiSkills.ml!, aiSkills.voice!, aiSkills.cv!, aiSkills.backend!, aiSkills.domain!],
    experience: [
      { job: "sme", bullets: ["sme_prompts", "sme_rank", "sme_bias"] },
      { job: "carecloud", bullets: ["cc_class", "cc_ftpr", "cc_n8n", "cc_voice", "cc_val", "cc_pipe"] },
      { job: "suidhaga", bullets: ["su_stack", "su_ds"] },
      { job: "freelance", bullets: ["fl_all"] },
      { job: "risetech", bullets: ["rt_bench", "rt_award"] },
    ],
    projects: ["vak", "ragEngine", "agent", "summarizer", "ragChroma"],
    certifications: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  "ml-engineer": {
    headline: "Machine Learning Engineer",
    summary:
      "Machine Learning Engineer with 1+ year of production experience shipping classification and prediction systems in Python. Built a claims-classification system (CatBoost, XGBoost, AutoGluon) at 95% accuracy across 42,900+ cases with daily feedback-loop retraining, and a denial-prediction system that cut the denial rate from 3.2% to 2.4%. Experience serving models with FastAPI, containerizing with Docker, and benchmarking deep learning models (3D U-Net vs SegFormer3D, 85%+ Dice). Open to remote work and relocation.",
    skills: [aiSkills.ml!, aiSkills.cv!, aiSkills.genai!, aiSkills.backend!, aiSkills.langs!, aiSkills.domain!],
    experience: [
      { job: "carecloud", bullets: ["cc_class", "cc_ftpr", "cc_n8n", "cc_pipe", "cc_val"] },
      { job: "risetech", bullets: ["rt_seg", "rt_bench", "rt_award"] },
      { job: "suidhaga", bullets: ["su_ds", "su_stack"] },
      { job: "freelance", bullets: ["fl_all"] },
      { job: "sme", bullets: ["sme_rank", "sme_bias"] },
    ],
    projects: ["freight", "vak", "ragEngine", "cvSuite"],
    certifications: [0, 3, 4, 5, 1, 2],
  },
  "data-scientist": {
    headline: "Data Scientist",
    summary:
      "Data scientist with 1+ year of production experience turning messy business data into measurable results. Built a claims-classification model at 95% accuracy across 42,900+ cases, designed a rule-based First-Time Pass Rate analysis by provider, payer, CPT and ICD code that cut the denial rate from 3.2% to 2.4%, and built ARIMA-family models to forecast product prices. Strong in Python, SQL, scikit-learn and gradient boosting, with deep learning and LLM experience. Open to remote work and relocation.",
    skills: [aiSkills.analysis!, aiSkills.ml!, aiSkills.genai!, aiSkills.cv!, aiSkills.backend!, aiSkills.domain!],
    experience: [
      { job: "carecloud", bullets: ["cc_class", "cc_ftpr", "cc_val", "cc_pipe", "cc_n8n"] },
      { job: "suidhaga", bullets: ["su_ds", "su_stack"] },
      { job: "risetech", bullets: ["rt_seg", "rt_bench", "rt_award"] },
      { job: "freelance", bullets: ["fl_all"] },
      { job: "sme", bullets: ["sme_rank", "sme_bias"] },
    ],
    projects: ["freight", "fuel", "summarizer", "ragEngine"],
    certifications: [0, 3, 10, 4, 5, 7, 9],
  },
  "software-engineer": {
    headline: "Software Engineer",
    summary:
      "Software engineer with 3+ years of full-stack experience (frontend UI, Django backend, end-to-end features for an e-commerce business) and 1+ year building production AI services in Python. Built FastAPI services, data pipelines and an internal EDI viewer at CareCloud, and shipped full-stack projects with Django/DRF, React, Next.js, Docker and CI/CD. Comfortable taking features from design to deployment. Open to remote work and relocation.",
    skills: [aiSkills.backend!, aiSkills.web!, aiSkills.langs!, aiSkills.genai!, aiSkills.ml!, aiSkills.domain!],
    experience: [
      { job: "carecloud", bullets: ["cc_pipe", "cc_n8n", "cc_voice", "cc_class"] },
      { job: "suidhaga", bullets: ["su_stack", "su_ds"] },
      { job: "freelance", bullets: ["fl_all"] },
      { job: "risetech", bullets: ["rt_bench"] },
    ],
    projects: ["eld", "fuel", "agent", "summarizer", "qadri"],
    certifications: [0, 1, 5, 10],
  },
  "computer-vision-engineer": {
    headline: "Computer Vision Engineer",
    summary:
      "Computer vision and medical imaging engineer who benchmarked 3D U-Net against SegFormer3D for multi-modal MRI brain tumor segmentation on BraTS20 (85%+ Dice), added GradCAM explainability and served the model with FastAPI. The work won 1st Place at COMPPEC 2025 and a Departmental Silver Medal. Also 1+ year of production ML experience in Python (PyTorch, TensorFlow, OpenCV). Open to remote work and relocation.",
    skills: [aiSkills.cv!, aiSkills.ml!, aiSkills.backend!, aiSkills.genai!, aiSkills.langs!, aiSkills.domain!],
    experience: [
      { job: "risetech", bullets: ["rt_seg", "rt_bench", "rt_award"] },
      { job: "carecloud", bullets: ["cc_class", "cc_pipe", "cc_ftpr"] },
      { job: "suidhaga", bullets: ["su_ds"] },
      { job: "freelance", bullets: ["fl_all"] },
    ],
    projects: ["neurofusion", "cvSuite", "luggage", "ragEngine"],
    certifications: [3, 9, 0, 4, 5],
  },
};
