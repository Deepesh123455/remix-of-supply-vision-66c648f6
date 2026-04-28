import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Clock, Zap, ClipboardCheck, MessageSquare, Bot,
  Settings2, Search, Plus, ChevronRight, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import { COMMS_LOG } from "@/data/appData";

const SuppliersScreen = () => {
  const { suppliers, toggleSupplierAutoPilot, metrics } = useApp();
  const [search, setSearch] = useState("");

  const filtered = suppliers.filter(s =>
    search === "" ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const atRiskCount = suppliers.filter(s => s.performance === "At Risk" || s.performance === "Critical").length;
  const autoPilotOn = suppliers.filter(s => s.autoPilot).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground text-sm">Your factory floor, without leaving your desk.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("Vendor invite link copied! Share it with your supplier.")}>
            <Users className="w-4 h-4 mr-2" /> Invite Vendor
          </Button>
          <Button size="sm" onClick={() => toast.info("Vendor registration form will open in a new tab.")}>
            <Plus className="w-4 h-4 mr-2" /> Add New Vendor
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="On-Time Delivery"
          value={metrics.onTimeDelivery}
          description="-2.1% from last batch"
          icon={<Clock className="w-4 h-4 text-emerald-500" />}
          color="bg-emerald-500"
        />
        <KPICard
          title="Vendors with Issues"
          value={String(atRiskCount)}
          description="Need your attention"
          icon={<AlertCircle className="w-4 h-4 text-destructive" />}
          color="bg-destructive"
        />
        <KPICard
          title="Auto-Orders Sent Today"
          value={String(metrics.autoPosSent)}
          description="₹38.4L handled by AI"
          icon={<Zap className="w-4 h-4 text-primary" />}
          color="bg-primary"
        />
        <KPICard
          title="Auto-Pilot Vendors"
          value={String(autoPilotOn)}
          description={`${suppliers.length - autoPilotOn} still on manual`}
          icon={<ClipboardCheck className="w-4 h-4 text-amber-500" />}
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor Table */}
        <Card className="lg:col-span-2 border-border shadow-sm overflow-hidden">
          <CardHeader className="px-6 border-b border-border/50 bg-muted/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Vendor Performance</CardTitle>
                <CardDescription>How reliable are your suppliers?</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search vendor..."
                  className="pl-8 h-8 text-xs w-[200px]"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow>
                    <TableHead className="pl-6 text-xs font-bold uppercase">Vendor</TableHead>
                    <TableHead className="text-xs font-bold uppercase">Status</TableHead>
                    <TableHead className="text-xs font-bold uppercase">Reliability</TableHead>
                    <TableHead className="text-right pr-6 text-xs font-bold uppercase">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(s => (
                    <TableRow
                      key={s.id}
                      className="hover:bg-muted/10 transition-colors cursor-pointer group"
                      onClick={() => toast.info(`${s.name}: Last delivery on ${s.lastLot}. Score: ${s.score}/100.`)}
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
                            {s.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-sm group-hover:text-primary transition-colors">{s.name}</div>
                            <div className="text-[10px] text-muted-foreground">{s.category}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] py-0 h-5 ${s.status.includes("Late") ? "border-destructive/30 text-destructive bg-destructive/5" :
                            s.status.includes("Review") ? "border-amber-300 text-amber-700 bg-amber-50" :
                              "border-emerald-200 text-emerald-700 bg-emerald-50"
                          }`}>
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{s.score}/100</span>
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${s.score > 90 ? "bg-emerald-500" : s.score > 70 ? "bg-amber-500" : "bg-destructive"}`}
                              style={{ width: `${s.score}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <span className={`text-[11px] font-bold uppercase tracking-wide ${s.performance === "Exceptional" ? "text-emerald-600" :
                            s.performance === "Reliable" ? "text-primary" :
                              s.performance === "At Risk" ? "text-amber-600" : "text-destructive"
                          }`}>
                          {s.performance}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Auto-Pilot */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <CardTitle className="text-base">AI Auto-Ordering</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info("Auto-pilot settings page coming soon.")}>
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Turn ON to let AI place orders automatically when stock runs low</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {suppliers.map(s => (
                <motion.div
                  key={s.id}
                  layout
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold truncate max-w-[140px]">{s.name.split(" ").slice(0, 3).join(" ")}</div>
                    <div className="text-[10px] text-muted-foreground">{s.autoPilotMode}</div>
                  </div>
                  <Switch
                    checked={s.autoPilot}
                    onCheckedChange={() => toggleSupplierAutoPilot(s.id)}
                  />
                </motion.div>
              ))}
              <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-[11px] text-foreground font-medium leading-relaxed">
                  <Zap className="w-3 h-3 text-primary inline-block mr-1 mb-0.5" />
                  AI sent <span className="font-bold">11 orders</span> and <span className="font-bold">3 vendor requests</span> today without you having to do anything.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Comms Log */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Recent Messages</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {COMMS_LOG.map((log, i) => (
                  <div
                    key={i}
                    className="px-5 py-3 hover:bg-muted/5 transition-colors cursor-pointer"
                    onClick={() => toast.info(`${log.actor}: ${log.msg}`)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${log.type === "ALERT" ? "bg-destructive/10 text-destructive" :
                          log.type === "INBOUND" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                        {log.type === "OUTBOUND" ? "SENT" : log.type === "INBOUND" ? "RECEIVED" : "ALERT"}
                      </span>
                      <span className="text-[9px] text-muted-foreground">{log.time}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      <span className="font-bold">{log.actor}:</span> {log.msg}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full text-[10px] h-9 text-muted-foreground hover:text-primary"
                onClick={() => toast.info("Full message history — feature coming soon.")}
              >
                See All Messages <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, description, icon, color }: any) => (
  <Card className="overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md relative">
    <div className={`absolute top-0 left-0 w-full h-1 ${color}`} />
    <CardContent className="p-5 pt-6">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{title}</p>
        <div className="p-2 rounded-lg bg-muted/50 border border-border/50">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
      <p className="text-[11px] text-muted-foreground mt-1.5 italic">{description}</p>
    </CardContent>
  </Card>
);

export default SuppliersScreen;
