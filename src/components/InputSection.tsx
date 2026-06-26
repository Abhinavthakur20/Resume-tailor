"use client";

import React, { useCallback, useState, useRef, DragEvent } from "react";

interface InputSectionProps {
  latex: string;
  jobDescription: string;
  onLatexChange: (value: string) => void;
  onJobDescriptionChange: (value: string) => void;
}

export default function InputSection({
  latex,
  jobDescription,
  onLatexChange,
  onJobDescriptionChange,
}: InputSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = jobDescription
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) readFile(files[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const readFile = (file: File) => {
    if (!file.name.endsWith(".tex") && !file.name.endsWith(".txt")) {
      alert("Please upload a .tex or .txt file");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => onLatexChange(e.target?.result as string);
    reader.readAsText(file);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* ===== LEFT: LaTeX Resume ===== */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-400/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-brand-400" style={{ fontSize: 18 }}>code</span>
            </div>
            <span className="font-semibold text-ink-900 text-[15px]">Your Resume</span>
          </div>
          <span className="text-[10px] font-bold text-brand-500 bg-brand-100 px-2.5 py-1 rounded-full uppercase tracking-widest">
            .tex / .txt
          </span>
        </div>

        {!latex ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              flex-1 min-h-[380px] rounded-2xl border-2 border-dashed cursor-pointer
              flex flex-col items-center justify-center gap-4 transition-all duration-300
              backdrop-blur-sm
              ${isDragging
                ? "border-brand-400 bg-brand-50/80 scale-[1.01]"
                : "border-ink-100/60 bg-white/60 hover:border-brand-300 hover:bg-white/80"
              }
            `}
          >
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
              ${isDragging ? "bg-brand-400 scale-110" : "bg-gradient-to-br from-brand-100 to-brand-200"}
            `}>
              <span className="material-symbols-outlined text-brand-600" style={{ fontSize: 30, fontVariationSettings: "'FILL' 1" }}>
                upload_file
              </span>
            </div>
            <div className="text-center">
              <p className="font-semibold text-ink-900 text-base">Drop your .tex file here</p>
              <p className="text-ink-300 text-sm mt-1">or click to browse</p>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-400 bg-surface-100 px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-success" style={{ fontSize: 14 }}>check_circle</span>
                LaTeX
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-400 bg-surface-100 px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-success" style={{ fontSize: 14 }}>check_circle</span>
                Plain Text
              </span>
            </div>
            <input ref={fileInputRef} type="file" accept=".tex,.txt" className="hidden"
              onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="flex-1 min-h-[380px] rounded-2xl bg-white/70 backdrop-blur-sm border border-ink-100/40 flex flex-col overflow-hidden transition-all focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-400/15">
            <textarea
              value={latex}
              onChange={(e) => onLatexChange(e.target.value)}
              className="flex-1 p-5 bg-transparent resize-none font-mono text-[13px] leading-relaxed text-ink-700 placeholder:text-ink-200"
              placeholder="Paste your LaTeX resume code here..."
              spellCheck={false}
            />
            <div className="px-4 py-2.5 bg-surface-100/60 border-t border-ink-100/30 flex items-center justify-between">
              {fileName && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-500">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>description</span>
                  {fileName}
                </span>
              )}
              <button onClick={() => { onLatexChange(""); setFileName(null); }}
                className="text-[11px] font-bold text-danger hover:underline ml-auto">
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== RIGHT: Job Description ===== */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-400/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-brand-400" style={{ fontSize: 18 }}>work</span>
            </div>
            <span className="font-semibold text-ink-900 text-[15px]">Job Description</span>
          </div>
          {jobDescription && (
            <button onClick={() => onJobDescriptionChange("")}
              className="text-[11px] font-bold text-danger hover:underline">
              Clear
            </button>
          )}
        </div>

        <div className="flex-1 min-h-[380px] rounded-2xl bg-white/70 backdrop-blur-sm border border-ink-100/40 flex flex-col overflow-hidden transition-all focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-400/15">
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            className="flex-1 p-5 bg-transparent resize-none text-[14px] leading-relaxed text-ink-700 placeholder:text-ink-200"
            placeholder="Paste the full job description here — responsibilities, requirements, qualifications..."
          />
          <div className="px-4 py-2.5 bg-surface-100/60 border-t border-ink-100/30 flex items-center justify-between">
            <div className="flex gap-4">
              <span className="inline-flex items-center gap-1 text-[10px] text-ink-300 font-semibold uppercase tracking-wide">
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>psychology</span>
                AI Analysis
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-ink-300 font-semibold uppercase tracking-wide">
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>verified</span>
                ATS Ready
              </span>
            </div>
            <span className="text-[11px] text-ink-300 font-mono tabular-nums">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
