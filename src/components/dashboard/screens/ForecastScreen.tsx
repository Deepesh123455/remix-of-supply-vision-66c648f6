import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Target, Wallet, Sparkles, ArrowUpRight,
  Download, Calendar, Search, Lightbulb, Cpu, History,
  X, CheckCircle2, ShoppingBag, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import { toast } from "sonner";
import { FORECAST_ITEMS, CHART_DATA, METRICS } from "@/data/appData";
import { useApp } from "@/context/AppContext";

const RANGE_LABELS: Record<string, string> = { "7": "7 Days", "30": "30 Days", "90": "90 Days" };

interface InsightItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action: string;
}


const INSIGHT_ITEMS: InsightItem[] = [
  {
    icon: <Sparkles className="w-3 h-3 text-purple-500" />,
    title: "Eid + Wedding Season Starting Soon",
    desc: "Big demand coming in 12 days. Ethnic wear sales may go up 2.8x. Stock up now!",
    action: "Plan Orders",
  },
  {
    icon: <TrendingUp className="w-3 h-3 text-emerald-500" />,
    title: "Fabric Prices Going Up",
    desc: "Cotton yarn prices in Tirupur rising 8%. Buy fabric now before it gets more expensive.",
    action: "Order Fabric",
  },
  {
    icon: <Lightbulb className="w-3 h-3 text-blue-500" />,
    title: "East India Demand Growing",
    desc: "Kolkata & Bhubaneswar stores selling 38% more ethnic styles. Consider sending more of these.",
    action: "See Details",
  },
];

const ForecastScreen = () => {
  const { placeInsightOrder, insightOrders } = useApp();
  const [activeRange, setActiveRange] = useState("30");
  const [search, setSearch] = useState("");
  const [orderModal, setOrderModal] = useState<InsightItem | null>(null);
  const [orderQty, setOrderQty] = useState(200);

  const chartData = CHART_DATA[activeRange] || CHART_DATA["30"];

  const filtered = FORECAST_ITEMS.filter(r =>
    search === "" ||
    r.sku.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  const openOrderModal = (item: InsightItem) => {
    setOrderModal(item);
    setOrderQty(200);
  };

  const handlePlaceOrder = () => {
    if (!orderModal) return;
    placeInsightOrder({ title: orderModal.title, qty: orderQty, action: orderModal.action });
    toast.success(`Order placed! ${orderQty} units for "${orderModal.title}"`, { duration: 4000 });
    setOrderModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Sales Forecast
            <Badge className="bg-primary/10 text-primary border-none text-[10px] py-0 px-1.5 h-4 font-bold">AI POWERED</Badge>
          </h1>
          <p className="text-muted-foreground text-sm">
            Tomorrow's demand, calculated today. Act before your competition.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Downloading forecast report... Check your email in 2 minutes.")}>
            <Download className="w-4 h-4 mr-2" /> Download Report
          </Button>
          <Button size="sm" onClick={() => toast.info("Planning mode lets you simulate order quantities — coming soon.")}>
            <Calendar className="w-4 h-4 mr-2" /> Plan Orders
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="AI Prediction Accuracy"
          value={METRICS.forecastAccuracy}
          description="Getting better every day!"
          icon={<Target className="w-4 h-4 text-emerald-500" />}
          color="border-l-emerald-500"
        />
        <KPICard
          title="Expected Sales (7 Days)"
          value={METRICS.projectedRevenue}
          description="Wedding + Eid season boost"
          icon={<TrendingUp className="w-4 h-4 text-primary" />}
          color="border-l-primary"
        />
        <KPICard
          title="Budget Needed for New Orders"
          value={METRICS.cutPlanBudget}
          description="For next 14 days of restocking"
          icon={<Wallet className="w-4 h-4 text-amber-500" />}
          color="border-l-amber-500"
        />
        <KPICard
          title="Hot Products Right Now"
          value="34"
          description="Products with rising demand"
          icon={<Sparkles className="w-4 h-4 text-purple-500" />}
          color="border-l-purple-500"
        />
      </div>

      {/* Chart + Intel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div>
              <CardTitle className="text-lg">Sales Trend</CardTitle>
              <CardDescription>What actually happened vs what AI predicted.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-1 border rounded-md p-1 bg-muted/30">
              {["7", "30", "90"].map(r => (
                <Button
                  key={r}
                  variant={activeRange === r ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-3 text-[10px]"
                  onClick={() => setActiveRange(r)}
                >
                  {RANGE_LABELS[r]}
                </Button>
              ))}
            </div>
          </CardHeader>          <CardContent className="px-2">
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                    </linearGradient>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01} />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.08} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
                    dy={15}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
                    dx={-10}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-2xl min-w-[160px]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
                            <div className="space-y-2">
                              {payload.map((entry: any, index: number) => (
                                <div key={index} className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className="text-xs font-medium text-foreground">{entry.name === "forecast" ? "AI Prediction" : "Actual Sales"}</span>
                                  </div>
                                  <span className="text-xs font-bold tabular-nums">
                                    {entry.value?.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">pcs</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorForecast)"
                    name="forecast"
                    connectNulls
                    dot={false}
                    animationDuration={1500}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorActual)"
                    name="actual"
                    dot={false}
                    animationDuration={1500}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="square"
                    iconSize={10}
                    wrapperStyle={{ fontSize: "11px", fontWeight: 600, paddingBottom: "30px" }}
                    formatter={(value) => (
                      <span className="text-foreground/70 uppercase tracking-tighter text-[9px]">
                        {value === "forecast" ? "AI Projected Demand" : "Live Sales Performance"}
                      </span>
                    )}
                  />


                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>


        </Card>

        <div className="space-y-6">
          {/* AI Business Insights */}
          <Card className="border-border shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm font-bold">AI Business Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {INSIGHT_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg border border-border bg-background/50 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {item.icon}
                    <p className="text-xs font-bold leading-none">{item.title}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{item.desc}</p>
                  <button
                    onClick={() => openOrderModal(item)}
                    className="flex items-center text-[10px] font-bold text-primary hover:underline"
                  >
                    {item.action} <ArrowUpRight className="w-3 h-3 ml-1" />
                  </button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* AI Accuracy */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-muted-foreground" />
                <CardTitle className="text-sm font-bold">How Accurate Is Our AI?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Prediction vs actual sales</span>
                <span className="font-bold text-emerald-600">89.2% accurate</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "89.2%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <p className="text-[10px] text-muted-foreground italic">
                AI was updated 4 hours ago with fresh sales data from all stores and franchise partners.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order History */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm font-bold">Order History</CardTitle>
              {insightOrders.length > 0 && (
                <Badge className="bg-primary/10 text-primary border-none text-[10px] px-1.5 h-4 font-bold">
                  {insightOrders.length}
                </Badge>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">Orders placed from AI insights</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <AnimatePresence>
            {insightOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-5 h-5 text-muted-foreground/50" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">No orders yet</p>
                <p className="text-[11px] text-muted-foreground/70 mt-1">
                  Click "Plan Orders", "Order Fabric", or "See Details" on an insight above to place an order.
                </p>
              </motion.div>
            ) : (
              <div className="divide-y divide-border/50">
                {insightOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i === 0 ? 0 : 0 }}
                    className="flex items-center gap-4 px-5 py-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{order.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-muted-foreground">{order.qty.toLocaleString()} units</span>
                        <span className="text-[11px] text-muted-foreground">·</span>
                        <span className="text-[11px] text-muted-foreground">via {order.action}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 px-2 py-0.5 rounded-full">
                        {order.status}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{order.placedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Forecast Table */}
      <Card className="border-border shadow-sm">
        <CardHeader className="px-6 border-b border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Top Products — Next 30 Days Prediction</CardTitle>
              <CardDescription>AI forecast for your best-selling styles</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search product..."
                className="pl-8 h-8 text-xs w-[180px]"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/20">
                <TableRow>
                  <TableHead className="text-xs font-bold pl-6">Product</TableHead>
                  <TableHead className="text-xs font-bold">Expected Sales</TableHead>
                  <TableHead className="text-xs font-bold">Trend</TableHead>
                  <TableHead className="text-xs font-bold">AI Confidence</TableHead>
                  <TableHead className="text-right pr-6">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(r => (
                  <TableRow
                    key={r.id}
                    className="hover:bg-muted/10 transition-colors cursor-pointer group"
                    onClick={() => toast.info(`${r.sku}: Expected ${r.units.toLocaleString()} units sold next 30 days. Trend: ${r.change}. Confidence: ${r.confidence}%.`)}
                  >
                    <TableCell className="pl-6">
                      <div>
                        <div className="font-semibold text-sm">{r.sku}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{r.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-sm text-primary">{r.units.toLocaleString()} pcs</span>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 text-xs font-bold ${r.trend === "down" ? "text-destructive" : "text-emerald-600"}`}>
                        {r.vlm}
                        {r.trend === "hot" && <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
                          <div className={`h-full ${r.confidence > 90 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${r.confidence}%` }} />
                        </div>
                        <Badge variant="outline" className={`text-[10px] font-bold ${r.confidence > 90 ? "border-emerald-200 text-emerald-700 bg-emerald-50" : "border-amber-200 text-amber-700 bg-amber-50"}`}>
                          {r.confidence}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="sm" className="h-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm group-hover:shadow-md">
                        Details <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Modal */}
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
                {/* Accent stripe */}
                <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/60" />

                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-border">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">AI Business Insight</p>
                    <h2 className="text-base font-bold tracking-tight leading-tight">{orderModal.title}</h2>
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
                    <p className="text-sm text-muted-foreground leading-relaxed">{orderModal.desc}</p>
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
                      min={50}
                      max={1000}
                      step={10}
                      value={orderQty}
                      onChange={e => setOrderQty(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">Min 50</span>
                      <span className="text-[10px] font-semibold text-primary">Slide to adjust</span>
                      <span className="text-[10px] text-muted-foreground">Max 1,000</span>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-xl px-4 py-3">
                      <p className="text-[10px] text-muted-foreground mb-1">Action</p>
                      <p className="text-sm font-bold">{orderModal.action}</p>
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
                    className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
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

const KPICard = ({ title, value, description, icon, color }: any) => (
  <Card className={`overflow-hidden border-border/50 border-l-4 ${color} shadow-sm transition-all hover:shadow-md`}>
    <CardContent className="p-5">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
        <div className="p-2 rounded-lg bg-muted/50 border border-border/50">{icon}</div>
      </div>
      <h3 className="text-2xl font-black tracking-tight">{value}</h3>
      <p className="text-[11px] text-muted-foreground mt-1.5 font-medium">{description}</p>
    </CardContent>
  </Card>
);

export default ForecastScreen;
