export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  pdfUrl: string;
  thumbnailUrl?: string;
  credentialId?: string;
  skills: string[];
}

export const certificates: Certificate[] = [
  {
    id: "ibm-ai-engineering",
    title: "IBM AI Engineering Professional Certificate",
    issuer: "IBM - Coursera",
    date: "2024",
    description: "Comprehensive certification covering Machine Learning, Deep Learning, Computer Vision, and AI deployment strategies.",
    pdfUrl: "/certificates/IBM AI Engineering.pdf",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "Computer Vision", "NLP"]
  },
  {
    id: "ibm-generative-ai-engineering",
    title: "IBM Generative AI Engineering Professional Certificate",
    issuer: "IBM - Coursera",
    date: "2024",
    description: "Professional certificate covering Generative AI fundamentals, LLMs, and AI engineering practices.",
    pdfUrl: "/certificates/IBM Generative AI Engineering.pdf",
    skills: ["Generative AI", "LLMs", "Prompt Engineering", "AI Architecture", "Python"]
  },
  {
    id: "ibm-deep-learning",
    title: "IBM Deep Learning with PyTorch, Keras and TensorFlow",
    issuer: "IBM - Coursera",
    date: "2024",
    description: "In-depth training on deep learning frameworks including PyTorch, Keras, and TensorFlow for building neural networks.",
    pdfUrl: "/certificates/IBM Deep Learning with PyTorch, Keras and Tensorflow.pdf",
    skills: ["PyTorch", "Keras", "TensorFlow", "Neural Networks", "Deep Learning", "CNN", "RNN"]
  },
  {
    id: "ibm-rag-agentic-ai",
    title: "IBM RAG and Agentic AI",
    issuer: "IBM - Coursera",
    date: "2024",
    description: "Specialized certification in Retrieval-Augmented Generation (RAG) and building agentic AI systems.",
    pdfUrl: "/certificates/IBM RAG and Agentic AI.pdf",
    skills: ["RAG", "Agentic AI", "Vector Databases", "LLMs", "AI Agents", "LangChain"]
  },
  {
    id: "building-genai-applications",
    title: "Building GenAI Applications and Agents",
    issuer: "Coursera",
    date: "2024",
    description: "Hands-on certification for building Generative AI applications and intelligent agents.",
    pdfUrl: "/certificates/Building GenAI Applications and Agents.pdf",
    skills: ["Generative AI", "AI Agents", "Application Development", "LLMs", "Python"]
  },
  {
    id: "generative-ai-engineering-llms",
    title: "Generative AI Engineering with LLMs",
    issuer: "Coursera",
    date: "2024",
    description: "Advanced engineering practices for working with Large Language Models in production environments.",
    pdfUrl: "/certificates/Generative AI Engineering with LLMs.pdf",
    skills: ["LLMs", "Generative AI", "AI Engineering", "Fine-tuning", "Model Deployment"]
  },
  {
    id: "llmops",
    title: "Large Language Model Operations (LLMOps)",
    issuer: "Coursera",
    date: "2024",
    description: "Operations and deployment strategies for Large Language Models including monitoring, scaling, and maintenance.",
    pdfUrl: "/certificates/Large Language Model Operations (LLMOps).pdf",
    skills: ["LLMOps", "MLOps", "Model Deployment", "Monitoring", "CI/CD", "Cloud"]
  },
  {
    id: "rag-genai-applications",
    title: "RAG for Generative AI Applications",
    issuer: "Coursera",
    date: "2024",
    description: "Specialized training in implementing Retrieval-Augmented Generation for enhanced AI applications.",
    pdfUrl: "/certificates/RAG for Generative AI Applications.pdf",
    skills: ["RAG", "Vector Search", "Embeddings", "LLMs", "Information Retrieval"]
  },
  {
    id: "modern-data-strategy",
    title: "Modern Data Strategy for Enterprise Generative AI",
    issuer: "Coursera",
    date: "2024",
    description: "Enterprise-level data strategy and architecture for implementing Generative AI solutions.",
    pdfUrl: "/certificates/Modern Data Strategy for Enterprise Generative AI.pdf",
    skills: ["Data Strategy", "Enterprise AI", "Data Architecture", "Generative AI", "Business Intelligence"]
  },
  {
    id: "clinical-decision-making",
    title: "Informed Clinical Decision Making using Deep Learning",
    issuer: "Coursera",
    date: "2024",
    description: "Application of deep learning techniques for medical and clinical decision-making systems.",
    pdfUrl: "/certificates/Informed Clinical Decision Making using Deep Learning.pdf",
    skills: ["Healthcare AI", "Deep Learning", "Medical Imaging", "Clinical AI", "Decision Support"]
  },
  {
    id: "modern-cpp",
    title: "Complete Modern C++ (C++11/14/17)",
    issuer: "Udemy",
    date: "2024",
    description: "Comprehensive training in modern C++ features including C++11, C++14, and C++17 standards.",
    pdfUrl: "/certificates/Complete Modern Cpp Cpp11_14_17.pdf",
    skills: ["C++", "C++11", "C++14", "C++17", "Modern C++", "Systems Programming"]
  }
];
