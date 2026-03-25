import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticlesByTool } from "@/lib/mdx";
import { TOOL_TAGS } from "@/lib/categories";
import { ArticleCard } from "@/components/article/article-card";

interface PageProps {
  params: Promise<{ tool: string }>;
}

export function generateStaticParams() {
  return TOOL_TAGS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tool } = await params;
  const tag = TOOL_TAGS.find((t) => t.slug === tool);
  if (!tag) return {};

  return {
    title: `${tag.label}の記事`,
    description: `${tag.label}に関する記事一覧`,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { tool } = await params;
  const tag = TOOL_TAGS.find((t) => t.slug === tool);

  if (!tag) {
    notFound();
  }

  const articles = getArticlesByTool(tool);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-deep-slate)]">
          {tag.label}
        </h1>
        <p className="mt-3 text-[var(--color-cool-gray)]">
          {tag.label}に関する記事 -- {articles.length}件
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
            このツールに関する記事はまだありません。
          </p>
        </div>
      )}
    </div>
  );
}
