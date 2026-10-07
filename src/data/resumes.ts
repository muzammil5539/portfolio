/** Downloadable résumés, one per target role. The first entry is the default linked from the site. */
export const resumeRoles = [
  {
    id: "ai-engineer",
    label: "AI Engineer",
    blurb: "LLMs, RAG, agents and voice AI",
    file: "/resumes/Muzammil-Nawaz-Khan-AI-Engineer.pdf",
  },
  {
    id: "ml-engineer",
    label: "Machine Learning Engineer",
    blurb: "Production models, retraining, serving",
    file: "/resumes/Muzammil-Nawaz-Khan-ML-Engineer.pdf",
  },
  {
    id: "data-scientist",
    label: "Data Scientist",
    blurb: "Analysis, forecasting, classification",
    file: "/resumes/Muzammil-Nawaz-Khan-Data-Scientist.pdf",
  },
  {
    id: "software-engineer",
    label: "Software Engineer",
    blurb: "Full-stack, Django, FastAPI, Next.js",
    file: "/resumes/Muzammil-Nawaz-Khan-Software-Engineer.pdf",
  },
  {
    id: "computer-vision-engineer",
    label: "Computer Vision Engineer",
    blurb: "Medical imaging and segmentation",
    file: "/resumes/Muzammil-Nawaz-Khan-Computer-Vision-Engineer.pdf",
  },
] as const;

export type RoleId = (typeof resumeRoles)[number]["id"];

export const defaultResume = resumeRoles[0];
