import React from "react";

const testimonials = [
  {
    name: "Priya S.",
    role: "Frontend Developer",
    text: "I was applying to 10+ jobs a day with zero callbacks. After using Tailorly, I got 4 interview calls in one week. The keyword matching is spot on.",
    avatar: "PS",
  },
  {
    name: "Rahul M.",
    role: "Data Analyst",
    text: "The side-by-side comparison is brilliant. I could see exactly what the AI changed and why. My ATS score went from 42% to 91%.",
    avatar: "RM",
  },
  {
    name: "Sneha K.",
    role: "Backend Engineer",
    text: "I love that it keeps my LaTeX formatting intact. Other tools always break my custom macros. This one just works.",
    avatar: "SK",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">What Users Say</h2>
          <p className="text-neutral-500">Real feedback from developers and job seekers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-neutral-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="material-symbols-outlined text-yellow-400" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">{t.avatar}</div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
                  <div className="text-xs text-neutral-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
