import { motion } from "framer-motion";
import { Zap, GitCommit, Cpu, Bug } from "lucide-react";

const stats = [
  { icon: <Zap className="w-5 h-5" />, value: "48.2", label: "tok/s Decode Speed", suffix: "" },
  { icon: <Cpu className="w-5 h-5" />, value: "5+", label: "Supported Models", suffix: "" },
  { icon: <GitCommit className="w-5 h-5" />, value: "25+", label: "Commits", suffix: "" },
  { icon: <Bug className="w-5 h-5" />, value: "100%", label: "Test Pass Rate", suffix: "" },
];

const StatsSection = () => {
  return (
    <section className="relative py-16 z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/50 mb-3 group-hover:text-white group-hover:bg-white/10 transition-all">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white font-display mb-1">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
