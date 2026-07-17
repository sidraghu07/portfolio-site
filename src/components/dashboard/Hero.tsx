import { about } from "@/lib/projects";
import { Reveal } from "./Reveal";

export function Hero() {
  const bio = about[0];

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 sm:px-10 sm:pt-28">
      <Reveal>
        <span className="font-mono text-xs text-muted">sid@build:~$ whoami</span>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl">
          {bio.tagline}.
        </h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-6 max-w-xl text-base text-ink/60 sm:text-lg">{bio.description}</p>
      </Reveal>
    </section>
  );
}
