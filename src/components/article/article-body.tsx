import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { CodeBlock } from "./code-block";

interface ArticleBodyProps {
  content: string;
}

const mdxComponents = {
  pre: ({ children }: React.ComponentProps<"pre">) => {
    const child = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    if (child?.props?.className?.startsWith("language-")) {
      return (
        <CodeBlock className={child.props.className}>
          <code className={child.props.className}>{child.props.children}</code>
        </CodeBlock>
      );
    }
    return (
      <CodeBlock>
        <code>{child?.props?.children ?? children}</code>
      </CodeBlock>
    );
  },
};

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="prose-article">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        }}
        components={mdxComponents}
      />
    </div>
  );
}
