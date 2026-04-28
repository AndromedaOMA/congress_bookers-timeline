// components/Hero.tsx
"use client"; // Ensure this is at the top for the scroll function

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const scrollToRoadmap = () => {
    // Looks for the element with the ID we will add to the Roadmap/Timeline
    const element = document.getElementById("process-roadmap");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative transition-colors duration-300">
      <div className="h-[45rem] w-full flex items-center justify-center bg-white dark:bg-congress-navy antialiased relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-congress-navy/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />
        
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full text-center">
          {/* Logo and Quote ... same as before */}
          <div className="relative mb-12 flex justify-center w-full">
            <Image
              src="/CongressBookers_template_word-02.png"
              alt="CongressBookers Logo"
              width={500}
              height={160}
              priority
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>

          <p className="text-oxygen-blue font-medium tracking-[0.3em] uppercase text-xs mb-4">
            "The orchestra plays — the dancers simply dance."
          </p>

          <h1 className="text-4xl md:text-7xl font-bold text-congress-navy dark:text-white mb-6 tracking-tight">
            Seamless Logistics for <br />
            <span className="text-oxygen-blue">Medical Pioneers</span>
          </h1>

          <p className="text-zinc-600 dark:text-blue-100/80 max-w-2xl mx-auto mb-10 text-lg">
            We handle the complexities of congress travel, so you can focus on the science that changes lives.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Primary Button: External Link */}
            <a 
              href="https://congressbookers.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-oxygen-blue hover:brightness-110 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-oxygen-blue/20 min-w-[220px] flex items-center justify-center"
            >
              Book Your Congress
            </a>

            {/* Secondary Button: Smooth Scroll */}
            <button 
              onClick={scrollToRoadmap}
              className="border-2 border-congress-navy text-congress-navy dark:border-oxygen-blue dark:text-oxygen-blue px-10 py-4 rounded-full font-bold hover:bg-congress-navy hover:text-white dark:hover:bg-white/10 transition-all min-w-[220px]"
            >
              Our Full Circle Process
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}