import { ArrowUpRight } from "lucide-react";
import { orderedProjects } from "@/lib/projects";
import { IconGlyph } from "./IconGlyph";
import { GithubMark } from "./GithubMark";
import { Reveal } from "./Reveal";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-10">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          ~/projects
        </span>
        <h2 className="mt-6 font-display text-3xl font-bold text-ink sm:text-4xl">
          Published Projects
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {orderedProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 80}>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col gap-4 border border-line bg-card p-6 pl-7 transition-colors hover:border-ink"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1.5"
                style={{ background: project.accent }}
              />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <IconGlyph icon={project.icon} size={22} color={project.accent} />
                  <h3 className="font-display text-xl font-bold text-ink">{project.title}</h3>
                </div>
                {project.status === "in-progress" && (
                  <span className="shrink-0 border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                    in progress
                  </span>
                )}
              </div>

              <p className="text-sm text-ink/60">{project.tagline}</p>

              <dl className="mt-auto flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-wide text-muted">
                <div className="flex items-baseline gap-2">
                  <dt>lang</dt>
                  <dd className="text-ink/70">{project.language}</dd>
                </div>
                <div className="flex items-center gap-1.5 text-ink/70 transition-colors group-hover:text-accent">
                  <GithubMark className="h-3.5 w-3.5" />
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </dl>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
