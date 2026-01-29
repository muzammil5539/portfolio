import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Muzammil Nawaz Khan | AI Engineer Portfolio",
  description: "AI Engineer specializing in machine learning, deep learning, and computer vision. NUST graduate with expertise in neural networks and biomedical AI.",
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
