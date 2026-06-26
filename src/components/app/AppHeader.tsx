"use client";
import React from "react";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
  actions?: React.ReactNode;
}

export default function AppHeader({ title, subtitle, onMenuToggle, actions }: AppHeaderProps) {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-neutral-200 bg-white shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="md:hidden p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg">
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>menu</span>
        </button>
        <div>
          <h1 className="font-semibold text-neutral-900 text-lg leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-neutral-400">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
