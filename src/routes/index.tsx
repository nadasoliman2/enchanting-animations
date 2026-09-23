import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  ChevronRight,
  Layers3,
  Menu,
  Smartphone,
  Workflow,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import brandLogo from "../assets/tech-oriented-logo.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "tech-oriented | Intelligent Digital Systems" },
      {
        name: "description",
        content:
          "tech-oriented engineers AI automation, digital products, and connected operational systems for ambitious businesses.",
      },
      { property: "og:title", content: "tech-oriented | Intelligent Digital Systems" },
      {
        property: "og:description",
        content:
          "AI automation and digital products engineered around real business operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const capabilities = [
  {
    number: "01",
    title: "AI agents & automation",
    description:
      "Always-on customer, sales, and internal agents that understand context and move work forward.",
    icon: Bot,
  },
  {
    number: "02",
    title: "Connected workflows",
    description:
      "One operating layer across WhatsApp, CRM, payments, notifications, and your existing tools.",
    icon: Workflow,
  },
  {
    number: "03",
    title: "Digital products",
    description:
      "High-performance web, mobile, SaaS, and marketplace products built for real-world growth.",
    icon: Smartphone,
  },
  {
    number: "04",
    title: "Business intelligence",
    description:
      "Live decision systems that turn fragmented activity into a clear view of performance.",
    icon: ChartNoAxesCombined,
  },
];

function Index() {
  const [introDone, setIntroDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroDone(true), 2400);
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));

    const canvas = canvasRef.current;
    if (!canvas) return () => window.clearTimeout(introTimer);
    const context = canvas.getContext("2d");
    if (!context) return () => window.clearTimeout(introTimer);

    let frame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0.5, y: 0.5 };
    const nodes = Array.from({ length: 30 }, (_, index) => ({
      x: ((index * 47) % 100) / 100,
      y: ((index * 83) % 100) / 100,
      vx: ((index % 5) - 2) * 0.00012,
      vy: (((index * 3) % 5) - 2) * 0.0001,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      nodes.forEach((node) => {
        node.x += node.vx + (pointer.x - 0.5) * 0.000035;
        node.y += node.vy + (pointer.y - 0.5) * 0.000035;
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;
      });
      context.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i += 1) {
        const first = nodes[i];
        if (!first) continue;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const second = nodes[j];
          if (!second) continue;
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance < 0.21) {
            context.globalAlpha = (0.21 - distance) * 1.7;
            context.strokeStyle = "#6fffdb";
            context.beginPath();
            context.moveTo(first.x * width, first.y * height);
            context.lineTo(second.x * width, second.y * height);
            context.stroke();
          }
        }
      }
      nodes.forEach((node, index) => {
        context.globalAlpha = 0.45 + (index % 3) * 0.2;
        context.fillStyle = index % 4 === 0 ? "#4cd6fb" : "#6fffdb";
        context.beginPath();
        context.arc(node.x * width, node.y * height, index % 4 === 0 ? 2.6 : 1.7, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    return () => {
      window.clearTimeout(introTimer);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div className="site-shell">
      <div className={`brand-intro ${introDone ? "brand-intro--done" : ""}`} aria-hidden="true">
        <div className="brand-intro__inner">
          <img src={brandLogo.url} alt="" className="brand-intro__logo" />
          <div className="brand-intro__line" />
        </div>
      </div>

      <header className={`site-header ${introDone ? "site-header--ready" : ""}`}>
        <a href="#top" className="brand-link" aria-label="tech-oriented home">
          <img src={brandLogo.url} alt="tech-oriented" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#company">Company</a>
        </nav>
        <a href="#contact" className="header-contact">
          Start a project <ArrowUpRight size={16} />
        </a>
        <Menu className="mobile-menu-icon" aria-hidden="true" />
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid" aria-hidden="true" />
          <div className={`hero-copy ${introDone ? "hero-copy--ready" : ""}`}>
            <p className="eyebrow"><span /> AI & digital transformation</p>
            <h1>
              <span className="line-mask"><span>Engineering smarter</span></span>
              <span className="line-mask"><span className="accent-text">digital ecosystems.</span></span>
            </h1>
            <p className="hero-description">
              We turn fragmented operations into intelligent, connected systems built around how your business actually works.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="primary-action">Request a consultation <ArrowUpRight size={19} /></a>
              <a href="#services" className="text-action">Explore our systems <ArrowDown size={18} /></a>
            </div>
          </div>

          <div className={`network-stage ${introDone ? "network-stage--ready" : ""}`}>
            <canvas ref={canvasRef} aria-label="Animated network of connected digital systems" />
            <div className="network-label"><span /> Autonomous fabric / live</div>
            <div className="network-stat">
              <span>Connected intelligence</span>
              <strong>Always in motion</strong>
            </div>
          </div>
          <a className="scroll-cue" href="#manifesto" aria-label="Scroll to learn more"><ArrowDown size={18} /></a>
        </section>

        <section className="manifesto-section" id="manifesto">
          <p className="section-index" data-reveal>01 / What we solve</p>
          <div className="manifesto-copy" data-reveal>
            <h2>Your business may not need more tools.</h2>
            <h2>It needs the right system.</h2>
          </div>
          <p className="manifesto-note" data-reveal>
            We remove operational drag by connecting your teams, conversations, data, and decisions into one deliberate flow.
          </p>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading" data-reveal>
            <p className="section-index">02 / Capabilities</p>
            <h2>We design the system behind the growth.</h2>
          </div>
          <div className="capability-list">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article className="capability-row" key={capability.number} data-reveal>
                  <span className="capability-number">{capability.number}</span>
                  <Icon className="capability-icon" aria-hidden="true" />
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <ChevronRight className="capability-arrow" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </section>

        <section className="featured-section" id="work">
          <div className="featured-copy" data-reveal>
            <p className="section-index">03 / Flagship system</p>
            <div className="featured-mark"><Layers3 size={22} /> Every Second AI</div>
            <h2>Every conversation becomes an opportunity.</h2>
            <p>
              An autonomous communication platform that responds instantly, qualifies intent, and keeps every customer journey moving across channels.
            </p>
            <a href="#contact" className="primary-action">Explore Every Second AI <ArrowUpRight size={19} /></a>
          </div>
          <div className="signal-visual" data-reveal aria-hidden="true">
            <div className="signal-core">AI</div>
            <div className="signal-ring signal-ring--one" />
            <div className="signal-ring signal-ring--two" />
            <div className="signal-orbit"><span /><span /><span /></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner" data-reveal>
            <p className="section-index">04 / Start here</p>
            <h2>Let’s engineer what’s next.</h2>
            <a href="mailto:info@tech-oriented.digital" className="contact-link">
              info@tech-oriented.digital <ArrowUpRight />
            </a>
          </div>
        </section>
      </main>

      <footer id="company">
        <img src={brandLogo.url} alt="tech-oriented" />
        <p>Applied AI, autonomous workflows, and precision digital products.</p>
        <span>Alexandria · Worldwide</span>
      </footer>
    </div>
  );
}