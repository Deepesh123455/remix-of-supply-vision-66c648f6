import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Mic, Paperclip, Settings2, Zap, Phone, Video,
  MoreVertical, CheckCheck, Globe, Factory, Store, Truck,
  TrendingUp, Cpu, ShieldCheck, ChevronRight, Activity,
  MessageSquare, Clock, Users, ArrowUpRight, Sparkles, Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

const QUICK_COMMANDS = [
  "Aaj ka stock summary",
  "Polo Navy update",
  "Open orders status",
  "Supplier follow-up",
  "Eid demand forecast",
];

const LIVE_ACTIVITY = [
  { icon: "🏭", text: "Checked Tirupur factory — 3,200 pieces on track", time: "2m ago" },
  { icon: "📦", text: "Auto-reorder sent to Sharma Textiles for Navy Polo", time: "8m ago" },
  { icon: "📊", text: "Updated Lucknow store forecast — ethnic demand up 38%", time: "15m ago" },
  { icon: "⚠️", text: "Flagged slow-moving kurta stock — suggested discount", time: "31m ago" },
  { icon: "✅", text: "Confirmed delivery: Round-neck tees, 4,800 pcs", time: "1h ago" },
];

const WhatsAppScreen = () => {
  const { chatMessages, isBotTyping, sendChatMessage } = useApp();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatMessages, isBotTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    sendChatMessage(text);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            WhatsApp Command Center
            <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px] py-0 px-1.5 h-4 font-bold tracking-wide">LIVE</Badge>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            One message. Your entire supply chain responds.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => toast.info("Supported languages: English, Hindi, Punjabi, Gujarati.")}>
            <Globe className="w-4 h-4 mr-2" /> Language
          </Button>
          <Button size="sm" onClick={() => toast.info("Bot configuration panel — coming soon.")}>
            <Settings2 className="w-4 h-4 mr-2" /> Configure
          </Button>
        </div>
      </div>

      {/* Live context strip */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span><strong className="text-foreground">47</strong> messages today</span>
        </div>
        <span className="text-border hidden sm:inline">·</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>Avg reply in <strong className="text-foreground">0.8s</strong></span>
        </div>
        <span className="text-border hidden sm:inline">·</span>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 shrink-0" />
          <span><strong className="text-foreground">47 stores</strong> connected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Chat Window ── */}
        <Card className="lg:col-span-3 border-border shadow-lg overflow-hidden flex flex-col h-[80vh] min-h-[500px] max-h-[700px]">
          {/* Header */}
          <div className="bg-emerald-700 dark:bg-emerald-900 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 text-white">
              <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-white/20">
                  <AvatarFallback className="bg-emerald-500 text-white font-black text-sm">AI</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-300 border-2 border-emerald-700 rounded-full" />
              </div>
              <div>
                <div className="text-sm font-bold leading-tight">Supply AI Assistant</div>
                <div className="text-[10px] text-emerald-100/80 flex items-center gap-1 font-medium">
                  <span className={`inline-block h-1.5 w-1.5 rounded-full mr-0.5 ${isBotTyping ? "bg-yellow-300 animate-pulse" : "bg-emerald-300"}`} />
                  {isBotTyping ? "Thinking..." : "Online · 47 stores · All systems go"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Video className="h-4 w-4 cursor-pointer hover:text-white transition-colors" onClick={() => toast.info("Video call — coming soon.")} />
              <Phone className="h-4 w-4 cursor-pointer hover:text-white transition-colors" onClick={() => toast.info("Voice call — coming soon.")} />
              <MoreVertical className="h-4 w-4 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* Date Divider */}
          <div className="bg-[#efeae2] dark:bg-slate-900 px-4 pt-3">
            <div className="flex justify-center">
              <span className="text-[10px] font-bold bg-white/80 dark:bg-slate-800 px-3 py-1 rounded-full text-muted-foreground shadow-sm uppercase tracking-widest">
                Today
              </span>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 bg-[#efeae2] dark:bg-slate-900 px-4 py-3 overflow-y-auto">
            <div className="space-y-3 pb-2">
              <AnimatePresence initial={false}>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {msg.sender === "bot"
                      ? <BotMsg text={msg.text} time={msg.time} />
                      : <UserMsg text={msg.text} time={msg.time} />}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isBotTyping && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex flex-col items-start gap-1 max-w-[75%]">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-emerald-100 dark:border-slate-700">
                      <div className="flex gap-1 items-center h-4">
                        {[0, 150, 300].map((delay) => (
                          <span key={delay} className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick Commands */}
          <div className="bg-white dark:bg-slate-900 border-t border-border px-3 pt-2.5 pb-1 shrink-0">
            <div className="flex gap-1.5 flex-wrap">
              {QUICK_COMMANDS.map(cmd => (
                <button
                  key={cmd}
                  onClick={() => sendChatMessage(cmd)}
                  disabled={isBotTyping}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-40"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-border shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted/40 rounded-full px-4 py-2.5 flex items-center gap-2 border border-border focus-within:border-emerald-400 transition-colors">
                <Paperclip
                  className="h-4 w-4 text-muted-foreground shrink-0 cursor-pointer hover:text-foreground"
                  onClick={() => toast.info("File attachment — coming soon.")}
                />
                <input
                  ref={inputRef}
                  placeholder="Ask anything — English or Hindi..."
                  className="flex-1 bg-transparent border-none text-sm outline-none"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isBotTyping}
                />
                <Mic
                  className="h-4 w-4 text-muted-foreground shrink-0 cursor-pointer hover:text-foreground"
                  onClick={() => toast.info("Voice input — coming soon.")}
                />
              </div>
              <Button
                size="icon"
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 h-9 w-9 shrink-0 shadow-md"
                onClick={handleSend}
                disabled={isBotTyping || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* ── Right Panel ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Live AI Activity */}
          <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-3 pt-4 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bot className="w-4 h-4 text-primary" />
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                  <CardTitle className="text-sm font-bold">AI Working Right Now</CardTitle>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-none text-[9px] px-1.5 font-bold">LIVE</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Every action your AI took in the last hour</p>
            </CardHeader>
            <CardContent className="px-5 pb-4 pt-0">
              <div className="space-y-3">
                {LIVE_ACTIVITY.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] leading-snug text-foreground">{item.text}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => toast.info("Full AI activity log — coming soon.")}
                className="mt-4 w-full text-[10px] font-bold text-primary flex items-center justify-center gap-1 hover:gap-2 transition-all"
              >
                See Full Activity Log <ArrowUpRight className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>

          {/* What Can You Ask */}
          <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm font-bold">What Can You Ask?</CardTitle>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Plain English or Hindi — no training needed.</p>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="divide-y divide-border/50">
                <CommandTile icon={<TrendingUp className="w-3.5 h-3.5" />} role="Owner / CFO" example='"Old stock kitna hai?"' result="₹2.1Cr category-wise breakdown" />
                <CommandTile icon={<Factory className="w-3.5 h-3.5" />} role="Factory Manager" example='"Unit 2 production status?"' result="Live line capacity + delivery plan" />
                <CommandTile icon={<Store className="w-3.5 h-3.5" />} role="Store Manager" example='"Navy Polo kab aayega?"' result="Real-time transfer ETA" />
                <CommandTile icon={<Truck className="w-3.5 h-3.5" />} role="Franchise Team" example='"Indore shipment status?"' result="Dispatch + live tracking update" />
              </div>
            </CardContent>
          </Card>

          {/* Why WhatsApp */}
          <Card className="border-border shadow-sm bg-gradient-to-br from-emerald-50/60 to-transparent dark:from-emerald-900/10">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <p className="text-sm font-bold">Why WhatsApp?</p>
              </div>
              {[
                { icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />, title: "Zero training required", desc: "Everyone already uses it — your team, vendors, and stores." },
                { icon: <Zap className="h-3.5 w-3.5 text-emerald-600" />, title: "One message replaces hours of calls", desc: "Approve orders, check shipments, alert teams — all from chat." },
                { icon: <Activity className="h-3.5 w-3.5 text-emerald-600" />, title: "Works 24/7 without you", desc: "AI handles routine checks while you sleep. You only see what needs a decision." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-0.5">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const BotMsg = ({ text, time }: { text: string; time: string }) => (
  <div className="flex flex-col items-start gap-0.5 max-w-[82%]">
    <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-sm border border-emerald-100/80 dark:border-slate-700">
      <p className="text-[12.5px] text-foreground leading-relaxed whitespace-pre-line">{text}</p>
      <div className="flex items-center justify-end gap-1 mt-1">
        <span className="text-[9px] text-muted-foreground/50">{time}</span>
        <CheckCheck className="w-3 h-3 text-emerald-500" />
      </div>
    </div>
  </div>
);

const UserMsg = ({ text, time }: { text: string; time: string }) => (
  <div className="flex flex-col items-end gap-0.5 max-w-[82%] ml-auto">
    <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-none px-3.5 py-2.5 shadow-md">
      <p className="text-[12.5px] leading-relaxed font-medium whitespace-pre-line">{text}</p>
      <div className="flex items-center justify-end gap-1 mt-1">
        <span className="text-[9px] text-emerald-50/60">{time}</span>
        <CheckCheck className="w-3 h-3 text-emerald-100/70" />
      </div>
    </div>
  </div>
);

const CommandTile = ({ icon, role, example, result }: { icon: React.ReactNode; role: string; example: string; result: string }) => (
  <div className="px-5 py-3.5 hover:bg-muted/20 transition-all cursor-pointer group">
    <div className="flex items-center gap-2 mb-1.5">
      <div className="p-1 bg-muted rounded-md text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">{icon}</div>
      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{role}</span>
    </div>
    <p className="text-[12px] font-semibold text-foreground mb-0.5 italic">{example}</p>
    <div className="flex items-center gap-1 text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">
      <ChevronRight className="w-3 h-3 text-primary shrink-0" />
      <span>{result}</span>
    </div>
  </div>
);

export default WhatsAppScreen;
