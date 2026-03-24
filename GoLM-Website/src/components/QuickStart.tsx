import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    label: "Install",
    desc: "One command to install WinLLM with CUDA support.",
    cmd: 'uv pip install -e . --extra-index-url https://download.pytorch.org/whl/cu124',
  },
  {
    num: "02",
    label: "Chat",
    desc: "Start an interactive terminal chatbot instantly.",
    cmd: 'winllm chat --model "microsoft/Phi-3-mini-4k-instruct" --quantization 4bit',
  },
  {
    num: "03",
    label: "Serve",
    desc: "Launch an OpenAI-compatible API server.",
    cmd: 'winllm serve --model "microsoft/Phi-3-mini-4k-instruct" --quantization 4bit',
  },
];

const QuickStart = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section id="quickstart" className="relative py-24 z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-4">
              <Terminal className="w-3.5 h-3.5" />
              Quick Start
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Up and Running in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">60 Seconds</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              From install to your first inference — three commands, zero configuration.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col md:flex-row items-start gap-6 group"
            >
              {/* Step Number + Info */}
              <div className="flex items-start gap-4 md:w-[240px] shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white/60 shrink-0 group-hover:bg-white/10 transition-colors">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{step.label}</h3>
                  <p className="text-white/40 text-sm">{step.desc}</p>
                </div>
              </div>

              {/* Arrow (desktop only) */}
              <ArrowRight className="hidden md:block w-5 h-5 text-white/20 mt-2.5 shrink-0" />

              {/* Command Block */}
              <div className="flex-1 w-full rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden group-hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{step.label}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(step.cmd, i)}
                    className="text-white/40 hover:text-white transition-colors p-1"
                  >
                    {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-purple-300 whitespace-nowrap">{step.cmd}</code>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="https://github.com/adervark/wLLM/releases/tag/v1.0" target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <Download className="w-4 h-4" />
              Download WinLLM v1.0
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickStart;
