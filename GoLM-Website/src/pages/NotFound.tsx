import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7A1F1F]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="text-center relative z-10 px-6">
        <div className="text-[120px] md:text-[180px] font-display font-bold text-white/5 leading-none select-none">
          404
        </div>
        <div className="-mt-16 md:-mt-24 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display">
            Page Not Found
          </h1>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium glass-effect text-foreground hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              View Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
