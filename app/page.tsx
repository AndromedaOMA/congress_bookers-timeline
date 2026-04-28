// page.tsx (Update the main div className)
import { Hero } from "@/components/Hero";
import { Roadmap } from "@/components/Roadmap";

export default function Home() {
  return (
    // Changed dark:bg-black to dark:bg-congress-navy
    <div className="flex flex-col flex-1 bg-white dark:bg-congress-navy font-sans transition-colors duration-300">
      <main className="min-h-screen">
        <Hero />
        <section id="roadmap" className="py-20">
          <Roadmap />
        </section>
      </main>
    </div>
  );
}