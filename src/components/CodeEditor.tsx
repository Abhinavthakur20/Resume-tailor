"use client";
import React, { useState, useRef, useEffect } from "react";

interface Props { originalLatex: string; updatedLatex: string; }

export default function CodeEditor({ originalLatex, updatedLatex }: Props) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"updated" | "compare">("updated");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const lines = updatedLatex.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(updatedLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([updatedLatex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "resume_optimized.tex";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div ref={containerRef} className={`bg-white border border-neutral-200 rounded-xl overflow-hidden flex flex-col ${isFullscreen ? "h-screen" : ""}`}>
      {/* Toolbar */}
      <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-500" style={{ fontSize: 18 }}>code</span>
          <span className="text-sm font-semibold text-neutral-700">LaTeX Source</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex bg-neutral-100 rounded-lg p-0.5 text-xs">
            {(["updated", "compare"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${tab === t ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"}`}>
                {t === "updated" ? "Optimized" : "Compare"}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-neutral-200" />

          <button onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{copied ? "check" : "content_copy"}</span>
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={handleDownload}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-primary-500 text-white hover:bg-primary-600 rounded-md transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span>
            .tex
          </button>
          <button onClick={toggleFullscreen}
            className="inline-flex items-center p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{isFullscreen ? "fullscreen_exit" : "fullscreen"}</span>
          </button>
        </div>
      </div>

      {/* Code */}
      {tab === "updated" ? (
        <div className="overflow-auto custom-scrollbar max-h-[500px] flex-1">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i} className="hover:bg-neutral-50">
                  <td className="text-right pr-4 pl-4 py-0 select-none text-xs text-neutral-300 font-mono w-10 border-r border-neutral-100">{i + 1}</td>
                  <td className="pl-4 pr-4 py-0">
                    <pre className="text-[12px] font-mono text-neutral-800 whitespace-pre-wrap break-words">{line || " "}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-neutral-200 max-h-[500px] flex-1">
          <div className="flex flex-col overflow-hidden">
            <div className="px-4 py-1.5 bg-neutral-50 border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Original</div>
            <div className="flex-1 p-4 overflow-auto custom-scrollbar">
              <pre className="text-[12px] font-mono text-neutral-500 whitespace-pre-wrap break-words">{originalLatex}</pre>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="px-4 py-1.5 bg-neutral-50 border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Optimized</div>
            <div className="flex-1 p-4 overflow-auto custom-scrollbar">
              <pre className="text-[12px] font-mono text-neutral-800 whitespace-pre-wrap break-words">{updatedLatex}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
