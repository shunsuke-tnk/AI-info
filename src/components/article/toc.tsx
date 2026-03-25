"use client";

import { useState, useEffect } from "react";
import type { TocItem } from "@/types/article";

interface TocProps {
  headings: TocItem[];
}

export function TableOfContents({ headings }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="目次">
      <h2 className="text-sm font-[family-name:var(--font-ui)] font-medium text-[var(--color-deep-slate)] mb-4">
        目次
      </h2>
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-[13px] leading-snug py-1 transition-colors duration-150 ${
                activeId === heading.id
                  ? "text-[var(--color-slate-blue)] font-medium"
                  : "text-[var(--color-cool-gray)] hover:text-[var(--color-deep-slate)]"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

