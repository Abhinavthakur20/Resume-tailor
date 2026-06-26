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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Keywords Strategy Panel */}
      <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-xl">Keyword Strategy</h3>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            High Relevance
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Found Chips */}
          {keywordsFound.map((keyword) => (
            <span
              key={`found-${keyword}`}
              className="keyword-chip px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-sm flex items-center gap-1"
            >
              {keyword}
              <span className="material-symbols-outlined text-sm">check</span>
            </span>
          ))}

          {/* Added Chips */}
          {keywordsAdded.map((keyword) => (
            <span
              key={`added-${keyword}`}
              className="keyword-chip px-3 py-1.5 bg-primary-container/10 text-primary-container border border-primary-container/20 rounded-full text-sm font-medium flex items-center gap-1"
            >
              {keyword}
              <span className="material-symbols-outlined text-sm">
                auto_awesome
              </span>
            </span>
          ))}

          {/* Missing Chips */}
          {keywordsMissing.map((keyword) => (
            <span
              key={`missing-${keyword}`}
              className="keyword-chip px-3 py-1.5 bg-error/5 text-error border border-error/20 rounded-full text-sm flex items-center gap-1"
            >
              {keyword}
              <span className="material-symbols-outlined text-sm">
                warning
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col justify-center">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          AI Insights
        </h4>
        <p className="text-on-surface leading-relaxed">
          Your resume was optimized with{" "}
          <strong className="text-primary">
            {keywordsAdded.length} new keywords
          </strong>{" "}
          added naturally into existing bullet points.
          {keywordsMissing.length > 0 && (
            <>
              {" "}
              <strong className="text-error">
                {keywordsMissing.length} keywords
              </strong>{" "}
              couldn&apos;t be added without fabricating experience.
            </>
          )}
        </p>

        {/* Summary Metrics */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-primary-container mb-1">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div className="text-2xl font-bold text-on-surface">
              {keywordsFound.length}
            </div>
            <div className="text-[10px] text-secondary uppercase tracking-wider font-bold">
              Found
            </div>
          </div>
          <div className="text-center">
            <div className="text-primary mb-1">
              <span className="material-symbols-outlined">add_circle</span>
            </div>
            <div className="text-2xl font-bold text-on-surface">
              {keywordsAdded.length}
            </div>
            <div className="text-[10px] text-secondary uppercase tracking-wider font-bold">
              Added
            </div>
          </div>
          <div className="text-center">
            <div className="text-error mb-1">
              <span className="material-symbols-outlined">cancel</span>
            </div>
            <div className="text-2xl font-bold text-on-surface">
              {keywordsMissing.length}
            </div>
            <div className="text-[10px] text-secondary uppercase tracking-wider font-bold">
              Missing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
