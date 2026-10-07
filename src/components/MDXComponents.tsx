import React from 'react';
import Mermaid from './MermaidLazy';
import Callout from './mdx/Callout';
import { slugify } from '@/lib/mdx';

const text = (children: React.ReactNode): string =>
  React.Children.toArray(children).map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : '')).join('');

export const MDXComponents = {
  // Produced by rehypeMermaid (src/lib/mdx-plugins.ts) from ```mermaid fences.
  mermaidchart: ({ chart }: { chart: string }) => <Mermaid chart={chart} />,
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2 id={slugify(text(children))} className="scroll-mt-28" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) => (
    <h3 id={slugify(text(children))} className="scroll-mt-28" {...props}>{children}</h3>
  ),
  Callout,
};
