export type ProjectCategory = "ml" | "genai" | "vision" | "backend";
export type ProjectSize = "lg" | "md" | "sm";

/**
 * Adding a project = adding one entry below. The slug (id) becomes /projects/<id>,
 * `size` sets its tile in the bento grid, and `category` picks its theme-aware colour.
 * Run `node scripts/generate-workflows.mjs` after adding a workflow in that script.
 */
export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  size: ProjectSize;
  /** One-line headline result shown on the card. */
  outcome: string;
  description: string;
  problem: string;
  approach: string[];
  results: string[];
  stack: string[];
  tags: string[];
  image: string;
  images?: string[];
  workflow: string;
  video?: string;
  github?: string;
  live?: string;
}

export const categories: Record<ProjectCategory, { label: string; text: string; dot: string; tint: string }> = {
  ml: { label: "Machine learning", text: "text-cat-ml", dot: "bg-cat-ml", tint: "bg-[color-mix(in_srgb,var(--cat-ml)_14%,transparent)]" },
  genai: { label: "GenAI & agents", text: "text-cat-genai", dot: "bg-cat-genai", tint: "bg-[color-mix(in_srgb,var(--cat-genai)_14%,transparent)]" },
  vision: { label: "Computer vision", text: "text-cat-vision", dot: "bg-cat-vision", tint: "bg-[color-mix(in_srgb,var(--cat-vision)_14%,transparent)]" },
  backend: { label: "Backend & data", text: "text-cat-backend", dot: "bg-cat-backend", tint: "bg-[color-mix(in_srgb,var(--cat-backend)_14%,transparent)]" },
};

export const projects: Project[] = [
  {
    id: "verifiable-agent-kernel",
    title: "Verifiable Agent Kernel (VAK)",
    category: "genai",
    size: "lg",
    outcome: "v1.0 · 80%+ test coverage",
    description:
      "Deterministic control plane for LLM agents. Least-privilege ABAC, WASM-sandboxed tools, Z3 formal verification before execution, 3-tier memory (Merkle DAG), multi-agent debate with quadratic-voting consensus, and a PRM fine-tuning toolkit. v1.0 with 80%+ test coverage and LangChain/AutoGPT/MCP adapters.",
    problem:
      "LLM agents act through tools with real side effects, yet their behaviour is non-deterministic and hard to audit. Teams need hard guarantees about what an agent may do before it does it.",
    approach: [
      "Least-privilege access control with Cedar/ABAC policies",
      "Tools run inside a WASM sandbox",
      "Z3 formal verification checks each action before it executes",
      "Three-tier memory backed by a Merkle DAG",
      "Multi-agent debate with quadratic-voting consensus, plus a PRM fine-tuning toolkit",
    ],
    results: [
      "v1.0 release with 80%+ test coverage",
      "CI/CD on Docker and Kubernetes",
      "Adapters for LangChain, AutoGPT and MCP",
    ],
    stack: ["Rust", "Python", "WASM", "Cedar / ABAC", "Z3", "Docker", "Kubernetes", "MCP"],
    tags: ["Rust", "Python", "WASM", "Cedar/ABAC", "Z3", "MCP"],
    image: "/projects/workflows/verifiable-agent-kernel.svg",
    workflow: "/projects/workflows/verifiable-agent-kernel.svg",
    github: "https://github.com/muzammil5539/Verifiable-Agent-Kernel-VAK-",
  },
  {
    id: "claims-classification",
    title: "Healthcare Claims Classification",
    category: "ml",
    size: "lg",
    outcome: "95% accuracy · 42,900+ claims",
    description:
      "Production classification system (CatBoost, XGBoost, AutoGluon) at 95% accuracy across 42,900+ claims with daily feedback-loop retraining, paired with a denial-prediction and First-Time Pass Rate module that cut the denial rate from 3.2% to 2.4%.",
    problem:
      "Healthcare claims arrive in volume and denials are slow and costly. Claims had to be sorted into categories automatically, and denials predicted before resubmission.",
    approach: [
      "CatBoost, XGBoost and AutoGluon models for parent and category classification",
      "Daily feedback-loop retraining from staff corrections",
      "Rule-based First-Time Pass Rate module comparing rejected against corrected or paid claims by provider, payer, CPT and ICD code",
      "Validation agent that layers rule-based checks with generated root-cause analysis and corrective actions for each flagged case",
    ],
    results: [
      "95% parent-model accuracy and 92%+ category-level accuracy across 42,900+ cases",
      "Claim denial rate cut from 3.2% to 2.4%",
      "Resubmission wait cut from 2 weeks to 3 days",
    ],
    stack: ["Python", "CatBoost", "XGBoost", "AutoGluon", "FastAPI"],
    tags: ["CatBoost", "XGBoost", "AutoGluon", "Python", "Healthcare"],
    image: "/projects/workflows/claims-classification.svg",
    workflow: "/projects/workflows/claims-classification.svg",
  },
  {
    id: "eld-trip-planner",
    title: "ELD Trip Planner",
    category: "backend",
    size: "md",
    outcome: "Daily ELD log sheets from a planned trip",
    description:
      "Plans truck trips against FMCSA hours-of-service rules and draws daily ELD log sheets, with route planning on Leaflet, Nominatim and OSRM.",
    problem:
      "Truck drivers must plan trips around FMCSA hours-of-service limits and keep daily electronic logging device (ELD) log sheets.",
    approach: [
      "Geocode stops with Nominatim and route with OSRM",
      "Apply FMCSA hours-of-service rules along the route",
      "Draw the daily ELD log sheets",
      "Django/DRF API with a React (Vite) and Leaflet frontend",
    ],
    results: [
      "Live demo deployed on Vercel",
      "Generates daily ELD log sheets for a planned trip",
    ],
    stack: ["Django", "DRF", "React", "Vite", "Leaflet", "Nominatim", "OSRM"],
    tags: ["Django", "DRF", "React", "Vite", "Leaflet", "OSRM"],
    image: "/projects/workflows/eld-trip-planner.svg",
    workflow: "/projects/workflows/eld-trip-planner.svg",
    github: "https://github.com/muzammil5539/eld-trip-planner",
    live: "https://eld-trip-planner-sepia.vercel.app/",
  },
  {
    id: "document-summarizer",
    title: "Document Summarizer",
    category: "genai",
    size: "md",
    outcome: "~50% lower latency · 99% factual consistency",
    description:
      "Production-grade, multi-strategy document summarization platform. Upload a PDF, DOCX, TXT, Markdown, HTML file or URL and get a structured summary streamed live, with automatic strategy routing (Stuff / Map-Reduce / Refine / Recursive), PII scanning, and LLM-as-judge faithfulness scoring.",
    problem:
      "Long documents need summaries that stay faithful to the source, whatever the format or length.",
    approach: [
      "Upload PDF, DOCX, TXT, Markdown, HTML or a URL",
      "Automatic strategy router: Stuff, Map-Reduce, Refine and Recursive",
      "PII scanning before summarization",
      "Summary streamed live over SSE, scored by an LLM-as-judge for faithfulness",
      "FastAPI, Celery, Next.js 14 and LangChain with JWT auth",
    ],
    results: [
      "~50% lower latency",
      "99% factual consistency",
    ],
    stack: ["FastAPI", "Next.js 14", "LangChain", "ChromaDB", "Celery", "SSE"],
    tags: ["FastAPI", "Next.js", "LangChain", "JWT Auth", "SSE Streaming", "Celery"],
    image: "/projects/document-summarizer/01_login_page.png",
    images: [
      "/projects/document-summarizer/01_login_page.png",
      "/projects/document-summarizer/02_register_page.png",
      "/projects/document-summarizer/03_documents_dashboard.png",
      "/projects/document-summarizer/04_document_detail.png",
      "/projects/document-summarizer/05_summary_form_auto.png",
      "/projects/document-summarizer/06_summary_streaming.png",
      "/projects/document-summarizer/07_summary_auto_result.png",
      "/projects/document-summarizer/08_summary_mapreduce_result.png",
      "/projects/document-summarizer/09_summary_refine_result.png",
    ],
    workflow: "/projects/workflows/document-summarizer.svg",
    github: "https://github.com/muzammil5539/Agentic-AI-and-RAG-Projects/tree/main/projects/beginner/document-summarizer",
  },
  {
    id: "conversational-ai-agent",
    title: "Conversational AI Agent",
    category: "genai",
    size: "md",
    outcome: "6 tools · live reasoning traces",
    description:
      "ReAct-style AI agent with tool calling, a visible live thinking panel, and real-time streaming. Built on a LangGraph state graph with persistent SQLite-backed memory, custom tools, and a Next.js chat frontend talking to a FastAPI + WebSocket backend.",
    problem:
      "Show how an agent reasons and uses tools instead of hiding it behind a chat box.",
    approach: [
      "LangGraph ReAct state graph with six tools: Calculator, Weather, DateTime, Web Search, Code Interpreter and RAG Search",
      "Live thinking panel with visible reasoning traces, streamed over WebSocket",
      "SQLite checkpointer for persistent memory",
      "FastAPI backend and a Next.js chat frontend",
    ],
    results: [
      "Visible reasoning for every tool call",
      "Memory that persists across conversations",
    ],
    stack: ["LangGraph", "FastAPI", "WebSocket", "Next.js", "SQLite", "OpenAI"],
    tags: ["LangGraph", "FastAPI", "WebSocket", "Next.js", "ReAct Agent", "SQLite"],
    image: "/projects/conversational-ai-agent/03_chat_welcome_screen.png",
    images: [
      "/projects/conversational-ai-agent/01_onboarding_modal.png",
      "/projects/conversational-ai-agent/02_api_key_setup.png",
      "/projects/conversational-ai-agent/03_chat_welcome_screen.png",
      "/projects/conversational-ai-agent/04_thinking_panel_live.png",
      "/projects/conversational-ai-agent/05_calculator_result.png",
      "/projects/conversational-ai-agent/06_weather_tool_result.png",
      "/projects/conversational-ai-agent/07_reasoning_panel_expanded.png",
      "/projects/conversational-ai-agent/08_multi_turn_chat.png",
      "/projects/conversational-ai-agent/09_persistent_memory_recall.png",
      "/projects/conversational-ai-agent/10_backend_swagger_overview.png",
      "/projects/conversational-ai-agent/11_backend_api_endpoints.png",
    ],
    workflow: "/projects/workflows/conversational-ai-agent.svg",
    github: "https://github.com/muzammil5539/Agentic-AI-and-RAG-Projects/tree/main/projects/beginner/conversational-ai-agent",
  },
  {
    id: "rag-custom-engine",
    title: "RAG Custom Engine",
    category: "genai",
    size: "md",
    outcome: "~20% precision gain over dense baselines",
    description:
      "A complete Retrieval-Augmented Generation pipeline built entirely from scratch — no LangChain, no vector database. Custom HNSW vector store, Okapi BM25 and Reciprocal Rank Fusion, a 3-stage Self-RAG gate (retrieval decision, relevance grading, hallucination check) and contextual compression, all in pure Python. ~20% precision gain over dense-vector baselines.",
    problem:
      "Understand retrieval-augmented generation end to end by building it without a framework or a vector database.",
    approach: [
      "Custom HNSW vector store and Okapi BM25 keyword index in pure Python",
      "Hybrid retrieval with Reciprocal Rank Fusion",
      "3-stage Self-RAG gate: retrieval decision, relevance grading and hallucination check",
      "Contextual compression and a dual-layer memory system",
      "GPT-4o-mini for generation",
    ],
    results: [
      "~20% precision gain over dense-vector baselines",
    ],
    stack: ["Python", "HNSW", "BM25", "Self-RAG", "FastAPI", "GPT-4o-mini"],
    tags: ["Python", "HNSW", "BM25", "Hybrid Retrieval", "Self-RAG", "FastAPI"],
    image: "/projects/rag-custom-engine/01-app-overview.png",
    images: [
      "/projects/rag-custom-engine/01-app-overview.png",
      "/projects/rag-custom-engine/02-pipeline-config.png",
      "/projects/rag-custom-engine/03-document-upload.png",
      "/projects/rag-custom-engine/04-pipeline-trace.png",
      "/projects/rag-custom-engine/05-pipeline-trace-details.png",
      "/projects/rag-custom-engine/06-system-architecture.png",
      "/projects/rag-custom-engine/07-rag-answer.png",
      "/projects/rag-custom-engine/08-cross-session-memory.png",
    ],
    workflow: "/projects/workflows/rag-custom-engine.svg",
    github: "https://github.com/muzammil5539/Agentic-AI-and-RAG-Projects/tree/main/projects/beginner/rag-custom-engine",
  },
  {
    id: "voice-ai-front-desk",
    title: "Voice AI Front Desk Agent",
    category: "genai",
    size: "md",
    outcome: "−40% front-desk handling time",
    description:
      "Developing a real-time conversational AI agent using LiveKit, OpenAI, and ElevenLabs, integrating Silero VAD for seamless voice activity detection. Configured SIP Trunking with logic-based transfer functionality.",
    problem:
      "Front-desk staff spent their time on routine inbound calls.",
    approach: [
      "Real-time agent on LiveKit (WebRTC) with ElevenLabs TTS and OpenAI models",
      "Silero VAD for low-latency interruption handling",
      "Twilio/SIP trunking for inbound calls, with transfer to human staff",
      "LangGraph for multi-state orchestration; an n8n workflow acting as an MCP server for conversation state, prompts and routing",
    ],
    results: [
      "Front-desk handling time reduced by 40%",
      "Inference cost cut 35% through prompt caching",
    ],
    stack: ["LiveKit", "ElevenLabs", "OpenAI", "Silero VAD", "LangGraph", "n8n", "SIP"],
    tags: ["LiveKit", "OpenAI", "ElevenLabs", "Silero VAD", "n8n", "SIP Trunking"],
    image: "/projects/voice-ai.png",
    workflow: "/projects/workflows/voice-ai-front-desk.svg",
  },
  {
    id: "neurofusion-brain-tumor-segmentation",
    title: "Neurofusion: 3D Brain Tumor Segmentation",
    category: "vision",
    size: "md",
    outcome: "85%+ Dice · 1st Place COMPPEC 2025",
    description:
      "Final year project: segmenting brain tumor regions from multi-modal MRI (T1-CE, T2, FLAIR) on the BraTS20 dataset. Benchmarked 3D U-Net against SegFormer3D, selected SegFormer3D, and used GradCAM for explainability and FastAPI for serving.",
    problem:
      "Segment brain tumor regions from multi-modal MRI (T1-CE, T2, FLAIR) accurately, and in a way clinicians can inspect.",
    approach: [
      "BraTS20 dataset with multi-modal MRI inputs",
      "Benchmarked 3D U-Net against SegFormer3D and selected SegFormer3D",
      "GradCAM for explainability and FastAPI for serving",
    ],
    results: [
      "85%+ Dice score",
      "1st Place at COMPPEC 2025",
      "Departmental Silver Medal",
    ],
    stack: ["PyTorch", "SegFormer3D", "3D U-Net", "GradCAM", "FastAPI"],
    tags: ["PyTorch", "SegFormer3D", "3D U-Net", "GradCAM", "FastAPI"],
    image: "/projects/workflows/neurofusion-brain-tumor-segmentation.svg",
    workflow: "/projects/workflows/neurofusion-brain-tumor-segmentation.svg",
    video: "/projects/Segformer3D.mp4",
  },
  {
    id: "fuel-route-optimizer",
    title: "Fuel Route Optimizer",
    category: "backend",
    size: "sm",
    outcome: "~8,150 stations · 500-mile range plan",
    description:
      "Geocoded ~8,150 fuel stations with OSRM routing, an 8-mile corridor filter and a Dijkstra cheapest-fuel plan with a 500-mile range. Regression-tested.",
    problem:
      "Find the cheapest places to refuel along a route while staying within a vehicle's range.",
    approach: [
      "Geocode ~8,150 fuel stations",
      "Route with OSRM and keep stations within an 8-mile corridor",
      "Dijkstra search for the cheapest fuel plan with a 500-mile range",
      "Django service with regression tests",
    ],
    results: [
      "Cheapest-fuel plan for a 500-mile range",
      "Regression-tested",
    ],
    stack: ["Django", "OSRM", "Dijkstra", "Geocoding"],
    tags: ["Django", "OSRM", "Dijkstra", "Geocoding"],
    image: "/projects/workflows/fuel-route-optimizer.svg",
    workflow: "/projects/workflows/fuel-route-optimizer.svg",
    github: "https://github.com/muzammil5539/django_application",
  },
  {
    id: "freight-rates-predictor",
    title: "Freight Rates Predictor",
    category: "ml",
    size: "sm",
    outcome: "End-to-end scikit-learn pipeline",
    description:
      "End-to-end ML pipeline on spatial, load, market-index and temporal features.",
    problem:
      "Predict freight rates from load and market data.",
    approach: [
      "Features built from spatial, load, market-index and temporal data",
      "End-to-end scikit-learn pipeline from raw data to prediction",
    ],
    results: [
      "Complete training-to-prediction pipeline",
    ],
    stack: ["Python", "scikit-learn", "Feature engineering"],
    tags: ["scikit-learn", "Python", "Feature Engineering"],
    image: "/projects/workflows/freight-rates-predictor.svg",
    workflow: "/projects/workflows/freight-rates-predictor.svg",
    github: "https://github.com/muzammil5539/Machine-Learning-Engineer-Assessment-Ena-Spotter",
  },
  {
    id: "qadri-traders",
    title: "Qadri Traders",
    category: "backend",
    size: "sm",
    outcome: "Live e-commerce website",
    description:
      "E-commerce website built and deployed on Vercel.",
    problem:
      "Qadri Traders needed an online storefront for its products.",
    approach: [
      "E-commerce website built and deployed on Vercel",
    ],
    results: [
      "Live at qadri-traders.vercel.app",
    ],
    stack: ["E-commerce", "Vercel"],
    tags: ["E-commerce", "Vercel"],
    image: "/projects/workflows/qadri-traders.svg",
    workflow: "/projects/workflows/qadri-traders.svg",
    live: "https://qadri-traders.vercel.app/",
  },
  {
    id: "rag-langchain-chroma",
    title: "RAG LangChain Chroma",
    category: "genai",
    size: "sm",
    outcome: "Hybrid search + dual-layer memory",
    description:
      "Production-ready RAG application built with FastAPI and LangChain, featuring hybrid search (HNSW vector search + BM25), a dual-layer memory system that summarizes past sessions, and a clean single-page UI for grounded, cited answers over your own documents.",
    problem:
      "Answer questions over your own documents with grounded, cited responses.",
    approach: [
      "Hybrid search combining HNSW vector search and BM25 in ChromaDB",
      "Dual-layer memory: in-chat session memory and LLM-summarized cross-chat memory",
      "FastAPI backend with a single-page UI and GPT-4o-mini",
    ],
    results: [
      "Cited answers grounded in uploaded documents",
    ],
    stack: ["LangChain", "ChromaDB", "FastAPI", "GPT-4o-mini"],
    tags: ["LangChain", "ChromaDB", "FastAPI", "Hybrid Search", "GPT-4o-mini"],
    image: "/projects/rag-langchain-chroma/01-page-ui.png",
    images: [
      "/projects/rag-langchain-chroma/01-page-ui.png",
      "/projects/rag-langchain-chroma/02-rag-in-action-a.png",
      "/projects/rag-langchain-chroma/02-rag-in-action-b.png",
      "/projects/rag-langchain-chroma/02-rag-in-action-c.png",
    ],
    workflow: "/projects/workflows/rag-langchain-chroma.svg",
    github: "https://github.com/muzammil5539/Agentic-AI-and-RAG-Projects/tree/main/projects/beginner/rag-langchain-chroma",
  },
  {
    id: "camera-data-pipeline",
    title: "Data Pipeline & Integrity System",
    category: "backend",
    size: "sm",
    outcome: "Clean attendance data from NVR logs",
    description:
      "Engineered Python scripts to interface with Hikvision NVR systems for fetching raw logs, and designed logic filters to clean noisy camera data (duplicate records/non-attendance) for accurate HR tracking.",
    problem:
      "Raw attendance logs from Hikvision NVR cameras were noisy, with duplicate records and non-attendance events.",
    approach: [
      "Python scripts pull raw logs from Hikvision NVR systems",
      "Logic filters remove duplicate records and non-attendance events",
      "Cleaned data loaded into a database for HR attendance analytics",
    ],
    results: [
      "Accurate HR attendance tracking from camera data",
    ],
    stack: ["Python", "Hikvision NVR", "Data pipeline"],
    tags: ["Python", "Hikvision NVR", "Data Pipeline", "Analytics"],
    image: "/projects/data-pipeline.png",
    workflow: "/projects/workflows/camera-data-pipeline.svg",
  },
  {
    id: "luggage-threat-detection",
    title: "Luggage Threat Detection",
    category: "vision",
    size: "sm",
    outcome: "ANN threat classifier",
    description:
      "Developed ANN architecture for image classification of potential threats in luggage images with high accuracy in threat identification.",
    problem:
      "Spot potential threats in luggage images.",
    approach: [
      "ANN architecture for image classification",
      "OpenCV preprocessing",
    ],
    results: [
      "High accuracy in threat identification",
    ],
    stack: ["Python", "ANN", "OpenCV"],
    tags: ["Python", "ANN", "OpenCV", "Image Classification"],
    image: "/projects/luggage.jpg",
    workflow: "/projects/workflows/luggage-threat-detection.svg",
  },
  {
    id: "license-plate-recognition",
    title: "License Plate Recognition",
    category: "vision",
    size: "sm",
    outcome: "Edge-based plate localization",
    description:
      "Created pipeline for license plate localization using edge detection and implemented robust plate isolation system.",
    problem:
      "Locate license plates in vehicle images.",
    approach: [
      "Edge detection for plate localization",
      "Robust plate isolation",
    ],
    results: [
      "Working localization and isolation pipeline",
    ],
    stack: ["Python", "OpenCV", "NumPy"],
    tags: ["Python", "OpenCV", "NumPy", "Computer Vision"],
    image: "/projects/licencse_plate.png",
    workflow: "/projects/workflows/license-plate-recognition.svg",
  },
  {
    id: "braille-digits-recognition",
    title: "Braille Digits Recognition",
    category: "vision",
    size: "sm",
    outcome: "Dot-pattern digit recognition",
    description:
      "Built system to recognize Braille characters through dot pattern analysis and distance metrics for character differentiation.",
    problem:
      "Recognize Braille characters from images.",
    approach: [
      "Dot pattern analysis",
      "Distance metrics to differentiate characters",
    ],
    results: [
      "Recognizes Braille digits from dot patterns",
    ],
    stack: ["Python", "OpenCV", "Pattern recognition"],
    tags: ["Python", "OpenCV", "Pattern Recognition"],
    image: "/projects/Braille.png",
    workflow: "/projects/workflows/braille-digits-recognition.svg",
  },
  {
    id: "cat-dog-classification",
    title: "Cat Dog Classification",
    category: "ml",
    size: "sm",
    outcome: "CNN regularization comparison",
    description:
      "Implemented CNN models with and without pooling and dropout layers, demonstrating regularization techniques.",
    problem:
      "Show how pooling and dropout change a CNN's behaviour.",
    approach: [
      "CNN models with and without pooling and dropout layers",
      "Side-by-side comparison of the regularization effect",
    ],
    results: [
      "Clear comparison of regularization techniques",
    ],
    stack: ["Python", "TensorFlow", "Keras", "CNN"],
    tags: ["Python", "TensorFlow", "Keras", "CNN"],
    image: "/projects/classification.png",
    workflow: "/projects/workflows/cat-dog-classification.svg",
  },
  {
    id: "skin-image-segmentation",
    title: "Skin Image Segmentation",
    category: "vision",
    size: "sm",
    outcome: "Segmentation scored with IoU",
    description:
      "Designed segmentation system using Connected Component Labeling and achieved accurate results with IoU metrics.",
    problem:
      "Segment skin lesions from images.",
    approach: [
      "Connected Component Labeling",
      "IoU metric to evaluate masks",
    ],
    results: [
      "Accurate segmentation results measured by IoU",
    ],
    stack: ["Python", "OpenCV", "Image segmentation"],
    tags: ["Python", "OpenCV", "Image Segmentation"],
    image: "/projects/skin.png",
    workflow: "/projects/workflows/skin-image-segmentation.svg",
  },
  {
    id: "retinal-image-segmentation",
    title: "Retinal Image Segmentation",
    category: "vision",
    size: "sm",
    outcome: "Vessel segmentation by thresholding",
    description:
      "Developed method for segmenting retinal structures using point and multi-level thresholding techniques.",
    problem:
      "Segment retinal structures such as vessels.",
    approach: [
      "Point thresholding and multi-level thresholding",
      "Morphological operations to clean the mask",
    ],
    results: [
      "Segmented retinal structures without a learned model",
    ],
    stack: ["Python", "OpenCV", "Medical imaging"],
    tags: ["Python", "OpenCV", "Medical Imaging"],
    image: "/projects/retinal.png",
    workflow: "/projects/workflows/retinal-image-segmentation.svg",
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);

export function getAdjacentProjects(id: string) {
  const i = projects.findIndex((p) => p.id === id);
  return { previous: i > 0 ? projects[i - 1] : undefined, next: i >= 0 ? projects[i + 1] : undefined };
}
