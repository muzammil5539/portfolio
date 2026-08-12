export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  github?: string;
  live?: string;
  category?: "ai" | "ml" | "cv" | "web" | "other";
}

export const projects: Project[] = [
  {
    id: "document-summarizer",
    title: "Document Summarizer",
    description:
      "Production-grade, multi-strategy document summarization platform. Upload a PDF, DOCX, TXT, Markdown, HTML file or URL and get a structured summary streamed live, with automatic strategy routing (Stuff / Map-Reduce / Refine), PII scanning, and LLM-as-judge faithfulness scoring.",
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
    tags: ["FastAPI", "Next.js", "LangChain", "JWT Auth", "SSE Streaming", "Celery"],
    github: "https://github.com/muzammil5539/Agentic-AI-and-RAG-Projects/tree/main/projects/beginner/document-summarizer",
    category: "ai",
  },
  {
    id: "conversational-ai-agent",
    title: "Conversational AI Agent",
    description:
      "ReAct-style AI agent with tool calling, a visible live thinking panel, and real-time streaming. Built on a LangGraph state graph with persistent SQLite-backed memory, custom tools, and a Next.js chat frontend talking to a FastAPI + WebSocket backend.",
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
    tags: ["LangGraph", "FastAPI", "WebSocket", "Next.js", "ReAct Agent", "SQLite"],
    github: "https://github.com/muzammil5539/Agentic-AI-and-RAG-Projects/tree/main/projects/beginner/conversational-ai-agent",
    category: "ai",
  },
  {
    id: "rag-custom-engine",
    title: "RAG Custom Engine",
    description:
      "A complete Retrieval-Augmented Generation pipeline built entirely from scratch — no LangChain, no vector database. Custom HNSW vector store, Okapi BM25 keyword index, hybrid retrieval with Reciprocal Rank Fusion, Self-RAG adaptive retrieval, and a dual-layer memory system, all in pure Python.",
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
    tags: ["Python", "HNSW", "BM25", "Hybrid Retrieval", "Self-RAG", "FastAPI"],
    github: "https://github.com/muzammil5539/Agentic-AI-and-RAG-Projects/tree/main/projects/beginner/rag-custom-engine",
    category: "ai",
  },
  {
    id: "rag-langchain-chroma",
    title: "RAG LangChain Chroma",
    description:
      "Production-ready RAG application built with FastAPI and LangChain, featuring hybrid search (HNSW vector search + BM25), a dual-layer memory system that summarizes past sessions, and a clean single-page UI for grounded, cited answers over your own documents.",
    image: "/projects/rag-langchain-chroma/01-page-ui.png",
    images: [
      "/projects/rag-langchain-chroma/01-page-ui.png",
      "/projects/rag-langchain-chroma/02-rag-in-action-a.png",
      "/projects/rag-langchain-chroma/02-rag-in-action-b.png",
      "/projects/rag-langchain-chroma/02-rag-in-action-c.png",
    ],
    tags: ["LangChain", "ChromaDB", "FastAPI", "Hybrid Search", "GPT-4o-mini"],
    github: "https://github.com/muzammil5539/Agentic-AI-and-RAG-Projects/tree/main/projects/beginner/rag-langchain-chroma",
    category: "ai",
  },
  {
    id: "voice-ai-front-desk",
    title: "Voice AI Front Desk Agent",
    description: "Developing a real-time conversational AI agent using LiveKit, OpenAI, and ElevenLabs, integrating Silero VAD for seamless voice activity detection. Configured SIP Trunking with logic-based transfer functionality.",
    image: "/projects/voice-ai.png",
    tags: ["LiveKit", "OpenAI", "ElevenLabs", "Silero VAD", "n8n", "SIP Trunking"],
    category: "ai",
  },
  {
    id: "camera-data-pipeline",
    title: "Data Pipeline & Integrity System",
    description: "Engineered Python scripts to interface with Hikvision NVR systems for fetching raw logs, and designed logic filters to clean noisy camera data (duplicate records/non-attendance) for accurate HR tracking.",
    image: "/projects/data-pipeline.png",
    tags: ["Python", "Hikvision NVR", "Data Pipeline", "Analytics"],
    category: "cv",
  },
  {
    id: "luggage-threat-detection",
    title: "Luggage Threat Detection",
    description:
      "Developed ANN architecture for image classification of potential threats in luggage images with high accuracy in threat identification.",
    image: "/projects/luggage.jpg",
    tags: ["Python", "ANN", "OpenCV", "Image Classification"],
    category: "ai",
  },
  {
    id: "license-plate-recognition",
    title: "License Plate Recognition",
    description:
      "Created pipeline for license plate localization using edge detection and implemented robust plate isolation system.",
    image: "/projects/licencse_plate.png",
    tags: ["Python", "OpenCV", "NumPy", "Computer Vision"],
    category: "cv",
  },
  {
    id: "braille-digits-recognition",
    title: "Braille Digits Recognition",
    description:
      "Built system to recognize Braille characters through dot pattern analysis and distance metrics for character differentiation.",
    image: "/projects/Braille.png",
    tags: ["Python", "OpenCV", "Pattern Recognition"],
    category: "cv",
  },
  {
    id: "cat-dog-classification",
    title: "Cat Dog Classification",
    description:
      "Implemented CNN models with and without pooling and dropout layers, demonstrating regularization techniques.",
    image: "/projects/classification.png",
    tags: ["Python", "TensorFlow", "Keras", "CNN"],
    category: "ml",
  },
  {
    id: "skin-image-segmentation",
    title: "Skin Image Segmentation",
    description:
      "Designed segmentation system using Connected Component Labeling and achieved accurate results with IoU metrics.",
    image: "/projects/skin.png",
    tags: ["Python", "OpenCV", "Image Segmentation"],
    category: "cv",
  },
  {
    id: "retinal-image-segmentation",
    title: "Retinal Image Segmentation",
    description:
      "Developed method for segmenting retinal structures using point and multi-level thresholding techniques.",
    image: "/projects/retinal.png",
    tags: ["Python", "OpenCV", "Medical Imaging"],
    category: "cv",
  },
];
