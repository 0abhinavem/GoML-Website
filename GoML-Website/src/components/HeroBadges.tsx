import { motion } from "framer-motion";
import { Zap, Shield, Globe } from "lucide-react";

const badges = [
  { label: "Integrated with", icon: Zap },
  { label: "Integrated with", icon: Shield },
  { label: "Integrated with", icon: Globe },
];

const HeroBadges = () => {
  return (
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
  );
};

export default HeroBadges;
