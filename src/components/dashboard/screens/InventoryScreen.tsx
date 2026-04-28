import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import type { ScreenName } from "../DashboardLayout";
import {
  Package, AlertTriangle, TrendingDown, CheckCircle2, ArrowRight,
  Download, Plus, Search, LayoutGrid, List as ListIcon, MoreVertical, History, Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ACTIVITY_LOG, type InventoryItem as InventoryItemType } from "@/data/appData";

interface Props {
  onNavigate: (s: ScreenName) => void;
}

const InventoryScreen = ({ onNavigate }: Props) => {
  const { inventory, metrics, openPOForItem, openLiquidationForItem } = useApp();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredItems = inventory.filter(item => {
    const matchesTab =
      activeTab === "all" ? true :
      activeTab === "critical" ? item.status === "critical" :
      activeTab === "low" ? item.status === "warning" :
      activeTab === "aged" ? item.status === "aged" : true;
    const matchesSearch = search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.variant.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const criticalCount = inventory.filter(i => i.status === "critical").length;
  const warningCount = inventory.filter(i => i.status === "warning").length;
  const healthyCount = inventory.filter(i => i.status === "healthy").length;

  const handleAction = (item: InventoryItemType) => {
    if (item.status === "aged") {
      openLiquidationForItem(item);
    } else if (item.status === "critical" || item.status === "warning") {
      openPOForItem(item);
    } else {
      openPOForItem(item);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Overview</h1>
          <p className="text-muted-foreground text-sm">What you have, what you need, what to do — nothing more.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exporting stock report... Check your email in 2 minutes.")}>
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button size="sm" onClick={() => onNavigate("onboard")}>
            <Plus className="w-4 h-4 mr-2" /> Add Products
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Stock Value"
          value={metrics.totalInventory}
          description="+2.4% vs last month"
          icon={<Package className="w-4 h-4 text-primary" />}
        />
        <KPICard
          title="Products Running Out"
          value={String(criticalCount)}
          description="Need immediate action"
          icon={<AlertTriangle className="w-4 h-4 text-destructive" />}
          highlight="destructive"
        />
        <KPICard
          title="Getting Low"
          value={String(warningCount)}
          description="Order within 7–10 days"
          icon={<TrendingDown className="w-4 h-4 text-amber-500" />}
          highlight="warning"
        />
        <KPICard
          title="Well Stocked"
          value={String(healthyCount)}
          description="No action needed"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          highlight="success"
        />
      </div>

      {/* Main Table */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3 px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">All Products</CardTitle>
              <CardDescription>Click any product to take action on it.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 h-9"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center border rounded-md p-1 bg-muted/50">
                <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" className="h-7 w-7 rounded-sm" onClick={() => setViewMode("list")}>
                  <ListIcon className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" className="h-7 w-7 rounded-sm" onClick={() => setViewMode("grid")}>
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full mt-4" onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap h-auto w-full sm:w-auto justify-start gap-1">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="critical" className="data-[state=active]:text-destructive">Running Out</TabsTrigger>
              <TabsTrigger value="low">Getting Low</TabsTrigger>
              <TabsTrigger value="aged">Old Stock</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="px-0 sm:px-6 pb-6">
          <AnimatePresence mode="wait">
            {viewMode === "list" ? (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="border rounded-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow>
                          <TableHead className="w-[280px]">Product</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>In Stock</TableHead>
                          <TableHead>Days Left</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map(item => (
                          <TableRow key={item.id} className="group cursor-pointer hover:bg-muted/20">
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-sm">{item.name}</span>
                                <span className="text-xs text-muted-foreground">{item.variant} · {item.category}</span>
                              </div>
                            </TableCell>
                            <TableCell><StatusBadge status={item.status} /></TableCell>
                            <TableCell>
                              <span className="text-sm font-medium">{item.stock.toLocaleString()} {item.unit}</span>
                            </TableCell>
                            <TableCell>
                              <span className={`text-sm font-bold ${
                                item.daysLeft <= 3 ? "text-destructive" :
                                item.daysLeft <= 10 ? "text-amber-600" : "text-emerald-600"
                              }`}>
                                {item.daysLeft <= 3 && <span className="mr-1 animate-pulse">🔴</span>}
                                {item.daysLeft} days
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant={item.status === "critical" ? "destructive" : item.status === "aged" ? "outline" : "outline"}
                                size="sm"
                                className="h-8 text-xs font-medium"
                                onClick={() => handleAction(item)}
                              >
                                {item.status === "critical" ? "🚨 Order Now" :
                                 item.status === "aged" ? "🏷️ Start Sale" :
                                 item.status === "warning" ? "📦 Restock" : "✏️ Manage"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                {filteredItems.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="font-medium">No products found for "{search}"</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredItems.map(item => (
                  <InventoryCard key={item.id} item={item} onAction={() => handleAction(item)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Insights + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border bg-gradient-to-br from-primary/5 via-transparent to-transparent">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-full">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-base">AI Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {inventory.filter(i => i.status === "critical").slice(0, 2).map(item => (
              <InsightItem
                key={item.id}
                title={`${item.name} — ${item.issue}`}
                message={`${item.recommendation}. At current speed, you'll run out in ${item.daysLeft} day${item.daysLeft === 1 ? "" : "s"}.`}
                priority="high"
                onAction={() => openPOForItem(item)}
                actionLabel="Order Now"
              />
            ))}
            {inventory.filter(i => i.status === "aged").slice(0, 1).map(item => (
              <InsightItem
                key={item.id}
                title={`${item.name} — ${item.issue}`}
                message={`${item.stock.toLocaleString()} pieces sitting for 110 days. A 20% discount sale can free up cash quickly.`}
                priority="medium"
                onAction={() => openLiquidationForItem(item)}
                actionLabel="Start Sale"
              />
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-muted-foreground" />
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ACTIVITY_LOG.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs">
                      <span className="font-bold">{item.user}</span> {item.action}{" "}
                      <span className="font-medium text-primary">{item.target}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, description, icon, highlight }: any) => (
  <Card className="overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md">
    <CardContent className="p-5">
      <div className="flex justify-between items-start mb-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">{title}</p>
        <div className="p-2 rounded-lg bg-muted/50 border border-border/50">{icon}</div>
      </div>
      <h3 className={`text-2xl font-bold tracking-tight ${
        highlight === "destructive" ? "text-destructive" :
        highlight === "warning" ? "text-amber-600" :
        highlight === "success" ? "text-emerald-600" : ""
      }`}>{value}</h3>
      <p className="text-[11px] text-muted-foreground mt-1.5">{description}</p>
    </CardContent>
  </Card>
);

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "critical": return <Badge variant="destructive" className="text-[10px] px-2 py-0.5">RUNNING OUT</Badge>;
    case "warning":  return <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px] px-2 py-0.5">LOW STOCK</Badge>;
    case "aged":     return <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[10px] px-2 py-0.5">OLD STOCK</Badge>;
    default:         return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] px-2 py-0.5">HEALTHY</Badge>;
  }
};

const InventoryCard = ({ item, onAction }: { item: InventoryItemType; onAction: () => void }) => (
  <Card className="overflow-hidden border-border group hover:border-primary/50 transition-colors hover:shadow-md">
    <CardHeader className="p-4 pb-0">
      <div className="flex justify-between items-start">
        <StatusBadge status={item.status} />
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <CardTitle className="text-base mt-3">{item.name}</CardTitle>
      <CardDescription className="text-xs">{item.variant}</CardDescription>
    </CardHeader>
    <CardContent className="p-4 pt-3">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-[10px] uppercase text-muted-foreground font-bold">In Stock</p>
          <p className="text-sm font-semibold">{item.stock.toLocaleString()} {item.unit}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-muted-foreground font-bold">Days Left</p>
          <p className={`text-sm font-bold ${
            item.daysLeft <= 3 ? "text-destructive" :
            item.daysLeft <= 10 ? "text-amber-600" : "text-emerald-600"
          }`}>{item.daysLeft} days</p>
        </div>
      </div>
      <Button onClick={onAction} className="w-full h-8 text-xs font-semibold" variant={item.status === "critical" ? "destructive" : "secondary"}>
        {item.status === "critical" ? "Order Now" :
         item.status === "aged" ? "Start Clearance Sale" : "Manage Stock"}
        <ArrowRight className="w-3 h-3 ml-2" />
      </Button>
    </CardContent>
  </Card>
);

const InsightItem = ({ title, message, priority, onAction, actionLabel }: any) => (
  <div className={`p-4 rounded-lg border flex gap-3 ${priority === "high" ? "bg-red-50/50 border-red-200 dark:bg-red-950/10 dark:border-red-800" : "bg-muted/30 border-border"}`}>
    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${priority === "high" ? "bg-red-500" : "bg-amber-500"}`} />
    <div className="flex-1 space-y-2">
      <p className="text-xs font-bold leading-none">{title}</p>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{message}</p>
      <button
        onClick={onAction}
        className={`text-[11px] font-bold px-3 py-1 rounded-md transition-colors ${
          priority === "high"
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-amber-600 text-white hover:bg-amber-700"
        }`}
      >
        {actionLabel} →
      </button>
    </div>
  </div>
);

export default InventoryScreen;
