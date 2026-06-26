import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md bg-primary-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>description</span>
            </div>
            <span className="font-bold text-neutral-900">Resume Tailor AI</span>
          </div>
          <p className="text-sm text-neutral-400 max-w-xs">
            AI-powered ATS optimization for LaTeX resumes. Built for freshers and developers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Product</h4>
            <ul className="space-y-2 text-neutral-500">
              <li><a href="#features" className="hover:text-neutral-900 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-neutral-900 transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-neutral-900 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Company</h4>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="#" className="hover:text-neutral-900 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Legal</h4>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="#" className="hover:text-neutral-900 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-neutral-900 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-neutral-100 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} Resume Tailor AI. All rights reserved.
      </div>
    </footer>
  );
}
