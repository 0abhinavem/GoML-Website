import { motion } from "framer-motion";
import { Zap, Globe, Monitor, Sparkles } from "lucide-react";

const badges = [
  { label: "PyTorch + CUDA", icon: Zap },
  { label: "OpenAI Compatible", icon: Globe },
  { label: "Windows Native", icon: Monitor },
];

const HeroBadges = () => {
  return (
    <div className="space-y-4">
      {/* Announcement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center"
      >
        <a
          href="https://github.com/adervark/wLLM/releases/tag/v1.0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-sm text-white/80 hover:text-white hover:border-purple-500/40 transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300" />
          <span>WinLLM v1.0 is here — Initial Release</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">NEW</span>
        </a>
      </motion.div>

      {/* Tech Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-3 justify-center flex-wrap"
      >
        {badges.map((badge, i) => (
          <div
            key={i}
            className="glass-effect rounded-full px-4 py-1.5 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <badge.icon className="w-3.5 h-3.5" />
            <span>{badge.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroBadges;

