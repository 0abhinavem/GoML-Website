import { motion } from "framer-motion";
import { Download } from "lucide-react";
import HeroBadges from "./HeroBadges";
import { SpecialText } from "./ui/special-text";

const HeroContent = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <HeroBadges />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="font-display text-6xl md:text-[80px] font-bold leading-[0.95] tracking-tight gradient-text"
        >
          <SpecialText
            inView={true}
            delay={0.5}
            speed={25}
            className="text-6xl md:text-[80px] font-bold leading-[0.95] tracking-tight"
          >
            Run Any LLM.
          </SpecialText>
          <br />
          <SpecialText
            inView={true}
            delay={1.2}
            speed={25}
            className="text-6xl md:text-[80px] font-bold leading-[0.95] tracking-tight"
          >
            Natively on Windows.
          </SpecialText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          The fastest Windows-native inference engine with OpenAI-compatible API,
          <br className="hidden md:block" />
          quantization, and speculative decoding — all on your consumer GPU.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a href="https://github.com/adervark/wLLM/releases/tag/v1.0" target="_blank" rel="noopener noreferrer">
            <button className="px-7 py-3 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download v1.0
            </button>
          </a>
          <a href="https://github.com/adervark/wLLM" target="_blank" rel="noopener noreferrer">
            <button className="px-7 py-3 rounded-full text-sm font-medium glass-effect text-foreground hover:bg-[hsl(var(--glass-strong))] transition-colors">
              View on GitHub
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;

