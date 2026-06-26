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
  title: "Resume Tailor AI | Optimize LaTeX Resume for ATS",
  description:
    "AI-powered ATS optimization for LaTeX resumes. Paste your resume and job description — get an optimized version with keyword analysis in 30 seconds.",
  keywords: [
    "resume",
    "ATS",
    "LaTeX",
    "job application",
    "AI resume builder",
    "keyword optimization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface font-sans">
        {children}
      </body>
    </html>
  );
}
