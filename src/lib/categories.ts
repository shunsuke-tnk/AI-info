/* コンテンツ軸（メインナビゲーション） */
export const CONTENT_CATEGORIES = [
  { slug: "automation", label: "業務自動化", description: "AIで業務を自動化するワークフロー構築" },
  { slug: "use-cases", label: "活用事例", description: "業種・業務ごとの具体的なAI導入事例" },
  { slug: "ai-dev", label: "AI開発入門", description: "Claude CodeやCursorで始めるAI開発" },
  { slug: "setup", label: "セットアップ", description: "AIツールの導入・設定・環境構築ガイド" },
  { slug: "frontier", label: "AI最前線", description: "自動化の未来と最新技術動向" },
] as const;

/* ツール軸（フィルター） */
export const TOOL_TAGS = [
  { slug: "claude", label: "Claude / Claude Code" },
  { slug: "chatgpt", label: "ChatGPT / OpenAI" },
  { slug: "cursor", label: "Cursor / AI IDE" },
  { slug: "gemini", label: "Gemini / Google" },
  { slug: "automation-tools", label: "自動化ツール" },
  { slug: "image-ai", label: "画像生成AI" },
  { slug: "other", label: "その他" },
] as const;

/* 業務軸（フィルター） */
export const TASK_TAGS = [
  { slug: "marketing", label: "マーケティング" },
  { slug: "sales", label: "営業・商談" },
  { slug: "writing", label: "文書作成" },
  { slug: "data", label: "データ分析" },
  { slug: "development", label: "開発・エンジニアリング" },
  { slug: "construction", label: "建設・不動産" },
  { slug: "general", label: "業務全般" },
] as const;

export type ContentCategory = (typeof CONTENT_CATEGORIES)[number]["slug"];
export type ToolTag = (typeof TOOL_TAGS)[number]["slug"];
export type TaskTag = (typeof TASK_TAGS)[number]["slug"];
