import React from 'react';
import Mermaid from './Mermaid';
import Callout from './mdx/Callout';

export const MDXComponents = {
  code: ({ className, children, ...props }: any) => {
    const isMermaid = className && className.includes('language-mermaid');
    
    if (isMermaid) {
      return <Mermaid chart={children} />;
    }
    
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  Callout,
  // We can add more custom components here to extend markdown capabilities
};
