export interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description: string[];
  technologies: string[];
  video?: string;
}

export const experiences: ExperienceItem[] = [
  {
    title: "Data Trainer",
    company: "SME Solutions, Inc. via Deel - Remote",
    date: "Aug 2026 - Present",
    description: [
      "Create and review detailed prompts and responses used to train AI models across varied topics.",
      "Evaluate and rank model responses to improve accuracy in different contexts.",
      "Test models for inaccuracies and bias, validating their applicability in the target domains.",
    ],
    technologies: ["Prompt Engineering", "Model Evaluation", "AI Training Data", "Bias Testing"],
  },
  {
    title: "Junior AI Engineer",
    company: "CareCloud (MTBC) - Islamabad, Pakistan",
    date: "Jul 2025 - Aug 2026",
    description: [
      "Claims classification: delivered a production system (CatBoost, XGBoost, AutoGluon) at 95% accuracy across 42,900+ cases, with daily feedback-loop retraining.",
      "Denial prediction: built a Python resubmission system with a rule-based First-Time Pass Rate module (provider, payer, CPT, ICD), cutting the denial rate from 3.2% to 2.4% and resubmission wait from 2 weeks to 3 days.",
      "Orchestration: designed an n8n workflow acting as a Model Context Protocol (MCP) server for conversation state, prompts and call routing, cutting inference costs 35% through prompt caching.",
      "Voice AI front desk: real-time agent on LiveKit, ElevenLabs, OpenAI and Silero VAD with SIP trunking and human transfer, reducing front-desk handling time by 40%.",
      "Data tooling: Python pipelines ingesting Hikvision NVR logs into a database for HR analytics, plus a FastAPI EDI Viewer for inspecting raw healthcare claim data.",
    ],
    technologies: ["CatBoost", "XGBoost", "AutoGluon", "FastAPI", "n8n", "MCP", "LiveKit", "ElevenLabs", "OpenAI", "LangGraph", "SIP Trunking"],
  },
  {
    title: "Software / AI Engineer",
    company: "Suidhaga - Remote",
    date: "Mar 2022 - Nov 2025",
    description: [
      "Progressed from frontend UI to Django backend to full-stack web features end-to-end over 3+ years for an e-commerce business.",
      "Applied data analysis and data science to business data and built ARIMA-family models to forecast product prices.",
    ],
    technologies: ["Django", "REST APIs", "ARIMA", "Data Analysis", "Python"],
  },
  {
    title: "Freelance AI Engineer",
    company: "Independent - Remote",
    date: "Sep 2022 - Present",
    description: [
      "Delivered client AI projects, including model training and applied AI application builds, alongside full-time studies and work.",
    ],
    technologies: ["Python", "Model Training", "Applied AI"],
  },
  {
    title: "AI/ML Research Intern",
    company: "Risetech - Rawalpindi/Islamabad, Pakistan",
    date: "Jul 2024 - Aug 2024",
    description: [
      "Segmented brain tumor regions from multi-modal MRI (T1-CE, T2, FLAIR) on the BraTS20 dataset.",
      "Benchmarked 3D U-Net against SegFormer3D and selected SegFormer3D (85%+ Dice); used GradCAM for explainability and FastAPI for serving.",
      "The work became the Neurofusion FYP: 1st Place at COMPPEC 2025 and a Departmental Silver Medal.",
    ],
    technologies: ["PyTorch", "SegFormer3D", "3D U-Net", "GradCAM", "FastAPI", "Medical Imaging"],
    video: "/projects/Segformer3D.mp4",
  },
];
