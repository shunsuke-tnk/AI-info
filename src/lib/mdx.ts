import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, ArticleFrontmatter, TocItem } from "@/types/article";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function calculateReadingTime(content: string): number {
  const charCount = content.replace(/\s/g, "").length;
  // 日本語: 約500文字/分
  return Math.max(1, Math.ceil(charCount / 500));
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== null);

  // 新しい順にソート
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesByTool(tool: string): Article[] {
  return getAllArticles().filter((a) => a.tools.includes(tool as never));
}

export function getArticlesByTask(task: string): Article[] {
  return getAllArticles().filter((a) => a.tasks.includes(task as never));
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

export function extractHeadings(content: string): TocItem[] {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}
