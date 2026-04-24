interface AlertItemProps {
  icon: string;
  iconType: "critical" | "warning" | "info" | "success";
  title: string;
  desc: string;
  time?: string;
  actionLabel?: string;
  actionVariant?: "default" | "success";
  onAction?: () => void;
  badge?: string;
  badgeType?: "critical" | "warning" | "success";
}

const iconBg = {
  critical: "bg-destructive/10",
  warning: "bg-warning/10",
  info: "bg-info/10",
  success: "bg-success/10",
};

const badgeStyles = {
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  success: "bg-success/10 text-success border-success/20",
};

const AlertItem = ({ icon, iconType, title, desc, time, actionLabel, actionVariant, onAction, badge, badgeType }: AlertItemProps) => (
  <div className="flex items-start gap-3 px-4 py-3.5 border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors cursor-pointer">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5 ${iconBg[iconType]}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium text-foreground mb-1">{title}</div>
      <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
    </div>
    <div className="flex flex-col items-end gap-1.5 shrink-0">
      {time && <span className="text-[10px] text-muted-foreground/50">{time}</span>}
      {badge && badgeType && (
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${badgeStyles[badgeType]}`}>{badge}</span>
      )}
      {actionLabel && (
        <button
          onClick={onAction}
          className={`text-[10px] font-medium px-2.5 py-1 rounded-md border transition-colors ${
            actionVariant === "success"
              ? "bg-success/10 border-success/30 text-success hover:bg-success/20"
              : "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
          }`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

export default AlertItem;
