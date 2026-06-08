import { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Truck, MapPin } from 'lucide-react';

export default function SocialProofTicker() {
  const [events, setEvents] = useState([
    { text: "Smart Fridge stocked with Celsius Live Fit", location: "Walnut Creek, CA", time: "2 mins ago" },
    { text: "Lafayette Luxury Suites registered for 90-Day free trial", location: "Concord, CA", time: "11 mins ago" },
    { text: "Resident logged 'Grab & Go' purchase (Fairlife Chocolate)", location: "Danville, CA", time: "15 mins ago" },
    { text: "East Bay service squad completed restock route #3", location: "Contra Costa County", time: "28 mins ago" },
    { text: "Guest grabbed Liquid Death Tallboy", location: "Lafayette, CA", time: "34 mins ago" },
    { text: "Smart cabin telemetry sensor check passed: 100% online", location: "San Ramon, CA", time: "42 mins ago" }
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % events.length);
      
      // Randomly inject live East Bay simulated actions
      if (Math.random() > 0.6) {
        const eastBayCities = ['Walnut Creek', 'Concord', 'Pleasant Hill', 'Martinez', 'Danville', 'San Ramon', 'Lafayette', 'Orinda'];
        const items = ['Celsius Live Fit', 'Core Power Elite Chocolate', 'Liquid Death Tallboy', 'Premier Protein Shake', 'Chomps Beef Stick', 'IQBAR Berry'];
        const actions = [
          `Guest/Resident checked out ${items[Math.floor(Math.random() * items.length)]}`,
          "Telemetry inventory alert dispatched for automatic stocking",
          "Weekly cabinet sanitation check completed",
          "Founder Bailey Vinson scheduled setup review",
          "Contactless card linked securely at tap reader terminal"
        ];
        
        const randCity = eastBayCities[Math.floor(Math.random() * eastBayCities.length)];
        const randAction = actions[Math.floor(Math.random() * actions.length)];
        
        const newEvent = {
          text: randAction,
          location: `${randCity}, CA`,
          time: "Just now"
        };

        setEvents((prev) => [newEvent, ...prev.slice(0, 5)]);
        setCurrentIdx(0);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [events]);

  const activeEvent = events[currentIdx];

  return (
    <div className="bg-[#121824] border-b border-white/5 py-2.5 overflow-hidden relative z-30" id="live-fomo-ticker">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Dynamic event item */}
        <div className="flex items-center space-x-2 text-xs font-mono truncate">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-mint"></span>
          </span>
          <span className="text-brand-gold font-bold uppercase tracking-wider text-[10px]">OPERATIONAL PULSE:</span>
          <span className="text-gray-300 font-semibold transition-all duration-300 transform translate-y-0 text-[11px] md:text-xs">
            {activeEvent?.text}
          </span>
          <span className="text-gray-500 text-[10px] bg-white/5 px-2 py-0.5 rounded flex items-center space-x-1 shrink-0">
            <MapPin className="h-3 w-3 text-brand-gold shrink-0" />
            <span>{activeEvent?.location}</span>
          </span>
          <span className="text-[#00E5FF] text-[9px] uppercase">
            {activeEvent?.time}
          </span>
        </div>

        {/* Global stats info */}
        <div className="hidden md:flex items-center space-x-4 text-[10px] font-mono text-gray-400">
          <div className="flex items-center space-x-1.5">
            <Truck className="h-3.5 w-3.5 text-brand-gold" />
            <span>Dedicated Restock Fleet: <strong className="text-white">Active in Contra Costa</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
}
