import Image from "next/image";
import Link from "next/link";

const stack = ["PyTorch", "TensorFlow", "scikit-learn", "CatBoost / XGBoost", "LangChain", "LangGraph", "MCP", "FastAPI", "Docker", "Rust"];

const snapshot = [
  { value: "95%", label: "claims classification accuracy across 42,900+ cases" },
  { value: "3.2 → 2.4%", label: "claim denial rate; resubmission wait from 2 weeks to 3 days" },
  { value: "−35%", label: "inference cost through prompt caching" },
];

export default function Hero() {
  return (
    <section id="about" className="bg-background pt-28 md:pt-36">
      <div className="mx-auto flex max-w-6xl flex-wrap items-stretch gap-12 px-6 pb-20">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col justify-center gap-7">
          <p className="flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.08em] text-text-muted">
            <span className="h-2.5 w-2.5 rounded-full border border-accent-blue bg-ai-cyan" aria-hidden="true" />
            Islamabad · Open to remote &amp; relocation
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4.5rem]">
            AI systems that ship, and keep working after launch.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
            I&apos;m Muzammil, an AI engineer with 1+ year in production ML, LLM and RAG. I classify healthcare claims at
            95% accuracy, build voice agents, and segment 3D MRI scans.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#projects" className="inline-flex min-h-12 items-center rounded-full border border-foreground bg-ai-cyan px-6 font-semibold text-on-accent transition-transform hover:-translate-y-0.5">
              See selected work
            </Link>
            <Link href="#contact" className="inline-flex min-h-12 items-center rounded-full border border-foreground px-6 font-medium text-foreground transition-colors hover:bg-surface-hover">
              Start a conversation
            </Link>
          </div>
        </div>

        <aside className="flex min-w-0 flex-[1_1_360px] flex-col justify-between gap-7 rounded-3xl bg-panel p-8 text-panel-fg sm:p-9">
          <div className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.1em] text-panel-muted">
            <span className="flex items-center gap-3 whitespace-nowrap">
              <Image src="/portfolio.jpg" alt="Muzammil Nawaz Khan" width={40} height={40} priority className="h-10 w-10 rounded-full object-cover" />
              Production snapshot
            </span>
            <span className="whitespace-nowrap text-ai-cyan">CareCloud</span>
          </div>
          {snapshot.map((item) => (
            <div key={item.value} className="flex flex-col gap-1.5 border-t border-panel-line pt-5">
              <div className="font-display text-5xl font-semibold leading-none text-ai-cyan">{item.value}</div>
              <div className="text-panel-fg/80">{item.label}</div>
            </div>
          ))}
        </aside>
      </div>

      <div className="border-y border-border bg-background-secondary">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-7 gap-y-2 px-6 py-4 font-mono text-[13px] text-text-secondary">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
