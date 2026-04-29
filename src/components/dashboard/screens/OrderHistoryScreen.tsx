import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CheckCircle2, Clock, Package } from "lucide-react";
import { useApp } from "@/context/AppContext";

const OrderHistoryScreen = () => {
  const { insightOrders } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          Order History
          {insightOrders.length > 0 && (
            <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {insightOrders.length}
            </span>
          )}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Orders placed from AI Business Insights
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <AnimatePresence>
          {insightOrders.length === 0 ? (
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
                Go to <strong>Sales Forecast</strong> and click "Plan Orders", "Order Fabric", or "See Details" on an AI insight to place an order.
              </p>
            </motion.div>
          ) : (
            <div className="divide-y divide-border/50">
              {insightOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="flex items-center gap-4 px-6 py-5 hover:bg-muted/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{order.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Package className="w-3 h-3" />
                        {order.qty.toLocaleString()} units
                      </span>
                      <span className="text-[11px] text-muted-foreground">·</span>
                      <span className="text-[11px] text-muted-foreground">via {order.action}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 px-2.5 py-0.5 rounded-full">
                      {order.status}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-2.5 h-2.5" />
                      <span>
                        {order.placedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        {" · "}
                        {order.placedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderHistoryScreen;
