import { useState } from "react";
import StatCard from "../shared/StatCard";
import AlertItem from "../shared/AlertItem";

type Filter = "all" | "critical" | "warning" | "resolved" | "auto";

const AlertsScreen = ({ onShowModal }: { onShowModal: () => void }) => {
  const [filter, setFilter] = useState<Filter>("all");

  const alerts = [
    { kind: "critical", node: <AlertItem icon="🚨" iconType="critical" title="CRITICAL · Polo Navy (M) — 47 EBOs at zero in 2 days" desc="Network stock: 560 pcs · Sell-through: 312/day · DC has 1,800 pcs ready · STO not raised. Triggering now will refill 41 of 47 EBOs." badge="CRITICAL" badgeType="critical" actionLabel="Trigger STO" onAction={onShowModal} /> },
    { kind: "critical", node: <AlertItem icon="🚨" iconType="critical" title="CRITICAL · Printed Kurti Pink (L) — Demand spike +62% (wedding carryover)" desc="Pattern matched from 2024 Apr–May curve. AI recommends cut order of 2,400 pcs (size-curve attached). Mélange yarn in stock." badge="CRITICAL" badgeType="critical" actionLabel="Approve cut" onAction={onShowModal} /> },
    { kind: "critical", node: <AlertItem icon="🚨" iconType="critical" title="CRITICAL · Crew Sweatshirt Grey (L) — 1 day cover · 12 EBOs out" desc="120 pcs left across network. Pre-AW'25 buyers asking — every stockout day = ₹2.4L lost EBO revenue + brand perception hit." badge="CRITICAL" badgeType="critical" actionLabel="Auto-cut" onAction={onShowModal} /> },
    { kind: "warning", node: <AlertItem icon="⚠️" iconType="warning" title="WARNING · Export Order #EXP-118 (Riyadh) — Fabric vendor 6 days late" desc="Tirupur mélange supplier missed lot dispatch. AI sent 3 WhatsApp follow-ups. LC SLA penalty kicks in Apr 22 if not shipped." badge="LATE" badgeType="warning" actionLabel="Escalate" onAction={onShowModal} /> },
    { kind: "warning", node: <AlertItem icon="⚠️" iconType="warning" title="WARNING · ₹2.1Cr aged inventory — Junior + Boys lines" desc="86 styles haven't moved in 90+ days across 6 warehouses. AI suggests EOSS markdown across EBOs + B2B liquidator route." badge="CASH" badgeType="warning" actionLabel="View list" onAction={onShowModal} /> },
    { kind: "warning", node: <AlertItem icon="⚠️" iconType="warning" title="WARNING · GCC export demand softening — Riyadh & Dubai EBOs" desc="Sell-through down 14% MoM in Saudi & UAE EBOs for Men's casuals. AI recommends pausing next replenishment cycle, re-mixing assortment." badge="CHANNEL" badgeType="warning" actionLabel="Review mix" onAction={onShowModal} /> },
    { kind: "auto", node: <AlertItem icon="ℹ️" iconType="info" title="INFO · AW'25 capsule buying plan ready (132 styles)" desc="AI built the buying plan from last 2 winters' sell-through, returns, and Punjab + GCC weather forecasts. Review before Apr 30." badge="PLAN" badgeType="success" actionLabel="Review plan" actionVariant="success" onAction={onShowModal} /> },
    { kind: "resolved", node: <AlertItem icon="✅" iconType="success" title="RESOLVED · Cut order CO-2244 (Unit 2 Ludhiana) confirmed for Apr 12" desc="Agent auto-confirmed fabric issue + line allocation. 4,800 pcs Round-Neck Tees. GRN auto-logs into DC on dispatch." badge="DONE" badgeType="success" /> },
  ];

  const visible = filter === "all" ? alerts : alerts.filter(a => a.kind === filter);
  const labels: Record<Filter, string> = { all: "All", critical: "Critical", warning: "Warnings", resolved: "Resolved", auto: "Auto-resolved" };

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-xl font-bold text-text-heading">⚡ AI Alerts</h1>
        <p className="text-sm text-muted-foreground mt-1">Live signals across factory, DCs, EBOs, MBOs & export orders</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Critical" value="3" change="+1 in last hour" changeType="down" color="destructive" trend={[1,2,2,3,2,3,3,3]} hint="Refill, cut, export risk" onClick={() => setFilter("critical")} />
        <StatCard label="Warnings" value="6" change="2 awaiting vendor reply" changeType="warn" color="warning" trend={[4,5,5,6,5,6,6,6]} hint="Fabric, channel, aging" onClick={() => setFilter("warning")} />
        <StatCard label="Resolved Today" value="14" change="vs 9 yesterday" changeType="up" color="success" trend={[6,8,9,11,12,13,13,14]} hint="STOs, COs, vendor follow-ups" onClick={() => setFilter("resolved")} />
        <StatCard label="Auto-resolved by AI" value="9" change="64% closure rate" changeType="up" color="info" trend={[3,4,5,6,7,8,8,9]} hint="No human in loop" onClick={() => setFilter("auto")} />
      </div>

      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-sm font-bold text-text-heading">{labels[filter]} Alerts <span className="text-muted-foreground font-normal">· {visible.length}</span></h2>
          {filter !== "all" && (
            <button onClick={() => setFilter("all")} className="text-xs text-primary hover:underline">Clear filter</button>
          )}
        </div>
        {visible.map((a, i) => <div key={i}>{a.node}</div>)}
      </div>
    </div>
  );
};

export default AlertsScreen;
