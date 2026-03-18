import { motion } from "framer-motion";
import { Check, Cpu, Zap, Blocks, Server, MemoryStick } from "lucide-react";
import { Glow } from "./ui/glowing-effect";

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
  { name: "Llama-3.2-3B-Instruct", size: "3B", quant: "4bit", vram: "~2.0 GB" },
  { name: "Phi-3-mini-4k-instruct", size: "3.8B", quant: "4bit", vram: "~2.5 GB" },
  { name: "Mistral-7B-Instruct-v0.3", size: "7B", quant: "4bit", vram: "~4.5 GB" },
  { name: "Qwen2.5-7B-Instruct", size: "7B", quant: "4bit", vram: "~4.5 GB" },
  { name: "Phi-3-mini-4k-instruct", size: "3.8B", quant: "float16", vram: "~7.5 GB" },
];

const EngineSpecs = () => {
  return (
    <section id="specs" className="relative py-24 z-10 overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
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
              A deep-dive into the WinLLM inference and serving engine, inspired by the groundbreaking vLLM project. Fully self-contained.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Architecture Features */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Core Architecture</h3>
            {features.map((feature, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="shrink-0 mt-1">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Model Benchmarks */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-lg" />
            <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0B]/90 backdrop-blur-xl p-8 overflow-hidden">
              <Glow color="rgba(168, 85, 247, 0.15)" />
              
              <h3 className="text-2xl font-bold text-white mb-2">Supported Models</h3>
              <p className="text-white/60 text-sm mb-8">
                Optimized VRAM footprints for consumer GPUs using bitsandbytes quantization.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-4 text-xs font-semibold text-white/40 uppercase tracking-wider pb-2 border-b border-white/10">
                  <div className="col-span-2">Model</div>
                  <div>Params</div>
                  <div>VRAM</div>
                </div>
                
                {models.map((model, i) => (
                  <div key={i} className="grid grid-cols-4 items-center text-sm py-2 group">
                    <div className="col-span-2 font-medium text-white/90 truncate pr-4">
                      {model.name}
                      <span className="block text-xs text-white/40 mt-0.5">{model.quant}</span>
                    </div>
                    <div className="text-white/60">{model.size}</div>
                    <div className="text-emerald-400 font-mono text-xs bg-emerald-400/10 px-2 py-1 rounded inline-flex w-fit">
                      {model.vram}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" />
                  Terminal Ready
                </h4>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-white/80 border border-white/5">
                  <span className="text-purple-400">winllm</span> chat --model "microsoft/Phi-3-mini-4k-instruct" --quantization 4bit
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EngineSpecs;
