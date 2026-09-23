import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Bot, ChartNoAxesCombined, ChevronRight, DatabaseZap, Layers3, MessageCircleMore, Smartphone, Workflow } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import brandLogo from "../assets/tech-oriented-logo.webp.asset.json";
import { PageShell } from "../components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "tech-oriented | Intelligent Digital Systems" },
    { name: "description", content: "AI automation, digital products, CRM systems, and connected operational platforms engineered for ambitious businesses." },
    { property: "og:title", content: "tech-oriented | Intelligent Digital Systems" },
    { property: "og:description", content: "AI automation and digital products engineered around real business operations." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const frictions = ["Slow customer response", "Manual repetitive work", "Scattered leads & data", "Weak sales follow-up", "No tailored tracking", "Blind management control"];
const capabilities = [
  { number: "01", title: "AI agents & assistants", description: "Always-on sales, support, and internal agents that understand context and move work forward.", icon: Bot },
  { number: "02", title: "Workflow & WhatsApp fabric", description: "One operating layer across conversations, CRM, payments, notifications, and existing tools.", icon: Workflow },
  { number: "03", title: "Tailored CRM & core systems", description: "Purpose-built operational software shaped around your teams, permissions, and daily processes.", icon: DatabaseZap },
  { number: "04", title: "Web & mobile applications", description: "High-performance customer and internal products engineered for speed, clarity, and growth.", icon: Smartphone },
  { number: "05", title: "SaaS & marketplaces", description: "Scalable digital ventures with subscription, commerce, multi-tenant, and marketplace foundations.", icon: Layers3 },
  { number: "06", title: "Dashboards & real-time BI", description: "Live decision systems that turn fragmented activity into one clear performance view.", icon: ChartNoAxesCombined },
];
const process = [
  ["01", "Map", "We trace the real workflow, friction, decisions, and data before proposing technology."],
  ["02", "Architect", "We design the connected system, intelligence layer, and delivery roadmap."],
  ["03", "Engineer", "A focused team builds, integrates, tests, and deploys the complete experience."],
  ["04", "Evolve", "We measure performance and continuously improve the system as operations grow."],
];

function Index() {
  const [introDone, setIntroDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 2200);
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12, rootMargin: "0px 0px -6%" });
    items.forEach((item) => observer.observe(item));
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return () => { window.clearTimeout(timer); observer.disconnect(); };
    let frame = 0, width = 0, height = 0;
    const pointer = { x: .5, y: .5 };
    const nodes = Array.from({ length: 42 }, (_, i) => ({ x: ((i * 47) % 100) / 100, y: ((i * 83) % 100) / 100, vx: ((i % 5) - 2) * .00016, vy: (((i * 3) % 5) - 2) * .00013 }));
    const resize = () => { const rect = canvas.getBoundingClientRect(); const ratio = Math.min(devicePixelRatio, 2); width = rect.width; height = rect.height; canvas.width = width * ratio; canvas.height = height * ratio; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = (event.clientX - rect.left) / rect.width; pointer.y = (event.clientY - rect.top) / rect.height; };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      nodes.forEach((node) => { node.x += node.vx + (pointer.x - .5) * .000045; node.y += node.vy + (pointer.y - .5) * .000045; if (node.x < 0 || node.x > 1) node.vx *= -1; if (node.y < 0 || node.y > 1) node.vy *= -1; });
      nodes.forEach((first, i) => nodes.slice(i + 1).forEach((second) => { const d = Math.hypot(first.x - second.x, first.y - second.y); if (d < .19) { context.globalAlpha = (.19 - d) * 2.3; context.strokeStyle = "#6fffdb"; context.beginPath(); context.moveTo(first.x * width, first.y * height); context.lineTo(second.x * width, second.y * height); context.stroke(); } }));
      nodes.forEach((node, i) => { context.globalAlpha = .45 + (i % 3) * .2; context.fillStyle = i % 4 ? "#6fffdb" : "#4cd6fb"; context.beginPath(); context.arc(node.x * width, node.y * height, i % 4 ? 1.7 : 2.8, 0, Math.PI * 2); context.fill(); });
      context.globalAlpha = 1; frame = requestAnimationFrame(draw);
    };
    resize(); draw(); window.addEventListener("resize", resize); canvas.addEventListener("pointermove", move);
    return () => { clearTimeout(timer); observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", move); };
  }, []);

  return (
    <>
      <div className={`brand-intro ${introDone ? "brand-intro--done" : ""}`} aria-hidden="true"><div className="brand-intro__inner"><img src={brandLogo.url} alt="" className="brand-intro__logo" /><div className="brand-intro__line" /><span>System initializing</span></div></div>
      <PageShell>
        <main id="top">
          <section className="hero-section">
            <div className="hero-grid" aria-hidden="true" />
            <div className={`hero-copy ${introDone ? "hero-copy--ready" : ""}`}>
              <p className="eyebrow"><span /> AI & digital transformation</p>
              <h1><span className="line-mask"><span>Engineering smarter</span></span><span className="line-mask"><span className="accent-text">digital ecosystems.</span></span></h1>
              <p className="hero-description">We turn fragmented operations into intelligent, connected systems built around how your business actually works.</p>
              <div className="hero-actions"><Link to="/contact" className="primary-action" data-magnetic="0.4">Request a consultation <ArrowUpRight /></Link><a href="#services" className="text-action">Explore our systems <ArrowDown /></a></div>
            </div>
            <div className={`network-stage spotlight-card ${introDone ? "network-stage--ready" : ""}`} data-tilt="6"><canvas ref={canvasRef} aria-label="Animated network of connected digital systems" /><div className="network-label"><span /> Autonomous logic engine / live</div><div className="network-stat"><span>Connected intelligence</span><strong>Always in motion</strong></div></div>
            <a className="scroll-cue" href="#manifesto" aria-label="Scroll to learn more"><ArrowDown /></a>
          </section>

          <section className="manifesto-section" id="manifesto">
            <p className="section-index" data-reveal>01 / The operational gap</p>
            <div className="manifesto-copy"><h2 data-split>Your business may not need more tools.</h2><h2 data-split>It needs the right system.</h2></div>
            <p className="manifesto-note" data-reveal>We remove operational drag by connecting teams, conversations, data, and decisions into one deliberate flow.</p>
            <div className="friction-grid" data-reveal-stagger>{frictions.map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div>
          </section>

          <section className="services-section" id="services">
            <div className="section-heading" data-reveal><p className="section-index">02 / Capabilities</p><h2 data-split>We build connected digital systems around real business workflows.</h2></div>
            <div className="capability-list">{capabilities.map((capability) => { const Icon = capability.icon; return <article className="capability-row spotlight-card" key={capability.number} data-reveal><span className="capability-number">{capability.number}</span><Icon className="capability-icon" /><h3>{capability.title}</h3><p>{capability.description}</p><ChevronRight className="capability-arrow" /></article>; })}</div>
          </section>

          <section className="featured-section" id="work">
            <div className="featured-copy" data-reveal><p className="section-index">03 / Flagship intelligence</p><div className="featured-mark"><MessageCircleMore /> Every Second AI</div><h2 data-split>Every conversation becomes an opportunity.</h2><p>An autonomous communication platform that responds instantly, qualifies intent, routes conversations, and keeps every customer journey moving across WhatsApp, web, and social channels.</p><ul><li>AI sales and support agents</li><li>Lead qualification and smart routing</li><li>Real-time context and CRM synchronization</li><li>Human handover without lost history</li></ul><Link to="/contact" className="primary-action" data-magnetic="0.4">Explore Every Second AI <ArrowUpRight /></Link></div>
            <div className="signal-visual" data-reveal data-parallax="0.08" aria-hidden="true"><div className="signal-pulse" /><div className="signal-core">AI</div><div className="signal-ring signal-ring--one" /><div className="signal-ring signal-ring--two" /><div className="signal-orbit"><span /><span /><span /></div><div className="data-card data-card--one">Lead qualified <strong>92%</strong></div><div className="data-card data-card--two">Response time <strong>1.2s</strong></div></div>
          </section>

          <section className="process-section" id="process"><div className="section-heading" data-reveal><p className="section-index">04 / How we work</p><h2 data-split>From operational friction to a system that compounds.</h2></div><div className="process-grid">{process.map(([number, title, text]) => <article className="spotlight-card" key={number} data-reveal data-tilt="5"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

          <section className="outcomes-section" data-reveal-stagger><div><span>24/7</span><p>Autonomous customer operations</p></div><div><span>&lt;1s</span><p>Real-time system response</p></div><div><span>1</span><p>Connected source of truth</p></div><div><span>∞</span><p>Designed to evolve</p></div></section>

          <section className="contact-section"><div className="contact-inner" data-reveal><p className="section-index">05 / Start here</p><h2 data-split>Ready to transform how your business operates?</h2><Link to="/contact" className="contact-link" data-magnetic="0.25">Let’s engineer what’s next. <ArrowUpRight /></Link></div></section>
        </main>
      </PageShell>
    </>
  );
}
