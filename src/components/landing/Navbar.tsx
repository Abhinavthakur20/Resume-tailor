"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-full shadow-lg transition-all duration-300">
      <nav className="px-6 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>description</span>
          </div>
          <span className="text-xl font-semibold italic text-neutral-950 tracking-wide" style={{ fontFamily: "var(--font-cormorant), serif" }}>Tailorly</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-xs font-bold text-neutral-500 hover:text-neutral-900 uppercase tracking-wider transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/app/workspace"
            className="text-xs font-bold bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow uppercase tracking-wider">
            Workspace
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-1.5 text-neutral-600 hover:text-neutral-900 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{open ? "close" : "menu"}</span>
        </button>
      </nav>

      {/* Floating Mobile Menu */}
      {open && (
        <div className="absolute top-[64px] left-0 w-full md:hidden bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-2xl shadow-xl p-4 flex flex-col gap-2.5 animate-fade-up">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} 
              className="text-sm font-semibold text-neutral-700 hover:text-neutral-950 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
              {l.label}
            </a>
          ))}
          <div className="h-px bg-neutral-100 my-1" />
          <Link href="/app/workspace" onClick={() => setOpen(false)} 
            className="block text-sm font-bold bg-primary-500 hover:bg-primary-600 text-white text-center py-2.5 rounded-full shadow-sm">
            Go to Workspace
          </Link>
        </div>
      )}
    </header>
  );
}
