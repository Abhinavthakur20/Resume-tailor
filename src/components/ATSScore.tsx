"use client";
import React, { useEffect, useState } from "react";

interface ATSScoreProps { scoreBefore: number; scoreAfter: number; }

export default function ATSScore({ scoreBefore, scoreAfter }: ATSScoreProps) {
  const [display, setDisplay] = useState(0);
  const improvement = scoreAfter - scoreBefore;
  const r = 42, circ = 2 * Math.PI * r;
  const offset = circ - (display / 100) * circ;

  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.floor(scoreAfter / 30));
    const iv = setInterval(() => {
      cur = Math.min(cur + step, scoreAfter);
      setDisplay(cur);
      if (cur >= scoreAfter) clearInterval(iv);
    }, 25);
    return () => clearInterval(iv);
  }, [scoreAfter]);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-5">
      {/* Ring */}
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
          <circle cx="50" cy="50" r={r} fill="none" stroke="#f97316" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset} className="transition-all duration-500 ease-out" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-neutral-900">{display}%</span>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">ATS Match Score</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-neutral-400 line-through">{scoreBefore}% before</span>
          <span className="inline-flex items-center gap-0.5 text-green-600 font-semibold text-xs bg-green-50 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined" style={{ fontSize: 13 }}>trending_up</span>
            +{improvement}%
          </span>
        </div>
      </div>
    </div>
  );
}
