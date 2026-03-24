import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  Plus, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  ChevronDown,
  Sparkles
} from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { motion } from "framer-motion";

const AiChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSendMessage = (message: string, files?: File[]) => {
    console.log("Message:", message);
    console.log("Files:", files);
    // Future integration with AI backend
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans relative bg-[#f1e6ee]">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top left blue blur */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#aebbdb] blur-[120px] rounded-full mix-blend-multiply opacity-80" />
        {/* Top right purple blur */}
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-[#b4b4d6] blur-[120px] rounded-full mix-blend-multiply opacity-80" />
        {/* Bottom intense glow */}
        <div className="absolute -bottom-[35%] left-1/2 -translate-x-1/2 w-[90%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ff5e00] via-[#ff8800] to-transparent blur-[100px] opacity-80" />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: 300 }}
        animate={{ width: isSidebarOpen ? 300 : 0 }}
        className="h-full bg-white/20 backdrop-blur-xl flex flex-col border-r border-white/30 flex-shrink-0 z-10"
      >
        <div className="p-4 flex items-center h-16 w-full px-4 overflow-hidden">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-black/5 rounded-full transition-colors shrink-0"
          >
            <Menu className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        <div className="px-3 pb-4 overflow-hidden">
          <button className="flex items-center gap-2 w-full px-4 py-3 bg-white/50 hover:bg-white/70 text-sm font-medium rounded-full transition-colors whitespace-nowrap shadow-sm border border-white/40 text-gray-900">
            <Plus className="w-4 h-4" />
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-black/10 px-3">
          <div className="py-2">
            <h3 className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 mt-4 whitespace-nowrap">Recent</h3>
            <ul className="space-y-1">
              {[
                "Deploying an ML Model",
                "Fixing Pipeline Errors",
                "Optimizing React Performance",
                "Go API Architecture"
              ].map((title, i) => (
                <li key={i}>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-800 hover:bg-white/30 rounded-lg transition-colors text-left truncate">
                    <MessageSquare className="w-4 h-4 shrink-0 text-gray-600" />
                    <span className="truncate">{title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-3 border-t border-white/30 overflow-hidden">
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-800 hover:bg-white/30 rounded-lg transition-colors whitespace-nowrap">
            <Settings className="w-4 h-4 shrink-0" />
            Settings
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-800 hover:bg-white/30 rounded-lg transition-colors whitespace-nowrap">
            <HelpCircle className="w-4 h-4 shrink-0" />
            Help & FAQ
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full z-10">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 absolute top-0 w-full z-20">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={toggleSidebar}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                title="Expand sidebar"
              >
                <Menu className="w-5 h-5 text-gray-800" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-xl tracking-tight text-gray-900 drop-shadow-sm">GoLM</span>
              <ChevronDown className="w-4 h-4 text-gray-700 cursor-pointer" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-2 py-1 text-xs font-bold bg-white/40 border border-white/50 rounded text-gray-900 shadow-sm backdrop-blur-md">
              PRO
            </div>
            <Link to="/" className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-sm font-bold shadow-lg ring-2 ring-white/50 hover:ring-white/80 transition-all text-white">
              A
            </Link>
          </div>
        </header>

        {/* Chat Area & Greeting */}
        <div className="flex-1 overflow-y-auto pt-24 pb-32 flex flex-col">
          <div className="flex-1 max-w-4xl mx-auto w-full px-6 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-semibold gradient-text bg-gradient-to-r from-orange-600 via-rose-500 to-purple-600 inline-block text-transparent bg-clip-text drop-shadow-sm">
                <Sparkles className="w-8 h-8 text-orange-500 inline-block mr-3 mb-1" />
                Hi Abhinave
              </h2>
              <h1 className="text-5xl md:text-6xl font-display font-medium text-gray-800 tracking-tight drop-shadow-sm">
                How can GoLM help today?
              </h1>
            </motion.div>
            
            {/* The Prompt Box centered */}
            <div className="w-full relative z-30">
              <PromptInputBox 
                onSend={handleSendMessage} 
                className="max-w-4xl shadow-2xl shadow-orange-900/10 border-white/10 mx-auto" 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiChat;
