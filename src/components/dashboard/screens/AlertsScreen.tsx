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

const ITEMS_PER_PAGE = 8;

const AlertsScreen = () => {
  const [filter, setFilter] = useState<Filter>("critical");
  const [currentPage, setCurrentPage] = useState(1);
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

  const allFilteredAlerts = filter === "all"
    ? [...criticalAlerts, ...warningAlerts]
    : filter === "critical" ? criticalAlerts : warningAlerts;

  const totalPages = Math.ceil(allFilteredAlerts.length / ITEMS_PER_PAGE);
  const displayedAlerts = allFilteredAlerts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page when filter changes
  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    setCurrentPage(1);
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
        <button onClick={() => handleFilterChange("critical")} className={`flex items-center gap-2 transition-colors ${filter === "critical" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
          <div className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
          <span>{criticalAlerts.length} urgent</span>
        </button>
        <div className="h-1 w-1 rounded-full bg-border hidden sm:block" />
        <button onClick={() => handleFilterChange("warning")} className={`flex items-center gap-2 transition-colors ${filter === "warning" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
          <div className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
          <span>{warningAlerts.length} to watch</span>
        </button>
        <div className="h-1 w-1 rounded-full bg-border hidden sm:block" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <span>{resolvedCount} Fulfilled Today</span>
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
            onClick={() => handleFilterChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === tab.id
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {displayedAlerts.length > 0 ? (
            <motion.div
              key={`${filter}-${currentPage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {displayedAlerts.map((alert) => (
                <CollapsibleAlert
                  key={alert.id}
                  alert={alert}
                  type={alert.type as "critical" | "warning"}
                  onAction={() => alert.type === "critical" ? handleAlertAction(alert) : resolveWarning(alert.id, `${alert.action} done!`)}
                  onResolve={() => alert.type === "critical"
                    ? resolveAlert(alert.id, "Got it — AI will remind you tomorrow.")
                    : resolveWarning(alert.id, "Noted — AI will keep monitoring.")
                  }
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-5 py-4"
            >
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">Nothing here right now</p>
                <p className="text-xs text-muted-foreground mt-0.5">All problems in this category have been handled.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, allFilteredAlerts.length)}</span> of <span className="font-medium">{allFilteredAlerts.length}</span> alerts
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

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

const CollapsibleAlert = ({ alert, type, onAction, onResolve }: {
  alert: StockAlert;
  type: "critical" | "warning";
  onAction: () => void;
  onResolve: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      layout
      className={`bg-card border border-border overflow-hidden rounded-xl transition-all duration-300 ${isExpanded ? "ring-1 ring-primary/20 shadow-lg" : "hover:border-primary/20 cursor-pointer"
        }`}
      onClick={() => setIsExpanded((p) => !p)}
    >
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="min-w-0 px-1">
            <h3 className="font-bold text-foreground text-[13px] truncate leading-tight mb-0.5">
              {alert.title}
            </h3>
            <p className="text-[11px] text-muted-foreground truncate">
              {alert.issue}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${type === "critical"
              ? "text-red-600 bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/30"
              : "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/30"
            }`}>
            {alert.moneyAtRisk} {type === "critical" ? "at risk" : ""}
          </span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-muted-foreground/40 text-xs"
          >
            ↓
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pt-0 border-t border-border/50">
              <div className="py-4">
                <p className="text-[13px] text-foreground leading-relaxed bg-secondary/30 p-3 rounded-lg border border-border/40">
                  {alert.details}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction();
                  }}
                  className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${type === "critical"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                >
                  {alert.action} →
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onResolve();
                  }}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg text-xs font-semibold transition-colors"
                >
                  {type === "critical" ? "Remind me tomorrow" : "Noted — keep watching"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground text-xs font-medium transition-colors ml-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AlertsScreen;
