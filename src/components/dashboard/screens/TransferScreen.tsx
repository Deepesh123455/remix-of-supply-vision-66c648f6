import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, X, Zap as Lightning, AlertCircle, ChevronDown, ChevronUp, Package, MoveRight
} from "lucide-react";
import { toast } from "sonner";
import { STORES } from "@/data/appData";
import { useApp, type Transfer } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const storeCodeMap = Object.fromEntries(STORES.map(s => [s.id, s.code]));

const TransferScreen = () => {
  const { transfers, approveTransfer, rejectTransfer } = useApp();
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [approveTarget, setApproveTarget] = useState<Transfer | null>(null);
  const [qty, setQty] = useState(0);

  const pendingCount = transfers.filter(t => t.status === "pending").length;
  const approvedCount = transfers.filter(t => t.status === "approved").length;
  const totalValue = "₹18,740";

  const sorted = transfers
    .filter(t => t.status === activeTab)
    .sort((a, b) => {
      const o = { critical: 0, high: 1, medium: 2 };
      return o[a.urgency] - o[b.urgency];
    });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openModal = (t: Transfer) => {
    setApproveTarget(t);
    setQty(Math.round((t.minUnits + t.maxUnits) / 2));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Store Transfers</h1>
          <p className="text-muted-foreground text-sm font-medium">Intelligent stock rebalancing across your network.</p>
        </div>
        <div className="flex bg-muted/40 p-1 rounded-xl border border-border/40">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "pending" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "approved" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Approved ({approvedCount})
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Pending Value" value="₹12.4 L" sub="8 high priority items" />
        <StatCard label="Moved Today" value={totalValue} sub="Completed transfers" />
        <StatCard label="AI Efficiency" value="98.2%" sub="Stockout prevention rate" />
      </div>

      {/* Transfer List */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {sorted.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center border-2 border-dashed border-primary/20 rounded-2xl bg-primary/5"
            >
              <Package className="w-10 h-10 mx-auto text-primary/20 mb-3" />
              <p className="text-sm font-semibold text-primary/60">No {activeTab} transfers to display</p>
            </motion.div>
          ) : (
            sorted.map((t) => (
              <TransferItem
                key={t.id}
                transfer={t}
                isExpanded={expandedId === t.id}
                onToggle={() => toggleExpand(t.id)}
                onApprove={() => {
                  const confirmedQty = Math.round((t.minUnits + t.maxUnits) / 2);
                  approveTransfer(t.id, confirmedQty);
                  toast.success(`Transfer initiated: ${confirmedQty} units`);
                }}
                onEdit={() => openModal(t)}
                onDecline={() => rejectTransfer(t.id)}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Edit Qty Modal */}
      <AnimatePresence>
        {approveTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setApproveTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-card border border-primary/30 rounded-2xl shadow-2xl p-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-primary" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Adjust Units</h3>
                <button onClick={() => setApproveTarget(null)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Confirmed Quantity</span>
                    <span className="text-3xl font-black text-primary">{qty} <span className="text-sm font-normal text-muted-foreground">pcs</span></span>
                  </div>
                  <input
                    type="range"
                    min={approveTarget.minUnits}
                    max={approveTarget.maxUnits}
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    className="w-full accent-primary h-2 bg-muted rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-3 text-[10px] font-bold text-muted-foreground/60 uppercase">
                    <span>Min {approveTarget.minUnits}</span>
                    <span className="text-primary/60 italic">AI Range</span>
                    <span>Max {approveTarget.maxUnits}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Button variant="outline" className="rounded-xl font-bold h-11" onClick={() => setApproveTarget(null)}>Cancel</Button>
                  <Button className="rounded-xl font-bold h-11 shadow-lg shadow-primary/20" onClick={() => {
                    approveTransfer(approveTarget.id, qty);
                    setApproveTarget(null);
                    toast.success(`Units adjusted and move confirmed.`);
                  }}>Confirm</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TransferItem = ({ transfer: t, isExpanded, onToggle, onApprove, onEdit, onDecline }: any) => {
  const isPending = t.status === "pending";
  
  return (
    <motion.div
      layout
      className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${
        isExpanded 
          ? "border-primary/40 bg-primary/[0.02] shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
          : "border-primary/10 hover:border-primary/30 hover:shadow-md bg-card"
      }`}
    >
      {/* Summary Header - Perfect Alignment Grid */}
      <div 
        className="grid grid-cols-[1fr_320px_100px_180px] items-center px-6 py-4 cursor-pointer"
        onClick={onToggle}
      >
        {/* Column 1: Product Info */}
        <div className="flex items-center gap-5 min-w-0">
          <div className={`w-2 h-2 rounded-full shrink-0 shadow-sm ${
            t.urgency === "critical" ? "bg-destructive animate-pulse" : 
            t.urgency === "high" ? "bg-primary" : "bg-muted-foreground/30"
          }`} />
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-0.5">
              <span className="text-[10px] font-bold text-primary/40 tracking-wider font-mono shrink-0">{t.id}</span>
              <span className="text-base font-bold truncate tracking-tight">{t.product}</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium truncate opacity-70">{t.variant} · {t.category}</p>
          </div>
        </div>

        {/* Column 2: Route */}
        <div className="flex items-center justify-center gap-6 px-4 border-x border-primary/5">
          <div className="text-right w-24">
            <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">{storeCodeMap[t.from.storeId]}</p>
            <p className="text-xs font-bold text-foreground/80 truncate">{t.from.city}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
            <MoveRight className="w-3.5 h-3.5 text-primary/60" />
          </div>
          <div className="text-left w-24">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">{storeCodeMap[t.to.storeId]}</p>
            <p className="text-xs font-bold text-foreground/80 truncate">{t.to.city}</p>
          </div>
        </div>

        {/* Column 3: Quantity */}
        <div className="text-center px-4">
          <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest leading-none mb-1.5">Quantity</p>
          <p className="text-base font-black text-foreground tabular-nums tracking-tight">{t.minUnits}-{t.maxUnits}</p>
        </div>

        {/* Column 4: Status & Toggle */}
        <div className="flex items-center justify-end gap-5">
          {isPending ? (
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
              t.urgency === "critical" ? "text-destructive border-destructive/20 bg-destructive/5" : 
              t.urgency === "high" ? "text-primary border-primary/20 bg-primary/5" : "text-muted-foreground border-border bg-muted/30"
            }`}>
              {t.urgency}
            </span>
          ) : (
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest px-3 py-1 border-primary/30 text-primary bg-primary/5 rounded-full">
              Settled
            </Badge>
          )}
          <div className={`p-1.5 rounded-full transition-colors shrink-0 ${isExpanded ? "bg-primary/10" : "group-hover:bg-muted"}`}>
            {isExpanded ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
      </div>

      {/* Expandable Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="px-6 pb-6"
          >
            <div className="pt-4 border-t border-primary/10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Detailed Analytics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <DetailBlock label="Source Current Stock" value={t.from.stock} sub={`${t.from.daysCover}d cover remaining`} />
                  <DetailBlock label="Average Velocity" value={`${t.from.velocity}/day`} sub="Units per day sales" />
                </div>
                <div className="space-y-3">
                  <DetailBlock label="Target Current Stock" value={t.to.stock} sub={`${t.to.daysCover}d cover remaining`} highlight />
                  <DetailBlock label="Target Velocity" value={`${t.to.velocity}/day`} sub="Units per day sales" highlight />
                </div>
              </div>

              {/* Decision Support & Actions */}
              <div className="flex flex-col justify-between">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs leading-relaxed text-muted-foreground shadow-inner">
                  <Lightning className="w-4 h-4 text-primary inline mr-2 mb-0.5" />
                  <span className="font-bold text-foreground uppercase tracking-wider text-[10px]">AI Optimization Insight:</span> 
                  <p className="mt-2 text-foreground/80 font-medium">
                    {t.to.name} is projected to stock out in {t.to.daysCover} days. Moving {Math.round((t.minUnits + t.maxUnits) / 2)} units from {t.from.name} optimizes network health without impacting the source store's performance.
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  {isPending ? (
                    <>
                      <Button className="flex-[2] h-11 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-sm tracking-wide" onClick={(e) => { e.stopPropagation(); onApprove(); }}>Approve Move</Button>
                      <Button variant="outline" className="flex-1 h-11 rounded-xl font-bold text-xs" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Adjust</Button>
                      <Button variant="ghost" className="flex-1 h-11 rounded-xl font-bold text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all" onClick={(e) => { e.stopPropagation(); onDecline(); }}>Decline</Button>
                    </>
                  ) : (
                    <div className="flex items-center gap-3 text-sm font-bold text-primary bg-primary/5 w-full p-3 rounded-xl border border-primary/10">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{t.approvedQty} units approved — Logistics team notified.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DetailBlock = ({ label, value, sub, highlight }: any) => (
  <div className={`p-4 rounded-xl border transition-all duration-300 ${
    highlight 
      ? "border-primary/30 bg-primary/[0.03] shadow-sm" 
      : "border-primary/10 bg-card hover:border-primary/20"
  }`}>
    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-1.5">{label}</p>
    <div className="flex items-baseline gap-1.5">
      <p className="text-xl font-black tabular-nums tracking-tight">{value}</p>
      <span className="text-[10px] font-bold text-muted-foreground/40 uppercase">Units</span>
    </div>
    <p className="text-[11px] text-muted-foreground font-semibold mt-1 opacity-70 italic">{sub}</p>
  </div>
);

const StatCard = ({ label, value, sub }: any) => (
  <Card className="p-5 border-primary/10 shadow-sm bg-white/90 dark:bg-card/90 transition-all group overflow-hidden relative">
    <p className="text-[11px] font-black text-muted-foreground/60 uppercase tracking-[0.15em] mb-2">{label}</p>
    <h3 className="text-2xl font-black tracking-tighter text-foreground mb-1">{value}</h3>
    <p className="text-[11px] text-primary/60 font-bold tracking-tight">{sub}</p>
  </Card>
);

export default TransferScreen;
