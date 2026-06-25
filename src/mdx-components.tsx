import type { MDXComponents } from 'mdx/types'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

// Custom component for Code blocks to add custom styling or copy buttons in the future
const CodeBlock = ({ children, className }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <code className={`${className} bg-surface-elevated text-accent-cyan px-1.5 py-0.5 rounded font-mono text-sm border border-border/50`}>
      {children}
    </code>
  )
}

const PreBlock = ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  return (
    <pre {...props} className="bg-surface-elevated border border-border/50 rounded-lg p-4 overflow-x-auto my-6 shadow-inner">
      {children}
    </pre>
  )
}

// Info callout component for notes
const InfoCallout = ({ children, title = "Note" }: { children: React.ReactNode, title?: string }) => {
  return (
    <div className="my-6 border-l-4 border-accent-blue bg-surface-elevated/50 p-4 rounded-r-lg">
      <div className="font-semibold text-accent-blue mb-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        {title}
      </div>
      <div className="text-text-secondary m-0">
        {children}
      </div>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code: CodeBlock as any,
    pre: PreBlock,
    InfoCallout,
  }
}