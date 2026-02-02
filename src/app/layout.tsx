import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: {
    default: "Muzammil Nawaz Khan | AI Engineer Portfolio",
    template: "%s | Muzammil Nawaz Khan",
  },
  description: "AI Engineer specializing in machine learning, deep learning, and computer vision. NUST graduate with expertise in neural networks and biomedical AI.",
  keywords: ["AI Engineer", "Machine Learning", "Deep Learning", "Computer Vision", "Python", "TensorFlow", "PyTorch", "Next.js", "React"],
  authors: [{ name: "Muzammil Nawaz Khan" }],
  creator: "Muzammil Nawaz Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muzammil5539.vercel.app",
    title: "Muzammil Nawaz Khan | AI Engineer Portfolio",
    description: "AI Engineer specializing in machine learning, deep learning, and computer vision. NUST graduate with expertise in neural networks and biomedical AI.",
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
    <html lang="en" className="dark">
      <body className="font-sans bg-ai-navy text-ai-text antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
