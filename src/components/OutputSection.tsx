"use client";
import React, { useState } from "react";
import { TailorResponse } from "@/types";
import ATSScore from "./ATSScore";
import KeywordBadges from "./KeywordBadges";
import CodeEditor from "./CodeEditor";
import VisualPreview from "./VisualPreview";

interface Props { result: TailorResponse; originalLatex: string; }

export default function OutputSection({ result, originalLatex }: Props) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="space-y-5 animate-fade-up" style={{ opacity: 0, animationDelay: "0.1s" }}>
      {/* Divider */}
      <div className="flex items-center gap-3 pt-2">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary-500" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          Results
        </span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      {/* Score + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ATSScore scoreBefore={result.atsScoreBefore} scoreAfter={result.atsScoreAfter} />

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "check_circle", n: result.keywordsFound.length, label: "Found", cls: "text-green-500 bg-green-50" },
            { icon: "add_circle", n: result.keywordsAdded.length, label: "Added", cls: "text-primary-500 bg-primary-50" },
            { icon: "cancel", n: result.keywordsMissing.length, label: "Missing", cls: "text-red-500 bg-red-50" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
              <div className={`w-9 h-9 rounded-lg ${s.cls} flex items-center justify-center mx-auto mb-2`}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              </div>
              <div className="text-2xl font-bold text-neutral-900">{s.n}</div>
              <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex border-b border-neutral-200 text-sm font-semibold tracking-wide gap-6">
        <button
          onClick={() => setActiveTab("preview")}
          className={`pb-2.5 px-1 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "preview"
              ? "border-primary-500 text-primary-600 font-bold"
              : "border-transparent text-neutral-500 hover:text-neutral-700"
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>pageview</span>
          Visual Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`pb-2.5 px-1 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "code"
              ? "border-primary-500 text-primary-600 font-bold"
              : "border-transparent text-neutral-500 hover:text-neutral-700"
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>code</span>
          LaTeX Source Code
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-2">
        {activeTab === "preview" ? (
          <VisualPreview originalLatex={originalLatex} result={result} />
        ) : (
          <div className="space-y-5">
            <KeywordBadges keywordsFound={result.keywordsFound} keywordsMissing={result.keywordsMissing} keywordsAdded={result.keywordsAdded} />
            <CodeEditor originalLatex={originalLatex} updatedLatex={result.updatedLatex} />
          </div>
        )}
      </div>
    </div>
  );
}
