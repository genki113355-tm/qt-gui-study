import React, { useState, useRef, useEffect } from 'react';
import { GLOSSARY, GlossaryTerm } from '../../data/glossary';
import { HelpCircle } from 'lucide-react';

interface GlossaryTooltipProps {
  termKey: string;
  displayText?: string;
  children?: React.ReactNode;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({
  termKey,
  displayText,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const termData: GlossaryTerm | undefined = GLOSSARY[termKey];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!termData) {
    return <span>{children || displayText || termKey}</span>;
  }

  const categoryColor =
    termData.category === 'qt'
      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
      : termData.category === 'cpp'
      ? 'bg-amber-950 text-amber-300 border-amber-500/40'
      : termData.category === 'gui'
      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
      : 'bg-purple-950 text-purple-300 border-purple-500/40';

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="cursor-help font-medium border-b border-dotted border-cyan-400/80 hover:text-cyan-300 transition-colors inline-flex items-center gap-0.5"
        role="button"
        tabIndex={0}
        aria-label={`用語解説: ${termData.term}`}
      >
        <span>{children || displayText || termKey}</span>
        <HelpCircle className="w-3 h-3 text-cyan-400/70 inline-block shrink-0" />
      </span>

      {isOpen && (
        <span
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 rounded-2xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl backdrop-blur-md text-left transition-all duration-200 block text-slate-200 animate-in fade-in zoom-in-95 pointer-events-auto"
          role="tooltip"
        >
          <span className="flex items-center justify-between gap-2 mb-1.5 border-b border-slate-800 pb-1.5 block">
            <span className="font-bold text-xs sm:text-sm text-white font-mono block">
              {termData.term}
            </span>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 ${categoryColor}`}
            >
              {termData.category}
            </span>
          </span>

          {termData.reading && (
            <span className="text-[10px] text-cyan-400/90 font-mono mb-1 block">
              読み: {termData.reading}
            </span>
          )}

          <span className="text-xs font-semibold text-slate-200 leading-snug mb-1 block">
            {termData.summary}
          </span>

          <span className="text-[11px] text-slate-400 leading-relaxed block">
            {termData.description}
          </span>

          {/* ツールチップの三角矢印 */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-cyan-500/50 block" />
        </span>
      )}
    </span>
  );
};
