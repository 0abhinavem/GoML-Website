import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import VideoPlayer from "@/components/VideoPlayer";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import WhyWinLLM from "@/components/WhyWinLLM";
import InteractiveDemo from "@/components/InteractiveDemo";
import QuickStart from "@/components/QuickStart";
import StatsSection from "@/components/StatsSection";
import EngineSpecs from "@/components/EngineSpecs";
import Contributors from "@/components/Contributors";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="relative bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full z-0">
        <VideoPlayer />
        <HeroContent />
      </section>

      {/* Main Content Sections */}
      <section className="relative z-10 flex flex-col bg-background">
        <LogoMarquee />
        <StatsSection />
        <Features />
        <WhyWinLLM />
        <InteractiveDemo />
        <QuickStart />
        <EngineSpecs />
        <Contributors />
        <Footer />
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Index;
