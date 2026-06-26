"use client";

import React, { useEffect, useState } from "react";

interface ATSScoreProps {
  scoreBefore: number;
  scoreAfter: number;
}

export default function ATSScore({ scoreBefore, scoreAfter }: ATSScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    // Animate the score from 0 to the final value
    const timer = setTimeout(() => {
      setAnimatedScore(scoreAfter);
    }, 200);
    return () => clearTimeout(timer);
  }, [scoreAfter]);

  return (
    <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex items-center justify-between overflow-hidden relative">
      <div className="relative z-10">
        <h3 className="font-semibold text-xl text-on-surface mb-2">
          ATS Score
        </h3>
        <p className="text-sm text-on-secondary-container max-w-[220px]">
          Optimized for matching algorithmic scanning patterns.
        </p>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-4xl font-bold text-primary">
            {scoreAfter}%
          </span>
          <span className="text-sm text-secondary line-through">
            {scoreBefore}% before
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs font-bold text-green-600">
          <span className="material-symbols-outlined text-sm">
            trending_up
          </span>
          +{scoreAfter - scoreBefore}% improvement
        </div>
      </div>

      {/* Progress Ring */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-surface-variant"
            cx="64"
            cy="64"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
          />
          <circle
            className="text-primary-container transition-all duration-1000 ease-out"
            cx="64"
            cy="64"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute font-bold text-xl">{scoreAfter}%</div>
        <div className="absolute w-40 h-40 border-2 border-primary/10 rounded-full animate-pulse-ring" />
      </div>
    </div>
  );
}
