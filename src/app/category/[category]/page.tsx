import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/mdx";
import { CONTENT_CATEGORIES } from "@/lib/categories";
import { ArticleCard } from "@/components/article/article-card";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CONTENT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CONTENT_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};

  return {
    title: cat.label,
    description: `${cat.label}に関する記事一覧 - ${cat.description}`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = CONTENT_CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const articles = getArticlesByCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-deep-slate)]">
          {cat.label}
        </h1>
        <p className="mt-3 text-[var(--color-cool-gray)]">
          {cat.description} -- {articles.length}件の記事
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--color-cool-gray)]">
            このカテゴリにはまだ記事がありません。
          </p>
        </div>
      )}
    </div>
  );
}
