const stats = [
  { value: "$2.4B+", label: "Supply Chain Value Managed" },
  { value: "150+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "12M+", label: "Shipments Tracked Monthly" },
];

const StatsSection = () => {
  return (
    <section className="py-16 px-4 border-y border-border bg-surface-elevated">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
