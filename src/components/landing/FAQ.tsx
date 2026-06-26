"use client";
import React, { useState } from "react";

const faqs = [
  { q: "Does it support custom LaTeX classes and macros?", a: "Yes. Resume Tailor AI understands your LaTeX structure — custom commands, packages, TikZ, everything. We only modify the text content, never the formatting or code structure." },
  { q: "Will the AI fabricate skills or experience I don't have?", a: "No. The AI is instructed to only add keywords that can be naturally integrated into your existing bullet points. It will never invent experience, certifications, or skills you don't have." },
  { q: "How does the ATS scoring work?", a: "We extract the top 15 most important keywords from the job description, then calculate what percentage of those keywords appear in your resume — before and after optimization." },
  { q: "Can I use this with Overleaf?", a: "Absolutely. Copy the optimized LaTeX code, paste it into your Overleaf project, compile, and you're done. It's designed for that exact workflow." },
  { q: "Is my resume data stored or shared?", a: "No. Your resume and job description are sent to the AI for processing and immediately discarded. We don't store, log, or share your data." },
  { q: "What AI model do you use?", a: "We use Claude by Anthropic — one of the best language models available for precise text editing and understanding technical content." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-neutral-500">Common questions about Resume Tailor AI.</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors"
              >
                <span className="font-medium text-sm text-neutral-900 pr-4">{faq.q}</span>
                <span className="material-symbols-outlined text-neutral-400 shrink-0 transition-transform duration-200"
                  style={{ fontSize: 20, transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                  expand_more
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
