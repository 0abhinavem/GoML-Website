import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, CheckCircle2 } from "lucide-react";

const steps = [
  {
    command: "golm init project",
    output: "Scanning repository...\nAnalyzing dependencies...\nContext map generated successfully. (2.4s)",
  },
  {
    command: "golm generate tests --target auth.ts",
    output: "Analyzing auth.ts...\nGenerating unit tests based on edge cases...\nCreated __tests__/auth.test.ts (14 test cases)",
  },
  {
    command: "golm review pr #42",
    output: "Reviewing changes...\nIssue found: Potential SQL injection in user-query.ts.\nAuto-generating fix patch...\nPatch applied and pushed to branch.",
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
        await new Promise(resolve => setTimeout(resolve, 50));
        setDisplayedCommand(fullCommand.slice(0, i));
      }
      
      setIsTyping(false);
      timeout = setTimeout(() => {
        setShowOutput(true);
        setTimeout(() => {
          setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 3000);
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
              See how GoLM <br/><span className="gradient-text">automates the tedious parts</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed"
            >
              Our CLI and integrations drop right into your existing workflow. Trigger AI-driven test generation, code reviews, and pipeline configurations with simple, intuitive commands.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {[
                "Analyzes full repository context automatically",
                "Integrates with GitHub, GitLab, and Bitbucket",
                "Runs locally or in secure cloud environments"
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
                 <span className="text-xs font-mono text-white/40">golm-cli</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[250px] font-mono text-sm bg-black/40">
              <div className="flex items-center text-emerald-400 mb-2">
                <span className="mr-2">~</span>
                <span className="text-white/50 mr-2">$</span>
                <span className="text-white">{displayedCommand}</span>
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-white ml-1 inline-block"
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
