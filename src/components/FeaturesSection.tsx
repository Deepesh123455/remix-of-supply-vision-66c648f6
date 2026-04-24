import { Activity, Brain, Eye, Layers, Route, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "End-to-End Visibility",
    description: "Track every node in your supply chain in real time — from raw materials to last-mile delivery.",
  },
  {
    icon: Brain,
    title: "AI-Powered Forecasting",
    description: "Predictive models that anticipate demand shifts, disruptions, and cost fluctuations before they happen.",
  },
  {
    icon: Route,
    title: "Route Optimization",
    description: "Dynamic routing algorithms that reduce transit times and minimize logistics costs across your network.",
  },
  {
    icon: Activity,
    title: "Risk Monitoring",
    description: "Continuous supplier risk scoring with alerts for geopolitical, financial, and environmental factors.",
  },
  {
    icon: Layers,
    title: "Multi-Tier Mapping",
    description: "Visualize and manage complex supplier relationships across every tier of your supply network.",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Actionable dashboards with KPIs for on-time delivery, quality, cost efficiency, and sustainability.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-primary mb-2">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading">
            Intelligence at Every Step
          </h2>
          <p className="text-muted-foreground mt-3">
            A comprehensive platform designed to transform supply chain complexity into competitive advantage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-heading mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
