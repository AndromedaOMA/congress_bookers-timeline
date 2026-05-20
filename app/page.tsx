// page.tsx
import { Hero } from "@/components/Hero";
import { Roadmap } from "@/components/Roadmap";
import { Curtain } from "@/components/Curtain";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-congress-navy font-sans transition-colors duration-300 relative">
      {/* Theatre Red Curtain Opening Animation */}
      <Curtain />

      <main className="min-h-screen">
        <Hero />
        
        <section id="roadmap" className="pt-20">
          <Roadmap />
        </section>
      </main>
    </div>
  );
}