import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { INVENTORY_ITEMS } from "@/data/appData";

type Filter = "critical" | "warning" | "all";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const AlertsScreen = () => {
  const [filter, setFilter] = useState<Filter>("critical");
  const { criticalAlerts, warningAlerts, resolvedCount, resolveAlert, resolveWarning, openPOForItem } = useApp();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Action Center</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Problems found before they cost you money — sorted by what hurts most.</p>
      </div>

      {/* Quiet summary strip */}
      <motion.div
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm py-1 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <button onClick={() => setFilter("critical")} className={`flex items-center gap-2 transition-colors ${filter === "critical" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
          <div className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
          <span>{criticalAlerts.length} urgent</span>
        </button>
        <div className="h-1 w-1 rounded-full bg-border hidden sm:block" />
        <button onClick={() => setFilter("warning")} className={`flex items-center gap-2 transition-colors ${filter === "warning" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
          <div className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
          <span>{warningAlerts.length} to watch</span>
        </button>
        <div className="h-1 w-1 rounded-full bg-border hidden sm:block" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <span>{resolvedCount} handled by AI today</span>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {[
          { id: "critical" as Filter, label: `Urgent (${criticalAlerts.length})` },
          { id: "warning" as Filter, label: `Watch (${warningAlerts.length})` },
          { id: "all" as Filter, label: `All (${criticalAlerts.length + warningAlerts.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.id
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Critical Alerts */}
      <AnimatePresence>
        {(filter === "critical" || filter === "all") && criticalAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6"
          >
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Urgent — act on these today
              </h2>
            <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="show">
              {criticalAlerts.map((alert) => {
                const linkedItem = INVENTORY_ITEMS.find(it => it.id === alert.linkedItemId);
                return (
                  <motion.div
                    key={alert.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, x: -40, height: 0 }}
                    className="bg-card border border-border hover:border-primary/20 rounded-xl p-5 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl shrink-0 mt-0.5">{alert.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{alert.title}</h3>
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded-md shrink-0">{alert.moneyAtRisk} at risk</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{alert.details}</p>
                        <div className="flex flex-wrap gap-2">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => linkedItem ? openPOForItem(linkedItem) : resolveAlert(alert.id, `${alert.action} done!`)}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {criticalAlerts.length === 0 && (filter === "critical" || filter === "all") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center gap-3 bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-5 py-4"
        >
          <span className="text-xl">✅</span>
          <div>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">Nothing urgent right now</p>
            <p className="text-xs text-muted-foreground mt-0.5">All critical problems have been handled. AI is watching for new ones.</p>
          </div>
        </motion.div>
      )}

      {/* Warnings */}
      <AnimatePresence>
        {(filter === "warning" || filter === "all") && warningAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Keep an eye on these
              </h2>
            <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="show">
              {warningAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  variants={itemVariants}
                  layout
                  exit={{ opacity: 0, x: -40, height: 0 }}
                  className="bg-card border border-border hover:border-amber-200 dark:hover:border-amber-800 rounded-xl p-5 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0 mt-0.5">{alert.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground text-sm">{alert.title}</h3>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded-md shrink-0">{alert.moneyAtRisk}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{alert.details}</p>
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => resolveWarning(alert.id, `${alert.action} done!`)}
                          className="px-3.5 py-1.5 bg-foreground hover:bg-foreground/90 text-background rounded-lg font-semibold text-xs transition-colors"
                        >
                          {alert.action} →
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => resolveWarning(alert.id, "Noted — AI will keep monitoring.")}
                          className="px-3.5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg text-xs transition-colors"
                        >
                          I know, keep watching
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertsScreen;
