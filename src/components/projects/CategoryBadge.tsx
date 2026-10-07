import { categories, type ProjectCategory } from "@/data/projects";

/** Colour comes from the active palette (--cat-*), and the label keeps it from being colour-only. */
export default function CategoryBadge({ category }: { category: ProjectCategory }) {
  const c = categories[category];
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 self-start rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.06em] ${c.tint} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
      {c.label}
    </span>
  );
}
