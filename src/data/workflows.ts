/**
 * Ordered steps of each project's workflow diagram, keyed by project id.
 * Rendered by components/projects/WorkflowDiagram.tsx (theme-aware) and by scripts/generate-workflows.mjs (static SVG).
 */
export const workflows: Record<string, string[]> = {
  "verifiable-agent-kernel": ["Agent action request", "Cedar ABAC policy check", "Z3 formal verification", "WASM-sandboxed tool", "Merkle-DAG memory", "Verified result"],
  "claims-classification": ["Claims data", "Feature engineering", "CatBoost, XGBoost, AutoGluon", "Category prediction", "Staff feedback", "Daily retraining"],
  "eld-trip-planner": ["Trip inputs", "Nominatim geocoding", "OSRM route", "FMCSA hours-of-service rules", "Daily ELD log sheets", "Leaflet map"],
  "fuel-route-optimizer": ["Route request", "~8,150 geocoded stations", "OSRM routing", "8-mile corridor filter", "Dijkstra cheapest plan", "Fuel stops"],
  "freight-rates-predictor": ["Load and lane data", "Spatial, market and time features", "scikit-learn pipeline", "Train and validate", "Rate prediction"],
  "qadri-traders": ["Visitor", "Online storefront", "Product pages", "Deployed on Vercel"],
  "document-summarizer": ["Upload PDF, DOCX or URL", "Parse and PII scan", "Strategy router", "LangChain summarizer", "SSE token stream", "Faithfulness score"],
  "conversational-ai-agent": ["User message", "FastAPI WebSocket", "LangGraph ReAct loop", "Tool calls", "SQLite checkpointer", "Streamed reply and reasoning"],
  "rag-custom-engine": ["Documents", "Chunk and embed", "HNSW and BM25 indexes", "Reciprocal Rank Fusion", "Self-RAG gate", "Grounded answer"],
  "rag-langchain-chroma": ["Documents", "ChromaDB and BM25", "Hybrid search", "Session and cross-chat memory", "GPT-4o-mini", "Cited answer"],
  "voice-ai-front-desk": ["Inbound call over SIP", "LiveKit room and Silero VAD", "Speech to text", "OpenAI agent with n8n MCP", "ElevenLabs voice", "Transfer to human"],
  "camera-data-pipeline": ["Hikvision NVR logs", "Python fetch", "Clean duplicates and non-attendance", "Database", "HR attendance analytics"],
  "luggage-threat-detection": ["Luggage images", "Preprocessing", "ANN classifier", "Threat or safe"],
  "license-plate-recognition": ["Vehicle image", "Edge detection", "Plate localization", "Plate isolation"],
  "braille-digits-recognition": ["Braille image", "Dot detection", "Dot-pattern analysis", "Distance-metric matching", "Recognized digit"],
  "cat-dog-classification": ["Cat and dog images", "CNN without pooling or dropout", "CNN with pooling and dropout", "Compare regularization"],
  "skin-image-segmentation": ["Skin image", "Thresholding", "Connected component labeling", "Lesion mask", "IoU evaluation"],
  "neurofusion-brain-tumor-segmentation": ["Multi-modal MRI (T1-CE, T2, FLAIR)", "BraTS20 preprocessing", "3D U-Net vs SegFormer3D benchmark", "SegFormer3D selected", "GradCAM explainability", "FastAPI serving"],
  "retinal-image-segmentation": ["Retinal image", "Point thresholding", "Multi-level thresholding", "Morphological cleanup", "Vessel mask"],
};
