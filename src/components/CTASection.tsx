import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="rounded-2xl bg-gradient-hero p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Join 150+ enterprises using InvisibleCTO to gain full visibility and control over their global supply operations.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
              Schedule a Demo <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
