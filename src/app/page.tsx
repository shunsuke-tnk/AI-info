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
      <section
        className="relative w-full"
        style={{ height: 'clamp(260px, 40vw, 80vh)' }}
      >
        <Image
          src="/images/hero/top.png"
          alt="AI Shelf"
          fill
          className="object-cover object-left-top"
          priority
          sizes="100vw"
        />
        <div
          className="absolute left-0 right-0 z-10"
          style={{ bottom: 'clamp(20px, 8vw, 160px)' }}
        >
          <div className="pl-[5%]">
            <div className="flex gap-3 sm:gap-4 md:gap-6">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 lg:px-14 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-ui)] font-semibold text-gray-900 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-[#BE185D] hover:text-white hover:border-[#BE185D] transition-all duration-200"
              >
                記事を読む
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 lg:px-14 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-ui)] font-semibold text-gray-700 bg-white/40 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-[#BE185D] hover:text-white hover:border-[#BE185D] transition-all duration-200"
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
