import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { paletteInitScript } from "@/lib/palette-script";
import { defaultPaletteId, palettes, themesCss } from "@/data/themes";
import { site } from "@/data/site";
import { personSchema, websiteSchema } from "@/lib/seo";
import CustomCursor from "@/components/ui/CustomCursor";
import MotionProvider from "@/components/ui/MotionProvider";
import JsonLd from "@/components/ui/JsonLd";

// Self-hosted at build time: no render-blocking request to Google, no layout shift (font-display: swap).
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const description = site.summary;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role} Portfolio`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: ["AI Engineer", "Machine Learning", "LLM", "RAG", "Computer Vision", "Python", "PyTorch", "LangChain", "FastAPI", "Islamabad", "Pakistan"],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: `${site.name} | ${site.role} Portfolio`,
    description,
    siteName: `${site.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role} Portfolio`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes and the palette script set class / data-palette before React hydrates.
    <html lang="en" data-palette={defaultPaletteId} className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <style id="palettes" dangerouslySetInnerHTML={{ __html: themesCss() }} />
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript(palettes.map((p) => p.id)) }} />
        <JsonLd data={[personSchema(), websiteSchema()]} />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider>
          <MotionProvider>
            {children}
            <CustomCursor />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
