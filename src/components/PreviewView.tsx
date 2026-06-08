import { useState } from 'react';
import { CreditCard, CheckCircle2, RotateCcw, AlertTriangle, Sparkles, ShoppingBag, ShieldAlert } from 'lucide-react';
import { inventoryItems } from '../data';
import { InventoryItem } from '../types';

export default function PreviewView() {
  // Machine States
  // 'locked' | 'awaiting_open' | 'door_open' | 'processing_invoice' | 'transaction_success'
  const [machineState, setMachineState] = useState<'locked' | 'door_open' | 'processing_invoice' | 'transaction_success'>('locked');
  const [paymentSource, setPaymentSource] = useState<string | null>(null);
  const [grabbedItems, setGrabbedItems] = useState<{ item: InventoryItem; quantity: number }[]>([]);
  const [invoiceReceipt, setInvoiceReceipt] = useState<{
    id: string;
    timestamp: string;
    paymentToken: string;
    itemsCharge: { name: string; price: string }[];
    totalCost: string;
  } | null>(null);

  // Simulation controls
  const handleTapPayment = (source: string) => {
    setPaymentSource(source);
    setMachineState('door_open');
    setGrabbedItems([]);
    setInvoiceReceipt(null);
  };

  const handleGrabItem = (item: InventoryItem) => {
    if (machineState !== 'door_open') {
      alert("⚠️ Cabinet is locked! Please tap a valid credit card or mobile wallet first to release the electromagnetic locks.");
      return;
    }
    
    // Add item to grabbed temporary container
    const existingIdx = grabbedItems.findIndex(i => i.item.id === item.id);
    if (existingIdx > -1) {
      const copy = [...grabbedItems];
      copy[existingIdx].quantity += 1;
      setGrabbedItems(copy);
    } else {
      setGrabbedItems([...grabbedItems, { item, quantity: 1 }]);
    }
  };

  const handleRemoveGrabbedItem = (itemId: string) => {
    const existingIdx = grabbedItems.findIndex(i => i.item.id === itemId);
    if (existingIdx > -1) {
      const copy = [...grabbedItems];
      if (copy[existingIdx].quantity > 1) {
        copy[existingIdx].quantity -= 1;
        setGrabbedItems(copy);
      } else {
        setGrabbedItems(grabbedItems.filter(i => i.item.id !== itemId));
      }
    }
  };

  const handleShutDoor = () => {
    if (machineState !== 'door_open') return;
    setMachineState('processing_invoice');
    
    setTimeout(() => {
      // Calculate charge details
      const itemsCharge = grabbedItems.flatMap(g => 
        Array.from({ length: g.quantity }).map(() => ({
          name: g.item.name,
          price: g.item.approxPrice
        }))
      );

      const sumFloat = itemsCharge.reduce((sum, item) => {
        const parsed = parseFloat(item.price.replace('$', ''));
        return sum + parsed;
      }, 0);

      const computedTotal = sumFloat === 0 ? '$0.00' : `$${sumFloat.toFixed(2)}`;

      const paymentToken = `tok_emv_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const receiptId = `TXN-${Math.floor(Math.random() * 900000 + 100000)}`;

      setInvoiceReceipt({
        id: receiptId,
        timestamp: new Date().toLocaleTimeString(),
        paymentToken,
        itemsCharge,
        totalCost: computedTotal
      });
      setMachineState('transaction_success');
    }, 1800);
  };

  const handleResetSimulation = () => {
    setMachineState('locked');
    setPaymentSource(null);
    setGrabbedItems([]);
    setInvoiceReceipt(null);
  };

  return (
    <div className="space-y-12 pb-24 fade-in" id="simulation-playground-wrapper">
      
      {/* Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-brand-gold/10 border border-brand-gold/30 px-3.5 py-1 rounded-full text-brand-gold text-xs font-mono font-bold uppercase">
          <Sparkles className="h-3 w-3" />
          <span>Interactive Partner Sandbox</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          \"Tap. Grab. Go.\" Smart Cabinet Simulator
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
          Test drive the user journey from both a consumer's and facility manager's perspective. Tap to simulate card authorization, grab physical beverages, and check real-time telemetry updates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 1. THE HARDWARE CABINET CABIN VIEW (7 cols) */}
        <div className="lg:col-span-7 bg-brand-card p-6 rounded-2xl border-2 border-white/5 space-y-6" id="simulator-hardware-fridge">
          
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">
              Physical Cabinet View • Premium Double-Glass Double-Glass
            </span>
            <div className="flex items-center space-x-2 font-mono text-xs">
              {machineState === 'locked' && (
                <span className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-md border border-red-500/20 font-bold flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 pulsing-dot" />
                  <span>🚪 ELECTROMAGNETIC LOCK ACTIVE</span>
                </span>
              )}
              {machineState === 'door_open' && (
                <span className="px-2.5 py-1 bg-brand-mint/15 text-brand-mint rounded-md border border-brand-mint/30 font-bold flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-mint pulsing-dot" />
                  <span>🔓 DOOR UNLOCKED - GRAB PRODUCTS</span>
                </span>
              )}
              {machineState === 'processing_invoice' && (
                <span className="px-2.5 py-1 bg-[#10b981]/10 text-brand-gold rounded-md border border-brand-gold/20 font-bold flex items-center space-x-1.5 animate-pulse">
                  <span>⚖️ ANALYZING WEIGHT CELL DELTAS...</span>
                </span>
              )}
              {machineState === 'transaction_success' && (
                <span className="px-2.5 py-1 bg-brand-mint/10 text-brand-mint rounded-md border border-brand-mint/20 font-bold">
                  ✓ TRANSACTION RESOLVED
                </span>
              )}
            </div>
          </div>

          {/* Smart Terminal Display overlay */}
          <div className="bg-brand-dark p-4 rounded-xl border border-white/10 space-y-3 font-mono text-center relative" id="terminal-screen-overlay">
            {machineState === 'locked' && (
              <div className="space-y-3 py-4">
                <div className="text-[11px] text-gray-500">CABIN TERMINAL DISPLAY:</div>
                <div className="text-sm font-bold text-white">TAP PAY ACCENT SOURCE TO START REVENUE SESSION</div>
                <div className="flex justify-center gap-3 pt-2">
                  <button 
                    onClick={() => handleTapPayment('Credit / Debit')}
                    className="bg-[#1e293b] hover:bg-brand-gold hover:text-brand-dark border border-white/10 text-xs px-4 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition-all text-white cursor-pointer"
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>💳 Insert / Tap Credit Card</span>
                  </button>
                  <button 
                    onClick={() => handleTapPayment('Apple Pay / Wallet')}
                    className="bg-[#1e293b] hover:bg-brand-gold hover:text-brand-dark border border-white/10 text-xs px-4 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition-all text-white cursor-pointer"
                  >
                    <span>📱 Tap Apple / Google Pay</span>
                  </button>
                </div>
              </div>
            )}

            {machineState === 'door_open' && (
              <div className="space-y-3 py-3">
                <div className="text-[11px] text-brand-mint font-bold uppercase tracking-wider">Session Authorized via {paymentSource}</div>
                <div className="text-white text-xs">
                  The electromagnetic lock is released. <strong className="text-brand-gold">Click any stocked product shelf items</strong> below to simulate physically removing them from the cabinet tray.
                </div>
                <div className="pt-2">
                  <button 
                    onClick={handleShutDoor}
                    className="bg-brand-mint text-brand-dark font-display font-black tracking-widest text-xs uppercase px-6 py-2.5 rounded-lg hover:bg-emerald-400 transition-all cursor-pointer"
                  >
                    🚪 Shut & Lock Fridge Door
                  </button>
                </div>
              </div>
            )}

            {machineState === 'processing_invoice' && (
              <div className="py-6 space-y-2">
                <div className="text-xs text-gray-500">WEIGHT DEVIANCE ANALYSIS IN PROGRESS...</div>
                <div className="h-1 w-24 bg-brand-gold/40 mx-auto rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gold animate-infinite-loading w-1/2"></div>
                </div>
                <p className="text-[10px] text-brand-gray">Cross-checking vision telemetry logs from Contra Costa route bucket #1...</p>
              </div>
            )}

            {machineState === 'transaction_success' && (
              <div className="py-2.5 flex items-center justify-between font-sans px-2">
                <div className="text-left font-mono">
                  <span className="text-[10px] text-brand-mint font-extrabold uppercase">✓ SUCCESSFUL CHECKOUT</span>
                  <p className="text-[11px] text-white">Invoiced amount: <strong className="text-brand-gold">{invoiceReceipt?.totalCost}</strong></p>
                </div>
                <button 
                  onClick={handleResetSimulation}
                  className="bg-white/5 hover:bg-white/10 text-white hover:text-brand-gold px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center space-x-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Lock Cabin Again</span>
                </button>
              </div>
            )}
          </div>

          {/* Stocked shelves display */}
          <div className="grid grid-cols-1 gap-6 bg-brand-dark p-6 rounded-2xl border border-white/5 relative" id="shelf-system">
            
            {/* Shelf Row A */}
            <div className="space-y-2 relative">
              <span className="text-[9px] font-mono text-gray-600 tracking-wider block uppercase border-b border-white/5 pb-1">
                SHELF 1: ENERGY & PHYSICAL PERFORMANCE (CELSIUS & MONSTER COINS)
              </span>
              <div className="flex gap-4 items-end justify-center py-2 h-20">
                {inventoryItems.slice(0, 4).map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleGrabItem(item)}
                    className="w-18 text-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all group shrink-0"
                    title={`Click to grab ${item.name}`}
                  >
                    <div className={`mx-auto h-12 w-6 rounded-sm border relative flex flex-col justify-between p-0.5 ${
                      machineState === 'door_open' 
                        ? 'border-brand-gold bg-brand-card/80 group-hover:border-[#00e5ff] shadow-lg shadow-brand-gold/10' 
                        : 'border-zinc-700 bg-zinc-800 opacity-60'
                    }`}>
                      <div className="text-[5px] text-gray-400 font-mono">200MG</div>
                      <div className="text-[7px] text-white font-black truncate">{item.name.split(' ')[0]}</div>
                    </div>
                    <span className="block text-[8px] font-mono text-gray-400 mt-1 truncate max-w-[70px]">
                      {item.brand.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-1 bg-zinc-700 w-full rounded-full shadow-inner" />
            </div>

            {/* Shelf Row B */}
            <div className="space-y-2 relative pt-2">
              <span className="text-[9px] font-mono text-gray-600 tracking-wider block uppercase border-b border-white/5 pb-1">
                SHELF 2: PREMIUM HIGH-QUALITY PROTEIN & RECOVERY (FAIRLIFE ELITE & PREMIER COINS)
              </span>
              <div className="flex gap-4 items-end justify-center py-2 h-20">
                {inventoryItems.slice(4, 7).map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleGrabItem(item)}
                    className="w-18 text-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all group shrink-0"
                    title={`Click to grab ${item.name}`}
                  >
                    <div className={`mx-auto h-14 w-7 rounded-sm border relative flex flex-col justify-between p-0.5 ${
                      machineState === 'door_open' 
                        ? 'border-brand-gold bg-brand-card/80 group-hover:border-[#00e5ff] shadow-lg' 
                        : 'border-zinc-700 bg-zinc-800 opacity-60'
                    }`}>
                      <div className="text-[5px] text-brand-mint font-mono font-extrabold uppercase">Premium</div>
                      <div className="text-[8px] text-white font-mono font-bold leading-none">{item.name.includes('Core Power') ? '42g' : '30g'}</div>
                    </div>
                    <span className="block text-[8px] font-mono text-gray-400 mt-1 truncate max-w-[70px]">
                      {item.brand.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-1 bg-zinc-700 w-full rounded-full shadow-inner" />
            </div>

            {/* Shelf Row C */}
            <div className="space-y-2 relative pt-2">
              <span className="text-[9px] font-mono text-gray-600 tracking-wider block uppercase border-b border-white/5 pb-1">
                SHELF 3: OPTIMAL HYDRATION & SNACK BARS (LIQUID DEATH COINS)
              </span>
              <div className="flex gap-4 items-end justify-center py-2 h-20">
                {inventoryItems.slice(7).map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleGrabItem(item)}
                    className="w-18 text-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all group shrink-0"
                    title={`Click to grab ${item.name}`}
                  >
                    <div className={`mx-auto h-11 w-6 rounded-sm border relative flex flex-col justify-between p-0.5 ${
                      machineState === 'door_open' 
                        ? 'border-brand-gold bg-brand-card/80 group-hover:border-[#00e5ff] shadow-lg' 
                        : 'border-zinc-700 bg-zinc-800 opacity-60'
                    }`}>
                      <div className="text-[5px] text-gray-400 font-mono">CLEAN</div>
                      <div className="text-[6px] text-white font-bold leading-none uppercase truncate">{item.name.split(' ')[0]}</div>
                    </div>
                    <span className="block text-[8px] font-mono text-gray-400 mt-1 truncate max-w-[70px]">
                      {item.brand.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-1 bg-zinc-700 w-full rounded-full shadow-inner" />
            </div>

          </div>

          <div className="text-[11px] font-mono text-gray-500 text-center leading-relaxed font-sans pt-2">
            💡 <strong>Sandbox Tip:</strong> During normal operational cycles, only verified contactless card tokens are ever allowed to release the magnetic seals, preventing retail spoilage or theft flawlessly.
          </div>

        </div>

        {/* 2. THE DYNAMIC LOGISTICS & SIMULATED INVOICING PANEL (5 cols) */}
        <div className="lg:col-span-5 bg-brand-card p-6 rounded-2xl border-2 border-white/5 space-y-6" id="simulator-telemetry-sidebar">
          
          <div className="pb-3 border-b border-white/5">
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Telemetry Real-time Feed
            </h2>
            <span className="text-[10px] font-mono text-gray-500">Simulation feedback and receipt prints</span>
          </div>

          {/* Handheld basket simulator */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider flex items-center space-x-1.5">
              <ShoppingBag className="h-4 w-4" />
              <span>Direct Handheld Basket</span>
            </h3>

            {grabbedItems.length === 0 ? (
              <div className="bg-black/20 p-5 rounded-xl border border-white/5 text-center text-xs font-mono text-gray-500 py-10 leading-relaxed">
                {machineState === 'door_open' ? (
                  <span className="text-brand-gold font-bold">Door lock released! Click visual shelf units above to simulate grabbing items.</span>
                ) : (
                  <span>Awaiting card tap authorization to open door and load sensor array traces.</span>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {grabbedItems.map(({ item, quantity }) => (
                  <div key={item.id} className="bg-black/40 p-3 rounded-lg border border-white/5 flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="text-white font-semibold">{item.name}</div>
                      <div className="text-[10px] text-gray-500">Weight Deviance: <strong className="text-white">~{quantity * 16} oz</strong></div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-brand-gold font-extrabold">{quantity}x</span>
                      <button 
                        onClick={() => handleRemoveGrabbedItem(item.id)}
                        className="text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer"
                      >
                        Put Back
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Invoiced Printout Receipt */}
          {invoiceReceipt && (
            <div className="bg-[#121824] border border-brand-gold/30 rounded-xl p-5 space-y-4 font-mono text-xs text-gray-300 shadow-md relative overflow-hidden" id="printed-receipt">
              <div className="absolute top-0 right-0 h-10 w-10 bg-brand-gold/10 rounded-bl-xl border-l border-b border-brand-gold/20 flex items-center justify-center text-brand-gold">
                <span>✓</span>
              </div>

              <div className="text-center font-bold border-b border-dashed border-white/10 pb-3 space-y-1">
                <div className="text-sm text-white">SPADE SYSTEMS ATTACHED CHECKOUT</div>
                <div className="text-[10px] text-gray-500">TELEMETRY SECURE ID: {invoiceReceipt.id}</div>
                <div className="text-[10px] text-gray-500">{invoiceReceipt.timestamp}</div>
              </div>

              <div className="space-y-2 border-b border-dashed border-white/10 pb-3 font-sans">
                {invoiceReceipt.itemsCharge.length === 0 ? (
                  <div className="text-center text-xs text-gray-500 font-mono italic">No items billed (Door cycle trace resolved null)</div>
                ) : (
                  invoiceReceipt.itemsCharge.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white">{item.name}</span>
                      <span className="text-brand-gold">{item.price}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-between items-center font-bold pt-1">
                <span>TOTAL BILLED CHARGE:</span>
                <span className="text-white text-base">{invoiceReceipt.totalCost}</span>
              </div>

              <div className="text-[10px] text-gray-500 space-y-1.5 pt-2 border-t border-white/5 font-mono">
                <div>💳 Payment Token: <br /><span className="text-white/80">{invoiceReceipt.paymentToken}</span></div>
                <div>📡 Telemetry Latency Check: <strong className="text-brand-mint">210ms</strong></div>
                <div>🔒 Secure Merchant ID: <strong className="text-white">SPADE-CONTRACOSTA</strong></div>
              </div>
            </div>
          )}

          {/* Secure Partner Conversion Notice */}
          <div className="bg-brand-gold/5 border border-brand-gold/15 p-4 rounded-xl space-y-2 text-xs">
            <h4 className="font-display font-bold text-white uppercase tracking-wide flex items-center space-x-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-brand-gold shrink-0" />
              <span>Full Theft Protection Insured</span>
            </h4>
            <p className="text-brand-gray leading-relaxed font-sans">
              Weight deviations are mapped in milliseconds. In the extremely rare event of a physical discrepancy, our backend handles refunding and security traces autonomously. As partner, your gym bears <strong>0% financial liability</strong> for lost stock.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
