import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import brandLogo from "../assets/tech-oriented-logo.webp.asset.json";
import { Button } from "./ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header site-header--ready">
      <Link to="/" className="brand-link" aria-label="tech-oriented home" onClick={() => setOpen(false)}>
        <img src={brandLogo.url} alt="tech-oriented" />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link to="/" hash="work">Work</Link>
        <Link to="/" hash="services">Services</Link>
        <Link to="/" hash="process">Process</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Button asChild className="header-contact">
        <Link to="/contact">Start a project <ArrowUpRight size={16} /></Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="mobile-menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      <div className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}>
        <Link to="/" hash="work" onClick={() => setOpen(false)}>Work</Link>
        <Link to="/" hash="services" onClick={() => setOpen(false)}>Services</Link>
        <Link to="/" hash="process" onClick={() => setOpen(false)}>Process</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <img src={brandLogo.url} alt="tech-oriented" />
        <p>Applied AI, autonomous workflows, and precision digital products.</p>
      </div>
      <div className="footer-column">
        <strong>Capabilities</strong>
        <span>AI Solutions</span><span>Enterprise Automation</span><span>Digital Platforms</span>
      </div>
      <div className="footer-column">
        <strong>Global network</strong>
        <span>Alexandria</span><span>Dubai</span><span>Riyadh</span><span>London</span>
      </div>
      <div className="footer-end">
        <Link to="/contact">Start an initiative <ArrowUpRight size={17} /></Link>
        <span>© 2026 tech-oriented</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><SiteHeader />{children}<SiteFooter /></div>;
}