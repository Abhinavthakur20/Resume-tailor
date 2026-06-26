"use client";

import React, { useEffect, useRef, useState } from "react";

interface ATSScoreProps {
  scoreBefore: number;
  scoreAfter: number;
}

export default function ATSScore({ scoreBefore, scoreAfter }: ATSScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Animate count up
  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
      let current = 0;
      const step = Math.max(1, Math.floor(scoreAfter / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= scoreAfter) {
          current = scoreAfter;
          clearInterval(interval);
        }
        setDisplayScore(current);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [scoreAfter, hasAnimated]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;
  const improvement = scoreAfter - scoreBefore;

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-ink-100/40 p-6 flex items-center justify-between">
      {/* Decorative gradient blob */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-brand-200/40 to-brand-100/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-brand-400" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>
            speed
          </span>
          <h3 className="font-bold text-lg text-ink-900">ATS Match Score</h3>
        </div>
        <p className="text-[13px] text-ink-400 max-w-[200px] mb-4">
          Keyword match rate against ATS scanning patterns
        </p>

        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-extrabold text-brand-600 tabular-nums tracking-tight">
            {displayScore}%
          </span>
          <span className="text-sm text-ink-300 line-through">{scoreBefore}%</span>
        </div>

        <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success-light text-success text-xs font-bold">
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>
          +{improvement}% boost
        </div>
      </div>

      {/* SVG Ring */}
      <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#eff4ff" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={radius} fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-xl font-extrabold text-ink-900 tabular-nums">{displayScore}%</span>
        <div className="absolute w-36 h-36 border-2 border-brand-400/10 rounded-full animate-pulse-ring" />
      </div>
    </div>
  );
}
