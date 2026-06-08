import { useState, FormEvent } from 'react';
import { Truck, CheckCircle, Clock, ShieldCheck, RefreshCw, Send, Plus, Users, MapPin, Database } from 'lucide-react';

interface PartnerCRMViewProps {
  bookings: any[];
  onDispatchBooking: (index: number) => void;
  onAddBooking: (booking: any) => void;
}

export default function PartnerCRMView({ bookings, onDispatchBooking, onAddBooking }: PartnerCRMViewProps) {
  const [activeInstallations, setActiveInstallations] = useState([
    {
      clubName: "Lafayette Luxury Suites",
      city: "Lafayette, CA",
      contractor: "Bailey Vinson",
      telemetry: "100% stock capacity",
      revenueSession: "$412.50 this week",
      setupDate: "Feb 12, 2026",
      status: "Operational"
    },
    {
      clubName: "Danville Plaza Apartments",
      city: "Danville, CA",
      contractor: "Bailey Vinson",
      telemetry: "82% stock capacity",
      revenueSession: "$240.25 this week",
      setupDate: "Mar 10, 2026",
      status: "Operational"
    },
    {
      clubName: "Ironclad Athletic Club",
      city: "Walnut Creek, CA",
      contractor: "Bailey Vinson",
      telemetry: "Restock required soon",
      revenueSession: "$198.00 this week",
      setupDate: "Apr 04, 2026",
      status: "Operational"
    }
  ]);

  // Form states to add custom local lead inside CRM
  const [gymName, setGymName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateLeadLocal = (e: FormEvent) => {
    e.preventDefault();
    if (!gymName || !ownerName || !phone || !location) {
      alert("Please fill in quick lead details first.");
      return;
    }
    const newLead = {
      gymName,
      ownerName,
      email: `${ownerName.toLowerCase().replace(/\s+/g, '')}@example-property.com`,
      phone,
      location,
      memberCount: 400,
      prioritizedCategories: ['Energy & Focus'],
      status: 'Awaiting Review',
      date: new Date().toLocaleDateString()
    };
    onAddBooking(newLead);
    // Clear
    setGymName('');
    setOwnerName('');
    setPhone('');
    setLocation('');
  };

  return (
    <div className="space-y-12 pb-24 fade-in" id="crm-system-wrapper">
      
      {/* Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-brand-gold/10 border border-brand-gold/30 px-3.5 py-1 rounded-full text-brand-gold text-xs font-mono font-bold uppercase">
          <Database className="h-3 w-3" />
          <span>Restock Logistics & B2B CRM Operator Board</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Contra Costa Operations Center
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
          Operational panel of automated smart cabinets, active retail telemetry, B2B sign-up review matrices, and physical fleet dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ACTIVE INSTALL SITES & CRM DISPATCH LIST */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active smart locations list */}
          <div className="bg-brand-card p-6 rounded-2xl border border-white/5 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div>
                <h3 className="font-display font-semibold text-base text-white">
                  Active East Bay Installations
                </h3>
                <span className="text-[10px] font-mono text-gray-500">Live operational nodes</span>
              </div>
              <span className="bg-[#10b981]/10 text-brand-mint text-[10px] uppercase font-mono px-2.5 py-1 rounded font-bold">
                ● ALL SITES SECURED & ONLINE
              </span>
            </div>

            <div className="space-y-4" id="crm-installations-list">
              {activeInstallations.map((site, idx) => (
                <div key={idx} className="bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold font-display text-sm leading-none shrink-0">{site.clubName}</span>
                      <span className="text-brand-gold text-[10px]">{site.city}</span>
                    </div>
                    <div className="text-gray-400 text-[11px] font-sans">Installed on: <strong>{site.setupDate}</strong> | Local Route Operator: <strong>{site.contractor}</strong></div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-brand-mint/10 text-brand-mint border border-brand-mint/20 px-2 py-1 rounded text-[10px] font-bold">
                      Telemetry: {site.telemetry}
                    </span>
                    <span className="bg-white/5 border border-white/5 text-gray-300 px-2.5 py-1 rounded text-[10px] font-bold">
                      {site.revenueSession}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Reservation lead list */}
          <div className="bg-brand-card p-6 rounded-2xl border border-white/5 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div>
                <h3 className="font-display font-semibold text-base text-white">
                  Pending Trial Reservations
                </h3>
                <span className="text-[10px] font-mono text-gray-500">B2B client pipeline tracker</span>
              </div>
              <span className="bg-brand-gold/15 text-brand-gold font-mono text-[10px] px-2.5 py-1 rounded font-bold uppercase">
                {bookings.length} Applications Registered
              </span>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-12 bg-black/10 rounded-xl border border-white/5 text-xs text-gray-500 font-mono space-y-2">
                <div>⚠️ No pipeline trials logged yet.</div>
                <p className="text-[11px] text-gray-600 font-sans max-w-sm mx-auto">
                  Submit a trial reservation on the home gateway page, or use the quick simulator panel on the right of this board to populate a lead manual record!
                </p>
              </div>
            ) : (
              <div className="space-y-4" id="crm-pending-bookings-list">
                {bookings.map((booking, idx) => (
                  <div key={idx} className="bg-black/30 p-5 rounded-xl border border-white/10 space-y-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-1 bg-brand-gold w-1/3"></div>

                    {/* Pending Row Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block font-bold">
                          {booking.date || 'Reservation Logged'}
                        </span>
                        <h4 className="font-display font-bold text-sm text-white">
                          {booking.gymName}
                        </h4>
                        <span className="text-[10px] font-mono text-gray-500">📍 {booking.location}</span>
                      </div>

                      <div className="shrink-0">
                        {booking.status === 'Awaiting Review' ? (
                          <span className="px-2.5 py-1 bg-brand-gold/10 text-brand-gold rounded border border-brand-gold/20 text-[10px] font-mono font-bold uppercase flex items-center space-x-1">
                            <Clock className="h-3 w-3 animate-pulse shrink-0" />
                            <span>Awaiting Footprint Sizing inspection</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-brand-mint/10 text-brand-mint rounded border border-brand-mint/20 text-[10px] font-mono font-bold uppercase flex items-center space-x-1">
                            <ShieldCheck className="h-3 w-3 shrink-0" />
                            <span>Sizing Inspector Dispatched Successfully</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-gray-400">
                      <div>
                        <div className="text-gray-500 uppercase text-[9px] font-bold">Primary Contact Personnel:</div>
                        <div className="text-white font-semibold">{booking.ownerName} ({booking.phone})</div>
                        <div className="text-gray-500 mt-1 uppercase text-[9px] font-bold">Prefered Curated Menu Selections:</div>
                        <div className="text-gray-300 mt-0.5">{booking.prioritizedCategories?.join(', ') || 'General Performance Curations'}</div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-start sm:items-end">
                        <div className="text-left sm:text-right">
                          <span className="text-gray-500 uppercase text-[9px] font-bold">Property Scale:</span>
                          <div className="text-white font-bold">{booking.memberCount || 400} traffic volume</div>
                        </div>

                        {booking.status === 'Awaiting Review' && (
                          <button
                            onClick={() => onDispatchBooking(idx)}
                            className="bg-brand-gold hover:bg-brand-gold-hover text-brand-dark px-3 py-1.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer mt-2"
                          >
                            <Send className="h-3 w-3" />
                            <span>Dispatch Sizing Inspector</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: CRM TELEMETRY SIMULATOR PANEL */}
        <div className="lg:col-span-4 bg-brand-card p-6 rounded-2xl border-2 border-white/5 space-y-6 sticky top-28" id="crm-simulation-creation-panel">
          
          <div className="pb-3 border-b border-white/5">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Lead Sandbox
            </h3>
            <span className="text-[10px] font-mono text-gray-500">Inject simulated B2B partner application</span>
          </div>

          <form onSubmit={handleCreateLeadLocal} className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <label className="text-gray-400 font-bold uppercase text-[9px]">Property / Facility Name:</label>
              <input
                type="text"
                required
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                placeholder="e.g. Danville Luxury Suites"
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-bold uppercase text-[9px]">Contact Name:</label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g. Bailey Vinson"
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-bold uppercase text-[9px]">Direct Phone:</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. (925) 482-7566"
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-bold uppercase text-[9px]">City Location:</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Walnut Creek, CA"
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-gold/15 text-brand-gold hover:bg-brand-gold hover:text-brand-dark font-bold py-2.5 rounded-lg border border-brand-gold/30 uppercase tracking-wider text-[11px] transition-all flex items-center justify-center space-x-1 hover:shadow-lg hover:shadow-brand-gold/5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Simulate Lead Intake</span>
            </button>
          </form>

          <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-2 text-xs">
            <h4 className="font-display font-bold text-white uppercase text-[10px] tracking-wider flex items-center space-x-1">
              <Truck className="h-4 w-4 text-brand-gold" />
              <span>Restocking Route Metrics</span>
            </h4>
            <p className="text-gray-500 leading-normal font-sans text-[11px]">
              East Bay local replenishment is fully dynamic. When smart cabinet weight sensors detect stock reduction below 30%, dispatch logistics automatically triggers restocking route fulfillment routes.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
