import { useState } from "react";
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
import POModal from "./POModal";

export type ScreenName = "dashboard" | "alerts" | "inventory" | "forecast" | "suppliers" | "agents" | "whatsapp" | "onboard";

const DashboardLayout = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenName>("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard": return <DashboardScreen onShowModal={() => setModalOpen(true)} onNavigate={setActiveScreen} />;
      case "alerts": return <AlertsScreen onShowModal={() => setModalOpen(true)} />;
      case "inventory": return <InventoryScreen onShowModal={() => setModalOpen(true)} onNavigate={setActiveScreen} />;
      case "forecast": return <ForecastScreen />;
      case "suppliers": return <SuppliersScreen />;
      case "agents": return <AgentsScreen />;
      case "whatsapp": return <WhatsAppScreen />;
      case "onboard": return <OnboardScreen />;
      default: return <DashboardScreen onShowModal={() => setModalOpen(true)} onNavigate={setActiveScreen} />;
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
        />

        <main className="flex-1 overflow-y-auto">
          {/* Ticker */}
          <div className="bg-primary/5 border-b border-primary/10 px-6 py-2 flex gap-8 overflow-x-auto text-xs">
            <TickerItem label="SKUs Tracked" value="8,420" />
            <TickerItem label="Today's Sell-out" value="+₹6.8L" variant="up" />
            <TickerItem label="EBO Size Breaks" value="142 SKUs" variant="down" />
            <TickerItem label="Auto Cut/PO Orders" value="14 today" variant="up" />
            <TickerItem label="Aged Stock (90d+)" value="₹2.1Cr" variant="down" />
            <TickerItem label="Forecast Accuracy" value="91.4%" variant="up" />
          </div>

          <div className="p-6 animate-in fade-in duration-300">
            {renderScreen()}
          </div>
        </main>
      </div>

      <POModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

const TickerItem = ({ label, value, variant }: { label: string; value: string; variant?: "up" | "down" }) => (
  <div className="flex gap-2 whitespace-nowrap">
    <span className="text-muted-foreground">{label}:</span>
    <span className={variant === "up" ? "text-success font-medium" : variant === "down" ? "text-destructive font-medium" : "text-foreground font-medium"}>
      {value}
    </span>
  </div>
);

export default DashboardLayout;
