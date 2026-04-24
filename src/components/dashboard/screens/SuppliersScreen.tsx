import { Button } from "@/components/ui/button";
import StatCard from "../shared/StatCard";

const suppliers = [
  { avatar: "🧶", name: "Tirupur Mélange Yarns Co.", meta: "Mélange & combed yarn · 22 SKUs · Avg lead: 8 days · Last lot Apr 2", score: 96, scoreColor: "text-success" },
  { avatar: "🎨", name: "Punjab Print House — Ludhiana", meta: "Sublimation & rotary prints · 14 styles · Avg lead: 6 days · Lot #PR-2041 LATE ⚠️", score: 72, scoreColor: "text-warning" },
  { avatar: "🪡", name: "Unit 2 — In-house Knitting (Ludhiana)", meta: "Knit fabric · 18 GSM ranges · Avg lead: 4 days · 99% on-time", score: 98, scoreColor: "text-success" },
  { avatar: "👖", name: "Surat Bottoms CMT — Surat", meta: "Trousers & joggers stitching · Avg lead: 14 days · 2 late lots this month", score: 54, scoreColor: "text-destructive" },
  { avatar: "🏷️", name: "Delhi Trims & Labels Pvt Ltd", meta: "Labels, hangtags, polybags · Avg lead: 5 days · Reliable", score: 94, scoreColor: "text-success" },
  { avatar: "🚢", name: "Riyadh Logistics Partner (3PL)", meta: "GCC export forwarding · Dubai + Riyadh DC · Avg transit: 9 days", score: 89, scoreColor: "text-success" },
];

const autoPilot = [
  { name: "Tirupur Mélange Yarns", status: "✓ Auto PO ON", color: "text-success" },
  { name: "Unit 2 (In-house knit)", status: "✓ Auto cut ON", color: "text-success" },
  { name: "Punjab Print House", status: "⚠ Paused (late)", color: "text-warning" },
  { name: "Surat Bottoms CMT", status: "Manual review", color: "text-muted-foreground/50" },
];

const waLog = [
  { time: "09:14", type: "SENT", typeColor: "text-success", msg: "Cut order to Unit 2 — 4,800 pcs Round-Neck Tee (asst.)" },
  { time: "09:18", type: "RCVD", typeColor: "text-info", msg: 'Unit 2: "Fabric issued, line 3 allocated. Dispatch Apr 12"' },
  { time: "10:02", type: "SENT", typeColor: "text-warning", msg: "Follow-up to Punjab Print House — Lot #PR-2041 status?" },
  { time: "11:30", type: "WAIT", typeColor: "text-destructive", msg: "Punjab Print House — No response yet (4hrs)" },
];

const SuppliersScreen = () => (
  <div>
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
      <div>
        <h1 className="text-xl font-bold text-text-heading">◎ Vendor & CMT Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">64 active vendors · 2 in-house units · 4 CMT partners · AI monitoring lots & quality</p>
      </div>
      <Button size="sm">+ Add Vendor</Button>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="On-Time Delivery" value="74%" color="success" />
      <StatCard label="Late Lots (Active)" value="11" color="destructive" />
      <StatCard label="Auto POs Sent" value="86" change="This month" changeType="up" color="info" />
      <StatCard label="Pending Acknowledgements" value="8" color="warning" />
    </div>

    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h2 className="text-sm font-bold text-text-heading">Vendor Scoreboard</h2>
          <span className="text-xs text-muted-foreground">AI-ranked by reliability + quality + lead time</span>
        </div>
        {suppliers.map((s) => (
          <div key={s.name} className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-base shrink-0">{s.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">{s.name}</div>
              <div className="text-[11px] text-muted-foreground">{s.meta}</div>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-lg font-bold ${s.scoreColor}`}>{s.score}</div>
              <div className="text-[10px] text-muted-foreground">Reliability</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h2 className="text-sm font-bold text-text-heading">🤖 Auto-Pilot Status</h2>
          </div>
          <div className="p-5 space-y-3">
            {autoPilot.map((a) => (
              <div key={a.name} className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{a.name}</span>
                <span className={a.color}>{a.status}</span>
              </div>
            ))}
            <div className="mt-3 p-3 bg-success/5 border border-success/15 rounded-lg text-[11px] text-foreground leading-relaxed">
              🤖 AI sent <strong>11 POs + 3 cut orders</strong> automatically today. Total value: <span className="text-success font-bold">₹38.4L</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h2 className="text-sm font-bold text-text-heading">📱 WhatsApp Log</h2>
          </div>
          <div className="p-4 space-y-0">
            {waLog.map((l, i) => (
              <div key={i} className="flex gap-2 py-1.5 border-b border-border last:border-b-0 text-[11px]">
                <span className="text-muted-foreground/50 w-10 shrink-0">{l.time}</span>
                <span className={`${l.typeColor} w-12 shrink-0 font-medium`}>{l.type}</span>
                <span className="text-foreground">{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SuppliersScreen;
