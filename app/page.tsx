// page.tsx
import { Hero } from "@/components/Hero";
import { Roadmap } from "@/components/Roadmap";
import { FullCircle } from "@/components/FullCircle";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-congress-navy font-sans transition-colors duration-300">
      <main className="min-h-screen">
        <Hero />
        
        <section id="roadmap" className="py-20">
          <Roadmap />
        </section>

        {/* The new Full Circle ending section */}
        <FullCircle />
      </main>
    </div>
  );
}