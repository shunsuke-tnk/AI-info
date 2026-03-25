import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "AI Shelfについて。AI自動化の知識を体系的に蓄積するWebメディア。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-deep-slate)]">
        {SITE_NAME}について
      </h1>

      <div className="mt-8 prose-article">
        <p>
          {SITE_NAME}
          は、AI自動化の知識を体系的に蓄積するWebメディアです。
        </p>

        <h2>このメディアが目指すもの</h2>
        <p>
          AI技術の進化により、「全てが自動化していく世界」「一般の人が開発できる未来」が近づいています。しかし、断片的な情報は溢れていても、体系的に整理された実践的な日本語リソースはまだ不足しています。
        </p>
        <p>
          {SITE_NAME}
          は、業務自動化・AI開発の実践知識を「本棚」のように整理し、誰でもアクセスできるメディアとして蓄積していきます。
        </p>

        <h2>扱うテーマ</h2>
        <p>
          プロンプトの小手先ではなく、一歩先の情報を届けることを重視しています。
        </p>
        <ul>
          <li>
            <strong>業務自動化</strong>
            -- AIを使った具体的なワークフロー構築
          </li>
          <li>
            <strong>活用事例</strong>
            -- 業種・業務ごとのAI導入の実例
          </li>
          <li>
            <strong>AI開発入門</strong>
            -- Claude CodeやCursorを使った開発の始め方
          </li>
          <li>
            <strong>セットアップ</strong>
            -- AIツールの導入・環境構築ガイド
          </li>
          <li>
            <strong>AI最前線</strong>
            -- 自動化の未来と最新技術動向
          </li>
        </ul>

        <h2>運営者</h2>
        <p>
          田中俊輔（たなかしゅんすけ）。リフォーム専門会社の営業マンを経て独立。建設業の現場経験とAI活用を軸に活動しています。現在はAI事業責任者として、業務自動化やAIツール導入の支援を行っています。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          記事に関するご質問、掲載希望、お仕事のご相談などは、SNSのDMよりお気軽にご連絡ください。
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/articles"
          className="inline-flex items-center px-5 py-2.5 text-sm font-[family-name:var(--font-ui)] font-medium text-white bg-[var(--color-slate-blue)] rounded-md hover:bg-[var(--color-deep-slate)] transition-colors duration-200"
        >
          記事を読む
        </Link>
      </div>
    </div>
  );
}
