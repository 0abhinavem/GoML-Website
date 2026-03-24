import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal, BookOpen, Cpu, Zap, Server, Layers, GitBranch, Shield, FlaskConical, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const codeBlocks: Record<string, string> = {
  install: `# Create a virtual environment
uv venv .venv
.venv\\Scripts\\activate

# Install with CUDA support
uv pip install torch --extra-index-url https://download.pytorch.org/whl/cu124
uv pip install -e . --extra-index-url https://download.pytorch.org/whl/cu124`,
  chat: `winllm chat --model "microsoft/Phi-3-mini-4k-instruct" --quantization 4bit`,
  serve: `winllm serve --model "microsoft/Phi-3-mini-4k-instruct" --quantization 4bit --port 8000`,
  request: `curl https://api.winllm.dev/v1/chat/completions ^
  -H "Content-Type: application/json" ^
  -d "{\\"model\\": \\"Phi-3-mini\\", \\"messages\\": [{\\"role\\": \\"user\\", \\"content\\": \\"Hello!\\"}]}"`,
  benchmark: `winllm benchmark --model "microsoft/Phi-3-mini-4k-instruct" --quantization 4bit`,
  test: `# Using uv (recommended)
uv run pytest tests/ -v

# Or using the built-in batch file
setup_and_test.bat`,
};

const models = [
  { name: "Phi-3-mini-4k-instruct", size: "3.8B", quant: "float16", vram: "~7.5 GB" },
  { name: "Phi-3-mini-4k-instruct", size: "3.8B", quant: "4bit", vram: "~2.5 GB" },
  { name: "Llama-3.2-3B-Instruct", size: "3B", quant: "4bit", vram: "~2 GB" },
  { name: "Mistral-7B-Instruct-v0.3", size: "7B", quant: "4bit", vram: "~4.5 GB" },
  { name: "Qwen2.5-7B-Instruct", size: "7B", quant: "4bit", vram: "~4.5 GB" },
];

const endpoints = [
  { path: "/v1/models", method: "GET", desc: "List loaded model" },
  { path: "/v1/chat/completions", method: "POST", desc: "Chat completion" },
  { path: "/v1/completions", method: "POST", desc: "Text completion" },
  { path: "/health", method: "GET", desc: "Server health & GPU stats" },
];

const features = [
  "OpenAI-compatible API — drop-in replacement for /v1/chat/completions and /v1/completions",
  "4-bit / 8-bit quantization via bitsandbytes (NF4, INT8)",
  "KV cache management — memory-aware scheduling prevents OOM",
  "Streaming — Server-Sent Events for real-time token output",
  "Continuous batching — serves multiple concurrent requests with iteration-level scheduling",
  "Speculative decoding — accelerates generation using small draft models",
  "torch.compile support — reduces Python overhead via graph optimization",
  "Interactive CLI — chat directly in your terminal",
];

const whyWLLM = [
  { title: "Zero-Day Model Support", desc: "Uses HuggingFace natively. Any new PyTorch model uploaded to the hub can be served instantly — no .gguf conversion needed." },
  { title: "Infinitely Hackable", desc: "Written entirely in pure Python and PyTorch. Modify batching, logit processors, or memory optimizations without C/C++." },
  { title: "Server-Grade Continuous Batching", desc: "Iteration-level continuous batching and PagedMemory allocation for concurrent API requests on consumer GPUs." },
  { title: "Speculative Decoding", desc: "Accelerate massive models by leveraging smaller draft models to verify tokens in a single forward pass." },
];

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 group">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-white/40" />
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">{label}</span>
        </div>
        <button onClick={handleCopy} className="text-white/40 hover:text-white transition-colors p-1">
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-purple-300 whitespace-pre">{code}</code>
      </div>
    </div>
  );
}

function SectionHeading({ icon, title, id }: { icon: React.ReactNode; title: string; id: string }) {
  return (
    <div id={id} className="flex items-center gap-3 mb-6 pt-8 border-t border-white/5 first:border-0 first:pt-0 scroll-mt-24">
      <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">{icon}</div>
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
    </div>
  );
}

const Docs = () => {
  return (
    <div className="relative bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-28 pb-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Documentation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-display">
            Win<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">LLM</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A Windows-native LLM inference and serving engine inspired by vLLM. Built with PyTorch + CUDA + HuggingFace Transformers.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pb-24 space-y-12">

        {/* Features */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading icon={<Zap className="w-5 h-5 text-cyan-400" />} title="Features" id="doc-features" />
          <ul className="space-y-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-white/80">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                <span className="text-sm leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Why wLLM */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading icon={<Layers className="w-5 h-5 text-purple-400" />} title="Why wLLM? (vs. Ollama)" id="doc-why" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyWLLM.map((item, i) => (
              <div key={i} className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/30 transition-colors">
                <h4 className="text-white font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Quick Start */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading icon={<Terminal className="w-5 h-5 text-yellow-400" />} title="Quick Start" id="doc-quickstart" />

          <h3 className="text-xl font-bold text-white mb-3">Install</h3>
          <p className="text-white/60 mb-4 text-sm">
            <strong className="text-white">The Easiest Way (Windows):</strong> Simply double-click the <code className="px-2 py-0.5 bg-white/10 rounded text-purple-300 text-xs">install.bat</code> file in the root directory. It will automatically detect/create a virtual environment, install PyTorch with CUDA 12.4 support, and install the wLLM engine.
          </p>
          <p className="text-white/60 mb-3 text-sm"><strong className="text-white">Manual Installation (using <code className="px-2 py-0.5 bg-white/10 rounded text-purple-300 text-xs">uv</code>):</strong></p>
          <CodeBlock code={codeBlocks.install} label="Install" />

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Chat in Terminal</h3>
          <CodeBlock code={codeBlocks.chat} label="Chat" />

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Start API Server</h3>
          <CodeBlock code={codeBlocks.serve} label="Start API Server" />

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Send a Request</h3>
          <CodeBlock code={codeBlocks.request} label="Send a Request" />

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Run Benchmark</h3>
          <CodeBlock code={codeBlocks.benchmark} label="Run Benchmark" />
        </motion.section>

        {/* Supported Models */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading icon={<Cpu className="w-5 h-5 text-emerald-400" />} title="Supported Models" id="doc-models" />
          <p className="text-white/60 text-sm mb-4">
            Any HuggingFace <code className="px-2 py-0.5 bg-white/10 rounded text-purple-300 text-xs">AutoModelForCausalLM</code> model works. Recommended for 8GB VRAM:
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0d1117]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="p-4 font-semibold text-white/80">Model</th>
                  <th className="p-4 font-semibold text-white/80">Size</th>
                  <th className="p-4 font-semibold text-white/80">Quantization</th>
                  <th className="p-4 font-semibold text-white/80">VRAM Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {models.map((m, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-white font-mono text-xs">{m.name}</td>
                    <td className="p-4 text-white/60">{m.size}</td>
                    <td className="p-4 text-white/60">{m.quant}</td>
                    <td className="p-4 text-emerald-400 font-mono">{m.vram}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* API Endpoints */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading icon={<Server className="w-5 h-5 text-blue-400" />} title="API Endpoints" id="doc-api" />
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0d1117]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="p-4 font-semibold text-white/80">Endpoint</th>
                  <th className="p-4 font-semibold text-white/80">Method</th>
                  <th className="p-4 font-semibold text-white/80">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {endpoints.map((e, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-purple-300 font-mono text-xs">{e.path}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${e.method === "GET" ? "bg-emerald-400/20 text-emerald-400" : "bg-blue-400/20 text-blue-400"}`}>
                        {e.method}
                      </span>
                    </td>
                    <td className="p-4 text-white/60">{e.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Architecture */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading icon={<GitBranch className="w-5 h-5 text-rose-400" />} title="Architecture" id="doc-architecture" />
          <div className="p-6 rounded-xl bg-[#0d1117] border border-white/10 font-mono text-sm text-white/80 leading-loose whitespace-pre overflow-x-auto">
{`Request → API Server → Scheduler (Waiting Queue)
                             ↓
                     Inference Loop (Continuous Batching)
                             ↕               ↕
                     KV Cache Manager   Speculative Engine
                             ↓
                      Model (PyTorch) ← [torch.compile]`}
          </div>
        </motion.section>

        {/* Testing */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading icon={<FlaskConical className="w-5 h-5 text-amber-400" />} title="Testing" id="doc-testing" />
          <p className="text-white/60 text-sm mb-4">To run the full test suite and ensure everything works:</p>
          <CodeBlock code={codeBlocks.test} label="Testing" />
          <p className="text-white/60 text-sm mt-4 mb-2">Individual component tests can be run via:</p>
          <ul className="space-y-2">
            {[
              { cmd: "pytest tests/test_device.py", desc: "Hardware detection" },
              { cmd: "pytest tests/test_sampler.py", desc: "Logits processing" },
              { cmd: "pytest tests/test_kv_cache.py", desc: "Memory management" },
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                <ChevronRight className="w-3 h-3 text-amber-400 shrink-0" />
                <code className="px-2 py-0.5 bg-white/10 rounded text-purple-300 text-xs">{t.cmd}</code>
                <span className="text-white/40">({t.desc})</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* License */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading icon={<Shield className="w-5 h-5 text-white/60" />} title="License" id="doc-license" />
          <p className="text-white/60 text-sm">MIT</p>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
