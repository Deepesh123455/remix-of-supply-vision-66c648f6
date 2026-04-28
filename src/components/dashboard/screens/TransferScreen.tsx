import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, X, Zap, Package, TrendingUp, Clock
} from "lucide-react";
import { toast } from "sonner";
import { STORES } from "@/data/appData";
import { useApp, type Transfer } from "@/context/AppContext";

const storeCodeMap = Object.fromEntries(STORES.map(s => [s.id, s.code]));

const urgencyCfg = {
  critical: {
    stripe: "bg-red-500",
    badge: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/40",
    toPanel: "bg-red-50/70 dark:bg-red-950/10 border-red-100 dark:border-red-900/30",
    toCode: "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400",
    fromCode: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    label: "Urgent",
    arrowBg: "bg-red-500/10",
    arrowColor: "text-red-500",
  },
  high: {
    stripe: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/40",
    toPanel: "bg-amber-50/60 dark:bg-amber-950/10 border-amber-100 dark:border-amber-900/30",
    toCode: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400",
    fromCode: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    label: "High Priority",
    arrowBg: "bg-amber-400/10",
    arrowColor: "text-amber-500",
  },
  medium: {
    stripe: "bg-primary",
    badge: "bg-primary/8 text-primary border border-primary/20",
    toPanel: "bg-primary/5 border-primary/10",
    toCode: "bg-primary/10 text-primary",
    fromCode: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    label: "Watch",
    arrowBg: "bg-primary/10",
    arrowColor: "text-primary",
  },
};

const coverColor = (d: number) =>
  d < 4
    ? "text-red-600 dark:text-red-400"
    : d < 10
    ? "text-amber-600 dark:text-amber-400"
    : "text-emerald-600 dark:text-emerald-400";

interface StoreEndpoint {
  storeId: string;
  name: string;
  city: string;
  stock: number;
  velocity: number;
  daysCover: number;
}

const StoreBlock = ({
  endpoint,
  codeColor,
  panelClass,
  label,
  labelColor,
}: {
  endpoint: StoreEndpoint;
  codeColor: string;
  panelClass: string;
  label: string;
  labelColor: string;
}) => (
  <div className={`flex-1 rounded-2xl p-5 border ${panelClass}`}>
    <p className={`text-[9px] font-extrabold uppercase tracking-[0.12em] mb-3 ${labelColor}`}>{label}</p>
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-10 h-10 rounded-xl text-[12px] font-bold font-mono flex items-center justify-center shrink-0 ${codeColor}`}
      >
        {storeCodeMap[endpoint.storeId] ?? "??"}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold leading-tight truncate">{endpoint.name}</p>
        <p className="text-xs text-muted-foreground">{endpoint.city}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-background/60 rounded-xl px-3 py-2.5">
        <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Stock</p>
        <p className="text-base font-black tabular-nums leading-none">{endpoint.stock.toLocaleString()}</p>
        <p className="text-[9px] text-muted-foreground mt-0.5">units</p>
      </div>
      <div className="bg-background/60 rounded-xl px-3 py-2.5">
        <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Velocity</p>
        <p className="text-base font-black tabular-nums leading-none">{endpoint.velocity}</p>
        <p className="text-[9px] text-muted-foreground mt-0.5">units/day</p>
      </div>
      <div className="bg-background/60 rounded-xl px-3 py-2.5">
        <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Cover</p>
        <p className={`text-base font-black tabular-nums leading-none ${coverColor(endpoint.daysCover)}`}>
          {endpoint.daysCover}d
        </p>
        <p className="text-[9px] text-muted-foreground mt-0.5">remaining</p>
      </div>
    </div>
  </div>
);

const TransferScreen = () => {
  const { transfers, approveTransfer, rejectTransfer } = useApp();
  const [approveTarget, setApproveTarget] = useState<Transfer | null>(null);
  const [qty, setQty] = useState(0);
  const [phase, setPhase] = useState<"selecting" | "success">("selecting");

  const pendingCount = transfers.filter(t => t.status === "pending").length;
  const approvedCount = transfers.filter(t => t.status === "approved").length;
  const totalValue = "₹3.1L";

  const openModal = (t: Transfer) => {
    setApproveTarget(t);
    setQty(Math.round((t.minUnits + t.maxUnits) / 2));
    setPhase("selecting");
  };

  const handleConfirm = () => {
    if (!approveTarget) return;
    setPhase("success");
    const { id, from, to } = approveTarget;
    const confirmedQty = qty;
    setTimeout(() => {
      approveTransfer(id, confirmedQty);
      setApproveTarget(null);
      toast.success(`${confirmedQty} units moving from ${from.name} → ${to.name}.`, { duration: 4000 });
    }, 900);
  };

  const sorted = [
    ...transfers.filter(t => t.status === "pending").sort((a, b) => {
      const o = { critical: 0, high: 1, medium: 2 };
      return o[a.urgency] - o[b.urgency];
    }),
    ...transfers.filter(t => t.status === "approved"),
    ...transfers.filter(t => t.status === "rejected"),
  ];

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Store Transfers</h1>
          <p className="text-muted-foreground text-sm mt-1">
            AI-recommended moves to balance stock across your network — no purchase cost.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-6 text-sm shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${pendingCount > 0 ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
            <span className="font-bold text-foreground">{pendingCount}</span>
            <span className="text-muted-foreground">pending</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span><strong className="text-foreground">{totalValue}</strong> value at risk</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span><strong className="text-foreground">{approvedCount}</strong> approved today</span>
          </div>
        </motion.div>
      </div>

      {/* ── Summary KPI Strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Package className="w-4 h-4 text-red-500" />, label: "Pending Transfers", value: String(pendingCount), sub: "Awaiting review", color: "border-l-red-500" },
          { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, label: "Approved Today", value: String(approvedCount), sub: "Warehouse notified", color: "border-l-emerald-500" },
          { icon: <Zap className="w-4 h-4 text-amber-500" />, label: "Value at Risk", value: totalValue, sub: "Across pending transfers", color: "border-l-amber-500" },
          { icon: <TrendingUp className="w-4 h-4 text-primary" />, label: "Stores Covered", value: "10", sub: "EBOs monitored by AI", color: "border-l-primary" },
        ].map(({ icon, label, value, sub, color }) => (
          <div key={label} className={`bg-card border border-border/50 border-l-4 ${color} rounded-xl p-5 shadow-sm`}>
            <div className="flex justify-between items-start mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
              <div className="p-2 rounded-lg bg-muted/50 border border-border/50">{icon}</div>
            </div>
            <p className="text-2xl font-black tracking-tight">{value}</p>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Transfer Cards ── */}
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        <AnimatePresence mode="popLayout">
          {sorted.map(t => {
            const cfg = urgencyCfg[t.urgency];
            const isPending = t.status === "pending";
            const isApproved = t.status === "approved";
            const isRejected = t.status === "rejected";

            return (
              <motion.div
                key={t.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
                }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                className={`bg-card rounded-2xl border border-border overflow-hidden shadow-sm transition-all ${
                  isPending ? "hover:shadow-lg hover:border-border/80" : isRejected ? "opacity-40" : "opacity-70"
                }`}
              >
                {/* Urgency stripe */}
                <div className={`h-1 w-full ${cfg.stripe}`} />

                <div className="p-6">
                  {/* ── Top row: ID · badge · product · value/status ── */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[10px] font-mono tracking-wider text-muted-foreground/50 bg-muted/40 px-2 py-0.5 rounded-md">{t.id}</span>
                      {isPending && (
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                      )}
                      <div>
                        <h3 className="text-base font-bold tracking-tight leading-tight">{t.product}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{t.variant} · {t.category}</p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {isPending && (
                        <div className="text-right">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Est. Value</p>
                          <p className="text-lg font-black tabular-nums text-foreground">{t.estimatedValue}</p>
                        </div>
                      )}
                      {isApproved && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 px-3 py-1.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                        </span>
                      )}
                      {isRejected && (
                        <span className="text-xs font-semibold text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-full">
                          Declined
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Store Route: FROM ←→ TO ── */}
                  <div className="flex items-stretch gap-4">
                    <StoreBlock
                      endpoint={t.from}
                      codeColor={cfg.fromCode}
                      panelClass="bg-muted/20 border-border/60"
                      label="Surplus — Send From"
                      labelColor="text-emerald-600 dark:text-emerald-500"
                    />

                    {/* Arrow connector */}
                    <div className="flex flex-col items-center justify-center gap-2 shrink-0 py-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cfg.arrowBg}`}>
                        <ArrowRight className={`w-4 h-4 ${cfg.arrowColor}`} />
                      </div>
                      <p className="text-sm font-black tabular-nums text-foreground">{t.minUnits}–{t.maxUnits}</p>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">units</p>
                    </div>

                    <StoreBlock
                      endpoint={t.to}
                      codeColor={cfg.toCode}
                      panelClass={cfg.toPanel}
                      label="Needs Stock — Send To"
                      labelColor={
                        t.urgency === "critical"
                          ? "text-red-600 dark:text-red-400"
                          : t.urgency === "high"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-primary"
                      }
                    />
                  </div>

                  {/* ── Action row ── */}
                  <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center gap-3">
                    {isPending && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openModal(t)}
                          className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold transition-colors shadow-sm"
                        >
                          Approve Transfer →
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => rejectTransfer(t.id)}
                          className="px-5 py-2.5 bg-muted hover:bg-muted/70 text-muted-foreground rounded-xl text-xs font-semibold transition-colors"
                        >
                          Reject
                        </motion.button>
                        <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Internal move</span>
                          <span className="mx-1 text-border">·</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹0 transfer cost</span>
                        </div>
                      </>
                    )}
                    {isApproved && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>
                          <strong className="text-foreground">{t.approvedQty} units</strong> approved — warehouse &amp; store managers notified via WhatsApp
                        </span>
                      </div>
                    )}
                    {isRejected && (
                      <p className="text-sm text-muted-foreground">Transfer declined — no stock movement taken.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {pendingCount === 0 && approvedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl px-6 py-5"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">All transfers handled</p>
            <p className="text-xs text-muted-foreground mt-0.5">AI is scanning for the next rebalancing opportunity across your 47 EBOs.</p>
          </div>
        </motion.div>
      )}

      {/* ── Approve Modal ── */}
      <AnimatePresence>
        {approveTarget && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={() => phase === "selecting" && setApproveTarget(null)}
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-[480px] pointer-events-auto overflow-hidden">
                <AnimatePresence mode="wait">
                  {phase === "selecting" ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className={`h-1 w-full ${urgencyCfg[approveTarget.urgency].stripe}`} />

                      {/* Modal Header */}
                      <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-border">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{approveTarget.id}</p>
                          <h2 className="text-lg font-bold tracking-tight">Confirm Transfer</h2>
                          <p className="text-xs text-muted-foreground mt-0.5">{approveTarget.product} · {approveTarget.variant}</p>
                        </div>
                        <button
                          onClick={() => setApproveTarget(null)}
                          className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="px-6 py-6 space-y-6">
                        {/* Route */}
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-3">Transfer Route</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-muted/40 rounded-2xl px-4 py-4 text-center">
                              <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">From</p>
                              <p className="text-sm font-bold">{approveTarget.from.name}</p>
                              <p className="text-xs text-muted-foreground">{approveTarget.from.city}</p>
                            </div>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${urgencyCfg[approveTarget.urgency].arrowBg}`}>
                              <ArrowRight className={`w-4 h-4 ${urgencyCfg[approveTarget.urgency].arrowColor}`} />
                            </div>
                            <div className="flex-1 bg-primary/5 border border-primary/15 rounded-2xl px-4 py-4 text-center">
                              <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">To</p>
                              <p className="text-sm font-bold">{approveTarget.to.name}</p>
                              <p className="text-xs text-muted-foreground">{approveTarget.to.city}</p>
                            </div>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div>
                          <div className="flex items-baseline justify-between mb-3">
                            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Units to Transfer</p>
                            <span className="text-2xl font-black tabular-nums">
                              {qty}
                              <span className="text-sm font-normal text-muted-foreground ml-1.5">units</span>
                            </span>
                          </div>
                          <input
                            type="range"
                            min={approveTarget.minUnits}
                            max={approveTarget.maxUnits}
                            value={qty}
                            onChange={e => setQty(Number(e.target.value))}
                            className="w-full accent-primary cursor-pointer"
                          />
                          <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-muted-foreground">Min {approveTarget.minUnits}</span>
                            <span className="text-[10px] font-semibold text-primary">AI recommended range</span>
                            <span className="text-[10px] text-muted-foreground">Max {approveTarget.maxUnits}</span>
                          </div>
                        </div>

                        {/* Cost summary */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-muted/30 rounded-xl px-4 py-3">
                            <p className="text-[10px] text-muted-foreground mb-1">Stock value moved</p>
                            <p className="text-base font-black tabular-nums">₹{(qty * approveTarget.costPerPc).toLocaleString("en-IN")}</p>
                          </div>
                          <div className="bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl px-4 py-3">
                            <p className="text-[10px] text-muted-foreground mb-1">Transfer cost</p>
                            <p className="text-base font-black text-emerald-600 dark:text-emerald-400">₹0</p>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-6 pb-6 flex gap-3">
                        <button
                          onClick={() => setApproveTarget(null)}
                          className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
                        >
                          Cancel
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConfirm}
                          className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-colors shadow-sm"
                        >
                          Confirm Transfer →
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex flex-col items-center justify-center py-16 px-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.05 }}
                        className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">Transfer Approved</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
                        Warehouse and store managers are being notified via WhatsApp.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferScreen;
