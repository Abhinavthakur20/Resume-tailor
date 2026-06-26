import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-44 pb-36 px-8 sm:px-16 md:px-24 bg-linear-to-b from-neutral-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column - Headline & CTA */}
        <div className="lg:col-span-6 text-left space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold">
            <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>bolt</span>
            AI-Powered ATS Optimization
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-neutral-900 leading-[1.1] tracking-tight">
              Tailor your resume <br />
              <span className="text-primary-500">for every job.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-500 max-w-lg leading-relaxed pt-2">
              Paste your LaTeX resume and a job description. Our AI identifies missing keywords, 
              optimizes your content, and gives you an ATS-ready resume in 30 seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/app/workspace"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all shadow-md active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>rocket_launch</span>
              Go to Workspace
            </Link>
            <a href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 font-semibold px-8 py-4 rounded-xl text-base hover:bg-neutral-50 hover:border-neutral-400 transition-colors">
              See How It Works
            </a>
          </div>

          {/* Ratings */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-neutral-400 border-t border-neutral-100">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="material-symbols-outlined text-yellow-400" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
              <span className="ml-1 text-neutral-600 font-semibold">4.9/5 from 2,000+ users</span>
            </div>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span className="text-neutral-500">50,000+ resumes optimized</span>
          </div>
        </div>

        {/* Right Column - Premium Product Mockup */}
        <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end animate-fade-up">
          <div className="w-full max-w-lg bg-neutral-900 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 overflow-hidden border border-neutral-800">
            {/* Mock Window Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-[10px] text-neutral-500 font-medium font-mono px-2.5 py-1 bg-neutral-800 rounded">workspace.tex</div>
              <div className="w-12" />
            </div>

            {/* Split Screen Layout inside Mock */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* LaTeX Editor Panel */}
              <div className="md:col-span-6 bg-neutral-950 rounded-xl p-3.5 flex flex-col gap-2 border border-neutral-800/80 select-none">
                <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-1">LaTeX Source</div>
                <div className="font-mono text-[9px] text-neutral-400 space-y-1.5 leading-normal overflow-hidden h-[180px]">
                  <div><span className="text-orange-400">\documentclass</span>&#123;resume&#125;</div>
                  <div><span className="text-blue-400">\begin</span>&#123;document&#125;</div>
                  <div className="text-neutral-500 mt-2">\section&#123;Experience&#125;</div>
                  <div className="pl-3 text-neutral-500">\begin&#123;itemize&#125;</div>
                  
                  {/* Diff Lines */}
                  <div className="pl-3 text-red-400 font-semibold bg-red-950/40 rounded px-1.5 py-0.5 line-through decoration-red-500/50">
                    - Designed backend services.
                  </div>
                  <div className="pl-3 text-emerald-400 font-semibold bg-emerald-950/40 rounded px-1.5 py-0.5">
                    + Built REST APIs with Next.js, TypeScript & Tailwind CSS.
                  </div>

                  <div className="pl-3 text-red-400 font-semibold bg-red-950/40 rounded px-1.5 py-0.5 line-through decoration-red-500/50 mt-1">
                    - Wrote database queries.
                  </div>
                  <div className="pl-3 text-emerald-400 font-semibold bg-emerald-950/40 rounded px-1.5 py-0.5">
                    + Optimized Postgres queries, increasing throughput by 30%.
                  </div>
                </div>
              </div>

              {/* ATS Checker Panel */}
              <div className="md:col-span-6 bg-neutral-950 rounded-xl p-3.5 flex flex-col justify-between border border-neutral-800/80 select-none">
                <div>
                  <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-2">ATS Score Booster</div>
                  
                  {/* Scores Comparison */}
                  <div className="flex items-center justify-around py-3.5">
                    {/* Before */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-dashed border-red-500/30">
                        <span className="text-xs font-bold text-red-400">45%</span>
                      </div>
                      <span className="text-[8px] font-medium text-neutral-500">Before</span>
                    </div>

                    <span className="material-symbols-outlined text-neutral-700" style={{ fontSize: 16 }}>arrow_forward</span>

                    {/* After */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-emerald-950/30 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        <span className="text-xs font-extrabold text-emerald-400">98%</span>
                      </div>
                      <span className="text-[8px] font-bold text-emerald-400">Optimized</span>
                    </div>
                  </div>
                </div>

                {/* Keywords Chips */}
                <div className="space-y-1.5 pt-2.5 border-t border-neutral-900">
                  <div className="text-[8px] text-neutral-500 font-semibold uppercase tracking-wider">Matched Keywords</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[8px] bg-emerald-950/60 text-emerald-300 font-medium px-1.5 py-0.5 rounded border border-emerald-900/60 flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" /> Next.js
                    </span>
                    <span className="text-[8px] bg-emerald-950/60 text-emerald-300 font-medium px-1.5 py-0.5 rounded border border-emerald-900/60 flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" /> TypeScript
                    </span>
                    <span className="text-[8px] bg-emerald-950/60 text-emerald-300 font-medium px-1.5 py-0.5 rounded border border-emerald-900/60 flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" /> Tailwind
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Row */}
      <div className="max-w-6xl mx-auto mt-28 pt-12 border-t border-neutral-200/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">3x</div>
            <div className="text-xs sm:text-sm font-semibold text-neutral-700">More Interview Calls</div>
            <p className="text-[11px] text-neutral-400 leading-normal">Users report 3x more recruiter responses.</p>
          </div>
          <div className="text-center md:text-left space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">30s</div>
            <div className="text-xs sm:text-sm font-semibold text-neutral-700">Optimization Time</div>
            <p className="text-[11px] text-neutral-400 leading-normal">What took hours is now done in seconds.</p>
          </div>
          <div className="text-center md:text-left space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">94%</div>
            <div className="text-xs sm:text-sm font-semibold text-neutral-700">Average ATS Match</div>
            <p className="text-[11px] text-neutral-400 leading-normal">Highly tailored matching against core criteria.</p>
          </div>
          <div className="text-center md:text-left space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">15+</div>
            <div className="text-xs sm:text-sm font-semibold text-neutral-700">Keywords Extracted</div>
            <p className="text-[11px] text-neutral-400 leading-normal">Deep semantic parsing of skills and tools.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
