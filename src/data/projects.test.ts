import { describe, it, expect } from "vitest";
import { categories, projects } from "./projects";

describe("projects data", () => {
  it("has unique, URL-safe slugs", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it("gives every project a case study, a valid category and a workflow diagram", () => {
    for (const p of projects) {
      expect(categories[p.category], p.id).toBeDefined();
      expect(p.outcome, p.id).not.toBe("");
      expect(p.problem, p.id).not.toBe("");
      expect(p.approach.length, p.id).toBeGreaterThan(0);
      expect(p.results.length, p.id).toBeGreaterThan(0);
      expect(p.workflow, p.id).toBe(`/projects/workflows/${p.id}.svg`);
    }
  });
});
