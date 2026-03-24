import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cpu, Layers, Zap, Globe } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";
import { FlickeringGrid } from "./ui/flickering-grid";

const features = [
  {
    title: "4-bit & 8-bit Quantization",
    description: "Run 7B+ parameter models on consumer GPUs with NF4 and INT8 quantization via bitsandbytes. Slash VRAM usage without sacrificing quality.",
    icon: <Cpu className="w-6 h-6 text-indigo-400" />,
    link: "/info/specs",
  },
  {
    title: "Continuous Batching",
    description: "Serve multiple concurrent requests with iteration-level scheduling. Maximize GPU utilization and throughput automatically.",
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    link: "/info/architecture",
  },
  {
    title: "Speculative Decoding",
    description: "Accelerate generation 2–3× using a small draft model that predicts tokens ahead, then verifies with the main model in parallel.",
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    link: "/info/deep-dive",
  },
  {
    title: "OpenAI-Compatible API",
    description: "Drop-in replacement for /v1/chat/completions — works with any OpenAI SDK, LangChain, or custom client out of the box.",
    icon: <Globe className="w-6 h-6 text-emerald-400" />,
    link: "/info/cli",
  },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="relative py-24 z-10 border-t border-white/5 overflow-hidden">
      <FlickeringGrid
        className="z-0 absolute inset-0 w-full h-full"
        squareSize={4}
        gridGap={6}
        color="rgb(239, 68, 68)"
        maxOpacity={0.4}
        flickerChance={0.3}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Engineered for Maximum Throughput
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Everything you need to run LLMs locally on Windows — fast, efficient, and OpenAI-compatible.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 list-none">
          {features.map((feature, index) => (
            <motion.li
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="min-h-[14rem] cursor-pointer"
              onClick={() => navigate(feature.link)}
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 group">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl border-[0.75px] border-border bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-display tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                        {feature.title}
                      </h3>
                      <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors">
                    <span>Learn more →</span>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Features;
