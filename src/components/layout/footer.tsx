import Link from "next/link";
import { CONTENT_CATEGORIES } from "@/lib/categories";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto bg-[var(--color-warm-gray)] border-t border-[var(--color-light-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サイト情報 */}
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-ui)] font-semibold text-lg text-[var(--color-deep-slate)]"
            >
              <span className="text-[var(--color-slate-blue)]">/</span>{" "}
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-[var(--color-cool-gray)] leading-relaxed">
              AI自動化の知識を、体系的に蓄積する。
              <br />
              全てが自動化していく未来に向けて。
            </p>
          </div>

          {/* カテゴリ */}
          <div>
            <h3 className="font-[family-name:var(--font-ui)] text-sm font-medium text-[var(--color-deep-slate)] mb-4">
              カテゴリ
            </h3>
            <ul className="space-y-2">
              {CONTENT_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-[var(--color-cool-gray)] hover:text-[var(--color-slate-blue)] transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* リンク */}
          <div>
            <h3 className="font-[family-name:var(--font-ui)] text-sm font-medium text-[var(--color-deep-slate)] mb-4">
              リンク
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-[var(--color-cool-gray)] hover:text-[var(--color-slate-blue)] transition-colors"
                >
                  すべての記事
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--color-cool-gray)] hover:text-[var(--color-slate-blue)] transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-light-border)]">
          <p className="text-xs text-[var(--color-cool-gray)] text-center font-[family-name:var(--font-ui)]">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
