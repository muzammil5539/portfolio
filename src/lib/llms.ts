import { resumeRoles } from "@/data/resumes";
import { categories, projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { education, honors } from "@/data/education";
import { faqs, site } from "@/data/site";
import { getBlogPosts } from "@/lib/mdx";

const url = (path: string) => `${site.url}${path}`;

/** llms.txt: short, link-rich summary following the llmstxt.org convention. */
export function llmsTxt(): string {
  const posts = getBlogPosts();
  return [
    `# ${site.name}`,
    "",
    `> ${site.role} based in ${site.location.city}, ${site.location.country}. ${site.summary}`,
    "",
    `${site.availability}. Contact: ${site.email}`,
    "",
    "## About",
    `- [Home](${url("/")}): overview, results, experience, skills and FAQ`,
    ...resumeRoles.map((r) => `- [Résumé, ${r.label} (PDF)](${url(r.file)})`),
    `- [LinkedIn](${site.links.linkedin})`,
    `- [GitHub](${site.links.github})`,
    "",
    "## Projects",
    ...projects.map((p) => `- [${p.title}](${url(`/projects/${p.id}`)}): ${p.outcome}`),
    "",
    "## Writing",
    ...posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.excerpt}`),
    "",
    "## Optional",
    `- [Full details for language models](${url("/llms-full.txt")})`,
    `- [RSS feed](${url("/feed.xml")})`,
    "",
  ].join("\n");
}

/** llms-full.txt: everything an LLM needs to answer questions about the person, with no navigation required. */
export function llmsFullTxt(): string {
  const posts = getBlogPosts();
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `Role: ${site.role}`,
    `Location: ${site.location.city}, ${site.location.country}`,
    `Availability: ${site.availability}`,
    `Email: ${site.email}`,
    `LinkedIn: ${site.links.linkedin}`,
    `GitHub: ${site.links.github}`,
    `Website: ${site.url}`,
    "",
    "## Summary",
    site.summary,
    "",
    "## Questions and answers",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Experience",
  ];
  for (const e of experiences) {
    lines.push(`### ${e.title}, ${e.company} (${e.date})`, ...e.description.map((d) => `- ${d}`), "");
  }
  lines.push(
    "## Education and honors",
    `${education.degree}, ${education.school}, ${education.period}, CGPA ${education.cgpa}. ${education.summary}`,
    `Honors: ${honors.join("; ")}.`,
    "",
    "## Projects",
  );
  for (const p of projects) {
    lines.push(
      `### ${p.title} (${categories[p.category].label})`,
      `URL: ${url(`/projects/${p.id}`)}`,
      `Outcome: ${p.outcome}`,
      `Problem: ${p.problem}`,
      "Approach:",
      ...p.approach.map((a) => `- ${a}`),
      "Results:",
      ...p.results.map((r) => `- ${r}`),
      `Stack: ${p.stack.join(", ")}`,
      ...(p.github ? [`Code: ${p.github}`] : []),
      ...(p.live ? [`Live: ${p.live}`] : []),
      "",
    );
  }
  lines.push("## Writing", ...posts.map((p) => `- ${p.title} (${p.date}): ${url(`/blog/${p.slug}`)}. ${p.excerpt}`), "");
  return lines.join("\n");
}
