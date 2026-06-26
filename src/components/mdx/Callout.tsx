import React from 'react';
import { Lightbulb, Info, AlertTriangle, Sigma } from 'lucide-react';

interface CalloutProps {
  type?: 'tip' | 'fact' | 'warning' | 'formula';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'fact', title, children }: CalloutProps) {
  const configs = {
    tip: { bg: 'bg-cyan-900/20', border: 'border-cyan-800/50', iconColor: 'text-cyan-400', Icon: Lightbulb, title: 'Pro Tip' },
    warning: { bg: 'bg-yellow-900/20', border: 'border-yellow-700/50', iconColor: 'text-yellow-500', Icon: AlertTriangle, title: 'Warning' },
    formula: { bg: 'bg-blue-900/20', border: 'border-blue-800/50', iconColor: 'text-blue-400', Icon: Sigma, title: 'Mathematical Formulation' },
    fact: { bg: 'bg-purple-900/20', border: 'border-purple-800/50', iconColor: 'text-purple-400', Icon: Info, title: 'Interesting Fact' },
  };

  const config = configs[type] || configs.fact;
  const { bg: bgColor, border: borderColor, iconColor, Icon, title: defaultTitle } = config;

  return (
    <div className={`my-8 p-6 rounded-xl border ${bgColor} ${borderColor} flex gap-4 items-start`}>
      <div className={`p-2 rounded-lg bg-slate-900/50 shadow-inner ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className={`text-lg font-bold mb-2 m-0 ${iconColor}`}>{title || defaultTitle}</h4>
        <div className="text-slate-300 text-sm leading-relaxed m-0 prose-p:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
