import React, { useState, useEffect } from 'react';

export function AnimatedTerminal() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const runAnimation = async () => {
      // Loop the animation infinitely
      while (isMounted) {
        setStep(0);
        setProgress(0);
        await new Promise(r => setTimeout(r, 1000));
        if (!isMounted) break;
        
        // step 1: command typed
        setStep(1);
        await new Promise(r => setTimeout(r, 600));
        if (!isMounted) break;

        // step 2: Info 1
        setStep(2);
        await new Promise(r => setTimeout(r, 500));
        if (!isMounted) break;

        // step 3: Info 2
        setStep(3);
        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) break;

        // step 4: Info 3
        setStep(4);
        await new Promise(r => setTimeout(r, 300));
        if (!isMounted) break;

        // step 5: progress bar begins
        setStep(5);
        for (let i = 0; i <= 100; i += 4) {
          if (!isMounted) break;
          setProgress(i);
          // Randomize delay slightly for realism
          await new Promise(r => setTimeout(r, Math.random() * 50 + 50)); 
        }
        if (!isMounted) break;
        setProgress(100);

        // pause after download
        await new Promise(r => setTimeout(r, 400));
        if (!isMounted) break;

        // step 6: CUDA compilation
        setStep(6);
        await new Promise(r => setTimeout(r, 1200));
        if (!isMounted) break;

        // step 7: Success
        setStep(7);
        
        // Wait 5 seconds before restarting sequence
        await new Promise(r => setTimeout(r, 5000));
      }
    };

    runAnimation();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const renderProgressBar = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.floor((progress / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '▒'.repeat(emptyBlocks);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-gray-700 shadow-2xl mt-8 w-full max-w-full">
       <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-gray-700 w-full">
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/80 shrink-0"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500/80 shrink-0"></div>
             <div className="w-3 h-3 rounded-full bg-green-500/80 shrink-0"></div>
          </div>
          <div className="flex-grow text-center text-xs text-gray-400 font-medium font-mono tracking-wide px-2 overflow-hidden text-ellipsis whitespace-nowrap">Terminal - winllm serve</div>
          <div className="w-[38px]"></div>
       </div>
       <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto w-full min-h-[300px]">
          <div className="min-w-[650px] space-y-3">
             {step >= 1 ? (
               <div className="text-gray-400 animate-fade-in"><span className="text-green-400 font-bold">PS C:\\Dev&gt;</span> winllm serve --model "Qwen2.5-7B" --quantization 4bit --port 8000</div>
             ) : (
               <div className="text-gray-400"><span className="text-green-400 font-bold">PS C:\\Dev&gt;</span><span className="animate-pulse">_</span></div>
             )}
             
             {step >= 2 && <div className="text-cyan-400 mt-2 animate-fade-in">[INFO] <span className="text-gray-300">Initializing WinLLM Engine (v1.0.0)...</span></div>}
             {step >= 3 && <div className="text-cyan-400 animate-fade-in">[INFO] <span className="text-gray-300">Allocating PagedAttention KV Cache... [OK] 4.2GB Reserved</span></div>}
             {step >= 4 && <div className="text-cyan-400 animate-fade-in">[INFO] <span className="text-gray-300">Loading weights for Qwen2.5-7B (4-bit NF4)...</span></div>}
             
             {step >= 5 && (
                <div className="flex items-center gap-3 animate-fade-in">
                   <span className="text-yellow-400 shrink-0">Loading blocks:</span> 
                   <span className="text-emerald-400 tracking-[0.1em] shrink-0">{renderProgressBar()}</span> 
                   <span className="text-gray-400 shrink-0 w-24">{progress}% | {(progress * 0.0454).toFixed(2)}s</span>
                </div>
             )}
             
             {step >= 6 && <div className="text-cyan-400 animate-fade-in">[INFO] <span className="text-gray-300">Warming up CUDA Graphs... [OK]</span></div>}
             {step >= 7 && <div className="text-emerald-400 mt-2 animate-fade-in">[SUCCESS] <span className="text-white font-bold">API Server running at http://0.0.0.0:8000</span></div>}
          </div>
       </div>
    </div>
  );
}
