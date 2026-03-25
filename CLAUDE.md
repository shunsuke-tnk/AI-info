# AI Shelf -- AI自動化メディア

## プロジェクト概要

- **アプリ名**: AI Shelf（エーアイ シェルフ）
- **一言説明**: AI自動化の知識を体系的に蓄積するWebメディア
- **背景・目的**: AI技術の進化により「全てが自動化していく世界」「一般の人が開発できる未来」が近づいている。しかし、断片的な情報は溢れていても、体系的に整理された実践的な日本語リソースは不足している。AI Shelfは、業務自動化・AI開発の実践知識を「本棚」のように整理し、誰でもアクセスできるメディアとして蓄積していく
- **WHO**: 田中俊輔（AI事業責任者・個人事業主）が運営。記事原稿をClaudeに渡し、サイトに組み込む運用
- **WHAT**: AI自動化に特化した長文記事メディア。プロンプトの小手先ではなく、ワークフロー構築・AI開発・環境構築など一歩先の情報を届ける
- **HOW**: Next.js 15 + MDXによる静的サイト生成。コンテンツ軸・ツール軸・業務軸の3次元分類で情報を体系化

## ターゲットユーザー

- **メインターゲット**: AIを業務に活用したいビジネスパーソン（非エンジニア含む）
- **いつ**: 業務効率化のヒントを探しているとき、新しいAIツールを導入したいとき
- **どう使うか**: カテゴリやツール名から目的の記事を探し、手順に沿って実践する
- **サブターゲット**: AIで開発に挑戦したい非エンジニア、建設・不動産業界でAI活用を検討している人

## 主要機能

| 機能 | 説明 | 優先度 |
|------|------|--------|
| 記事表示 | MDXベースの長文記事を美しいレイアウトで表示 | 必須 |
| 3次元分類 | コンテンツ軸 x ツール軸 x 業務軸でのフィルタリング | 必須 |
| 記事一覧 | カードグリッド形式の記事一覧、フィルターチップUI | 必須 |
| 目次 | 記事詳細ページにsticky目次を表示 | 必須 |
| SEO | SSG、メタデータ、JSON-LD、OGP画像、サイトマップ | 必須 |
| SNSシェア | Twitter/X、Facebook等へのシェアボタン | 中 |
| いいね | 記事ごとの匿名いいね機能 | 将来 |
| コメント | 記事ごとのコメント欄 | 将来 |
| リクエスト | 読者が欲しい情報をリクエストするフォーム | 将来 |

## 画面構成

| 画面 | URL | 概要 | 主な操作 |
|------|-----|------|---------|
| トップページ | `/` | ヒーロー + ピックアップ + 最新記事 + カテゴリハイライト | 記事へ遷移、カテゴリ選択 |
| 記事一覧 | `/articles` | フィルター付きカードグリッド | ツール・業務フィルター、ソート |
| 記事詳細 | `/articles/[slug]` | 左TOC + 右本文のレイアウト | 目次ジャンプ、SNSシェア |
| カテゴリ別 | `/category/[category]` | コンテンツ軸別の記事一覧 | 記事へ遷移 |
| ツール別 | `/tools/[tool]` | 特定ツールの記事一覧 | 記事へ遷移 |
| 業務別 | `/tasks/[task]` | 特定業務の記事一覧 | 記事へ遷移 |
| About | `/about` | サイト・運営者紹介 | -- |

## UI/UX方針

### デザインテイスト: Deep Vivid（シャープ＆ビビッド）

白背景ベースに、ディープインディゴ〜バイオレット〜マゼンタの深いグラデーションをアクセントに使用。太いサンセリフフォントで「本気で学ぶ技術メディア」感を表現する。

### カラーパレット

```
メイン:        ディープインディゴ   #4338CA
アクセント:    ディープマゼンタ     #BE185D
サブ:          バイオレット         #6D28D9
グラデーション: #4338CA → #6D28D9 → #BE185D
背景メイン:    ホワイト             #FFFFFF
背景サブ:      クールグレー         #F1F5F9
テキスト:      インクブラック       #0F172A
テキスト薄:    ダークスレート       #475569
ボーダー:      ライトグレー         #E2E8F0
```

### タイポグラフィ

| 用途 | フォント | ウェイト |
|------|---------|---------|
| 日本語見出し | Noto Sans JP | 700-900 |
| 日本語本文 | BIZ UDPGothic | 400 |
| 英語見出し/UI | Inter | 600-800 |
| コードブロック | JetBrains Mono | 400 |

本文: 16-17px, line-height 1.9, max-width 680px

### レスポンシブ方針

mobile-first。Tailwind CSSデフォルトブレイクポイント（sm:640px, md:768px, lg:1024px, xl:1280px）

## 技術仕様

### フレームワーク・ライブラリ

```
フレームワーク: Next.js 15 (App Router) + React 19 + TypeScript strict
スタイリング:   Tailwind CSS 4
コンテンツ:     MDX (next-mdx-remote)
メタデータ解析: gray-matter
デプロイ:       Vercel (Hobby plan)
```

### コマンド

```bash
npm run dev          # 開発サーバー (port 3000)
npx next build       # 本番ビルド
npx tsc --noEmit     # 型チェック
```

### 環境変数

```
NEXT_PUBLIC_SITE_URL=https://ai-shelf.vercel.app  # サイトURL（OGP等で使用）
```

### ディレクトリ構成

```
AI-info/
├── content/articles/              # MDX記事ファイル
├── public/images/articles/        # 記事画像
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # ルートレイアウト
│   │   ├── page.tsx               # トップページ
│   │   ├── articles/
│   │   │   ├── page.tsx           # 記事一覧
│   │   │   └── [slug]/page.tsx    # 記事詳細 (SSG)
│   │   ├── category/[category]/page.tsx
│   │   ├── tools/[tool]/page.tsx
│   │   ├── tasks/[task]/page.tsx
│   │   ├── about/page.tsx
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── layout/                # header, footer, mobile-nav
│   │   ├── article/               # article-card, article-body, toc, share
│   │   └── ui/                    # button, badge, card, input, filter-chips
│   ├── lib/
│   │   ├── mdx.ts                 # MDX解析・記事取得・フィルタリング
│   │   ├── categories.ts          # コンテンツ軸・ツール軸・業務軸の定義
│   │   └── constants.ts           # サイト定数
│   └── types/
│       └── article.ts             # 記事フロントマター型定義
├── CLAUDE.md
├── tasks/todo.md
└── tasks/lessons.md
```

### カテゴリ体系

**コンテンツ軸**（メインナビゲーション）:
- `automation` -- 業務自動化
- `use-cases` -- 活用事例
- `ai-dev` -- AI開発入門
- `setup` -- セットアップ
- `frontier` -- AI最前線

**ツール軸**（フィルター）:
- `claude` / `chatgpt` / `cursor` / `gemini` / `automation-tools` / `image-ai` / `other`

**業務軸**（フィルター）:
- `marketing` / `sales` / `writing` / `data` / `development` / `construction` / `general`

### MDX記事フロントマター

```yaml
---
title: "記事タイトル"
slug: "article-slug"
description: "記事の説明文（SEO用、120文字以内）"
category: "automation"
tools: ["claude"]
tasks: ["writing"]
tags: ["Claude Code", "自動化"]
publishedAt: "2026-03-26"
updatedAt: "2026-03-26"
thumbnail: "/images/articles/thumbnail.webp"
author: "田中俊輔"
featured: false
---
```

## 開発ロードマップ

### Phase 1: 基盤構築
- [x] Next.js 15 プロジェクト初期化
- [x] CLAUDE.md 作成
- [x] デザインシステム構築（globals.css, フォント）
- [x] ルートレイアウト（ヘッダー, フッター, レスポンシブナビ）
- [ ] Git初期化

### Phase 2: コンテンツ表示
- [x] MDX記事読み込み・解析システム
- [x] 記事一覧ページ + 記事カード
- [x] 記事詳細ページ (SSG) + 目次
- [x] カテゴリ別・ツール別・業務別一覧
- [x] フィルタリング機能
- [x] サンプル記事 3本

### Phase 3: トップページ・デザイン仕上げ
- [x] トップページ（ヒーロー, ピックアップ, 最新記事）
- [x] レスポンシブ精査
- [x] SNSシェアボタン
- [x] Aboutページ

### Phase 4: SEO・本番準備
- [x] メタデータ・JSON-LD・OGP
- [x] サイトマップ + robots.txt
- [ ] Vercelデプロイ
- [ ] Lighthouse 90点以上

### 将来Phase: インタラクティブ機能
- いいね・コメント・リクエスト（Supabase連携）

## 成功基準

- [ ] 全ページが正常に表示される（トップ、一覧、詳細、カテゴリ別、ツール別、業務別）
- [ ] SSGで全記事が静的生成される
- [ ] 3次元フィルタリング（コンテンツ軸 x ツール x 業務）が正しく動作する
- [ ] Lighthouse: パフォーマンス90+、SEO90+、アクセシビリティ90+
- [ ] モバイル（375px幅）で問題なく閲覧できる
- [ ] `npx next build` がエラーなく完了する
- [ ] サンプル記事3本が美しく表示される
