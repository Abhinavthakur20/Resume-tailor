import React from "react";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-20 px-8 sm:px-16 md:px-24 bg-neutral-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to land more interviews?</h2>
        <p className="text-neutral-400 mb-8 text-lg">
          Stop sending the same resume to every job. Tailor it in 30 seconds.
        </p>
        <Link href="/app/workspace"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>rocket_launch</span>
          Get Started — It&apos;s Free
        </Link>
      </div>
    </section>
  );
}
