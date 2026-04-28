import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Target, Wallet, Sparkles, ArrowUpRight,
  Download, Calendar, Search, Lightbulb, Cpu, History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import { toast } from "sonner";
import { FORECAST_ITEMS, CHART_DATA, METRICS } from "@/data/appData";

const RANGE_LABELS: Record<string, string> = { "7": "7 Days", "30": "30 Days", "90": "90 Days" };

const ForecastScreen = () => {
  const [activeRange, setActiveRange] = useState("30");
  const [search, setSearch] = useState("");

  const chartData = CHART_DATA[activeRange] || CHART_DATA["30"];

  const filtered = FORECAST_ITEMS.filter(r =>
    search === "" ||
    r.sku.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

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
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} dx={-10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: any, name: string) => [
                      value?.toLocaleString() ?? "—",
                      name === "forecast" ? "AI Predicted" : "Actual Sales",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorForecast)"
                    name="forecast"
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(var(--muted-foreground))" }}
                    name="actual"
                    connectNulls={false}
                  />
                  <Legend
                    iconType="circle"
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ fontSize: "10px", paddingBottom: "20px" }}
                    formatter={(value) => value === "forecast" ? "AI Predicted" : "Actual Sales"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm font-bold">AI Business Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
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
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toast.info(`${item.title} — ${item.desc}`)}
                  className="p-3 rounded-lg border border-border bg-background/50 hover:border-primary/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {item.icon}
                    <p className="text-xs font-bold leading-none">{item.title}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{item.desc}</p>
                  <div className="flex items-center text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.action} <ArrowUpRight className="w-3 h-3 ml-1" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

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
                <span className="font-bold text-emerald-600">91.4% accurate</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "91.4%" }}
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
                      <Button variant="ghost" size="sm" className="h-8 group-hover:bg-primary/10 group-hover:text-primary transition-all">
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
