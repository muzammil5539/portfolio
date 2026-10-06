"use client";
import { useForm, ValidationError } from "@formspree/react";
import { links } from "@/data/education";

const field =
  "w-full rounded-xl border border-panel-line bg-panel-chip px-4 py-3 text-panel-fg placeholder:text-panel-muted focus:border-ai-cyan focus:outline-none focus:ring-1 focus:ring-ai-cyan";

export default function Contact() {
  const [state, handleSubmit] = useForm("mldbdoaj");

  return (
    <section id="contact" className="bg-panel text-panel-fg">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-16 gap-y-12 px-6 pb-14 pt-20 md:pt-24">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-8">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-panel-muted">06 — Contact</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl">
              Have a hard problem? Let&apos;s talk.
            </h2>
          </div>
          <ul className="flex flex-col gap-2.5 text-lg">
            <li><a href={`mailto:${links.email}`} className="text-ai-cyan hover:underline">{links.email}</a></li>
            <li><a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ai-cyan">linkedin.com/in/mnk539</a></li>
            <li><a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-ai-cyan">github.com/muzammil5539</a></li>
            <li className="text-panel-muted">{links.phone}</li>
          </ul>
        </div>

        <div className="min-w-0 flex-[1_1_420px]">
          {state.succeeded ? (
            <div role="status" className="rounded-2xl border border-panel-line bg-panel-chip p-8">
              <h3 className="font-display text-2xl font-semibold text-ai-cyan">Message sent</h3>
              <p className="mt-2 text-panel-fg/80">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Name
                  <input type="text" name="name" required placeholder="Your full name" className={field} />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Email
                  <input type="email" name="email" required placeholder="you@example.com" className={field} />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-red-300" />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Subject
                <input type="text" name="subject" required placeholder="e.g. AI project collaboration" className={field} />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Message
                <textarea name="message" required rows={5} placeholder="Tell me about the problem you're solving" className={field} />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-red-300" />
              </label>
              <button
                type="submit"
                disabled={state.submitting}
                className="inline-flex min-h-12 items-center justify-center self-start rounded-full bg-ai-cyan px-8 font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state.submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
