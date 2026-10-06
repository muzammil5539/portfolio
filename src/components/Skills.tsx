import SectionHeader from "./SectionHeader";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index="03" label="Skills" title="What I build with" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="min-w-0 rounded-[20px] border border-border bg-surface p-6">
              <h3 className="font-display text-xl font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-surface-hover px-3 py-1 text-[13px] text-text-secondary">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
