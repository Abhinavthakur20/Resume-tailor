"use client";
import React, { useState } from "react";
import Sidebar from "@/components/app/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* We pass sidebar toggle via context or props in child pages */}
        <div className="flex-1 overflow-y-auto" data-sidebar-toggle="" onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-menu-toggle]')) {
            setSidebarOpen(true);
          }
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
