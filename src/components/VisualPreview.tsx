"use client";

import React, { useState, useMemo } from "react";
import { TailorResponse } from "@/types";

interface VisualPreviewProps {
  originalLatex: string;
  result: TailorResponse;
}

export default function VisualPreview({ originalLatex, result }: VisualPreviewProps) {
  const [viewState, setViewState] = useState<"original" | "optimized">("optimized");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "found" | "added" | "missing">("all");

  const { keywordsFound, keywordsAdded, keywordsMissing } = result;

  // 1. Calculate all unique required keywords and their status
  const requiredKeywords = useMemo(() => {
    const list: { keyword: string; status: "found" | "added" | "missing" }[] = [];
    
    // Found in original
    keywordsFound.forEach(kw => {
      if (kw && !list.some(item => item.keyword.toLowerCase() === kw.toLowerCase())) {
        list.push({ keyword: kw, status: "found" });
      }
    });

    // Added by AI
    keywordsAdded.forEach(kw => {
      if (kw && !list.some(item => item.keyword.toLowerCase() === kw.toLowerCase())) {
        list.push({ keyword: kw, status: "added" });
      }
    });

    // Missing (not in original and not added)
    keywordsMissing.forEach(kw => {
      if (kw && !list.some(item => item.keyword.toLowerCase() === kw.toLowerCase())) {
        // Double check it wasn't actually added
        const wasAdded = keywordsAdded.some(a => a.toLowerCase() === kw.toLowerCase());
        list.push({ keyword: kw, status: wasAdded ? "added" : "missing" });
      }
    });

    return list;
  }, [keywordsFound, keywordsAdded, keywordsMissing]);

  // Filtered keywords
  const filteredKeywords = useMemo(() => {
    return requiredKeywords.filter(kw => {
      const matchesSearch = kw.keyword.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeFilter === "all") return true;
      return kw.status === activeFilter;
    });
  }, [requiredKeywords, searchQuery, activeFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = requiredKeywords.length;
    const found = requiredKeywords.filter(k => k.status === "found").length;
    const added = requiredKeywords.filter(k => k.status === "added").length;
    const missing = requiredKeywords.filter(k => k.status === "missing").length;
    const satisfied = found + added;
    const score = total > 0 ? Math.round((satisfied / total) * 100) : 0;
    
    return { total, found, added, missing, satisfied, score };
  }, [requiredKeywords]);

  // 2. Parse LaTeX to clean HTML and highlight keywords
  const parsedHtml = useMemo(() => {
    const latexToParse = viewState === "original" ? originalLatex : result.updatedLatex;
    if (!latexToParse) return "";

    // A. Strip comments
    let clean = latexToParse
      .split("\n")
      .map(line => line.replace(/%.*/, "")) // remove comments
      .join("\n");

    // B. Strip LaTeX header/wrapper
    clean = clean.replace(/\\documentclass[\s\S]*?\\begin\{document\}/i, "");
    clean = clean.replace(/\\end\{document\}/i, "");
    clean = clean.replace(/\\maketitle/i, "");
    clean = clean.replace(/\\begin\{center\}/g, '<div class="text-center my-3 text-neutral-800">');
    clean = clean.replace(/\\end\{center\}/g, '</div>');

    // C. Convert core headers and formats
    let html = clean;
    html = html.replace(/\\section\*?\{([^}]+)\}/g, (_, title) => {
      return `<h2 class="text-xs font-bold border-b border-neutral-300 pb-0.5 mt-5 mb-2.5 text-neutral-900 uppercase tracking-wider font-sans">${title}</h2>`;
    });

    html = html.replace(/\\subsection\*?\{([^}]+)\}/g, (_, title) => {
      return `<h3 class="text-xs font-bold text-neutral-800 mt-3 mb-1 font-sans">${title}</h3>`;
    });

    html = html.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
    html = html.replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>');
    html = html.replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '<a href="$1" target="_blank" class="text-primary-600 hover:underline">$2</a>');
    html = html.replace(/\\url\{([^}]+)\}/g, '<a href="$1" target="_blank" class="text-primary-600 hover:underline">$1</a>');

    // D. Convert lists
    html = html.replace(/\\begin\{itemize\}/g, '<ul class="list-disc pl-5 space-y-1.5 my-2">');
    html = html.replace(/\\end\{itemize\}/g, '</ul>');
    html = html.replace(/\\item\s+/g, '<li class="text-neutral-700 text-[13px] leading-relaxed">');

    // E. Convert alignment structure (\hfill) to Flexbox
    html = html.split("\n").map(line => {
      if (line.includes("\\hfill")) {
        const parts = line.split("\\hfill");
        if (parts.length === 2) {
          return `<div class="flex justify-between w-full items-baseline gap-2"><span>${parts[0].trim()}</span><span class="text-[11px] text-neutral-500 font-medium shrink-0 font-sans">${parts[1].trim()}</span></div>`;
        }
      }
      return line;
    }).join("\n");

    // F. Newlines
    html = html.replace(/\\\\/g, '<br/>');

    // G. Cleanup miscellaneous commands
    html = html.replace(/\\small/g, '');
    html = html.replace(/\\large/g, '');
    html = html.replace(/\\normalsize/g, '');
    html = html.replace(/\\centering/g, '');
    html = html.replace(/\\noindent/g, '');
    html = html.replace(/\\vspace\{[^}]*\}/g, '');
    html = html.replace(/\\hspace\{[^}]*\}/g, '');
    html = html.replace(/\\[a-zA-Z]+/g, ''); // catch-all for remaining commands

    // H. Apply Dynamic Keyword Highlighting in a single regex pass
    const activeKeywords = viewState === "original"
      ? keywordsFound.map(k => ({ word: k, type: "found" }))
      : [
          ...keywordsAdded.map(k => ({ word: k, type: "added" })),
          ...keywordsFound.map(k => ({ word: k, type: "found" }))
        ];

    // Sort by length desc
    activeKeywords.sort((a, b) => b.word.length - a.word.length);

    const validKeywords = activeKeywords.filter(k => k.word.trim().length > 0);

    if (validKeywords.length > 0) {
      const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const kwAlternations = validKeywords.map(k => escapeRegExp(k.word)).join("|");
      
      // Match tag OR keyword with word boundaries
      const pattern = new RegExp(`(<[^>]+>)|(?<![a-zA-Z0-9])(${kwAlternations})(?![a-zA-Z0-9])`, "gi");
      
      const kwMap = new Map<string, string>();
      validKeywords.forEach(k => kwMap.set(k.word.toLowerCase(), k.type));

      html = html.replace(pattern, (match, tag, keyword) => {
        if (tag) return match;
        
        const type = kwMap.get(keyword.toLowerCase());
        const bgClass = type === "added" 
          ? "bg-primary-100/80 text-primary-950 border-b border-primary-500 font-semibold px-0.5 rounded"
          : "bg-green-100/80 text-green-950 border-b border-green-500 font-semibold px-0.5 rounded";
        const title = type === "added" ? "Added by Tailorly" : "Already in Resume";
        
        return `<span class="${bgClass} transition-colors select-all cursor-help" title="${title}">${keyword}</span>`;
      });
    }

    return html;
  }, [viewState, originalLatex, result, keywordsFound, keywordsAdded]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
      
      {/* Sidebar: Keyword Tracker Controls */}
      <div className="lg:col-span-4 bg-neutral-50 border-r border-neutral-200 flex flex-col h-[650px] lg:h-[700px]">
        {/* Toggle Mode */}
        <div className="p-4 border-b border-neutral-200 shrink-0">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">Resume Version</label>
          <div className="flex bg-neutral-200/60 p-0.5 rounded-lg text-xs w-full">
            <button
              onClick={() => setViewState("original")}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                viewState === "original" 
                  ? "bg-white text-neutral-800 shadow-sm" 
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Original Resume
            </button>
            <button
              onClick={() => setViewState("optimized")}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                viewState === "optimized" 
                  ? "bg-white text-neutral-800 shadow-sm" 
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Optimized Resume
            </button>
          </div>
        </div>

        {/* Statistics & Highlights */}
        <div className="px-4 py-3 border-b border-neutral-200 bg-white shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-neutral-600">Keyword Coverage</span>
            <span className="text-xs font-extrabold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md">
              {stats.satisfied}/{stats.total}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-neutral-150 h-2 rounded-full overflow-hidden mb-2.5">
            <div 
              className="bg-primary-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${stats.score}%` }}
            />
          </div>
          {/* Subtitle */}
          <div className="flex items-center gap-4 text-[10px] font-semibold text-neutral-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> {stats.found} Found
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-500" /> {stats.added} Added
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400" /> {stats.missing} Missing
            </span>
          </div>
        </div>

        {/* Keywords Filtering */}
        <div className="p-3 border-b border-neutral-200 shrink-0 space-y-2">
          {/* Search bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-neutral-400" style={{ fontSize: 16 }}>search</span>
            <input
              type="text"
              placeholder="Search required keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg focus:border-primary-400 focus:outline-none placeholder:text-neutral-400 font-sans"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1 text-[10px] font-bold">
            {[
              { id: "all", label: "All" },
              { id: "found", label: "Found", color: "text-green-600 bg-green-50 border-green-200" },
              { id: "added", label: "Added", color: "text-primary-600 bg-primary-50 border-primary-200" },
              { id: "missing", label: "Missing", color: "text-red-500 bg-red-50 border-red-200" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-2 py-1 border rounded-md transition-all ${
                  activeFilter === f.id
                    ? "bg-neutral-800 text-white border-neutral-800"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable list of required keywords */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
          {filteredKeywords.length === 0 ? (
            <div className="text-center py-8 text-xs text-neutral-400">
              No keywords match the filters.
            </div>
          ) : (
            filteredKeywords.map(kw => {
              let icon = "check_circle";
              let iconColor = "text-green-500";
              let bg = "bg-white border-neutral-200";
              let statusLabel = "Already Present";
              let subtext = "Matches resume content";

              if (kw.status === "added") {
                icon = "add_circle";
                iconColor = "text-primary-500";
                statusLabel = "Added by Tailorly";
                subtext = "Successfully tailored into bullets";
              } else if (kw.status === "missing") {
                icon = "cancel";
                iconColor = "text-red-400";
                statusLabel = "Missing / Not Added";
                subtext = "Not found & couldn't fit naturally";
              }

              return (
                <div key={kw.keyword} className={`p-2.5 rounded-lg border text-left flex items-start justify-between gap-3 shadow-xs ${bg}`}>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-neutral-800 break-words">{kw.keyword}</h4>
                    <p className="text-[10px] text-neutral-400 font-medium">{subtext}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>
                      {icon}
                    </span>
                    <span className={`text-[9px] font-extrabold uppercase tracking-wider ${iconColor}`}>
                      {kw.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Panel: Visual A4 Document Sheet */}
      <div className="lg:col-span-8 p-4 lg:p-6 flex flex-col bg-neutral-100 overflow-hidden h-[650px] lg:h-[700px]">
        <div className="flex justify-between items-center mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-neutral-600" style={{ fontSize: 18 }}>pageview</span>
            <h3 className="text-sm font-semibold text-neutral-700">Resume Preview Sheet</h3>
          </div>
          <span className="text-[10px] font-bold text-neutral-400 bg-neutral-200 px-2.5 py-1 rounded-md uppercase tracking-wider">
            {viewState === "original" ? "Original" : "Optimized"} View
          </span>
        </div>

        {/* Paper Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white shadow-lg border border-neutral-200 rounded-lg p-6 md:p-10 font-serif max-w-[800px] mx-auto w-full select-text text-left">
          {/* Parsed HTML */}
          <div 
            className="prose prose-sm max-w-none text-neutral-800 space-y-4"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
          />
        </div>
      </div>

    </div>
  );
}
