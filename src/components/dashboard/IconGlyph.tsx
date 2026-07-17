import { Blocks, Trophy, Bot, AudioWaveform, User, Mail, FileDown } from "lucide-react";
import type { IconName } from "@/lib/projects";
import { LinkedinMark } from "./LinkedinMark";

const ICONS = {
  blocks: Blocks,
  trophy: Trophy,
  bot: Bot,
  wave: AudioWaveform,
  user: User,
  mail: Mail,
  resume: FileDown,
} as const;

export function IconGlyph({
  icon,
  size = 32,
  color,
  className,
}: {
  icon: IconName;
  size?: number;
  color?: string;
  className?: string;
}) {
  if (icon === "linkedin") {
    return <LinkedinMark className={className} style={{ width: size, height: size, color }} />;
  }
  const Icon = ICONS[icon];
  return <Icon size={size} color={color} strokeWidth={1.5} className={className} />;
}
