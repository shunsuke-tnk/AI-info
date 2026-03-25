"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CONTENT_CATEGORIES } from "@/lib/categories";
import { SITE_NAME } from "@/lib/constants";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* パネル */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--color-snow-white)] shadow-lg">
        <div className="flex h-16 items-center justify-between px-4 border-b border-[var(--color-light-border)]">
          <span className="font-[family-name:var(--font-ui)] font-semibold text-[var(--color-deep-slate)]">
            {SITE_NAME}
          </span>
          <button
            type="button"
            className="p-2 text-[var(--color-cool-gray)] hover:text-[var(--color-deep-slate)]"
            onClick={onClose}
            aria-label="メニューを閉じる"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-6 space-y-1" aria-label="モバイルナビゲーション">
          <Link
            href="/articles"
            className="block px-3 py-3 text-sm font-[family-name:var(--font-ui)] font-medium text-[var(--color-slate-blue)] rounded-md"
            onClick={onClose}
          >
            すべての記事
          </Link>

          <div className="pt-3 pb-2 px-3">
            <span className="text-xs font-[family-name:var(--font-ui)] font-medium text-[var(--color-cool-gray)] uppercase tracking-wider">
              カテゴリ
            </span>
          </div>

          {CONTENT_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="block px-3 py-3 text-sm text-[var(--color-deep-slate)] hover:bg-[var(--color-warm-gray)] rounded-md transition-colors"
              onClick={onClose}
            >
              <span className="font-[family-name:var(--font-ui)]">
                {cat.label}
              </span>
              <span className="block mt-0.5 text-xs text-[var(--color-cool-gray)]">
                {cat.description}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
