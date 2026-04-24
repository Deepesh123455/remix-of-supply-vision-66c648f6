const WhatsAppScreen = () => (
  <div>
    <div className="mb-7">
      <h1 className="text-xl font-bold text-text-heading">✦ WhatsApp Command Center</h1>
      <p className="text-sm text-muted-foreground mt-1">Factory, DCs, 47 EBOs, 180 MBOs & GCC exports — controlled from WhatsApp</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Bot Preview */}
      <div>
        <h3 className="text-sm font-bold text-text-heading mb-3">📱 Live Bot Preview</h3>
        <div className="rounded-xl border border-border overflow-hidden bg-card shadow-card">
          <div className="bg-success/10 px-4 py-3 flex items-center gap-3 border-b border-border">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-sm">🤖</div>
            <div>
              <div className="text-sm font-semibold text-foreground">InvisibleCTO Supply AI</div>
              <div className="text-[10px] text-success font-medium">● online</div>
            </div>
          </div>
          <div className="p-4 space-y-3 bg-secondary/30">
            <BotMsg text={<>🚨 <strong>URGENT — Polo Navy (M)</strong><br /><br />47 EBOs &lt; 2 days cover<br />Sell-through: ~312 pcs/day<br />DC stock ready: 1,800 pcs<br />Suggested STO: <strong>1,750 pcs to 41 EBOs</strong><br /><br />Shall I release the STO?</>} time="09:14 ✓✓" />
            <UserMsg text="Haan release karo" time="09:15 ✓✓" />
            <BotMsg text={<>✅ <strong>STO #STO-2047 released!</strong><br /><br />41 EBO managers + DC dispatch notified.<br />ETA at stores: Apr 10<br />Value: ₹6.3L<br /><br />Crew Sweatshirt Grey (L) bhi 1 day cover par hai — auto cut order Unit 2 ko bhejun?</>} time="09:15 ✓✓" />
            <UserMsg text="Haan, aur aaj ka network summary bhi de" time="09:16 ✓✓" />
            <BotMsg text={<>👕 <strong>Today's Network Summary</strong><br /><br />🔴 Refill needed (3): Polo Navy M, Tee White L, Sweatshirt Grey L<br />🟡 Low (8 styles): Anarkali Maroon, Kurti Pink…<br />🟢 Healthy (8,397 SKUs)<br />💀 Aged (90d+): ₹2.1Cr (action needed)<br /><br />Total inventory value: <strong>₹14.2Cr</strong><br />Today's sell-out: <strong>₹6.8L</strong></>} time="09:16 ✓✓" />
          </div>
          <div className="flex gap-2 flex-wrap px-4 py-3 border-t border-border">
            {["EBO refill report", "Open POs", "Vendor status", "Export shipments"].map(q => (
              <span key={q} className="text-[11px] px-3 py-1.5 rounded-full bg-success/10 border border-success/30 text-success cursor-pointer hover:bg-success/20 transition-colors">{q}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-4">
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h2 className="text-sm font-bold text-text-heading">🗣️ What Your Team Can Say</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { cat: "MERCHANDISER", text: '"AW\'25 ka buying plan dikhao" → Full capsule with SKUs & cut budget' },
              { cat: "STORE MANAGER", text: '"Polo Navy M ka stock kab aayega?" → Live STO ETA' },
              { cat: "FACTORY HEAD", text: '"Unit 2 ki line allocation kya hai?" → WIP & dispatch plan' },
              { cat: "EXPORTS", text: '"Riyadh shipment status?" → Live LC + 3PL tracking' },
              { cat: "OWNER / CFO", text: '"Aged stock kitna hai?" → ₹2.1Cr breakdown by category' },
            ].map(c => (
              <div key={c.cat} className="p-3 bg-secondary rounded-lg border border-border">
                <div className="text-[10px] text-primary font-semibold mb-1">{c.cat}</div>
                <div className="text-xs text-foreground">{c.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">💡</span>
            <span className="text-xs font-bold text-primary">Why WhatsApp-First?</span>
          </div>
          <p className="text-xs text-foreground leading-relaxed">
            Your factory floor manager, 47 EBO store managers, GCC distributor, merchandising team — everyone is already on WhatsApp all day. No new app to roll out across 47+ stores. The AI comes to <em>them</em>, in Hindi/Punjabi/English, in the language they actually speak.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const BotMsg = ({ text, time }: { text: React.ReactNode; time: string }) => (
  <div className="max-w-[85%] self-start">
    <div className="bg-success/10 border border-success/20 rounded-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 text-xs text-foreground leading-relaxed">
      {text}
      <div className="text-[10px] text-muted-foreground/50 mt-1 text-right">{time}</div>
    </div>
  </div>
);

const UserMsg = ({ text, time }: { text: string; time: string }) => (
  <div className="max-w-[85%] ml-auto">
    <div className="bg-info/10 border border-info/20 rounded-xl rounded-tr-sm p-3 text-xs text-foreground leading-relaxed">
      {text}
      <div className="text-[10px] text-muted-foreground/50 mt-1 text-right">{time}</div>
    </div>
  </div>
);

export default WhatsAppScreen;
