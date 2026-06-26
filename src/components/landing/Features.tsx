import React from "react";

const features = [
  { icon: "code", title: "LaTeX Preservation", desc: "Your custom macros, TikZ, and formatting stay untouched. We only edit the content." },
  { icon: "key", title: "Keyword Extraction", desc: "Extracts the top 15 ATS keywords from any job description using semantic analysis." },
  { icon: "compare_arrows", title: "Side-by-Side Comparison", desc: "See exactly what changed — original vs optimized, with color-coded diffs." },
  { icon: "speed", title: "ATS Score", desc: "Before and after ATS match scores so you know exactly how much you improved." },
  { icon: "auto_awesome", title: "Smart Rewriting", desc: "AI adds missing keywords naturally into existing bullet points. No fabrication." },
  { icon: "bolt", title: "30 Second Results", desc: "Paste, click, done. No account setup required to get started." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Built for Technical Resumes</h2>
          <p className="text-neutral-500">Everything you need to beat the ATS, nothing you don&apos;t.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="border border-neutral-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-600" style={{ fontSize: 20 }}>{f.icon}</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
