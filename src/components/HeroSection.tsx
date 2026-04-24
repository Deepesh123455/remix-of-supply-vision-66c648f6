import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Globe, Shield } from "lucide-react";
import heroImage from "@/assets/hero-supply-chain.jpg";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Globe className="w-3.5 h-3.5" />
              Supply Chain Intelligence Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-text-heading">
              Smarter Supply Chains,{" "}
              <span className="text-gradient">Invisible Complexity</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Real-time visibility, predictive analytics, and AI-driven insights to optimize your entire supply chain — from sourcing to delivery.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="hero" size="lg" className="gap-2">
                Request a Demo <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="hero-outline" size="lg">
                View Platform
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              {[
                { icon: BarChart3, text: "98% Accuracy" },
                { icon: Shield, text: "SOC 2 Compliant" },
                { icon: Globe, text: "40+ Countries" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-card-hover border border-border">
              <img src={heroImage} alt="Supply chain intelligence dashboard showing global logistics network" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-surface-elevated rounded-xl shadow-card p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cost Reduction</p>
                  <p className="text-lg font-bold text-text-heading">23.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
