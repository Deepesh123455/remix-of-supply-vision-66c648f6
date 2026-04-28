import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { toast } from "sonner";
import {
  INVENTORY_ITEMS,
  CRITICAL_ALERTS,
  WARNING_ALERTS,
  SUPPLIERS,
  METRICS,
  TRANSFER_RECOMMENDATIONS,
  createPOForItem,
  createLiquidationOrder,
  generateAIResponse,
  type InventoryItem,
  type StockAlert,
  type Supplier,
  type PODetails,
  type Metrics,
  type TransferRecommendation,
} from "@/data/appData";

export type TransferStatus = "pending" | "approved" | "rejected";
export interface Transfer extends TransferRecommendation {
  status: TransferStatus;
  approvedQty?: number;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

interface AppState {
  metrics: Metrics;
  inventory: InventoryItem[];
  criticalAlerts: StockAlert[];
  warningAlerts: StockAlert[];
  resolvedCount: number;
  suppliers: Supplier[];
  currentPO: PODetails | null;
  chatMessages: ChatMessage[];
  isBotTyping: boolean;
  transfers: Transfer[];
}

interface AppActions {
  openPOForItem: (item: InventoryItem) => void;
  openLiquidationForItem: (item: InventoryItem) => void;
  openCustomPO: (po: PODetails) => void;
  closePO: () => void;
  confirmPO: () => void;
  resolveAlert: (id: string, successMsg?: string) => void;
  resolveWarning: (id: string, successMsg?: string) => void;
  toggleSupplierAutoPilot: (supplierId: string) => void;
  sendChatMessage: (text: string) => void;
  approveTransfer: (id: string, qty: number) => void;
  rejectTransfer: (id: string) => void;
}

const AppContext = createContext<(AppState & AppActions) | null>(null);

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    sender: "bot",
    text: "🚨 URGENT — Polo Navy (M)\n\n• 47 stores have less than 2 days of stock\n• Current daily sales: 312 pieces\n• Warehouse stock ready: 1,800 pieces\n\nRecommended: Move 1,750 pieces to 41 stores right now.\n\nShall I initiate this transfer?",
    time: "09:14 AM",
  },
  {
    id: "init-2",
    sender: "user",
    text: "Haan release karo",
    time: "09:15 AM",
  },
  {
    id: "init-3",
    sender: "bot",
    text: "✅ Stock Transfer #STO-2047 RELEASED\n\n• 41 store managers notified via WhatsApp\n• Warehouse dispatch scheduled for 2:00 PM\n• Stores will receive stock by Apr 10\n\nTotal value moved: ₹6.3 Lakh\n\nNote: Grey Sweatshirt (L) is also at 1-day cover. Send manufacturing order to Unit 2?",
    time: "09:15 AM",
  },
  {
    id: "init-4",
    sender: "user",
    text: "Haan, aur aaj ka summary bhi de",
    time: "09:16 AM",
  },
  {
    id: "init-5",
    sender: "bot",
    text: "📊 Today's Summary:\n\n• Sales today: ₹6.8 Lakh ✅\n• Urgent issues: 3 (need your attention)\n• Problems solved by AI: 14\n• Orders placed automatically: 11 (worth ₹38.4 Lakh)\n• Forecast accuracy: 91.4% 🎯\n\nOld stock worth ₹2.1 Crore sitting for 90+ days — want me to set up a clearance sale?",
    time: "09:16 AM",
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [criticalAlerts, setCriticalAlerts] = useState<StockAlert[]>(CRITICAL_ALERTS);
  const [warningAlerts, setWarningAlerts] = useState<StockAlert[]>(WARNING_ALERTS);
  const [resolvedCount, setResolvedCount] = useState(14);
  const [suppliers, setSuppliers] = useState<Supplier[]>(SUPPLIERS);
  const [currentPO, setCurrentPO] = useState<PODetails | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [transfers, setTransfers] = useState<Transfer[]>(
    TRANSFER_RECOMMENDATIONS.map(t => ({ ...t, status: "pending" as const }))
  );

  const metrics: Metrics = {
    ...METRICS,
    itemsNeedRestock: criticalAlerts.length * 47 + warningAlerts.length * 10,
  };

  const openPOForItem = useCallback((item: InventoryItem) => {
    setCurrentPO(createPOForItem(item));
  }, []);

  const openLiquidationForItem = useCallback((item: InventoryItem) => {
    setCurrentPO(createLiquidationOrder(item));
  }, []);

  const openCustomPO = useCallback((po: PODetails) => {
    setCurrentPO(po);
  }, []);

  const closePO = useCallback(() => setCurrentPO(null), []);

  const confirmPO = useCallback(() => {
    if (!currentPO) return;
    const msg = currentPO.toastMsg;
    setCurrentPO(null);
    toast.success(msg, { duration: 4000 });
  }, [currentPO]);

  const resolveAlert = useCallback((id: string, successMsg?: string) => {
    const alert = CRITICAL_ALERTS.find(a => a.id === id);
    setCriticalAlerts(prev => prev.filter(a => a.id !== id));
    setResolvedCount(prev => prev + 1);
    if (alert?.linkedItemId) {
      setInventory(prev => prev.map(item =>
        item.id === alert.linkedItemId
          ? { ...item, status: "healthy" as const, daysLeft: item.daysLeft + 12 }
          : item
      ));
    }
    toast.success(successMsg || "Action taken! AI will follow up automatically.", { duration: 4000 });
  }, []);

  const resolveWarning = useCallback((id: string, successMsg?: string) => {
    setWarningAlerts(prev => prev.filter(a => a.id !== id));
    setResolvedCount(prev => prev + 1);
    toast.success(successMsg || "Done! Team has been notified.", { duration: 4000 });
  }, []);

  const toggleSupplierAutoPilot = useCallback((supplierId: string) => {
    setSuppliers(prev => prev.map(s => {
      if (s.id !== supplierId) return s;
      const next = !s.autoPilot;
      toast(next
        ? `✅ Auto-ordering turned ON for ${s.name}`
        : `⏸️ Auto-ordering turned OFF for ${s.name} — you'll approve orders manually`,
        { duration: 3000 }
      );
      return { ...s, autoPilot: next };
    }));
  }, []);

  const approveTransfer = useCallback((id: string, qty: number) => {
    setTransfers(prev => prev.map(t =>
      t.id === id ? { ...t, status: "approved" as const, approvedQty: qty } : t
    ));
  }, []);

  const rejectTransfer = useCallback((id: string) => {
    setTransfers(prev => prev.map(t =>
      t.id === id ? { ...t, status: "rejected" as const } : t
    ));
    toast("Transfer declined — stock stays in place.", { duration: 3000 });
  }, []);

  const sendChatMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      time: now,
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsBotTyping(true);

    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      const responseText = generateAIResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages(prev => [...prev, botMsg]);
      setIsBotTyping(false);
    }, delay);
  }, []);

  return (
    <AppContext.Provider value={{
      metrics,
      inventory,
      criticalAlerts,
      warningAlerts,
      resolvedCount,
      suppliers,
      currentPO,
      chatMessages,
      isBotTyping,
      openPOForItem,
      openLiquidationForItem,
      openCustomPO,
      closePO,
      confirmPO,
      resolveAlert,
      resolveWarning,
      toggleSupplierAutoPilot,
      sendChatMessage,
      transfers,
      approveTransfer,
      rejectTransfer,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
