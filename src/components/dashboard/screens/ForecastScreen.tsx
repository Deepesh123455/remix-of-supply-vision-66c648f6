import StatCard from "../shared/StatCard";

const forecastRows = [
  { sku: "Polo Navy (M) · Men", units: "8,400", change: "↑ +22%", changeColor: "text-success", confidence: "94%", confType: "success" as const },
  { sku: "Printed Kurti Pink (L) · Women", units: "5,200", change: "↑ +62% 🔥", changeColor: "text-destructive", confidence: "88%", confType: "success" as const },
  { sku: "Crew Sweatshirt Grey (L) · Men", units: "6,100", change: "↑ +14%", changeColor: "text-success", confidence: "96%", confType: "success" as const },
  { sku: "Anarkali Maroon (M) · Women", units: "1,840", change: "→ Stable", changeColor: "text-warning", confidence: "79%", confType: "warning" as const },
  { sku: "Boys Graphic Tee Yellow (10Y)", units: "180", change: "↓ -71%", changeColor: "text-destructive", confidence: "91%", confType: "success" as const },
];

const confBadge = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
};

const ForecastScreen = () => (
  <div>
    <div className="mb-7">
      <h1 className="text-xl font-bold text-text-heading">∿ Demand Forecast</h1>
      <p className="text-sm text-muted-foreground mt-1">AI-powered style × size-curve × channel forecasts · 91.4% accuracy over last 90 days (India + GCC)</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Forecast Accuracy" value="91.4%" change="↑ 4.2% from last month" changeType="up" color="success" />
      <StatCard label="Next 7 Days Sell-out" value="₹2.1Cr" change="↑ Wedding + Eid uplift" changeType="up" color="info" />
      <StatCard label="Cut-Plan Budget Needed" value="₹68L" change="Next 14 days" changeType="warn" color="warning" />
      <StatCard label="Seasonal Opportunities" value="34 styles" change="AW'25 capsule + Eid" changeType="up" color="primary" />
    </div>

    <div className="grid lg:grid-cols-2 gap-4">
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <h2 className="text-sm font-bold text-text-heading">Top Style Forecasts — Next 30 Days</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Style / SKU", "Forecast Units", "vs Last Month", "Confidence"].map(h => (
                  <th key={h} className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-4 py-2.5 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forecastRows.map((r) => (
                <tr key={r.sku} className="border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground">{r.sku}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">{r.units}</td>
                  <td className={`px-4 py-3 text-xs font-medium ${r.changeColor}`}>{r.change}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${confBadge[r.confType]}`}>{r.confidence}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <InsightCard icon="🎯" label="Eid + Wedding Window" color="primary" text={<>Eid in <strong>18 days</strong>, peak wedding window in <strong>12 days</strong>. Last year your Women's ethnic & Men's festive shirts spiked <strong>280%</strong> in week 1 — AI recommends pre-cutting ₹42L worth across 14 styles by Apr 14.</>} />
        <InsightCard icon="📈" label="Yarn Price Intelligence" color="info" text={<>Cotton-mélange & combed yarn prices rising in Tirupur (<strong>+8%</strong> wholesale signal). Recommend booking 2× usual yarn lot this week before AW'25 sampling lifts spot prices further.</>} />
        <InsightCard icon="💡" label="GCC Channel Opportunity" color="success" text={<>Riyadh + Sharjah EBO data shows demand for <strong>Co-ord sets & modest-fit silhouettes</strong> growing 38% YoY. Adding 6 SKUs to GCC assortment could add ₹14–18L/month export revenue.</>} />
      </div>
    </div>
  </div>
);

const InsightCard = ({ icon, label, color, text }: { icon: string; label: string; color: "primary" | "info" | "success"; text: React.ReactNode }) => {
  const colorMap = {
    primary: "bg-primary/5 border-primary/20 text-primary",
    info: "bg-info/5 border-info/20 text-info",
    success: "bg-success/5 border-success/20 text-success",
  };
  return (
    <div className={`rounded-xl border p-4 ${colorMap[color].split(" ").slice(0, 2).join(" ")}`}>
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-base">{icon}</span>
        <span className={`text-xs font-bold ${colorMap[color].split(" ")[2]}`}>{label}</span>
      </div>
      <div className="text-xs text-foreground leading-relaxed">{text}</div>
    </div>
  );
};

export default ForecastScreen;
