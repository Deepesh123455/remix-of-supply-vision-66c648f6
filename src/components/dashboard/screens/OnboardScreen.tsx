import { useState } from "react";

const connectors = [
  { icon: "📊", name: "Tally Prime", desc: "Auto-sync inventory & ledger", connected: true },
  { icon: "🧵", name: "Maplemonk", desc: "Apparel ERP & production", connected: false },
  { icon: "📦", name: "EasyEcom", desc: "Multi-channel order & inventory", connected: false },
  { icon: "🛒", name: "Shopify / WooCommerce", desc: "Online store inventory", connected: false },
  { icon: "👗", name: "Unicommerce", desc: "Warehouse & marketplace sync", connected: false },
  { icon: "🛍️", name: "Marketplace", desc: "Amazon, Myntra, Flipkart, Ajio", connected: false },
  { icon: "📱", name: "WhatsApp Business", desc: "Orders & supplier comms", connected: false },
  { icon: "🧾", name: "GST Portal", desc: "Auto-verify invoices", connected: false },
  { icon: "🏭", name: "WFX (World Fashion Exchange)", desc: "PLM for apparel manufacturers", connected: false },
];

const OnboardScreen = () => {
  const [connections, setConnections] = useState(connectors.map(c => c.connected));
  const [uploaded, setUploaded] = useState(false);

  return (
    <div>
      <div className="text-center pt-8 pb-8">
        <h1 className="text-3xl font-extrabold text-text-heading tracking-tight leading-tight mb-3">
          Plug in your data.<br /><em className="text-primary font-bold not-italic">Boom.</em> AI takes over.
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Connect your existing tools or drop your Excel files. No technical knowledge needed. Our AI reads your data, understands your business, and starts working immediately.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Step 1 — Connect Your Software</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {connectors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setConnections(prev => prev.map((v, j) => j === i ? !v : v))}
              className={`relative p-5 rounded-xl border text-center transition-all hover:-translate-y-0.5 ${
                connections[i]
                  ? "border-success bg-success/5 shadow-card"
                  : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              {connections[i] && <span className="absolute top-2.5 right-2.5 text-success text-xs">✓</span>}
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-xs font-bold text-foreground">{c.name}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{c.desc}</div>
            </button>
          ))}
        </div>

        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Step 2 — Or Just Drop Your Files</h3>

        {!uploaded ? (
          <div
            onClick={() => setUploaded(true)}
            className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="text-3xl mb-3">📂</div>
            <div className="text-sm font-bold text-foreground mb-1.5">Drop your Excel / CSV files here</div>
            <div className="text-xs text-muted-foreground mb-4">Stock register, purchase orders, sales data — anything you have</div>
            <div className="flex gap-2 justify-center flex-wrap">
              {[".xlsx", ".csv", ".xls", "Tally XML", "PDF invoices"].map(f => (
                <span key={f} className="text-[10px] px-2.5 py-1 bg-secondary border border-border rounded text-muted-foreground">{f}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-foreground">🤖 AI is reading your data...</h4>
            <div className="space-y-3">
              <ProcessStep status="done" name="Reading style_master_SS25.xlsx" detail="1,240 SKUs across 86 styles, 6 sizes, 9 colors" result="Done" />
              <ProcessStep status="done" name="Cleaning & normalizing data" detail="Mapped style-color-size matrix, standardized HSN codes" result="Done" />
              <ProcessStep status="done" name="Analyzing sell-through by style" detail="Calculated WOS (Weeks of Stock) per SKU" result="Done" />
              <ProcessStep status="running" name="Building size-curve forecast model" detail="Training on 90-day patterns + wedding/festive calendar..." result="Running..." />
              <ProcessStep status="pending" name="Generating first AI alerts" detail="Will identify size breaks, dead styles & reorder needs" result="Pending" />
            </div>
            <p className="text-center text-xs text-muted-foreground pt-2">Takes about 2-3 minutes for first-time setup · You'll receive alerts on WhatsApp</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProcessStep = ({ status, name, detail, result }: { status: "done" | "running" | "pending"; name: string; detail: string; result: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
      status === "done" ? "bg-success/15 text-success" :
      status === "running" ? "bg-primary/15 text-primary animate-spin" :
      "bg-secondary border border-border text-muted-foreground"
    }`}>
      {status === "done" ? "✓" : status === "running" ? "◌" : "○"}
    </div>
    <div className="flex-1">
      <div className="text-xs font-medium text-foreground">{name}</div>
      <div className="text-[11px] text-muted-foreground">{detail}</div>
    </div>
    <span className={`text-[11px] font-semibold ${
      status === "done" ? "text-success" : status === "running" ? "text-info" : "text-muted-foreground/50"
    }`}>{result}</span>
  </div>
);

export default OnboardScreen;
