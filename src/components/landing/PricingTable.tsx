import React from "react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Try it out, no credit card needed.",
    features: ["3 resumes / month", "Basic keyword analysis", "Standard LaTeX support", "ATS score check"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    desc: "For active job seekers who want the edge.",
    features: ["Unlimited resumes", "Deep ATS simulation", "Advanced semantic matching", "Side-by-side comparison", "Priority AI processing", "Resume history"],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For universities and career centers.",
    features: ["Everything in Pro", "Team management", "API access", "Custom prompts", "SSO / SAML", "Dedicated support"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingTable() {
  return (
    <section id="pricing" className="py-20 px-6 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Simple, Transparent Pricing</h2>
          <p className="text-neutral-500">Start free, upgrade when you need to.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((p) => (
            <div key={p.name}
              className={`rounded-xl p-6 border-2 flex flex-col ${
                p.popular
                  ? "border-primary-500 bg-white shadow-lg relative"
                  : "border-neutral-200 bg-white"
              }`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-semibold text-neutral-900 text-lg mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-neutral-900">{p.price}</span>
                  {p.period && <span className="text-sm text-neutral-400">{p.period}</span>}
                </div>
                <p className="text-sm text-neutral-500 mt-1">{p.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                    <span className="material-symbols-outlined text-primary-500 shrink-0" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/app/workspace"
                className={`w-full text-center py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  p.popular
                    ? "bg-primary-500 hover:bg-primary-600 text-white"
                    : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                }`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
