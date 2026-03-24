import { motion } from "framer-motion";
import { Code, Layers, Zap, Cpu } from "lucide-react";

const reasons = [
  {
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    accent: "cyan",
    title: "Zero-Day Model Support",
    description: "Uses HuggingFace natively. Any new PyTorch model uploaded to the hub can be served instantly — no .gguf conversion or waiting for community quantizations.",
  },
  {
    icon: <Code className="w-6 h-6 text-purple-400" />,
    accent: "purple",
    title: "Infinitely Hackable",
    description: "Written entirely in pure Python and PyTorch. Modify the batching scheduler, add logit processors, or inject memory optimizations without touching C/C++.",
  },
  {
    icon: <Layers className="w-6 h-6 text-emerald-400" />,
    accent: "emerald",
    title: "Server-Grade Batching",
    description: "Built as a lightweight vLLM equivalent for Windows with iteration-level continuous batching and PagedMemory allocation for concurrent API requests.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-rose-400" />,
    accent: "rose",
    title: "Speculative Decoding",
    description: "Accelerate massive models by leveraging smaller draft models to verify tokens in a single forward pass, integrated natively within PyTorch.",
  },
];

const accentMap: Record<string, string> = {
  cyan: "border-cyan-500/20 hover:border-cyan-500/40",
  purple: "border-purple-500/20 hover:border-purple-500/40",
  emerald: "border-emerald-500/20 hover:border-emerald-500/40",
  rose: "border-rose-500/20 hover:border-rose-500/40",
};

const bgMap: Record<string, string> = {
  cyan: "bg-cyan-500/10",
  purple: "bg-purple-500/10",
  emerald: "bg-emerald-500/10",
  rose: "bg-rose-500/10",
};

const WhyWinLLM = () => {
  return (
    <section className="relative py-24 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">WinLLM</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Unlike tools like Ollama, WinLLM is engineered for developers, rapid prototyping, and highly concurrent API serving on Windows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-6 rounded-2xl bg-white/[0.02] border ${accentMap[reason.accent]} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-xl ${bgMap[reason.accent]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {reason.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{reason.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWinLLM;
