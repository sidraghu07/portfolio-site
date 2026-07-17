import { contact } from "@/lib/projects";
import { IconGlyph } from "./IconGlyph";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-10">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">~/contact</span>
        <h2 className="mt-6 max-w-xl font-display text-3xl font-bold text-ink sm:text-4xl">
          Contact me.
        </h2>
        <p className="mt-4 max-w-lg text-ink/60">
          Reach out by email, connect on LinkedIn, or grab a copy of my resume.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-10 flex flex-wrap gap-3">
          {contact.map((item, i) => (
            <a
              key={item.slug}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              download={item.download}
              className={`inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                i === 0
                  ? "border-accent bg-accent text-ink hover:border-ink hover:bg-ink hover:text-paper"
                  : "border-ink text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              <IconGlyph icon={item.icon} size={14} color="currentColor" />
              {item.cta}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
