// components/FullCircle.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const nodes = [
  "Home", "Transfer", "Flight", "Arrival", 
  "Hotel", "Shuttle", "Registration", "Sessions", 
  "Breaks", "Dinners", "Meetings", "Rest", 
  "Check-out", "Return Flt", "Home Tfr", "Full Circle"
];

export function FullCircle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Gold accent color matching the image
  const goldColor = "#C8A97E";
  // Increased from 150 to 180 to spread the nodes out more
  const radius = 180; 

  return (
    <section className="relative w-full bg-white dark:bg-congress-navy py-16 overflow-hidden border-t border-zinc-100 dark:border-zinc-800/50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
        
        {/* Top Typography */}
        <div className="text-center mb-16 space-y-5">
          <h2 className="text-3xl md:text-5xl font-serif italic text-zinc-900 dark:text-white tracking-wide">
            The Orchestra has Left the Stage
          </h2>
          
          <div className="w-24 h-px bg-[#C8A97E] mx-auto opacity-60" />
          
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed tracking-widest uppercase">
            Every transfer arranged &middot; Every room confirmed &middot; Every detail managed.
          </p>
        </div>

        {/* Graph Container */}
        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center my-4">
          
          {/* SVG for connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-250 -250 500 500">
            {nodes.map((_, i) => {
              const angle = (i * 360) / nodes.length - 90;
              const radian = (angle * Math.PI) / 180;
              const x2 = Math.cos(radian) * radius;
              const y2 = Math.sin(radian) * radius;
              return (
                <line 
                  key={`line-${i}`}
                  x1="0" 
                  y1="0" 
                  x2={x2} 
                  y2={y2} 
                  stroke={goldColor} 
                  strokeWidth="1"
                  strokeOpacity="0.25"
                />
              );
            })}
          </svg>

          {/* Center Circle with Image */}
          <div className="absolute w-24 h-24 rounded-full bg-white dark:bg-[#001524] border-2 border-[#C8A97E]/60 flex items-center justify-center z-10 shadow-lg overflow-hidden p-3">
            <div className="relative w-full h-full">
              <Image 
                src="/CB_icon.PNG" 
                alt="CongressBookers Icon" 
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Orbiting Nodes */}
          {nodes.map((node, i) => {
            const angle = (i * 360) / nodes.length - 90;
            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            return (
              <div 
                key={node} 
                className="absolute flex items-center justify-center z-20 transition-transform duration-300 hover:scale-110 cursor-default"
                style={{ 
                  transform: `translate(${x}px, ${y}px)` 
                }}
              >
                <div className="bg-white dark:bg-[#001524] border border-[#C8A97E]/40 rounded-full px-3 py-1.5 whitespace-nowrap shadow-sm">
                  <span className="text-zinc-700 dark:text-[#C8A97E] text-[10px] font-semibold tracking-wider uppercase">
                    {node}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}