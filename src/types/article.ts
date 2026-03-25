import type { ContentCategory, ToolTag, TaskTag } from "@/lib/categories";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: ContentCategory;
  tools: ToolTag[];
  tasks: TaskTag[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  thumbnail: string;
  author: string;
  featured: boolean;
}

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTime: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
