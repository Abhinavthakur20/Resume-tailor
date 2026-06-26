import React from "react";

const steps = [
  {
    icon: "upload_file",
    title: "Upload Your Resume",
    description: "Paste your LaTeX resume or drag & drop a .tex file. Your formatting stays intact.",
  },
  {
    icon: "psychology",
    title: "AI Analyzes & Optimizes",
    description: "Our AI compares your resume against the job description, identifies missing keywords, and rewrites bullet points.",
  },
  {
    icon: "download",
    title: "Download & Apply",
    description: "Copy the optimized LaTeX, paste it in Overleaf, compile, and apply. Done in 30 seconds.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">How It Works</h2>
          <p className="text-neutral-500">Three simple steps to an ATS-optimized resume.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Step number */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-neutral-300" />
                )}
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary-600" style={{ fontSize: 22 }}>{step.icon}</span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
