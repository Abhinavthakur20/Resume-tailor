import React from "react";

const benefits = [
  { value: "3x", label: "More interview calls", desc: "Users report 3x more callbacks after optimizing with Resume Tailor AI." },
  { value: "30s", label: "Per resume", desc: "What used to take 30 minutes now takes 30 seconds." },
  { value: "94%", label: "Average ATS score", desc: "Our optimized resumes score 94% on average against ATS scanners." },
  { value: "15+", label: "Keywords per scan", desc: "We extract and match 15+ keywords from every job description." },
];

export default function Benefits() {
  return (
    <section className="py-20 px-6 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Why Freshers Love Us</h2>
          <p className="text-neutral-500">200+ applications, 0 responses? Not anymore.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.label} className="bg-white border border-neutral-200 rounded-xl p-6 text-center">
              <div className="text-3xl font-extrabold text-primary-500 mb-1">{b.value}</div>
              <div className="font-semibold text-neutral-900 text-sm mb-2">{b.label}</div>
              <p className="text-xs text-neutral-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
