import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { CONTENT_CATEGORIES, TOOL_TAGS } from "@/lib/categories";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const category = CONTENT_CATEGORIES.find((c) => c.slug === article.category);
  const toolLabels = article.tools
    .map((t) => TOOL_TAGS.find((tag) => tag.slug === t)?.label)
    .filter(Boolean);

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-lg bg-white border border-[var(--color-light-border)] hover:border-[var(--color-slate-blue)] transition-all duration-200 hover:shadow-[0_2px_12px_rgba(67,56,202,0.08)] overflow-hidden"
    >
      {/* サムネイル領域 */}
      <div className="aspect-[16/9] bg-[var(--color-warm-gray)] relative overflow-hidden">
        {article.thumbnail ? (
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[var(--color-cool-gray)] text-sm font-[family-name:var(--font-ui)]">
              {category?.label}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* メタ情報 */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-[family-name:var(--font-ui)] font-medium text-[var(--color-slate-blue)] bg-[var(--color-slate-blue)]/8 rounded">
            {category?.label}
          </span>
          <span className="text-xs text-[var(--color-cool-gray)] font-[family-name:var(--font-ui)]">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* タイトル */}
        <h3 className="text-base font-bold leading-snug text-[var(--color-deep-slate)] group-hover:text-[var(--color-slate-blue)] transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>

        {/* 説明 */}
        <p className="mt-2 text-sm text-[var(--color-cool-gray)] leading-relaxed line-clamp-2">
          {article.description}
        </p>

        {/* タグ */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {toolLabels.map((label) => (
            <span
              key={label}
              className="inline-flex items-center px-2 py-0.5 text-[11px] font-[family-name:var(--font-ui)] text-[var(--color-slate-blue)] bg-[var(--color-warm-gray)] rounded"
            >
              {label}
            </span>
          ))}
          <span className="text-[11px] text-[var(--color-cool-gray)] font-[family-name:var(--font-ui)]">
            {article.readingTime}分で読める
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}
