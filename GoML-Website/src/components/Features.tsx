import { motion } from "framer-motion";
import { Cpu, Lock, GitPullRequest, Zap } from "lucide-react";

const features = [
  {
    title: "Context-Aware Generation",
    description: "Our LLM understands your entire codebase context, not just single files, ensuring generated tests and code fit seamlessly.",
    icon: <Cpu className="w-6 h-6 text-indigo-400" />,
  },
  {
    title: "Automated PR Reviews",
    description: "Catch bugs before they merge. GoLM analyzes pull requests in real-time, providing actionable feedback and auto-generating fixes.",
    icon: <GitPullRequest className="w-6 h-6 text-purple-400" />,
  },
  {
    title: "Zero-Config Pipelines",
    description: "Deploy faster with intelligent CI/CD generation. We analyze your project structure and build the perfect pipeline automatically.",
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "Privacy First",
    description: "Your code is yours. Models run in isolated, secure environments, guaranteeing your proprietary logic never leaves your control.",
    icon: <Lock className="w-6 h-6 text-emerald-400" />,
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-24 z-10 border-t border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Built for the modern AI workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Everything you need to automate your deployment pipeline, powered by intelligent context-aware language models.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect p-8 rounded-2xl hover:bg-[hsl(var(--glass-strong))] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
