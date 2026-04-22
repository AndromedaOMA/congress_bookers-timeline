// components/Roadmap.tsx
import { Timeline } from "./ui/timeline";
import Image from "next/image";

export function Roadmap() {
  const data = [
    {
      title: "January 2024",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-400 text-sm md:text-base">
            We started with a vision to revolutionize the web. The first lines of code were pushed to a private repo.
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" 
            alt="Coding" 
            width={600} 
            height={400} 
            className="rounded-xl border border-neutral-800"
          />
        </div>
      ),
    },
    {
      title: "March 2024",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-400 text-sm md:text-base">
            Secured seed funding and expanded the team to 10 amazing engineers and designers.
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" 
            alt="Team Meeting" 
            width={600} 
            height={400} 
            className="rounded-xl border border-neutral-800"
          />
        </div>
      ),
    },
    {
      title: "June 2024",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-400 text-sm md:text-base">
            Launched our Beta to 5,000 waitlisted users. The feedback was overwhelming.
          </p>
          <div className="grid grid-cols-2 gap-2">
             <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300" alt="Stats" width={300} height={200} className="rounded-lg" />
             <Image src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=300" alt="Charts" width={300} height={200} className="rounded-lg" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}