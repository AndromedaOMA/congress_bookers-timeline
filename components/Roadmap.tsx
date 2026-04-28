// components/Roadmap.tsx
import { Timeline } from "./ui/timeline";
import { 
  Briefcase, 
  PlaneLanding, 
  Mic, 
  UtensilsCrossed, 
  RefreshCcw,
  ShieldCheck 
} from "lucide-react";

export function Roadmap() {
  const data = [
    {
      id: "phase-01",
      title: "Phase 01: The Score is Written",
      category: "Pre-Departure",
      icon: <Briefcase size={18} />,
      clientText: "Dr. Moreau closes her briefcase. The congress is tomorrow. She has one thought: her presentation. Everything else, she trusts, is taken care of.",
      backstageTitle: "Logistics Pre-Filed",
      backstageItems: [
        "Transfer confirmed and driver briefed.",
        "Flight seat reserved with zero connections.",
        "Hotel preferences captured months ago."
      ],
      backstageIcon: <ShieldCheck size={40} />
    },
    {
      id: "phase-02",
      title: "Phase 02: Wheels Down. Welcome.",
      category: "Seamless Arrival",
      icon: <PlaneLanding size={18} />,
      clientText: "The seatbelt sign goes off. She knows exactly who is waiting. She doesn't search for a board. She simply walks and is found.",
      backstageTitle: "Ground Team Gate-Side",
      backstageItems: [
        "Flight tracked in real-time.",
        "Host dispatched 40 minutes early.",
        "Badge, directions, and dinner reservations in hand."
      ]
    },
    {
      id: "phase-03",
      title: "Phase 03: Where Medicine Moves Forward",
      category: "The Congress",
      icon: <Mic size={18} />,
      clientText: "The hall opens. Her badge is pre-printed. Keynotes. Workshops. Debates. Every logistical thought has been lifted so she can focus on ideas.",
      backstageTitle: "Invisible On-Call Support",
      backstageItems: [
        "Registration submitted three weeks prior.",
        "Room assignments confirmed and AV contacts briefed.",
        "Coordinators are in the hall: invisible, available, watching."
      ]
    },
    {
      id: "phase-04",
      title: "Phase 04: Evenings Worth Remembering",
      category: "Beyond Sessions",
      icon: <UtensilsCrossed size={18} />,
      clientText: "A rooftop restaurant. The team arrives together, relaxed. She didn't book the table or the satellite symposium room. She didn't need to.",
      backstageTitle: "Ancillary Events Managed",
      backstageItems: [
        "Restaurant reserved two months prior with pre-selected menus.",
        "Ancillary meeting AV, catering, and minutes fully serviced.",
        "Return evening transfers coordinated for all."
      ]
    },
    {
      id: "phase-05",
      title: "Phase 05: Closing the Circle",
      category: "Mission Complete",
      icon: <RefreshCcw size={18} />,
      clientText: "Luggage collected before breakfast. Four days. One seamless performance. The science was exceptional, and she flies home with memories.",
      backstageTitle: "Return Operations Confirmed",
      backstageItems: [
        "Checkout coordinated and luggage tagged.",
        "Return itinerary filed alongside the outbound, months ago.",
        "The home transfer awaits. Every open loop closed."
      ],
      isFinal: true
    }
  ];

return (
    <section id="process-roadmap">
      <Timeline data={data} />
    </section>
  );
}