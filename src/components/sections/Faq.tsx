import SectionHeader from "@/components/ui/SectionHeader";
import { faqs } from "@/data/site";

/** Plain question-and-answer text: easy to read, and easy for search engines and LLMs to quote. */
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface-elevated py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader id="faq-title" index="06" label="About" title="Quick answers" />
        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.q} className="border-t border-border pt-5">
              <dt className="font-display text-xl font-semibold text-foreground">{item.q}</dt>
              <dd className="mt-2 text-text-secondary">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
