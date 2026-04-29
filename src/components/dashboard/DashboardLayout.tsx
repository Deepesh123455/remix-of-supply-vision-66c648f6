import { useState, useEffect, useRef } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashboardScreen from "./screens/DashboardScreen";
import AlertsScreen from "./screens/AlertsScreen";
import InventoryScreen from "./screens/InventoryScreen";
import ForecastScreen from "./screens/ForecastScreen";
import SuppliersScreen from "./screens/SuppliersScreen";
import AgentsScreen from "./screens/AgentsScreen";
import WhatsAppScreen from "./screens/WhatsAppScreen";
import OnboardScreen from "./screens/OnboardScreen";
import TransferScreen from "./screens/TransferScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import POModal from "./POModal";

export type ScreenName = "dashboard" | "alerts" | "inventory" | "forecast" | "suppliers" | "agents" | "whatsapp" | "onboard" | "transfer" | "orderHistory";

const Inner = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenName>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { metrics, criticalAlerts, transfers, unreadOrderCount, resetOrderCount } = useApp();
  const pendingTransferCount = transfers.filter(t => t.status === "pending").length;
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [activeScreen]);

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":  return <DashboardScreen onNavigate={setActiveScreen} />;
      case "alerts":     return <AlertsScreen />;
      case "inventory":  return <InventoryScreen onNavigate={setActiveScreen} />;
      case "forecast":   return <ForecastScreen />;
      case "suppliers":  return <SuppliersScreen />;
      case "agents":     return <AgentsScreen />;
      case "whatsapp":   return <WhatsAppScreen />;
      case "onboard":    return <OnboardScreen />;
      case "transfer":     return <TransferScreen />;
      case "orderHistory": return <OrderHistoryScreen />;
      default:             return <DashboardScreen onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeScreen={activeScreen}
          onNavigate={(screen) => {
            setActiveScreen(screen);
            setSidebarOpen(false);
            if (screen === "orderHistory") resetOrderCount();
          }}
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          alertCount={criticalAlerts.length}
          transferCount={pendingTransferCount}
          orderHistoryCount={unreadOrderCount}
        />

        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="bg-gradient-to-r from-background via-secondary/10 to-background border-b border-border/40 px-6 py-3 flex items-center gap-3 md:gap-4 overflow-x-auto shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2 shrink-0 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Live Sync</span>
            </div>
            
            <div className="h-4 w-px bg-border/60 mx-1 md:mx-2 hidden sm:block shrink-0"></div>
            
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 -mb-1">
              <TickerItem label="Stock Value" value={metrics.totalInventory} />
              <TickerItem label="Sales Today" value={metrics.sellThroughToday} />
              <TickerItem label="AI Accuracy" value={metrics.forecastAccuracy} />
              <TickerItem label="Alerts" value={String(criticalAlerts.length) + " Action Needed"} highlight={criticalAlerts.length > 0} />
            </div>
          </div>

          <div className="p-4 md:p-6 animate-in fade-in duration-300">
            {renderScreen()}
          </div>
        </main>
      </div>

      <POModal />
    </div>
  );
};

const DashboardLayout = () => (
  <AppProvider>
    <Inner />
  </AppProvider>
);

const TickerItem = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 rounded-full transition-all duration-300 border ${
    highlight 
      ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 shadow-sm" 
      : "bg-white dark:bg-card border-border/50 shadow-sm hover:border-border hover:shadow"
  }`}>
    <span className={`text-[11px] font-medium ${highlight ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground"}`}>
      {label}
    </span>
    <span className={`text-xs font-bold ${highlight ? "text-amber-700 dark:text-amber-400" : "text-foreground"}`}>
      {value}
    </span>
  </div>
);

export default DashboardLayout;
