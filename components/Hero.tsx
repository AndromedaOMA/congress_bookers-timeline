// components/Hero.tsx
export const Hero = () => {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-zinc-50 dark:bg-black/[0.96] antialiased bg-grid-black/[0.02] dark:bg-grid-white/[0.02] relative overflow-hidden transition-colors duration-300">
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
          Build the Future <br /> faster than ever.
        </h1>
        <p className="mt-4 font-normal text-base text-zinc-600 dark:text-neutral-300 max-w-lg text-center mx-auto">
          A premium landing page template built with Aceternity UI and Hero UI components. 
          Scalable, performant, and ready for Vercel deployment.
        </p>
        <div className="flex justify-center mt-10">
            <button className="px-8 py-2 rounded-full bg-blue-600 dark:bg-gradient-to-b dark:from-blue-500 dark:to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                Get Started
            </button>
        </div>
      </div>
    </div>
  );
};