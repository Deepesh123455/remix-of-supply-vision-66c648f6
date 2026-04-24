import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Reduce procurement costs by up to 25%",
  "Cut lead times with predictive sourcing",
  "Automate compliance and sustainability reporting",
  "Eliminate blind spots across all supplier tiers",
  "Real-time alerts for supply disruptions",
];

const InsightsSection = () => {
  return (
    <section id="insights" className="py-20 px-4 bg-surface-elevated">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Why InvisibleCTO</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
              Turn Data Into Decisions
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our platform aggregates data from thousands of sources, applies machine learning models, and delivers insights your team can act on immediately.
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{b}</span>
                </li>
              ))}
            </ul>
            <Button variant="hero" className="gap-2">
              Learn More <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Avg. Response Time", value: "< 2 hrs", sub: "to supply disruptions" },
              { label: "Data Sources", value: "10K+", sub: "integrated globally" },
              { label: "Forecast Accuracy", value: "96%", sub: "demand prediction" },
              { label: "ROI Timeline", value: "3 mo", sub: "average payback" },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-xl bg-card border border-border shadow-card text-center">
                <p className="text-2xl font-bold text-gradient">{item.value}</p>
                <p className="text-sm font-medium text-text-heading mt-1">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
