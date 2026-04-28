// ─── Types ───────────────────────────────────────────────────────────────────

export interface InventoryItem {
  id: string;
  name: string;
  variant: string;
  status: "critical" | "warning" | "healthy" | "aged";
  stock: number;
  unit: string;
  daysLeft: number;
  issue: string;
  recommendation: string;
  category: string;
  trend: "up" | "down" | "stable";
  orderQty: number;
  costPerPc: number;
  sizeBreakup: string;
  productionUnit: string;
  dispatchDays: number;
  aiConfidence: number;
}

export interface StockAlert {
  id: string;
  type: "critical" | "warning";
  icon: string;
  title: string;
  issue: string;
  details: string;
  action: string;
  moneyAtRisk: string;
  linkedItemId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  meta: string;
  status: string;
  score: number;
  performance: "Exceptional" | "Reliable" | "At Risk" | "Critical";
  lastLot: string;
  avatar: string;
  autoPilot: boolean;
  autoPilotMode: string;
}

export interface CommsLog {
  time: string;
  actor: string;
  type: "OUTBOUND" | "INBOUND" | "ALERT";
  msg: string;
}

export interface ForecastItem {
  id: string;
  sku: string;
  category: string;
  units: number;
  change: string;
  trend: "up" | "down" | "stable" | "hot";
  confidence: number;
  vlm: string;
}

export interface ChartPoint {
  name: string;
  actual: number | null;
  forecast: number | null;
}

export interface AgentLog {
  time: string;
  type: string;
  typeColor: string;
  text: string;
}

export interface Agent {
  avatar: string;
  name: string;
  status: string;
  meta: string;
  logs: AgentLog[];
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export interface PODetails {
  orderNumber: string;
  style: string;
  sizeBreakup: string;
  quantity: string;
  costPerPc: string;
  totalValue: string;
  productionUnit: string;
  sendVia: string;
  dispatchDate: string;
  aiConfidence: string;
  toastMsg: string;
}

export interface Metrics {
  totalInventory: string;
  sellThroughToday: string;
  forecastAccuracy: string;
  itemsNeedRestock: number;
  oldStockValue: string;
  oldStockPercent: string;
  ordersThisMonth: number;
  autoProcessed: number;
  freshStockValue: string;
  freshStockPercent: number;
  slowStockValue: string;
  slowStockPercent: number;
  deadStockValue: string;
  deadStockPercent: number;
  projectedRevenue: string;
  cutPlanBudget: string;
  onTimeDelivery: string;
  autoPosSent: number;
}

// ─── Metrics ─────────────────────────────────────────────────────────────────

export const METRICS: Metrics = {
  totalInventory: "₹14.2 Cr",
  sellThroughToday: "₹6.8L",
  forecastAccuracy: "91.4%",
  itemsNeedRestock: 142,
  oldStockValue: "₹2.1 Cr",
  oldStockPercent: "14.7%",
  ordersThisMonth: 86,
  autoProcessed: 41,
  freshStockValue: "₹9.4 Cr",
  freshStockPercent: 66,
  slowStockValue: "₹2.7 Cr",
  slowStockPercent: 19,
  deadStockValue: "₹2.1 Cr",
  deadStockPercent: 15,
  projectedRevenue: "₹2.1 Cr",
  cutPlanBudget: "₹68.4 L",
  onTimeDelivery: "74.2%",
  autoPosSent: 86,
};

// ─── Inventory ────────────────────────────────────────────────────────────────

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "inv-001",
    name: "Polo T-Shirt",
    variant: "Navy Blue · Medium",
    status: "critical",
    stock: 560,
    unit: "pcs",
    daysLeft: 2,
    issue: "Will run out in 2 days!",
    recommendation: "Order 3,000 pieces right away",
    category: "Men's Tops",
    trend: "up",
    orderQty: 3000,
    costPerPc: 268,
    sizeBreakup: "S:300 · M:1,200 · L:900 · XL:600",
    productionUnit: "Unit 2 — Ludhiana (In-house)",
    dispatchDays: 8,
    aiConfidence: 96,
  },
  {
    id: "inv-002",
    name: "Printed Kurti",
    variant: "Pink · Large",
    status: "critical",
    stock: 240,
    unit: "pcs",
    daysLeft: 3,
    issue: "Sales jumped 62% — running out fast!",
    recommendation: "Order 2,400 pieces urgently",
    category: "Women's Ethnic",
    trend: "up",
    orderQty: 2400,
    costPerPc: 320,
    sizeBreakup: "S:400 · M:800 · L:800 · XL:400",
    productionUnit: "Surat Ethnic Wear Unit",
    dispatchDays: 6,
    aiConfidence: 88,
  },
  {
    id: "inv-003",
    name: "Crew-Neck Sweatshirt",
    variant: "Grey · Large",
    status: "critical",
    stock: 120,
    unit: "pcs",
    daysLeft: 1,
    issue: "Less than 1 day of stock left!",
    recommendation: "Express order 4,000 pieces immediately",
    category: "Men's Tops",
    trend: "stable",
    orderQty: 4000,
    costPerPc: 380,
    sizeBreakup: "S:600 · M:1,400 · L:1,200 · XL:800",
    productionUnit: "Unit 2 — Ludhiana (In-house)",
    dispatchDays: 5,
    aiConfidence: 93,
  },
  {
    id: "inv-004",
    name: "Anarkali Suit",
    variant: "Maroon · Medium",
    status: "warning",
    stock: 420,
    unit: "pcs",
    daysLeft: 9,
    issue: "Getting low — only 9 days left",
    recommendation: "Plan to restock before Friday",
    category: "Women's Ethnic",
    trend: "down",
    orderQty: 1800,
    costPerPc: 580,
    sizeBreakup: "S:300 · M:700 · L:500 · XL:300",
    productionUnit: "Jaipur Ethnic Manufacturing",
    dispatchDays: 12,
    aiConfidence: 79,
  },
  {
    id: "inv-005",
    name: "Boys Polo Shirt",
    variant: "White · Age 8",
    status: "healthy",
    stock: 1860,
    unit: "pcs",
    daysLeft: 24,
    issue: "Stock levels are perfect",
    recommendation: "No action needed right now",
    category: "Kids",
    trend: "stable",
    orderQty: 2000,
    costPerPc: 180,
    sizeBreakup: "Age 6:400 · Age 8:600 · Age 10:500 · Age 12:500",
    productionUnit: "Unit 3 — Tirupur",
    dispatchDays: 10,
    aiConfidence: 85,
  },
  {
    id: "inv-006",
    name: "Boys Graphic Tee",
    variant: "Yellow · Age 10",
    status: "aged",
    stock: 3240,
    unit: "pcs",
    daysLeft: 110,
    issue: "Sitting unsold for 110 days — needs to go!",
    recommendation: "Start clearance sale — 20% discount",
    category: "Kids",
    trend: "down",
    orderQty: 0,
    costPerPc: 150,
    sizeBreakup: "Age 8:800 · Age 10:1200 · Age 12:800 · Age 14:440",
    productionUnit: "Unit 3 — Tirupur",
    dispatchDays: 0,
    aiConfidence: 91,
  },
  {
    id: "inv-007",
    name: "Ladies Co-ord Set",
    variant: "Beige · Medium",
    status: "healthy",
    stock: 780,
    unit: "pcs",
    daysLeft: 21,
    issue: "Good stock, selling steadily",
    recommendation: "No action needed right now",
    category: "Women's Sets",
    trend: "stable",
    orderQty: 1500,
    costPerPc: 680,
    sizeBreakup: "XS:100 · S:200 · M:280 · L:150 · XL:50",
    productionUnit: "Surat Ethnic Wear Unit",
    dispatchDays: 14,
    aiConfidence: 87,
  },
];

// ─── Alerts ───────────────────────────────────────────────────────────────────

export const CRITICAL_ALERTS: StockAlert[] = [
  {
    id: "alert-001",
    type: "critical",
    icon: "🚨",
    title: "Polo Tee (Navy, Medium) — STOCK RUNNING OUT",
    issue: "Will be completely empty in 2 days",
    details: "47 stores need this item. Warehouse has 1,800 pieces ready to send. We need to move them NOW to avoid losing sales worth ₹4.8 Lakh.",
    action: "Send Stock to Stores",
    moneyAtRisk: "₹4.8 Lakh",
    linkedItemId: "inv-001",
  },
  {
    id: "alert-002",
    type: "critical",
    icon: "📈",
    title: "Printed Kurti (Pink, Large) — HUGE DEMAND",
    issue: "Sales jumped 62% this week — people want this!",
    details: "Customers are buying much more than usual. Factory can make 2,400 more in 6 days. Order now to earn extra ₹7.2 Lakh in profit.",
    action: "Place Order Now",
    moneyAtRisk: "₹7.2 Lakh potential",
    linkedItemId: "inv-002",
  },
  {
    id: "alert-003",
    type: "critical",
    icon: "👕",
    title: "Grey Sweatshirt (Large) — ALMOST OUT",
    issue: "Only 1 day of stock remaining",
    details: "12 stores are already empty. Every day we lose ₹2.4 Lakh in sales. Factory can rush 4,000 pieces in 5 days.",
    action: "Quick Order",
    moneyAtRisk: "₹2.4 Lakh/day lost",
    linkedItemId: "inv-003",
  },
];

export const WARNING_ALERTS: StockAlert[] = [
  {
    id: "alert-004",
    type: "warning",
    icon: "🚚",
    title: "Bulk Order to Indore — DELAYED",
    issue: "Fabric supplier is 6 days behind schedule",
    details: "The fabric company in Tirupur is running late. If they don't deliver by April 22, we could face a ₹5 Lakh penalty with the Indore franchise. Our AI has already sent them follow-up messages.",
    action: "Follow Up With Supplier",
    moneyAtRisk: "₹5 Lakh penalty risk",
  },
  {
    id: "alert-005",
    type: "warning",
    icon: "📦",
    title: "Old Stock Sitting in Warehouse — Money Locked Up",
    issue: "₹2.1 Crore not selling for 90+ days",
    details: "Kids and Boys clothes have been sitting for over 3 months. Consider discounting them to free up ₹2.1 Cr cash for buying fresh, popular stock.",
    action: "Plan Clearance Sale",
    moneyAtRisk: "₹2.1 Cr locked",
  },
  {
    id: "alert-006",
    type: "warning",
    icon: "📉",
    title: "Sales Dropping in North India Stores — Slow Moving",
    issue: "Lucknow & Patna stores selling 14% less than last month",
    details: "These stores are underperforming. Customers there may prefer different styles or sizes. We should review what's being sent and adjust the product mix.",
    action: "Review Store Mix",
    moneyAtRisk: "14% revenue drop",
  },
];

// ─── Suppliers ────────────────────────────────────────────────────────────────

export const SUPPLIERS: Supplier[] = [
  {
    id: "sup-001",
    name: "Tirupur Mélange Yarns Co.",
    category: "Yarn & Raw Materials",
    meta: "22 products · Avg delivery: 8 days",
    status: "Active",
    score: 96,
    performance: "Exceptional",
    lastLot: "Apr 2",
    avatar: "T",
    autoPilot: true,
    autoPilotMode: "Auto Order",
  },
  {
    id: "sup-002",
    name: "Punjab Print House",
    category: "Printing & Designs",
    meta: "14 styles · Avg delivery: 6 days",
    status: "Late ⚠️",
    score: 72,
    performance: "At Risk",
    lastLot: "Apr 5 (Delayed)",
    avatar: "P",
    autoPilot: false,
    autoPilotMode: "Auto Order",
  },
  {
    id: "sup-003",
    name: "Unit 2 — In-house Knitting",
    category: "Internal Manufacturing",
    meta: "18 fabric types · Avg delivery: 4 days",
    status: "Active",
    score: 98,
    performance: "Exceptional",
    lastLot: "Today",
    avatar: "U",
    autoPilot: true,
    autoPilotMode: "Auto Manufacture",
  },
  {
    id: "sup-004",
    name: "Surat Bottoms CMT",
    category: "Stitching & Finishing",
    meta: "Avg delivery: 14 days",
    status: "Under Review",
    score: 54,
    performance: "Critical",
    lastLot: "Mar 28",
    avatar: "S",
    autoPilot: false,
    autoPilotMode: "Manual Review",
  },
  {
    id: "sup-005",
    name: "Delhi Trims & Labels",
    category: "Labels & Accessories",
    meta: "Labels & Hangtags",
    status: "Active",
    score: 94,
    performance: "Reliable",
    lastLot: "Apr 4",
    avatar: "D",
    autoPilot: true,
    autoPilotMode: "Auto Order",
  },
];

export const COMMS_LOG: CommsLog[] = [
  { time: "09:14 AM", actor: "AI Assistant", type: "OUTBOUND", msg: "Order #8421 sent to Unit 2 (4,800 pieces)" },
  { time: "09:18 AM", actor: "Unit 2", type: "INBOUND", msg: "Order received. Fabric issued for production Line 3." },
  { time: "10:02 AM", actor: "AI Assistant", type: "OUTBOUND", msg: "Follow-up sent to Punjab Print House about delayed Lot #PR-2041." },
  { time: "11:30 AM", actor: "System", type: "ALERT", msg: "No response from Punjab Print House for 4 hours — flagged for manual follow-up." },
];

// ─── Forecast ─────────────────────────────────────────────────────────────────

export const FORECAST_ITEMS: ForecastItem[] = [
  { id: "fc-001", sku: "Polo Tee Navy (M)", category: "Men's", units: 8400, change: "+22%", trend: "up", confidence: 94, vlm: "↑ +22%" },
  { id: "fc-002", sku: "Printed Kurti Pink (L)", category: "Women's", units: 5200, change: "+62%", trend: "hot", confidence: 88, vlm: "↑ +62% 🔥" },
  { id: "fc-003", sku: "Crew Sweatshirt Grey (L)", category: "Men's", units: 6100, change: "+14%", trend: "up", confidence: 96, vlm: "↑ +14%" },
  { id: "fc-004", sku: "Anarkali Maroon (M)", category: "Women's", units: 1840, change: "0%", trend: "stable", confidence: 79, vlm: "→ Stable" },
  { id: "fc-005", sku: "Boys Graphic Tee Yellow", category: "Kids", units: 180, change: "-71%", trend: "down", confidence: 91, vlm: "↓ -71%" },
];

export const CHART_DATA: Record<string, ChartPoint[]> = {
  "7": [
    { name: "Mon", actual: 3800, forecast: 4000 },
    { name: "Tue", actual: 4200, forecast: 4100 },
    { name: "Wed", actual: 4500, forecast: 4400 },
    { name: "Thu", actual: 4100, forecast: 4600 },
    { name: "Fri", actual: null, forecast: 5200 },
    { name: "Sat", actual: null, forecast: 6100 },
    { name: "Sun", actual: null, forecast: 5800 },
  ],
  "30": [
    { name: "Week 1", actual: 4000, forecast: 4200 },
    { name: "Week 2", actual: 4500, forecast: 4600 },
    { name: "Week 3", actual: 5100, forecast: 5000 },
    { name: "Week 4", actual: 4800, forecast: 5200 },
    { name: "Week 5", actual: null, forecast: 5800 },
    { name: "Week 6", actual: null, forecast: 6400 },
    { name: "Week 7", actual: null, forecast: 7100 },
    { name: "Week 8", actual: null, forecast: 6800 },
  ],
  "90": [
    { name: "Jan", actual: 28000, forecast: 29000 },
    { name: "Feb", actual: 31000, forecast: 30500 },
    { name: "Mar", actual: 35000, forecast: 34000 },
    { name: "Apr", actual: 33000, forecast: 36000 },
    { name: "May", actual: null, forecast: 42000 },
    { name: "Jun", actual: null, forecast: 48000 },
  ],
};

// ─── Agents ───────────────────────────────────────────────────────────────────

export const AGENTS: Agent[] = [
  {
    avatar: "📦",
    name: "Restocking & Manufacturing Agent",
    status: "Running · Checked 8,420 products at 6:00 AM across 47 stores + warehouses",
    meta: "11 orders + 3 manufacturing orders today · ₹38.4L value",
    logs: [
      { time: "06:00", type: "CHECK", typeColor: "text-blue-500", text: "Scanning all 8,420 products across warehouses, 47 stores, 180 partner stores against stock thresholds..." },
      { time: "06:01", type: "ALERT", typeColor: "text-yellow-500", text: "Polo Navy (M): 47 stores at less than 2 days stock. Warehouse has 1,800 pieces ready. Transfer not raised yet." },
      { time: "06:01", type: "ACTION", typeColor: "text-primary", text: "Creating stock transfer from Ludhiana warehouse → 41 stores (1,750 pieces) based on store size" },
      { time: "06:02", type: "SENT", typeColor: "text-green-500", text: "Stock transfer #STO-2047 released. WhatsApp sent to 41 store managers + warehouse team. Arrives Apr 10." },
      { time: "06:03", type: "ALERT", typeColor: "text-yellow-500", text: "Grey Sweatshirt (L): Only 120 pieces in network. 1 day left. CRITICAL. Raising manufacturing order to Unit 2." },
      { time: "06:04", type: "SENT", typeColor: "text-green-500", text: "Manufacturing order CO-2048 → Unit 2 (Ludhiana). 4,000 pieces. Fabric ready. Delivers Apr 14." },
    ],
  },
  {
    avatar: "📊",
    name: "Sales Forecast & Buying Agent",
    status: "Running · Updating predictions with latest sales data from PAN India stores",
    meta: "91.4% accuracy · Updated daily",
    logs: [
      { time: "05:00", type: "CHECK", typeColor: "text-blue-500", text: "Pulling 90-day sales data from all stores and online channels..." },
      { time: "05:02", type: "CHECK", typeColor: "text-blue-500", text: "Checking return rates, festive calendar (Eid, Diwali, weddings), and seasonal demand patterns for North and East India..." },
      { time: "05:08", type: "ACTION", typeColor: "text-primary", text: "Eid in 18 days + wedding season in 12 days. Increasing demand forecast for 14 ethnic and festive styles." },
      { time: "05:12", type: "DONE", typeColor: "text-green-500", text: "Forecast updated. Printed Kurti Pink flagged as high-confidence spike. Sherwani Kurta added to watchlist." },
      { time: "05:14", type: "ACTION", typeColor: "text-primary", text: "Cotton yarn prices rising +8% in Tirupur market. Recommending to buy fabric early before prices go up further." },
    ],
  },
  {
    avatar: "🤝",
    name: "Vendor & Export Follow-up Agent",
    status: "Running · Watching 18 open orders + 4 inter-city bulk shipments",
    meta: "5 follow-up messages sent today",
    logs: [
      { time: "08:00", type: "CHECK", typeColor: "text-blue-500", text: "Checking status of 18 open orders (yarn, printing, stitching) + 4 inter-city bulk shipments to franchise stores..." },
      { time: "08:01", type: "ALERT", typeColor: "text-yellow-500", text: "Lot #PR-2041 (Punjab Print House) — Expected Apr 4. Now Apr 10. 6 days late." },
      { time: "08:02", type: "ACTION", typeColor: "text-primary", text: "Sending WhatsApp follow-up to Punjab Print House: 'Lot #PR-2041 — when will it be dispatched?'" },
      { time: "08:04", type: "ALERT", typeColor: "text-yellow-500", text: "Bulk Order #BLK-118 (Indore franchise) — Fabric supplier missed dispatch. Penalty risk on Apr 22." },
      { time: "10:02", type: "ACTION", typeColor: "text-primary", text: "No response from Punjab Print House after 2 hours. Sending second message. Flagging for manual follow-up." },
    ],
  },
];

// ─── Activity Log ─────────────────────────────────────────────────────────────

export const ACTIVITY_LOG = [
  { user: "AI Assistant", action: "Auto-ordered 5,000 pieces", target: "Round-Neck Tees", time: "2h ago" },
  { user: "Rahul Sharma", action: "Approved order #8421", target: "Cotton Shorts", time: "5h ago" },
  { user: "AI Assistant", action: "Moved stock", target: "Warehouse B → Warehouse C", time: "8h ago" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const createPOForItem = (item: InventoryItem): PODetails => {
  const totalValue = ((item.orderQty * item.costPerPc) / 100000).toFixed(1);
  const poNum = `CO-${2048 + parseInt(item.id.split("-")[1])}`;
  const dispatchDate = `Apr ${16 + item.dispatchDays - 8} (${item.dispatchDays} days · fabric ready)`;
  return {
    orderNumber: poNum,
    style: `${item.name} · ${item.variant}`,
    sizeBreakup: item.sizeBreakup,
    quantity: `${item.orderQty.toLocaleString()} pieces`,
    costPerPc: `₹${item.costPerPc} (fabric + stitching + trims)`,
    totalValue: `₹${totalValue} Lakh`,
    productionUnit: item.productionUnit,
    sendVia: "WhatsApp + Email",
    dispatchDate,
    aiConfidence: `${item.aiConfidence}% — High confidence`,
    toastMsg: `Order placed: ${item.name} (${item.orderQty.toLocaleString()} pieces) sent to factory via WhatsApp`,
  };
};

export const createLiquidationOrder = (item: InventoryItem): PODetails => ({
  orderNumber: `LIQ-${1000 + parseInt(item.id.split("-")[1])}`,
  style: `${item.name} · ${item.variant}`,
  sizeBreakup: item.sizeBreakup,
  quantity: `${item.stock.toLocaleString()} pieces (all existing stock)`,
  costPerPc: `₹${Math.round(item.costPerPc * 0.6)} (20% discount applied)`,
  totalValue: `₹${((item.stock * item.costPerPc * 0.8) / 100000).toFixed(1)} Lakh (recoverable)`,
  productionUnit: "Clearance via Marketplace + Offline",
  sendVia: "Amazon · Myntra · Flipkart · Offline stores",
  dispatchDate: "Starts within 3 business days",
  aiConfidence: "88% — Will clear within 30 days at this price",
  toastMsg: `Clearance sale started for ${item.name} (${item.stock.toLocaleString()} pieces) at 20% off`,
});

// ─── Inter-Store Transfer ─────────────────────────────────────────────────────

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  zone: string;
  code: string;
}

export interface TransferEndpoint {
  storeId: string;
  name: string;
  city: string;
  stock: number;
  velocity: number; // units/day
  daysCover: number;
}

export interface TransferRecommendation {
  id: string;
  product: string;
  variant: string;
  category: string;
  from: TransferEndpoint;
  to: TransferEndpoint;
  minUnits: number;
  maxUnits: number;
  urgency: "critical" | "high" | "medium";
  estimatedValue: string;
  costPerPc: number;
}

export const STORES: StoreLocation[] = [
  { id: "ST-01", name: "Connaught Place", city: "Delhi", zone: "North India", code: "CP" },
  { id: "ST-02", name: "Lajpat Nagar", city: "Delhi", zone: "North India", code: "LN" },
  { id: "ST-03", name: "Linking Road", city: "Mumbai", zone: "West India", code: "LR" },
  { id: "ST-04", name: "Phoenix Market City", city: "Pune", zone: "West India", code: "PM" },
  { id: "ST-05", name: "Commercial Street", city: "Bangalore", zone: "South India", code: "CS" },
  { id: "ST-06", name: "Park Street", city: "Kolkata", zone: "East India", code: "PS" },
  { id: "ST-07", name: "Anna Nagar", city: "Chennai", zone: "South India", code: "AN" },
  { id: "ST-08", name: "Jubilee Hills", city: "Hyderabad", zone: "South India", code: "JH" },
  { id: "ST-09", name: "CG Road", city: "Ahmedabad", zone: "West India", code: "CG" },
  { id: "ST-10", name: "Sector 17", city: "Chandigarh", zone: "North India", code: "S17" },
];

export const TRANSFER_RECOMMENDATIONS: TransferRecommendation[] = [
  {
    id: "TR-001",
    product: "Polo T-Shirt",
    variant: "Navy Blue · Medium",
    category: "Men's Tops",
    from: { storeId: "ST-03", name: "Linking Road", city: "Mumbai", stock: 520, velocity: 8, daysCover: 65 },
    to:   { storeId: "ST-01", name: "Connaught Place", city: "Delhi", stock: 80, velocity: 42, daysCover: 2 },
    minUnits: 240,
    maxUnits: 300,
    urgency: "critical",
    estimatedValue: "₹72,000",
    costPerPc: 268,
  },
  {
    id: "TR-002",
    product: "Polo T-Shirt",
    variant: "Navy Blue · Medium",
    category: "Men's Tops",
    from: { storeId: "ST-04", name: "Phoenix Market City", city: "Pune", stock: 380, velocity: 5, daysCover: 76 },
    to:   { storeId: "ST-06", name: "Park Street", city: "Kolkata", stock: 95, velocity: 35, daysCover: 3 },
    minUnits: 170,
    maxUnits: 215,
    urgency: "critical",
    estimatedValue: "₹51,400",
    costPerPc: 268,
  },
  {
    id: "TR-003",
    product: "Printed Kurti",
    variant: "Pink · Large",
    category: "Women's Ethnic",
    from: { storeId: "ST-02", name: "Lajpat Nagar", city: "Delhi", stock: 180, velocity: 4, daysCover: 45 },
    to:   { storeId: "ST-01", name: "Connaught Place", city: "Delhi", stock: 30, velocity: 28, daysCover: 1 },
    minUnits: 90,
    maxUnits: 115,
    urgency: "critical",
    estimatedValue: "₹32,800",
    costPerPc: 320,
  },
  {
    id: "TR-004",
    product: "Printed Kurti",
    variant: "Pink · Large",
    category: "Women's Ethnic",
    from: { storeId: "ST-04", name: "Phoenix Market City", city: "Pune", stock: 340, velocity: 3, daysCover: 113 },
    to:   { storeId: "ST-03", name: "Linking Road", city: "Mumbai", stock: 22, velocity: 19, daysCover: 1 },
    minUnits: 130,
    maxUnits: 165,
    urgency: "critical",
    estimatedValue: "₹47,200",
    costPerPc: 320,
  },
  {
    id: "TR-005",
    product: "Crew-Neck Sweatshirt",
    variant: "Grey · Large",
    category: "Men's Tops",
    from: { storeId: "ST-08", name: "Jubilee Hills", city: "Hyderabad", stock: 440, velocity: 3, daysCover: 147 },
    to:   { storeId: "ST-10", name: "Sector 17", city: "Chandigarh", stock: 72, velocity: 28, daysCover: 3 },
    minUnits: 180,
    maxUnits: 240,
    urgency: "high",
    estimatedValue: "₹79,800",
    costPerPc: 380,
  },
  {
    id: "TR-006",
    product: "Printed Kurti",
    variant: "Pink · Large",
    category: "Women's Ethnic",
    from: { storeId: "ST-09", name: "CG Road", city: "Ahmedabad", stock: 200, velocity: 4, daysCover: 50 },
    to:   { storeId: "ST-07", name: "Anna Nagar", city: "Chennai", stock: 15, velocity: 14, daysCover: 1 },
    minUnits: 75,
    maxUnits: 100,
    urgency: "high",
    estimatedValue: "₹28,000",
    costPerPc: 320,
  },
];

// ─── WhatsApp AI Response Generator ──────────────────────────────────────────

export const generateAIResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();

  if (msg.includes("polo") || msg.includes("navy")) {
    return "✅ Polo Navy update: 1,800 pieces at Ludhiana warehouse ready to dispatch. Stock transfer to 41 stores will go out by 2 PM today. Your stores will receive it by Apr 10. Total value: ₹6.3 Lakh.";
  }
  if (msg.includes("kurti") || msg.includes("pink")) {
    return "📈 Printed Kurti (Pink, L): Sales are up 62% this week — people really want this! Only 240 pieces left. Factory can make 2,400 more in 6 days. Shall I place the order now? (Approx ₹7.68 Lakh)";
  }
  if ((msg.includes("stock") || msg.includes("inventory")) && (msg.includes("status") || msg.includes("kitna") || msg.includes("how"))) {
    return "📦 Today's Stock Summary:\n• Total stock value: ₹14.2 Crore\n• Selling well: ₹9.4 Cr (66%)\n• Getting low: 142 products need restocking\n• Old/unsold stock: ₹2.1 Cr (sitting 90+ days)";
  }
  if (msg.includes("order") || msg.includes("po")) {
    return "📋 Today's Orders: 11 purchase orders placed automatically worth ₹38.4 Lakh. 3 more orders are waiting for your approval. Want me to list them with details?";
  }
  if (msg.includes("supplier") || msg.includes("vendor")) {
    return "🤝 Supplier Update:\n• Punjab Print House — delayed 6 days on Lot #PR-2041 (follow-up sent)\n• Unit 2 (Ludhiana) — on track, all orders confirmed\n• 3 other suppliers — all delivering on time";
  }
  if (msg.includes("indore") || msg.includes("franchise") || msg.includes("bulk") || msg.includes("blk-118")) {
    return "🚚 Bulk Order Update: Bulk order #BLK-118 (Indore franchise) is at risk — fabric supplier delayed. Penalty deadline: Apr 22. I'm tracking this hourly and will alert you if it worsens. Want me to contact the backup supplier?";
  }
  if (msg.includes("forecast") || msg.includes("predict") || msg.includes("demand")) {
    return "🎯 Next 30 Days Prediction:\n• Wedding + Eid season starting in 12 days\n• Ethnic wear demand expected to rise 2.8x\n• Top items to stock up: Printed Kurti, Anarkali, Sherwani Kurta\n• Predicted revenue: ₹2.1 Crore";
  }
  if (msg.includes("summary") || msg.includes("aaj") || msg.includes("today") || msg.includes("report")) {
    return "📊 Today's Business Summary:\n• Sales today: ₹6.8 Lakh ✅\n• Urgent issues: 3 (need your attention)\n• Problems solved by AI: 14\n• Orders placed automatically: 11\n• Forecast accuracy: 91.4% 🎯";
  }
  if (msg.includes("haan") || msg.includes("yes") || msg.includes("ok ") || msg.includes("karo") || msg.includes("do it") || msg.includes("confirm")) {
    return "✅ Done! I've actioned your request and notified the relevant teams via WhatsApp. You'll get a confirmation message from the factory/warehouse within the next few minutes.";
  }
  if (msg.includes("nahi") || msg.includes("no") || msg.includes("ruk") || msg.includes("wait") || msg.includes("hold")) {
    return "⏸️ Understood — I've put that action on hold. I'll flag it again tomorrow morning in your daily briefing. Let me know if you'd like to discuss alternatives.";
  }
  if (msg.includes("clearance") || msg.includes("old stock") || msg.includes("aged") || msg.includes("discount")) {
    return "🏷️ Old Stock Plan: ₹2.1 Crore worth of kids and boys clothes sitting for 90+ days. Recommended: 20% discount across Amazon, Myntra, Flipkart. Expected recovery: ₹1.68 Crore within 30 days. Should I set this up?";
  }

  const defaultResponses = [
    "I'm on it! Checking the data right now and will have an update for you shortly.",
    "Got it. Let me pull the latest information from your stores and vendors.",
    "Sure! I'm analysing the patterns across all 47 stores and will give you a recommendation.",
    "Working on that now. I'll have a full breakdown for you in just a moment.",
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
