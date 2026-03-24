import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchComponent from "./ui/animated-glowing-search-bar";
import { GradientButton } from "./ui/gradient-button";
import { LimelightNav } from "./ui/limelight-nav";

const navLinks = [
  { id: "features", label: "Features" },
  { id: "demo", label: "Demo" },
  { id: "specs", label: "Specs & Models" },
  { id: "docs", label: "Docs" },
  { id: "github", label: "GitHub" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display font-medium tracking-tight text-foreground text-xl cursor-pointer">
          <Link to="/">GoLM</Link>
        </span>

        <div className="hidden md:flex items-center">
          <LimelightNav items={navLinks} className="h-full bg-transparent border-none" iconContainerClassName="px-6 py-4" />
        </div>

        <div className="flex items-center gap-6 md:gap-12 lg:gap-16">
          <div className="hidden md:block scale-90 origin-right">
            <SearchComponent />
          </div>
          <div className="flex items-center gap-3">
            <Link to="/signin">
              <GradientButton className="rounded-full min-w-0 px-5 py-2 text-sm font-display font-medium">
                Sign In
              </GradientButton>
            </Link>
            <Link to="/signup">
              <GradientButton variant="variant" className="rounded-full min-w-0 px-5 py-2 text-sm font-display font-medium">
                Sign Up
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
