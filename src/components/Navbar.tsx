import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-elevated/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">IC</span>
          </div>
          <span className="font-semibold text-lg text-text-heading">InvisibleCTO</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Insights</a>
          <a href="#solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Solutions</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Log In</Button>
          <Button variant="hero" size="sm">Get Started</Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface-elevated border-b border-border px-4 pb-4 space-y-3">
          <a href="#features" className="block text-sm text-muted-foreground">Features</a>
          <a href="#insights" className="block text-sm text-muted-foreground">Insights</a>
          <a href="#solutions" className="block text-sm text-muted-foreground">Solutions</a>
          <a href="#contact" className="block text-sm text-muted-foreground">Contact</a>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button variant="hero" size="sm">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
