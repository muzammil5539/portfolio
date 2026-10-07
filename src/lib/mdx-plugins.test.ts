import { describe, it, expect } from "vitest";
import { rehypeMermaid } from "./mdx-plugins";

const fence = (lang: string, code: string) => ({
  type: "element",
  tagName: "pre",
  children: [{ type: "element", tagName: "code", properties: { className: [`language-${lang}`] }, children: [{ type: "text", value: code }] }],
});

describe("rehypeMermaid", () => {
  it("swaps mermaid fences for a chart element and leaves other code alone", () => {
    const tree = { type: "root", children: [fence("mermaid", "graph TD; A-->B"), fence("python", "print(1)")] };
    rehypeMermaid()(tree);
    expect(tree.children[0]).toMatchObject({ tagName: "mermaidchart", properties: { chart: "graph TD; A-->B" } });
    expect(tree.children[1]).toMatchObject({ tagName: "pre" });
  });
});
