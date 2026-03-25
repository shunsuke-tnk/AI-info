import { getAllArticles } from "@/lib/mdx";
import { ArticleFilter } from "@/components/article/article-filter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "すべての記事",
  description:
    "AI自動化・業務効率化に関する記事一覧。ツールや業務カテゴリで絞り込みできます。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-deep-slate)]">
          すべての記事
        </h1>
        <p className="mt-3 text-[var(--color-cool-gray)]">
          {articles.length}件の記事があります
        </p>
      </div>

      <ArticleFilter articles={articles} />
    </div>
  );
}
