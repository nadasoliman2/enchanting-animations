import Lenis from "lenis";
import { useEffect, useRef } from "react";

const CURSOR_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor], .capability-row, .primary-action, .text-action, .contact-link';

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function MotionLayer() {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  // Smooth scroll (Lenis) + parallax
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // lerp-based momentum scroll to match the heavy, buttery feel of fantasy.co
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
    });

    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const heroSection = document.querySelector<HTMLElement>(".hero-section");
    const heroCopy = document.querySelector<HTMLElement>(".hero-copy");
    const heroStage = document.querySelector<HTMLElement>(".network-stage");
    const scrollCue = document.querySelector<HTMLElement>(".scroll-cue");

    const applyParallax = () => {
      const viewport = window.innerHeight;
      for (const el of parallaxItems) {
        const speed = Number.parseFloat(el.dataset.parallax || "0.12");
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - viewport / 2;
        el.style.transform = `translate3d(0, ${(offset * -speed).toFixed(2)}px, 0)`;
      }

      // Cinematic scroll-driven hero: content lifts + scales + fades, visual drifts slower,
      // and the hero clips away smoothly instead of a plain fade.
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        if (progress <= 0.001) {
          if (heroCopy) heroCopy.style.transform = "";
          if (heroCopy) heroCopy.style.opacity = "";
          if (heroStage) heroStage.style.transform = "";
          if (heroStage) heroStage.style.opacity = "";
        } else {
          if (heroCopy) {
            heroCopy.style.transform = `translate3d(0, ${(progress * -140).toFixed(1)}px, 0) scale(${(1 - progress * 0.07).toFixed(3)})`;
            heroCopy.style.opacity = `${Math.max(0, 1 - progress * 1.25).toFixed(3)}`;
          }
          if (heroStage) {
            heroStage.style.transform = `translate3d(0, ${(progress * -60).toFixed(1)}px, 0) scale(${(1 - progress * 0.04).toFixed(3)})`;
            heroStage.style.opacity = `${Math.max(0, 1 - progress * 0.9).toFixed(3)}`;
          }
        }
        if (scrollCue) scrollCue.style.opacity = `${Math.max(0, 1 - progress * 3).toFixed(2)}`;
      }
    };

    lenis.on("scroll", applyParallax);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    applyParallax();

    // In-page anchor links route through Lenis for smooth navigation
    const onAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const node = document.querySelector<HTMLElement>(id);
      if (!node) return;
      event.preventDefault();
      lenis.scrollTo(node, { offset: -90, duration: 1.4 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      for (const el of parallaxItems) el.style.transform = "";
      for (const el of [heroCopy, heroStage, scrollCue]) {
        if (el) { el.style.transform = ""; el.style.opacity = ""; }
      }
    };
  }, []);

  // Split cinematic headings into per-word masked spans for staggered reveals
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const heads = Array.from(document.querySelectorAll<HTMLElement>("[data-split]:not([data-split-done])"));
    for (const el of heads) {
      el.setAttribute("data-split-done", "");
      const words = (el.textContent || "").trim().split(/\s+/);
      el.textContent = "";
      words.forEach((word, i) => {
        const outer = document.createElement("span");
        outer.className = "split-word";
        const inner = document.createElement("span");
        inner.textContent = word;
        inner.style.setProperty("--i", String(i));
        outer.appendChild(inner);
        el.appendChild(outer);
        if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
      });
      el.classList.add("split-ready");
    }
  }, []);

  // Global scroll reveal (works on every page, incl. routes without their own observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );
    const scan = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible), [data-reveal-stagger]:not(.is-visible), [data-split]:not(.is-visible)").forEach((el) => observer.observe(el));
    scan();
    // rescan shortly after mount to catch route transitions / late-mounted nodes + split words
    const t = window.setTimeout(scan, 160);
    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  // Magnetic cursor + magnetic buttons + tilt/spotlight cards
  useEffect(() => {
    if (prefersReducedMotion() || !isFinePointer()) return;

    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    document.body.classList.add("has-custom-cursor");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const auraPos = { x: pointer.x, y: pointer.y };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let frame = 0;
    const render = () => {
      auraPos.x += (pointer.x - auraPos.x) * 0.16;
      auraPos.y += (pointer.y - auraPos.y) * 0.16;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      aura.style.transform = `translate3d(${auraPos.x}px, ${auraPos.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const setHover = () => document.body.classList.add("cursor-hover");
    const clearHover = () => document.body.classList.remove("cursor-hover");

    const interactive = Array.from(document.querySelectorAll<HTMLElement>(CURSOR_SELECTOR));
    for (const el of interactive) {
      el.addEventListener("pointerenter", setHover);
      el.addEventListener("pointerleave", clearHover);
    }

    // Magnetic pull for tagged elements
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magnetHandlers = magnets.map((el) => {
      const strength = Number.parseFloat(el.dataset.magnetic || "0.35");
      const onEnter = () => {
        el.style.transition = "transform 0.15s cubic-bezier(.16,1,.3,1)";
      };
      const onMoveMagnet = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const mx = event.clientX - (rect.left + rect.width / 2);
        const my = event.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate3d(${mx * strength}px, ${my * strength}px, 0)`;
      };
      const onLeave = () => {
        el.style.transition = "transform 0.55s cubic-bezier(.16,1,.3,1)";
        el.style.transform = "translate3d(0,0,0)";
      };
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointermove", onMoveMagnet);
      el.addEventListener("pointerleave", onLeave);
      return { el, onEnter, onMoveMagnet, onLeave };
    });

    // 3D tilt + radial spotlight for tagged cards
    const tilts = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const tiltHandlers = tilts.map((el) => {
      const max = Number.parseFloat(el.dataset.tilt || "8");
      const onMoveTilt = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        el.style.setProperty("--mouse-x", `${px * 100}%`);
        el.style.setProperty("--mouse-y", `${py * 100}%`);
        el.style.transform = `perspective(1000px) rotateY(${(px - 0.5) * max}deg) rotateX(${(0.5 - py) * max}deg)`;
      };
      const onLeaveTilt = () => {
        el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
      };
      el.addEventListener("pointermove", onMoveTilt);
      el.addEventListener("pointerleave", onLeaveTilt);
      return { el, onMoveTilt, onLeaveTilt };
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("has-custom-cursor", "cursor-hover");
      for (const el of interactive) {
        el.removeEventListener("pointerenter", setHover);
        el.removeEventListener("pointerleave", clearHover);
      }
      for (const { el, onEnter, onMoveMagnet, onLeave } of magnetHandlers) {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointermove", onMoveMagnet);
        el.removeEventListener("pointerleave", onLeave);
        el.style.transform = "";
      }
      for (const { el, onMoveTilt, onLeaveTilt } of tiltHandlers) {
        el.removeEventListener("pointermove", onMoveTilt);
        el.removeEventListener("pointerleave", onLeaveTilt);
        el.style.transform = "";
      }
    };
  }, []);

  return (
    <>
      <div ref={auraRef} className="cursor-aura" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
