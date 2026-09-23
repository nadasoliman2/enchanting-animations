import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock3, Copy, Globe2, Mail, MapPin, Phone, Send, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { PageShell } from "../components/SiteChrome";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a Project | tech-oriented" },
      { name: "description", content: "Tell tech-oriented about your AI, automation, CRM, web, mobile, or enterprise platform initiative." },
      { property: "og:title", content: "Start a Project | tech-oriented" },
      { property: "og:description", content: "Request a technical consultation for your next intelligent digital system." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const scopes = ["AI & Automation", "Custom CRM / ERP", "Web & Mobile Apps", "Executive Dashboards", "Every Second AI", "General Advisory"];
const budgets = ["$5k – $15k", "$15k – $30k", "$30k – $75k", "$75k+"];

function ContactPage() {
  const [time, setTime] = useState("");
  const [scope, setScope] = useState(scopes[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Cairo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("info@tech-oriented.digital");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageShell>
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
          <Link to="/" className="back-link"><ArrowLeft /> Back to home</Link>
          <p className="eyebrow animate-fade-in"><span /> Initiate a partnership</p>
          <h1><span>Let’s build</span> <em>smarter digital operations.</em></h1>
          <p className="contact-lede">Whether you need an AI sales agent, customer support automation, a custom CRM, a mobile application, a SaaS platform, or a complete enterprise architecture, we turn operational knots into autonomous digital workflows.</p>
          <div className="trust-row">
            <span><ShieldCheck /> NDA protected by default</span>
            <span><Clock3 /> Discovery response under 24h</span>
            <span><Globe2 /> Alexandria HQ · GCC deployments</span>
          </div>
        </section>

        <section className="contact-grid">
          <aside className="contact-details" data-reveal>
            <div className="studio-heading"><div><small>Alexandria Studio HQ</small><h2>Global engineering node</h2></div><div className="studio-time"><small>Local time</small><strong>{time} EET</strong></div></div>
            <div className="location-panel"><div className="location-radar"><span /><span /><i /></div><div><MapPin /><strong>696 El Houria St. Louran</strong><small>Alexandria, Egypt</small></div></div>
            <div className="contact-methods">
              <div className="contact-method"><Phone /><div><small>Voice & WhatsApp</small><a href="tel:+201055661614">+20 10 55661614</a></div><a className="method-action" href="https://wa.me/201055661614" target="_blank" rel="noreferrer"><Send /> <span>Chat</span></a></div>
              <div className="contact-method"><Mail /><div><small>Primary inquiry desk</small><a href="mailto:info@tech-oriented.digital">info@tech-oriented.digital</a></div><Button variant="ghost" size="icon" aria-label="Copy email address" onClick={copyEmail}><Copy /></Button></div>
              <div className="contact-method"><Globe2 /><div><small>System gateway</small><a href="https://tech-oriented.digital" target="_blank" rel="noreferrer">tech-oriented.digital</a></div></div>
            </div>
            <div className="priority-note"><Zap /><div><strong>Priority engineering pipeline</strong><p>Direct technical lead assignment. No bureaucratic sales relays.</p></div></div>
          </aside>

          <div className="intake-panel" data-reveal>
            <p className="section-index">Architectural intake</p>
            <h2>Request a technical consultation</h2>
            <p>Configure your core objectives and receive an architectural roadmap estimate with discovery call times.</p>
            <form onSubmit={submit}>
              <fieldset><legend>1. Initiative scope</legend><div className="choice-grid choice-grid--scope">{scopes.map((item) => <Button type="button" variant="ghost" key={item} className={scope === item ? "choice-chip choice-chip--active" : "choice-chip"} onClick={() => setScope(item)}>{item}</Button>)}</div></fieldset>
              <fieldset><legend>2. Anticipated investment bracket <small>USD equivalent</small></legend><div className="choice-grid">{budgets.map((item) => <Button type="button" variant="ghost" key={item} className={budget === item ? "choice-chip choice-chip--active" : "choice-chip"} onClick={() => setBudget(item)}>{item}</Button>)}</div></fieldset>
              <fieldset><legend>3. Enterprise identity</legend><div className="field-grid"><label>Full name *<input required placeholder="e.g. Tarek Mansour" /></label><label>Company / Startup *<input required placeholder="e.g. Apex Global Ventures" /></label><label>Work email *<input required type="email" placeholder="director@company.com" /></label><label>Phone / WhatsApp *<input required type="tel" placeholder="+20 10 ... / +971 50 ..." /></label></div></fieldset>
              <fieldset><legend>4. Technical specifications <small>{message.length} / 600</small></legend><textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={600} rows={5} placeholder="Tell us about the current friction, integrations, timeline, and key deliverables..." /></fieldset>
              <label className="nda-check"><input type="checkbox" defaultChecked /> Send bilateral non-disclosure agreement (NDA)</label>
              <Button type="submit" className="submit-request" disabled={submitted}>{submitted ? <><Check /> Consultation booked</> : <>Send request & book discovery <ArrowRight /></>}</Button>
              {submitted && <div className="success-banner"><Check /><span><strong>Inquiry prepared successfully.</strong> A principal architect will respond within 24 hours.</span></div>}
            </form>
          </div>
        </section>

        <section className="urgent-strip" data-reveal><div><p className="section-index">Immediate technical feasibility</p><h2>Need an executive architectural audit?</h2><p>For a mission-critical system breakdown, SLA outage, or ready RFP document.</p></div><div><a href="mailto:info@tech-oriented.digital?subject=URGENT%20ARCHITECTURAL%20AUDIT"><Zap /> Dispatch urgent RFP</a><a href="tel:+201055661614"><Phone /> Direct line</a></div></section>
        {copied && <div className="copy-toast"><Check /> Email copied</div>}
      </main>
    </PageShell>
  );
}