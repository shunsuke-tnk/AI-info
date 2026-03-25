"use client";

import { useState } from "react";
import type { Article } from "@/types/article";
import { TOOL_TAGS, TASK_TAGS } from "@/lib/categories";
import { ArticleCard } from "./article-card";

interface ArticleFilterProps {
  articles: Article[];
}

export function ArticleFilter({ articles }: ArticleFilterProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const filtered = articles.filter((article) => {
    const toolMatch =
      selectedTools.length === 0 ||
      article.tools.some((t) => selectedTools.includes(t));
    const taskMatch =
      selectedTasks.length === 0 ||
      article.tasks.some((t) => selectedTasks.includes(t));
    return toolMatch && taskMatch;
  });

  const toggleTool = (slug: string) => {
    setSelectedTools((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleTask = (slug: string) => {
    setSelectedTasks((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const hasFilters = selectedTools.length > 0 || selectedTasks.length > 0;

  return (
    <>
      {/* フィルター */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-xs font-[family-name:var(--font-ui)] font-medium text-[var(--color-cool-gray)] uppercase tracking-wider mb-2">
            ツールで絞り込み
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOOL_TAGS.map((tag) => (
              <button
                key={tag.slug}
                type="button"
                onClick={() => toggleTool(tag.slug)}
                className={`inline-flex items-center px-3 py-1.5 text-xs font-[family-name:var(--font-ui)] rounded-md border transition-all duration-150 ${
                  selectedTools.includes(tag.slug)
                    ? "bg-[var(--color-slate-blue)] text-white border-[var(--color-slate-blue)]"
                    : "bg-white text-[var(--color-slate-blue)] border-[var(--color-light-border)] hover:border-[var(--color-slate-blue)]"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-[family-name:var(--font-ui)] font-medium text-[var(--color-cool-gray)] uppercase tracking-wider mb-2">
            業務で絞り込み
          </h3>
          <div className="flex flex-wrap gap-2">
            {TASK_TAGS.map((tag) => (
              <button
                key={tag.slug}
                type="button"
                onClick={() => toggleTask(tag.slug)}
                className={`inline-flex items-center px-3 py-1.5 text-xs font-[family-name:var(--font-ui)] rounded-md border transition-all duration-150 ${
                  selectedTasks.includes(tag.slug)
                    ? "bg-[var(--color-pale-sage)] text-[var(--color-deep-slate)] border-[var(--color-pale-sage)]"
                    : "bg-white text-[var(--color-slate-blue)] border-[var(--color-light-border)] hover:border-[var(--color-pale-sage)]"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {hasFilters && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-cool-gray)]">
              {filtered.length}件の記事
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedTools([]);
                setSelectedTasks([]);
              }}
              className="text-xs font-[family-name:var(--font-ui)] text-[var(--color-slate-blue)] hover:underline"
            >
              フィルターをクリア
            </button>
          </div>
        )}
      </div>

      {/* 記事グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--color-cool-gray)]">
            条件に一致する記事がありません。
          </p>
        </div>
      )}
    </>
  );
}
