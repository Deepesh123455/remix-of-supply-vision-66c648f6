import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "warn";
  color?: "success" | "destructive" | "warning" | "info" | "primary";
  trend?: number[];
  hint?: string;
  onClick?: () => void;
}

const colorMap = {
  success: {
    bar: "bg-success",
    text: "text-success",
    glow: "from-success/20",
    ring: "focus-visible:ring-success/40",
    dot: "bg-success",
  },
  destructive: {
    bar: "bg-destructive",
    text: "text-destructive",
    glow: "from-destructive/25",
    ring: "focus-visible:ring-destructive/40",
    dot: "bg-destructive",
  },
  warning: {
    bar: "bg-warning",
    text: "text-warning",
    glow: "from-warning/20",
    ring: "focus-visible:ring-warning/40",
    dot: "bg-warning",
  },
  info: {
    bar: "bg-info",
    text: "text-info",
    glow: "from-info/20",
    ring: "focus-visible:ring-info/40",
    dot: "bg-info",
  },
  primary: {
    bar: "bg-primary",
    text: "text-primary",
    glow: "from-primary/20",
    ring: "focus-visible:ring-primary/40",
    dot: "bg-primary",
  },
};

const Sparkline = ({ data, colorClass }: { data: number[]; colorClass: string }) => {
  if (!data?.length) return null;
  const w = 80;
  const h = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1 || 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={colorClass}
      />
    </svg>
  );
};

const StatCard = ({ label, value, change, changeType, color = "primary", trend, hint, onClick }: StatCardProps) => {
  const c = colorMap[color];
  const TrendIcon = changeType === "up" ? TrendingUp : changeType === "down" ? TrendingDown : Minus;
  const interactive = !!onClick;

  const content = (
    <>
      {/* top accent bar */}
      <span className={`absolute top-0 left-0 right-0 h-[2px] ${c.bar} opacity-80`} />
      {/* corner glow */}
      <span className={`pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-radial ${c.glow} to-transparent blur-2xl opacity-60`} />

      <div className="relative flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className={`relative flex h-1.5 w-1.5`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-60`} />
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${c.dot}`} />
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">{label}</span>
        </div>
        {interactive && (
          <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        )}
      </div>

      <div className="relative flex items-end justify-between gap-3">
        <div className="text-[26px] font-extrabold text-text-heading tracking-tight leading-none tabular-nums">
          {value}
        </div>
        {trend && trend.length > 1 && (
          <div className={c.text}>
            <Sparkline data={trend} colorClass={c.text} />
          </div>
        )}
      </div>

      {change && (
        <div className={`relative text-[11px] mt-2 flex items-center gap-1 font-medium ${
          changeType === "up" ? "text-success" : changeType === "down" ? "text-destructive" : "text-warning"
        }`}>
          <TrendIcon className="w-3 h-3" />
          {change}
        </div>
      )}

      {hint && (
        <div className="relative text-[10px] mt-1 text-muted-foreground/80 truncate">{hint}</div>
      )}
    </>
  );

  const baseClasses = `group relative overflow-hidden bg-card rounded-xl border border-border shadow-card p-5 pt-[18px] transition-all duration-200`;
  const interactiveClasses = `text-left w-full hover:-translate-y-0.5 hover:shadow-card-hover hover:border-foreground/15 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 ${c.ring}`;

  if (interactive) {
    return (
      <button type="button" onClick={onClick} className={`${baseClasses} ${interactiveClasses}`}>
        {content}
      </button>
    );
  }
  return <div className={baseClasses}>{content}</div>;
};

export default StatCard;
