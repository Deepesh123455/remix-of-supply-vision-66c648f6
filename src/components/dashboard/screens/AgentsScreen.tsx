const agents = [
  {
    avatar: "📦", name: "Replenishment & Cut-Plan Agent",
    status: "Running · Checked 8,420 SKUs at 6:00 AM across 47 EBOs + DCs",
    meta: "11 POs + 3 cut orders today · ₹38.4L value",
    logs: [
      { time: "06:00", type: "CHECK", typeColor: "text-info", text: "Scanning all 8,420 SKUs across DCs, 47 EBOs, 180 MBOs against size-curve & DOH thresholds..." },
      { time: "06:01", type: "ALERT", typeColor: "text-warning", text: "Polo Navy (M): 47 EBOs at <2 days cover. DC has 1,800 pcs ready. STO not raised." },
      { time: "06:01", type: "ACTION", typeColor: "text-primary", text: "Generating STO from Ludhiana DC → 41 EBOs (size-curve M:60% L:25% S:15%) = 1,750 pcs" },
      { time: "06:02", type: "SENT", typeColor: "text-success", text: "STO #STO-2047 released. WhatsApp to 41 store managers + DC dispatch team. ETA Apr 10." },
      { time: "06:03", type: "ALERT", typeColor: "text-warning", text: "Crew Sweatshirt Grey (L): 120 pcs network. 1 day cover. CRITICAL. Auto-issuing cut order to Unit 2." },
      { time: "06:04", type: "SENT", typeColor: "text-success", text: "Cut order CO-2048 → Unit 2 (Ludhiana). 4,000 pcs. Fabric available. Dispatch Apr 14." },
      { time: "06:05", type: "CHECK", typeColor: "text-info", text: "Checking Printed Kurti Pink (L) demand spike... +62% sell-through. Wedding carryover pattern: CONFIRMED." },
      { time: "06:06", type: "ACTION", typeColor: "text-primary", text: "Cut size 2,400 pcs requires merchandising approval (>₹6L). Alert pushed to dashboard." },
    ],
  },
  {
    avatar: "📊", name: "Forecast & Buying Agent",
    status: "Running · Retraining on Apr sell-through across PAN India stores",
    meta: "91.4% accuracy · Updated daily",
    logs: [
      { time: "05:00", type: "CHECK", typeColor: "text-info", text: "Pulling 90 days sell-through from Maplemonk + EasyEcom + EBO POS feeds..." },
      { time: "05:02", type: "CHECK", typeColor: "text-info", text: "Cross-referencing returns, size-curve drift, wedding/Eid calendar, regional seasonal demand..." },
      { time: "05:08", type: "ACTION", typeColor: "text-primary", text: "Detected Eid in 18 days + wedding peak in 12 days. Multiplier applied to 14 ethnic + festive styles." },
      { time: "05:12", type: "DONE", typeColor: "text-success", text: "Forecast updated. Printed Kurti Pink flagged as high-confidence spike. Sherwani-style Kurta added to watch list." },
      { time: "05:14", type: "ACTION", typeColor: "text-primary", text: "Tirupur cotton-mélange yarn rising +8% wholesale. Flagged for immediate fabric pre-buy before AW'25 sampling." },
      { time: "05:16", type: "ACTION", typeColor: "text-primary", text: "AW'25 capsule buying plan drafted: 132 styles, ₹2.4Cr cut budget. Awaiting merchandiser review." },
    ],
  },
  {
    avatar: "🤝", name: "Vendor & Order Follow-up Agent",
    status: "Running · Monitoring 18 open POs + 4 inter-city bulk shipments",
    meta: "5 follow-ups sent today",
    logs: [
      { time: "08:00", type: "CHECK", typeColor: "text-info", text: "Checking lot status across 18 open POs (yarn, print, CMT) + 4 inter-city bulk shipments to franchise stores..." },
      { time: "08:01", type: "ALERT", typeColor: "text-warning", text: "Lot #PR-2041 (Punjab Print House, sublimation) — Expected Apr 4. Now Apr 10. 6 days late." },
      { time: "08:02", type: "ACTION", typeColor: "text-primary", text: 'Sending WhatsApp follow-up to Punjab Print House (+91-98765-11230): "Lot #PR-2041 dispatch ETA?"' },
      { time: "08:04", type: "ALERT", typeColor: "text-warning", text: "Bulk Order #BLK-118 (Indore franchise) — Tirupur fabric vendor missed dispatch. Delivery SLA at risk Apr 22." },
      { time: "10:02", type: "ACTION", typeColor: "text-primary", text: "No response from Punjab Print House after 2 hours. Sending second WhatsApp + email. Flagging for human escalation." },
      { time: "11:30", type: "ALERT", typeColor: "text-warning", text: "Suggesting alternate sublimation vendor: Sonipat Print Co. (96 reliability score). Raising alert on dashboard." },
    ],
  },
];

const AgentsScreen = () => (
  <div>
    <div className="mb-7">
      <h1 className="text-xl font-bold text-text-heading">⬡ Active AI Agents</h1>
      <p className="text-sm text-muted-foreground mt-1">Autonomous agents running 24/7 across factories, DCs, EBOs, MBOs & franchise partners</p>
    </div>

    <div className="space-y-4">
      {agents.map((agent) => (
        <div key={agent.name} className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-warning flex items-center justify-center text-lg">{agent.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-text-heading">{agent.name}</div>
              <div className="text-[11px] text-success flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse-dot" />
                {agent.status}
              </div>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline">{agent.meta}</span>
          </div>
          <div className="p-5 space-y-0.5 font-mono text-[11px]">
            {agent.logs.map((log, i) => (
              <div key={i} className="flex gap-2.5 py-1 animate-in fade-in duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-muted-foreground/40 w-10 shrink-0">{log.time}</span>
                <span className={`${log.typeColor} w-14 shrink-0 font-semibold`}>{log.type}</span>
                <span className="text-foreground/80 flex-1 min-w-0 break-words">{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AgentsScreen;
