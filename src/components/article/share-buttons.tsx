"use client";

import { SITE_URL } from "@/lib/constants";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url = `${SITE_URL}/articles/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[var(--color-light-border)]">
      <span className="text-xs font-[family-name:var(--font-ui)] text-[var(--color-cool-gray)] mr-1">
        シェア
      </span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[var(--color-cool-gray)] hover:text-[var(--color-deep-slate)] hover:bg-[var(--color-warm-gray)] transition-colors"
          aria-label={`${link.name}でシェア`}
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[var(--color-cool-gray)] hover:text-[var(--color-deep-slate)] hover:bg-[var(--color-warm-gray)] transition-colors"
        aria-label="リンクをコピー"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.282a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.343 8.69" />
        </svg>
      </button>
    </div>
  );
}
