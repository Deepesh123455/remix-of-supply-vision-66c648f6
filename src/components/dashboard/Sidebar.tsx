import { X } from "lucide-react";
import type { ScreenName } from "./DashboardLayout";

interface SidebarProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  mobileOpen: boolean;
  onClose: () => void;
  alertCount?: number;
  transferCount?: number;
}

const Sidebar = ({ activeScreen, onNavigate, mobileOpen, onClose, alertCount = 0, transferCount = 0 }: SidebarProps) => {
  const navItems: {
    section: string;
    items: { icon: string; label: string; screen: ScreenName; badge?: string; badgeColor?: string }[];
  }[] = [
      {
        section: "Overview",
        items: [
          { icon: "◈", label: "Dashboard", screen: "dashboard" },
          {
            icon: "⚡",
            label: "Alerts",
            screen: "alerts",
            badge: alertCount > 0 ? String(alertCount) : undefined,
          },
        ],
      },
      {
        section: "Manage",
        items: [
          { icon: "▦", label: "Stock Overview", screen: "inventory" },
          { icon: "⇄", label: "Store Transfers", screen: "transfer", badge: transferCount > 0 ? String(transferCount) : undefined },
          { icon: "∿", label: "Sales Forecast", screen: "forecast" },
          { icon: "◎", label: "Vendors", screen: "suppliers", badge: "2", badgeColor: "warning" },
        ],
      },
      {
        section: "AI Working",
        items: [
          { icon: "⬡", label: "AI Agents", screen: "agents", badge: "3", badgeColor: "success" },
          { icon: "✦", label: "WhatsApp Bot", screen: "whatsapp" },
        ],
      },
      {
        section: "Setup",
        items: [
          { icon: "⊕", label: "Connect Your Data", screen: "onboard" },
        ],
      },
    ];

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 md:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed md:relative z-50 md:z-auto
        w-56 bg-card border-r border-border
        flex flex-col h-full md:h-auto
        transition-transform duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="md:hidden flex justify-end p-3">
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1">
          {navItems.map((section) => (
            <div key={section.section} className="px-3 mb-1">
              <div className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground/60 px-2 py-2 font-medium">
                {section.section}
              </div>
              {section.items.map((item) => (
                <button
                  key={item.screen}
                  onClick={() => onNavigate(item.screen)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-colors mb-0.5 ${activeScreen === item.screen
                      ? "bg-sidebar-accent text-primary font-medium border border-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                >
                  <span className="w-5 text-center text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-primary-foreground ${item.badgeColor === "success" ? "bg-success" :
                        item.badgeColor === "warning" ? "bg-warning text-foreground" :
                          "bg-primary"
                      }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">AI Online</span>
          </div>
          <div className="text-foreground font-semibold text-[11px]">Claude 3.5 Sonnet</div>
          <div className="text-muted-foreground/60 text-[10px] mt-0.5 leading-tight">Watching 47 stores · 24/7</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
