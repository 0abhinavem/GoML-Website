import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LimelightNav } from "./ui/limelight-nav";
import { Menu, X } from "lucide-react";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 300);
    } else {
      scrollToSection(sectionId);
    }
  };

  const navLinks = [
    { id: "features", label: "Features", onClick: () => handleSectionClick("features") },
    { id: "demo", label: "Demo", onClick: () => handleSectionClick("demo") },
    { id: "specs", label: "Specs & Models", onClick: () => handleSectionClick("specs") },
    { id: "docs", label: "Docs", onClick: () => { setMobileOpen(false); navigate("/docs"); } },
    { id: "github", label: "GitHub", onClick: () => { setMobileOpen(false); window.open("https://github.com/adervark/wLLM", "_blank"); } },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display font-medium tracking-tight text-foreground text-xl cursor-pointer">
          <Link to="/">wLLM</Link>
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <LimelightNav items={navLinks} className="h-full bg-transparent border-none" iconContainerClassName="px-6 py-4" />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
        >
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={link.onClick}
                className="block w-full text-left px-4 py-3 text-sm font-display text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
