import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { resumeRoles } from "./resumes";
import { bullets, certifications, jobs, projects, roleResumes } from "./resume-content";

describe("role résumés", () => {
  it("ships 4-5 roles, each with a generated PDF in /public", () => {
    expect(resumeRoles.length).toBeGreaterThanOrEqual(4);
    expect(resumeRoles.length).toBeLessThanOrEqual(5);
    for (const role of resumeRoles) {
      expect(role.file).toMatch(/^\/resumes\/[A-Za-z0-9-]+\.pdf$/);
      expect(existsSync(join(process.cwd(), "public", role.file)), role.file).toBe(true);
    }
  });

  it("has content for every role and only references things that exist", () => {
    for (const role of resumeRoles) {
      const r = roleResumes[role.id];
      expect(r, role.id).toBeDefined();
      r.experience.forEach((e) => {
        expect(jobs[e.job], `${role.id}: job ${e.job}`).toBeDefined();
        e.bullets.forEach((b) => expect(bullets[b], `${role.id}: bullet ${b}`).toBeDefined());
      });
      r.projects.forEach((p) => expect(projects[p], `${role.id}: project ${p}`).toBeDefined());
      r.certifications.forEach((i) => expect(certifications[i], `${role.id}: cert ${i}`).toBeDefined());
    }
  });

  it("no longer links the old single résumé file", () => {
    expect(existsSync(join(process.cwd(), "public", "Resume - Muzammil Nawaz Khan CV.pdf"))).toBe(false);
  });
});
