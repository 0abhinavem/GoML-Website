import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, MessageSquare, Globe } from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/info/features" },
        { label: "How it Works", href: "/info/how-it-works" },
        { label: "Specs & Models", href: "/info/specs" },
        { label: "Releases", href: "/info/releases" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Architecture", href: "/info/architecture" },
        { label: "CLI Reference", href: "/info/cli" },
        { label: "Deep Dive", href: "/info/deep-dive" },
      ],
    },
  ];

  return (
    <footer className="bg-[#050505] relative h-fit overflow-hidden border-t border-[#7A1F1F]/40 z-10 m-8 rounded-3xl pb-16 pt-24 mt-20">
      {/* Background radial gradient specifically for the black theme */}
      <FooterBackgroundGradient />

      <div className="max-w-7xl mx-auto px-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-80">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2 mb-2">
              <span className="text-[#7A1F1F] text-3xl font-extrabold mb-1">
                &hearts;
              </span>
              <span className="text-white text-3xl font-display font-bold tracking-tight">GoLM</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              The fastest Windows-native LLM inference engine. Open source, OpenAI-compatible, and built for consumer GPUs.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col space-y-4">
              <h4 className="text-white text-lg font-semibold mb-2">
                {section.title}
              </h4>
              <ul className="space-y-3 w-full">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 text-sm hover:text-[#7A1F1F] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Community section */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white text-lg font-semibold mb-2">
              Community
            </h4>
            <ul className="space-y-4 w-full">
              <li className="flex items-center space-x-3">
                <Github size={18} className="text-[#7A1F1F]" />
                <a href="https://github.com/adervark/wLLM" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-[#7A1F1F] transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Twitter size={18} className="text-[#7A1F1F]" />
                <a href="#" className="text-gray-400 text-sm hover:text-[#7A1F1F] transition-colors">
                  Twitter (X)
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare size={18} className="text-[#7A1F1F]" />
                <a href="#" className="text-gray-400 text-sm hover:text-[#7A1F1F] transition-colors">
                  Discord Server
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Massive Text hover effect Background Layer */}
      <div className="lg:flex hidden absolute bottom-0 inset-x-0 h-[26rem] pointer-events-none opacity-80 mix-blend-screen z-10 w-full transform translate-y-[25%]">
        <TextHoverEffect text="GoLM" className="pointer-events-auto" />
      </div>
    </footer>
  );
};

export default Footer;
