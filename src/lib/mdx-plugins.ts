import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

const textOf = (node: HastNode): string => (node.type === "text" ? (node.value ?? "") : (node.children ?? []).map(textOf).join(""));

/**
 * Turns ```mermaid fences into <mermaidchart chart="..."> before syntax highlighting sees them,
 * so MDXComponents can render a live diagram instead of coloured source.
 */
export function rehypeMermaid() {
  const visit = (node: HastNode) => {
    node.children?.forEach((child, i) => {
      const code = child.tagName === "pre" ? child.children?.find((c) => c.tagName === "code") : undefined;
      const classes = (code?.properties?.className as string[] | undefined) ?? [];
      if (code && classes.includes("language-mermaid")) {
        node.children![i] = { type: "element", tagName: "mermaidchart", properties: { chart: textOf(code) }, children: [] };
      } else {
        visit(child);
      }
    });
  };
  return (tree: HastNode) => visit(tree);
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: "plaintext",
};

export const mdxOptions: NonNullable<MDXRemoteProps["options"]>["mdxOptions"] = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [rehypeMermaid, [rehypePrettyCode, prettyCodeOptions], rehypeKatex],
};
