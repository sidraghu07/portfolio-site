import { about, techStack } from "@/lib/projects";
import { Reveal } from "./Reveal";
import Image from "next/image";
import portrait from "@/assets/portrait.jpg";

export function AboutSection() {
  const bio = about[0];

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-10">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">~/about</span>
      </Reveal>
      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr]">
        <Reveal delay={100}>
          <div className="relative flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden border border-ink bg-card font-display text-4xl font-bold text-ink">
            <Image
              src={portrait}
              fill
              sizes="160px"
              className="object-cover"
              alt="Picture of Siddharth Raghunayakula"
              priority
            />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              {bio.tagline}
            </h2>
            <p className="mt-4 max-w-2xl text-ink/60">{bio.description}</p>
            <a
              href={bio.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1 font-mono text-sm text-ink underline-offset-4 hover:underline"
            >
              <span className="text-accent">[</span> view github profile{" "}
              <span className="text-accent">]</span>
            </a>

            <div className="mt-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                stack
              </span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {techStack.map((item) => (
                  <li
                    key={item.language}
                    className="border border-line px-3 py-1 font-mono text-xs text-ink/70 transition-colors hover:border-accent hover:text-ink"
                  >
                    {item.language}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
