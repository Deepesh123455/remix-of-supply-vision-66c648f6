import { Button } from "@/components/ui/button";
import StatCard from "../shared/StatCard";
import type { ScreenName } from "../DashboardLayout";

interface Props {
  onShowModal: () => void;
  onNavigate: (s: ScreenName) => void;
}

const rows = [
  { name: "Polo Tee · Navy · M (Men)", sku: "MEN-PLO-NVY-M", cat: "Menswear · Knits", stock: "560 pcs", pct: 8, days: "1.8 days", daysColor: "text-destructive", reorder: "3,000 pcs", reorderColor: "text-primary", status: "REFILL", statusType: "critical" as const, action: "Trigger STO" },
  { name: "Printed Kurti · Pink · L (Women)", sku: "WMN-KRTI-PNK-L", cat: "Womenswear · Ethnic", stock: "240 pcs", pct: 12, days: "3 days", daysColor: "text-destructive", reorder: "2,400 pcs", reorderColor: "text-primary", status: "CUT NOW", statusType: "critical" as const, action: "Approve cut" },
  { name: "Crew-Neck Sweatshirt · Grey · L", sku: "MEN-SWS-GRY-L", cat: "Menswear · Winter", stock: "120 pcs", pct: 6, days: "1 day", daysColor: "text-destructive", reorder: "4,000 pcs", reorderColor: "text-primary", status: "CRITICAL", statusType: "critical" as const, action: "Auto-cut" },
  { name: "Anarkali Suit · Maroon · M", sku: "WMN-ANRK-MRN-M", cat: "Womenswear · Festive", stock: "420 pcs", pct: 35, days: "9 days", daysColor: "text-warning", reorder: "1,500 pcs", reorderColor: "text-muted-foreground", status: "LOW", statusType: "warning" as const, action: "Plan PO" },
  { name: "Boys Polo · White · 8Y", sku: "JNR-PLO-WHT-08", cat: "Junior · Boys", stock: "1,860 pcs", pct: 78, days: "24 days", daysColor: "text-success", reorder: "—", reorderColor: "text-muted-foreground", status: "HEALTHY", statusType: "success" as const, action: "" },
  { name: "Boys Graphic Tee · Yellow · 10Y", sku: "JNR-GRPHX-YLW-10", cat: "Junior · Boys", stock: "3,240 pcs", pct: 100, days: "110+ days", daysColor: "text-purple", reorder: "STOP", reorderColor: "text-destructive", status: "AGED", statusType: "overstock" as const, action: "Markdown" },
  { name: "Ladies Co-ord Set · Beige · M", sku: "WMN-COORD-BEI-M", cat: "Womenswear · Western", stock: "780 pcs", pct: 62, days: "21 days", daysColor: "text-success", reorder: "800 pcs", reorderColor: "text-muted-foreground", status: "HEALTHY", statusType: "success" as const, action: "" },
];

const badgeMap = {
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  success: "bg-success/10 text-success border-success/20",
  overstock: "bg-purple/10 text-purple border-purple/20",
};

const barColorMap = {
  critical: "bg-destructive",
  warning: "bg-warning",
  success: "bg-success",
  overstock: "bg-purple",
};

const InventoryScreen = ({ onShowModal, onNavigate }: Props) => (
  <div>
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
      <div>
        <h1 className="text-xl font-bold text-text-heading">▦ Inventory Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">8,420 SKUs · 612 styles · 47 EBOs + 180 MBOs + 3 export markets · Synced with Maplemonk 4 min ago</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm" onClick={() => onNavigate("onboard")}>+ Import Excel</Button>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total SKUs" value="8,420" change="+126 new this month" changeType="up" color="success" trend={[8200,8240,8280,8310,8350,8380,8400,8420]} hint="612 styles · 7 segments" onClick={() => onNavigate("forecast")} />
      <StatCard label="Refill Needed (≤3d)" value="142" change="89 EBOs · 53 MBOs" changeType="down" color="destructive" trend={[64,78,92,104,118,124,134,142]} hint="₹86L sales at risk this week" onClick={() => onNavigate("alerts")} />
      <StatCard label="Low Stock (≤9d)" value="318" change="+24 vs yesterday" changeType="warn" color="warning" trend={[260,272,284,290,298,306,312,318]} hint="Plan PO before lead time" onClick={() => onNavigate("alerts")} />
      <StatCard label="Aged Styles (90d+)" value="86" change="₹2.1Cr capital locked" changeType="warn" color="info" trend={[72,74,77,80,82,84,85,86]} hint="Junior + Boys lead" onClick={() => onNavigate("forecast")} />
    </div>

    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <h2 className="text-sm font-bold text-text-heading">All SKUs (Style · Color · Size)</h2>
        <div className="flex gap-2 text-xs flex-wrap">
          <span className="text-muted-foreground">Channel:</span>
          <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20 cursor-pointer text-[11px]">EBOs</span>
          <span className="px-2.5 py-0.5 bg-secondary text-muted-foreground rounded-full border border-border cursor-pointer text-[11px]">MBOs</span>
          <span className="px-2.5 py-0.5 bg-secondary text-muted-foreground rounded-full border border-border cursor-pointer text-[11px]">Export</span>
          <span className="px-2.5 py-0.5 bg-secondary text-muted-foreground rounded-full border border-border cursor-pointer text-[11px]">D2C</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["SKU / Style", "Segment", "Network Stock", "Stock Level", "DOH", "Reorder Qty", "Status", "Action"].map(h => (
                <th key={h} className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-4 py-2.5 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.sku} className="border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-foreground">{row.name}</div>
                  <div className="text-[10px] text-muted-foreground">{row.sku}</div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{row.cat}</td>
                <td className="px-4 py-3 text-xs text-foreground">{row.stock}</td>
                <td className="px-4 py-3">
                  <div className="w-20 h-1 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${barColorMap[row.statusType]}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </td>
                <td className={`px-4 py-3 text-xs font-semibold ${row.daysColor}`}>{row.days}</td>
                <td className={`px-4 py-3 text-xs ${row.reorderColor}`}>{row.reorder}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${badgeMap[row.statusType]}`}>{row.status}</span>
                </td>
                <td className="px-4 py-3">
                  {row.action ? (
                    <button onClick={onShowModal} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors">
                      {row.action}
                    </button>
                  ) : (
                    <span className="text-[11px] text-muted-foreground/50">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default InventoryScreen;
