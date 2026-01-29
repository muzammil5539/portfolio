"use client";

interface CodeSnippetProps {
  className?: string;
  language?: string;
}

export default function CodeSnippet({
  className = "",
  language = "python",
}: CodeSnippetProps) {
  return (
    <div className={`code-block p-6 animate-code-glow ${className}`}>
      {/* Header bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ai-charcoal-light">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="ml-auto text-xs text-ai-text-dim font-mono">{language}</span>
      </div>

      {/* Line numbers and code */}
      <div className="flex">
        {/* Line numbers */}
        <div className="pr-4 mr-4 border-r border-ai-charcoal-light select-none">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="text-ai-text-dim text-xs leading-7 text-right">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code content */}
        <pre className="flex-1 overflow-x-auto">
          <code className="text-sm leading-7">
            <div><span className="text-[#546E7A]"># Neural Network Architecture</span></div>
            <div><span className="text-[#C792EA]">class</span> <span className="text-[#FFCB6B]">AIModel</span><span className="text-[#89DDFF]">:</span></div>
            <div>    <span className="text-[#C792EA]">def</span> <span className="text-[#82AAFF]">__init__</span><span className="text-[#EEFFFF]">(</span><span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">, layers)</span><span className="text-[#89DDFF]">:</span></div>
            <div>        <span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">.layers</span> <span className="text-[#89DDFF]">=</span> <span className="text-[#EEFFFF]">layers</span></div>
            <div>        <span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">.optimizer</span> <span className="text-[#89DDFF]">=</span> <span className="text-[#C3E88D]">&quot;adam&quot;</span></div>
            <div></div>
            <div>    <span className="text-[#C792EA]">def</span> <span className="text-[#82AAFF]">forward</span><span className="text-[#EEFFFF]">(</span><span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">, x)</span><span className="text-[#89DDFF]">:</span></div>
            <div>        <span className="text-[#C792EA]">for</span> <span className="text-[#EEFFFF]">layer</span> <span className="text-[#C792EA]">in</span> <span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">.layers</span><span className="text-[#89DDFF]">:</span></div>
            <div>            <span className="text-[#EEFFFF]">x</span> <span className="text-[#89DDFF]">=</span> <span className="text-[#EEFFFF]">layer(x)</span></div>
            <div>        <span className="text-[#C792EA]">return</span> <span className="text-[#EEFFFF]">x</span></div>
            <div></div>
            <div>    <span className="text-[#C792EA]">def</span> <span className="text-[#82AAFF]">train</span><span className="text-[#EEFFFF]">(</span><span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">, data, epochs</span><span className="text-[#89DDFF]">=</span><span className="text-[#F78C6C]">100</span><span className="text-[#EEFFFF]">)</span><span className="text-[#89DDFF]">:</span></div>
            <div>        <span className="text-[#C792EA]">for</span> <span className="text-[#EEFFFF]">epoch</span> <span className="text-[#C792EA]">in</span> <span className="text-[#82AAFF]">range</span><span className="text-[#EEFFFF]">(epochs)</span><span className="text-[#89DDFF]">:</span></div>
            <div>            <span className="text-[#EEFFFF]">loss</span> <span className="text-[#89DDFF]">=</span> <span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">.</span><span className="text-[#82AAFF]">compute_loss</span><span className="text-[#EEFFFF]">(data)</span></div>
            <div>            <span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">.</span><span className="text-[#82AAFF]">backpropagate</span><span className="text-[#EEFFFF]">(loss)</span></div>
            <div>        <span className="text-[#C792EA]">return</span> <span className="text-[#C792EA]">self</span><span className="text-[#EEFFFF]">.metrics</span></div>
          </code>
        </pre>
      </div>
    </div>
  );
}
