import SectionHeader from "./SectionHeader";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="bg-background-secondary py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-16 gap-y-8 px-6">
        <div className="min-w-0 flex-[1_1_260px]">
          <SectionHeader index="02" label="Experience" title="Where I've worked" />
        </div>
        <ol className="flex min-w-0 flex-[2_1_520px] flex-col">
          {experiences.map((exp, i) => (
            <li
              key={`${exp.company}-${exp.date}`}
              className={`flex flex-wrap gap-x-8 gap-y-2 border-t py-6 ${i === 0 ? "border-foreground" : "border-border"} ${i === experiences.length - 1 ? "border-b" : ""}`}
            >
              <p className="w-40 shrink-0 font-mono text-[13px] text-text-muted">{exp.date}</p>
              <div className="min-w-0 flex-[1_1_320px]">
                <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                <p className="text-text-muted">{exp.company}</p>
                <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-text-secondary marker:text-accent-blue">
                  {exp.description.slice(0, 3).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
