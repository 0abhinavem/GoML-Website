import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import VideoPlayer from "@/components/VideoPlayer";
import LogoMarquee from "@/components/LogoMarquee";
import Features from "@/components/Features";
import InteractiveDemo from "@/components/InteractiveDemo";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

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
        <Features />
        <InteractiveDemo />
        <Pricing />
        <Footer />
      </section>
    </div>
  );
};

export default Index;
