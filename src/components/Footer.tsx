const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4 bg-surface-elevated">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">IC</span>
              </div>
              <span className="font-semibold text-text-heading">InvisibleCTO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Supply chain intelligence for the modern enterprise.
            </p>
          </div>

          {[
            { title: "Platform", links: ["Features", "Integrations", "Pricing", "Security"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Support", "Status"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-medium text-sm text-text-heading mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 InvisibleCTO. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
