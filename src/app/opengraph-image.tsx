import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { site } from "@/data/site";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: `${site.role} · ${site.location.city}`, title: site.tagline, subtitle: "95% claims classification accuracy · denials 3.2% → 2.4% · −35% inference cost" });
}
