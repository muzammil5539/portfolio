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
    id: "ibm-ai-engineer",
    title: "IBM AI Engineer Professional Certificate",
    issuer: "IBM - Coursera",
    date: "2024",
    description: "Comprehensive certification covering Machine Learning, Deep Learning, Computer Vision, and AI deployment strategies.",
    pdfUrl: "/certifications/ibm-ai-engineer.pdf",
    credentialId: "IBM-AI-2024",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "Computer Vision", "NLP"]
  },
  {
    id: "machine-learning-python",
    title: "Machine Learning with Python",
    issuer: "IBM - Coursera",
    date: "2024",
    description: "Advanced machine learning techniques including regression, classification, clustering, and neural networks using Python.",
    pdfUrl: "/certifications/ml-python.pdf",
    skills: ["Python", "Scikit-learn", "Pandas", "NumPy", "Supervised Learning", "Unsupervised Learning"]
  },
  {
    id: "deep-learning",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI - Coursera",
    date: "2024",
    description: "In-depth coverage of neural networks, CNNs, RNNs, and modern deep learning architectures.",
    pdfUrl: "/certifications/deep-learning.pdf",
    skills: ["Neural Networks", "CNN", "RNN", "TensorFlow", "Keras", "Transfer Learning"]
  },
  {
    id: "computer-vision",
    title: "Computer Vision & Image Processing",
    issuer: "IBM",
    date: "2024",
    description: "Specialized training in computer vision techniques, image processing, and object detection.",
    pdfUrl: "/certifications/computer-vision.pdf",
    skills: ["OpenCV", "Image Processing", "Object Detection", "Image Segmentation", "CNN"]
  }
];
