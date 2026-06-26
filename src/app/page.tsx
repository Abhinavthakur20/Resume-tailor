"use client";

import React, { useState, useRef } from "react";
import { TailorResponse, LoadingState } from "@/types";
import InputSection from "@/components/InputSection";
import OutputSection from "@/components/OutputSection";

export default function Home() {
  const [latex, setLatex] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<TailorResponse | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const canSubmit =
    latex.trim().length > 0 &&
    jobDescription.trim().length > 0 &&
    loadingState !== "loading";

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setLoadingState("loading");
    setErrorMessage("");
    setResult(null);

    try {
      const response = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latex, jobDescription }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data as TailorResponse);
      setLoadingState("success");

      // Scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err) {
      setLoadingState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  const handleDownloadTex = () => {
    if (!result) return;
    const blob = new Blob([result.updatedLatex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume_optimized.tex";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========= HEADER ========= */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
        <nav className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary-container text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_fix_high
            </span>
            <span className="font-bold text-xl text-primary">
              Resume Tailor AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            {result && (
              <button
                onClick={handleDownloadTex}
                id="header-download-btn"
                className="flex items-center gap-2 px-5 py-2 bg-primary-container text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">
                  download
                </span>
                Download .tex
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* ========= MAIN CONTENT ========= */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section (shown only when idle / no result) */}
        {loadingState === "idle" && !result && (
          <section className="text-center py-12 px-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed rounded-full text-on-primary-fixed text-xs font-bold mb-4">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              AI-Powered LaTeX Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto mb-4 text-on-background leading-tight tracking-tight">
              Optimize your LaTeX Resume for{" "}
              <span className="text-primary">ATS with AI</span>
            </h1>
            <p className="text-base text-on-secondary-container max-w-2xl mx-auto mb-2">
              Stop fighting with keyword guesswork. Paste your LaTeX resume and
              the job description — get an ATS-optimized version in 30 seconds.
            </p>
          </section>
        )}

        {/* Input Section */}
        <div className="px-6 max-w-7xl mx-auto w-full">
          <InputSection
            latex={latex}
            jobDescription={jobDescription}
            onLatexChange={setLatex}
            onJobDescriptionChange={setJobDescription}
          />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center py-8 px-6">
          <div className="relative group">
            {/* Glow Aura */}
            {canSubmit && (
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
            )}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              id="tailor-submit-btn"
              className={`relative flex items-center gap-3 px-12 py-5 rounded-full font-bold text-lg shadow-xl transition-all overflow-hidden ${
                canSubmit
                  ? "bg-primary-container text-white hover:scale-105 active:scale-95 cursor-pointer"
                  : "bg-surface-variant text-secondary cursor-not-allowed shadow-none"
              }`}
            >
              {loadingState === "loading" ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    magic_button
                  </span>
                  Tailor Resume
                </>
              )}

              {/* Shine Effect */}
              {canSubmit && (
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Error State */}
        {loadingState === "error" && errorMessage && (
          <div className="px-6 max-w-7xl mx-auto w-full mb-8 animate-fade-in">
            <div className="bg-error-container border border-error/20 rounded-xl p-6 flex items-start gap-4">
              <span className="material-symbols-outlined text-error text-2xl">
                error
              </span>
              <div>
                <h3 className="font-bold text-on-error-container mb-1">
                  Something went wrong
                </h3>
                <p className="text-sm text-on-error-container/80">
                  {errorMessage}
                </p>
                <button
                  onClick={handleSubmit}
                  className="mt-3 text-sm font-bold text-error hover:underline"
                >
                  Try Again →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loadingState === "loading" && (
          <div className="px-6 max-w-7xl mx-auto w-full space-y-6 pb-16 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-outline-variant" />
              <span className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                <svg
                  className="animate-spin h-4 w-4 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                AI is analyzing your resume...
              </span>
              <div className="flex-1 h-px bg-outline-variant" />
            </div>

            {/* Skeleton Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 skeleton h-40 rounded-xl" />
              <div className="lg:col-span-7 grid grid-cols-3 gap-6">
                <div className="skeleton h-40 rounded-xl" />
                <div className="skeleton h-40 rounded-xl" />
                <div className="skeleton h-40 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 skeleton h-48 rounded-xl" />
              <div className="skeleton h-48 rounded-xl" />
            </div>
            <div className="skeleton h-96 rounded-xl" />
          </div>
        )}

        {/* Results Output */}
        {loadingState === "success" && result && (
          <div
            ref={resultRef}
            className="px-6 max-w-7xl mx-auto w-full pb-16"
          >
            <OutputSection result={result} originalLatex={latex} />
          </div>
        )}
      </main>

      {/* ========= FOOTER ========= */}
      <footer className="border-t border-outline-variant bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-6 max-w-7xl mx-auto w-full">
          <p className="font-bold text-on-surface mb-2 md:mb-0">
            Resume Tailor AI
          </p>
          <div className="flex gap-6 mb-2 md:mb-0">
            <span className="text-sm text-on-secondary-container">
              Built for freshers who deserve better
            </span>
          </div>
          <p className="text-sm text-on-secondary-container">
            © {new Date().getFullYear()} Resume Tailor AI
          </p>
        </div>
      </footer>
    </div>
  );
}
