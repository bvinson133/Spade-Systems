import { useState, FormEvent } from 'react';
import { ArrowRight, Flame, Shield, HelpCircle, ChevronDown, Sparkles, CheckCircle2, User, Phone, MapPin, Layers, Coins, Users, Clock } from 'lucide-react';
import { faqList, propertyVerticals } from '../data';

interface HomeViewProps {
  navigate: (to: string) => void;
  onOpenBookingModal: () => void;
  onRequestTrialSubmit: (leadData: { gymName: string; ownerName: string; email: string; phone: string; location: string; memberCount: number; prioritizedCategories: string[] }) => void;
}

export default function HomeView({ navigate, onOpenBookingModal, onRequestTrialSubmit }: HomeViewProps) {
  // Local states for calculator
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [memberCount, setMemberCount] = useState<number>(450);
  const [hasDrinkSales, setHasDrinkSales] = useState<boolean>(true);

  // Form states for direct Lead insertion at footer CTA
  const [gymName, setGymName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [prioritizedCategories, setPrioritizedCategories] = useState<string[]>(['Energy & Focus', 'Recovery & Protein']);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Interactive ROI parameters
  const adminHoursSaved = Math.round((memberCount * 0.04) + (hasDrinkSales ? 6 : 1));
  const estimatedAnnualValue = Math.round((memberCount * 8.5) + (hasDrinkSales ? 2400 : 800));

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleCategoryToggle = (category: string) => {
    if (prioritizedCategories.includes(category)) {
      setPrioritizedCategories(prioritizedCategories.filter(c => c !== category));
    } else {
      setPrioritizedCategories([...prioritizedCategories, category]);
    }
  };

  const handleDirectSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!gymName || !ownerName || !email || !phone || !location) {
      alert("Please populate all crucial partnership credentials to lock in your trial.");
      return;
    }
    onRequestTrialSubmit({
      gymName,
      ownerName,
      email,
      phone,
      location,
      memberCount,
      prioritizedCategories
    });
    setSubmissionSuccess(true);
    // Clear form
    setGymName('');
    setOwnerName('');
    setEmail('');
    setPhone('');
    setLocation('');
  };

  return (
    <div className="space-y-24 pb-24 fade-in" id="home-view-wrapper">
      
      {/* 🚀 HERO SECTION (5-Second Value Prop Rule) */}
      <section className="relative pt-10 pb-16 text-center" id="hero-value-prop">
        <div className="absolute inset-0 grid-overlay opacity-20 z-0"></div>
        <div className="relative z-10 max-w-5xl mx-auto space-y-8 px-4">
          
          {/* Risk-Free Badge */}
          <div className="inline-flex items-center space-x-2.5 bg-brand-gold/15 border border-brand-gold/40 px-4 py-1.5 rounded-full text-brand-gold text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="h-3 w-3 text-brand-gold animate-pulse" />
            <span>EXCLUSIVELY FOR CONTRA COSTA PREMIUM PROPERTIES</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
            A Premium, <span className="text-brand-gold">Zero-Cost</span> <br />
            Amenity For Your Property.
          </h1>

          {/* Subtext describing core value prop */}
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-sans">
            We upgrade high-end properties—including hotels, luxury apartments, premium fitness facilities, and corporate offices—with next-generation grab-and-go micro-markets. Your guests, residents, and members get instant access to elite products with <strong className="text-white font-semibold">absolutely zero cost, zero maintenance, and zero effort</strong> from your staff.
          </p>

          {/* Image Overlay: Styled diagram simulation of a double glass-door smart fridge and mockup phone */}
          <div className="relative max-w-4xl mx-auto py-4">
            <div className="aspect-[16/9] w-full rounded-2xl bg-gradient-to-tr from-[#131926] via-[#1b263b] to-[#121926] border border-white/10 p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden" id="hero-assets-visual-panel">
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#070a10]/60 pointer-events-none"></div>
              
              {/* Product Shelf rendering */}
              <div className="flex-1 space-y-4 text-left z-10 w-full">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-brand-mint pulsing-dot"></span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-mint">Telemetry Real-time active</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display">Spade Elite Smart Smart Cabinet</h3>
                <p className="text-xs text-gray-400">
                  Precision weight sensor shelves + HD AI vision lock securely. It accepts contactless taps, tracks items grabbed, and completes billing securely in 3 seconds.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-white/5 border border-white/5 text-gray-300 text-[10px] font-mono px-2.5 py-1 rounded">
                    ⚡ Celsius Energizers
                  </span>
                  <span className="bg-white/5 border border-white/5 text-gray-300 text-[10px] font-mono px-2.5 py-1 rounded">
                    🥛 Fairlife Core Protein
                  </span>
                  <span className="bg-white/5 border border-white/5 text-gray-300 text-[10px] font-mono px-2.5 py-1 rounded">
                    💀 Liquid Death Tallboys
                  </span>
                </div>
              </div>

              {/* 3D-Like Smart Fridge Vector Preview */}
              <div className="w-full md:w-72 shrink-0 h-64 bg-[#141824] rounded-xl border-2 border-brand-gold/30 p-3 shadow-lg relative flex flex-col justify-between overflow-hidden group">
                <div className="absolute inset-0 fridge-reflection"></div>
                
                {/* Fridge Handle */}
                <div className="absolute right-3.5 top-1/4 h-24 w-1.5 bg-brand-gold/60 rounded-full border border-white/10 shadow z-10"></div>
                
                {/* Stock Mockup representation */}
                <div className="space-y-4 z-10">
                  <div className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-1">
                    <span className="text-brand-gold font-bold">SPADE SMART LABS</span>
                    <span className="text-brand-mint">🔐 SECURE LOCK ON</span>
                  </div>
                  
                  {/* Shelf Row 1 */}
                  <div className="space-y-1">
                    <div className="h-0.5 bg-white/10 w-full" />
                    <div className="flex justify-around items-end h-8">
                      <div className="w-4 h-8 bg-orange-500 rounded-sm border border-orange-400 relative" title="Celsius Orange"><span className="text-[6px] text-white block text-center mt-1">C</span></div>
                      <div className="w-4 h-8 bg-zinc-800 rounded-sm border border-zinc-700 relative" title="Monster Ultra"><span className="text-[6px] text-white block text-center mt-1">M</span></div>
                      <div className="w-4 h-8 bg-orange-500 rounded-sm border border-orange-400 relative" title="Celsius Live Fit"><span className="text-[6px] text-white block text-center mt-1">C</span></div>
                      <div className="w-4 h-8 bg-zinc-800 rounded-sm border border-zinc-700 relative" title="Monster Ultra"><span className="text-[6px] text-white block text-center mt-1">M</span></div>
                    </div>
                  </div>

                  {/* Shelf Row 2 */}
                  <div className="space-y-1">
                    <div className="h-0.5 bg-white/10 w-full" />
                    <div className="flex justify-around items-end h-9">
                      <div className="w-5 h-9 bg-neutral-100 rounded-sm border border-blue-400 relative" title="Fairlife Chocolate"><span className="text-[7px] text-indigo-900 font-bold block text-center mt-1">42g</span></div>
                      <div className="w-5 h-9 bg-neutral-100 rounded-sm border border-blue-400 relative" title="Fairlife Chocolate"><span className="text-[7px] text-indigo-900 font-bold block text-center mt-1">42g</span></div>
                      <div className="w-5 h-9 bg-yellow-500 rounded-sm border border-yellow-400 relative" title="Premier Protein"><span className="text-[7px] text-white block text-center mt-1">30g</span></div>
                    </div>
                  </div>

                  {/* Shelf Row 3 (Snacks/Bars) */}
                  <div className="space-y-1">
                    <div className="h-0.5 bg-white/10 w-full" />
                    <div className="flex justify-around items-end h-8">
                      <div className="w-3 h-8 bg-black rounded-sm border border-white/20 relative" title="Liquid Death"><span className="text-[5px] text-white block text-center mt-3">L</span></div>
                      <div className="w-3 h-8 bg-black rounded-sm border border-white/20 relative" title="Liquid Death"><span className="text-[5px] text-white block text-center mt-3">L</span></div>
                      <div className="w-5 h-5 bg-purple-600 rounded-sm border border-purple-500 relative" title="IQBAR"><span className="text-[5px] text-white block text-center">IQ</span></div>
                      <div className="w-5 h-5 bg-red-600 rounded-sm border border-red-500 relative" title="Beef Stick"><span className="text-[5px] text-white block text-center">C</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-white/5 font-mono text-[9px] z-10 mt-2">
                  <span className="text-gray-400">LED Ambience:</span>
                  <span className="text-brand-gold font-bold">100% OFF-WHITE</span>
                </div>
              </div>

            </div>
          </div>

          {/* CRO Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            <button
              onClick={onOpenBookingModal}
              className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-hover text-brand-dark px-8 py-4 rounded-xl font-bold font-display uppercase tracking-wider text-sm flex items-center justify-center space-x-2 shadow-lg gold-glow-btn cursor-pointer transition-transform duration-100"
              id="hero-explore-cta"
            >
              <span>Request 90-Day Risk-Free Trial Machine</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => navigate('/preview')}
              className="w-full sm:w-auto bg-brand-card hover:bg-brand-card/85 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-brand-gold/40 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              id="hero-sandbox-cta"
            >
              <span>Test Grab & Go Simulator</span>
            </button>
          </div>

          {/* Social Proof metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-10 border-t border-white/5 text-center font-mono">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">100% FREE</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Amenity Value</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-brand-gold">NO WORK</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Staff Fully Liberated</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">EAST BAY</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Contra Costa County</div>
            </div>
          </div>

        </div>
      </section>

      {/* 🔮 THE TECHNOLOGY (Tap, Grab, Go) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="technology-explanation">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block font-bold">STATE-OF-THE-ART HARDWARE</span>
          <h2 className="font-display text-3xl font-extrabold text-white">How It Works: Tap. Grab. Go.</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Our smart machines bypass the friction of standard vending-machine refund slips, mechanical coils, or dynamic drop error failures. Simple. Instant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-brand-card rounded-2xl border border-white/5 p-8 space-y-4 hover:border-brand-gold/20 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-amber-500/10 font-bold font-display text-6xl block select-none">01</div>
              <h3 className="text-lg font-bold text-white font-display">Tap to Unlock</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                Members tap their credit card, Apple Pay, or Google Pay. No custom application download is required. Security validation is generated in 1 second flat.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-brand-gold font-bold">
              ✓ Compliant securely with EMV standards
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-brand-card rounded-2xl border border-white/5 p-8 space-y-4 hover:border-brand-gold/20 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-brand-indigo/10 font-bold font-display text-6xl block select-none">02</div>
              <h3 className="text-lg font-bold text-white font-display">Browse & Grab</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                The smart glass door unlocks automatically. Gym members can take as many items as they wish, read nutritional labels, or put back what they review.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-brand-gold font-bold">
              ✓ Open-door physical layout browsing
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-brand-card rounded-2xl border border-white/5 p-8 space-y-4 hover:border-brand-gold/20 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-brand-mint/10 font-bold font-display text-6xl block select-none">03</div>
              <h3 className="text-lg font-bold text-white font-display">Close & Go</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                Upon shutting the safety door, our internal AI vision + precise shelf load-cell weight sensors identify exactly which products were removed, billing the card instantly.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-brand-gold font-bold">
              ✓ Safe autonomous tracking algorithm
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/preview')}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 hover:border-brand-gold hover:text-brand-gold px-6 py-3 rounded-xl text-xs font-bold text-gray-300 font-display transition-all cursor-pointer"
          >
            <span>Run Interactive Smart Fridge Simulation</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 💰 PARTNERSHIP VALUE ROI CALCULATOR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 bg-white/[0.01] rounded-3xl border border-white/5 relative overflow-hidden" id="roi-calculator">
        <div className="absolute top-0 right-0 h-40 w-40 bg-brand-gold/5 blur-3xl rounded-full"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-brand-gold uppercase font-bold tracking-widest block">INTERACTIVE CALCULATOR</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Estimated Value For Your Facility or Property
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              No subscription or software fees. Use our interactive slider to gauge administrative hours saved and the raw financial amenity value Spade Systems coordinates on your behalf.
            </p>
            
            {/* Value Indicators */}
            <div className="space-y-4 pt-4 font-mono">
              <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/5">
                <Clock className="h-5 w-5 text-brand-gold shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">Administrative Staff Hours Freed</span>
                  <span className="text-white text-sm font-bold">~ {adminHoursSaved} Hours / Month</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/5">
                <Coins className="h-5 w-5 text-brand-mint shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">Annual Operational Amenity Value</span>
                  <span className="text-brand-mint text-sm font-bold">${estimatedAnnualValue.toLocaleString()} / Year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-brand-card p-6 rounded-2xl border border-white/5 space-y-6">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider pb-3 border-b border-white/5">
              Enter Property Metrics & Info
            </h3>

            {/* Input 1 Range slider: Members count */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span>Active Occupants (Guests/Residents/Members) Daily:</span>
                <span className="text-brand-gold font-bold text-sm">{memberCount} Daily</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={memberCount}
                onChange={(e) => setMemberCount(parseInt(e.target.value))}
                className="w-full accent-brand-gold bg-black/40 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-gray-600">
                <span>100 Occupants (Boutique)</span>
                <span>2,500 Occupants (Large Complex)</span>
              </div>
            </div>

            {/* Input 2 Toggle: Does staff currently hand-sell drinks/snacks? */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-gray-400 block">Does your property staff currently manage or manually stock drink sales?</label>
              <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/10 max-w-sm">
                <button
                  type="button"
                  onClick={() => setHasDrinkSales(true)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    hasDrinkSales 
                      ? 'bg-brand-gold text-brand-dark font-bold shadow' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yes, we sell manually
                </button>
                <button
                  type="button"
                  onClick={() => setHasDrinkSales(false)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    !hasDrinkSales 
                      ? 'bg-brand-gold text-brand-dark font-bold shadow' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  No, members bring own
                </button>
              </div>
            </div>

            <div className="text-xs bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-xl text-brand-gray leading-relaxed font-sans">
              💡 <strong>CRO Insights:</strong> By outsourcing refreshments via automated telemetric smart markets, your staff shifts 100% focus away from restocking coolers or handling coin math, freeing them to support guests and core operations.
            </div>
          </div>

        </div>
      </section>

      {/* 🤝 WHY PARTNER WITH US */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="partnership-reasons">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block font-bold">THE EXPERT PARTNERSHIP BENEFITS</span>
          <h2 className="font-display text-3xl font-extrabold text-white">Why Property Operators Choose Spade Systems</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
            We are dedicated East Bay local service operators, not distant tech conglomerates. We work side-by-side with managers to elevate high-end facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="partnership-bullets-grid">
          {/* Benefit 1 */}
          <div className="bg-brand-card p-6 rounded-2xl border border-white/5 space-y-3.5 hover:border-white/10 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                <Coins className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold uppercase font-display text-white tracking-wide">100% Free Amenity</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              We purchase the machine, handle delivery, manage all inventory, and carry full commercial liability insurance. No hidden operational fees are charged to you whatsoever.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-brand-card p-6 rounded-2xl border border-white/5 space-y-3.5 hover:border-white/10 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold uppercase font-display text-white tracking-wide">Free Up Your Staff</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              No more selling individual drinks or manual inventory counts. Your front-desk or concierge staff focuses entirely on first-class hosting and elevating visitor experiences.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-brand-card p-6 rounded-2xl border border-white/5 space-y-3.5 hover:border-white/10 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold uppercase font-display text-white tracking-wide">Elevate Your Brand</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              A sleek, premium smart refrigeration machine signals high-quality standards to every resident or guest who walks through your lobby.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-brand-card p-6 rounded-2xl border border-white/5 space-y-3.5 hover:border-white/10 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold uppercase font-display text-white tracking-wide">Local Dedicated Service</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              Based proudly in Contra Costa County, California. Our dedicated local recovery route crew takes care of restocking, cleaning, and tuning machine telemetry multiple times a week.
            </p>
          </div>
        </div>
      </section>

      {/* 🏛️ MODERN PROPERTY VERTICALS - REAL SPECS, NO FAKE REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="property-verticals">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block font-bold">VERSATILE PLACEMENT OPPORTUNITIES</span>
          <h2 className="font-display text-3xl font-extrabold text-white">Custom-Built For High-Traffic Properties</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
            From hospitality welcome lobbies to luxury apartments, co-working suites, and wellness clubs, Spade Systems integrates into premium property layouts seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyVerticals.map((vertical, i) => (
            <div key={i} className="bg-brand-card p-6 rounded-2xl border border-white/5 hover:border-brand-gold/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-brand-gold/15 text-brand-gold text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {vertical.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">{vertical.type}</h3>
                  <p className="text-brand-gold text-[10px] font-mono mt-0.5">{vertical.subtitle}</p>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {vertical.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-1.5">
                {vertical.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center space-x-1.5 text-[10px] font-mono text-gray-500">
                    <span className="text-brand-mint font-bold">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔴 LEAD ACQUISITION FOOTER FORM - ACTIVATE 90-DAY RISK-FREE TRIAL */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" id="trial-activation-form-block">
        <div className="bg-brand-card p-8 rounded-3xl border-2 border-brand-gold/30 space-y-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-10"></div>
          
          <div className="text-center space-y-3 relative z-10">
            <span className="text-xs font-mono text-brand-gold font-bold uppercase tracking-widest bg-brand-gold/10 px-3.5 py-1 rounded-full inline-block">
              LIMITED SPOTS SECURED FOR THIS REFRESH CYCLE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Activate a 90-Day Risk-Free Trial
            </h2>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Ready to elevate your hospitality, apartment, or amenity standards? Input your details below. Bailey Vinson (Founder) will connect within 1 business day for physical sizing checks.
            </p>
          </div>

          {submissionSuccess ? (
            <div className="bg-[#10b981]/5 border border-[#10b981]/20 p-6 rounded-2xl text-center space-y-4" id="direct-submit-success-indicator">
              <div className="mx-auto w-12 h-12 bg-[#10b981]/15 rounded-full flex items-center justify-center border border-[#10b981]/20 text-brand-mint text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Trial Protocol Initiated!</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                  Thank you, {ownerName}. Your partnership reservation is logged. Founder Bailey Vinson will call you directly at <span className="font-mono text-brand-gold">{phone}</span> to schedule the physical footprint inspection.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmissionSuccess(false)}
                className="text-xs text-brand-gold underline font-semibold font-mono hover:text-white"
              >
                Submit another reservation request
              </button>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Venue Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 block font-bold">Property / Facility / Firm Name:</label>
                  <input
                    type="text"
                    required
                    value={gymName}
                    onChange={(e) => setGymName(e.target.value)}
                    placeholder="e.g. Walnut Creek Inn & Suites"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
                {/* Owner Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 block font-bold">Contact Name (Owner / Manager):</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 block font-bold">Corporate Email Address:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. management@propertycorp.com"
                    className="w-full bg-black/40 border border-[#4b5563] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 block font-bold">Direct Call Phone Number:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. (925) 555-0192"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              {/* Physical Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 block font-bold">Physical Property City & Region:</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Walnut Creek, Contra Costa County"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-gold font-mono"
                />
              </div>

              {/* Multi-Tag Prioritized Categories */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-gray-400 block font-bold">Select Custom Curations Your Occupants Prefer:</label>
                <div className="flex flex-wrap gap-2">
                  {['Energy & Focus', 'Recovery & Protein', 'Hydration', 'Healthy Snacks'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryToggle(cat)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                        prioritizedCategories.includes(cat)
                          ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/50 font-bold'
                          : 'bg-black/20 text-gray-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {prioritizedCategories.includes(cat) ? '★' : '+'} {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-display font-extrabold text-sm py-4 px-4 rounded-xl flex items-center justify-center space-x-2.5 transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg gold-glow-btn mt-6"
                id="trial-submit-button"
              >
                <span>Book Free Footprint Sizing Inspection</span>
                <CheckCircle2 className="h-4.5 w-4.5" />
              </button>
            </form>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-500 border-t border-white/5 pt-4">
            <span>📞 Direct Operator Contact: <strong>(925) 482-7566</strong></span>
            <span className="hidden sm:inline">✓ Zero compliance constraints. Full insurance locked.</span>
          </div>
        </div>
      </section>

      {/* 🔴 FAQ ACCORDION BLOCK */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8" id="faq-accordions">
        <div className="text-center">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-brand-gold uppercase tracking-wider font-bold">
            <HelpCircle className="h-4 w-4" />
            <span>Friction Reduction Support</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
            Frequently Answered Concerns
          </h2>
          <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
            Everything you need to verify about our smart machines, telemetry tracking, restocking cycles, and liability.
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <div 
              key={index}
              className="bg-brand-card rounded-xl border border-white/5 overflow-hidden transition-all duration-200"
              id={`faq-item-${index}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-6 py-4.5 text-left font-display font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  className={`h-4 w-4 text-brand-gold transition-transform duration-200 ${
                    activeFaq === index ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeFaq === index && (
                <div className="px-6 pb-5 pt-1 border-t border-white/10 text-sm text-gray-400 font-sans leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
