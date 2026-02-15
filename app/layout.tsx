import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whiz | Gentle Focus",
  description: "A calm, privacy-first nudge that signals your nervous system to rest before you reach burnout.",
};

import NavBar from "@/components/NavBar";
import SiteAssistant from "@/components/SiteAssistant";
import IntroOverlay from "@/components/IntroOverlay";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-accent-blue/20`}>
        <LanguageProvider>
          <IntroOverlay />
          <NavBar />
          {children}
          <SiteAssistant />
        </LanguageProvider>
      </body>
    </html>
  );
}
