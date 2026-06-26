import React from "react";

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-32 px-6 md:px-12 bg-neutral-50/70 border-t border-b border-neutral-200/50">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold bg-primary-50 text-primary-600 border border-primary-100/80 uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>stars</span>
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Built for Technical Resumes
          </h2>
          <p className="text-base text-neutral-500 leading-relaxed">
            Unlike generic AI writing templates, Tailorly is engineered to respect complex LaTeX source structures and parse developer skills precisely.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: LaTeX Code Preservation (col-span-2) */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-neutral-200/80 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary-500/25 transition-all duration-300 flex flex-col justify-between overflow-hidden relative min-h-[320px]">
            <div className="max-w-md space-y-3 z-10">
              <span className="text-[10px] uppercase tracking-wider text-primary-600 font-bold bg-primary-50 px-2.5 py-1 rounded-full border border-primary-200/50">Core technology</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">LaTeX Layout Preservation</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Your custom macros, document styling, tables, and formatting packages remain 100% untouched. We parse the document node tree and only optimize the text content of your experience items.
              </p>
            </div>
            
            {/* Visual element representing parsed tree / latex code */}
            <div className="absolute right-[-20px] bottom-[-20px] w-[280px] h-[150px] bg-neutral-950 rounded-tl-xl p-4 shadow-xl border-t border-l border-neutral-800 font-mono text-[9px] text-neutral-400 select-none overflow-hidden hidden sm:block">
              <div className="flex items-center gap-1.5 border-b border-neutral-900 pb-2 mb-2 text-neutral-600">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                <span>parser_output.tex</span>
              </div>
              <div className="space-y-1">
                <div><span className="text-orange-400">\newcommand</span>&#123;\role&#125;[1]&#123;\textbf&#123;#1&#125;&#125;</div>
                <div><span className="text-blue-400">\begin</span>&#123;rSection&#125;&#123;Skills&#125;</div>
                <div className="pl-3 text-neutral-600">% Format tags are kept intact</div>
                <div className="pl-3 text-emerald-400 bg-emerald-950/40 rounded px-1">+ \item \role&#123;Frontend&#125;: React, TypeScript, Next.js</div>
                <div className="pl-3 text-neutral-500">\end&#123;rSection&#125;</div>
              </div>
            </div>
          </div>

          {/* Card 2: Semantic ATS Keyword Extraction (col-span-1) */}
          <div className="bg-white rounded-2xl p-8 border border-neutral-200/80 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary-500/25 transition-all duration-300 flex flex-col justify-between min-h-[320px]">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-primary-600 font-bold bg-primary-50 px-2.5 py-1 rounded-full border border-primary-200/50">ATS Analyzer</span>
              <h3 className="text-xl font-extrabold text-neutral-900">Semantic Matching</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                We extract the exact technical stack the hiring managers want, avoiding arbitrary density stuffing and matching synonyms contextually.
              </p>
            </div>
            
            {/* Visual element: tag list */}
            <div className="flex flex-wrap gap-1.5 pt-4">
              <span className="text-[10px] bg-neutral-200/70 text-neutral-700 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-neutral-300/40">
                <span className="w-1 h-1 rounded-full bg-neutral-500" /> CI/CD
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Docker
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> AWS S3
              </span>
              <span className="text-[10px] bg-neutral-200/70 text-neutral-700 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-neutral-300/40">
                <span className="w-1 h-1 rounded-full bg-neutral-500" /> Python
              </span>
            </div>
          </div>

          {/* Card 3: Bullet Optimization (col-span-1) */}
          <div className="bg-white rounded-2xl p-8 border border-neutral-200/80 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary-500/25 transition-all duration-300 flex flex-col justify-between min-h-[320px]">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-primary-600 font-bold bg-primary-50 px-2.5 py-1 rounded-full border border-primary-200/50">AI Copilot</span>
              <h3 className="text-xl font-extrabold text-neutral-900">Honest Rewriting</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                The AI does not hallucinate experiences. It takes your existing descriptions and integrates keywords naturally with powerful active verbs.
              </p>
            </div>
            
            {/* Visual element: simple bullet comparison */}
            <div className="bg-white rounded-xl p-3.5 border border-neutral-200 space-y-2 mt-4 text-[10px]">
              <div className="text-neutral-400 font-medium">Original bullet:</div>
              <div className="text-neutral-500 line-through">I was handling database tasks.</div>
              <div className="text-neutral-400 font-medium">Optimized:</div>
              <div className="text-emerald-600 font-semibold bg-emerald-50/50 p-2 rounded border border-emerald-100">
                Optimized <span className="underline decoration-emerald-300">PostgreSQL</span> schema index structures, accelerating data querying by 30%.
              </div>
            </div>
          </div>

          {/* Card 4: Side-by-side Diff View (col-span-2) */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-neutral-200/80 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary-500/25 transition-all duration-300 flex flex-col justify-between overflow-hidden relative min-h-[320px]">
            <div className="max-w-md space-y-3 z-10">
              <span className="text-[10px] uppercase tracking-wider text-primary-600 font-bold bg-primary-50 px-2.5 py-1 rounded-full border border-primary-200/50">Interface</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">Side-by-Side Diff Tool</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Analyze and double check optimizations with clear color-coded differences. Tweak individual lines directly inside the browser editor before exporting.
              </p>
            </div>

            {/* Visual element: side-by-side diff mock */}
            <div className="absolute right-[-20px] bottom-[-20px] w-[300px] h-[150px] bg-white rounded-tl-xl p-3 shadow-xl border-t border-l border-neutral-200 flex flex-col gap-2 select-none overflow-hidden hidden sm:block">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5 text-[9px] text-neutral-400 font-medium">
                <span>Optimized Comparison</span>
                <span className="bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded text-[8px]">Split view</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[8px] font-mono leading-normal h-full">
                <div className="border-r border-neutral-100 pr-1 text-neutral-400 space-y-1">
                  <div className="text-neutral-300 bg-neutral-50 px-1">% original</div>
                  <div className="line-through text-red-500 bg-red-50/50 px-0.5 rounded">Wrote APIs in JavaScript.</div>
                </div>
                <div className="pl-1 text-neutral-500 space-y-1">
                  <div className="text-neutral-400 bg-neutral-50 px-1">% optimized</div>
                  <div className="text-emerald-600 bg-emerald-50/50 px-0.5 rounded font-semibold">+ Created APIs in Node/TS.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
