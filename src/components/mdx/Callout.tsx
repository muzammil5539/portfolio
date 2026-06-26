import React from 'react';
import { Lightbulb, Info, AlertTriangle, Sigma } from 'lucide-react';

interface CalloutProps {
  type?: 'tip' | 'fact' | 'warning' | 'formula';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'fact', title, children }: CalloutProps) {
  let bgColor = 'bg-slate-800/50';
  let borderColor = 'border-slate-700';
  let iconColor = 'text-slate-400';
  let Icon = Info;
  let defaultTitle = 'Interesting Fact';

  if (type === 'tip') {
    bgColor = 'bg-cyan-900/20';
    borderColor = 'border-cyan-800/50';
    iconColor = 'text-cyan-400';
    Icon = Lightbulb;
    defaultTitle = 'Pro Tip';
  } else if (type === 'warning') {
    bgColor = 'bg-yellow-900/20';
    borderColor = 'border-yellow-700/50';
    iconColor = 'text-yellow-500';
    Icon = AlertTriangle;
    defaultTitle = 'Warning';
  } else if (type === 'formula') {
    bgColor = 'bg-blue-900/20';
    borderColor = 'border-blue-800/50';
    iconColor = 'text-blue-400';
    Icon = Sigma;
    defaultTitle = 'Mathematical Formulation';
  } else {
    bgColor = 'bg-purple-900/20';
    borderColor = 'border-purple-800/50';
    iconColor = 'text-purple-400';
    Icon = Info;
    defaultTitle = 'Interesting Fact';
  }

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
