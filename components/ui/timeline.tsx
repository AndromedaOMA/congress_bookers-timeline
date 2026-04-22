"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white dark:bg-black font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 text-center">
        <h2 className="text-2xl md:text-5xl mb-4 text-zinc-900 dark:text-white font-bold">
          Our Evolution
        </h2>
        <p className="text-zinc-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
          From a simple idea to a global platform. Here is how we grew.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col md:grid md:grid-cols-9 md:gap-4 w-full items-center mb-20 md:mb-40">
            
            {/* Left Side Content (Visible on even indexes on Desktop) */}
            <div className={`hidden md:flex col-span-4 justify-end text-right ${index % 2 !== 0 ? "opacity-0 pointer-events-none" : ""}`}>
               <div className="max-w-md">
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">{item.title}</h3>
                  {item.content}
               </div>
            </div>

            {/* Center Line & Dot */}
            <div className="col-span-1 flex justify-center relative h-full">
              <div className="h-10 w-10 rounded-full bg-white dark:bg-black border border-neutral-800 flex items-center justify-center z-40">
                <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              </div>
            </div>

            {/* Right Side Content (Visible on odd indexes on Desktop) */}
            <div className={`col-span-4 flex justify-start text-left pl-10 md:pl-0 ${index % 2 === 0 ? "md:opacity-0 md:pointer-events-none" : ""}`}>
               <div className="max-w-md">
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">{item.title}</h3>
                  {item.content}
               </div>
            </div>

            {/* Mobile Title (Visible only on small screens) */}
            <div className="md:hidden flex flex-col items-center px-6 mt-4">
               {item.content}
            </div>
          </div>
        ))}

        {/* The Animated Center Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 overflow-hidden w-[2px] bg-zinc-200 dark:bg-neutral-800"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};