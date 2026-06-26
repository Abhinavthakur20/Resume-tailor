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

export default function OutputSection({
  result,
  originalLatex,
}: OutputSectionProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-outline-variant" />
        <span className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
          <span className="material-symbols-outlined text-lg">
            auto_awesome
          </span>
          Optimization Results
        </span>
        <div className="flex-1 h-px bg-outline-variant" />
      </div>

      {/* ATS Score Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ATSScore
          scoreBefore={result.atsScoreBefore}
          scoreAfter={result.atsScoreAfter}
        />

        {/* Quick Stats */}
        <div className="lg:col-span-7 grid grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
            <div className="text-primary-container mb-2">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div className="text-3xl font-bold text-on-surface">
              {result.keywordsFound.length}
            </div>
            <div className="text-xs text-secondary uppercase tracking-wider font-bold">
              Found
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
            <div className="text-error mb-2">
              <span className="material-symbols-outlined">cancel</span>
            </div>
            <div className="text-3xl font-bold text-on-surface">
              {result.keywordsMissing.length}
            </div>
            <div className="text-xs text-secondary uppercase tracking-wider font-bold">
              Missing
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
            <div className="text-primary mb-2">
              <span className="material-symbols-outlined">add_circle</span>
            </div>
            <div className="text-3xl font-bold text-on-surface">
              {result.keywordsAdded.length}
            </div>
            <div className="text-xs text-secondary uppercase tracking-wider font-bold">
              Added
            </div>
          </div>
        </div>
      </div>

      {/* Keyword Badges */}
      <KeywordBadges
        keywordsFound={result.keywordsFound}
        keywordsMissing={result.keywordsMissing}
        keywordsAdded={result.keywordsAdded}
      />

      {/* LaTeX Code Viewer */}
      <LatexViewer
        originalLatex={originalLatex}
        updatedLatex={result.updatedLatex}
      />
    </div>
  );
}
