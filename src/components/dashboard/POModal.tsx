import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const POModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const handleConfirm = () => {
    onClose();
    toast.success("Cut order CO-2049 released to Unit 2 (Ludhiana) via WhatsApp");
  };

  const lines = [
    { key: "Order Number", value: "CO-2049" },
    { key: "Style", value: "Polo Tee · Navy (MEN-PLO-NVY)" },
    { key: "Size Break-up", value: "S:300 · M:1,200 · L:900 · XL:600" },
    { key: "Quantity", value: "3,000 pcs" },
    { key: "Cost / pc", value: "₹268 (fabric + CMT + trims)" },
    { key: "Total Value", value: "₹8,04,000", highlight: true },
    { key: "Production Unit", value: "Unit 2 — Ludhiana (in-house)" },
    { key: "Send via", value: "WhatsApp + Email + Maplemonk" },
    { key: "Dispatch to DC", value: "Apr 16 (8 days · fabric ready)" },
    { key: "AI Confidence", value: "96% — High confidence", success: true },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">📦 Auto-Generated Purchase Order</DialogTitle>
        </DialogHeader>

        <div className="bg-success/5 border border-success/20 rounded-lg p-3 text-xs text-success">
          🤖 AI generated this PO based on burn rate analysis and supplier lead time. Review and confirm.
        </div>

        <div className="divide-y divide-border">
          {lines.map((line) => (
            <div key={line.key} className="flex justify-between py-2.5 text-sm">
              <span className="text-muted-foreground">{line.key}</span>
              <span className={`font-medium ${line.highlight ? "text-primary" : line.success ? "text-success" : "text-foreground"}`}>
                {line.value}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Edit</Button>
          <Button onClick={handleConfirm} className="flex-1">✓ Confirm & Send PO</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default POModal;
