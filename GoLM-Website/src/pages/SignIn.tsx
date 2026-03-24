import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

const SignIn = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4 md:p-8">
      <VideoPlayer videoSrc="/videos/luminance_10_4k.mp4" />
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-2 rounded-[2rem] overflow-hidden bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {/* Left Column */}
        <div className="relative p-8 lg:p-12 flex flex-col justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-fit group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Back to Home
          </Link>
          
          <div className="mt-20 mb-10">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              Welcome back
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Sign in to your wLLM account to continue where you left off and manage your workspace.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-8 lg:p-12 bg-white/5 flex flex-col justify-center border-l border-white/10">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold text-white">
              Sign in
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                <input
                  id="signin-email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-0 py-2 bg-transparent border-b border-white/20 text-white placeholder:text-white/60 text-sm focus:outline-none focus:border-white transition-all rounded-none"
                />

                <div className="relative">
                  <input
                    id="signin-password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-0 py-2 bg-transparent border-b border-white/20 text-white placeholder:text-white/60 text-sm focus:outline-none focus:border-white transition-all rounded-none"
                  />
                  <a href="#" className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white transition-colors">
                    Forgot?
                  </a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 mt-6 rounded-xl text-sm font-display font-medium bg-gradient-to-b from-foreground to-muted-foreground text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                >
                  Sign in
                </motion.button>
              </form>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="flex flex-col items-center justify-center gap-6 mt-8 w-full max-w-sm mx-auto">
            {/* Horizontal Separator */}
            <div className="w-full flex items-center justify-center relative mb-2">
              <div className="w-full h-px bg-white/20"></div>
              <div className="absolute left-1/2 -translate-x-1/2 px-4 text-xs font-medium text-white/50 bg-[#0c0f16]">
                OR
              </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-6 w-full">
              <button className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-foreground hover:bg-[hsl(var(--glass-strong))] transition-all duration-300 border border-[hsl(var(--glass-border))]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </button>
              <button className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-foreground hover:bg-[hsl(var(--glass-strong))] transition-all duration-300 border border-[hsl(var(--glass-border))]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="12" fill="currentColor"/><path d="M15 10.5h-1.5v-1.5h-1.5v1.5H10.5v1.5H12v1.5h1.5v-1.5H15v-1.5z" fill="var(--background)"/></svg>
              </button>
              <button className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-foreground hover:bg-[hsl(var(--glass-strong))] transition-all duration-300 border border-[hsl(var(--glass-border))]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground/70 w-full text-center">
              <span>New Member?</span>
              <Link to="/signup" className="text-foreground hover:underline font-medium transition-colors">
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
