import React from 'react';
import { Lightbulb, Info, AlertTriangle, Sigma } from 'lucide-react';

interface CalloutProps {
  type?: 'tip' | 'fact' | 'warning' | 'formula';
  title?: string;
  children: React.ReactNode;
}

// Colours come from the palette's category tokens (src/data/themes.ts), which are contrast-checked
// in every palette and mode. Never use fixed Tailwind hues here: they ignore the active theme.
const configs = {
  tip: { tone: 'text-cat-ml', box: 'border-cat-ml/35 bg-cat-ml/10', Icon: Lightbulb, title: 'Pro Tip' },
  warning: { tone: 'text-cat-vision', box: 'border-cat-vision/35 bg-cat-vision/10', Icon: AlertTriangle, title: 'Warning' },
  formula: { tone: 'text-cat-genai', box: 'border-cat-genai/35 bg-cat-genai/10', Icon: Sigma, title: 'Mathematical Formulation' },
  fact: { tone: 'text-cat-backend', box: 'border-cat-backend/35 bg-cat-backend/10', Icon: Info, title: 'Interesting Fact' },
};

export default function Callout({ type = 'fact', title, children }: CalloutProps) {
  const { tone, box, Icon, title: defaultTitle } = configs[type] || configs.fact;

  return (
    <div className={`my-8 p-6 rounded-xl border ${box} flex gap-4 items-start`}>
      <div className={`p-2 rounded-lg bg-surface shadow-inner ${tone}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className={`text-lg font-bold mb-2 m-0 ${tone}`}>{title || defaultTitle}</h4>
        <div className="text-text-secondary text-sm leading-relaxed m-0 prose-p:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
