"use client";

import React, { useState } from "react";

interface LatexViewerProps {
  originalLatex: string;
  updatedLatex: string;
}

export default function LatexViewer({ originalLatex, updatedLatex }: LatexViewerProps) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"compare" | "full">("compare");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(updatedLatex);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = updatedLatex;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-ink-100/40 overflow-hidden">
      {/* Toolbar */}
      <div className="px-5 py-3 bg-surface-100/80 border-b border-ink-100/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-brand-400" style={{ fontSize: 20 }}>code</span>
          <h3 className="font-bold text-[15px] text-ink-900">LaTeX Source</h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Switcher */}
          <div className="flex bg-white/80 rounded-lg p-0.5 border border-ink-100/30">
            {(["compare", "full"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${
                  tab === t
                    ? "bg-brand-400 text-white shadow-sm"
                    : "text-ink-400 hover:text-ink-700"
                }`}
              >
                {t === "compare" ? "Side by Side" : "Optimized"}
              </button>
            ))}
          </div>

          <button onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-bold border border-ink-100/40 text-ink-500 hover:bg-surface-100 transition-all active:scale-95">
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{copied ? "check" : "content_copy"}</span>
            {copied ? "Copied!" : "Copy"}
          </button>

          <button onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-bold bg-brand-400 text-white hover:bg-brand-500 shadow-sm transition-all active:scale-95">
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>download</span>
            .tex
          </button>
        </div>
      </div>

      {/* Code Display */}
      {tab === "compare" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-ink-100/30">
          {/* Original */}
          <div className="flex flex-col max-h-[500px]">
            <div className="px-5 py-2 bg-surface-100/50 text-[10px] font-bold text-ink-300 uppercase tracking-widest border-b border-ink-100/20">
              Original
            </div>
            <div className="flex-1 p-5 overflow-y-auto custom-scrollbar bg-surface-50/50">
              <pre className="whitespace-pre-wrap text-[12px] font-mono leading-relaxed text-ink-400 break-words">
                {originalLatex}
              </pre>
            </div>
          </div>
          {/* Optimized */}
          <div className="flex flex-col max-h-[500px]">
            <div className="px-5 py-2 bg-surface-100/50 text-[10px] font-bold text-ink-300 uppercase tracking-widest border-b border-ink-100/20">
              Optimized
            </div>
            <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
              <pre className="whitespace-pre-wrap text-[12px] font-mono leading-relaxed text-ink-900 break-words">
                {updatedLatex}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar p-5">
          <pre className="whitespace-pre-wrap text-[12px] font-mono leading-relaxed text-ink-900 break-words">
            {updatedLatex}
          </pre>
        </div>
      )}
    </div>
  );
}
