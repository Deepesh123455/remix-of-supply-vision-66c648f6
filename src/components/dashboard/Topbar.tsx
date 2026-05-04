import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Topbar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => (
  <header className="h-14 bg-card border-b border-border flex items-center px-4 md:px-6 gap-4 shrink-0">
    <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleSidebar}>
      <Menu className="h-5 w-5" />
    </Button>

    <div className="flex flex-col   min-w-0 shrink-0 sm:shrink">

      <Link to="/" className="font-bold text-md text-text-heading tracking-tight truncate">DemandIQ</Link>
      <span className="text-[11px] text-muted-foreground  hidden sm:inline">powered by InvisibleCTO</span>

    </div>

    <div className="flex-1 flex justify-center">
      <div className="bg-success/10 border border-success/30 text-success text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse-dot" />
        3 agents running
      </div>
    </div>

    <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
      <span>Northbound Knitwear Pvt Ltd</span>
      <span className="bg-secondary border border-border px-3 py-1 rounded-md text-[11px] text-foreground">
        Casual-wear Manufacturer · 47 EBOs · PAN India · Ludhiana
      </span>
    </div>
  </header>
);

export default Topbar;
