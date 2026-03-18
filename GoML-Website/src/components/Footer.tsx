import { Link } from "react-router-dom";
import { Github, Twitter, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black/80 backdrop-blur-xl border-t border-white/10 pt-20 pb-10 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="font-display font-bold text-2xl text-white tracking-tight mb-4 inline-block">
              GoLM
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              The fastest Windows-native LLM inference engine. Open source, OpenAI-compatible, and built for consumer GPUs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a></li>
              <li><a href="#demo" className="text-sm text-white/60 hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Releases</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#demo" className="text-sm text-white/60 hover:text-white transition-colors">CLI Reference</a></li>
              <li><a href="#demo" className="text-sm text-white/60 hover:text-white transition-colors">Deep Dive</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} GoLM Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
