export type IconName =
  | "blocks"
  | "trophy"
  | "bot"
  | "wave"
  | "user"
  | "mail"
  | "linkedin"
  | "resume";

export type ShelfItem = {
  slug: string;
  title: string;
  tagline: string;
  description?: string;
  language?: string;
  accent: string;
  icon: IconName;
  href: string;
  cta: string;
  kind: "project" | "link" | "resume";
  status?: "in-progress";
  download?: boolean;
};

export const projects: ShelfItem[] = [
  {
    slug: "hoopdeck",
    title: "HoopDeck",
    tagline: "NBA player cards, lineup simulator, and stat charts",
    description:
      "A TypeScript web app for building NBA lineups, comparing player cards, and visualizing stats.",
    language: "TypeScript",
    accent: "#F2720C",
    icon: "trophy",
    href: "https://github.com/sidraghu07/HoopDeck",
    cta: "View on GitHub",
    kind: "project",
  },
  {
    slug: "minecraft-autocomplete",
    title: "Minecraft Build Autocomplete",
    tagline: "Predictive block placement built using machine learning",
    description:
      "A Java project that watches how you build in Minecraft and suggests the next block placements in real time.",
    language: "Java",
    accent: "#F5BF0F",
    icon: "blocks",
    href: "https://github.com/sidraghu07/minecraft-autocomplete",
    cta: "View on GitHub",
    kind: "project",
  },
  {
    slug: "snake-rl-agent",
    title: "Snake RL Agent",
    tagline: "Snake-RL agent using a QNet model made from scratch",
    description:
      "A reinforcement learning agent that learns to play Snake through self-play, built around a hand-written Q-network.",
    language: "Python",
    accent: "#FC0C04",
    icon: "bot",
    href: "https://github.com/sidraghu07/Snake-RL-Agent",
    cta: "View on GitHub",
    kind: "project",
  },
  {
    slug: "soundpaper",
    title: "SoundPaper",
    tagline: "Live wallpapers that move with your music",
    description:
      "A Swift app that turns your device wallpaper into a visual that reacts to whatever you're currently playing.",
    language: "Swift",
    accent: "#A39C8E",
    icon: "wave",
    href: "https://github.com/sidraghu07/SoundPaper",
    cta: "View on GitHub",
    kind: "project",
  },
];

export const about: ShelfItem[] = [
  {
    slug: "about",
    title: "About Me",
    tagline: "Who am i?",
    description:
      "A Computer Science student and rising sophomore at Rutgers University. An aspiring full-stack developer and machine learning enthusiast. I look to improve my skills and knowledge by looking to apply them to topics and hobbies i enjoy!",
    accent: "#10EDF5",
    icon: "user",
    href: "https://github.com/sidraghu07",
    cta: "View GitHub Profile",
    kind: "link",
  },
];

export const contact: ShelfItem[] = [
  {
    slug: "email",
    title: "Email",
    tagline: "Contact me.",
    description: "Reach out by email",
    accent: "#10EDF5",
    icon: "mail",
    href: "mailto:sid.raghu07@gmail.com",
    cta: "Email",
    kind: "link",
  },
  {
    slug: "linkedin",
    title: "LinkedIn",
    tagline: "Connect on LinkedIn",
    description: "See my background, experience, and education.",
    accent: "#10EDF5",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/siddharth-raghunayakula/",
    cta: "View LinkedIn",
    kind: "link",
  },
  {
    slug: "resume",
    title: "Resume",
    tagline: "Download my resume",
    description: "A one-page PDF summary of my experience and skills.",
    accent: "#10EDF5",
    icon: "resume",
    href: "/resume.pdf",
    cta: "Download Resume",
    kind: "resume",
    download: true,
  },
];

export const heroSlug = "minecraft-autocomplete";

export const heroProject = projects.find((p) => p.slug === heroSlug)!;

export const otherProjects = projects.filter((p) => p.slug !== heroSlug);

export const techStack = projects.map((p) => ({
  language: p.language!,
  project: p.title,
  accent: p.accent,
}));

export const orderedProjects = [heroProject, ...otherProjects];

export type HubCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

export const hubCards: HubCard[] = [
  {
    id: "about",
    title: "About Me",
    description: "Who I am and how I like to build things.",
    href: "#about",
    icon: "user",
  },
  {
    id: "projects",
    title: "Projects",
    description: `${projects.length} published projects`,
    href: "#projects",
    icon: "blocks",
  },
  {
    id: "contact",
    title: "Contact & Resume",
    description: "Email, LinkedIn, and my resume.",
    href: "#contact",
    icon: "mail",
  },
];
