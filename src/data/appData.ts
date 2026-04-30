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
  icon?: string;
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
  totalInventory: "₹13.2 L",
  sellThroughToday: "₹68,400",
  forecastAccuracy: "89.2%",
  itemsNeedRestock: 142,
  oldStockValue: "₹1.9 L",
  oldStockPercent: "14.4%",
  ordersThisMonth: 86,
  autoProcessed: 41,
  freshStockValue: "₹8.7 L",
  freshStockPercent: 66,
  slowStockValue: "₹2.6 L",
  slowStockPercent: 20,
  deadStockValue: "₹1.9 L",
  deadStockPercent: 14,
  projectedRevenue: "₹4.8 L",
  cutPlanBudget: "₹2.4 L",
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
  {
    id: "inv-008",
    name: "Denim Jeans (Slim Fit)",
    variant: "Dark Blue · 32",
    status: "warning",
    stock: 450,
    unit: "pcs",
    daysLeft: 8,
    issue: "Inventory dropping faster than last week",
    recommendation: "Order 2,000 units by Wednesday",
    category: "Men's Bottoms",
    trend: "up",
    orderQty: 2000,
    costPerPc: 850,
    sizeBreakup: "28:200 · 30:400 · 32:600 · 34:500 · 36:300",
    productionUnit: "Unit 1 — Ludhiana",
    dispatchDays: 10,
    aiConfidence: 92,
  },
  {
    id: "inv-009",
    name: "Summer Linen Shirt",
    variant: "White · Large",
    status: "critical",
    stock: 85,
    unit: "pcs",
    daysLeft: 3,
    issue: "Stockout imminent before weekend rush",
    recommendation: "Express ship 1,500 units immediately",
    category: "Men's Tops",
    trend: "up",
    orderQty: 1500,
    costPerPc: 1200,
    sizeBreakup: "S:200 · M:500 · L:500 · XL:300",
    productionUnit: "Jaipur Exports",
    dispatchDays: 4,
    aiConfidence: 97,
  },
  {
    id: "inv-010",
    name: "Oversized Hoodie",
    variant: "Black · XL",
    status: "healthy",
    stock: 1200,
    unit: "pcs",
    daysLeft: 45,
    issue: "Steady movement, well managed",
    recommendation: "Monitor for next 30 days",
    category: "Unisex",
    trend: "stable",
    orderQty: 1000,
    costPerPc: 1450,
    sizeBreakup: "M:300 · L:400 · XL:300",
    productionUnit: "Unit 2 — Ludhiana",
    dispatchDays: 12,
    aiConfidence: 89,
  },
  {
    id: "inv-011",
    name: "Kids Cotton Shorts",
    variant: "Blue · Age 6",
    status: "aged",
    stock: 1500,
    unit: "pcs",
    daysLeft: 95,
    issue: "Slow moving seasonal stock",
    recommendation: "Liquidate via bundle offer",
    category: "Kids",
    trend: "down",
    orderQty: 0,
    costPerPc: 320,
    sizeBreakup: "Age 4:300 · Age 6:500 · Age 8:400 · Age 10:300",
    productionUnit: "Unit 3 — Tirupur",
    dispatchDays: 0,
    aiConfidence: 94,
  },
  {
    id: "inv-012",
    name: "Floral Print Dress",
    variant: "Yellow · Medium",
    status: "warning",
    stock: 320,
    unit: "pcs",
    daysLeft: 12,
    issue: "Popular item, replenishment delayed",
    recommendation: "Follow up with Surat supplier",
    category: "Women's Western",
    trend: "up",
    orderQty: 1200,
    costPerPc: 980,
    sizeBreakup: "XS:100 · S:300 · M:400 · L:300 · XL:100",
    productionUnit: "Surat Unit 4",
    dispatchDays: 15,
    aiConfidence: 86,
  },
  {
    id: "inv-013",
    name: "Classic Chinos",
    variant: "Khaki · 34",
    status: "healthy",
    stock: 950,
    unit: "pcs",
    daysLeft: 30,
    issue: "Healthy stock levels",
    recommendation: "Regular check-in next week",
    category: "Men's Bottoms",
    trend: "stable",
    orderQty: 800,
    costPerPc: 1100,
    sizeBreakup: "30:200 · 32:300 · 34:300 · 36:150",
    productionUnit: "Unit 1 — Ludhiana",
    dispatchDays: 10,
    aiConfidence: 91,
  },
  {
    id: "inv-014",
    name: "Ankle Socks (5-pack)",
    variant: "Multi · Free Size",
    status: "critical",
    stock: 45,
    unit: "sets",
    daysLeft: 2,
    issue: "Major stockout across 10 stores",
    recommendation: "Order 5,000 sets immediately",
    category: "Accessories",
    trend: "up",
    orderQty: 5000,
    costPerPc: 450,
    sizeBreakup: "Standard:5000",
    productionUnit: "Tirupur Accessory Unit",
    dispatchDays: 5,
    aiConfidence: 98,
  },
  {
    id: "inv-015",
    name: "Leather Belt",
    variant: "Tan · Large",
    status: "healthy",
    stock: 400,
    unit: "pcs",
    daysLeft: 55,
    issue: "Low velocity but stable",
    recommendation: "No action required",
    category: "Accessories",
    trend: "stable",
    orderQty: 200,
    costPerPc: 650,
    sizeBreakup: "S:100 · M:150 · L:150",
    productionUnit: "Jodhpur Leather Works",
    dispatchDays: 20,
    aiConfidence: 82,
  },
  {
    id: "inv-016",
    name: "V-Neck T-Shirt",
    variant: "White · Small",
    status: "warning",
    stock: 180,
    unit: "pcs",
    daysLeft: 7,
    issue: "Running low on core sizes",
    recommendation: "Restock small/medium sizes",
    category: "Men's Tops",
    trend: "up",
    orderQty: 1000,
    costPerPc: 250,
    sizeBreakup: "S:400 · M:400 · L:200",
    productionUnit: "Unit 2 — Ludhiana",
    dispatchDays: 7,
    aiConfidence: 93,
  },
  {
    id: "inv-017",
    name: "Cargo Shorts",
    variant: "Olive · 32",
    status: "critical",
    stock: 120,
    unit: "pcs",
    daysLeft: 4,
    issue: "High demand from coastal stores",
    recommendation: "Move stock from North to South",
    category: "Men's Bottoms",
    trend: "up",
    orderQty: 1200,
    costPerPc: 750,
    sizeBreakup: "30:300 · 32:500 · 34:400",
    productionUnit: "Unit 1 — Ludhiana",
    dispatchDays: 8,
    aiConfidence: 95,
  },
  {
    id: "inv-018",
    name: "Winter Muffler",
    variant: "Grey · Free Size",
    status: "aged",
    stock: 800,
    unit: "pcs",
    daysLeft: 150,
    issue: "Off-season inventory",
    recommendation: "Warehouse store until next season",
    category: "Accessories",
    trend: "down",
    orderQty: 0,
    costPerPc: 350,
    sizeBreakup: "Standard:800",
    productionUnit: "Ludhiana Woolens",
    dispatchDays: 0,
    aiConfidence: 88,
  },
];

// ─── Alerts ───────────────────────────────────────────────────────────────────

export const CRITICAL_ALERTS: StockAlert[] = [
  {
    id: "alert-001",
    type: "critical",
    title: "Polo Tee (Navy, Medium) — Stock Running Out",
    issue: "Will be completely empty in 2 days",
    details: "8 stores including Connaught Place (ST-01), Lajpat Nagar (ST-02), and Linking Road (ST-03) are critically low. Warehouse has 180 pieces ready for immediate dispatch. Transfer now to protect sales revenue in the range of ₹45k - ₹52k.",
    action: "Send Stock to Stores",
    moneyAtRisk: "₹45k - ₹52k",
    linkedItemId: "inv-001",
  },
  {
    id: "alert-002",
    type: "critical",
    title: "Printed Kurti (Pink, Large) — High Demand",
    issue: "Sales jumped 62% this week — people want this!",
    details: "High velocity detected at Commercial Street (ST-05) and Anna Nagar (ST-07). Customers are buying faster than anticipated. Factory capacity allows for 240 units in 6 days. Capture an estimated ₹70k - ₹85k in potential revenue.",
    action: "Place Order Now",
    moneyAtRisk: "₹70k - ₹85k",
    linkedItemId: "inv-002",
  },
  {
    id: "alert-003",
    type: "critical",
    title: "Grey Sweatshirt (Large) — Almost Out",
    issue: "Only 1 day of stock remaining",
    details: "Sector 17 (ST-10) and CG Road (ST-09) are currently stocked out. Every day we lose an estimated ₹22k - ₹28k in sales. Express factory line can rush 400 pieces in 5 business days.",
    action: "Quick Order",
    moneyAtRisk: "₹22k - ₹28k",
    linkedItemId: "inv-003",
  },
  {
    id: "alert-006",
    type: "critical",
    title: "Cargo Pants (Olive) — Viral Trend Detected",
    issue: "Social mentions up 400% in Mumbai region",
    details: "Phoenix Mall (ST-12) and Palladium (ST-13) have sold out of all sizes. AI predicts a sustain in demand for the next 14 days. Current warehouse stock is 0. Urgent replenishment needed to capture ₹60k - ₹75k in additional revenue.",
    action: "Express Order Now",
    moneyAtRisk: "₹60k - ₹75k",
    linkedItemId: "inv-005",
  },
  {
    id: "alert-008",
    type: "critical",
    title: "Slim Fit Chinos (Tan) — Quality Flag",
    issue: "3 returns from ST-01 citing stitching issues",
    details: "Batch #B-992 from Tirupur Unit shows a recurring defect in the inner seam. We need to pause sales at all 14 stores and recall the 240 units to avoid brand damage and ₹35k - ₹40k in return processing costs.",
    action: "Recall Batch",
    moneyAtRisk: "₹35k - ₹40k",
  },
  {
    id: "alert-009",
    type: "critical",
    title: "Linen Shirt (White) — Massive Inbound Delay",
    issue: "Shipment stuck at Mundra Port due to strike",
    details: "1,200 units for the Summer Drop are delayed. Stores in Ahmedabad (ST-15, ST-16) will run out by Friday. Estimated revenue loss if not resolved: ₹1.2 L - ₹1.5 L. Consider air-freighting a smaller batch from the factory.",
    action: "Authorize Air Freight",
    moneyAtRisk: "₹1.2 L - ₹1.5 L",
  },
  {
    id: "alert-010",
    type: "critical",
    title: "V-Neck Tee (Black) — Stockout Imminent",
    issue: "Central Warehouse inventory down to 45 units",
    details: "Global sales for basic tees have spiked. ST-04 (Bangalore) and ST-08 (Chennai) have 0 stock. Replenishment lead time is 10 days. Immediate factory booking required to save ₹25k - ₹30k in lost sales.",
    action: "Book Factory Slot",
    moneyAtRisk: "₹25k - ₹30k",
  },
  {
    id: "alert-011",
    type: "critical",
    title: "Denim Jacket (Blue) — Pricing Error",
    issue: "Sold at ₹1,200 instead of ₹2,400 at ST-05",
    details: "A system sync error caused a 50% discount to be applied incorrectly at the Commercial Street store. 12 units sold in 2 hours. Fix the price sync immediately to prevent a ₹15k - ₹18k margin loss.",
    action: "Fix Price Sync",
    moneyAtRisk: "₹15k - ₹18k",
  },
  {
    id: "alert-020",
    type: "critical",
    title: "Ladies Co-ord Set — Viral Spike",
    issue: "Influencer tag at 1 PM led to 800 site visits",
    details: "Real-time demand surge detected. ST-01 and ST-03 are almost out of Medium sizes. Warehouse stock is healthy but needs immediate dispatch to local hubs. Potential ₹1.5 L revenue in next 24h.",
    action: "Authorize Quick Move",
    moneyAtRisk: "₹1.5 L",
  },
];

export const WARNING_ALERTS: StockAlert[] = [
  {
    id: "alert-004",
    type: "warning",
    title: "Bulk Order to Indore — Delayed",
    issue: "Fabric supplier is 6 days behind schedule",
    details: "The supplier in Tirupur is running late. If they don't deliver by April 22, we could face a ₹45k - ₹55k penalty with the Indore franchise (ST-22). AI has already sent follow-up messages.",
    action: "Follow Up With Supplier",
    moneyAtRisk: "₹45k - ₹55k risk",
  },
  {
    id: "alert-005",
    type: "warning",
    title: "Old Stock Sitting in Warehouse",
    issue: "₹1.8 L - ₹2.1 L capital locked for 90+ days",
    details: "Kids and Boys clothing in Warehouse B have been sitting for over 3 months. Consider a liquidation sale to free up cash for high-velocity summer items. Estimated recovery: ₹1.8 L - ₹2.1 L.",
    action: "Plan Clearance Sale",
    moneyAtRisk: "₹1.8 L - ₹2.1 L locked",
  },
  {
    id: "alert-007",
    type: "warning",
    title: "GST Portal Sync Failed",
    issue: "Cloud API returned 503 error 4 times today",
    details: "Invoices from the last 6 hours haven't been pushed to the government portal. Manual sync or retry required to avoid compliance delays and potential ₹15k - ₹20k late fees.",
    action: "Retry Sync",
    moneyAtRisk: "₹15k - ₹20k risk",
  },
  {
    id: "alert-012",
    type: "warning",
    title: "North India Sales Dip",
    issue: "Lucknow & Patna stores down 14%",
    details: "Footfall in North India malls has decreased by 10%. Inventory at ST-18 and ST-19 is moving slower than predicted. Consider transferring stock to South India where demand is higher.",
    action: "Review Regional Split",
    moneyAtRisk: "₹30k - ₹45k slow stock",
  },
  {
    id: "alert-013",
    type: "warning",
    title: "Oversized Hoodie — Low ROAS",
    issue: "Ad spend of ₹12k today generated only ₹8k sales",
    details: "Marketing campaign on Instagram for hoodies is underperforming in the 18-24 demographic. AI suggests pausing the ad or changing the creative to avoid wasting ₹50k monthly budget.",
    action: "Pause Marketing",
    moneyAtRisk: "₹50k budget risk",
  },
  {
    id: "alert-014",
    type: "warning",
    title: "Leather Belt Batch — Transit Warning",
    issue: "Truck #HR-55-1234 stopped for 8 hours",
    details: "GPS tracking shows the shipment from Jodhpur is stationary near Jaipur. Driver not answering calls. Could delay ST-02 and ST-03 replenishment. Monitor for another 4 hours.",
    action: "Contact Logistics Lead",
    moneyAtRisk: "₹12k transit delay",
  },
  {
    id: "alert-015",
    type: "warning",
    title: "Anarkali Maroon — Slowing Down",
    issue: "Sales velocity dropped from 12/day to 4/day",
    details: "The festive season peak has passed. We still have 400 units in central warehouse. Avoid further production and start planning a post-festival bundle offer to clear ₹60k - ₹70k in stock.",
    action: "Halt Production",
    moneyAtRisk: "₹60k - ₹70k stock",
  },
  {
    id: "alert-016",
    type: "warning",
    title: "Supplier Price Hike Warning",
    issue: "Surat Unit 2 announced 8% increase on Rayon",
    details: "From May 1st, raw material costs will rise. If we book a bulk order of 2,000 meters now, we can save ₹40k - ₹50k in production costs for the June collection.",
    action: "Pre-book Material",
    moneyAtRisk: "₹40k - ₹50k savings",
  },
  {
    id: "alert-017",
    type: "warning",
    title: "ST-09 (Chandigarh) — Staff Shortage",
    issue: "3 staff members on leave simultaneously",
    details: "Store operations might be affected during peak hours (6 PM - 9 PM). Potential customer loss due to slow service. Consider temporary shift relocation from ST-10.",
    action: "Relocate Staff",
    moneyAtRisk: "₹10k - ₹15k revenue loss",
  },
  {
    id: "alert-018",
    type: "warning",
    title: "Kids Shorts — Size Mismatch",
    issue: "5% of batch labelled 'S' but measures 'M'",
    details: "Customer feedback from online orders indicates sizing issues. We need to re-verify the stock at the warehouse before more units are shipped to avoid ₹8k - ₹12k in return shipping costs.",
    action: "Audit Warehouse Stock",
    moneyAtRisk: "₹8k - ₹12k returns",
  },
  {
    id: "alert-019",
    type: "warning",
    title: "New Store Launch (ST-25) — Prep Check",
    issue: "Opening in 10 days, stock only 40% ready",
    details: "The launch in Pune is approaching. Critical categories like Denims and Outerwear are still in transit. Need to expedite logistics to ensure a successful opening and avoid ₹2 L opening day revenue loss.",
    action: "Expedite Launch Stock",
    moneyAtRisk: "₹2 L launch revenue",
  },
  {
    id: "alert-021",
    type: "warning",
    title: "Packaging Shortage (Bio-bags)",
    issue: "Central Warehouse out of 'Medium' size bags",
    details: "Our sustainable packaging supplier is facing labor issues. We have 4 days of supply left for online orders. AI suggests switching to standard recyclable bags as temporary fallback.",
    action: "Switch to Fallback",
    moneyAtRisk: "₹5k compliance risk",
  },
  {
    id: "alert-022",
    type: "warning",
    title: "ST-05 (Chennai) — Power Cut Risk",
    issue: "Scheduled maintenance in T.Nagar on Sunday",
    details: "Electricity will be off from 10 AM to 5 PM. Backup generator needs fuel check. Expected 30% drop in footfall. Plan digital-only promotion for that store customers.",
    action: "Push Digital Promo",
    moneyAtRisk: "₹25k potential loss",
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
    name: "Surat Ethnic Weaves",
    category: "Fabrics & Finished Goods",
    meta: "14 products · Avg delivery: 12 days",
    status: "Active",
    score: 84,
    performance: "Reliable",
    lastLot: "Mar 28",
    avatar: "S",
    autoPilot: false,
    autoPilotMode: "Manual Approval",
  },
  {
    id: "sup-003",
    name: "Ludhiana Knitwear Ltd.",
    category: "Hosiery & Winterwear",
    meta: "31 products · Avg delivery: 15 days",
    status: "Action Required",
    score: 62,
    performance: "At Risk",
    lastLot: "Apr 5",
    avatar: "L",
    autoPilot: true,
    autoPilotMode: "Critical Alerts Only",
  },
  {
    id: "sup-004",
    name: "Jaipur Exports Group",
    category: "Cotton & Linens",
    meta: "18 products · Avg delivery: 7 days",
    status: "Active",
    score: 91,
    performance: "Exceptional",
    lastLot: "Apr 10",
    avatar: "J",
    autoPilot: true,
    autoPilotMode: "Auto Order",
  },
  {
    id: "sup-005",
    name: "Ahmedabad Denim Hub",
    category: "Denim & Heavy Fabrics",
    meta: "9 products · Avg delivery: 10 days",
    status: "Active",
    score: 78,
    performance: "Reliable",
    lastLot: "Apr 1",
    avatar: "A",
    autoPilot: false,
    autoPilotMode: "Manual Approval",
  },
  {
    id: "sup-006",
    name: "Indore Logistics & Supply",
    category: "Logistics Partner",
    meta: "National Coverage",
    status: "Active",
    score: 89,
    performance: "Reliable",
    lastLot: "Daily",
    avatar: "I",
    autoPilot: true,
    autoPilotMode: "Auto Route",
  },
  {
    id: "sup-007",
    name: "Tirupur Finishing Unit",
    category: "Processing",
    meta: "Dyeing & Printing",
    status: "Critical",
    score: 45,
    performance: "Critical",
    lastLot: "Mar 15",
    avatar: "F",
    autoPilot: false,
    autoPilotMode: "On Hold",
  },
  {
    id: "sup-008",
    name: "Delhi Packaging Co.",
    category: "Packaging Materials",
    meta: "Bio-bags & Cartons",
    status: "Active",
    score: 82,
    performance: "Reliable",
    lastLot: "Apr 8",
    avatar: "P",
    autoPilot: true,
    autoPilotMode: "Auto Replenish",
  },
  {
    id: "sup-009",
    name: "Mumbai Fast-Logistics",
    category: "Last Mile Delivery",
    meta: "Tier 1 Cities",
    status: "Active",
    score: 94,
    performance: "Exceptional",
    lastLot: "Live",
    avatar: "M",
    autoPilot: true,
    autoPilotMode: "Auto Dispatch",
  },
  {
    id: "sup-010",
    name: "Bangalore Tech-Labeling",
    category: "Accessories",
    meta: "RFID & Tags",
    status: "Active",
    score: 88,
    performance: "Reliable",
    lastLot: "Apr 5",
    avatar: "B",
    autoPilot: true,
    autoPilotMode: "Auto Order",
  },
  {
    id: "sup-011",
    name: "Kolkata Cotton Mills",
    category: "Raw Cotton",
    meta: "Bulk Supply",
    status: "Action Required",
    score: 68,
    performance: "At Risk",
    lastLot: "Mar 20",
    avatar: "K",
    autoPilot: false,
    autoPilotMode: "Manual",
  },
  {
    id: "sup-012",
    name: "Panipat Furnishing",
    category: "Fabrics",
    meta: "Heavy Duty",
    status: "Active",
    score: 75,
    performance: "Reliable",
    lastLot: "Apr 2",
    avatar: "H",
    autoPilot: false,
    autoPilotMode: "Manual",
  },
  {
    id: "sup-013",
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
    id: "sup-014",
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
    id: "sup-015",
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
    id: "sup-016",
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
    meta: "11 orders + 3 manufacturing orders today · ₹3.84 L value",
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
    meta: "89.2% accuracy · Updated daily",
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
    from: { storeId: "ST-03", name: "Linking Road", city: "Mumbai", stock: 52, velocity: 3, daysCover: 17 },
    to:   { storeId: "ST-01", name: "Connaught Place", city: "Delhi", stock: 8, velocity: 4, daysCover: 2 },
    minUnits: 22,
    maxUnits: 30,
    urgency: "critical",
    estimatedValue: "₹7,100",
    costPerPc: 268,
  },
  {
    id: "TR-002",
    product: "Printed Kurti",
    variant: "Pink · Large",
    category: "Women's Ethnic",
    from: { storeId: "ST-02", name: "Lajpat Nagar", city: "Delhi", stock: 36, velocity: 2, daysCover: 18 },
    to:   { storeId: "ST-01", name: "Connaught Place", city: "Delhi", stock: 5, velocity: 3, daysCover: 2 },
    minUnits: 12,
    maxUnits: 18,
    urgency: "critical",
    estimatedValue: "₹4,800",
    costPerPc: 320,
  },
  {
    id: "TR-003",
    product: "Crew-Neck Sweatshirt",
    variant: "Grey · Large",
    category: "Men's Tops",
    from: { storeId: "ST-08", name: "Jubilee Hills", city: "Hyderabad", stock: 48, velocity: 2, daysCover: 24 },
    to:   { storeId: "ST-10", name: "Sector 17", city: "Chandigarh", stock: 7, velocity: 3, daysCover: 2 },
    minUnits: 15,
    maxUnits: 22,
    urgency: "high",
    estimatedValue: "₹6,840",
    costPerPc: 380,
  },
];

// ─── WhatsApp AI Response Generator ──────────────────────────────────────────

export const generateAIResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();

  if (msg.includes("polo") || msg.includes("navy")) {
    return "✅ Polo Navy update: 180 pieces at warehouse ready to dispatch. Stock transfer to 8 stores going out by 2 PM today. Stores will receive by Apr 10. Total value moved: ₹63,000.";
  }
  if (msg.includes("kurti") || msg.includes("pink")) {
    return "📈 Printed Kurti (Pink, L): Sales up 62% this week — demand is real! Only 24 pieces left. Factory can make 240 more in 6 days. Shall I place the order now? (Approx ₹76,800)";
  }
  if ((msg.includes("stock") || msg.includes("inventory")) && (msg.includes("status") || msg.includes("kitna") || msg.includes("how"))) {
    return "📦 Today's Stock Summary:\n• Total stock value: ₹13.2 Lakh\n• Selling well: ₹8.7 L (66%)\n• Getting low: 14 products need restocking\n• Old/unsold stock: ₹1.9 L (sitting 90+ days)";
  }
  if (msg.includes("order") || msg.includes("po")) {
    return "📋 Today's Orders: 11 purchase orders placed automatically worth ₹3.84 L. 3 more orders are waiting for your approval. Want me to list them?";
  }
  if (msg.includes("supplier") || msg.includes("vendor")) {
    return "🤝 Supplier Update:\n• Punjab Print House — delayed 6 days on Lot #PR-2041 (follow-up sent)\n• Unit 2 (Ludhiana) — on track, all orders confirmed\n• 3 other suppliers — all delivering on time";
  }
  if (msg.includes("indore") || msg.includes("franchise") || msg.includes("bulk") || msg.includes("blk-118")) {
    return "🚚 Bulk Order Update: Bulk order #BLK-118 (Indore franchise) is at risk — fabric supplier delayed. Penalty deadline: Apr 22. Tracking this hourly. Want me to contact the backup supplier?";
  }
  if (msg.includes("forecast") || msg.includes("predict") || msg.includes("demand")) {
    return "🎯 Next 30 Days Prediction:\n• Wedding + Eid season starting in 12 days\n• Ethnic wear demand expected to rise 2.8x\n• Top items to stock up: Printed Kurti, Anarkali, Sherwani Kurta\n• Predicted revenue: ₹4.8 Lakh";
  }
  if (msg.includes("summary") || msg.includes("aaj") || msg.includes("today") || msg.includes("report")) {
    return "📊 Today's Business Summary:\n• Sales today: ₹68,400 ✅\n• Urgent issues: 3 (need your attention)\n• Problems solved by AI: 14\n• Orders placed automatically: 11\n• Forecast accuracy: 89.2% 🎯";
  }
  if (msg.includes("haan") || msg.includes("yes") || msg.includes("ok ") || msg.includes("karo") || msg.includes("do it") || msg.includes("confirm")) {
    return "✅ Done! I've actioned your request and notified the relevant teams via WhatsApp. You'll get a confirmation from the factory/warehouse in a few minutes.";
  }
  if (msg.includes("nahi") || msg.includes("no") || msg.includes("ruk") || msg.includes("wait") || msg.includes("hold")) {
    return "⏸️ Understood — I've put that action on hold. I'll flag it again tomorrow morning in your daily briefing. Let me know if you'd like to discuss alternatives.";
  }
  if (msg.includes("clearance") || msg.includes("old stock") || msg.includes("aged") || msg.includes("discount")) {
    return "🏷️ Old Stock Plan: ₹1.9 Lakh worth of kids and boys clothes sitting for 90+ days. Recommended: 20% discount across Amazon, Myntra, Flipkart. Expected recovery: ₹1.52 L within 30 days. Should I set this up?";
  }

  const defaultResponses = [
    "I'm on it! Checking the data right now and will have an update for you shortly.",
    "Got it. Let me pull the latest information from your stores and vendors.",
    "Sure! I'm analysing the patterns across all 47 stores and will give you a recommendation.",
    "Working on that now. I'll have a full breakdown for you in just a moment.",
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
