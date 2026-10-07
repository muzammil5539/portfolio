// Renders one ATS-friendly PDF résumé per role into public/resumes/.
// Run: node --experimental-strip-types scripts/generate-resumes.mjs
// Needs Chromium: set CHROME_PATH, or have one under /opt/pw-browsers or ~/.cache/ms-playwright.
import { mkdirSync, readdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";

const { person, jobs, bullets, projects, education, certifications, honors, roleResumes } = await import("../src/data/resume-content.ts");
const { resumeRoles } = await import("../src/data/resumes.ts");

const OUT = new URL("../public/resumes/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const css = `
  @page { size: A4; margin: 13mm 14mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, "Liberation Sans", Helvetica, sans-serif; font-size: 9.4pt; line-height: 1.38; color: #1a1a1a; }
  h1 { margin: 0; font-size: 21pt; letter-spacing: -0.3px; line-height: 1.1; }
  .headline { margin: 2px 0 4px; font-size: 11.5pt; font-weight: 700; color: #1f4f9e; }
  .contact { font-size: 8.8pt; color: #333; }
  .contact span + span::before { content: "  |  "; color: #888; }
  h2 { margin: 11px 0 4px; padding-bottom: 2px; border-bottom: 1.2px solid #1a1a1a; font-size: 9.8pt; letter-spacing: 1.1px; text-transform: uppercase; }
  p { margin: 0; }
  .job, .edu { margin-top: 6px; break-inside: avoid-page; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .row b { font-size: 9.8pt; }
  .dates { white-space: nowrap; color: #333; }
  .place { color: #444; font-style: italic; }
  ul { margin: 2px 0 0; padding-left: 15px; }
  li { margin: 1.5px 0; }
  .skills p { margin: 1.5px 0; }
  .project { margin-top: 4px; break-inside: avoid-page; }
  .project .stack { color: #444; }
  .links { color: #1f4f9e; }
`;

function html(role, roleId) {
  const r = roleResumes[roleId];
  const contact = [person.email, person.phone, person.location, person.linkedin, person.github, person.portfolio];
  const exp = r.experience
    .map(({ job, bullets: ids }) => {
      const j = jobs[job];
      return `<div class="job"><div class="row"><b>${esc(j.title)}, ${esc(j.company)}</b><span class="dates">${esc(j.dates)}</span></div>
        <div class="place">${esc(j.place)}</div>
        <ul>${ids.map((id) => `<li>${esc(bullets[id])}</li>`).join("")}</ul></div>`;
    })
    .join("");
  const proj = r.projects
    .map((id) => {
      const p = projects[id];
      const links = (p.links ?? []).map((l) => `${esc(l.label)}: ${esc(l.url)}`).join("  |  ");
      return `<div class="project"><b>${esc(p.title)}</b> <span class="stack">(${esc(p.stack)})</span>: ${esc(p.text)}${links ? ` <span class="links">${links}</span>` : ""}</div>`;
    })
    .join("");
  const edu = education
    .map(
      (e) => `<div class="edu"><div class="row"><b>${esc(e.title)}, ${esc(e.school)}</b><span class="dates">${esc(e.dates)}</span></div>
        <div class="place">${esc(e.place)}</div>${e.detail ? `<p>${esc(e.detail)}</p>` : ""}</div>`,
    )
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(person.name)} - ${esc(r.headline)}</title><style>${css}</style></head><body>
    <h1>${esc(person.name)}</h1>
    <div class="headline">${esc(r.headline)}</div>
    <div class="contact">${contact.map((c) => `<span>${esc(c)}</span>`).join("")}</div>
    <h2>Summary</h2><p>${esc(r.summary)}</p>
    <h2>Skills</h2><div class="skills">${r.skills.map((s) => `<p><b>${esc(s.label)}:</b> ${esc(s.items)}</p>`).join("")}</div>
    <h2>Experience</h2>${exp}
    <h2>Projects</h2>${proj}
    <h2>Education</h2>${edu}
    <h2>Certifications</h2><ul>${r.certifications.map((i) => `<li>${esc(certifications[i])}</li>`).join("")}</ul>
    <h2>Honors &amp; Awards</h2><p>${honors.map(esc).join("  |  ")}</p>
  </body></html>`;
}

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const root of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers", join(homedir(), ".cache/ms-playwright")].filter(Boolean)) {
    if (!existsSync(root)) continue;
    for (const dir of readdirSync(root).filter((d) => d.startsWith("chromium-"))) {
      const exe = join(root, dir, "chrome-linux", "chrome");
      if (existsSync(exe)) return exe;
    }
  }
  throw new Error("No Chromium found. Set CHROME_PATH.");
}

const browser = await chromium.launch({ executablePath: findChrome(), args: ["--no-sandbox"] });
for (const role of resumeRoles) {
  const page = await browser.newPage();
  await page.setContent(html(role, role.id), { waitUntil: "load" });
  const file = new URL(role.file.split("/").pop(), OUT);
  await page.pdf({ path: file.pathname, format: "A4", printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log("wrote", role.file);
}
await browser.close();
