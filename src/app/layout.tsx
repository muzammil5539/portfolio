import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://muzammil5539.vercel.app"),
  title: {
    default: "Muzammil Nawaz Khan | AI Engineer Portfolio",
    template: "%s | Muzammil Nawaz Khan",
  },
  description: "AI Engineer building production machine learning, LLM and RAG systems in Python. 95% accuracy claims classification, 35% lower inference cost, and 3D MRI brain tumor segmentation (SegFormer3D). NUST graduate, based in Islamabad.",
  keywords: ["AI Engineer", "Machine Learning", "Deep Learning", "Computer Vision", "Python", "TensorFlow", "PyTorch", "LLM", "RAG", "LangChain", "FastAPI", "Next.js"],
  authors: [{ name: "Muzammil Nawaz Khan" }],
  creator: "Muzammil Nawaz Khan",
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muzammil5539.vercel.app",
    title: "Muzammil Nawaz Khan | AI Engineer Portfolio",
    description: "AI Engineer building production machine learning, LLM and RAG systems in Python. 95% accuracy claims classification, 35% lower inference cost, and 3D MRI brain tumor segmentation (SegFormer3D). NUST graduate, based in Islamabad.",
    siteName: "Muzammil Nawaz Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muzammil Nawaz Khan | AI Engineer Portfolio",
    description: "AI Engineer specializing in machine learning, deep learning, and computer vision.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
