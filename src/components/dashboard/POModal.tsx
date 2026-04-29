import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const POModal = () => {
  const { currentPO, closePO, confirmPO, placeInsightOrder } = useApp();
  const open = !!currentPO;

  if (!currentPO) return null;

  const isLiquidation = currentPO.orderNumber.startsWith("LIQ-");

  const handleConfirm = () => {
    if (!isLiquidation) {
      placeInsightOrder({
        title: currentPO.style,
        qty: parseInt(currentPO.quantity.replace(/[^0-9]/g, ""), 10) || 0,
        action: "Confirm & Send Order",
      });
    }
    confirmPO();
  };

  const lines = [
    { key: "Reference Number", value: currentPO.orderNumber },
    { key: "Product", value: currentPO.style },
    { key: "Sizes", value: currentPO.sizeBreakup },
    { key: "Total Quantity", value: currentPO.quantity },
    { key: "Cost per Piece", value: currentPO.costPerPc },
    { key: "Total Value", value: currentPO.totalValue, highlight: true },
    { key: isLiquidation ? "Sale Channel" : "Manufacturing Unit", value: currentPO.productionUnit },
    { key: "Notify via", value: currentPO.sendVia },
    { key: isLiquidation ? "Start Date" : "Expected Delivery", value: currentPO.dispatchDate },
    { key: "AI Confidence", value: currentPO.aiConfidence, success: true },
  ];

  return (
    <Dialog open={open} onOpenChange={closePO}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isLiquidation ? "🏷️ Clearance Sale Plan" : "📦 AI-Generated Order — Ready to Confirm"}
          </DialogTitle>
        </DialogHeader>

        <div className={`rounded-lg p-3 text-xs font-medium ${
          isLiquidation
            ? "bg-purple-50 border border-purple-200 text-purple-700"
            : "bg-green-50 border border-green-200 text-green-700"
        }`}>
          🤖 {isLiquidation
            ? "Our AI analysed 90 days of sales data and created this clearance plan to recover maximum cash from old stock."
            : "Our AI analysed your sales speed and supplier lead times to create this order. Please review and confirm."}
        </div>

        <div className="overflow-y-auto max-h-[55vh] divide-y divide-border">
          {lines.map((line) => (
            <div key={line.key} className="flex justify-between py-2.5 text-sm">
              <span className="text-muted-foreground">{line.key}</span>
              <span className={`font-semibold text-right max-w-[60%] ${
                line.highlight ? "text-primary text-base" : line.success ? "text-green-600" : "text-foreground"
              }`}>
                {line.value}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={closePO}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            ✓ {isLiquidation ? "Yes, Start the Sale" : "Confirm & Send Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default POModal;
