"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTENT_CATEGORIES } from "@/lib/categories";
import { SITE_NAME } from "@/lib/constants";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-snow-white)]/95 backdrop-blur-sm border-b border-[var(--color-light-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-ui)] font-semibold text-lg tracking-tight text-[var(--color-deep-slate)] hover:text-[var(--color-slate-blue)] transition-colors duration-200"
          >
            <span className="text-[var(--color-slate-blue)]" aria-hidden="true">
              /
            </span>
            {SITE_NAME}
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="メインナビゲーション">
            {CONTENT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-2 text-sm font-[family-name:var(--font-ui)] text-[var(--color-cool-gray)] hover:text-[var(--color-deep-slate)] transition-colors duration-200 rounded-md hover:bg-[var(--color-warm-gray)]"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* 右側アクション */}
          <div className="flex items-center gap-3">
            <Link
              href="/articles"
              className="hidden sm:inline-flex text-sm font-[family-name:var(--font-ui)] text-[var(--color-slate-blue)] hover:text-[var(--color-dusty-rose)] transition-colors duration-200"
            >
              すべての記事
            </Link>

            {/* モバイルメニューボタン */}
            <button
              type="button"
              className="lg:hidden p-2 text-[var(--color-cool-gray)] hover:text-[var(--color-deep-slate)] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="メニューを開く"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
