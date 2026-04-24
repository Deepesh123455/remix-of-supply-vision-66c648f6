import { Button } from "@/components/ui/button";
import StatCard from "../shared/StatCard";
import AlertItem from "../shared/AlertItem";
import type { ScreenName } from "../DashboardLayout";

interface Props {
  onShowModal: () => void;
  onNavigate: (s: ScreenName) => void;
}

const DashboardScreen = ({ onShowModal, onNavigate }: Props) => (
  <div>
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
      <div>
        <h1 className="text-xl font-bold text-text-heading">Good morning, Ramesh ji 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Tuesday, 8 Apr · 3 agents working across factory, EBOs & exports</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate("onboard")}>+ Connect Maplemonk</Button>
        <Button size="sm" onClick={onShowModal}>📦 Raise PO</Button>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Inventory Value"
        value="₹14.2Cr"
        change="+₹46L WoW"
        changeType="up"
        color="success"
        trend={[12.8, 13.1, 13.0, 13.4, 13.6, 13.9, 13.74, 14.2]}
        hint="Across 6 DCs · 47 EBOs · 180 MBOs"
        onClick={() => onNavigate("inventory")}
      />
      <StatCard
        label="Size Breaks · Network"
        value="142"
        change="+38 vs yesterday"
        changeType="down"
        color="destructive"
        trend={[64, 78, 88, 92, 104, 121, 104, 142]}
        hint="89 EBOs · 53 MBOs need refill"
        onClick={() => onNavigate("alerts")}
      />
      <StatCard
        label="Aged Stock · 90d+"
        value="₹2.1Cr"
        change="14.7% of inventory locked"
        changeType="warn"
        color="warning"
        trend={[1.6, 1.7, 1.75, 1.82, 1.9, 1.95, 2.04, 2.1]}
        hint="86 styles · Junior + Boys lead"
        onClick={() => onNavigate("inventory")}
      />
      <StatCard
        label="Factory POs · MTD"
        value="86"
        change="41 auto-cut by AI"
        changeType="up"
        color="info"
        trend={[42, 51, 58, 63, 69, 74, 80, 86]}
        hint="Avg cycle 11.4d · OTIF 92%"
        onClick={() => onNavigate("agents")}
      />
    </div>

    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
      {/* Alerts */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h2 className="text-sm font-bold text-text-heading">⚡ AI Alerts — Action Required</h2>
          <span className="text-xs text-muted-foreground">9 open · 3 critical</span>
        </div>
        <AlertItem icon="🚨" iconType="critical" title="MEN-PLO-NVY-M (Polo Tee · Navy · M) — Refill 47 EBOs in 2 days" desc="Avg DOH: 1.8 days · Daily sell-through: 312 pcs across 47 EBOs · Factory WIP: 1,800 pcs ready. Trigger transfer order from Ludhiana DC?" time="2m ago" actionLabel="Trigger STO →" onAction={onShowModal} />
        <AlertItem icon="🚨" iconType="critical" title="WMN-KRTI-PNK-L (Printed Kurti · Pink · L) — Demand spike +62%" desc="Wedding-season carryover. AI recommends cutting fresh lot of 2,400 pcs (size-curve attached). Yarn available — 6 day lead." time="15m ago" actionLabel="Approve cut →" onAction={onShowModal} />
        <AlertItem icon="⚠️" iconType="warning" title="Export Order #EXP-118 (Riyadh) — Fabric vendor 6 days late" desc="Mélange yarn lot from Tirupur supplier delayed. AI sent 3 WhatsApp follow-ups. Risk: shipment SLA breach by Apr 22 (LC penalty)." time="1h ago" actionLabel="Escalate vendor" onAction={onShowModal} />
        <AlertItem icon="⚠️" iconType="warning" title="Aged-stock alert — JNR-GRPHX-YLW (Boys Graphic Tee Yellow)" desc="₹18.4L worth across 6 warehouses, 110+ days old · Sell-through 4 pcs/week. Suggest: EOSS push on EBOs + B2B liquidator route" time="3h ago" actionLabel="Plan markdown" onAction={onShowModal} />
        <AlertItem icon="✅" iconType="success" title="Cut order CO-2244 confirmed — In-house Unit 2 (Ludhiana)" desc="4,800 pcs Round-Neck Tees (asst. sizes) · Fabric issued · Dispatch to DC: Apr 12 · ₹14,40,000" time="4h ago" actionLabel="View order" actionVariant="success" onAction={onShowModal} />
      </div>

      {/* Right column */}
      <div className="space-y-4">
        {/* Cash breakdown */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h2 className="text-sm font-bold text-text-heading">💰 Inventory Health</h2>
          </div>
          <div className="p-5 space-y-3">
            <ProgressBar label="Best Sellers (0–60d)" value="₹9.4Cr" percent={66} color="bg-success" />
            <ProgressBar label="Slow Movers (60–90d)" value="₹2.7Cr" percent={19} color="bg-warning" />
            <ProgressBar label="Aged / Dead (90d+)" value="₹2.1Cr" percent={15} color="bg-destructive" />
            <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-lg text-xs text-foreground leading-relaxed">
              🤖 <strong>AI says:</strong> Liquidating aged Junior + Boys lines via EOSS this month frees up <span className="text-primary font-bold">₹2.1Cr</span> working capital — enough to pre-cut your AW'25 capsule before yarn prices rise.
            </div>
          </div>
        </div>

        {/* Forecast mini */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <h2 className="text-sm font-bold text-text-heading">📊 30-Day Sell-through</h2>
            <div className="flex gap-3 text-[10px]">
              <span className="text-info">■ Actual</span>
              <span className="text-primary">⬚ Forecast</span>
            </div>
          </div>
          <div className="p-5">
            <ForecastChart />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ label, value, percent, color }: { label: string; value: string; percent: number; color: string }) => (
  <div>
    <div className="flex justify-between text-xs mb-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
    </div>
  </div>
);

const ForecastChart = () => {
  const data = [
    { actual: 70 }, { actual: 85 }, { actual: 65 }, { actual: 90 },
    { actual: 78 }, { actual: 95 }, { actual: 88 },
    { forecast: 100 }, { forecast: 115 }, { forecast: 130 },
  ];
  const labels = ["Mar 1", "", "Mar 10", "", "Mar 20", "", "Apr 1", "", "Apr 10", ""];
  const max = 130;

  return (
    <div>
      <div className="flex items-end gap-1.5 h-28">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex items-end">
            <div
              className={`w-full rounded-t-sm transition-all ${
                d.actual ? "bg-info/50" : "bg-primary/30 border border-dashed border-primary/50"
              }`}
              style={{ height: `${((d.actual || d.forecast || 0) / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground/60">
        {labels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
};

export default DashboardScreen;
