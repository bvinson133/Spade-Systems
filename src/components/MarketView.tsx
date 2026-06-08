import { useState } from 'react';
import { Sparkles, Sliders, CheckCircle, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { inventoryItems } from '../data';
import { InventoryItem } from '../types';

interface MarketViewProps {
  onOpenBookingModalWithPreselection: (curatedItemIds: string[]) => void;
}

export default function MarketView({ onOpenBookingModalWithPreselection }: MarketViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [curatedItems, setCuratedItems] = useState<string[]>(['celsius-orange', 'fairlife-chocolate', 'liquid-death']);

  const categories = ['All', 'Energy & Focus', 'Recovery & Protein', 'Hydration', 'Healthy Snacks'];

  const filteredItems = selectedCategory === 'All'
    ? inventoryItems
    : inventoryItems.filter(item => item.category === selectedCategory);

  const toggleCuration = (itemId: string) => {
    if (curatedItems.includes(itemId)) {
      setCuratedItems(curatedItems.filter(id => id !== itemId));
    } else {
      setCuratedItems([...curatedItems, itemId]);
    }
  };

  const clearCuration = () => {
    setCuratedItems([]);
  };

  const preselectedItemsData = inventoryItems.filter(item => curatedItems.includes(item.id));

  // Visual metrics calculation
  const totalVolumeStock = preselectedItemsData.length;
  const targetRestockFrequency = totalVolumeStock <= 3
    ? "1x Restock/Week"
    : totalVolumeStock <= 6
      ? "2x Restocks/Week"
      : "3x Restocks/Week (High Traffic)";

  const estimationPopularity = totalVolumeStock === 0
    ? "0% Satisfaction"
    : totalVolumeStock <= 2
      ? "60% Member Appeal"
      : totalVolumeStock <= 5
        ? "85% Member Appeal"
        : "99% Peak Member Appeal";

  return (
    <div className="space-y-12 pb-24 fade-in" id="market-curator-wrapper">
      
      {/* Introduction text */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-brand-gold/10 border border-brand-gold/30 px-3.5 py-1 rounded-full text-brand-gold text-xs font-mono font-bold uppercase">
          <Sparkles className="h-3 w-3" />
          <span>Interactive Menu Blueprint Tool</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Curate Your Custom Premium Menu
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
          Design your perfect high-end recovery amenity shelf-by-shelf. Tap options to populate a custom menu, review telemetry estimates, and lock down a risk-free trial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 1. PRODUCT DIRECTORY & FILTERS (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5" id="category-pills-row">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-all cursor-pointer font-display ${
                  selectedCategory === cat
                    ? 'bg-brand-gold text-brand-dark border-brand-gold font-bold shadow-lg'
                    : 'bg-brand-card text-gray-400 hover:text-white border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="product-directory-grid">
            {filteredItems.map(item => {
              const isAdded = curatedItems.includes(item.id);
              return (
                <div 
                  key={item.id}
                  onClick={() => toggleCuration(item.id)}
                  className={`bg-brand-card p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer select-none group relative overflow-hidden ${
                    isAdded 
                      ? 'border-brand-gold bg-brand-gold/[0.02] shadow-inner shadow-brand-gold/5' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                  id={`item-card-${item.id}`}
                >
                  {/* Subtle indicator background badge */}
                  {isAdded && (
                    <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark text-[9px] uppercase font-mono font-extrabold px-3 py-1.5 rounded-bl-xl flex items-center space-x-1">
                      <span>✓ PRESELECTED</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">
                        {item.category} • {item.brand}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors font-display">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-white/5">
                    {/* Nutrient highlight */}
                    <div className="text-[11px] font-mono font-bold text-brand-mint flex items-center space-x-1.5 bg-brand-mint/5 p-1.5 rounded border border-brand-mint/10">
                      <CheckCircle className="h-3 w-3" />
                      <span>{item.highlight}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-400">
                        Approx Retail: <strong className="text-white text-sm">{item.approxPrice}</strong>
                      </span>
                      
                      <button
                        type="button"
                        className={`px-3 py-1.5 text-xs rounded-lg font-mono font-bold flex items-center space-x-1 tracking-wider ${
                          isAdded 
                            ? 'bg-transparent text-red-400 hover:underline' 
                            : 'bg-brand-gold/15 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark'
                        } transition-all`}
                      >
                        {isAdded ? (
                          <>
                            <Minus className="h-3 w-3" />
                            <span>REMOVE BLUEPRINT</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3" />
                            <span>ADD TO MENU</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 2. THE LIVE CABINET BLUEPRINT REVIEW (4 cols) */}
        <div className="lg:col-span-4 bg-brand-card p-6 rounded-2xl border-2 border-white/5 space-y-6 sticky top-28" id="curation-status-sidebar">
          
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <div>
              <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Custom Cabinet Blueprint
              </h2>
              <span className="text-[10px] font-mono text-gray-500">Live configuration review</span>
            </div>
            {curatedItems.length > 0 && (
              <button 
                onClick={clearCuration}
                className="text-[10px] font-mono text-red-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Trash2 className="h-3 w-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Blueprint Stats Summary */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-gray-400">
              <span>Curated Selection Content:</span>
              <span className="text-brand-gold font-bold">{totalVolumeStock} Items selected</span>
            </div>

            {/* Satisfaction Rating Delta display */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Member Satisfaction Factor:</span>
              <span className="text-brand-mint font-bold text-[13px]">{estimationPopularity}</span>
            </div>

            {/* Simulated Logistics requirement */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Operational Restock Cycle:</span>
              <span className="text-white font-bold">{targetRestockFrequency}</span>
            </div>
          </div>

          {/* Render List of preselected blueprints */}
          <div className="bg-black/20 p-4 rounded-xl border border-white/5 max-h-56 overflow-y-auto space-y-2">
            {preselectedItemsData.length === 0 ? (
              <div className="text-center py-6 font-mono text-xs text-gray-600">
                ⚠️ Drawer empty.<br />Tap any inventory cards on the left to begin drafting.
              </div>
            ) : (
              preselectedItemsData.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-[#131924] p-2 rounded border border-white/5 text-xs font-mono">
                  <div className="truncate pr-2">
                    <span className="text-gray-500 text-[10px] block uppercase">{item.brand}</span>
                    <span className="text-white font-semibold truncate block">{item.name}</span>
                  </div>
                  <button 
                    onClick={() => toggleCuration(item.id)}
                    className="text-red-400 hover:text-red-300 text-[10px] uppercase font-bold shrink-0 cursor-pointer"
                  >
                    × Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Secure partner conversion trigger */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="text-[11px] text-gray-400 leading-relaxed font-sans bg-[#131924] p-3 rounded-xl border border-white/5">
              💡 Our local Contra Costa route managers will prioritize stock validation based on this selection. We buy, deliver, set up, and restock this exact curated mix.
            </div>

            <button
              onClick={() => onOpenBookingModalWithPreselection(curatedItems)}
              disabled={curatedItems.length === 0}
              className={`w-full font-display font-bold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow gold-glow-btn transition-colors cursor-pointer ${
                curatedItems.length > 0 
                  ? 'bg-brand-gold text-brand-dark hover:bg-brand-gold-hover' 
                  : 'bg-brand-slate text-gray-500 cursor-not-allowed opacity-50'
              }`}
              id="sidebar-book-curation"
            >
              <span>Verify & Request Trial Fridge</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
