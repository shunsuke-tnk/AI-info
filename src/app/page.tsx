import Image from "next/image";
import Link from "next/link";
import { CONTENT_CATEGORIES } from "@/lib/categories";
import { getAllArticles, getFeaturedArticles } from "@/lib/mdx";
import { ArticleCard } from "@/components/article/article-card";

export default function Home() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles();
  const latest = allArticles.slice(0, 6);

  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative w-full">
        <Image
          src="/images/hero/top.png"
          alt="AI Shelf"
          width={2000}
          height={800}
          className="w-full h-auto"
          priority
        />
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center px-7 py-3.5 text-sm font-[family-name:var(--font-ui)] font-semibold text-gray-900 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white/80 transition-all duration-200"
              >
                記事を読む
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-7 py-3.5 text-sm font-[family-name:var(--font-ui)] font-semibold text-gray-700 rounded-lg border border-gray-300 hover:border-gray-500 hover:text-gray-900 transition-all duration-200"
              >
                AI Shelfとは
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ピックアップ記事 */}
      {featured.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-deep-slate)]">
              ピックアップ
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featured.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 最新記事 */}
      <section className="py-16 bg-[var(--color-warm-gray)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-deep-slate)]">
              最新記事
            </h2>
            <Link
              href="/articles"
              className="text-sm font-[family-name:var(--font-ui)] font-medium text-[var(--color-slate-blue)] hover:text-[var(--color-dusty-rose)] transition-colors"
            >
              すべて見る
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* カテゴリセクション */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-deep-slate)]">
            カテゴリ
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTENT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group p-6 rounded-lg bg-white border border-[var(--color-light-border)] hover:border-[var(--color-slate-blue)] transition-all duration-200 hover:shadow-[0_2px_12px_rgba(67,56,202,0.08)]"
              >
                <h3 className="font-[family-name:var(--font-ui)] font-semibold text-[var(--color-deep-slate)] group-hover:text-[var(--color-slate-blue)] transition-colors">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-cool-gray)] leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
