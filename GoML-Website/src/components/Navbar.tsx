import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchComponent from "./ui/animated-glowing-search-bar";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { LimelightNav } from "./ui/limelight-nav";

const navLinks = [
  { id: "features", label: "Features" },
  { id: "insights", label: "Insights" },
  { id: "about", label: "About" },
  { id: "case-studies", label: "Case Studies" },
  { id: "contact", label: "Contact" },
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
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="bg-black text-white flex items-center space-x-2 text-sm px-5 py-2 font-display font-medium"
              >
                <span>Sign In</span>
              </HoverBorderGradient>
            </Link>
          <Link to="/signup">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="div"
              className="bg-white text-black flex items-center space-x-2 text-sm px-5 py-2 font-display font-medium"
            >
              <span>Sign Up</span>
            </HoverBorderGradient>
          </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
