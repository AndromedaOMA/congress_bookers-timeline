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
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl mb-4 text-zinc-900 dark:text-white font-bold tracking-tight">
          The Full Circle Journey
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base">
          Elevating the delegate experience through invisible clinical-grade logistics.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col md:grid md:grid-cols-9 gap-4 w-full items-start mb-16 md:mb-32 px-4 md:px-0">
            
            {/* MOBILE ONLY: Title & Category */}
            <div className="md:hidden pl-12 mb-4">
               <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{item.title}</h3>
               <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mt-1">
                  <span className="font-bold text-[10px] uppercase tracking-widest">{item.category}</span>
                  {item.icon}
               </div>
            </div>

            {/* LEFT SIDE: Client Experience (Desktop Only) */}
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
            <div className="absolute left-4 md:static md:col-span-1 flex justify-center h-full">
              <div className="h-10 w-10 rounded-full bg-white dark:bg-congress-navy border border-blue-100 dark:border-blue-900 flex items-center justify-center z-40 shadow-sm">
                <div className="h-3 w-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
              </div>
            </div>

            {/* RIGHT SIDE: Combined Content for Mobile / Backstage for Desktop */}
            <div className="pl-12 md:pl-12 md:col-span-4 flex flex-col gap-6 justify-start text-left">
               {/* Mobile-only client text */}
               <p className="md:hidden text-zinc-600 dark:text-neutral-400 text-sm italic">
                 &quot;{item.clientText}&quot;
               </p>
               
               <div className="max-w-md w-full">
                  <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-500 ${
                    item.isFinal 
                    ? "bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-500/20" 
                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-neutral-800"
                  }`}>
                    <p className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-3 font-bold ${item.isFinal ? "text-blue-100" : "text-blue-500"}`}>
                      {item.backstageTitle}
                    </p>
                    <ul className="space-y-2">
                      {item.backstageItems.map((bullet, idx) => (
                        <li key={`${item.id}-bullet-${idx}`} className={`text-xs md:text-sm italic flex items-start gap-2 ${item.isFinal ? "text-blue-50" : "text-zinc-500"}`}>
                          • {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>
          </div>
        ))}

        {/* Progress Line - Adjust position for mobile */}
        <div style={{ height: height + "px" }} className="absolute left-[35px] md:left-1/2 md:-translate-x-1/2 top-0 overflow-hidden w-[2px] bg-zinc-100 dark:bg-neutral-900">
          <motion.div style={{ height: heightTransform, opacity: opacityTransform }} className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-blue-600 via-blue-400 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};