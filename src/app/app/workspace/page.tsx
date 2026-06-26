"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { TailorResponse, LoadingState } from "@/types";
import InputSection from "@/components/InputSection";
import OutputSection from "@/components/OutputSection";

export default function WorkspacePage() {
  const [latex, setLatex] = useState("");
  const [jd, setJD] = useState("");
  const [result, setResult] = useState<TailorResponse | null>(null);
  const [loading, setLoading] = useState<LoadingState>("idle");
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const canSubmit = latex.trim().length > 0 && jd.trim().length > 0 && loading !== "loading";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading("loading"); setError(""); setResult(null);

    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latex, jobDescription: jd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data); setLoading("success");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    } catch (err) {
      setLoading("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="h-14 px-6 flex items-center justify-between border-b border-neutral-200 bg-white shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: 15, fontVariationSettings: "'FILL' 1" }}>description</span>
            </div>
            <span className="text-lg font-semibold italic text-neutral-950 tracking-wide" style={{ fontFamily: "var(--font-cormorant), serif" }}>Tailorly</span>
          </Link>
          <div className="h-4 w-px bg-neutral-200" />
          <h1 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Workspace</h1>
        </div>
        {result && (
          <button onClick={() => {
            const blob = new Blob([result.updatedLatex], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "resume_optimized.tex";
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
          }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span>
            Download .tex
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {loading === "success" && result ? (
            <div ref={resultRef} className="space-y-4">
              {/* Back to Inputs Button */}
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setResult(null);
                    setLoading("idle");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors border border-neutral-200/50"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
                  Edit Inputs
                </button>
              </div>
              <OutputSection result={result} originalLatex={latex} />
            </div>
          ) : loading === "loading" ? (
            /* Loading skeleton */
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  AI is optimizing your resume...
                </span>
                <div className="flex-1 h-px bg-neutral-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="skeleton h-28 rounded-xl" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="skeleton h-28 rounded-xl" />
                  <div className="skeleton h-28 rounded-xl" />
                  <div className="skeleton h-28 rounded-xl" />
                </div>
              </div>
              <div className="skeleton h-20 rounded-xl" />
              <div className="skeleton h-[450px] rounded-xl" />
            </div>
          ) : (
            /* Idle or Error - Show inputs */
            <div className="space-y-6">
              {/* Inputs */}
              <InputSection latex={latex} jobDescription={jd} onLatexChange={setLatex} onJDChange={setJD} />

              {/* Submit Button */}
              <div className="flex justify-center py-2">
                <button onClick={handleSubmit} disabled={!canSubmit}
                  className={`inline-flex items-center gap-2.5 px-10 py-3.5 rounded-xl font-semibold text-base transition-all ${
                    canSubmit
                      ? "bg-primary-500 hover:bg-primary-600 text-white shadow-sm cursor-pointer active:scale-[0.98]"
                      : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  }`}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                  Tailor Resume
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-up">
                  <span className="material-symbols-outlined text-red-500" style={{ fontSize: 20 }}>error</span>
                  <div>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                    <button onClick={handleSubmit} className="text-xs font-semibold text-red-600 hover:underline mt-1">Try again →</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
