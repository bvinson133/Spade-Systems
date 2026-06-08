import { InventoryItem } from './types';

export const inventoryItems: InventoryItem[] = [
  // Energy & Focus
  {
    id: 'celsius-orange',
    name: 'Celsius Live Fit',
    category: 'Energy & Focus',
    brand: 'Celsius',
    description: 'Essential Energy with green tea extract, guarana, and 7 essential vitamins.',
    highlight: 'No Sugar, Preservatives, or Artificial Colors/Flavors',
    iconName: 'Zap',
    approxPrice: '$3.50'
  },
  {
    id: 'monster-ultra',
    name: 'Monster Energy Ultra',
    category: 'Energy & Focus',
    brand: 'Monster Energy',
    description: 'Zero ultra sugar refreshment with a clean crisp taste, optimized for sustained concentration.',
    highlight: 'Zero Sugar, Zero Calories',
    iconName: 'Flame',
    approxPrice: '$3.75'
  },
  // Recovery & Protein
  {
    id: 'fairlife-chocolate',
    name: 'Core Power Elite Chocolate',
    category: 'Recovery & Protein',
    brand: 'Fairlife',
    description: 'Premium ultra-filtered high protein milk shake designed for advanced athletic recovery.',
    highlight: '42g Complete High-Quality Protein',
    iconName: 'Droplet',
    approxPrice: '$5.50'
  },
  {
    id: 'premier-vanilla',
    name: 'Premier Protein High Protein Shake',
    category: 'Recovery & Protein',
    brand: 'Premier Protein',
    description: 'Vanilla meal replacement shake packed with essential amino acids and low carbs.',
    highlight: '30g Protein, 1g Sugar, 24 Vitamins & Minerals',
    iconName: 'Sparkles',
    approxPrice: '$4.50'
  },
  // Hydration
  {
    id: 'liquid-death',
    name: 'Liquid Death Mountain Water',
    category: 'Hydration',
    brand: 'Liquid Death',
    description: '100% mountain water in infinite-recycling aluminum Tallboy cans to murder your thirst.',
    highlight: 'Pure Mountain Spring Hydration',
    iconName: 'Skull',
    approxPrice: '$2.50'
  },
  {
    id: 'essentia-alkaline',
    name: 'Essentia Ionized Water',
    category: 'Hydration',
    brand: 'Essentia Alkaline',
    description: '9.5 pH ionized alkaline water with an optimal blend of electrolytes for active hydration.',
    highlight: 'Supercharged Ionized Alkaline hydration',
    iconName: 'Shield',
    approxPrice: '$3.00'
  },
  {
    id: 'bodyarmor-strawberry',
    name: 'BodyArmor Sports Drink',
    category: 'Hydration',
    brand: 'BodyArmor',
    description: 'Premium sports drink packed with electrolytes, coconut water, vitamins, and zero artificial sweeteners.',
    highlight: 'Potassium-Packed Electrolytes & Coconut Water',
    iconName: 'Activity',
    approxPrice: '$3.25'
  },
  // Healthy Snacks
  {
    id: 'clean-protein-bar',
    name: 'IQBAR Brain & Body Protein Bar',
    category: 'Healthy Snacks',
    brand: 'IQBAR',
    description: 'Keto-friendly protein bars formulated with 6 clean brain-promoting nutrients.',
    highlight: '12g Plant Protein, 3g Net Carbs, Gluten Free',
    iconName: 'Package',
    approxPrice: '$3.50'
  },
  {
    id: 'chomps-beef-stick',
    name: 'Chomps Original Grass-Fed Beef Stick',
    category: 'Healthy Snacks',
    brand: 'Chomps',
    description: 'Premium grass-fed non-GMO beef stick with zero sugar and high quality protein snacking.',
    highlight: '9g Protein, 0g Sugar, Grass-Fed & Finished',
    iconName: 'Compass',
    approxPrice: '$2.75'
  }
];

export const propertyVerticals = [
  {
    type: "Hotels & Hospitality",
    subtitle: "Premium Guest Ambiance",
    description: "Provide guests with 24/7 lobby, lounge, or fitness-suite access to premium recovery and energy refreshments. Requires zero hospitality labor and keeps guests refreshed after hours.",
    badge: "Hospitality & Travel",
    features: ["Perfect for lobbies", "Whisper-quiet cooling", "No staff monitoring required"]
  },
  {
    type: "Luxury Residential & Apartments",
    subtitle: "Modern Resident Amenity",
    description: "Attract and retain residents with a high-end smart-catering market located in clubhouse common areas or elevator lobbies. Operates seamlessly list-free with zero HOA or property management duties.",
    badge: "Multi-Family Housing",
    features: ["Clubhouse & Lounge focus", "Secure weight-locked access", "Adds premium property value"]
  },
  {
    type: "Premium Fitness Clubs & Gyms",
    subtitle: "Active Recovery Hub",
    description: "Equip your active community with instant pre-workout energy or post-workout protein formulas. Frees up trainers and reception staff to focus purely on memberships instead of inventory math.",
    badge: "Health & Wellness",
    features: ["Supports high-volume fitness", "Eliminates front-desk queueing", "Boosts community satisfaction"]
  },
  {
    type: "Corporate & Tech Hubs",
    subtitle: "Focus Refreshment Centers",
    description: "Keep high-achieving corporate teams focused and fueled throughout the workday. Position smart markets in central breakrooms or department hubs without catering company coordination.",
    badge: "Commercial Offices",
    features: ["24/7 work shift hydration", "Contactless checkout in 3s", "Curated mental performance nutrition"]
  }
];

export const faqList = [
  {
    q: "How is it 100% Free? Are there any hidden installation or maintenance costs?",
    a: "None. Zero. We purchase the high-end smart vending refrigeration equipment, coordinate and pay for professional shipping/setup, and fully handle restocking and inventory management. Our business model is entirely based on direct product sales to customers. Your property gets a premium amenity at absolutely zero cost."
  },
  {
    q: "How does the 'Tap. Grab. Go.' AI technology prevent theft?",
    a: "The smart fridge remains securely locked at all times. To open it, a user simply taps a credit card, Apple Pay, or Google Pay to verify a direct payment source. Our internal high-definition AI vision and precision shelf weight-sensing array map exactly which items are removed. When the door is closed, the payment is processed instantly."
  },
  {
    q: "Does our property staff have to handle restocking, cleaning, or tech support?",
    a: "Not at all. Spade Systems is fully hands-off for your staff. We monitor inventory levels in real-time remotely. Our dedicated Contra Costa County service team replenishes stock, cleans the shelving, and handles hardware/network diagnostics multiple times per week."
  },
  {
    q: "What products are kept in stock? Can we request specific brands?",
    a: "Yes! We specialize in premium energy, protein, hydration, and nutrition bars. We work directly with you to curate the menu from absolute favorites like Celsius, Fairlife Core Power, Liquid Death, and Chomps Beef Sticks to match your target residents or guests."
  },
  {
    q: "What are the physical dimensions and power requirements of the machine?",
    a: "Our standard premium double-glass door smart market occupies a modest footprint: 48\" Wide x 30\" Deep x 78\" High. It runs on a standard 110V/15A dedicated wall outlet. It is whisper-quiet, sports elegant custom LED lighting, and fits seamlessly into luxury reception lobbies, lounges, or breakrooms."
  }
];
