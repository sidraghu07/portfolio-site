import { hubCards } from "@/lib/projects";
import { IconGlyph } from "./IconGlyph";
import { Reveal } from "./Reveal";

export function HubRow() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10">
      <Reveal>
        <div className="border border-line bg-card px-6 py-5 sm:px-8">
          <p className="font-mono text-xs text-muted">$ ls ~/sid</p>
          <ul className="mt-4 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-10">
            {hubCards.map((card) => (
              <li key={card.id}>
                <a
                  href={card.href}
                  className="group inline-flex items-center gap-2 font-display text-lg font-bold text-ink underline-offset-4 hover:underline"
                >
                  <IconGlyph
                    icon={card.icon}
                    size={18}
                    className="text-muted transition-colors group-hover:text-accent"
                    color="currentColor"
                  />
                  {card.id}/
                </a>
                <p className="mt-1 max-w-[26ch] text-xs text-ink/50">{card.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
