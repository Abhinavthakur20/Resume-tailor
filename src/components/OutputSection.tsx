"use client";

import React from "react";
import { TailorResponse } from "@/types";
import ATSScore from "./ATSScore";
import KeywordBadges from "./KeywordBadges";
import LatexViewer from "./LatexViewer";

interface OutputSectionProps {
  result: TailorResponse;
  originalLatex: string;
}

export default function OutputSection({ result, originalLatex }: OutputSectionProps) {
  return (
    <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
      {/* Divider */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent" />
        <span className="inline-flex items-center gap-2 text-brand-500 text-xs font-bold uppercase tracking-[0.15em]">
          <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          Results
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent" />
      </div>

      {/* Score + Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <ATSScore scoreBefore={result.atsScoreBefore} scoreAfter={result.atsScoreAfter} />
        </div>

        <div className="lg:col-span-7 grid grid-cols-3 gap-4">
          {[
            { icon: "check_circle", count: result.keywordsFound.length, label: "Found", color: "text-success", bg: "bg-success-light" },
            { icon: "cancel", count: result.keywordsMissing.length, label: "Missing", color: "text-danger", bg: "bg-danger-light" },
            { icon: "add_circle", count: result.keywordsAdded.length, label: "Added", color: "text-brand-500", bg: "bg-brand-50" },
          ].map((s) => (
            <div key={s.label}
              className="rounded-2xl bg-white/70 backdrop-blur-sm border border-ink-100/40 p-5 flex flex-col justify-center items-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <span className={`material-symbols-outlined ${s.color}`} style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              </div>
              <div className="text-3xl font-extrabold text-ink-900 tabular-nums">{s.count}</div>
              <div className="text-[9px] font-bold text-ink-300 uppercase tracking-[0.15em] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <KeywordBadges
        keywordsFound={result.keywordsFound}
        keywordsMissing={result.keywordsMissing}
        keywordsAdded={result.keywordsAdded}
      />

      {/* Code */}
      <LatexViewer originalLatex={originalLatex} updatedLatex={result.updatedLatex} />
    </div>
  );
}
