import { useState, useEffect, FormEvent } from 'react';
import { useHash } from './hooks/useHash';
import { CheckCircle2, X, Sparkles, Phone, Shield } from 'lucide-react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SocialProofTicker from './components/SocialProofTicker';
import HomeView from './components/HomeView';
import MarketView from './components/MarketView';
import PreviewView from './components/PreviewView';
import PartnerCRMView from './components/PartnerCRMView';

export default function App() {
  const { path, navigate } = useHash();
  
  // B2B Bookings & Leads State (persistent in localStorage)
  const [bookings, setBookings] = useState<any[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedItemBlueprintIds, setPreselectedItemBlueprintIds] = useState<string[]>([]);
  
  // Booking Form Fields
  const [gymName, setGymName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [memberCount, setMemberCount] = useState<number>(450);
  const [prioritizedCategories, setPrioritizedCategories] = useState<string[]>(['Energy & Focus']);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Initialize with excellent seed leads so the CRM doesn't start empty
  useEffect(() => {
    const cached = localStorage.getItem('spade_systems_trial_reservations');
    if (cached) {
      try {
        setBookings(JSON.parse(cached));
      } catch (err) {
        console.error('Failed to parse cached trials:', err);
      }
    } else {
      const defaultLeads = [
        {
          gymName: "The Danville Plaza & Suites",
          ownerName: "Marcus Vance",
          email: "management@danvilleplaza.com",
          phone: "(925) 832-1920",
          location: "Danville, CA",
          memberCount: 650,
          prioritizedCategories: ["Energy & Focus", "Healthy Snacks"],
          status: "Awaiting Review",
          date: "6/07/2026"
        },
        {
          gymName: "Orinda Wellness & Spa Center",
          ownerName: "Sarah Jenkins",
          email: "sarah@orindawellness.org",
          phone: "(925) 293-4819",
          location: "Orinda, CA",
          memberCount: 300,
          prioritizedCategories: ["Hydration", "Recovery & Protein"],
          status: "Sizing Inspector Dispatched",
          date: "6/05/2026"
        }
      ];
      setBookings(defaultLeads);
      localStorage.setItem('spade_systems_trial_reservations', JSON.stringify(defaultLeads));
    }
  }, []);

  const saveBookings = (newBookings: any[]) => {
    setBookings(newBookings);
    localStorage.setItem('spade_systems_trial_reservations', JSON.stringify(newBookings));
  };

  // Dispatch Inspector Handler (CRM state trigger)
  const handleDispatchBooking = (index: number) => {
    const updated = [...bookings];
    updated[index].status = "Sizing Inspector Dispatched";
    saveBookings(updated);
  };

  // Add booking from any forms
  const handleAddBooking = (newBooking: any) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
  };

  // Modal specific submit
  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!gymName || !ownerName || !email || !phone || !location) {
      alert("Please provide all required parameters to register your partnership.");
      return;
    }

    const newLead = {
      gymName,
      ownerName,
      email,
      phone,
      location,
      memberCount: Number(memberCount),
      prioritizedCategories: preselectedItemBlueprintIds.length > 0 
        ? ["Curated Blueprint Match"] 
        : prioritizedCategories,
      status: "Awaiting Review",
      date: new Date().toLocaleDateString()
    };

    const updated = [newLead, ...bookings];
    saveBookings(updated);
    setBookingSuccess(true);
  };

  const handleOpenBookingModal = () => {
    setPreselectedItemBlueprintIds([]);
    setBookingSuccess(false);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingModalWithPreselection = (curatedItemIds: string[]) => {
    setPreselectedItemBlueprintIds(curatedItemIds);
    setBookingSuccess(false);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    // Clear modal fields
    setGymName('');
    setOwnerName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setPreselectedItemBlueprintIds([]);
  };

  return (
    <div className="mesh-bg min-h-screen text-gray-100 flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark" id="spade-app-root">
      
      {/* FOMO Live operations update pulse */}
      <SocialProofTicker />

      {/* Global Header */}
      <Header 
        currentPath={path}
        navigate={navigate}
        onOpenBookingModal={handleOpenBookingModal}
        bookingCount={bookings.filter(b => b.status === "Awaiting Review").length}
      />

      {/* Main viewport frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {path === '/' && (
          <HomeView 
            navigate={navigate}
            onOpenBookingModal={handleOpenBookingModal}
            onRequestTrialSubmit={handleAddBooking}
          />
        )}

        {path === '/market' && (
          <MarketView 
            onOpenBookingModalWithPreselection={handleOpenBookingModalWithPreselection}
          />
        )}

        {path === '/preview' && (
          <PreviewView />
        )}

        {path === '/partners' && (
          <PartnerCRMView 
            bookings={bookings}
            onDispatchBooking={handleDispatchBooking}
            onAddBooking={handleAddBooking}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} onOpenBookingModal={handleOpenBookingModal} />

      {/* =======================================================
          ACTIVATE TRIAL / PARTNERSHIP BOOKING OVERLAY MODAL
          ======================================================= */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070a10]/85 backdrop-blur-sm animate-fadeIn" id="trial-booking-modal-overlay">
          <div className="bg-brand-card w-full max-w-lg rounded-2xl border-2 border-brand-gold/40 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#141824]">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-brand-gold animate-pulse" />
                <h3 className="font-display font-extrabold text-base text-white uppercase tracking-wider">
                  Partner Smart Trial Reservation
                </h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {bookingSuccess ? (
                <div className="text-center py-8 space-y-4" id="modal-success-screen">
                  <div className="mx-auto w-14 h-14 bg-brand-mint/15 border border-brand-mint/30 rounded-full flex items-center justify-center text-brand-mint font-bold text-2xl">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">Cabinet Reservation Confirmed!</h4>
                    <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you for trusting Spade Systems. Your physical footprint sizing ticket is securely active. Bailey Vinson (Founder) will call you within one business day.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={handleCloseModal}
                      className="bg-brand-gold text-brand-dark hover:bg-brand-gold-hover px-6 py-2 rounded-xl text-xs font-bold uppercase transition-all font-display tracking-wider cursor-pointer"
                    >
                      Return to Hub
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4 text-xs font-mono">
                  
                  {preselectedItemBlueprintIds.length > 0 && (
                    <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-xl text-[11px] text-gray-300 leading-normal">
                      ✨ <strong>Curated Menu Pre-population:</strong> We have attached your selection of <strong>{preselectedItemBlueprintIds.length}</strong> catalog beverages to this B2B booking ticket. Our telemetry pipeline is informed.
                    </div>
                  )}

                  {/* Property details */}
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold uppercase text-[9px]">Property / Facility Name:</label>
                    <input 
                      type="text"
                      required
                      value={gymName}
                      onChange={(e) => setGymName(e.target.value)}
                      placeholder="e.g. Danville Plaza & Suites"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold uppercase text-[9px]">Decision Maker Name (Owner / Manager):</label>
                    <input 
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold uppercase text-[9px]">Direct Phone Number:</label>
                      <input 
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (925) 555-0192"
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold uppercase text-[9px]">Corporate Email:</label>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. manager@danville.com"
                        className="w-full bg-black/40 border border-[#4b5563] rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold uppercase text-[9px]">Physical Location City / Zip:</label>
                    <input 
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Walnut Creek, CA"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold uppercase text-[9px]">Representative Daily occupant / traffic Estimate:</label>
                    <select
                      value={memberCount}
                      onChange={(e) => setMemberCount(Number(e.target.value))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-gold"
                    >
                      <option value="150">100 - 250 occupants (Boutique Suite / Clinic)</option>
                      <option value="450">250 - 750 occupants (Hotel / Luxury Living)</option>
                      <option value="1200">750 - 1500 occupants (Multi-tenant Building)</option>
                      <option value="2500">1500+ occupants (High-Traffic Complex)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-display font-extrabold text-xs uppercase py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01] cursor-pointer shadow-lg gold-glow-btn"
                    >
                      <span>Lock In Risk-Free trial spot</span>
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer Notice */}
            <div className="p-4 bg-brand-dark border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span className="flex items-center space-x-1">
                <Shield className="h-3.5 w-3.5 text-brand-gold shrink-0" />
                <span>$2M Liability Policy Activated</span>
              </span>
              <span>📞 (925) 482-7566</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
