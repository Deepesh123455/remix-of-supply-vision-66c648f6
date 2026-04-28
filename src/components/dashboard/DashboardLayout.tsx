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
import POModal from "./POModal";

export type ScreenName = "dashboard" | "alerts" | "inventory" | "forecast" | "suppliers" | "agents" | "whatsapp" | "onboard" | "transfer";

const Inner = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenName>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { metrics, criticalAlerts, transfers } = useApp();
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
      case "transfer":   return <TransferScreen />;
      default:           return <DashboardScreen onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeScreen={activeScreen}
          onNavigate={(screen) => { setActiveScreen(screen); setSidebarOpen(false); }}
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          alertCount={criticalAlerts.length}
          transferCount={pendingTransferCount}
        />

        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="bg-primary/5 border-b border-primary/10 px-6 py-2.5 flex items-center gap-8 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Live</span>
            </div>
            <TickerItem label="Stock Value" value={metrics.totalInventory} />
            <TickerItem label="Sales Today" value={metrics.sellThroughToday} />
            <TickerItem label="AI Accuracy" value={metrics.forecastAccuracy} />
            <TickerItem label="Alerts" value={String(criticalAlerts.length) + " urgent"} highlight={criticalAlerts.length > 0} />
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
  <div className="flex gap-2 whitespace-nowrap items-center">
    <span className="text-[11px] text-muted-foreground font-medium">{label}:</span>
    <span className={`text-[11px] font-bold ${highlight ? "text-destructive" : "text-foreground"}`}>{value}</span>
  </div>
);

export default DashboardLayout;
