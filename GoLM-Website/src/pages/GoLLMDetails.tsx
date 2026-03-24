import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Cpu, Layers, Terminal, Server, Zap, GitBranch, Settings, Info, CheckCircle2, HardDrive, Network, Activity, Clock, ArrowRight, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mermaid } from "@/components/ui/mermaid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import CpuArchitecture from "@/components/ui/cpu-architecture";
import { AnimatedTerminal } from "@/components/ui/animated-terminal";
import { motion } from "framer-motion";

type TopicKey = 'features' | 'how-it-works' | 'specs' | 'releases' | 'architecture' | 'cli' | 'deep-dive';

const topicDetails: Record<TopicKey, { title: string; subtitle: string; icon: React.ReactNode; content: React.ReactNode }> = {
  'features': {
    title: "Features",
    subtitle: "High-performance inference engine built for Windows.",
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    content: (
      <div className="space-y-8 text-gray-300 leading-relaxed">
        <p className="text-lg font-medium text-white">WinLLM is a Windows-native LLM inference and serving engine built with PyTorch and CUDA. It bypasses the performance penalties of virtualization to deliver maximum GPU throughput.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative p-6 bg-black/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-[#41bcbc]/40 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-[#41bcbc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-[#41bcbc]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Zap className="w-6 h-6 text-[#41bcbc]" />
            </div>
            <h3 className="text-white font-bold mb-2">Zero-Copy Memory</h3>
            <p className="text-sm opacity-80">By running natively on Windows, WinLLM maps VRAM directly to the engine via CUDA, avoiding the 10-20% memory and latency overhead introduced by WSL2 and Docker storage layers.</p>
          </div>
          
          <div className="relative p-6 bg-black/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-400/40 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-purple-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Layers className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-bold mb-2">Continuous Batching</h3>
            <p className="text-sm opacity-80">Advanced iteration-level scheduling inserts new requests immediately after finishing prompts, leading to a 3-4x throughput increase over naive request-level batching.</p>
          </div>

          <div className="relative p-6 bg-black/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-emerald-400/40 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-emerald-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Server className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-white font-bold mb-2">OpenAI-Compatible</h3>
            <p className="text-sm opacity-80">A drop-in replacement API server for <code>/v1/chat/completions</code> and streaming SSE. Your existing LangChain, LlamaIndex, and AutoGen code works without modifications.</p>
          </div>

          <div className="relative p-6 bg-black/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-rose-400/40 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-lg bg-rose-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Cpu className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-white font-bold mb-2">Hardware Speculative Decoding</h3>
            <p className="text-sm opacity-80">Accelerates token generation by drafting sequences using a smaller model and verifying them simultaneously on the target hardware architecture.</p>
          </div>
        </div>
      </div>
    )
  },
  'how-it-works': {
    title: "How It Works",
    subtitle: "Built with PyTorch + CUDA + HuggingFace.",
    icon: <Layers className="w-8 h-8 text-purple-400" />,
    content: (
      <div className="space-y-8 text-gray-300 leading-relaxed">
        <p className="text-lg">The foundation of WinLLM is an asynchronous event loop designed specifically for Windows hardware stacks. It aggressively pipelines operations to prevent GPU starvation.</p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center my-12 relative px-4">
           {/* Connecting Line Desktop */}
           <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

           <div className="flex flex-col items-center text-center w-full md:w-32 z-10">
              <div className="w-14 h-14 rounded-full border border-white/20 bg-black/80 flex justify-center items-center mb-4 text-white hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Network className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm text-white mb-1">API Server</span>
              <span className="text-xs opacity-60">Receives Prompt via REST/WS</span>
           </div>
           
           <ArrowRight className="w-6 h-6 text-white/20 hidden md:block z-10" />
           <div className="w-px h-8 bg-white/20 md:hidden" />

           <div className="flex flex-col items-center text-center w-full md:w-32 z-10">
              <div className="w-14 h-14 rounded-full border border-cyan-400/40 bg-black/80 flex justify-center items-center mb-4 text-cyan-400 hover:bg-cyan-400/10 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Activity className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm text-cyan-400 mb-1">Scheduler</span>
              <span className="text-xs opacity-60">Iteration Batching & Priority</span>
           </div>

           <ArrowRight className="w-6 h-6 text-white/20 hidden md:block z-10" />
           <div className="w-px h-8 bg-white/20 md:hidden" />

           <div className="flex flex-col items-center text-center w-full md:w-32 z-10">
              <div className="w-14 h-14 rounded-full border border-purple-400/40 bg-black/80 flex justify-center items-center mb-4 text-purple-400 hover:bg-purple-400/10 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <HardDrive className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm text-purple-400 mb-1">KV Cache Pool</span>
              <span className="text-xs opacity-60">Paged Attention Allocation</span>
           </div>
        </div>

        <div className="mt-12 p-6 bg-black/60 rounded-xl border border-white/10 flex flex-col justify-center items-center">
          <h4 className="text-white/80 font-mono text-xs uppercase tracking-widest mb-4">Hardware Level Inference Loop</h4>
          <div className="h-[300px] w-full flex items-center justify-center">
            <CpuArchitecture className="w-full h-full max-w-[600px] text-teal-400" text="WinLLM" />
          </div>
        </div>
      </div>
    )
  },
  'specs': {
    title: "Specs & Models",
    subtitle: "Any HuggingFace AutoModelForCausalLM model works.",
    icon: <Cpu className="w-8 h-8 text-indigo-400" />,
    content: (
      <div className="space-y-8 text-gray-300 leading-relaxed">
        <p className="text-lg">WinLLM is designed for extreme efficiency across all modern hardware, scaling dynamically based on VRAM constraints.</p>
        
        {/* Hardware Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#064e3b]/20 to-black/40 border border-emerald-500/30 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-emerald-500/20 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-20"><Cpu className="w-24 h-24 text-emerald-500" /></div>
            <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500/50" />
            <h4 className="text-white font-bold text-lg mb-1">Entry Level</h4>
            <div className="text-xs text-emerald-400 font-mono mb-4">4-BIT QUANTIZED</div>
            <ul className="space-y-3 text-sm relative z-10">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <strong>RAM:</strong> 16GB System Memory</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <strong>VRAM:</strong> 8GB (RTX 3060/4060)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <strong>Best For:</strong> 3B - 7B Models</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <strong>Context:</strong> Up to 8k tokens</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1f3f6d]/20 to-black/40 border border-blue-400/30 backdrop-blur-sm relative overflow-hidden transform md:-translate-y-2 shadow-xl shadow-blue-500/10 transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/30 group z-10">
            <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-20"><Server className="w-24 h-24 text-blue-400" /></div>
            <div className="absolute top-0 inset-x-0 h-1 bg-blue-400/50" />
            <h4 className="text-white font-bold text-lg mb-1">Recommended</h4>
            <div className="text-xs text-blue-400 font-mono mb-4">SWEET SPOT</div>
            <ul className="space-y-3 text-sm relative z-10">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> <strong>RAM:</strong> 32GB System Memory</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> <strong>VRAM:</strong> 16GB (RTX 4080)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> <strong>Best For:</strong> 8B - 14B Models</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> <strong>Context:</strong> Up to 32k tokens</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#78350f]/20 to-black/40 border border-[#cc7d23]/30 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#cc7d23]/20 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-20"><Zap className="w-24 h-24 text-[#cc7d23]" /></div>
            <div className="absolute top-0 inset-x-0 h-1 bg-[#cc7d23]/50" />
            <h4 className="text-white font-bold text-lg mb-1">Enthusiast</h4>
            <div className="text-xs text-[#cc7d23] font-mono mb-4">NO COMPROMISES</div>
            <ul className="space-y-3 text-sm relative z-10">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#cc7d23]" /> <strong>RAM:</strong> 64GB System Memory</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#cc7d23]" /> <strong>VRAM:</strong> 24GB (RTX 4090)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#cc7d23]" /> <strong>Best For:</strong> 32B+ Models / FP16</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#cc7d23]" /> <strong>Context:</strong> 1M+ tokens</li>
            </ul>
          </div>
        </div>

        {/* Model Examples */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm mt-12 pb-2">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="p-5 font-medium text-white/80">Tested Model Weights</th>
                <th className="p-5 font-medium text-white/80">Parameters</th>
                <th className="p-5 font-medium text-white/80">Quantization Target</th>
                <th className="p-5 font-medium text-white/80">Footprint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-5 text-white font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div>Phi-3-mini-4k-instruct</td>
                <td className="p-5 text-gray-400 font-mono">3.8B</td>
                <td className="p-5 text-gray-300">float16</td>
                <td className="p-5 text-white bg-white/5 font-mono">~7.5 GB</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-5 text-white font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div>Phi-3-mini-4k-instruct</td>
                <td className="p-5 text-gray-400 font-mono">3.8B</td>
                <td className="p-5 text-gray-300">4-bit NF4</td>
                <td className="p-5 text-white bg-white/5 font-mono">~2.5 GB</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-5 text-white font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Llama-3.2-3B-Instruct</td>
                <td className="p-5 text-gray-400 font-mono">3.0B</td>
                <td className="p-5 text-gray-300">4-bit AWQ</td>
                <td className="p-5 text-white bg-white/5 font-mono">~2.0 GB</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-5 text-white font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Mistral-7B-Instruct-v0.3</td>
                <td className="p-5 text-gray-400 font-mono">7.0B</td>
                <td className="p-5 text-gray-300">4-bit NF4</td>
                <td className="p-5 text-white bg-white/5 font-mono">~4.5 GB</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-5 text-white font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#cc7d23]"></div>Qwen2.5-14B-Instruct</td>
                <td className="p-5 text-gray-400 font-mono">14.0B</td>
                <td className="p-5 text-gray-300">float16</td>
                <td className="p-5 text-white bg-white/5 font-mono">~28.0 GB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  'architecture': {
    title: "Architecture Details",
    subtitle: "Inference pipeline and resource scheduling.",
    icon: <Server className="w-8 h-8 text-emerald-400" />,
    content: (
      <div className="space-y-8 text-gray-300 leading-relaxed">
        <p className="text-lg">WinLLM's software architecture minimizes Python overhead via <code>torch.compile</code> optimizations while performing highly parallelized batching using native C++ extensions where necessary.</p>
        
        <div className="mt-8 p-6 bg-black/60 rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-emerald-900/10">
          <Mermaid chart={`
            graph TD
              A([Incoming Request]) --> B(API Server \n REST / SSE)
              B --> C{Scheduler \n Waiting Queue}
              C -.->|Scheduling| D(Inference Loop \n Continuous Batching)
              D <--> E[(KV Cache Manager)]
              D <--> F[(Speculative Engine)]
              D --> G[HuggingFace Model \n PyTorch]
              G -.-> H[/torch.compile Graph/]
              
              style A fill:#000000,stroke:#666,stroke-width:2px,color:#fff
              style B fill:#1a1a1a,stroke:#444,stroke-width:2px,color:#fff
              style C fill:#2b2b2b,stroke:#00f0ff,stroke-width:2px,color:#fff
              style D fill:#3d1a1a,stroke:#ff3333,stroke-width:2px,color:#fff
              style E fill:#1a3d1a,stroke:#33ff33,stroke-width:2px,color:#fff
              style F fill:#3d3d1a,stroke:#ffff33,stroke-width:2px,color:#fff
              style G fill:#1a1a3d,stroke:#3333ff,stroke-width:2px,color:#fff
              style H fill:#1a1a1a,stroke:#666,stroke-width:2px,color:#aaa,stroke-dasharray: 5 5
              `} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
           <div className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Cpu className="w-4 h-4"/> Hardware Acceleration</h4>
              <p className="text-sm text-gray-400">Custom PyTorch C++ kernels are utilized for FlashAttention and Rotary Positional Embeddings to bypass Python's Global Interpreter Lock (GIL) and maximize CUDA core saturation.</p>
           </div>
           <div className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><GitBranch className="w-4 h-4"/> Graph Compilation</h4>
              <p className="text-sm text-gray-400">HuggingFace models are dynamically traced and optimized into efficient CUDA graphs using <code>torch.compile(mode="max-autotune")</code>, significantly reducing framework overhead.</p>
           </div>
        </div>
      </div>
    )
  },
  'cli': {
    title: "Commands Reference",
    subtitle: "Detailed CLI usage, options, and auto-configuration guide.",
    icon: <Terminal className="w-8 h-8 text-yellow-400" />,
    content: (
      <div className="space-y-8 text-gray-300 leading-relaxed">
        <p className="text-lg">WinLLM ships with an intuitive, powerful CLI allowing you to instantly boot up models or hook into existing AI agent workflows.</p>
        
        {/* Terminal Window Mockup */}
        <AnimatedTerminal />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-5 bg-black/40 border border-white/5 hover:border-yellow-400/30 transition-colors rounded-xl">
               <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2"><Terminal className="w-4 h-4" /> <code>winllm chat</code></h4>
               <p className="text-sm text-gray-400">Initializes an interactive terminal chatbot with markdown rendering and streaming outputs.</p>
            </div>
            <div className="p-5 bg-black/40 border border-white/5 hover:border-yellow-400/30 transition-colors rounded-xl">
               <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> <code>winllm benchmark</code></h4>
               <p className="text-sm text-gray-400">Spins up a local test suite to measure exact time-to-first-token (TTFT) and throughput decodes per second.</p>
            </div>
        </div>
      </div>
    )
  },
  'releases': {
    title: "Releases",
    subtitle: "WinLLM updates and testing framework.",
    icon: <GitBranch className="w-8 h-8 text-pink-400" />,
    content: (
      <div className="space-y-8 text-gray-300 leading-relaxed">
        <p className="text-lg">Track the evolution of the WinLLM inference engine, from initial prototypes to production-ready enterprise serving.</p>
        
        <div className="mt-12 relative px-4">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[26px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-pink-500 via-pink-900/50 to-transparent shadow-[0_0_10px_#ec4899]" />
          
          <div className="space-y-12">
             {/* Component 1 v1.1.0 */}
             <div className="relative pl-12 group cursor-default">
               <div className="absolute left-[20px] top-1.5 w-[14px] h-[14px] rounded-full bg-pink-500 shadow-[0_0_15px_#ec4899] ring-4 ring-background duration-300 group-hover:scale-125" />
               <div className="flex items-center gap-3 mb-1">
                 <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">v1.1.0-RC</h3>
                 <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30">Upcoming</span>
               </div>
               <p className="text-sm text-gray-400 mt-2 p-4 bg-white/5 border border-white/5 rounded-xl group-hover:border-pink-500/20 transition-colors">
                 Introducing speculative decoding support for Llama 3 architectures and seamless INT8 KV cache compression, expanding context limits radically.
               </p>
             </div>

             {/* Component 2 v1.0.0 */}
             <div className="relative pl-12 group">
               <div className="absolute left-[20px] top-1.5 w-[14px] h-[14px] rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] ring-4 ring-background duration-300 group-hover:scale-125" />
               <h3 className="text-xl font-bold text-gray-200 mb-1 group-hover:text-white transition-colors">v1.0.0 Core Open Source Release</h3>
               <p className="text-sm text-gray-400 mt-2 p-4 bg-white/5 border border-white/5 rounded-xl group-hover:border-white/20 transition-colors">
                 Graduated from Beta. Stabilized the PagedAttention kernel for Windows. Shipped the full FastAPI compatible <code>/v1/chat/completions</code> endpoint with Server-Sent Events (SSE) streaming.
               </p>
             </div>

             {/* Component 3 v0.9.0 */}
             <div className="relative pl-12 group">
               <div className="absolute left-[20px] top-1.5 w-[14px] h-[14px] rounded-full bg-gray-600 ring-4 ring-background duration-300 group-hover:bg-gray-400" />
               <h3 className="text-xl font-bold text-gray-400 mb-1 group-hover:text-gray-300 transition-colors">v0.9.0 Beta Testing Framework</h3>
               <p className="text-sm text-gray-500 mt-2 p-4 bg-white/5 border border-white/5 rounded-xl">
                 Implemented comprehensive <code>pytest</code> suite for continuous integration. Integrated 4-bit BitsAndBytes quantization limits effectively halving model load footprint.
               </p>
             </div>
          </div>
        </div>
      </div>
    )
  },
  'deep-dive': {
    title: "Deep Dive (Genesys)",
    subtitle: "A first-principles guide explaining LLM inference.",
    icon: <Settings className="w-8 h-8 text-teal-400" />,
    content: (
      <div className="space-y-8 text-gray-300 leading-relaxed">
        <p className="text-lg">Our deep dive documentation (Genesys project) explores exactly how inference engines manipulate memory to scale efficiently across consumer hardware.</p>
        
        <div className="grid grid-cols-1 gap-6 mt-8">
           <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-900/20 to-black/40 border border-teal-500/20 shadow-lg group hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/10">
             <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="p-4 bg-teal-500/10 rounded-xl group-hover:bg-teal-500/20 transition-colors"><HardDrive className="w-8 h-8 text-teal-400" /></div>
                <div>
                  <h4 className="text-teal-400 text-xl font-bold mb-3">PagedAttention & Fragmentation</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Standard LLM generation suffers from severe memory fragmentation due to unpredictable sequence length generation. WinLLM implements a variant of PagedAttention, carving VRAM into fixed-size block pages (e.g., 16 tokens). These blocks are mapped logically, comprehensively eliminating internal fragmentation and boosting concurrency limits by up to 5x.
                  </p>
                </div>
             </div>
           </div>

           <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-black/40 border border-cyan-500/20 shadow-lg group hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
             <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="p-4 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors"><Activity className="w-8 h-8 text-cyan-400" /></div>
                <div>
                  <h4 className="text-cyan-400 text-xl font-bold mb-3">Continuous Preemption Algorithms</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Rather than waiting for an entire batch of requests to finish generating all their tokens to clear memory, WinLLM's scheduler operates at the token-iteration level. It uses a preemptive algorithm to swap requests out of VRAM to CPU RAM if hardware limits are hit, re-inserting them dynamically when space frees up, guaranteeing strict SLA boundaries.
                  </p>
                </div>
             </div>
           </div>
           
           <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-black/40 border border-purple-500/20 shadow-lg group hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
             <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="p-4 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors"><Cpu className="w-8 h-8 text-purple-400" /></div>
                <div>
                  <h4 className="text-purple-400 text-xl font-bold mb-3">Int8 KV Cache Quantization</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    To effectively double the viable context window on consumer GPUs without buying new hardware, the KV cache tensors can be logically quantized down to 8-bit integers. This is processed on-the-fly via custom, lightweight CUDA operations, yielding massive space savings with mathematically negligible perplexity degradation.
                  </p>
                </div>
             </div>
           </div>
        </div>
      </div>
    )
  }
};

const GoLLMDetails = () => {
  const { topic } = useParams<{ topic: string }>();
  
  if (!topic || !Object.keys(topicDetails).includes(topic as TopicKey)) {
    return <Navigate to="/info/features" replace />;
  }

  const topicKey = topic as TopicKey;
  const currentDetails = topicDetails[topicKey];

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      {/* Background Effect to match main site */}
      <div className="fixed inset-0 z-0 bg-background pointer-events-none" />
      <FlickeringGrid
        className="z-0 fixed inset-0 w-full h-full pointer-events-none"
        squareSize={4}
        gridGap={6}
        color="rgba(122, 31, 31, 0.4)" 
        maxOpacity={0.4}
        flickerChance={0.3}
      />
      
      <div className="relative z-50">
        <Navbar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-24 relative z-10 px-6 max-w-5xl mx-auto w-full">
        <div className="mb-12 border-b border-white/5 pb-6">
          <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors duration-200 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 shadow-sm backdrop-blur-md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <div className="p-5 bg-black/40 border-[0.75px] border-white/10 rounded-2xl flex-shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-xl">
               {currentDetails.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2">
                {currentDetails.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light">
                {currentDetails.subtitle}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="relative rounded-[2rem] border-[0.75px] border-white/10 p-2 md:p-3"
        >
          <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
          />
          <div className="relative bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-[1.5rem] border-[0.75px] border-white/10 shadow-2xl overflow-hidden min-h-[400px]">
             {/* Subtle internal gradient accent */}
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#7A1F1F]/15 rounded-full blur-[120px] pointer-events-none" />
             
             <div className="relative z-10">
               {currentDetails.content}
             </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default GoLLMDetails;
