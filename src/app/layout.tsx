import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Syne } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-serif-var",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const sans = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

const display = Syne({
  variable: "--font-display-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rick's Cafe | A Culinary Journey",
  description:
    "Meticulous restaurant reviews documenting a culinary journey — one meal at a time.",
};

export const viewport: Viewport = {
  themeColor: "#1a1410",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${display.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <main className="min-h-screen pb-20 md:pb-0 md:pt-0">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
