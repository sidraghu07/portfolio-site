const links = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export function NavBar() {
  return (
    <header className="animate-fade-down sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-ink">
          sid<span className="text-accent">.</span>
        </a>
        <div className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative font-mono text-xs uppercase tracking-[0.15em] text-ink/60 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink transition-colors hover:border-accent hover:bg-accent"
        >
          [ contact ]
        </a>
      </nav>
    </header>
  );
}
