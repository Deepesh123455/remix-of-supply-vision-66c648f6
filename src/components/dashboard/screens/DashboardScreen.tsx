import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import type { ScreenName } from "../DashboardLayout";
import { INVENTORY_ITEMS } from "@/data/appData";

interface Props {
  onNavigate: (s: ScreenName) => void;
}

const DashboardScreen = ({ onNavigate }: Props) => {
  const { metrics, criticalAlerts, resolvedCount, openPOForItem, resolveAlert } = useApp();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const date = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  const statusLine = criticalAlerts.length === 0
    ? "All clear — AI is handling everything in the background."
    : `${criticalAlerts.length} item${criticalAlerts.length === 1 ? " needs" : "s need"} your call. The rest is taken care of.`;

  return (
    <div className="space-y-8 max-w-5xl">

      {/* ── Greeting ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1 font-medium">{date}</p>
          <h1 className="text-[26px] font-bold tracking-tight leading-tight">{greeting} 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">{statusLine}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const urgent = INVENTORY_ITEMS.find(i => i.status === "critical");
            if (urgent) openPOForItem(urgent);
          }}
          className="shrink-0 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-sm shadow-sm"
        >
          📦 Order Stock
        </motion.button>
      </div>

      {/* ── 4 Stat Cards ── */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {[
          {
            label: "Your stock is worth",
            value: metrics.totalInventory,
            sub: "+₹46L added this month",
            accent: "border-l-primary",
            valueColor: "",
            onClick: () => onNavigate("inventory"),
          },
          {
            label: "Need attention now",
            value: String(criticalAlerts.length),
            sub: criticalAlerts.length > 0 ? "Act before sales are lost" : "Nothing urgent right now",
            accent: criticalAlerts.length > 0 ? "border-l-red-500" : "border-l-emerald-500",
            valueColor: criticalAlerts.length > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600",
            onClick: () => onNavigate("alerts"),
          },
          {
            label: "Sitting unsold",
            value: metrics.oldStockValue,
            sub: `${metrics.oldStockPercent} of your inventory`,
            accent: "border-l-amber-500",
            valueColor: "text-amber-600",
            onClick: () => onNavigate("inventory"),
          },
          {
            label: "Handled this month",
            value: String(metrics.ordersThisMonth),
            sub: `${metrics.autoProcessed} done by AI for you`,
            accent: "border-l-emerald-500",
            valueColor: "text-emerald-600",
            onClick: () => onNavigate("agents"),
          },
        ].map((card) => (
          <motion.div
            key={card.label}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
            whileHover={{ y: -2 }}
            onClick={card.onClick}
            className={`bg-card border border-border border-l-4 ${card.accent} rounded-xl p-4 cursor-pointer hover:shadow-md transition-all`}
          >
            <p className="text-xs text-muted-foreground mb-2 font-medium">{card.label}</p>
            <p className={`text-2xl font-bold tracking-tight mb-1 ${card.valueColor}`}>{card.value}</p>
            <p className="text-[11px] text-muted-foreground">{card.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Priorities ── */}
      <AnimatePresence>
        {criticalAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <h2 className="text-base font-semibold">Needs your decision today</h2>
              <span className="text-xs text-muted-foreground">— {criticalAlerts.length} item{criticalAlerts.length > 1 ? "s" : ""}</span>
            </div>

            <div className="space-y-3">
              {criticalAlerts.slice(0, 2).map((alert, i) => {
                const linkedItem = INVENTORY_ITEMS.find(it => it.id === alert.linkedItemId);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                    className="bg-card rounded-xl border border-border hover:border-primary/20 p-5 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl shrink-0 mt-0.5">{alert.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{alert.title}</h3>
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded-md">
                            {alert.moneyAtRisk} at risk
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{alert.details}</p>
                        <div className="flex flex-wrap gap-2">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => linkedItem ? openPOForItem(linkedItem) : resolveAlert(alert.id, `✅ ${alert.action} done!`)}
                            className="px-3.5 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-xs transition-colors"
                          >
                            {alert.action} →
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => resolveAlert(alert.id, "Got it — AI will remind you tomorrow.")}
                            className="px-3.5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg text-xs transition-colors"
                          >
                            Remind me tomorrow
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Good News ── */}
      <AnimatePresence>
        {resolvedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-4 bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-5 py-4"
          >
            <span className="text-2xl shrink-0">🤖</span>
            <div>
              <p className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">
                AI sorted {resolvedCount} problem{resolvedCount > 1 ? "s" : ""} while you were away
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Round-neck tees — 4,800 pieces ordered and arriving April 12. Nothing for you to do.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stock Health + Action List ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <h3 className="font-semibold text-sm mb-0.5">Where your money is sitting</h3>
          <p className="text-xs text-muted-foreground mb-5">Breakdown of all {metrics.totalInventory} in stock</p>
          <div className="space-y-5">
            <HealthBar label="Selling well" value={metrics.freshStockValue} percent={metrics.freshStockPercent} color="bg-emerald-500" dotColor="bg-emerald-500" desc="People are actively buying this" />
            <HealthBar label="Moving slowly" value={metrics.slowStockValue} percent={metrics.slowStockPercent} color="bg-amber-400" dotColor="bg-amber-400" desc="Not selling as fast as expected" />
            <HealthBar label="Stuck for 90+ days" value={metrics.deadStockValue} percent={metrics.deadStockPercent} color="bg-red-400" dotColor="bg-red-400" desc="Needs a clearance sale to free up cash" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <h3 className="font-semibold text-sm mb-0.5">Your to-do list</h3>
          <p className="text-xs text-muted-foreground mb-5">3 things that protect your business today</p>
          <ul className="space-y-4">
            {criticalAlerts.slice(0, 2).map((alert, i) => (
              <li key={alert.id} className="flex gap-3 items-start">
                <span className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.action}</p>
                </div>
              </li>
            ))}
            <li className="flex gap-3 items-start">
              <span className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">₹</span>
              <div>
                <p className="text-sm font-medium">Free up {metrics.oldStockValue} in cash</p>
                <p className="text-xs text-muted-foreground mt-0.5">Run a clearance sale on old stock — AI can plan it for you</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{metrics.forecastAccuracy} forecast accuracy</p>
                <p className="text-xs text-muted-foreground mt-0.5">AI is getting better at predicting your sales</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

    </div>
  );
};

const HealthBar = ({ label, value, percent, color, dotColor, desc }: {
  label: string; value: string; percent: number; color: string; dotColor: string; desc: string;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full shrink-0 ${dotColor}`} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-sm font-bold">{value}</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-1">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
    <p className="text-[11px] text-muted-foreground">{desc}</p>
  </div>
);

export default DashboardScreen;
