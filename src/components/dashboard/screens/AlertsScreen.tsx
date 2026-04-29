import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import { INVENTORY_ITEMS, type StockAlert } from "@/data/appData";

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
  const { criticalAlerts, warningAlerts, resolvedCount, resolveAlert, resolveWarning, openPOForItem, placeInsightOrder } = useApp();

  const [orderModal, setOrderModal] = useState<{ alert: StockAlert; defaultQty: number } | null>(null);
  const [orderQty, setOrderQty] = useState(0);

  const openOrderModal = (alert: StockAlert) => {
    const linkedItem = INVENTORY_ITEMS.find(it => it.id === alert.linkedItemId);
    const defaultQty = linkedItem?.orderQty ?? 500;
    setOrderModal({ alert, defaultQty });
    setOrderQty(defaultQty);
  };

  const handlePlaceOrder = () => {
    if (!orderModal) return;
    placeInsightOrder({ title: orderModal.alert.title, qty: orderQty, action: orderModal.alert.action });
    toast.success(`Order placed! ${orderQty.toLocaleString()} units for "${orderModal.alert.title}"`, { duration: 4000 });
    resolveAlert(orderModal.alert.id, "Order confirmed — AI will track production and delivery.");
    setOrderModal(null);
  };

  const handleAlertAction = (alert: StockAlert) => {
    if (alert.action.includes("Order")) {
      openOrderModal(alert);
    } else {
      const linkedItem = INVENTORY_ITEMS.find(it => it.id === alert.linkedItemId);
      if (linkedItem) {
        openPOForItem(linkedItem);
      } else {
        resolveAlert(alert.id, `${alert.action} done!`);
      }
    }
  };

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
              {criticalAlerts.map((alert) => (
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
                          onClick={() => handleAlertAction(alert)}
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
              ))}
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

      {/* Order Quantity Modal */}
      <AnimatePresence>
        {orderModal && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOrderModal(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-[440px] pointer-events-auto overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-400" />

                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-border">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      {orderModal.alert.moneyAtRisk} at risk
                    </p>
                    <h2 className="text-base font-bold tracking-tight leading-tight">{orderModal.alert.title}</h2>
                  </div>
                  <button
                    onClick={() => setOrderModal(null)}
                    className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5">
                  {/* Description */}
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/60">
                    <p className="text-sm text-muted-foreground leading-relaxed">{orderModal.alert.details}</p>
                  </div>

                  {/* Quantity slider */}
                  <div>
                    <div className="flex items-baseline justify-between mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Order Quantity</p>
                      <span className="text-2xl font-black tabular-nums">
                        {orderQty.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground ml-1.5">units</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={Math.max(100, Math.round(orderModal.defaultQty * 0.25))}
                      max={Math.round(orderModal.defaultQty * 1.5)}
                      step={50}
                      value={orderQty}
                      onChange={e => setOrderQty(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">Min {Math.max(100, Math.round(orderModal.defaultQty * 0.25)).toLocaleString()}</span>
                      <span className="text-[10px] font-semibold text-primary">AI suggests {orderModal.defaultQty.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground">Max {Math.round(orderModal.defaultQty * 1.5).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-xl px-4 py-3">
                      <p className="text-[10px] text-muted-foreground mb-1">Action</p>
                      <p className="text-sm font-bold">{orderModal.alert.action}</p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl px-4 py-3">
                      <p className="text-[10px] text-muted-foreground mb-1">Est. units</p>
                      <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{orderQty.toLocaleString()} pcs</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3">
                  <button
                    onClick={() => setOrderModal(null)}
                    className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground text-sm font-bold transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Place Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertsScreen;
