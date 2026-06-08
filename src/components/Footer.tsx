import { Shield, CheckCircle2, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  navigate: (to: string) => void;
  onOpenBookingModal: () => void;
}

export default function Footer({ navigate, onOpenBookingModal }: FooterProps) {
  return (
    <footer className="relative border-t border-white/5 bg-brand-dark/95 text-gray-400">
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-brand-indigo via-brand-gold to-brand-mint"></div>
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center space-x-2">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                SPADE<span className="text-brand-gold">SYSTEMS</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              We upgrade high-end properties—including hotels, luxury apartments, premium fitness facilities, and corporate offices—in the East Bay with next-generation grab-and-go micro-markets. Provide premium amenities with zero cost, zero effort, and zero maintenance from your property's staff.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-brand-mint shrink-0" />
                <span>100% Free Amenity Partner Program</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-brand-gold shrink-0" />
                <span>Full $2M General Commercial Liability Coverage</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Options */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-[#00E5FF] uppercase mb-4 font-display">Hub Sitemap</h3>
            <ul className="space-y-2.5 text-sm" id="footer-links">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-brand-gold text-left transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold font-display">
                  → Overview & Benefits
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/market')} className="hover:text-brand-gold text-left transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold font-display">
                  → Curated Products & Menu
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/preview')} className="hover:text-brand-gold text-left transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold font-display">
                  → Tap. Grab. Go. Simulator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/partners')} className="hover:text-brand-gold text-left transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold font-display">
                  → Partners CRM Panel
                </button>
              </li>
              <li>
                <button onClick={onOpenBookingModal} className="text-brand-gold hover:underline text-left transition-colors cursor-pointer text-xs uppercase tracking-wider font-bold font-display">
                  → Request Trial Fridge
                </button>
              </li>
            </ul>
          </div>

          {/* Partnership & Lead Contacts */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-[#00E5FF] uppercase font-display">Contact Founder</h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
                <div className="p-1.5 rounded-md bg-brand-gold/10 text-brand-gold">
                  <span className="font-bold">BV</span>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Founder & Operator</div>
                  <div className="text-white">Bailey Vinson</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                <Phone className="h-4 w-4 text-brand-gold shrink-0" />
                <span>(925) 482-7566</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                <Mail className="h-4 w-4 text-brand-gold shrink-0" />
                <span>bvinson133@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0" />
                <span>Contra Costa County, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-brand-gold shrink-0" />
                <span>spadesystems.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Base */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-gray-500">
          <p>© 2026 Spade Systems. Automated Micro-Market Solutions. All Rights Reserved. Crafted with Antigravity 2.0.</p>
          <div className="flex space-x-4">
            <span className="hover:text-white transition-colors cursor-pointer">Commercial Privacy Statement</span>
            <span className="hover:text-white transition-colors cursor-pointer">Contra Costa Operations Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
