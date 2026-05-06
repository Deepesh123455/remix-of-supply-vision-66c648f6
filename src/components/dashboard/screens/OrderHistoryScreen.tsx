import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, CheckCircle2, Clock, Package, Truck,
  AlertCircle, ExternalLink, ChevronDown, ChevronUp,
  Building2, DollarSign, Timer, Star, MapPin
} from "lucide-react";
import { useApp } from "@/context/AppContext";

// Enterprise-grade mock data for that "real feel"
const MOCK_ORDERS = [
  {
    id: "ORD-98421",
    title: "Linen-Blend Summer Shirt",
    qty: 450,
    action: "AI Demand Spike",
    status: "Delivered",
    placedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    vendor: "TextileHub Mumbai",
    vendorLocation: "Mumbai, Maharashtra",
    vendorScore: 4.8,
    cost: "₹4,80,500",
    timeTaken: "4h 12m"
  },
  {
    id: "ORD-98425",
    title: "Oversized Graphic Tee - 'City Lights' Edition",
    qty: 85,
    action: "Low Stock Alert",
    status: "In Transit",
    placedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    completedAt: null,
    vendor: "LogiTrans India",
    vendorLocation: "Bengaluru, Karnataka",
    vendorScore: 4.5,
    cost: "₹24,800",
    timeTaken: "Ongoing"
  },
  {
    id: "ORD-98430",
    title: "Denim - Straight Fit",
    qty: 1200,
    action: "Batch Planning",
    status: "Processing",
    placedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    completedAt: null,
    vendor: "DenimCraft Surat",
    vendorLocation: "Surat, Gujarat",
    vendorScore: 4.9,
    cost: "₹12,45,000",
    timeTaken: "Est. 8h"
  },
  {
    id: "ORD-98418",
    title: "GOTS Organic Supima Cotton Yarn (Ne 40/1)",
    qty: 2500,
    action: "Raw Material Forecast",
    status: "Shipped",
    placedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    completedAt: null,
    vendor: "Global Yarn Co.",
    vendorLocation: "Coimbatore, Tamil Nadu",
    vendorScore: 4.2,
    cost: "₹8,22,000",
    timeTaken: "In Transit"
  },
  {
    id: "ORD-98435",
    title: "Essential Pima Cotton Crewneck - Optic White",
    qty: 320,
    action: "Weekly Auto-Run",
    status: "Pending",
    placedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    completedAt: null,
    vendor: "StyleSync Hub",
    vendorLocation: "New Delhi, NCR",
    vendorScore: 4.7,
    cost: "₹1,95,000",
    timeTaken: "Queued"
  },
  {
    id: "ORD-98410",
    title: "Limited Edition: Hand-Block Print Silk Scarf",
    qty: 150,
    action: "Promotional Insight",
    status: "Delivered",
    placedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 18 * 60 * 60 * 1000),
    vendor: "PromoDirect Hub",
    vendorLocation: "Jaipur, Rajasthan",
    vendorScore: 4.6,
    cost: "₹84,500",
    timeTaken: "6h 45m"
  }
];

const STATUS_CONFIG: Record<string, { icon: any; colorClass: string; bgClass: string; borderClass: string }> = {
  "Delivered": {
    icon: CheckCircle2,
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderClass: "border-emerald-100 dark:border-emerald-900/40"
  },
  "In Transit": {
    icon: Truck,
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-100 dark:border-blue-900/40"
  },
  "Shipped": {
    icon: Truck,
    colorClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/30",
    borderClass: "border-indigo-100 dark:border-indigo-900/40"
  },
  "Processing": {
    icon: Clock,
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-100 dark:border-amber-900/40"
  },
  "Pending": {
    icon: Clock,
    colorClass: "text-slate-600 dark:text-slate-400",
    bgClass: "bg-slate-50 dark:bg-slate-900/30",
    borderClass: "border-slate-100 dark:border-slate-800/40"
  },
  "Cancelled": {
    icon: AlertCircle,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10",
    borderClass: "border-destructive/20"
  },
};

const OrderHistoryScreen = () => {
  const { insightOrders } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formattedInsightOrders = insightOrders.map(o => ({
    ...o,
    placedAt: o.placedAt instanceof Date ? o.placedAt : new Date(o.placedAt),
    completedAt: null,
    vendor: "AI Fulfillment",
    vendorLocation: "Central Logistics Hub",
    vendorScore: 5.0,
    cost: "Calculated at Checkout",
    timeTaken: "Automated"
  }));

  const allOrders = [...formattedInsightOrders, ...MOCK_ORDERS].sort((a, b) =>
    b.placedAt.getTime() - a.placedAt.getTime()
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 w-full px-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Order History
            {allOrders.length > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {allOrders.length}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Comprehensive audit of all automated and manual supply chain transactions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted transition-colors flex items-center gap-2">
            Full Audit Report <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden w-full">
        <AnimatePresence initial={false}>
          {allOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center px-8"
            >
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-muted-foreground/40" />
              </div>
              <p className="text-base font-semibold text-muted-foreground">No orders yet</p>
              <p className="text-sm text-muted-foreground/60 mt-1.5 max-w-xs">
                Fulfillment orders triggered by AI insights will appear here automatically.
              </p>
            </motion.div>
          ) : (
            <div className="divide-y divide-border/50">
              {allOrders.map((order, i) => {
                const config = STATUS_CONFIG[order.status] || STATUS_CONFIG["Pending"];
                const StatusIcon = config.icon;
                const isExpanded = expandedId === order.id;

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`flex flex-col transition-colors ${isExpanded ? 'bg-muted/30' : 'hover:bg-muted/10'}`}
                  >
                    {/* Header Row */}
                    <div
                      className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 cursor-pointer"
                      onClick={() => toggleExpand(order.id)}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${config.bgClass} ${config.borderClass}`}>
                        <StatusIcon className={`w-5 h-5 ${config.colorClass}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{order.title}</p>
                          <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-1.5 py-0.5 rounded uppercase">{order.id}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                            <Package className="w-3 h-3" />
                            {order.qty.toLocaleString()} Units
                          </span>


                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden md:flex flex-col items-end gap-0.5">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Placed</span>
                          <span className="text-[11px] font-medium">{order.placedAt.toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${config.bgClass} ${config.colorClass} ${config.borderClass}`}>
                          {order.status}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-border/60 shadow-inner">

                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                                    <Building2 className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Vendor Details</span>
                                  </div>
                                  <p className="text-sm font-bold">{order.vendor}</p>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    <span className="text-[10px] font-medium">{order.vendorLocation}</span>
                                  </div>
                                </div>

                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">

                                  <span className="text-[10px] font-bold uppercase tracking-wider">Total Consignment</span>
                                </div>
                                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{order.cost}</p>
                                <p className="text-[10px] text-muted-foreground">GST & Logistics Included</p>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                                  <Timer className="w-3.5 h-3.5" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">Turnaround Time</span>
                                </div>
                                <p className="text-sm font-bold">{order.timeTaken}</p>
                                <p className="text-[10px] text-muted-foreground">Placement to Processing</p>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">Fulfillment Status</span>
                                </div>
                                <p className="text-sm font-bold">
                                  {order.completedAt
                                    ? order.completedAt.toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
                                    : order.status === "Delivered" ? "Completed Recently" : "In Progress"
                                  }
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  {order.completedAt ? "Final Delivery Timestamp" : "Awaiting final terminal sync"}
                                </p>
                              </div>

                            </div>

                            <div className="mt-4 flex justify-end gap-3 px-1">
                              <button className="text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors">Raise Dispute</button>
                              <button className="text-[11px] font-bold text-primary hover:underline transition-colors">Download Invoice (PDF)</button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderHistoryScreen;
