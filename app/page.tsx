import { Hero } from "@/components/Hero";
import { Roadmap } from "@/components/Roadmap";

export default function Home() {
  return (
    // Update bg-zinc-50 to also have dark:bg-black
    <div className="flex flex-col flex-1 bg-white dark:bg-black font-sans transition-colors duration-300">
      <main className="min-h-screen">
        <Hero />
        <section id="roadmap" className="py-20">
          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-white mb-10">
            Our Journey
          </h2>
          <Roadmap />
        </section>
      </main>
    </div>
  );
}