import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import whatsappImg from "@/assets/Screenshot 2026-04-28 123157.png";
import dashboardImg from "@/assets/Screenshot 2026-04-28 123307.png";
import vendorImg from "@/assets/Screenshot 2026-04-28 123340.png";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  TrendingUp,
  ArrowLeftRight,
  Package,
  Star,
  MessageSquare,
  BarChart3,
  AlertTriangle,
  Clock,
  ClipboardList,
  Target,
  ArrowRight,
  CheckCircle,
  Zap,
  ChevronRight,
  Sparkles,
  Shield,
  Globe,
} from "lucide-react";

/* ─── cubic-bezier ease tuple ─── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: EASE },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ─── animated counter ─── */
function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = 16;
    const increment = (target / 2000) * step;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(current.toFixed(decimals)));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

/* ─── scroll-triggered section wrapper ─── */
function Section({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" as never });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

/* ─── floating hero card ─── */
function FloatingCard({
  children,
  className = "",
  delay = 0,
  amplitude = 12,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
}) {
  return (
    <motion.div
      className={`absolute bg-white rounded-2xl shadow-2xl border border-white/60 backdrop-blur-sm p-4 ${className}`}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar({ onCTA }: { onCTA: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/90 backdrop-blur-xl border-b border-[#E8E4DE] shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* logo */}
        <div className="flex flex-col ">

          <span className="text-lg font-bold tracking-tight" style={{ color: "#1C1917" }}>
            ChainOS
          </span>
          <span className="text-xs text-zinc-500 ">
            Powered by InvisibleCTO
          </span>

        </div>

        {/* actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCTA}
            className="text-sm font-medium hidden md:block transition-colors hover:text-[#B07D3A]"
            style={{ color: "#78716C" }}
          >
            Sign In
          </button>
          <motion.button
            onClick={onCTA}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
              boxShadow: "0 4px 20px rgba(176,125,58,0.35)",
            }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════ */
function HeroSection({ onCTA }: { onCTA: () => void }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "#F0EDE8" }}
    >
      {/* glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4A85A, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #4A7C59, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full py-20">
        {/* left copy */}
        <motion.div style={{ y: y1 }} className="space-y-8 relative z-10">


          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight"
            style={{ color: "#1C1917" }}
          >
            AI-Powered{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Retail Intelligence
            </span>{" "}
            for Smarter Decisions
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: "#78716C" }}
          >
            Forecast demand, automate inter-store transfers, monitor vendor
            reliability, and optimize your supply chain from one intelligent
            platform.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            {/* primary CTA */}
            <motion.button
              onClick={onCTA}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(176,125,58,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
                boxShadow: "0 4px 20px rgba(176,125,58,0.35)",
              }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* secondary */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold border-2 transition-colors"
              style={{ color: "#1C1917", borderColor: "#1C1917", background: "transparent" }}
            >
              Learn More <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-6 pt-2"
          >
            {[
              { icon: Shield, text: "Enterprise Grade" },
              { icon: Globe, text: "47 Stores Connected" },
              { icon: CheckCircle, text: "89% Accuracy" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color: "#78716C" }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: "#4A7C59" }} />
                {text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* right — animated dashboard preview */}
        <div className="relative h-[520px] hidden lg:block">
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(176,125,58,0.25), transparent 70%)",
            }}
          />

          {/* browser mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute inset-8 bg-white rounded-3xl shadow-2xl border border-white/80 overflow-hidden"
          >
            <div className="h-10 flex items-center px-4 gap-1.5" style={{ background: "#1A1A1A" }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
              <div
                className="ml-2 h-4 flex-1 rounded text-[10px] flex items-center px-2"
                style={{ background: "#2A2A2A", color: "#A8A29E" }}
              >
                supplyvision.ai/dashboard
              </div>
            </div>
            <div className="p-5 space-y-4" style={{ background: "#F0EDE8" }}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Orders Today", value: "1,247", color: "#4A7C59" },
                  { label: "Forecast Acc.", value: "89%", color: "#B07D3A" },
                  { label: "Alerts Saved", value: "3", color: "#6BAE82" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3 shadow-sm">
                    <p className="text-[10px] font-medium mb-1" style={{ color: "#78716C" }}>
                      {s.label}
                    </p>
                    <p className="text-lg font-bold" style={{ color: s.color }}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-[10px] font-semibold mb-3" style={{ color: "#1C1917" }}>
                  Weekly Orders Trend
                </p>
                <div className="flex items-end gap-1.5 h-16">
                  {[58, 64, 53, 70, 67, 75, 72].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{ background: i === 5 ? "#B07D3A" : "#E8E4DE" }}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: 0.8 + i * 0.08 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* floating info cards */}
          <FloatingCard className="top-4 -right-4 w-44" delay={0} amplitude={10}>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(74,124,89,0.12)" }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: "#4A7C59" }} />
              </div>
              <div>
                <p className="text-[9px] font-medium" style={{ color: "#78716C" }}>
                  Orders vs last week
                </p>
                <p className="text-xs font-bold" style={{ color: "#1C1917" }}>
                  +8% ↑ steady growth
                </p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="bottom-20 -left-4 w-48" delay={0.8} amplitude={14}>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#4A7C59" }}
              />
              <p className="text-[9px] font-bold" style={{ color: "#1C1917" }}>
                AI Transfer Suggestion
              </p>
            </div>
            <p className="text-[9px] leading-relaxed" style={{ color: "#78716C" }}>
              Move 48 units T-Shirt XL
              <br />
              Store 3 → Store 11
            </p>
          </FloatingCard>

          <FloatingCard className="bottom-4 right-0 w-40" delay={1.4} amplitude={8}>
            <p className="text-[9px] font-bold mb-1" style={{ color: "#1C1917" }}>
              Vendor Reliability
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full" style={{ background: "#E8E4DE" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: "87%", background: "#4A7C59" }}
                />
              </div>
              <span className="text-[10px] font-bold" style={{ color: "#4A7C59" }}>
                87
              </span>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PROBLEMS SECTION
══════════════════════════════════════════ */
const problems = [
  {
    icon: Package,
    title: "Overstocking",
    desc: "Excess inventory ties up capital and warehousing costs spiraling out of control.",
  },
  {
    icon: AlertTriangle,
    title: "Stockouts",
    desc: "Lost sales and unhappy customers when bestsellers run empty unexpectedly.",
  },
  {
    icon: Clock,
    title: "Supplier Delays",
    desc: "Unpredictable lead times with no visibility into supplier reliability.",
  },
  {
    icon: ClipboardList,
    title: "Manual Inventory",
    desc: "Hours wasted on spreadsheets instead of strategic decisions.",
  },
  {
    icon: Target,
    title: "Poor Forecasting",
    desc: "Gut-feeling ordering causing seasonal mismatches and markdowns.",
  },
];

function ProblemsSection() {
  return (
    <Section className="py-16 px-6" style={{ background: "#F9F7F5" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-10 space-y-3">

          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: "#1C1917" }}
          >
            Retail is hard. We make it{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              manageable.
            </span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#78716C" }}>
            Eliminate the operational bottlenecks that drain your bottom line.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.04)", borderColor: "#D4A85A" }}
              className="p-5 rounded-xl border bg-white cursor-pointer transition-all duration-300 group relative"
              style={{
                borderColor: "#E8E4DE"
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 border transition-all duration-300 group-hover:bg-[#B07D3A] group-hover:border-[#B07D3A]"
                style={{
                  background: "#F5F2ED",
                  borderColor: "#E8E4DE"
                }}
              >
                <Icon className="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-white" style={{ color: "#B07D3A" }} />
              </div>
              <h3 className="text-sm font-bold mb-1.5" style={{ color: "#1C1917" }}>
                {title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#78716C" }}>
                {desc}
              </p>
            </motion.div>
          ))}

          {/* premium CTA card */}
          <motion.div
            variants={fadeUp}
            custom={problems.length + 1}
            whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(176,125,58,0.25)" }}
            className="p-5 rounded-xl flex flex-col items-start justify-between cursor-pointer border relative overflow-hidden group shadow-md"
            style={{
              background: "linear-gradient(145deg, #B07D3A, #D4A85A)",
              borderColor: "#B07D3A"
            }}
          >
            <div className="absolute -top-4 -right-4 p-4 opacity-10 transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12">
              <Sparkles className="w-20 h-20 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">
                Sound familiar?
              </p>
              <p className="text-[11px] text-white/90 font-medium leading-tight">
                Our AI handles the complexity so you can focus on growth.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-white text-[11px] font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 group-hover:bg-white/25 transition-all">
              Explore Solution <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}




/* ══════════════════════════════════════════
   SOLUTIONS SECTION
══════════════════════════════════════════ */
const solutions = [
  {
    icon: TrendingUp,
    title: "Sales Forecasting",
    desc: "AI-driven demand prediction trained on your historical data, seasonal patterns, and external signals — accurate to 91.4%.",
    color: "#B07D3A",
    lightColor: "rgba(176,125,58,0.12)",
    highlights: ["AI demand prediction", "Seasonal patterns", "Real-time adjustments"],
  },
  {
    icon: ArrowLeftRight,
    title: "Interstore Transfer",
    desc: "Automatically balance stock across locations. Move the right products to the right stores before stockouts happen.",
    color: "#4A7C59",
    lightColor: "rgba(74,124,89,0.12)",
    highlights: ["Automated rebalancing", "Zero stockout alerts", "Network optimization"],
  },
  {
    icon: Package,
    title: "Supply Chain Optimization",
    desc: "End-to-end visibility from sourcing to shelf. Identify bottlenecks, optimize order cycles, and reduce carrying costs.",
    color: "#B07D3A",
    lightColor: "rgba(176,125,58,0.12)",
    highlights: ["End-to-end visibility", "Cost reduction", "Bottleneck detection"],
  },
];

function SolutionsSection() {
  return (
    <Section className="py-28 px-6" style={{ background: "#F0EDE8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16 space-y-4">

          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "#1C1917" }}
          >
            One platform.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every answer.
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {solutions.map(({ icon: Icon, title, desc, color, lightColor, highlights }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -8, boxShadow: "0 24px 64px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-3xl p-8 border transition-all duration-300 cursor-pointer group"
              style={{ borderColor: "#E8E4DE" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: lightColor }}
              >
                <Icon className="w-7 h-7" style={{ color }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#1C1917" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#78716C" }}>
                {desc}
              </p>
              <div className="space-y-2">
                {highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
                    <span className="text-xs font-medium" style={{ color: "#78716C" }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="mt-6 flex items-center gap-1.5 text-xs font-bold transition-all duration-300 group-hover:gap-2.5"
                style={{ color }}
              >
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════
   PRODUCT SHOWCASE SECTION
══════════════════════════════════════════ */
function MockupFrame({
  imgSrc,
  alt,
  badge,
}: {
  imgSrc: string;
  alt: string;
  badge?: string;
}) {
  return (
    <div className="relative w-full">
      <div
        className="rounded-2xl overflow-hidden shadow-2xl border"
        style={{ borderColor: "#E8E4DE" }}
      >
        {/* browser chrome bar */}
        <div
          className="h-9 flex items-center px-4 gap-1.5"
          style={{ background: "#1A1A1A" }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
          {badge && (
            <div
              className="ml-auto text-[9px] font-medium px-2 py-0.5 rounded-full"
              style={{ background: "rgba(176,125,58,0.2)", color: "#D4A85A" }}
            >
              {badge}
            </div>
          )}
        </div>

        {/* screenshot */}
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-auto block"
          style={{ display: "block" }}
        />
      </div>

      {/* glow */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-2xl rounded-full opacity-30"
        style={{ background: "linear-gradient(90deg, #B07D3A, #D4A85A)" }}
      />
    </div>
  );
}

function ChatWindowMockup({ imgSrc, alt }: { imgSrc: string; alt: string }) {
  return (
    <div className="relative w-full">
      {/* outer shadow ring */}
      <div
        className="rounded-2xl p-px shadow-2xl"
        style={{ background: "linear-gradient(135deg, rgba(176,125,58,0.4), rgba(74,124,89,0.2))" }}
      >
        <div className="rounded-2xl overflow-hidden" style={{ background: "#fff" }}>
          <img
            src={imgSrc}
            alt={alt}
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* green glow beneath */}
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-10 blur-2xl rounded-full opacity-25"
        style={{ background: "linear-gradient(90deg, #075E54, #25D366)" }}
      />
    </div>
  );
}

function ShowcaseRow({
  reverse = false,
  icon: Icon,
  tag,
  title,
  desc,
  points,
  mockup,
  onCTA,
}: {
  reverse?: boolean;
  badge?: string;
  icon: React.ElementType;
  tag: string;
  title: string;
  desc: string;
  points: string[];
  mockup: React.ReactNode;
  onCTA: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" as never });

  return (
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16 py-20`}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={reverse ? slideRight : slideLeft}
        className="flex-1 space-y-6"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border"
          style={{
            color: "#B07D3A",
            borderColor: "rgba(176,125,58,0.3)",
            background: "rgba(176,125,58,0.1)",
          }}
        >
          <Icon className="w-3 h-3" />
          {tag}
        </div>
        <h3
          className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
          style={{ color: "#1C1917" }}
        >
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: "#78716C" }}>
          {desc}
        </p>
        <div className="space-y-2.5">
          {points.map((p) => (
            <div key={p} className="flex items-start gap-2.5">
              <CheckCircle
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: "#4A7C59" }}
              />
              <span className="text-sm" style={{ color: "#1C1917" }}>
                {p}
              </span>
            </div>
          ))}
        </div>
        <motion.button
          onClick={onCTA}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
            boxShadow: "0 4px 20px rgba(176,125,58,0.3)",
          }}
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={reverse ? slideLeft : slideRight}
        className="flex-1 w-full"
      >
        {mockup}
      </motion.div>
    </div>
  );
}

function ProductShowcaseSection({ onCTA }: { onCTA: () => void }) {
  return (
    <Section className="py-10 px-6" style={{ background: "#F0EDE8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-4 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              color: "#4A7C59",
              borderColor: "rgba(74,124,89,0.3)",
              background: "rgba(74,124,89,0.1)",
            }}
          >
            <Star className="w-3 h-3" /> Product Showcase
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "#1C1917" }}
          >
            See the platform{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              in action
            </span>
          </h2>
        </motion.div>

        <div className="divide-y" style={{ borderColor: "#E8E4DE" }}>
          <ShowcaseRow
            icon={MessageSquare}
            tag="WhatsApp AI Assistant"
            title="Your entire business, in a WhatsApp message"
            desc="Get instant business summaries, stock updates, supplier follow-ups, and demand forecasts directly in WhatsApp."
            points={[
              "Ask in Hindi or English",
              "Get stock alerts, sales summaries, and transfer suggestions",
              "AI replies in under 3 seconds",
            ]}
            onCTA={onCTA}
            mockup={
              <ChatWindowMockup imgSrc={whatsappImg} alt="WhatsApp AI Assistant" />
            }
          />

          <ShowcaseRow
            reverse
            icon={BarChart3}
            tag="AI Business Insights"
            title="Monitor sales trends and AI insights in real-time"
            desc="Monitor sales trends and AI-generated insights in real-time. Spot opportunities before your competitors."
            points={[
              "Live sales vs AI prediction charts",
              "AI-generated business insights panel",
              "7 / 30 / 90 day trend toggles",
            ]}
            onCTA={onCTA}
            mockup={
              <MockupFrame
                imgSrc={dashboardImg}
                alt="AI Business Insights Dashboard"
                badge="Live"
              />
            }
          />

          <ShowcaseRow
            icon={Star}
            tag="Vendor Reliability Score"
            title="Know exactly who to trust in your supply chain"
            desc="Track supplier performance and reliability scores with detailed analytics on every vendor relationship."
            points={[
              "Real-time vendor reliability scores",
              "Late delivery tracking and alerts",
              "Critical vs exceptional vendor flagging",
            ]}
            onCTA={onCTA}
            mockup={
              <MockupFrame
                imgSrc={vendorImg}
                alt="Vendor Reliability Score"
                badge="Analytics"
              />
            }
          />
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════
   METRICS SECTION
══════════════════════════════════════════ */



/* ══════════════════════════════════════════
   CTA SECTION
══════════════════════════════════════════ */
function CTASection({ onCTA }: { onCTA: () => void }) {
  return (
    <Section className="py-28 px-6" style={{ background: "#F0EDE8" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeUp} custom={0} className="space-y-8">
          <div
            className="relative inline-block rounded-3xl p-px overflow-hidden w-full"
            style={{ background: "linear-gradient(135deg, #B07D3A, #D4A85A, #4A7C59)" }}
          >
            <div className="bg-white rounded-3xl px-12 py-16 space-y-6 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "#D4A85A" }}
              />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "#4A7C59" }}
              />

              <div className="relative z-10 space-y-6">

                <h2
                  className="text-4xl md:text-5xl font-extrabold tracking-tight"
                  style={{ color: "#1C1917" }}
                >
                  Ready to transform your{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    retail operations?
                  </span>
                </h2>

                <p className="text-base max-w-lg mx-auto" style={{ color: "#78716C" }}>
                  Join leading retailers who use SupplyVision to forecast smarter, reduce waste,
                  and grow with confidence.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <motion.button
                    onClick={onCTA}
                    whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(176,125,58,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #B07D3A, #D4A85A)",
                      boxShadow: "0 6px 24px rgba(176,125,58,0.4)",
                      fontSize: "15px",
                    }}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <div className="flex flex-wrap items-center justify-center gap-5 text-xs" style={{ color: "#78716C" }}>
                    {["No credit card required", "0 Setup", "Free trial"].map((t) => (
                      <div key={t} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" style={{ color: "#4A7C59" }} />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ background: "#1A1A1A", borderColor: "#2A2A2A" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #B07D3A, #D4A85A)" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold" style={{ color: "#F5F0E8" }}>
            SupplyVision
          </span>
        </div>
        <p className="text-xs" style={{ color: "#78716C" }}>
          © {new Date().getFullYear()} SupplyVision. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs transition-colors hover:text-[#D4A85A]"
              style={{ color: "#78716C" }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════ */
export default function LandingPage() {
  const navigate = useNavigate();
  const goToSignIn = () => navigate("/signin");

  return (
    <div className="font-sans antialiased overflow-x-hidden" style={{ background: "#F0EDE8" }}>
      <Navbar onCTA={goToSignIn} />
      <HeroSection onCTA={goToSignIn} />
      <ProblemsSection />
      <SolutionsSection />
      <ProductShowcaseSection onCTA={goToSignIn} />
      {/* <MetricsSection /> */}
      <CTASection onCTA={goToSignIn} />
      <Footer />
    </div>
  );
}
