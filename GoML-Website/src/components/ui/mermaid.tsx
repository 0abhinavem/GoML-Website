import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

interface MermaidProps {
  chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chart) {
      const renderChart = async () => {
        try {
          const id = `mermaidSvg-${Math.round(Math.random() * 10000000)}`;
          mermaid.mermaidAPI.reset();
          const { svg } = await mermaid.render(id, chart);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid parsing error:", error);
          if (ref.current) {
            ref.current.innerHTML = `<div class="text-red-500 font-mono text-sm border border-red-500/50 p-4 rounded bg-red-500/10">Failed to render diagram.</div>`;
          }
        }
      };
      renderChart();
    }
  }, [chart]);

  return <div className="mermaid-container flex justify-center w-full" ref={ref} />;
};
