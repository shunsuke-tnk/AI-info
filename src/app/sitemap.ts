import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";
import { CONTENT_CATEGORIES, TOOL_TAGS, TASK_TAGS } from "@/lib/categories";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CONTENT_CATEGORIES.map(
    (cat) => ({
      url: `${SITE_URL}/category/${cat.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const toolEntries: MetadataRoute.Sitemap = TOOL_TAGS.map((tag) => ({
    url: `${SITE_URL}/tools/${tag.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const taskEntries: MetadataRoute.Sitemap = TASK_TAGS.map((tag) => ({
    url: `${SITE_URL}/tasks/${tag.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/articles`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...articleEntries,
    ...categoryEntries,
    ...toolEntries,
    ...taskEntries,
  ];
}
