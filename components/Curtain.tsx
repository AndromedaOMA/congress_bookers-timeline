// components/Curtain.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export function Curtain() {
  const [stage, setStage] = useState<"title" | "fade" | "complete">("title");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Safely update mounted state outside the synchronous effect body
    const raf = requestAnimationFrame(() => {
      setMounted(true);
    });

    // Optional: Only show the curtain once per session so it doesn't annoy returning users
    const hasSeenCurtain = sessionStorage.getItem("curtainSeen");
    if (hasSeenCurtain) {
      setStage("complete");
      return () => cancelAnimationFrame(raf);
    }

    // Hold the title on screen, then start the split animation
    const titleTimer = setTimeout(() => {
      setStage("fade");
    }, 1700);

    // Completely unmount after the panels slide away
    const completeTimer = setTimeout(() => {
      setStage("complete");
      sessionStorage.setItem("curtainSeen", "true");
    }, 3000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(titleTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  // Prevent SSR hydration mismatch and satisfy TypeScript stage narrowing
  if (!mounted || stage === "complete") return null;

  // Determine colors based on the OPPOSITE of the current theme
  const isDarkTheme = theme === "dark";
  const curtainBgColor = isDarkTheme ? "bg-white" : "bg-congress-navy";
  const textColor = isDarkTheme ? "text-congress-navy" : "text-white";

  return (
    <AnimatePresence>
      {/* Redundant stage !== "complete" check removed as early return handles it */}
      <div className="fixed inset-0 z-[200] pointer-events-none flex">
        
        {/* Left Curtain Panel */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: stage === "fade" ? "-100%" : 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className={`w-1/2 h-full ${curtainBgColor}`}
        />

        {/* Right Curtain Panel */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: stage === "fade" ? "100%" : 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className={`w-1/2 h-full ${curtainBgColor}`}
        />

        {/* Title Container - Positioned absolutely over the split panels */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {stage === "title" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center px-4"
              >
                <h1 className={`text-4xl md:text-7xl font-bold tracking-tight ${textColor}`}>
                  Congress<span className="text-oxygen-blue">Bookers</span>
                </h1>
                <p className="text-oxygen-blue/80 text-xs md:text-sm tracking-[0.2em] uppercase mt-3 font-medium">
                  Logistics for Medical Pioneers
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </AnimatePresence>
  );
}