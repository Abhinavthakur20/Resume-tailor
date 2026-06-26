"use client";

import React, { useCallback, useState, useRef, DragEvent } from "react";

interface InputSectionProps {
  latex: string;
  jobDescription: string;
  onLatexChange: (v: string) => void;
  onJDChange: (v: string) => void;
}

export default function InputSection({ latex, jobDescription, onLatexChange, onJDChange }: InputSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const jdWords = jobDescription.trim().split(/\s+/).filter(w => w).length;

  const readFile = useCallback((file: File) => {
    if (!file.name.match(/\.(tex|txt)$/)) { alert("Please upload a .tex or .txt file"); return; }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => onLatexChange(e.target?.result as string);
    reader.readAsText(file);
  }, [onLatexChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* LEFT: Resume Input */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary-500" style={{ fontSize: 16 }}>code</span>
            Resume (LaTeX)
          </label>
          {latex && (
            <button onClick={() => { onLatexChange(""); setFileName(null); }} className="text-xs text-neutral-400 hover:text-danger-500 transition-colors">Clear</button>
          )}
        </div>

        {!latex ? (
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e: DragEvent) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e: DragEvent) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e: DragEvent) => { e.preventDefault(); setIsDragging(false); e.dataTransfer.files[0] && readFile(e.dataTransfer.files[0]); }}
            className={`flex-1 min-h-[350px] rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-3 transition-all ${
              isDragging ? "border-primary-500 bg-primary-50" : "border-neutral-200 bg-white hover:border-neutral-300"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isDragging ? "bg-primary-500" : "bg-neutral-100"}`}>
              <span className={`material-symbols-outlined ${isDragging ? "text-white" : "text-neutral-400"}`} style={{ fontSize: 24 }}>upload_file</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-700">Drop .tex file or click to upload</p>
              <p className="text-xs text-neutral-400 mt-1">Or paste your LaTeX code below after clicking</p>
            </div>
            <input ref={fileRef} type="file" accept=".tex,.txt" className="hidden"
              onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0])} />
          </div>
        ) : (
          <div className="flex-1 min-h-[350px] rounded-xl bg-white border border-neutral-200 flex flex-col overflow-hidden transition-all focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10">
            <textarea
              value={latex}
              onChange={(e) => onLatexChange(e.target.value)}
              className="flex-1 p-4 bg-transparent resize-none font-mono text-[13px] leading-relaxed text-neutral-800 placeholder:text-neutral-300"
              placeholder="Paste your LaTeX resume code here..."
              spellCheck={false}
            />
            <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px]">
              {fileName && (
                <span className="text-primary-600 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: 12 }}>description</span>
                  {fileName}
                </span>
              )}
              <span className="text-neutral-400 ml-auto font-mono">{latex.length.toLocaleString()} chars</span>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Job Description */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary-500" style={{ fontSize: 16 }}>work</span>
            Job Description
          </label>
          {jobDescription && (
            <button onClick={() => onJDChange("")} className="text-xs text-neutral-400 hover:text-danger-500 transition-colors">Clear</button>
          )}
        </div>

        <div className="flex-1 min-h-[350px] rounded-xl bg-white border border-neutral-200 flex flex-col overflow-hidden transition-all focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10">
          <textarea
            value={jobDescription}
            onChange={(e) => onJDChange(e.target.value)}
            className="flex-1 p-4 bg-transparent resize-none text-[14px] leading-relaxed text-neutral-800 placeholder:text-neutral-300"
            placeholder="Paste the full job description here — responsibilities, requirements, qualifications..."
          />
          <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px]">
            <span className="text-neutral-400 flex items-center gap-1">
              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>verified</span>
              ATS Ready
            </span>
            <span className="text-neutral-400 font-mono">{jdWords} words</span>
          </div>
        </div>
      </div>
    </div>
  );
}
