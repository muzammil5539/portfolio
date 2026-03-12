export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  category?: "ai" | "ml" | "cv" | "web" | "other";
}

export const projects: Project[] = [
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
