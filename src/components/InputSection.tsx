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
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        readFile(files[0]);
      }
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
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onLatexChange(text);
    };
    reader.readAsText(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      readFile(files[0]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Left Panel: LaTeX Resume */}
      <section className="flex-1 flex flex-col min-w-0">
        <div className="mb-3 flex items-center justify-between">
          <label className="font-semibold text-lg text-on-surface">
            Your Resume (.tex)
          </label>
          <span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-bold text-primary uppercase tracking-wider">
            LaTeX Only
          </span>
        </div>

        {!latex ? (
          /* Drop Zone */
          <div
            id="drop-zone"
            className={`flex-1 min-h-[400px] glass-panel rounded-xl border-dashed border-2 flex flex-col items-center justify-center p-16 transition-all cursor-pointer group ${
              isDragging
                ? "border-primary bg-primary-container/5"
                : "border-outline-variant hover:border-primary"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-4xl">
                upload_file
              </span>
            </div>
            <p className="font-semibold text-xl text-on-surface text-center mb-2">
              Drag & drop your .tex file
            </p>
            <p className="text-sm text-secondary text-center">
              or click to browse your local storage
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".tex,.txt"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="mt-8 flex gap-2">
              <div className="flex items-center gap-1 px-3 py-1 bg-surface-container rounded-full text-xs text-on-secondary-container">
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>
                .tex files
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-surface-container rounded-full text-xs text-on-secondary-container">
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>
                .txt files
              </div>
            </div>
          </div>
        ) : (
          /* LaTeX Editor */
          <div className="flex-1 min-h-[400px] glass-panel rounded-xl flex flex-col overflow-hidden border border-outline-variant focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
            <textarea
              id="latex-input"
              value={latex}
              onChange={(e) => onLatexChange(e.target.value)}
              className="flex-1 p-6 bg-transparent border-none focus:ring-0 resize-none font-mono text-sm text-on-surface placeholder:text-on-surface-variant/40"
              placeholder="Paste your LaTeX resume code here..."
              spellCheck={false}
            />
            <div className="p-3 bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
              <div className="flex items-center gap-3">
                {fileName && (
                  <span className="flex items-center gap-1 text-[10px] text-primary font-bold uppercase tracking-tight">
                    <span className="material-symbols-outlined text-sm">
                      description
                    </span>
                    {fileName}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  onLatexChange("");
                  setFileName(null);
                }}
                className="text-xs text-error font-bold hover:underline"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Right Panel: Job Description */}
      <section className="flex-1 flex flex-col min-w-0">
        <div className="mb-3 flex items-center justify-between">
          <label className="font-semibold text-lg text-on-surface">
            Target Job Description
          </label>
          <div className="flex gap-2">
            {jobDescription && (
              <button
                onClick={() => onJobDescriptionChange("")}
                className="text-primary hover:bg-primary-fixed px-2 py-1 rounded text-xs font-bold transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 min-h-[400px] glass-panel rounded-xl flex flex-col overflow-hidden border border-outline-variant focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
          <textarea
            id="jd-input"
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            className="flex-1 p-6 bg-transparent border-none focus:ring-0 resize-none text-base text-on-surface placeholder:text-on-surface-variant/40"
            placeholder="Paste the job description, responsibilities, and requirements here..."
          />
          <div className="p-3 bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-[10px] text-secondary font-bold uppercase tracking-tight">
                <span className="material-symbols-outlined text-sm">
                  language
                </span>
                Auto-detect
              </span>
              <span className="flex items-center gap-1 text-[10px] text-secondary font-bold uppercase tracking-tight">
                <span className="material-symbols-outlined text-sm">
                  analytics
                </span>
                ATS Ready
              </span>
            </div>
            <span className="text-xs text-secondary font-mono">
              {wordCount} words
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
