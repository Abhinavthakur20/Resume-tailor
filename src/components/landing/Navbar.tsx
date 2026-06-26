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
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>description</span>
          </div>
          <span className="text-xl font-semibold italic text-neutral-950 tracking-wide" style={{ fontFamily: "var(--font-playfair), serif" }}>Tailorly</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/app/workspace"
            className="text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
            Go to Workspace
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-neutral-600">
          <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-6 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-neutral-600 py-2">{l.label}</a>
          ))}
          <Link href="/app/workspace" onClick={() => setOpen(false)} className="block text-sm font-semibold bg-primary-500 text-white text-center px-4 py-2.5 rounded-lg mt-2">
            Go to Workspace
          </Link>
        </div>
      )}
    </header>
  );
}
