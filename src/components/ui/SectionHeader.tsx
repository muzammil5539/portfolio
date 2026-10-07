interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  intro?: string;
  id?: string;
}

export default function SectionHeader({ index, label, title, intro, id }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">
        {index} — {label}
      </p>
      <h2 id={id} className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-lg text-text-secondary">{intro}</p>}
    </div>
  );
}
