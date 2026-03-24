import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, Blocks, Server, MemoryStick } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";

const features = [
  {
    icon: <Server className="w-5 h-5 text-purple-400" />,
    title: "OpenAI-compatible API",
    description: "Drop-in replacement for /v1/chat/completions and /v1/completions. Works instantly with LangChain and standard OpenAI SDKs.",
  },
  {
    icon: <MemoryStick className="w-5 h-5 text-blue-400" />,
    title: "Smart KV Cache Management",
    description: "Memory-aware scheduling powered by PagedAttention architecture prevents OOM and drastically reduces memory fragmentation.",
  },
  {
    icon: <Blocks className="w-5 h-5 text-emerald-400" />,
    title: "Continuous Batching",
    description: "Serves multiple concurrent requests with iteration-level scheduling, minimizing idle GPU time for maximum throughput.",
  },
  {
    icon: <Cpu className="w-5 h-5 text-amber-400" />,
    title: "Hardware Accelerators",
    description: "Uses PyTorch + CUDA + bitsandbytes under the hood with 4-bit and 8-bit quantization (NF4, INT8) to run on consumer GPUs.",
  },
  {
    icon: <Zap className="w-5 h-5 text-rose-400" />,
    title: "Speculative Decoding",
    description: "Accelerated generation pipeline using small draft models to preemptively generate tokens for high-speed outputs.",
  },
];

const models = [
  { name: "Llama-3.2-3B-Instruct", size: "3B", quant: "4bit", vram: "~2.0 GB", speed: "140 tok/s" },
  { name: "Phi-3-mini-4k-instruct", size: "3.8B", quant: "4bit", vram: "~2.5 GB", speed: "125 tok/s" },
  { name: "Mistral-7B-Instruct-v0.3", size: "7B", quant: "4bit", vram: "~4.5 GB", speed: "75 tok/s" },
  { name: "Qwen2.5-7B-Instruct", size: "7B", quant: "4bit", vram: "~4.5 GB", speed: "80 tok/s" },
  { name: "Phi-3-mini-4k-instruct", size: "3.8B", quant: "float16", vram: "~7.5 GB", speed: "90 tok/s" },
];



const EngineSpecs = () => {
  const [activeTab, setActiveTab] = useState("Architecture");

  return (
    <section id="specs" className="relative py-24 z-10 overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-4">
              Open Source Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Extreme Polish</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              A deep-dive into the WinLLM inference and serving engine. Fully self-contained.
            </p>
          </motion.div>
        </div>

        {/* Interactive Interactive Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-xl transition-all">
            {["Architecture", "Benchmarks"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  activeTab === tab ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabSpecs"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* TAB 1: ARCHITECTURE */}
            {activeTab === "Architecture" && (
              <motion.div
                key="Architecture"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {features.map((feature, i) => (
                  <div key={i} className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group ${i === features.length - 1 ? "sm:col-span-2 sm:max-w-md mx-auto w-full" : ""}`}>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 2: BENCHMARKS */}
            {activeTab === "Benchmarks" && (
              <motion.div
                key="Benchmarks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-50" />
                <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0B]/90 backdrop-blur-xl p-8 overflow-hidden">
                  <GlowingEffect blur={0} spread={20} glow={true} inactiveZone={0.01} borderWidth={3} className="rounded-2xl" />
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 text-xs font-semibold text-white/40 uppercase tracking-wider pb-3 border-b border-white/10">
                      <div className="col-span-2">Model Target</div>
                      <div>Params</div>
                      <div>Avg. VRAM</div>
                      <div className="text-right">Speed (Est)</div>
                    </div>
                    
                    {models.map((model, i) => (
                      <div key={i} className="grid grid-cols-5 items-center text-sm py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-4 px-4 transition-colors rounded-lg group cursor-default">
                        <div className="col-span-2 font-medium text-white/90 truncate pr-4">
                          {model.name}
                          <span className="inline-block ml-3 px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/60 uppercase tracking-wider group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">{model.quant}</span>
                        </div>
                        <div className="text-white/60">{model.size}</div>
                        <div className="text-emerald-400 font-mono text-xs bg-emerald-400/10 px-2 py-1 rounded inline-flex w-fit">
                          {model.vram}
                        </div>
                        <div className="text-right text-blue-400 font-mono text-xs">
                          {model.speed}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}


          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EngineSpecs;
