import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
            Where Innovation
          </SpecialText>
          <br />
          <SpecialText
            inView={true}
            delay={1.2}
            speed={25}
            className="text-6xl md:text-[80px] font-bold leading-[0.95] tracking-tight"
          >
            Meets Execution
          </SpecialText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Streamline your testing and deployment pipeline with
          <br className="hidden md:block" />
          intelligent automation that adapts to your workflow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link to="/signup">
            <button className="px-7 py-3 rounded-full text-sm font-medium bg-background text-foreground border border-foreground/20 hover:border-foreground/40 transition-colors">
              Get Started for Free
            </button>
          </Link>
          <Link to="/chat">
            <button className="px-7 py-3 rounded-full text-sm font-medium glass-effect text-foreground hover:bg-[hsl(var(--glass-strong))] transition-colors">
              Try Our AI
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;
