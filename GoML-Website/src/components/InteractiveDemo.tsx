import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, CheckCircle2 } from "lucide-react";

const steps = [
  {
    command: 'winllm serve --model "microsoft/Phi-3-mini-4k-instruct" --quantization 4bit',
    output: "Loading model...\nApplying NF4 quantization...\nKV cache allocated (2.1 GB)...\n✓ Server ready at http://localhost:8000",
  },
  {
    command: 'curl localhost:8000/v1/chat/completions -d \'{"model":"Phi-3","messages":[{"role":"user","content":"Hello!"}]}\'',
    output: '{"choices":[{"message":{"content":"Hello! How can I help you today?"}}]}\nTokens/s: 42.3 | Latency: 234ms',
  },
  {
    command: 'winllm benchmark --model "microsoft/Phi-3-mini-4k-instruct" --quantization 4bit',
    output: "Running throughput benchmark...\nPrefill: 1,247 tok/s | Decode: 48.2 tok/s\nMemory: 4.1 GB VRAM | Peak: 5.8 GB",
  },
];

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const typeCommand = async () => {
      setIsTyping(true);
      setShowOutput(false);
      setDisplayedCommand("");
      
      const fullCommand = steps[currentStep].command;
      
      for (let i = 0; i <= fullCommand.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setDisplayedCommand(fullCommand.slice(0, i));
      }
      
      setIsTyping(false);
      timeout = setTimeout(() => {
        setShowOutput(true);
        setTimeout(() => {
          setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 3500);
      }, 400);
    };

    typeCommand();

    return () => clearTimeout(timeout);
  }, [currentStep]);

  return (
    <section id="demo" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Side */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              See WinLLM <br/><span className="gradient-text">in action</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed"
            >
              From installation to your first API call in under 60 seconds. One CLI, zero configuration, instant inference.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {[
                "Serves OpenAI-compatible API on localhost",
                "Runs on 8 GB VRAM with 4-bit quantization",
                "Built-in benchmarking and profiling tools"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right Terminal Side */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            className="w-full rounded-2xl overflow-hidden glass-strong border border-white/10 shadow-2xl relative"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center flex justify-center items-center gap-2">
                 <Terminal className="w-4 h-4 text-white/40" />
                 <span className="text-xs font-mono text-white/40">winllm-cli</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[280px] font-mono text-sm bg-black/40 overflow-hidden">
              <div className="flex items-start text-emerald-400 mb-2">
                <span className="mr-2 shrink-0">~</span>
                <span className="text-white/50 mr-2 shrink-0">$</span>
                <span className="text-white break-all">{displayedCommand}</span>
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-white ml-1 inline-block shrink-0"
                  />
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {showOutput && (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-white/70 whitespace-pre-wrap leading-relaxed mt-4 border-l-2 border-white/10 pl-4"
                  >
                    {steps[currentStep].output}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-3 flex items-center gap-2 text-emerald-400"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs">Task Complete</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
