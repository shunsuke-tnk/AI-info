import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs, extractHeadings } from "@/lib/mdx";
import { ArticleBody } from "@/components/article/article-body";
import { TableOfContents } from "@/components/article/toc";
import { ShareButtons } from "@/components/article/share-buttons";
import { CONTENT_CATEGORIES, TOOL_TAGS, TASK_TAGS } from "@/lib/categories";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const headings = extractHeadings(article.content);
  const category = CONTENT_CATEGORIES.find(
    (c) => c.slug === article.category
  );
  const toolLabels = article.tools
    .map((t) => TOOL_TAGS.find((tag) => tag.slug === t))
    .filter(Boolean);
  const taskLabels = article.tasks
    .map((t) => TASK_TAGS.find((tag) => tag.slug === t))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: { "@type": "Person", name: article.author },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/articles/${article.slug}`,
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* パンくず */}
      <nav className="mb-8 text-sm font-[family-name:var(--font-ui)]">
        <ol className="flex items-center gap-1.5 text-[var(--color-cool-gray)]">
          <li>
            <Link
              href="/"
              className="hover:text-[var(--color-deep-slate)] transition-colors"
            >
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/articles"
              className="hover:text-[var(--color-deep-slate)] transition-colors"
            >
              記事一覧
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--color-deep-slate)] truncate max-w-[200px]">
            {article.title}
          </li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        {/* メインコンテンツ */}
        <div>
          {/* ヘッダー */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href={`/category/${article.category}`}
                className="inline-flex items-center px-2.5 py-1 text-xs font-[family-name:var(--font-ui)] font-medium text-[var(--color-slate-blue)] bg-[var(--color-slate-blue)]/8 rounded hover:bg-[var(--color-dusty-rose)]/15 transition-colors"
              >
                {category?.label}
              </Link>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[var(--color-deep-slate)]">
              {article.title}
            </h1>

            <p className="mt-4 text-[var(--color-cool-gray)] leading-relaxed">
              {article.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[var(--color-cool-gray)] font-[family-name:var(--font-ui)]">
              <span>{article.author}</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>{article.readingTime}分で読める</span>
            </div>

            {/* タグ */}
            <div className="mt-4 flex flex-wrap gap-2">
              {toolLabels.map((tool) => (
                <Link
                  key={tool!.slug}
                  href={`/tools/${tool!.slug}`}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-[family-name:var(--font-ui)] text-[var(--color-slate-blue)] bg-[var(--color-warm-gray)] rounded hover:bg-[var(--color-light-border)] transition-colors"
                >
                  {tool!.label}
                </Link>
              ))}
              {taskLabels.map((task) => (
                <Link
                  key={task!.slug}
                  href={`/tasks/${task!.slug}`}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-[family-name:var(--font-ui)] text-[var(--color-pale-sage)] bg-[var(--color-pale-sage)]/15 rounded hover:bg-[var(--color-pale-sage)]/25 transition-colors"
                >
                  {task!.label}
                </Link>
              ))}
            </div>
          </header>

          {/* 記事本文 */}
          <ArticleBody content={article.content} />

          {/* シェアボタン */}
          <ShareButtons title={article.title} slug={article.slug} />
        </div>

        {/* サイドバー: 目次 */}
        <aside className="hidden lg:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </article>
    </>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
