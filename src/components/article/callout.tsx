interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "tip" | "warning";
  title?: string;
}

const styles = {
  info: {
    bg: "bg-[#4338CA]/5",
    border: "border-[#4338CA]/20",
    title: "text-[#4338CA]",
    icon: "i",
  },
  tip: {
    bg: "bg-[#059669]/5",
    border: "border-[#059669]/20",
    title: "text-[#059669]",
    icon: "!",
  },
  warning: {
    bg: "bg-[#D97706]/5",
    border: "border-[#D97706]/20",
    title: "text-[#D97706]",
    icon: "!",
  },
};

export function Callout({
  children,
  type = "info",
  title,
}: CalloutProps) {
  const s = styles[type];
  const defaultTitle =
    type === "info"
      ? "解説"
      : type === "tip"
        ? "ポイント"
        : "注意";

  return (
    <div
      className={`my-6 rounded-lg border ${s.border} ${s.bg} p-5`}
    >
      <div
        className={`flex items-center gap-2 text-sm font-[family-name:var(--font-ui)] font-semibold ${s.title} mb-2`}
      >
        <span
          className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold border ${s.border} ${s.title}`}
        >
          {s.icon}
        </span>
        {title || defaultTitle}
      </div>
      <div className="text-sm leading-relaxed text-[var(--color-deep-slate)]/80">
        {children}
      </div>
    </div>
  );
}
