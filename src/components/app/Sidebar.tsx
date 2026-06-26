"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "dashboard", label: "Dashboard", href: "/app/dashboard" },
  { icon: "auto_fix_high", label: "Workspace", href: "/app/workspace" },
  { icon: "history", label: "History", href: "/app/history" },
  { icon: "person", label: "Profile", href: "/app/profile" },
  { icon: "settings", label: "Settings", href: "/app/settings" },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-neutral-200">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-neutral-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>description</span>
          </div>
          <span className="font-bold text-neutral-900 text-[15px]">Resume Tailor AI</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1 text-neutral-400 hover:text-neutral-900">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-primary-50 text-primary-700 font-semibold"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              }`}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: User */}
      <div className="px-3 py-4 border-t border-neutral-100">
        <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mb-3">
          + New Resume
        </button>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">U</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-neutral-900 truncate">User</div>
            <div className="text-[10px] text-neutral-400">Free Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
