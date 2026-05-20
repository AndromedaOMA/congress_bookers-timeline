"use client";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  clientText: string;
  backstageTitle: string;
  backstageItems: string[];
  backstageIcon?: React.ReactNode;
  isFinal?: boolean;
}

// 1. Add onComplete to the props
export const Timeline = ({ data, onComplete }: { data: TimelineEntry[], onComplete?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (!ref.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const handleNextDay = () => {
    if (visibleCount < data.length) {
      const nextCount = visibleCount + 1;
      setVisibleCount(nextCount);
      
      // 2. Trigger the callback when the final day is revealed
      if (nextCount === data.length) {
        onComplete?.();
      }
      
      setTimeout(() => {
        window.scrollBy({
          top: 350,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-congress-navy font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl mb-4 text-zinc-900 dark:text-white font-bold tracking-tight">
          The Full Circle Journey
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base">
          Elevating the delegate experience through invisible clinical-grade logistics.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        <AnimatePresence initial={false}>
          {data.slice(0, visibleCount).map((item) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:grid md:grid-cols-9 gap-4 w-full items-start mb-16 md:mb-32 px-4 md:px-0 relative z-10"
            >
              {/* MOBILE ONLY: Title & Category */}
              <div className="md:hidden pl-12 mb-4">
                 <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{item.title}</h3>
                 <div className="flex items-center gap-2 text-oxygen-blue mt-1">
                    <span className="font-bold text-[10px] uppercase tracking-widest">{item.category}</span>
                    {item.icon}
                 </div>
              </div>

              {/* LEFT SIDE: Client Experience (Desktop Only) */}
              <div className="hidden md:flex col-span-4 justify-end text-right pr-12">
                 <div className="max-w-md">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{item.title}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-end gap-2 text-oxygen-blue">
                        <span className="font-bold text-xs uppercase tracking-widest">{item.category}</span>
                        {item.icon}
                      </div>
                      <p className="text-zinc-600 dark:text-neutral-400 leading-relaxed">{item.clientText}</p>
                    </div>
                 </div>
              </div>

              {/* CENTER: Line & Dot */}
              <div className="absolute left-4 md:static md:col-span-1 flex justify-center h-full">
                <div className="h-10 w-10 rounded-full bg-white dark:bg-congress-navy border border-oxygen-blue/30 dark:border-oxygen-blue/50 flex items-center justify-center z-40 shadow-sm mt-1">
                  <div className="h-3 w-3 rounded-full bg-oxygen-blue shadow-[0_0_10px_rgba(0,163,224,0.8)]" />
                </div>
              </div>

              {/* RIGHT SIDE: Combined Content for Mobile / Backstage for Desktop */}
              <div className="pl-12 md:pl-12 md:col-span-4 flex flex-col gap-6 justify-start text-left">
                 <p className="md:hidden text-zinc-600 dark:text-neutral-400 text-sm italic">
                   &quot;{item.clientText}&quot;
                 </p>
                 
                 <div className="max-w-md w-full">
                    <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-500 ${
                      item.isFinal 
                      ? "bg-oxygen-blue text-white border-oxygen-blue shadow-xl shadow-oxygen-blue/20" 
                      : "bg-zinc-50 dark:bg-[#001524] border-zinc-200 dark:border-zinc-800"
                    }`}>
                      <p className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-3 font-bold ${item.isFinal ? "text-blue-50" : "text-oxygen-blue"}`}>
                        {item.backstageTitle}
                      </p>
                      <ul className="space-y-2">
                        {item.backstageItems.map((bullet, idx) => (
                          <li key={`${item.id}-bullet-${idx}`} className={`text-xs md:text-sm flex items-start gap-2 ${item.isFinal ? "text-blue-50" : "text-zinc-500 dark:text-zinc-400"}`}>
                            • {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Interactive "Next Day" Button */}
        <AnimatePresence>
          {visibleCount < data.length && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-center w-full mt-8 md:mt-16 relative z-30"
            >
              <button
                onClick={handleNextDay}
                className="group relative px-8 py-4 bg-transparent border-2 border-oxygen-blue text-congress-navy dark:text-white font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(0,163,224,0.15)] hover:shadow-[0_0_30px_rgba(0,163,224,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-3 mx-auto cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2 tracking-wider uppercase text-xs md:text-sm">
                  Unveil {data[visibleCount].category}
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-oxygen-blue/10 dark:bg-oxygen-blue/20 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ height: height + "px" }} className="absolute left-[35px] md:left-1/2 md:-translate-x-1/2 top-0 overflow-hidden w-[2px] bg-zinc-100 dark:bg-zinc-800/50">
          <motion.div style={{ height: heightTransform, opacity: opacityTransform }} className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-oxygen-blue via-blue-400 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};