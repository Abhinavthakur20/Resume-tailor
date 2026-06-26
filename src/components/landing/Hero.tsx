import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-6">
          <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>bolt</span>
          AI-Powered ATS Optimization
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight tracking-tight mb-6">
          Tailor your resume<br />
          <span className="text-primary-500">for every job.</span>
        </h1>

        <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Paste your LaTeX resume and a job description. Our AI identifies missing keywords, 
          optimizes your content, and gives you an ATS-ready resume in 30 seconds.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/app/workspace"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>rocket_launch</span>
            Go to Workspace
          </Link>
          <a href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 font-semibold px-8 py-3.5 rounded-lg text-base hover:bg-neutral-50 transition-colors">
            See How It Works
          </a>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-400">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="material-symbols-outlined text-yellow-400" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
            ))}
            <span className="ml-1 text-neutral-500 font-medium">4.9/5 from 2,000+ users</span>
          </div>
          <span className="hidden sm:inline text-neutral-300">•</span>
          <span className="text-neutral-500">50,000+ resumes optimized</span>
        </div>
      </div>
    </section>
  );
}
