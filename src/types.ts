export interface InventoryItem {
  id: string;
  name: string;
  category: 'Energy & Focus' | 'Recovery & Protein' | 'Hydration' | 'Healthy Snacks';
  brand: string;
  description: string;
  highlight: string;
  iconName: string;
  approxPrice: string;
}

export interface LeadSubmission {
  id: string;
  gymName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  memberCount: number;
  prioritizedCategories: string[];
  status: 'PENDING_REVIEW' | 'APPROVED' | 'DISPATCHED';
}

export interface MachineSimulationState {
  isLocked: boolean;
  activeCardType: 'Visa' | 'ApplePay' | 'GooglePay' | null;
  selectedItems: { item: InventoryItem; count: number }[];
  sensorWeightGrams: number;
  sessionTotal: number;
}
