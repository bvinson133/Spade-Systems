import { Shield, Sparkles, Sliders, Play, Phone, HelpCircle, FileText } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  navigate: (to: string) => void;
  onOpenBookingModal: () => void;
  bookingCount: number;
}

export default function Header({ currentPath, navigate, onOpenBookingModal, bookingCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-brand-carbon/90 backdrop-blur-md">
      {/* Top micro-contact line */}
      <div className="bg-[#141824] border-b border-white/5 py-1.5 text-center text-[11px] font-mono text-gray-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Phone className="h-3 w-3 text-brand-gold" />
              <span>Dedicated Partner Hot-line: <strong>(925) 482-7566</strong></span>
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:inline">📍 Serving Contra Costa County & East Bay</span>
          </div>
          <div className="flex items-center space-x-3 text-brand-gold font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint pulsing-dot" />
            <span>90-Day Risk-Free Trial Spots Available</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div 
          onClick={() => navigate('/')} 
          className="flex cursor-pointer items-center space-x-3 group"
          id="nav-logo"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-dark border border-brand-gold/40 text-brand-gold shadow-lg transition-transform group-hover:scale-105">
            <span className="font-display font-extrabold text-lg">S</span>
            <div className="absolute inset-0 rounded-xl bg-brand-gold/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-white leading-none block">
              SPADE<span className="text-brand-gold">SYSTEMS</span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[#00E5FF] uppercase block mt-0.5">
              AUTOMATED MICRO-MARKETS
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden lg:flex space-x-1" id="nav-links">
          <button
            onClick={() => navigate('/')}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg ${
              currentPath === '/' 
                ? 'text-brand-gold bg-white/5' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            The Opportunity
          </button>
          <button
            onClick={() => navigate('/market')}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg ${
              currentPath === '/market' 
                ? 'text-brand-gold bg-white/5' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Custom Menu Builder
          </button>
          <button
            onClick={() => navigate('/preview')}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg ${
              currentPath === '/preview' 
                ? 'text-brand-gold bg-white/5' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Smart Cabinet Simulator
          </button>
          <button
            onClick={() => navigate('/partners')}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg ${
              currentPath === '/partners' 
                ? 'text-brand-gold bg-white/5' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Partner CRM Board
            {bookingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-brand-gold text-brand-dark rounded-full font-bold">
                {bookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* RIGHT SIDE TRIAL CTA */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenBookingModal}
            className="bg-brand-gold hover:bg-brand-gold-hover text-brand-dark px-5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all gold-glow-btn cursor-pointer"
            id="header-trial-cta"
          >
            Activate Free Trial
          </button>
        </div>

      </div>
    </header>
  );
}
