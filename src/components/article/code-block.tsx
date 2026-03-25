"use client";

import { useState, useRef } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const language = className?.replace("language-", "") || "";

  const handleCopy = async () => {
    const text = preRef.current?.textContent || "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-md overflow-hidden bg-[#1e293b]">
      {language && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#0f172a] border-b border-slate-700">
          <span className="text-[11px] font-[family-name:var(--font-ui)] font-medium text-slate-400">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1 text-[11px] font-[family-name:var(--font-ui)] rounded bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-150"
            aria-label="コードをコピー"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      {!language && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[11px] font-[family-name:var(--font-ui)] rounded bg-slate-700 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-slate-600 hover:text-white transition-all duration-150"
          aria-label="コードをコピー"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
      <pre ref={preRef} className="p-4 overflow-x-auto text-sm leading-relaxed text-slate-200 m-0">
        {children}
      </pre>
    </div>
  );
}
