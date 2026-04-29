import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, X, Zap as Lightning, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { STORES } from "@/data/appData";
import { useApp, type Transfer } from "@/context/AppContext";

const storeCodeMap = Object.fromEntries(STORES.map(s => [s.id, s.code]));

const urgencyCfg = {
  critical: {
    stripe: "bg-indigo-500",
    badge: "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-900/40",
    toPanel: "bg-indigo-50/70 dark:bg-indigo-950/10 border-indigo-100 dark:border-indigo-900/30",
    toCode: "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400",
    fromCode: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    label: "Critical",
    arrowBg: "bg-indigo-500/10",
    arrowColor: "text-indigo-500",
  },
  high: {
    stripe: "bg-blue-400",
    badge: "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40",
    toPanel: "bg-blue-50/60 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900/30",
    toCode: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400",
    fromCode: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    label: "High Priority",
    arrowBg: "bg-blue-400/10",
    arrowColor: "text-blue-500",
  },
  medium: {
    stripe: "bg-slate-400",
    badge: "bg-slate-50 text-slate-700 border border-slate-200",
    toPanel: "bg-slate-50/50 border-slate-100",
    toCode: "bg-slate-100 text-slate-700",
    fromCode: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    label: "Scheduled",
    arrowBg: "bg-slate-200",
    arrowColor: "text-slate-500",
  },
};

const coverColor = (d: number) =>
  d < 4
    ? "text-indigo-600 dark:text-indigo-400"
    : d < 10
    ? "text-blue-600 dark:text-blue-400"
    : "text-emerald-600 dark:text-emerald-400";

interface StoreEndpoint {
  storeId: string;
  name: string;
  city: string;
  stock: number;
  velocity: number;
  daysCover: number;
}

const StockoutWarning = ({ daysCover }: { daysCover: number }) =>
  daysCover <= 2 ? (
    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      <span>Stockout risk in {daysCover}d</span>
    </div>
  ) : null;

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
  <div className={`flex-1 rounded-lg p-3 border ${panelClass} transition-all`}>
    <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 ${labelColor} opacity-70`}>{label}</p>
    <div className="flex items-center gap-2.5 mb-3">
      <div className={`w-8 h-8 rounded-md text-xs font-bold font-mono flex items-center justify-center shrink-0 ${codeColor}`}>
        {storeCodeMap[endpoint.storeId] ?? "??"}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight truncate">{endpoint.name}</p>
        <p className="text-[11px] text-muted-foreground">{endpoint.city}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-1.5">
      <div className="bg-background/60 rounded-md px-2 py-1.5 border border-border/40">
        <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">Stock</p>
        <p className="text-sm font-bold tabular-nums leading-snug">{endpoint.stock}</p>
        <p className="text-[9px] text-muted-foreground">units</p>
      </div>
      <div className="bg-background/60 rounded-md px-2 py-1.5 border border-border/40">
        <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">Speed</p>
        <p className="text-sm font-bold tabular-nums leading-snug">{endpoint.velocity}</p>
        <p className="text-[9px] text-muted-foreground">/day</p>
      </div>
      <div className="bg-background/60 rounded-md px-2 py-1.5 border border-border/40">
        <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">Cover</p>
        <p className={`text-sm font-bold tabular-nums leading-snug ${coverColor(endpoint.daysCover)}`}>
          {endpoint.daysCover}d
        </p>
        <p className="text-[9px] text-muted-foreground">left</p>
      </div>
    </div>
  </div>
);

const TransferScreen = () => {
  const { transfers, approveTransfer, rejectTransfer } = useApp();
  const [approveTarget, setApproveTarget] = useState<Transfer | null>(null);
  const [qty, setQty] = useState(0);
  const [phase, setPhase] = useState<"selecting" | "success">("selecting");
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");

  const pendingCount = transfers.filter(t => t.status === "pending").length;
  const approvedCount = transfers.filter(t => t.status === "approved").length;
  const totalValue = "₹18,740";

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

  const sorted = transfers
    .filter(t => t.status === activeTab)
    .sort((a, b) => {
      const o = { critical: 0, high: 1, medium: 2 };
      return o[a.urgency] - o[b.urgency];
    });

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ── Page Header with Premium Visual ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 px-1 md:px-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">
            <Lightning className="w-3 h-3 animate-pulse" />
            AI Optimized
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1.5">Store Transfers</h1>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-2xl font-medium opacity-80">
              Intelligent stock optimization that prevents stockouts and maximizes efficiency.
            </p>
          </div>
        </div>
      </div>
        
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab("pending")}
          className={`bg-card border rounded-xl p-4 text-left transition-all ${activeTab === "pending" ? "border-primary/40 ring-1 ring-primary/20 shadow-sm" : "border-border hover:border-border-strong"}`}
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Pending</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{pendingCount}</span>
            <span className="text-[10px] text-primary font-semibold">transfers</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("approved")}
          className={`bg-card border rounded-xl p-4 text-left transition-all ${activeTab === "approved" ? "border-emerald-400/40 ring-1 ring-emerald-400/20 shadow-sm" : "border-border hover:border-border-strong"}`}
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Approved</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">{approvedCount}</span>
            <span className="text-[10px] text-muted-foreground font-medium">today</span>
          </div>
        </button>

        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Est. Value</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{totalValue}</span>
            <span className="text-[10px] text-muted-foreground font-medium">moved</span>
          </div>
        </div>
      </div>

      {/* ── Action Required Banner ── */}
      {activeTab === "pending" && pendingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-5 py-4"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold">{pendingCount} transfer{pendingCount > 1 ? "s" : ""} need your review</p>
            <p className="text-xs text-muted-foreground mt-0.5">AI suggests these moves to balance stock and prevent stockouts.</p>
          </div>
        </motion.div>
      )}

      {/* ── Transfer Cards ── */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        <AnimatePresence initial={false}>
          {sorted.map(t => {
            const cfg = urgencyCfg[t.urgency];
            const isPending = t.status === "pending";
            const isApproved = t.status === "approved";
            const isRejected = t.status === "rejected";

            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ height: 0, opacity: 0, transition: { delay: 0.25, duration: 0.5, ease: [0.32, 0.72, 0, 1] } }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden mb-3 md:mb-4"
              >
                <motion.div
                  initial={{ x: -100, scale: 0.95 }}
                  animate={{ x: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }}
                  exit={{ x: 400, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
                  className={`w-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm transition-all ${
                    isPending ? "hover:shadow-md hover:border-border-strong cursor-pointer group" : isRejected ? "opacity-40" : "opacity-70"
                  }`}
                >
                {/* Urgency stripe */}
                <div className={`h-1.5 md:h-2 w-full ${cfg.stripe}`} />

                <div className="p-3 md:p-4">
                  {/* ── Top row: ID · badge · product · value/status ── */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-muted-foreground/60 bg-muted/50 px-2 py-0.5 rounded border border-border/40 flex-shrink-0">{t.id}</span>
                      {isPending && (
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-md ${cfg.badge}`}>{cfg.label}</span>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold leading-tight truncate">{t.product}</h3>
                        <p className="text-[11px] text-muted-foreground truncate">{t.variant} · {t.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isPending && (
                        <div className="text-right">
                          <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">Value</p>
                          <p className="text-sm font-bold tabular-nums">{t.estimatedValue}</p>
                        </div>
                      )}
                      {isPending && <StockoutWarning daysCover={t.to.daysCover} />}
                      {isApproved && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-2.5 py-1 rounded-md whitespace-nowrap">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                        </span>
                      )}
                      {isRejected && (
                        <span className="text-xs font-semibold text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-md whitespace-nowrap">
                          Declined
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Store Route: FROM → TO ── */}
                  <div className="flex flex-col lg:flex-row items-stretch gap-2">
                    <StoreBlock
                      endpoint={t.from}
                      codeColor={cfg.fromCode}
                      panelClass="bg-muted/20 border-border/60"
                      label="Surplus · Send From"
                      labelColor="text-emerald-600 dark:text-emerald-500"
                    />

                    <div className="hidden lg:flex flex-col items-center justify-center gap-1.5 shrink-0 px-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cfg.arrowBg}`}>
                        <ArrowRight className={`w-4 h-4 ${cfg.arrowColor}`} />
                      </div>
                      <p className="text-xs font-bold tabular-nums text-foreground">{t.minUnits}–{t.maxUnits}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wide">units</p>
                    </div>

                    <div className="lg:hidden flex items-center gap-2 py-1">
                      <div className={`flex-1 h-px ${cfg.arrowBg}`} />
                      <ArrowRight className={`w-4 h-4 ${cfg.arrowColor} shrink-0`} />
                      <div className={`flex-1 h-px ${cfg.arrowBg}`} />
                    </div>

                    <StoreBlock
                      endpoint={t.to}
                      codeColor={cfg.toCode}
                      panelClass={cfg.toPanel}
                      label="Needs Stock · Send To"
                      labelColor={
                        t.urgency === "critical"
                          ? "text-indigo-600 dark:text-indigo-400"
                          : t.urgency === "high"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-600"
                      }
                    />
                  </div>

                  {/* ── Action row ── */}
                  <div className="mt-3 pt-3 border-t border-border/40 flex items-center gap-2">
                    {isPending && (
                      <>
                        <button
                          onClick={() => {
                            approveTransfer(t.id, Math.round((t.minUnits + t.maxUnits) / 2));
                            const { from, to } = t;
                            toast.success(`${Math.round((t.minUnits + t.maxUnits) / 2)} units moving from ${from.name} → ${to.name}.`, { duration: 4000 });
                          }}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold transition-colors shrink-0"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openModal(t)}
                          className="px-4 py-1.5 border border-border hover:bg-muted/40 rounded-md text-xs font-semibold transition-colors shrink-0"
                        >
                          Edit qty
                        </button>
                        <button
                          onClick={() => rejectTransfer(t.id)}
                          className="px-4 py-1.5 text-muted-foreground hover:text-foreground rounded-md text-xs font-semibold transition-colors shrink-0"
                        >
                          Decline
                        </button>
                        <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">No transfer cost</span>
                      </>
                    )}
                    {isApproved && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span><strong className="text-foreground">{t.approvedQty} units</strong> approved — team notified via WhatsApp</span>
                      </div>
                    )}
                    {isRejected && (
                      <p className="text-xs text-muted-foreground">Transfer declined — no action taken.</p>
                    )}
                  </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {activeTab === "pending" && pendingCount === 0 && approvedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl px-5 py-4"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <div>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">All transfers handled</p>
            <p className="text-xs text-muted-foreground mt-0.5">{approvedCount} move{approvedCount > 1 ? "s" : ""} approved today. AI is scanning for the next rebalancing opportunity.</p>
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
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-md"
              onClick={() => phase === "selecting" && setApproveTarget(null)}
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 pointer-events-none"
            >
              <div className="bg-card border border-border/60 rounded-xl shadow-xl w-full max-w-[460px] pointer-events-auto overflow-hidden">
                <AnimatePresence mode="wait">
                  {phase === "selecting" ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className={`h-1.5 md:h-2 w-full ${urgencyCfg[approveTarget.urgency].stripe}`} />

                      {/* Modal Header */}
                      <div className="flex items-start justify-between px-4 md:px-6 pt-5 md:pt-6 pb-4 md:pb-5 border-b border-border/60">
                        <div className="min-w-0">
                          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{approveTarget.id}</p>
                          <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">Confirm Transfer</h2>
                          <p className="text-xs md:text-sm text-muted-foreground mt-1">{approveTarget.product} · {approveTarget.variant}</p>
                        </div>
                        <button
                          onClick={() => setApproveTarget(null)}
                          className="p-2 rounded-xl hover:bg-muted/60 transition-all text-muted-foreground hover:text-foreground flex-shrink-0"
                        >
                          <X className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="px-4 md:px-6 py-5 md:py-6 space-y-5 md:space-y-6">
                        {/* Route */}
                        <div>
                          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-3">Transfer Route</p>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="flex-1 bg-muted/30 rounded-lg px-4 py-4 text-center border border-border/40">
                              <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">From</p>
                              <p className="text-sm md:text-base font-bold leading-tight">{approveTarget.from.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{approveTarget.from.city}</p>
                            </div>
                            <div className={`hidden sm:flex w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${urgencyCfg[approveTarget.urgency].arrowBg} shadow-md`}>
                              <ArrowRight className={`w-4 h-4 ${urgencyCfg[approveTarget.urgency].arrowColor}`} />
                            </div>
                            <div className="sm:hidden flex items-center justify-center gap-2 shrink-0 py-2">
                              <div className={`flex-1 h-1 rounded-full ${urgencyCfg[approveTarget.urgency].arrowBg}`} />
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${urgencyCfg[approveTarget.urgency].arrowBg} shadow-md flex-shrink-0`}>
                                <ArrowRight className={`w-3 h-3 ${urgencyCfg[approveTarget.urgency].arrowColor}`} />
                              </div>
                              <div className={`flex-1 h-1 rounded-full ${urgencyCfg[approveTarget.urgency].arrowBg}`} />
                            </div>
                            <div className="flex-1 bg-primary/5 border border-primary/30 rounded-lg px-4 py-4 text-center">
                              <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">To</p>
                              <p className="text-sm md:text-base font-bold leading-tight">{approveTarget.to.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{approveTarget.to.city}</p>
                            </div>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div>
                          <div className="flex items-baseline justify-between mb-4">
                            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Units to Transfer</p>
                            <span className="text-3xl md:text-4xl font-black tabular-nums">
                              {qty}
                              <span className="text-xs md:text-sm font-normal text-muted-foreground ml-2">units</span>
                            </span>
                          </div>
                          <input
                            type="range"
                            min={approveTarget.minUnits}
                            max={approveTarget.maxUnits}
                            value={qty}
                            onChange={e => setQty(Number(e.target.value))}
                            className="w-full accent-primary cursor-pointer h-2 rounded-full appearance-none bg-muted/60"
                          />
                          <div className="flex justify-between mt-3 text-[10px] text-muted-foreground">
                            <span className="font-medium">Min <strong className="text-foreground">{approveTarget.minUnits}</strong></span>
                            <span className="font-semibold text-primary">AI recommended</span>
                            <span className="font-medium">Max <strong className="text-foreground">{approveTarget.maxUnits}</strong></span>
                          </div>
                        </div>

                        {/* Cost summary */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-muted/30 rounded-xl px-4 py-3 border border-border/40">
                            <p className="text-[10px] text-muted-foreground mb-1.5 font-semibold uppercase tracking-wide">Stock Value</p>
                            <p className="text-lg font-bold tabular-nums">₹{(qty * approveTarget.costPerPc).toLocaleString("en-IN")}</p>
                          </div>
                          <div className="bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-200/60 dark:border-emerald-900/30 rounded-xl px-4 py-3">
                            <p className="text-[10px] text-muted-foreground mb-1.5 font-semibold uppercase tracking-wide">Transfer Cost</p>
                            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹0</p>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-4 md:px-6 pb-5 md:pb-6 flex gap-2 md:gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setApproveTarget(null)}
                          className="flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-300 dark:border-slate-600 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={handleConfirm}
                          className="flex-1 py-2.5 md:py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve & Notify
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}
                        className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center mb-5"
                      >
                        <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h3 className="text-xl font-bold mb-2 text-foreground">Transfer Approved</h3>
                        <p className="text-sm text-muted-foreground mb-5">
                          <strong className="text-foreground">{approveTarget?.approvedQty || qty} units</strong> moving from{" "}
                          <strong className="text-foreground">{approveTarget?.from.name}</strong> to{" "}
                          <strong className="text-foreground">{approveTarget?.to.name}</strong>
                        </p>
                        <div className="bg-muted/30 border border-border/40 rounded-lg px-4 py-4 text-left space-y-2 mb-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Next steps</p>
                          {["Warehouse managers notified via WhatsApp", "Stock dispatch scheduled for today", "Store receives by tomorrow"].map(step => (
                            <div key={step} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                              {step}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">You can close this dialog.</p>
                      </motion.div>
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
