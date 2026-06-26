"use client";

import React, { useState } from "react";

interface LatexViewerProps {
  originalLatex: string;
  updatedLatex: string;
}

export default function LatexViewer({
  originalLatex,
  updatedLatex,
}: LatexViewerProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"comparison" | "updated">(
    "comparison"
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(updatedLatex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = updatedLatex;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([updatedLatex], { type: "text/plain" });
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
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-md">
      {/* Header Bar */}
      <div className="bg-surface-container px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">code</span>
          <h3 className="font-semibold text-lg text-on-surface">
            Source Code
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {/* Tab Buttons */}
          <div className="flex bg-surface-variant/50 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === "comparison"
                  ? "bg-surface-container-lowest text-primary shadow-sm"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              Comparison
            </button>
            <button
              onClick={() => setActiveTab("updated")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === "updated"
                  ? "bg-surface-container-lowest text-primary shadow-sm"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              Updated Only
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleCopy}
            id="copy-latex-btn"
            className="flex items-center gap-1.5 px-4 py-2 text-secondary border border-outline rounded-lg text-sm font-bold hover:bg-surface-variant transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            id="download-tex-btn"
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-container text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Download .tex
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "comparison" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-outline-variant">
          {/* Original Source */}
          <div className="flex flex-col h-[500px]">
            <div className="p-2 bg-surface-container-low text-xs font-bold text-secondary border-b border-outline-variant px-6 uppercase tracking-wider">
              Original LaTeX
            </div>
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-slate-50">
              <pre className="whitespace-pre-wrap text-sm font-mono text-slate-600 break-words">
                {originalLatex}
              </pre>
            </div>
          </div>
          {/* Optimized Source */}
          <div className="flex flex-col h-[500px]">
            <div className="p-2 bg-surface-container-low text-xs font-bold text-secondary border-b border-outline-variant px-6 uppercase tracking-wider">
              Optimized LaTeX
            </div>
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <pre className="whitespace-pre-wrap text-sm font-mono text-on-surface break-words">
                {updatedLatex}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        /* Full Updated View */
        <div className="flex flex-col h-[500px]">
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <pre className="whitespace-pre-wrap text-sm font-mono text-on-surface break-words">
              {updatedLatex}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
