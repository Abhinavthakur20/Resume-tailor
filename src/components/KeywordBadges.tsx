"use client";

import React from "react";

interface KeywordBadgesProps {
  keywordsFound: string[];
  keywordsMissing: string[];
  keywordsAdded: string[];
}

export default function KeywordBadges({
  keywordsFound,
  keywordsMissing,
  keywordsAdded,
}: KeywordBadgesProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* ===== Keyword Strategy Panel ===== */}
      <div className="lg:col-span-2 rounded-2xl bg-white/70 backdrop-blur-sm border border-ink-100/40 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-400" style={{ fontSize: 20 }}>key</span>
            <h3 className="font-bold text-lg text-ink-900">Keyword Strategy</h3>
          </div>
          <span className="text-[10px] font-bold text-brand-500 bg-brand-100 px-3 py-1 rounded-full uppercase tracking-widest">
            High Relevance
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {keywordsFound.map((kw) => (
            <span key={`f-${kw}`}
              className="keyword-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] bg-surface-200 text-ink-500">
              {kw}
              <span className="material-symbols-outlined text-success" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </span>
          ))}

          {keywordsAdded.map((kw) => (
            <span key={`a-${kw}`}
              className="keyword-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium bg-brand-50 text-brand-600 border border-brand-200">
              {kw}
              <span className="material-symbols-outlined text-brand-400" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </span>
          ))}

          {keywordsMissing.map((kw) => (
            <span key={`m-${kw}`}
              className="keyword-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] bg-danger-light text-danger border border-red-200">
              {kw}
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>warning</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== AI Insights ===== */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/60 border border-brand-200/50 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="material-symbols-outlined text-brand-400" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600">AI Insights</h4>
          </div>
          <p className="text-[14px] text-ink-700 leading-relaxed">
            <strong className="text-brand-600">{keywordsAdded.length} keywords</strong> added naturally into your bullet points.
            {keywordsMissing.length > 0 && (
              <> <strong className="text-danger">{keywordsMissing.length}</strong> couldn&apos;t be added without fabricating experience.</>
            )}
          </p>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            { icon: "check_circle", count: keywordsFound.length, label: "Found", color: "text-success" },
            { icon: "add_circle", count: keywordsAdded.length, label: "Added", color: "text-brand-400" },
            { icon: "cancel", count: keywordsMissing.length, label: "Missing", color: "text-danger" },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-white/60 rounded-xl py-3">
              <span className={`material-symbols-outlined ${stat.color}`} style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              <div className="text-xl font-extrabold text-ink-900 mt-1">{stat.count}</div>
              <div className="text-[9px] font-bold text-ink-300 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
