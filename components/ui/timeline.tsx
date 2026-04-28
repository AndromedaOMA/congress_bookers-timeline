"use client";
import { useScroll, useTransform, motion } from "framer-motion";
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

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white dark:bg-congress-navy font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 text-center">
        <h2 className="text-3xl md:text-5xl mb-4 text-zinc-900 dark:text-white font-bold tracking-tight">
          The Full Circle Journey
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">Elevating the delegate experience through invisible clinical-grade logistics.</p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-9 gap-4 w-full items-start mb-20 md:mb-32">
            
            {/* LEFT SIDE: Client Experience */}
            <div className="hidden md:flex col-span-4 justify-end text-right pr-12">
               <div className="max-w-md">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{item.title}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-end gap-2 text-blue-600 dark:text-blue-400">
                      <span className="font-bold text-xs uppercase tracking-widest">{item.category}</span>
                      {item.icon}
                    </div>
                    <p className="text-zinc-600 dark:text-neutral-400 leading-relaxed">{item.clientText}</p>
                  </div>
               </div>
            </div>

            {/* CENTER: Line & Dot */}
            <div className="col-span-1 flex justify-center relative h-full pt-2">
              <div className="h-10 w-10 rounded-full bg-white dark:bg-congress-navy border border-blue-100 dark:border-blue-900 flex items-center justify-center z-40 shadow-sm">                <div className="h-3 w-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
              </div>
            </div>

            {/* RIGHT SIDE: Backstage Operations */}
            <div className="col-span-4 flex justify-start text-left pl-12 pt-10 md:pt-0">
               <div className="max-w-md w-full">
                  <div className={`p-6 rounded-2xl border transition-all duration-500 ${
                    item.isFinal 
                    ? "bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-500/20" 
                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-neutral-800"
                  }`}>
                    <p className={`text-[10px] uppercase tracking-[0.2em] mb-3 font-bold ${item.isFinal ? "text-blue-100" : "text-blue-500"}`}>
                      {item.backstageTitle}
                    </p>
                    <ul className="space-y-2">
                      {item.backstageItems.map((bullet, idx) => (
                        <li key={`${item.id}-bullet-${idx}`} className={`text-sm italic flex items-start gap-2 ${item.isFinal ? "text-blue-50" : "text-zinc-500"}`}>
                          • {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>
          </div>
        ))}

        <div style={{ height: height + "px" }} className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 overflow-hidden w-[2px] bg-zinc-100 dark:bg-neutral-900">
          <motion.div style={{ height: heightTransform, opacity: opacityTransform }} className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-blue-600 via-blue-400 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};