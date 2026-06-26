"use client";
import React from "react";

interface Props { keywordsFound: string[]; keywordsMissing: string[]; keywordsAdded: string[]; }

export default function KeywordBadges({ keywordsFound, keywordsMissing, keywordsAdded }: Props) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-900 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary-500" style={{ fontSize: 18 }}>key</span>
          Keyword Analysis
        </h3>
        <div className="flex gap-4 text-xs font-medium">
          <span className="text-green-600">{keywordsFound.length} found</span>
          <span className="text-primary-500">{keywordsAdded.length} added</span>
          <span className="text-red-500">{keywordsMissing.length} missing</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {keywordsFound.map(kw => (
          <span key={`f-${kw}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-green-50 text-green-700 border border-green-200">
            {kw}
            <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>check</span>
          </span>
        ))}
        {keywordsAdded.map(kw => (
          <span key={`a-${kw}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-primary-50 text-primary-700 border border-primary-200 font-medium">
            {kw}
            <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>add</span>
          </span>
        ))}
        {keywordsMissing.map(kw => (
          <span key={`m-${kw}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-red-50 text-red-600 border border-red-200">
            {kw}
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>close</span>
          </span>
        ))}
      </div>
    </div>
  );
}
